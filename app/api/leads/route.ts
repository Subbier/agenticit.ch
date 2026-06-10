import { NextResponse } from "next/server"
import { z } from "zod"

const optionalText = (max = 500) =>
  z.preprocess((value) => (value === "" ? undefined : value), z.string().trim().max(max).optional())

const leadSchema = z.object({
  source: z.enum(["home", "ai-agents", "revops", "excellence", "omnichannel", "intelligence", "smart-apps", "case-studies", "blog"]),
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(180),
  consent: z.literal(true),
  company: optionalText(160),
  phone: optionalText(80),
  message: optionalText(1200),
  leadVolume: optionalText(80),
  challenge: optionalText(160),
  industry: optionalText(120),
  // Preis pro Kundenanfrage (CHF) aus dem Rechner/Branchen-Mapping; optional.
  leadPrice: z.preprocess(
    (value) => (value === "" || value === null ? undefined : value),
    z.coerce.number().int().min(0).max(100000).optional(),
  ),
  goal: optionalText(160),
  // Honeypot: legitime Nutzer lassen dieses Feld leer.
  company_website: optionalText(200),
})

// Einfaches In-Memory-Rate-Limiting pro IP (Best-Effort, pro Server-Instanz).
const RATE_LIMIT_MAX = 5
const RATE_LIMIT_WINDOW_MS = 60_000
const rateLimitBuckets = new Map<string, { count: number; resetAt: number }>()

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for")
  if (forwarded) return forwarded.split(",")[0].trim()
  return request.headers.get("x-real-ip") || "unknown"
}

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const bucket = rateLimitBuckets.get(ip)

  if (!bucket || now > bucket.resetAt) {
    rateLimitBuckets.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
    return false
  }

  bucket.count += 1
  return bucket.count > RATE_LIMIT_MAX
}

export async function POST(request: Request) {
  if (isRateLimited(getClientIp(request))) {
    return NextResponse.json(
      { ok: false, message: "Zu viele Anfragen. Bitte versuchen Sie es in einer Minute erneut." },
      { status: 429 },
    )
  }

  let json: unknown

  try {
    json = await request.json()
  } catch {
    return NextResponse.json({ ok: false, message: "Ungültiges JSON." }, { status: 400 })
  }

  const parsed = leadSchema.safeParse(json)

  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        message: "Bitte prüfen Sie die Pflichtfelder.",
        issues: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    )
  }

  // Honeypot ausgelöst: Bot still abweisen (Erfolg vortäuschen, nichts weiterleiten).
  if (parsed.data.company_website && parsed.data.company_website.length > 0) {
    return NextResponse.json({ ok: true })
  }

  const webhookUrl = process.env.LEADS_WEBHOOK_URL

  if (!webhookUrl) {
    return NextResponse.json(
      { ok: false, message: "Lead-Webhook ist noch nicht konfiguriert." },
      { status: 500 },
    )
  }

  const { company_website: _honeypot, ...leadData } = parsed.data

  // Zoho-CRM-Aufbereitung: Tags (Branche + Lead-Preis) und automatische
  // Rückruf-Aufgabe. Die eigentliche Lead-Anlage übernimmt die Automation
  // hinter dem Webhook (z. B. Zoho Flow / Deluge), siehe zoho-one-implementierung.md.
  const tags = [
    leadData.industry ? `branche:${leadData.industry}` : null,
    typeof leadData.leadPrice === "number" ? `lead_preis:${leadData.leadPrice}` : null,
  ].filter((tag): tag is string => Boolean(tag))

  const payload = {
    ...leadData,
    crm: "zoho",
    tags,
    followUpTask: "Rückruf",
    submittedAt: new Date().toISOString(),
    userAgent: request.headers.get("user-agent") || undefined,
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      return NextResponse.json(
        { ok: false, message: "Der Lead-Webhook hat die Anfrage abgelehnt." },
        { status: 502 },
      )
    }
  } catch {
    return NextResponse.json(
      { ok: false, message: "Der Lead-Webhook ist aktuell nicht erreichbar." },
      { status: 502 },
    )
  }

  return NextResponse.json({ ok: true })
}
