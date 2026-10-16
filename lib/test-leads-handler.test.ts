import assert from "node:assert/strict"
import test from "node:test"
import { createTestLeadHandler } from "./test-leads-handler"
import { TEST_LEAD_CONSENT_VERSION } from "./test-leads"
import { nextTestLeadCallback } from "./test-leads-schedule"

const input = {
  requestId: "cf8b9130-4f9e-4891-90c2-30a9a7f655a1",
  fullName: "Internal Test",
  gender: "male",
  birthDate: "1990-01-01",
  postcode: "3000",
  city: "Bern",
  familyMembers: 0,
  insurer: "CSS",
  phone: "0791234567",
  email: "internal@example.invalid",
  consent: true,
  consentVersion: TEST_LEAD_CONSENT_VERSION,
}
function request(body: unknown, headers: Record<string, string> = {}) {
  return new Request("https://example.invalid/api/testleads", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      origin: "https://example.invalid",
      ...headers,
    },
    body: JSON.stringify(body),
  })
}

test("no CRM delivery or call is possible without explicit valid consent", async () => {
  let calls = 0
  const POST = createTestLeadHandler(async () => {
    calls++
    return { receiptId: "TEST", callbackLabel: "queued" }
  })
  for (const patch of [
    { consent: false },
    { phone: "wrong" },
    { consentVersion: "old" },
    { birthDate: "2026-02-30" },
  ])
    assert.equal((await POST(request({ ...input, ...patch }))).status, 400)
  assert.equal(
    (await POST(request(input, { origin: "https://attacker.invalid" }))).status,
    403,
  )
  assert.equal(
    (await POST(request(input, { "content-type": "text/plain" }))).status,
    415,
  )
  assert.equal(calls, 0)
})
test("honest receipt only after successful CRM and queue handoff", async () => {
  let deliveries = 0
  const POST = createTestLeadHandler(async (lead) => {
    deliveries++
    assert.equal(lead.phone, "+41791234567")
    assert.equal(lead.marketingConsent, false)
    return { receiptId: "TEST", callbackLabel: "queued" }
  })
  const response = await POST(request(input))
  assert.equal(response.status, 200)
  assert.equal((await response.json()).receiptId, "TEST")
  assert.equal(deliveries, 1)
  const failed = await createTestLeadHandler(async () => {
    throw new Error("private provider detail")
  })(request(input))
  assert.equal(failed.status, 503)
  assert.equal((await failed.text()).includes("private provider detail"), false)
})
test("honeypot submissions never trigger delivery", async () => {
  let deliveries = 0
  const POST = createTestLeadHandler(async () => {
    deliveries++
    throw new Error("unreachable")
  })
  assert.equal(
    (await POST(request({ ...input, companyWebsite: "bot" }))).status,
    200,
  )
  assert.equal(deliveries, 0)
})
test("user-requested demo calls are due immediately, including evenings and weekends", () => {
  for (const value of [
    "2026-10-16T20:00:00Z",
    "2026-10-17T10:00:00Z",
    "2026-12-25T10:00:00Z",
  ]) {
    const submitted = new Date(value)
    assert.equal(
      nextTestLeadCallback(submitted).getTime() - submitted.getTime(),
      0,
    )
  }
})
