import assert from "node:assert/strict"
import test from "node:test"
import { POST } from "../app/api/leads/route"

test("callback intake preserves the page and contact preference without trusting replacement text", async (suite) => {
  const originalFetch = globalThis.fetch
  const originalWebhook = process.env.LEADS_WEBHOOK_URL
  let calls = 0
  let forwarded: Record<string, unknown> = {}
  let address = 90
  const valid = {
    source: "blog",
    name: "Internal Test",
    email: "callback@example.invalid",
    phone: "+41000000000",
    consent: true,
    contactMethod: "phone",
    callback: { version: 1, path: "/blog/ki-agenten", goal: "Zeit gewinnen" },
  }
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
    process.env.LEADS_WEBHOOK_URL = "https://webhook.example.invalid/callback"
    globalThis.fetch = async (_url, options) => {
      calls += 1
      forwarded = JSON.parse(String(options?.body))
      return new Response("", { status: 200 })
    }
    await suite.test(
      "one callback forwards its derived page context once",
      async () => {
        const before = calls
        const response = await POST(
          request({
            ...valid,
            message: "forged replacement",
            goal: "forged goal",
          }),
        )
        assert.equal(response.status, 200)
        assert.equal(calls, before + 1)
        assert.ok(
          String(forwarded.message).includes(
            "https://agenticit.ch/blog/ki-agenten",
          ),
        )
        assert.ok(!String(forwarded.message).includes("forged"))
        assert.equal(forwarded.goal, "Zeit gewinnen")
        assert.equal(forwarded.contactMethod, "phone")
        assert.equal(forwarded.marketingConsent, false)
        assert.equal(
          forwarded.followUpTask,
          "Website-Rückruf persönlich prüfen",
        )
      },
    )
    await suite.test(
      "invalid phone, context and source never reach the webhook",
      async () => {
        for (const patch of [
          { phone: "abcdefg" },
          { phone: "number1234567" },
          { contactMethod: "email" },
          { consent: false },
          { source: "home" },
          {
            callback: {
              version: 1,
              path: "https://other.invalid/",
              goal: "Zeit gewinnen",
            },
          },
          {
            callback: {
              version: 1,
              path: "/blog?email=private",
              goal: "Zeit gewinnen",
            },
          },
          { callback: { version: 1, path: "/blog", goal: "unknown" } },
          { callback: { version: 2, path: "/blog", goal: "Zeit gewinnen" } },
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
      "industry and general callback paths are categorised separately",
      async () => {
        for (const [source, path] of [
          ["industry-page", "/branchen/treuhand"],
          ["website-callback", "/voiceagent"],
        ]) {
          const response = await POST(
            request({ ...valid, source, callback: { version: 1, path } }),
          )
          assert.equal(response.status, 200)
          assert.equal(forwarded.source, source)
          assert.ok(String(forwarded.message).includes(path))
        }
      },
    )
  } finally {
    globalThis.fetch = originalFetch
    if (originalWebhook === undefined) delete process.env.LEADS_WEBHOOK_URL
    else process.env.LEADS_WEBHOOK_URL = originalWebhook
  }
})
