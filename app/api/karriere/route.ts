import { NextResponse } from "next/server"
import { z } from "zod"
import { KARRIERE_JOBS } from "@/lib/karriere-content"

const optionalText = (max = 500) =>
  z.preprocess((value) => (value === "" ? undefined : value), z.string().trim().max(max).optional())

const POSITION_TITLES = KARRIERE_JOBS.map((job) => job.title) as [string, ...string[]]

const karriereSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(180),
  consent: z.literal(true),
  position: z.enum(POSITION_TITLES),
  phone: optionalText(80),
  link: optionalText(300),
  message: optionalText(1500),
  // Honeypot: legitime Bewerber:innen lassen dieses Feld leer.
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

  const parsed = karriereSchema.safeParse(json)

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

  const webhookUrl = process.env.KARRIERE_WEBHOOK_URL

  if (!webhookUrl) {
    return NextResponse.json(
      { ok: false, message: "Der Bewerbungs-Webhook ist noch nicht konfiguriert." },
      { status: 500 },
    )
  }

  const { company_website: _honeypot, ...applicationData } = parsed.data

  // Zielsystem Zoho People (Recruitment-Modul). Die eigentliche Anlage des
  // Bewerber-Datensatzes übernimmt die Automation hinter dem Webhook
  // (Zoho Flow), siehe karriere-zoho-people-integration.md.
  const payload = {
    ...applicationData,
    zielsystem: "zoho_people",
    modul: "recruitment",
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
        { ok: false, message: "Der Bewerbungs-Webhook hat die Anfrage abgelehnt." },
        { status: 502 },
      )
    }
  } catch {
    return NextResponse.json(
      { ok: false, message: "Der Bewerbungs-Webhook ist aktuell nicht erreichbar." },
      { status: 502 },
    )
  }

  return NextResponse.json({ ok: true })
}
