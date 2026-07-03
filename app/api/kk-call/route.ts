import { NextResponse } from "next/server"
import { z } from "zod"

// Löst den Mia-Outbound-Anruf für einen Krankenkassen-Lead aus.
// Aufgerufen vom Zoho Flow (Schritt nach "Create module entry").
// Secrets bleiben serverseitig: ELEVENLABS_API_KEY, KK_CALL_SECRET.
export const runtime = "nodejs"
export const maxDuration = 30

const schema = z.object({
  record_id: z.string().trim().max(40).optional().default(""),
  vorname: z.string().trim().min(1).max(80),
  nachname: z.string().trim().min(1).max(80),
  telefon: z.string().trim().min(5).max(40),
  email: z.string().trim().max(180).optional().default(""),
  kasse: z.string().trim().max(60).optional().default(""),
  franchise: z.string().trim().max(10).optional().default(""),
})

// Schweizer Telefonnummer nach E.164 normalisieren (076... -> +4176...).
function toE164(raw: string): string | null {
  const d = raw.replace(/[^\d+]/g, "")
  if (d.startsWith("+41") && d.length === 12) return d
  if (d.startsWith("0041")) return `+${d.slice(2)}`
  if (d.startsWith("0") && d.length === 10) return `+41${d.slice(1)}`
  if (d.startsWith("+")) return d
  return null
}

// Anrufe nur zu vertretbaren Zeiten (Europe/Zurich, Mo-Sa 08:00-20:30).
function withinCallingHours(): boolean {
  const now = new Date()
  const zh = new Intl.DateTimeFormat("de-CH", {
    timeZone: "Europe/Zurich",
    hour: "numeric",
    minute: "numeric",
    weekday: "short",
    hour12: false,
  }).formatToParts(now)
  const get = (t: string) => zh.find((p) => p.type === t)?.value ?? ""
  const hour = parseInt(get("hour"), 10)
  const minute = parseInt(get("minute"), 10)
  const weekday = get("weekday") // "So." etc.
  if (weekday.startsWith("So")) return false
  const mins = hour * 60 + minute
  return mins >= 8 * 60 && mins <= 20 * 60 + 30
}

let cachedPhoneId: string | null = null

async function resolvePhoneNumberId(apiKey: string, number: string): Promise<string | null> {
  if (cachedPhoneId) return cachedPhoneId
  const res = await fetch("https://api.elevenlabs.io/v1/convai/phone-numbers", {
    headers: { "xi-api-key": apiKey },
  })
  if (!res.ok) return null
  const list = (await res.json()) as Array<{ phone_number_id?: string; id?: string; phone_number?: string }>
  const hit = list.find((p) => (p.phone_number || "").replace(/\s/g, "") === number)
  cachedPhoneId = hit?.phone_number_id || hit?.id || null
  return cachedPhoneId
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

  const to = toE164(parsed.telefon)
  if (!to) return NextResponse.json({ ok: false, error: "bad_phone" }, { status: 400 })

  if (!withinCallingHours()) {
    // Ausserhalb der Anrufzeiten: kein Anruf. (Zoho kann später erneut senden.)
    return NextResponse.json({ ok: false, deferred: true, note: "outside_calling_hours" })
  }

  const apiKey = process.env.ELEVENLABS_API_KEY
  const agentId = process.env.KK_OUTBOUND_AGENT_ID
  const ownNumber = process.env.KK_OUTBOUND_NUMBER
  if (!apiKey || !agentId || !ownNumber) {
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 })
  }

  const phoneNumberId = await resolvePhoneNumberId(apiKey, ownNumber)
  if (!phoneNumberId) {
    return NextResponse.json({ ok: false, error: "phone_number_not_found" }, { status: 503 })
  }

  const res = await fetch("https://api.elevenlabs.io/v1/convai/twilio/outbound-call", {
    method: "POST",
    headers: { "xi-api-key": apiKey, "Content-Type": "application/json" },
    body: JSON.stringify({
      agent_id: agentId,
      agent_phone_number_id: phoneNumberId,
      to_number: to,
      conversation_initiation_client_data: {
        dynamic_variables: {
          vorname: parsed.vorname,
          nachname: parsed.nachname,
          telefon: to,
          email: parsed.email,
          kasse: parsed.kasse,
          franchise: parsed.franchise,
          record_id: parsed.record_id,
        },
      },
    }),
  })

  if (!res.ok) {
    const detail = await res.text().catch(() => "")
    console.error("ElevenLabs outbound-call fehlgeschlagen:", res.status, detail.slice(0, 300))
    return NextResponse.json({ ok: false, error: "call_failed" }, { status: 502 })
  }

  const data = (await res.json().catch(() => ({}))) as { conversation_id?: string; callSid?: string }
  return NextResponse.json({ ok: true, conversation_id: data.conversation_id ?? null })
}
