import assert from "node:assert/strict"
import test from "node:test"
import {
  buildMarketingSetupPlan,
  buildMarketingSetupResult,
  marketingSetupSchema,
} from "./marketing-setup"
import { leadSchema, prepareLeadPayload } from "./lead-intake"

const ready = {
  version: 1,
  answers: {
    offer: "ready",
    website: "ready",
    accounts: "ready",
    measurement: "ready",
    handoff: "ready",
  },
} as const

test("only five complete, valid answers can produce a setup plan", () => {
  for (const input of [
    null,
    {},
    { ...ready, version: 2 },
    { ...ready, answers: { ...ready.answers, offer: undefined } },
    { ...ready, answers: { ...ready.answers, offer: "not-planned" } },
    { ...ready, answers: { ...ready.answers, handoff: "yes" } },
  ]) {
    assert.equal(buildMarketingSetupResult(input), null)
    assert.equal(buildMarketingSetupPlan(input), null)
  }
})

test("complete foundations lead to a workflow test, not invented deficiencies", () => {
  const result = buildMarketingSetupResult(ready)!
  assert.equal(result.priorities.length, 1)
  assert.equal(result.priorities[0].id, "test")
  assert.equal(result.outstanding.length, 0)
  assert.equal(result.ready.length, 5)
  assert.match(result.priorities[0].done, /einmal|genau einmal/)
  assert.match(result.summary, /Ihren Angaben/)
})

test("open foundations are ordered by dependency, capped at three and retained in the full plan", () => {
  const input = {
    ...ready,
    answers: {
      offer: "open",
      website: "partial",
      accounts: "unknown",
      measurement: "open",
      handoff: "open",
    },
  }
  const result = buildMarketingSetupResult(input)!
  assert.deepEqual(
    result.priorities.map((x) => x.id),
    ["offer", "website", "accounts"],
  )
  assert.equal(result.outstanding.length, 5)
  assert.match(result.priorities[2].action, /klären|prüfen/i)
  const text = buildMarketingSetupPlan(input)!
  for (const phrase of [
    "Zielgruppe",
    "Auftritt",
    "Werbekonten",
    "Messung",
    "Übergabe",
  ])
    assert.ok(text.includes(phrase))
  assert.match(text, /Verantwortlich:|Zuständig:/)
  assert.match(text, /Abnahmekriterium:/)
})

test("unknown does not assert missing systems and unplanned paid ads create no account task", () => {
  const input = {
    ...ready,
    answers: { ...ready.answers, accounts: "not-planned", handoff: "unknown" },
  }
  const result = buildMarketingSetupResult(input)!
  assert.deepEqual(
    result.priorities.map((x) => x.id),
    ["handoff"],
  )
  assert.equal(result.excluded.length, 1)
  assert.match(result.priorities[0].title, /klären/)
  assert.match(result.priorities[0].done, /Stand|Nachweis/)
  assert.ok(!result.outstanding.some((x) => x.id === "accounts"))
})

test("each changed answer directs the plan to that foundation", () => {
  for (const id of Object.keys(ready.answers)) {
    const result = buildMarketingSetupResult({
      ...ready,
      answers: { ...ready.answers, [id]: "partial" },
    })!
    assert.equal(result.priorities[0].id, id)
    assert.ok(result.priorities[0].action.length > 40)
    assert.ok(result.priorities[0].done.length > 40)
  }
})

test("marketing contact requires its own context, company and consent; the server derives the plan", () => {
  const lead = {
    source: "marketing-setup-check",
    name: "Internal Test",
    email: "setup@example.invalid",
    company: "Test organisation",
    consent: true,
    marketingSetup: ready,
    message: "invented plan",
    goal: "invented goal",
  }
  for (const change of [
    { consent: false },
    { company: "" },
    { marketingSetup: undefined },
    { source: "home" },
    { automation: { version: 1, industryIds: ["versicherung"], tasks: [] } },
  ])
    assert.equal(leadSchema.safeParse({ ...lead, ...change }).success, false)
  const parsed = leadSchema.parse(lead)
  const payload = prepareLeadPayload(parsed, "2026-10-17T00:00:00Z")
  assert.equal(
    payload.message,
    buildMarketingSetupPlan(marketingSetupSchema.parse(ready)),
  )
  assert.equal(payload.marketingConsent, false)
  assert.ok(payload.tags.includes("service:marketing"))
  assert.equal(payload.followUpTask, "Marketing-Setup-Check persönlich prüfen")
  assert.ok(!String(payload.goal).includes("invented"))
})
