import assert from "node:assert/strict"
import test from "node:test"
import { POST } from "../app/api/potential-report/route"
import { potentialConfigs, potentialKinds } from "./potential-report"

test("PDF gate validates contact, rejects delivery errors, and sends all seven contexts", async () => {
  const originalFetch = globalThis.fetch,
    originalWebhook = process.env.LEADS_WEBHOOK_URL
  let calls = 0,
    fail = false,
    applicationError = false
  const base = {
    source: "anfragen-check",
    name: "Example Person",
    company: "Example Company",
    email: "test@example.invalid",
    phone: "+41 00 000 00 00",
    consent: true,
    potentialReport: {
      version: 1,
      kind: "conversion",
      volume: 100,
      targetVolume: 100,
      currentRate: 20,
      targetRate: 22,
      value: 3000,
      margin: 40,
      minutes: 30,
      targetMinutes: 15,
      hourlyRate: 100,
      setupCost: 1000,
      monthlyCost: 100,
    },
  }
  let ip = 1
  const request = (body: unknown) =>
    new Request("https://example.invalid/api/potential-report", {
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
      assert.ok(payload.message.includes("Szenario"))
      assert.ok(
        payload.tags.includes(`potenzial:${payload.potentialReport.kind}`),
      )
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
      { potentialReport: undefined },
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
    for (const kind of potentialKinds) {
      const response = await POST(
        request({
          ...base,
          source: potentialConfigs[kind].source,
          potentialReport: { ...base.potentialReport, kind },
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
    assert.equal(calls, 9)
  } finally {
    globalThis.fetch = originalFetch
    if (originalWebhook === undefined) delete process.env.LEADS_WEBHOOK_URL
    else process.env.LEADS_WEBHOOK_URL = originalWebhook
  }
})
