import assert from "node:assert/strict"
import test from "node:test"
import {
  buildAcquisitionPlan,
  calculateAcquisitionPlan,
  acquisitionPlanSchema,
} from "./acquisition-planner"
import { leadSchema, prepareLeadPayload } from "./lead-intake"

const example = {
  version: 1 as const,
  industryIds: ["versicherung", "vorsorge"],
  monthlyCustomers: 10,
  closeRate: 25,
  handlingMinutes: 15,
}

test("planning works backwards from the user's target and accounts for each whole inquiry", () => {
  const result = calculateAcquisitionPlan(example)!
  assert.equal(result.requiredInquiries, 40)
  assert.equal(result.handlingMinutes, 600)
  assert.equal(result.cautiousRate, 20)
  assert.equal(result.cautiousInquiries, 50)
  assert.equal(
    calculateAcquisitionPlan({ ...example, monthlyCustomers: 7, closeRate: 7 })
      ?.requiredInquiries,
    100,
  )
  assert.equal(
    calculateAcquisitionPlan({ ...example, monthlyCustomers: 2, closeRate: 30 })
      ?.requiredInquiries,
    7,
  )
  assert.equal(
    calculateAcquisitionPlan({
      ...example,
      monthlyCustomers: 1,
      closeRate: 100,
    })?.requiredInquiries,
    1,
  )
})

test("unknown handling effort is absent, while an explicit zero is kept", () => {
  assert.equal(
    calculateAcquisitionPlan({ ...example, handlingMinutes: undefined })
      ?.handlingMinutes,
    null,
  )
  assert.equal(
    calculateAcquisitionPlan({ ...example, handlingMinutes: 0 })
      ?.handlingMinutes,
    0,
  )
  assert.equal(
    calculateAcquisitionPlan({ ...example, handlingMinutes: 0.5 })
      ?.handlingMinutes,
    20,
  )
  assert.equal(
    acquisitionPlanSchema.safeParse({ ...example, industryIds: [] }).success,
    true,
  )
})

test("invalid, missing and extra inputs never produce a result or download", () => {
  for (const patch of [
    { monthlyCustomers: 0 },
    { monthlyCustomers: -1 },
    { monthlyCustomers: 0.5 },
    { monthlyCustomers: 10001 },
    { closeRate: 0 },
    { closeRate: -1 },
    { closeRate: NaN },
    { closeRate: Infinity },
    { closeRate: 101 },
    { handlingMinutes: -1 },
    { handlingMinutes: 1441 },
    { industryIds: ["invented"] },
    { industryIds: ["vorsorge", "vorsorge"] },
    { version: 2 },
    { forecastRevenue: 999999 },
  ]) {
    assert.equal(
      calculateAcquisitionPlan({ ...example, ...patch }),
      null,
      JSON.stringify(patch),
    )
    assert.equal(buildAcquisitionPlan({ ...example, ...patch }), null)
  }
  for (const input of [null, {}, "", undefined])
    assert.equal(calculateAcquisitionPlan(input), null)
})

test("the plan includes user assumptions, recomputable results, limits and a usable team handoff", () => {
  const plan = buildAcquisitionPlan(example)!
  for (const text of [
    "Versicherung",
    "Vorsorge",
    "10",
    "25 %",
    "40",
    "50",
    "600 Minuten",
    "keine Prognose",
    "Abschlussdauer",
    "Marketing",
    "Sales",
    "Verwaltung",
    "Verantwortlich",
    "https://agenticit.ch/potenzial",
  ])
    assert.ok(plan.includes(text), text)
  assert.doesNotMatch(
    plan,
    /Semrush|153.?000|CHF 50|keine Startkosten|garantiert/,
  )
  assert.match(
    buildAcquisitionPlan({ ...example, handlingMinutes: undefined })!,
    /Bearbeitungszeit: noch zu klären/,
  )
})

test("the optional inquiry derives its context on the server and retains personal review", () => {
  const lead = {
    source: "potenzialrechner",
    name: "Internal Test",
    email: "planning@example.invalid",
    company: "Test organisation",
    consent: true,
    acquisitionPlan: example,
    message: "Forged result",
    leadPrice: 1,
  }
  const parsed = leadSchema.safeParse(lead)
  assert.equal(parsed.success, true)
  if (!parsed.success) return
  const payload = prepareLeadPayload(parsed.data, "2026-10-17T09:00:00Z")
  assert.equal(payload.message, buildAcquisitionPlan(example))
  assert.equal(payload.marketingConsent, false)
  assert.equal(payload.followUpTask, "Anfragenplanung persönlich prüfen")
  assert.equal(payload.leadPrice, undefined)
  assert.equal(payload.industry, "Versicherung, Vorsorge / 3a / Pensionskasse")
  assert.ok(payload.tags.includes("quelle:anfragenplanung"))
  assert.ok(!payload.tags.includes("lead_preis:1"))
})

test("planning context cannot be attached to another source or mixed with another check", () => {
  const lead = {
    source: "potenzialrechner",
    name: "Internal Test",
    email: "planning@example.invalid",
    company: "Test organisation",
    consent: true,
    acquisitionPlan: example,
  }
  for (const patch of [
    { source: "home" },
    { source: "potenzial" },
    { consent: false },
    { acquisitionPlan: { ...example, closeRate: 0 } },
    {
      journey: {
        version: 1,
        challenge: "admin",
        channel: "web",
        system: "crm",
      },
    },
  ])
    assert.equal(leadSchema.safeParse({ ...lead, ...patch }).success, false)
})
