import { NextResponse } from "next/server"
import { z } from "zod"
import { buildAnalysis } from "@/lib/analyse/engine"
import { generatePdf } from "@/lib/analyse/pdf"
import { sendReportMail } from "@/lib/analyse/mailer"
import { forwardLeadToZoho } from "@/lib/analyse/zoho"
import { whatsappConfigured, sendTemplate, normalizePhone } from "@/lib/whatsapp/twilio"
import { kvConfigured, kvSetJson } from "@/lib/store/kv"
import type { AnalysePayload } from "@/lib/analyse/types"

// PDF + SMTP brauchen die Node-Runtime (nicht Edge).
export const runtime = "nodejs"
export const maxDuration = 60

const str = (max = 200) => z.string().trim().max(max)

const schema = z.object({
  contact: z.object({
    anrede: str(10).optional().default(""),
    vorname: str(80).min(2),
    nachname: str(80).min(2),
    firma: str(160).min(2),
    url: str(200).optional().default(""),
    email: z.string().trim().email().max(180),
    phone: str(80).min(5),
    plz: str(20).optional().default(""),
    stadt: str(120).optional().default(""),
  }),
  answers: z.object({
    branche: str(60).optional().default(""),
    web_zufriedenheit: str().optional().default(""),
    sichtbarkeit: str().optional().default(""),
    marketing: str().optional().default(""),
    web_anfragen: str().optional().default(""),
    routine_stunden: str().optional().default(""),
    automation_done: z.array(str(120)).optional().default([]),
    automation_todo: z.array(str(120)).optional().default([]),
    revops_done: z.array(str(120)).optional().default([]),
    revops_todo: z.array(str(120)).optional().default([]),
  }),
  consent: z.literal(true),
  whatsapp_opt_in: z.boolean().optional().default(false),
  company_website: str(200).optional().default(""), // Honeypot
})

// einfaches Rate-Limiting pro IP
const RATE_MAX = 5
const RATE_WINDOW = 60_000
const buckets = new Map<string, { count: number; resetAt: number }>()
function limited(ip: string): boolean {
  const now = Date.now()
  const b = buckets.get(ip)
  if (!b || now > b.resetAt) {
    buckets.set(ip, { count: 1, resetAt: now + RATE_WINDOW })
    return false
  }
  b.count += 1
  return b.count > RATE_MAX
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown"
  if (limited(ip)) {
    return NextResponse.json({ ok: false, message: "Zu viele Anfragen. Bitte in einer Minute erneut versuchen." }, { status: 429 })
  }

  let json: unknown
  try {
    json = await request.json()
  } catch {
    return NextResponse.json({ ok: false, message: "Ungültiges JSON." }, { status: 400 })
  }

  const parsed = schema.safeParse(json)
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, message: "Bitte prüfen Sie die Pflichtfelder.", issues: parsed.error.flatten().fieldErrors },
      { status: 400 },
    )
  }

  // Honeypot: Bot still abweisen (Erfolg vortäuschen).
  if (parsed.data.company_website) return NextResponse.json({ ok: true })

  const payload: AnalysePayload = {
    contact: parsed.data.contact,
    answers: parsed.data.answers,
    consent: true,
    whatsapp_opt_in: parsed.data.whatsapp_opt_in,
  }

  try {
    const analysis = await buildAnalysis(payload)

    // PDF separat absichern: Schlägt die PDF-Erzeugung fehl (z. B. fehlende
    // pdfkit-Schriftdatei im Serverless-Bundle), darf das die Analyse NICHT
    // blockieren. Der Nutzer sieht das Ergebnis trotzdem, der Lead geht ans CRM.
    let pdf: Buffer | null = null
    try {
      pdf = await generatePdf(analysis)
    } catch (pdfErr) {
      console.error("[/api/analyse] PDF-Erzeugung fehlgeschlagen:", pdfErr)
    }

    // Lead immer ans CRM (unabhängig vom Kanal).
    const zoho = await forwardLeadToZoho(analysis).catch(() => ({ ok: false, note: "Zoho-Weiterleitung fehlgeschlagen." }))

    const notes: string[] = []
    let mailSent = false
    let whatsappStarted = false

    // WhatsApp-first: Bei Opt-in zuerst die WhatsApp-Nachricht senden und die E-Mail
    // zurückhalten. Die Mail geht nur als Fallback raus (Cron, nach 2 h ohne Termin).
    const wantsWhatsApp =
      payload.whatsapp_opt_in === true &&
      Boolean(analysis.contact.phone) &&
      whatsappConfigured() &&
      kvConfigured() &&
      Boolean(process.env.WHATSAPP_TEMPLATE_SID)

    if (wantsWhatsApp) {
      const c = analysis.contact
      const greetName = [c.anrede?.trim(), c.nachname?.trim()].filter(Boolean).join(" ") || c.vorname || "dort"
      const wa = await sendTemplate(c.phone, process.env.WHATSAPP_TEMPLATE_SID!, { "1": greetName }).catch(() => ({
        ok: false as const,
        note: "WhatsApp-Versand fehlgeschlagen.",
      }))
      if (wa.ok) {
        whatsappStarted = true
        await kvSetJson(
          `wa:pending:${normalizePhone(c.phone)}`,
          { analysis, createdAt: Date.now(), status: "pending" },
          60 * 60 * 72,
        ).catch(() => {})
        notes.push("WhatsApp-Flow gestartet – die E-Mail folgt nur, falls kein Termin zustande kommt.")
      } else {
        notes.push(`WhatsApp nicht gestartet (${wa.note ?? "?"}) – E-Mail wird direkt gesendet.`)
      }
    }

    // Klassischer Sofort-Mailweg (kein Opt-in ODER WhatsApp fehlgeschlagen).
    if (!whatsappStarted) {
      if (pdf) {
        const r = await sendReportMail(analysis, pdf).catch(() => ({ sent: false, note: "Mailversand fehlgeschlagen." }))
        mailSent = r.sent
        if (r.note) notes.push(r.note)
      } else {
        notes.push("PDF konnte nicht erzeugt werden – kein Mailversand.")
      }
    }

    if (zoho.note) notes.push(zoho.note)
    if (analysis.semrush.note) notes.push(analysis.semrush.note)
    if (!pdf) notes.push("Der PDF-Report wird separat nachgereicht.")

    return NextResponse.json({
      ok: true,
      mailSent,
      semrushFound: analysis.semrush.found,
      notes,
      // Vollständige Analyse als PDF (base64) – direkt im Tool zum Öffnen/Download.
      pdfBase64: pdf ? pdf.toString("base64") : null,
      // Kerndaten für die Sofort-Anzeige im Browser (die ausführliche Fassung steckt im PDF).
      result: {
        visibility: analysis.visibility,
        lighthouse: analysis.lighthouse,
        searchDemand: analysis.searchDemand,
        semrush: {
          found: analysis.semrush.found,
          organicTraffic: analysis.semrush.organicTraffic ?? null,
          organicKeywords: analysis.semrush.organicKeywords ?? null,
          topKeywords: analysis.semrush.topKeywords.slice(0, 5),
        },
        freed: analysis.freed,
        roi: analysis.roi,
        recommendations: analysis.recommendations,
        priorities: analysis.priorities,
        branchLabel: analysis.branchLabel,
        automation: analysis.automation,
        revops: analysis.revops,
      },
    })
  } catch (err) {
    console.error("[/api/analyse] Fehler:", err)
    return NextResponse.json({ ok: false, message: "Analyse konnte nicht erstellt werden." }, { status: 500 })
  }
}
