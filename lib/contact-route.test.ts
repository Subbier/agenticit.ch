import assert from "node:assert/strict"
import test from "node:test"
import { POST } from "../app/api/leads/route"

test("contact-page intake validates and forwards only its own context", async (suite) => {
  const originalFetch = globalThis.fetch
  const originalWebhook = process.env.LEADS_WEBHOOK_URL
  const valid = {
    source: "contact-page",
    name: "Internal Test",
    email: "contact@example.invalid",
    message: "Bitte unseren Anfrageweg gemeinsam prüfen.",
    consent: true,
    contactMethod: "email",
  }
  let address = 120
  let calls = 0
  let forwarded: Record<string, unknown> = {}
  let rejectWebhook = false
  const request = (body: unknown) =>
    new Request("https://example.invalid/api/leads", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-forwarded-for": `192.0.2.${++address}`,
      },
      body: JSON.stringify(body),
    })
  try {
    globalThis.fetch = async (_url, options) => {
      calls += 1
      forwarded = JSON.parse(String(options?.body))
      return new Response("", { status: rejectWebhook ? 503 : 200 })
    }
    process.env.LEADS_WEBHOOK_URL = "https://webhook.example.invalid/contact"
    await suite.test(
      "a message keeps its text and receives a fixed page and personal follow-up",
      async () => {
        const response = await POST(
          request({
            ...valid,
            pagePath: "/forged?private=1",
            marketingConsent: true,
          }),
        )
        assert.equal(response.status, 200)
        assert.deepEqual(await response.json(), { ok: true })
        assert.equal(calls, 1)
        assert.equal(forwarded.source, "contact-page")
        assert.equal(forwarded.pagePath, "/kontakt")
        assert.equal(forwarded.contactMethod, "email")
        assert.equal(forwarded.marketingConsent, false)
        assert.match(
          String(forwarded.message),
          /https:\/\/agenticit.ch\/kontakt/,
        )
        assert.ok(String(forwarded.message).includes(valid.message))
        assert.ok(!String(forwarded.message).includes("forged"))
        assert.equal(forwarded.followUpTask, "Kontaktanfrage persönlich prüfen")
        assert.ok((forwarded.tags as string[]).includes("quelle:kontakt"))
        assert.ok(!("company_website" in forwarded))
      },
    )
    await suite.test(
      "optional company and phone are not mandatory",
      async () => {
        const before = calls
        assert.equal((await POST(request(valid))).status, 200)
        assert.equal(
          (
            await POST(
              request({ ...valid, company: "Internal", phone: "+41000000000" }),
            )
          ).status,
          200,
        )
        assert.equal(calls, before + 2)
      },
    )
    await suite.test(
      "invalid or mixed requests never reach the webhook",
      async () => {
        for (const patch of [
          { consent: false },
          { message: "    " },
          { message: "abcd" },
          { message: "a".repeat(1201) },
          { phone: "abcdefg" },
          { phone: "123456" },
          { contactMethod: "phone", phone: "+41000000000" },
          {
            journey: {
              version: 1,
              challenge: "acquisition",
              channel: "web",
              system: "manual",
            },
          },
          { callback: { version: 1, path: "/kontakt" } },
          { goal: "forged" },
          { leadPrice: 15 },
          { challenge: "admin" },
          { industry: "Internal" },
          { leadVolume: "15" },
        ]) {
          const before = calls
          assert.equal(
            (await POST(request({ ...valid, ...patch }))).status,
            400,
          )
          assert.equal(calls, before)
        }
      },
    )
    await suite.test(
      "a failed handoff never produces an acknowledgement",
      async () => {
        rejectWebhook = true
        const response = await POST(request(valid))
        assert.equal(response.status, 502)
        assert.equal((await response.json()).ok, false)
      },
    )
    await suite.test("the honeypot never forwards a message", async () => {
      const before = calls
      await POST(request({ ...valid, company_website: "bot" }))
      assert.equal(calls, before)
    })
  } finally {
    globalThis.fetch = originalFetch
    if (originalWebhook === undefined) delete process.env.LEADS_WEBHOOK_URL
    else process.env.LEADS_WEBHOOK_URL = originalWebhook
  }
})
