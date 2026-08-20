const { buildSecurityCheckWebhookPayload, validateSecurityCheckLead } = require("../../lib/security-check-lead")

const RATE_LIMIT_MAX = 5
const RATE_LIMIT_WINDOW_MS = 60_000
const rateLimitBuckets = new Map()

function getClientIp(request) {
  const forwarded = request.headers["x-forwarded-for"]
  return (Array.isArray(forwarded) ? forwarded[0] : forwarded)?.split(",")[0]?.trim() || "unknown"
}

function isRateLimited(ip) {
  const now = Date.now()
  const bucket = rateLimitBuckets.get(ip)

  if (!bucket || now > bucket.resetAt) {
    rateLimitBuckets.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
    return false
  }

  bucket.count += 1
  return bucket.count > RATE_LIMIT_MAX
}

module.exports = async function handler(request, response) {
  const requestId = crypto.randomUUID()
  response.setHeader("x-request-id", requestId)

  if (request.method !== "POST") {
    response.setHeader("Allow", "POST")
    return response.status(405).json({ ok: false, message: "Methode nicht erlaubt." })
  }

  if (isRateLimited(getClientIp(request))) {
    return response.status(429).json({
      ok: false,
      message: "Zu viele Anfragen. Bitte versuchen Sie es in einer Minute erneut.",
    })
  }

  if (JSON.stringify(request.body || {}).length > 40_000 || !validateSecurityCheckLead(request.body)) {
    return response.status(400).json({ ok: false, message: "Bitte prüfen Sie Ihre Angaben." })
  }

  const webhookUrl = process.env.LEADS_WEBHOOK_URL
  if (!webhookUrl) {
    console.error("security-check lead rejected: webhook missing", { requestId, action: request.body.action })
    return response.status(503).json({ ok: false, message: "Die Anfrage kann aktuell nicht übermittelt werden." })
  }

  try {
    const webhookResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: { "content-type": "application/json", "x-request-id": requestId },
      body: JSON.stringify(buildSecurityCheckWebhookPayload(request.body)),
      signal: AbortSignal.timeout(8_000),
    })

    if (!webhookResponse.ok) {
      console.error("security-check lead rejected by webhook", {
        requestId,
        action: request.body.action,
        status: webhookResponse.status,
      })
      return response.status(502).json({ ok: false, message: "Die Anfrage kann aktuell nicht übermittelt werden." })
    }
  } catch {
    console.error("security-check lead webhook unreachable", { requestId, action: request.body.action })
    return response.status(502).json({ ok: false, message: "Die Anfrage kann aktuell nicht übermittelt werden." })
  }

  console.info("security-check lead forwarded", { requestId, action: request.body.action })
  return response.status(200).json({ ok: true })
}
