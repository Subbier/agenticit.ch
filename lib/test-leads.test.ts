import assert from "node:assert/strict"
import test from "node:test"
import {
  testLeadSchema,
  prepareTestLead,
  normalizeSwissPhone,
  miaContext,
  TEST_LEAD_CONSENT_VERSION,
} from "./test-leads"

const input = {
  requestId: "8dd44b31-35e1-41eb-885c-320cd6e00322",
  fullName: "Internal Test Person",
  birthDate: "1990-04-30",
  postcode: "3000",
  city: "Bern",
  familyMembers: 2,
  insurer: "CSS",
  phone: "079 123 45 67",
  email: "test@example.invalid",
  consent: true,
  consentVersion: TEST_LEAD_CONSENT_VERSION,
}

test("Swiss telephone validation cannot send malformed or foreign numbers to Mia", () => {
  assert.equal(normalizeSwissPhone("079 123 45 67"), "+41791234567")
  assert.equal(normalizeSwissPhone("0041 31 123 45 67"), "+41311234567")
  for (const value of [
    "+41x791234567",
    "+41 079 123 45 67",
    "123",
    "+49 123456789",
    "079123456789",
    "foo",
  ])
    assert.equal(normalizeSwissPhone(value), null)
})
test("real dates, postcode, insurer, email and explicit versioned consent are required", () => {
  assert.equal(testLeadSchema.safeParse(input).success, true)
  for (const patch of [
    { birthDate: "2025-02-29" },
    { birthDate: "2999-01-01" },
    { birthDate: "1899-01-01" },
    { postcode: "0000" },
    { familyMembers: 2.5 },
    { insurer: "unlisted" },
    { consent: false },
    { consentVersion: "old" },
    { email: "wrong" },
    { unexpected: "value" },
  ])
    assert.equal(
      testLeadSchema.safeParse({ ...input, ...patch }).success,
      false,
      JSON.stringify(patch),
    )
})
test("CRM and Mia receive the same submitted context, with an immutable consent receipt", () => {
  const parsed = testLeadSchema.parse(input)
  const lead = prepareTestLead(parsed, "2026-10-16T15:00:00.000Z")
  assert.equal(lead.phone, "+41791234567")
  assert.equal(lead.familyMembers, 2)
  assert.equal(lead.marketingConsent, false)
  assert.equal(lead.consent.accepted, true)
  assert.equal(lead.consent.recordedAt, lead.submittedAt)
  assert.equal(lead.source, "https://agenticit.ch/beste-variante")
  const context = miaContext(lead, "123456789012345678")
  assert.equal(context.vorname, "Internal")
  assert.equal(context.nachname, "Test Person")
  assert.equal(context.record_id, "123456789012345678")
  assert.equal(context.familienmitglieder, "2")
  assert.equal(context.rueckruf_erlaubt, "ja")
  assert.ok(!("companyWebsite" in lead))
})
