import { readConsent } from "./consent"

const checkPages = {
  customer_journey: "/kundenreise-check",
  automation: "/automatisierungs-check",
  marketing_setup: "/marketing-setup-check",
} as const

export type CheckKind = keyof typeof checkPages
export type CheckEvent =
  | "check_started"
  | "check_result_ready"
  | "plan_download_clicked"
  | "inquiry_forwarded"

const events: ReadonlySet<string> = new Set<CheckEvent>([
  "check_started",
  "check_result_ready",
  "plan_download_clicked",
  "inquiry_forwarded",
])

// Same command format as Consent Mode. The public measurement ID is not a key.
const queueGoogleEvent: (...args: unknown[]) => void = function () {
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push(arguments)
}

/** Fixed vocabulary only. No answers, form fields, query strings or referrers. */
export function trackCheckEvent(event: CheckEvent, kind: CheckKind): boolean {
  try {
    if (
      typeof window === "undefined" ||
      window.location.protocol !== "https:" ||
      !["agenticit.ch", "www.agenticit.ch"].includes(
        window.location.hostname,
      ) ||
      readConsent()?.statistics !== true ||
      !events.has(event) ||
      !Object.hasOwn(checkPages, kind)
    )
      return false

    queueGoogleEvent("event", event, {
      send_to: "G-3NGDK2RM3B",
      check_kind: kind,
      page_location: `https://agenticit.ch${checkPages[kind]}`,
      page_referrer: "",
    })
    return true
  } catch {
    // Measurement must never interrupt a check, download or contact request.
    return false
  }
}

/** Per mounted check, not per edit. Denied stages are never replayed later. */
export function createCheckMeasurement(kind: CheckKind) {
  const attempted = new Set<CheckEvent>()
  return {
    record(event: Exclude<CheckEvent, "inquiry_forwarded">) {
      if (attempted.has(event)) return false
      attempted.add(event)
      return trackCheckEvent(event, kind)
    },
  }
}

/** A successful handoff acknowledgement is not proof of a CRM record or lead. */
export function trackInquiryAcknowledgement(
  kind: CheckKind,
  httpOk: boolean,
  body: unknown,
  honeypot: unknown,
) {
  if (
    !httpOk ||
    typeof body !== "object" ||
    body === null ||
    !("ok" in body) ||
    body.ok !== true ||
    (honeypot !== null && honeypot !== "")
  )
    return false
  return trackCheckEvent("inquiry_forwarded", kind)
}
