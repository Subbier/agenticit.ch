import test from "node:test"
import assert from "node:assert/strict"
import { createHmac } from "node:crypto"
import { readFileSync } from "node:fs"
import { readBoundedJson, validTwilioSignature } from "./request-security"
import { GET as fallback } from "../app/api/whatsapp/fallback/route"
import { POST as inbound } from "../app/api/whatsapp/inbound/route"
import { POST as voiceConfirmation } from "../app/api/voice/confirm/route"

test("the chat handler does not shadow Next.js process environment macros", () => {
  assert.doesNotMatch(
    readFileSync("components/chatbot-widget.tsx", "utf8"),
    /function process\(/,
  )
})

test("JSON bodies are bounded even without a content-length header", async () => {
  const request = new Request("https://agenticit.ch/api/leads", {
    method: "POST",
    body: JSON.stringify({ value: "a".repeat(65537) }),
  })
  await assert.rejects(readBoundedJson(request))
  assert.deepEqual(
    await readBoundedJson(
      new Request("https://agenticit.ch", {
        method: "POST",
        body: '{"ok":true}',
      }),
    ),
    { ok: true },
  )
})

test("Twilio signatures bind the exact public URL and every form parameter", () => {
  const url = "https://agenticit.ch/api/whatsapp/inbound"
  const params = new URLSearchParams({
    From: "whatsapp:+41000000000",
    Body: "Hello",
  })
  const token = "test-only-placeholder"
  const signature = createHmac("sha1", token)
    .update(url + "BodyHelloFromwhatsapp:+41000000000")
    .digest("base64")
  assert.equal(validTwilioSignature(url, params, signature, token), true)
  assert.equal(validTwilioSignature(url, params, "", token), false)
  assert.equal(validTwilioSignature(url, params, signature, ""), false)
  params.set("Body", "changed")
  assert.equal(validTwilioSignature(url, params, signature, token), false)
})

test("WhatsApp endpoints fail closed without authentication", async () => {
  const cron = process.env.CRON_SECRET
  const twilio = process.env.TWILIO_AUTH_TOKEN
  delete process.env.CRON_SECRET
  delete process.env.TWILIO_AUTH_TOKEN
  try {
    assert.equal(
      (
        await fallback(
          new Request("https://agenticit.ch/api/whatsapp/fallback"),
        )
      ).status,
      401,
    )
    assert.equal(
      (
        await inbound(
          new Request("https://agenticit.ch/api/whatsapp/inbound", {
            method: "POST",
            body: "From=whatsapp%3A%2B41000000000&Body=Hello",
            headers: { "content-type": "application/x-www-form-urlencoded" },
          }),
        )
      ).status,
      403,
    )
  } finally {
    if (cron !== undefined) process.env.CRON_SECRET = cron
    if (twilio !== undefined) process.env.TWILIO_AUTH_TOKEN = twilio
  }
})

test("voice confirmations cannot trigger email or CRM writes without a secret", async () => {
  const response = await voiceConfirmation(
    new Request("https://agenticit.ch/api/voice/confirm", {
      method: "POST",
      body: "{}",
    }),
  )
  assert.equal(response.status, 401)
})
