import assert from "node:assert/strict"
import test from "node:test"
import {
  challenges,
  buildJourneyPlan,
  calculateTimePotential,
  isChallengeId,
} from "./journey"
import { leadSchema, prepareLeadPayload } from "./lead-intake"

test("every challenge produces its own useful plan and an appropriate pilot", () => {
  const titles = new Set<string>()
  for (const challenge of challenges) {
    const plan = buildJourneyPlan({
      challenge: challenge.id,
      channel: "mixed",
      system: "manual",
    })
    titles.add(plan.title)
    assert.equal(plan.steps.length, 3)
    assert.ok(plan.download.includes(challenge.label))
    assert.ok(plan.download.includes("Mehrere Kanäle"))
    assert.ok(plan.download.includes("Ein gemeinsamer Eingang"))
    assert.ok(plan.template.length > 100)
    assert.equal(plan.packageId, challenge.packageId)
  }
  assert.equal(titles.size, challenges.length)
  assert.equal(isChallengeId("unknown"), false)
})

test("channel and system answers meaningfully change the plan", () => {
  const manual = buildJourneyPlan({
    challenge: "conversion",
    channel: "phone",
    system: "manual",
  })
  const connected = buildJourneyPlan({
    challenge: "conversion",
    channel: "web",
    system: "connected",
  })
  assert.notEqual(manual.steps[0], connected.steps[0])
  assert.notEqual(manual.steps[2], connected.steps[2])
  assert.ok(manual.download.includes("Telefon und E-Mail"))
  assert.ok(connected.download.includes("verbunden"))
})

test("time potential uses the entered before and after values without inventing money", () => {
  assert.deepEqual(calculateTimePotential(30, 15, 5), {
    currentHours: 7.5,
    futureHours: 2.5,
    freedHours: 5,
  })
  assert.deepEqual(calculateTimePotential(0, 15, 5), {
    currentHours: 0,
    futureHours: 0,
    freedHours: 0,
  })
  assert.equal(calculateTimePotential(30, 5, 15), null)
  assert.equal(calculateTimePotential(-1, 15, 5), null)
  assert.equal(calculateTimePotential(1.5, 15, 5), null)
  assert.equal(calculateTimePotential(Infinity, 15, 5), null)
  assert.equal(calculateTimePotential(1, NaN, 5), null)
})

const sample = {
  source: "journey-check",
  name: "Internal Test",
  email: "check@example.invalid",
  company: "Test organisation",
  consent: true,
  journey: {
    version: 1,
    challenge: "conversion",
    channel: "phone",
    system: "crm",
  },
}

test("journey intake requires consent, valid answers and a company", () => {
  assert.equal(leadSchema.safeParse(sample).success, true)
  assert.equal(
    leadSchema.safeParse({ ...sample, consent: false }).success,
    false,
  )
  assert.equal(leadSchema.safeParse({ ...sample, company: "" }).success, false)
  assert.equal(
    leadSchema.safeParse({ ...sample, journey: undefined }).success,
    false,
  )
  assert.equal(
    leadSchema.safeParse({
      ...sample,
      journey: { ...sample.journey, challenge: "invalid" },
    }).success,
    false,
  )
  assert.equal(
    leadSchema.safeParse({ ...sample, contactMethod: "phone" }).success,
    false,
  )
  assert.equal(
    leadSchema.safeParse({
      ...sample,
      contactMethod: "phone",
      phone: "+41000000000",
    }).success,
    true,
  )
})

test("the server derives package and context and requests human review", () => {
  const parsed = leadSchema.parse({
    ...sample,
    packageId: "acquisition",
    message: "Override attempt",
  })
  const payload = prepareLeadPayload(parsed, "2026-10-16T12:00:00.000Z")
  assert.ok(payload.tags.includes("pilot:appointments"))
  assert.ok(payload.message?.includes("Ihr Follow-up-Plan"))
  assert.ok(payload.followUpTask.includes("persönlich prüfen"))
  assert.equal(payload.contactMethod, "email")
  assert.equal(payload.marketingConsent, false)
  assert.equal("company_website" in payload, false)
})

test("existing lead sources remain compatible and keep their original follow-up", () => {
  const old = leadSchema.parse({
    source: "home",
    name: "Internal Test",
    email: "old@example.invalid",
    consent: true,
  })
  const payload = prepareLeadPayload(old, "2026-10-16T12:00:00.000Z")
  assert.equal(payload.followUpTask, "Rückruf")
  assert.equal(
    leadSchema.safeParse({ ...sample, source: "unknown" }).success,
    false,
  )
})
