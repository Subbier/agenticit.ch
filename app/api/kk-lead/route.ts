import { NextResponse } from "next/server"
import { z } from "zod"

// Nimmt Leads der /kktermin-Landingpage entgegen und legt sie im
// Zoho-Modul "Krankenkassen_Leads" an (via KK_WEBHOOK_URL -> Zoho Flow).
// Feld-Mapping entspricht 1:1 den API-Namen des Moduls.
export const runtime = "nodejs"
export const maxDuration = 15

const schema = z.object({
  vorname: z.string().trim().min(2).max(80),
  nachname: z.string().trim().min(2).max(80),
  telefon: z.string().trim().min(5).max(40),
  email: z.string().trim().email().max(180),
  plz: z.string().trim().max(4).optional().default(""),
  kasse: z.string().trim().min(2).max(60),
  franchise: z.enum(["", "300", "500", "1000", "1500", "2000", "2500"]).optional().default(""),
  consent: z.literal(true),
  // Honeypot: legitime Nutzer lassen dieses Feld leer.
  company_website: z.string().trim().max(200).optional().default(""),
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

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  if (limited(ip)) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 })
  }

  let parsed: z.infer<typeof schema>
  try {
    parsed = schema.parse(await request.json())
  } catch {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 })
  }

  // Honeypot ausgefüllt -> Bot. Stillschweigend "ok" melden.
  if (parsed.company_website) return NextResponse.json({ ok: true })

  // Payload mit den API-Feldnamen des Zoho-Moduls "Krankenkassen_Leads".
  const record = {
    Name: `${parsed.vorname} ${parsed.nachname}`,
    Vorname: parsed.vorname,
    Nachname: parsed.nachname,
    Telefon: parsed.telefon,
    Email: parsed.email,
    Plz: parsed.plz || null,
    Aktuelle_Krankenkasse: parsed.kasse,
    Franchise: parsed.franchise || null,
    Interesse: "Zusatzversicherung",
    Kampagnen_Typ: "Inbound",
    Status: "Neu",
    Opt_in: true,
    Herkunft_Quelle: "Landingpage /kktermin (Alternativmedizin)",
  }

  const url = process.env.KK_WEBHOOK_URL
  if (!url) {
    console.error("KK_WEBHOOK_URL fehlt – Krankenkassen-Lead nicht weitergeleitet:", record.Name)
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 })
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ module: "Krankenkassen_Leads", record }),
    })
    if (!res.ok) {
      console.error("KK-Webhook antwortete mit", res.status)
      return NextResponse.json({ ok: false, error: "upstream" }, { status: 502 })
    }
  } catch {
    return NextResponse.json({ ok: false, error: "unreachable" }, { status: 502 })
  }

  return NextResponse.json({ ok: true })
}
