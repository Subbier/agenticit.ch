import assert from "node:assert/strict"
import test from "node:test"
import { buildCrmPlan, buildCrmResult, crmSchema } from "./crm-check"
import { leadSchema, prepareLeadPayload } from "./lead-intake"

const ready = {
  version: 1,
  answers: {
    fields: "ready",
    transfer: "ready",
    duplicates: "ready",
    ownership: "ready",
    recovery: "ready",
  },
}

test("CRM plans require five complete supported answers and no extra fields", () => {
  for (const input of [
    null,
    {},
    { ...ready, version: 2 },
    { ...ready, extra: "ignored" },
    { ...ready, answers: { ...ready.answers, fields: undefined } },
    { ...ready, answers: { ...ready.answers, transfer: "not-planned" } },
    { ...ready, answers: { ...ready.answers, customerEmail: "not-needed" } },
  ]) {
    assert.equal(crmSchema.safeParse(input).success, false)
    assert.equal(buildCrmResult(input), null)
    assert.equal(buildCrmPlan(input), null)
  }
})

test("a ready CRM assessment calls for evidence without invented defects or a score", () => {
  const result = buildCrmResult(ready)!
  assert.equal(result.outstanding.length, 0)
  assert.deepEqual(
    result.priorities.map((x) => x.id),
    ["test"],
  )
  assert.ok(result.summary.includes("Nach Ihren Angaben"))
  assert.ok(!("score" in result) && !("savings" in result))
})

test("known CRM gaps precede unknowns; uncertain answers only request clarification", () => {
  const result = buildCrmResult({
    ...ready,
    answers: {
      fields: "unknown",
      transfer: "partial",
      duplicates: "open",
      ownership: "ready",
      recovery: "unknown",
    },
  })!
  assert.deepEqual(
    result.priorities.map((x) => x.id),
    ["transfer", "duplicates", "fields"],
  )
  assert.deepEqual(
    result.outstanding.map((x) => x.id),
    ["transfer", "duplicates", "fields", "recovery"],
  )
  assert.ok(result.outstanding[2].title.includes("klären"))
  assert.ok(result.outstanding[2].done.includes("Erst danach"))
})

test("each of the five CRM concerns changes the next action without prescribing a system change", () => {
  for (const id of Object.keys(ready.answers)) {
    const result = buildCrmResult({
      ...ready,
      answers: { ...ready.answers, [id]: "open" },
    })!
    assert.equal(result.priorities[0].id, id)
    assert.equal(result.outstanding.length, 1)
  }
})

test("an entirely unknown CRM setup produces clarification tasks instead of assumed defects", () => {
  const result = buildCrmResult({
    version: 1,
    answers: Object.fromEntries(
      Object.keys(ready.answers).map((id) => [id, "unknown"]),
    ),
  })!
  assert.equal(result.outstanding.length, 5)
  assert.equal(result.priorities.length, 3)
  assert.ok(
    result.outstanding.every((item) => item.title.startsWith("Stand zu")),
  )
})

test("the CRM worksheet preserves all gaps and distinguishes a contact from a repeated event", () => {
  const input = {
    version: 1,
    answers: Object.fromEntries(
      Object.keys(ready.answers).map((id) => [id, "open"]),
    ),
  }
  const result = buildCrmResult(input)!
  const plan = buildCrmPlan(input)!
  assert.equal(result.priorities.length, 3)
  assert.equal((plan.match(/Abnahmekriterium:/g) ?? []).length, 5)
  for (const text of [
    "QUELLE",
    "ZIEL IM CRM",
    "KONTAKT UND VORGANG",
    "FELDZUORDNUNG",
    "FEHLERFALL",
    "Verantwortliche Person:",
    "derselben Übergabe",
    "neues Anliegen",
    "menschliche Freigabe",
  ])
    assert.ok(plan.includes(text), text)
  assert.ok(!/\d+\s*%|CHF|garantiert/.test(plan))
})

test("CRM contact uses its own validated context and a server-derived plan", () => {
  const lead = {
    source: "crm-ablauf-check",
    name: "Internal Test",
    email: "crm-check@example.invalid",
    company: "Test organisation",
    consent: true,
    crmCheck: ready,
    message: "forged plan",
    goal: "forged goal",
  }
  for (const change of [
    { consent: false },
    { company: "" },
    { source: "home" },
    { crmCheck: undefined },
    {
      journey: {
        version: 1,
        challenge: "admin",
        channel: "web",
        system: "manual",
      },
    },
    {
      inquiryCheck: {
        version: 1,
        answers: {
          intake: "ready",
          owner: "ready",
          response: "ready",
          followup: "ready",
          outcome: "ready",
        },
      },
    },
    { source: "anfragen-check" },
    {
      marketingSetup: {
        version: 1,
        answers: {
          offer: "ready",
          website: "ready",
          accounts: "ready",
          measurement: "ready",
          handoff: "ready",
        },
      },
    },
    {
      automation: {
        version: 1,
        industryIds: ["versicherung"],
        tasks: [
          { id: "intake", weeklyCount: 1, minutes: 5, automationPercent: 50 },
        ],
      },
    },
  ])
    assert.equal(leadSchema.safeParse({ ...lead, ...change }).success, false)
  const payload = prepareLeadPayload(
    leadSchema.parse(lead),
    "2026-10-17T00:00:00Z",
  )
  assert.equal(payload.message, buildCrmPlan(ready))
  assert.equal(payload.marketingConsent, false)
  assert.equal(payload.followUpTask, "CRM-Ablauf-Check persönlich prüfen")
  assert.ok(payload.tags.includes("quelle:crm-ablauf-check"))
  assert.ok(!String(payload.goal).includes("forged"))
})
