import { NextResponse } from "next/server"
import { z } from "zod"
import { sendVoiceConfirmation, type VoiceBooking } from "@/lib/voice/mailer"

// Wird von Mias Termin-Tool (ElevenLabs) aufgerufen, sobald im
// Outbound-Gespräch ein Termin fixiert wurde. Erledigt drei Dinge:
// 1. Termin in den Berater-Kalender (bestehender Zoho-Voice-Flow)
// 2. Bestätigungs-E-Mail an den Kunden
// 3. Status-Update des Krankenkassen-Leads auf "Termin vereinbart"
export const runtime = "nodejs"
export const maxDuration = 30

const schema = z.object({
  record_id: z.string().trim().max(40).optional().default(""),
  name: z.string().trim().min(2).max(160),
  telefon: z.string().trim().min(5).max(40),
  email: z.string().trim().max(180).optional().default(""),
  datum: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Format YYYY-MM-DD"),
  uhrzeit: z.string().regex(/^\d{2}:\d{2}$/, "Format HH:MM"),
})

// Letzter Sonntag eines Monats (Schweizer Sommerzeit-Regel).
function lastSunday(year: number, month0: number): number {
  const d = new Date(year, month0 + 1, 0)
  return d.getDate() - d.getDay()
}

function chOffset(date: string): string {
  const [y, m, d] = date.split("-").map(Number)
  const month0 = m - 1
  let dst = false
  if (month0 > 2 && month0 < 9) dst = true
  else if (month0 === 2) dst = d >= lastSunday(y, 2)
  else if (month0 === 9) dst = d < lastSunday(y, 9)
  return dst ? "+02:00" : "+01:00"
}

function addMinutes(time: string, mins: number): string {
  const [h, m] = time.split(":").map(Number)
  const total = h * 60 + m + mins
  return `${String(Math.floor(total / 60) % 24).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`
}

async function post(url: string | undefined, body: unknown, label: string): Promise<boolean> {
  if (!url) {
    console.error(`${label}: Webhook-URL fehlt.`)
    return false
  }
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    })
    if (!res.ok) console.error(`${label}: Antwort ${res.status}`)
    return res.ok
  } catch {
    console.error(`${label}: nicht erreichbar.`)
    return false
  }
}

export async function POST(request: Request) {
  const secret = process.env.KK_CALL_SECRET
  if (!secret || request.headers.get("x-kk-secret") !== secret) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 })
  }

  let parsed: z.infer<typeof schema>
  try {
    parsed = schema.parse(await request.json())
  } catch {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 })
  }

  const offset = chOffset(parsed.datum)
  const startIso = `${parsed.datum}T${parsed.uhrzeit}:00${offset}`
  const endIso = `${parsed.datum}T${addMinutes(parsed.uhrzeit, 30)}:00${offset}`

  // 1. Kalender-Termin (bestehender Zoho-Voice-Flow, gleiches Format wie Chatbot)
  const zohoBody = {
    crm: "zoho",
    name: parsed.name,
    company: "",
    phone: parsed.telefon,
    email: parsed.email,
    interest: "Krankenkassen-Beratung (Komplementärmedizin) – via Mia Outbound",
    callback_date: parsed.datum,
    callback_time: parsed.uhrzeit,
    callback_datetime: startIso,
    callback_end_datetime: endIso,
    notes: `Termin durch KI-Assistentin Mia im Outbound-Anruf vereinbart. Krankenkassen-Lead-ID: ${parsed.record_id || "unbekannt"}`,
    source: "kk-outbound-mia",
  }

  // 2. Status-Update im Krankenkassen-Modul (neuer Zoho-Flow)
  const statusBody = {
    record_id: parsed.record_id,
    status: "Termin vereinbart",
    termin: `${parsed.datum} ${parsed.uhrzeit}`,
  }

  // 3. Bestätigungsmail an den Kunden
  const booking: VoiceBooking = {
    name: parsed.name,
    phone: parsed.telefon,
    email: parsed.email || undefined,
    interest: "Beratungstermin Zusatzversicherung / Komplementärmedizin",
    callback_date: parsed.datum,
    callback_time: parsed.uhrzeit,
  }

  const [calendar, status, mail] = await Promise.allSettled([
    post(process.env.VOICE_WEBHOOK_URL, zohoBody, "Kalender-Flow"),
    post(process.env.KK_STATUS_WEBHOOK_URL, statusBody, "Status-Flow"),
    sendVoiceConfirmation(booking),
  ])

  return NextResponse.json({
    ok: true,
    calendar: calendar.status === "fulfilled" && calendar.value === true,
    status_updated: status.status === "fulfilled" && status.value === true,
    mail_sent: mail.status === "fulfilled" && (mail.value as { sent?: boolean }).sent === true,
  })
}
