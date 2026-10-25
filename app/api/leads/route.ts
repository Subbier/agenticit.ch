import { NextResponse } from "next/server"
import { leadSchema, prepareLeadPayload } from "@/lib/lead-intake"

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
      {
        ok: false,
        message:
          "Zu viele Anfragen. Bitte versuchen Sie es in einer Minute erneut.",
      },
      { status: 429 },
    )
  }

  let json: unknown

  try {
    json = await request.json()
  } catch {
    return NextResponse.json(
      { ok: false, message: "Ungültiges JSON." },
      { status: 400 },
    )
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
      {
        ok: false,
        message:
          "Die Anfrage kann gerade nicht übermittelt werden. Bitte kontaktieren Sie info@agenticit.ch.",
      },
      { status: 500 },
    )
  }

  const payload = prepareLeadPayload(
    parsed.data,
    new Date().toISOString(),
    request.headers.get("user-agent") || undefined,
  )

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(10_000),
    })

    if (!response.ok) {
      return NextResponse.json(
        {
          ok: false,
          message:
            "Die Anfrage konnte gerade nicht übermittelt werden. Bitte versuchen Sie es später erneut.",
        },
        { status: 502 },
      )
    }
    if (parsed.data.potentialReport || parsed.data.websiteBrief) {
      // Some receivers return an application error inside an HTTP 200 response.
      const receipt = await response.text()
      try {
        const result = JSON.parse(receipt)
        if (
          result.ok === false ||
          result.success === false ||
          result.status === "error"
        )
          return NextResponse.json(
            {
              ok: false,
              message:
                "Ihre PDF-Anfrage wurde noch nicht angenommen. Bitte versuchen Sie es später erneut.",
            },
            { status: 502 },
          )
      } catch {
        /* Existing webhook also permits an empty acceptance body. */
      }
    }
  } catch {
    return NextResponse.json(
      {
        ok: false,
        message:
          "Die Anfrage konnte gerade nicht übermittelt werden. Bitte versuchen Sie es später erneut.",
      },
      { status: 502 },
    )
  }

  return NextResponse.json({ ok: true })
}
