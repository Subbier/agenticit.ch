import { NextResponse } from "next/server"
import { kvConfigured, kvKeys, kvGetJson, kvSetJson } from "@/lib/store/kv"
import { generatePdf } from "@/lib/analyse/pdf"
import { sendReportMail } from "@/lib/analyse/mailer"
import type { Analysis } from "@/lib/analyse/types"

// PDF + SMTP brauchen die Node-Runtime.
export const runtime = "nodejs"
export const maxDuration = 60

const TWO_HOURS = 2 * 60 * 60 * 1000

type Pending = { analysis: Analysis; createdAt: number; status: string }

// Wird von Vercel Cron aufgerufen (vercel.json). Sendet die Analyse-Mail nur,
// wenn der Besucher binnen 2 h KEINEN Termin über WhatsApp gebucht hat.
export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET
  const auth = request.headers.get("authorization")
  if (secret && auth !== `Bearer ${secret}`) {
    return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 })
  }
  if (!kvConfigured()) return NextResponse.json({ ok: true, note: "KV nicht konfiguriert" })

  const keys = await kvKeys("wa:pending:*")
  const now = Date.now()
  let mailed = 0

  for (const key of keys) {
    const p = await kvGetJson<Pending>(key)
    if (!p || p.status !== "pending") continue
    if (now - p.createdAt < TWO_HOURS) continue
    try {
      const pdf = await generatePdf(p.analysis)
      await sendReportMail(p.analysis, pdf)
      await kvSetJson(key, { ...p, status: "mail_sent" }, 60 * 60 * 24)
      mailed++
    } catch (e) {
      console.error("[whatsapp/fallback] Mailversand fehlgeschlagen:", e)
      // bleibt "pending" → nächster Cron-Lauf versucht es erneut
    }
  }

  return NextResponse.json({ ok: true, checked: keys.length, mailed })
}
