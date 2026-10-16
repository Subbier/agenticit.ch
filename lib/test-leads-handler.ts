import {
  prepareTestLead,
  testLeadSchema,
  type PreparedTestLead,
} from "./test-leads"

export type TestLeadReceipt = { receiptId: string; callbackLabel: string }
export type SubmitTestLead = (
  lead: PreparedTestLead,
  ip: string,
) => Promise<TestLeadReceipt>

export function createTestLeadHandler(submit: SubmitTestLead) {
  return async function POST(request: Request) {
    const respond = (data: object, status = 200) =>
      Response.json(data, { status, headers: { "Cache-Control": "no-store" } })
    const origin = request.headers.get("origin")
    if (origin && origin !== new URL(request.url).origin)
      return respond({ ok: false }, 403)
    if (
      !request.headers
        .get("content-type")
        ?.toLowerCase()
        .startsWith("application/json")
    )
      return respond({ ok: false }, 415)
    let value: unknown
    try {
      const body = await request.text()
      if (body.length > 8192) return respond({ ok: false }, 413)
      value = JSON.parse(body)
    } catch {
      return respond({ ok: false, message: "Die Anfrage ist ungültig." }, 400)
    }
    const result = testLeadSchema.safeParse(value)
    if (!result.success)
      return respond(
        {
          ok: false,
          message:
            "Bitte prüfe die Pflichtfelder und bestätige den KI-Testanruf durch Mia.",
        },
        400,
      )
    if (result.data.companyWebsite) return respond({ ok: true })
    try {
      const receipt = await submit(
        prepareTestLead(result.data, new Date().toISOString()),
        request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
          "unknown",
      )
      return respond({ ok: true, ...receipt })
    } catch {
      // No personal data, provider payload or credentials in errors or logs.
      return respond(
        {
          ok: false,
          message:
            "Deine Anfrage konnte noch nicht vollständig verarbeitet werden. Bitte versuche es mit denselben Angaben erneut oder kontaktiere sr@agenticit.ch.",
        },
        503,
      )
    }
  }
}
