import { NextResponse } from "next/server"
import { kvConfigured, kvGetJson, kvSetJson } from "@/lib/store/kv"
import { sendText, normalizePhone } from "@/lib/whatsapp/twilio"
import type { Analysis } from "@/lib/analyse/types"

export const runtime = "nodejs"

type Pending = { analysis: Analysis; createdAt: number; status: string }

// Morgen um <hour> Uhr (Europe/Zurich, Sommerzeit +02:00) als ISO-Zeitfenster (30 Min).
function tomorrowAt(hour: number): { date: string; time: string; startIso: string; endIso: string } {
  const d = new Date()
  d.setDate(d.getDate() + 1)
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, "0")
  const day = String(d.getDate()).padStart(2, "0")
  const hh = String(hour).padStart(2, "0")
  const date = `${y}-${m}-${day}`
  return {
    date,
    time: `${hh}:00`,
    startIso: `${date}T${hh}:00:00+02:00`,
    endIso: `${date}T${hh}:30:00+02:00`,
  }
}

// Bucht den Rückruftermin über den bestehenden Zoho-Voice-Flow (Lead + Termin bei Meliksah).
async function bookZoho(p: Pending, hour: number): Promise<void> {
  const url = process.env.VOICE_WEBHOOK_URL
  if (!url) return
  const c = p.analysis.contact
  const t = tomorrowAt(hour)
  const body = {
    crm: "zoho",
    name: `${c.vorname} ${c.nachname}`.trim(),
    company: c.firma,
    phone: c.phone,
    email: c.email,
    interest: "KI-Analyse – Rückruf via WhatsApp",
    callback_date: t.date,
    callback_time: t.time,
    callback_datetime: t.startIso,
    callback_end_datetime: t.endIso,
    notes: "Termin vom Besucher per WhatsApp gebucht.",
    source: "whatsapp-analyse",
  }
  await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  }).catch(() => {})
}

// Twilio sendet eingehende WhatsApp-Nachrichten (Button-Klicks & Texte) als form-urlencoded POST.
export async function POST(request: Request) {
  const form = await request.formData().catch(() => null)
  if (!form) return new NextResponse("", { status: 200 })

  const from = String(form.get("From") || "")
  const buttonPayload = String(form.get("ButtonPayload") || "")
  const body = String(form.get("Body") || "").trim()
  const phone = normalizePhone(from.replace("whatsapp:", ""))

  if (!kvConfigured() || !phone) return new NextResponse("", { status: 200 })

  const key = `wa:pending:${phone}`
  const p = await kvGetJson<Pending>(key)
  const choice = buttonPayload

  if (choice === "slot_morgen_10" || choice === "slot_morgen_14") {
    const hour = choice === "slot_morgen_10" ? 10 : 14
    if (p) {
      await bookZoho(p, hour)
      await kvSetJson(key, { ...p, status: "booked" }, 60 * 60 * 72)
    }
    await sendText(
      phone,
      `Perfekt – Ihr Rückruf ist für morgen um ${hour}:00 Uhr notiert. ` +
        `Wir melden uns pünktlich, das Gespräch dauert max. 3 Minuten. Bis dann!`,
    )
  } else if (choice === "slot_anderer") {
    await sendText(phone, "Gerne – wann passt es Ihnen besser? Schreiben Sie mir einfach Ihren Wunschtag und die Uhrzeit.")
  } else if (p && p.status === "pending" && body) {
    // Freie Antwort (z. B. nach „Anderer Zeitpunkt") → an Berater übergeben, keine Auto-Mail.
    await sendText(phone, "Danke! Ich habe Ihren Wunsch notiert – einer unserer Berater meldet sich zur Abstimmung. 🙌")
    await bookZoho(p, 10) // Platzhalter-Termin morgen, Berater verschiebt nach Wunsch
    await kvSetJson(key, { ...p, status: "manual" }, 60 * 60 * 72)
  }

  return new NextResponse("", { status: 200 })
}
