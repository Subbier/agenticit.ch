import assert from "node:assert/strict"
import test from "node:test"
import {
  calculatePotential,
  potentialInputSchema,
  potentialKinds,
  reportSummary,
} from "./potential-report"
import { leadSchema, prepareLeadPayload } from "./lead-intake"

const base = {
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
} as const

test("two more orders produce CHF 72,000 annual revenue, with costs separate", () => {
  const result = calculatePotential(base)
  assert.equal(result.annualRevenueDelta, 72000)
  assert.equal(result.hoursSaved, 25)
  assert.equal(result.firstYearContribution, 26600)
  assert.equal(result.firstYearTimeValue, 30000)
  assert.equal(result.breakEvenMonths, 1000 / 2300)
})
test("all seven variants validate and describe their own situation", () => {
  assert.equal(potentialKinds.length, 7)
  for (const kind of potentialKinds) {
    const input = potentialInputSchema.parse({
      ...base,
      kind,
      targetVolume: kind === "acquisition" ? 120 : 100,
    })
    assert.ok(reportSummary(input).includes(kind))
    assert.ok(Number.isFinite(calculatePotential(input).annualRevenueDelta))
  }
})
test("zero baseline, losses and extra acquisition workload stay honest", () => {
  assert.equal(
    calculatePotential({ ...base, volume: 0, targetVolume: 0 })
      .annualRevenueDelta,
    0,
  )
  assert.ok(
    calculatePotential({ ...base, targetRate: 10 }).annualRevenueDelta < 0,
  )
  assert.equal(
    calculatePotential({
      ...base,
      kind: "acquisition",
      targetVolume: 300,
      targetMinutes: 30,
    }).hoursSaved,
    -100,
  )
  const time = calculatePotential({
    ...base,
    kind: "admin",
    monthlyCost: 3000,
  })
  assert.equal(time.annualRevenueDelta, 0)
  assert.equal(time.breakEvenMonths, null)
  assert.ok(time.firstYearTimeValue - 12 * 3000 - 1000 < 0)
})
test("reject impossible percentages, fractional cases and mismatched volumes", () => {
  for (const patch of [
    { targetRate: 101 },
    { volume: -1 },
    { value: Infinity },
    { volume: 2.3 },
    { kind: "conversion", targetVolume: 200 },
  ]) {
    assert.equal(
      potentialInputSchema.safeParse({ ...base, ...patch }).success,
      false,
    )
  }
})
test("lead context is validated and derived server side without marketing permission", () => {
  const lead = leadSchema.parse({
    source: "anfragen-check",
    name: "Example",
    email: "example@example.invalid",
    company: "Example",
    consent: true,
    potentialReport: base,
    message: "Forged result",
  })
  const payload = prepareLeadPayload(lead, "2026-10-20T12:00:00Z")
  assert.notEqual(payload.message, "Forged result")
  assert.ok(payload.message?.includes("72000"))
  assert.equal(payload.marketingConsent, false)
  assert.ok(payload.followUpTask.includes("persönlich"))
  assert.equal(
    leadSchema.safeParse({ ...lead, source: "contact-page" }).success,
    false,
  )
  assert.equal(leadSchema.safeParse({ ...lead, company: "" }).success, false)
  assert.equal(leadSchema.safeParse({ ...lead, consent: false }).success, false)
})
