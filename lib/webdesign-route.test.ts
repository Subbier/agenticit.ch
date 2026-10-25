import assert from "node:assert/strict"
import test from "node:test"
import { POST } from "../app/api/website-brief/route"

test("Website concept requires valid contact and successful lead acknowledgement", async () => {
  const originalFetch = globalThis.fetch,
    originalWebhook = process.env.LEADS_WEBHOOK_URL
  let calls = 0,
    fail = false,
    applicationError = false
  const base = {
    source: "journey-check",
    name: "Example Person",
    company: "Example Company",
    email: "test@example.invalid",
    phone: "+41 00 000 00 00",
    consent: true,
    websiteBrief: {
      version: 1,
      type: "landing",
      goal: "inquiries",
      style: "bold",
      content: "partial",
      timing: "quarter",
    },
  }
  let ip = 1
  const request = (body: unknown) =>
    new Request("https://example.invalid/api/website-brief", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-forwarded-for": `198.51.100.${ip++}`,
      },
      body: JSON.stringify(body),
    })
  try {
    process.env.LEADS_WEBHOOK_URL = "https://example.invalid/mock-only"
    globalThis.fetch = async (_url, options) => {
      calls++
      const payload = JSON.parse(String(options?.body))
      assert.equal(payload.phone, base.phone)
      assert.equal(payload.marketingConsent, false)
      assert.ok(payload.message.includes("WEBSITE-KONZEPT"))
      assert.equal(payload.pagePath, "/loesungen/webdesign")
      assert.ok(payload.tags.includes("service:webdesign"))
      return Response.json(
        { ok: !applicationError },
        { status: fail ? 503 : 200 },
      )
    }
    for (const patch of [
      { phone: "" },
      { phone: undefined },
      { phone: "invalid" },
      { name: "" },
      { email: "" },
      { consent: false },
      { company: "" },
      { websiteBrief: undefined },
      { source: "marketing-setup-check" },
      {
        journey: {
          version: 1,
          challenge: "admin",
          channel: "web",
          system: "manual",
        },
      },
      { company_website: "bot" },
    ]) {
      const response = await POST(request({ ...base, ...patch }))
      assert.equal(response.status, 400)
      assert.ok(
        !response.headers.get("content-type")?.includes("application/pdf"),
      )
    }
    assert.equal(calls, 0)
    fail = true
    assert.equal((await POST(request(base))).status, 502)
    fail = false
    applicationError = true
    assert.equal((await POST(request(base))).status, 502)
    applicationError = false
    {
      const response = await POST(
        request({
          ...base,
          message: "Untrusted message",
          marketingConsent: true,
        }),
      )
      assert.equal(response.status, 200)
      assert.equal(response.headers.get("content-type"), "application/pdf")
      assert.equal(response.headers.get("cache-control"), "private, no-store")
      const bytes = Buffer.from(await response.arrayBuffer())
      assert.equal(bytes.subarray(0, 5).toString(), "%PDF-")
      assert.equal(
        (bytes.toString("latin1").match(/\/Type \/Page\b/g) ?? []).length,
        1,
      )
    }
    assert.equal(calls, 3)
  } finally {
    globalThis.fetch = originalFetch
    if (originalWebhook === undefined) delete process.env.LEADS_WEBHOOK_URL
    else process.env.LEADS_WEBHOOK_URL = originalWebhook
  }
})
