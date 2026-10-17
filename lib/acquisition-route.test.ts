import assert from "node:assert/strict"
import test from "node:test"
import { POST } from "../app/api/leads/route"
import { buildAcquisitionPlan } from "./acquisition-planner"

test("planning inquiries validate and forward exactly once in a protected mock", async (suite) => {
  const originalFetch = globalThis.fetch
  const originalWebhook = process.env.LEADS_WEBHOOK_URL
  const input = {
    version: 1,
    industryIds: ["versicherung"],
    monthlyCustomers: 10,
    closeRate: 25,
    handlingMinutes: 15,
  }
  const lead = {
    source: "potenzialrechner",
    acquisitionPlan: input,
    name: "Internal Test",
    email: "planner-route@example.invalid",
    company: "Test organisation",
    consent: true,
  }
  let calls = 0
  let forwarded: Record<string, unknown> = {}
  let ip = 1
  const request = (body: unknown) =>
    new Request("https://example.invalid/api/leads", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-forwarded-for": `198.51.100.${ip++}`,
      },
      body: JSON.stringify(body),
    })
  try {
    process.env.LEADS_WEBHOOK_URL = "https://webhook.example.invalid/planning"
    globalThis.fetch = async (_url, options) => {
      calls++
      forwarded = JSON.parse(String(options?.body))
      return new Response("", { status: 200 })
    }
    await suite.test(
      "legacy mismatched source and invalid assumptions never leave the server",
      async () => {
        for (const patch of [
          { source: "potenzial" },
          { consent: false },
          { acquisitionPlan: { ...input, closeRate: 0 } },
          { company: "" },
          { contactMethod: "phone", phone: "" },
        ])
          assert.equal((await POST(request({ ...lead, ...patch }))).status, 400)
        assert.equal(calls, 0)
      },
    )
    await suite.test(
      "the optional plan is derived rather than trusted as supplied prose",
      async () => {
        const response = await POST(
          request({ ...lead, message: "Forged result", leadPrice: 1 }),
        )
        assert.equal(response.status, 200)
        assert.equal((await response.json()).ok, true)
        assert.equal(calls, 1)
        assert.equal(forwarded.message, buildAcquisitionPlan(input))
        assert.equal(forwarded.leadPrice, undefined)
        assert.equal(forwarded.marketingConsent, false)
        assert.equal(
          forwarded.followUpTask,
          "Anfragenplanung persönlich prüfen",
        )
      },
    )
    await suite.test(
      "a filled bot field does not forward anything",
      async () => {
        assert.equal(
          (await POST(request({ ...lead, company_website: "filled" }))).status,
          200,
        )
        assert.equal(calls, 1)
      },
    )
    await suite.test(
      "delivery rejection is not reported as a received inquiry",
      async () => {
        globalThis.fetch = async () => new Response("", { status: 503 })
        const response = await POST(request(lead))
        assert.equal(response.status, 502)
        assert.equal((await response.json()).ok, false)
      },
    )
    await suite.test(
      "no configured destination remains an honest error",
      async () => {
        delete process.env.LEADS_WEBHOOK_URL
        assert.equal((await POST(request(lead))).status, 500)
      },
    )
  } finally {
    globalThis.fetch = originalFetch
    if (originalWebhook === undefined) delete process.env.LEADS_WEBHOOK_URL
    else process.env.LEADS_WEBHOOK_URL = originalWebhook
  }
})
