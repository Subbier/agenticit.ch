import { NextResponse } from "next/server"
import { sendVoiceConfirmation, type VoiceBooking } from "@/lib/voice/mailer"

// SMTP braucht die Node-Runtime (nicht Edge).
export const runtime = "nodejs"
export const maxDuration = 30

// Leitet die Buchung unverändert an den bestehenden Zoho-Flow weiter
// (Lead + Termin in Meliksahs Kalender) – unabhängig vom Mailversand.
async function forwardToZoho(body: unknown): Promise<{ ok: boolean; note?: string }> {
  const url = process.env.VOICE_WEBHOOK_URL
  if (!url) return { ok: false, note: "VOICE_WEBHOOK_URL fehlt – Zoho-Weiterleitung übersprungen." }
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    })
    return { ok: res.ok, note: res.ok ? undefined : `Zoho-Webhook antwortete mit ${res.status}` }
  } catch {
    return { ok: false, note: "Zoho-Webhook nicht erreichbar." }
  }
}

export async function POST(request: Request) {
  let json: Record<string, unknown>
  try {
    json = (await request.json()) as Record<string, unknown>
  } catch {
    return NextResponse.json({ ok: false, message: "Ungültiges JSON." }, { status: 400 })
  }

  const s = (v: unknown) => (typeof v === "string" ? v : v == null ? undefined : String(v))
  const booking: VoiceBooking = {
    name: s(json.name),
    company: s(json.company),
    phone: s(json.phone),
    email: s(json.email),
    interest: s(json.interest),
    callback_date: s(json.callback_date),
    callback_time: s(json.callback_time),
    notes: s(json.notes),
  }

  // Mail + Zoho-Weiterleitung parallel; Fehler einzeln tolerieren.
  const [mail, zoho] = await Promise.allSettled([sendVoiceConfirmation(booking), forwardToZoho(json)])

  const mailSent = mail.status === "fulfilled" && mail.value.sent
  const notes: string[] = []
  if (mail.status === "fulfilled" && mail.value.note) notes.push(mail.value.note)
  if (mail.status === "rejected") notes.push("Mailversand fehlgeschlagen.")
  if (zoho.status === "fulfilled" && zoho.value.note) notes.push(zoho.value.note)

  return NextResponse.json({ ok: true, mailSent, notes })
}
