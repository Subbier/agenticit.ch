import { NextResponse } from "next/server"
import { z } from "zod"
import { sendVoiceConfirmation, type VoiceBooking } from "@/lib/voice/mailer"

// SMTP + Zoho brauchen die Node-Runtime (nicht Edge).
export const runtime = "nodejs"
export const maxDuration = 30

const str = (max = 200) => z.string().trim().max(max)

const schema = z.object({
  name: str(120).min(2),
  phone: str(80).min(5),
  email: z.preprocess(
    (v) => (v === "" || v == null ? undefined : v),
    z.string().trim().email().max(180).optional(),
  ),
  topic: str(160).optional().default(""),
  callback_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Ungültiges Datum"),
  callback_time: z.string().regex(/^\d{2}:\d{2}$/, "Ungültige Uhrzeit"),
  consent: z.literal(true),
  // Honeypot: legitime Nutzer lassen dieses Feld leer.
  company_website: str(200).optional().default(""),
})

// Einfaches In-Memory-Rate-Limiting pro IP (Best-Effort, pro Server-Instanz).
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

// Letzter Sonntag eines Monats (für die Schweizer Sommerzeit-Regel).
function lastSunday(year: number, month0: number): number {
  const d = new Date(year, month0 + 1, 0) // letzter Tag des Monats
  return d.getDate() - d.getDay()
}

// Schweizer UTC-Offset für ein Datum: CEST (+02:00) Ende März–Ende Oktober, sonst CET (+01:00).
function chOffset(date: string): string {
  const [y, m, d] = date.split("-").map(Number)
  const month0 = m - 1
  let dst = false
  if (month0 > 2 && month0 < 9) dst = true // Apr–Sep
  else if (month0 === 2) dst = d >= lastSunday(y, 2) // März
  else if (month0 === 9) dst = d < lastSunday(y, 9) // Oktober
  return dst ? "+02:00" : "+01:00"
}

function addMinutes(time: string, mins: number): string {
  const [h, m] = time.split(":").map(Number)
  const total = h * 60 + m + mins
  const hh = String(Math.floor(total / 60) % 24).padStart(2, "0")
  const mm = String(total % 60).padStart(2, "0")
  return `${hh}:${mm}`
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown"
  if (limited(ip)) {
    return NextResponse.json(
      { ok: false, message: "Zu viele Anfragen. Bitte in einer Minute erneut versuchen." },
      { status: 429 },
    )
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
      { ok: false, message: "Bitte prüfen Sie die Angaben.", issues: parsed.error.flatten().fieldErrors },
      { status: 400 },
    )
  }

  // Honeypot ausgelöst: Bot still abweisen (Erfolg vortäuschen, nichts weiterleiten).
  if (parsed.data.company_website) {
    return NextResponse.json({ ok: true })
  }

  const { name, phone, email, topic, callback_date, callback_time } = parsed.data
  const offset = chOffset(callback_date)
  const startIso = `${callback_date}T${callback_time}:00${offset}`
  const endIso = `${callback_date}T${addMinutes(callback_time, 30)}:00${offset}`
  const interest = topic ? `Website-Chatbot – ${topic}` : "Rückruf via Website-Chatbot"

  // Body für den bestehenden Zoho-Voice-Flow (Lead + Termin in Meliksahs Kalender).
  const zohoBody = {
    crm: "zoho",
    name,
    company: "",
    phone,
    email: email ?? "",
    interest,
    callback_date,
    callback_time,
    callback_datetime: startIso,
    callback_end_datetime: endIso,
    notes: "Termin vom Besucher über den Website-Chatbot gebucht.",
    source: "website-chatbot",
  }

  async function forwardToZoho(): Promise<{ ok: boolean; note?: string }> {
    const url = process.env.VOICE_WEBHOOK_URL
    if (!url) return { ok: false, note: "VOICE_WEBHOOK_URL fehlt – Zoho-Weiterleitung übersprungen." }
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(zohoBody),
      })
      return { ok: res.ok, note: res.ok ? undefined : `Zoho-Webhook antwortete mit ${res.status}` }
    } catch {
      return { ok: false, note: "Zoho-Webhook nicht erreichbar." }
    }
  }

  const booking: VoiceBooking = { name, phone, email, interest, callback_date, callback_time }

  const [mail, zoho] = await Promise.allSettled([sendVoiceConfirmation(booking), forwardToZoho()])
  const mailSent = mail.status === "fulfilled" && mail.value.sent
  const zohoOk = zoho.status === "fulfilled" && zoho.value.ok

  return NextResponse.json({ ok: true, mailSent, zohoOk })
}
