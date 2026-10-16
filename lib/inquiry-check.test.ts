import assert from "node:assert/strict"
import test from "node:test"
import {
  buildInquiryPlan,
  buildInquiryResult,
  inquirySchema,
} from "./inquiry-check"

const ready = {
  version: 1,
  answers: {
    intake: "ready",
    owner: "ready",
    response: "ready",
    followup: "ready",
    outcome: "ready",
  },
}

test("only complete, supported inquiry answers produce a plan", () => {
  for (const value of [
    null,
    {},
    { ...ready, version: 2 },
    { ...ready, answers: { ...ready.answers, intake: undefined } },
    { ...ready, answers: { ...ready.answers, intake: "not-planned" } },
    { ...ready, answers: { ...ready.answers, extra: "ready" } },
  ]) {
    assert.equal(inquirySchema.safeParse(value).success, false)
    assert.equal(buildInquiryResult(value), null)
    assert.equal(buildInquiryPlan(value), null)
  }
})

test("ready self-assessments lead to an evidence check without invented defects", () => {
  const result = buildInquiryResult(ready)!
  assert.equal(result.outstanding.length, 0)
  assert.deepEqual(
    result.priorities.map((item) => item.id),
    ["test"],
  )
  assert.ok(result.summary.includes("Nach Ihren Angaben"))
  assert.ok(!("score" in result) && !("lostRevenue" in result))
})

test("known gaps come before uncertain points; both retain the process order", () => {
  const input = {
    version: 1,
    answers: {
      intake: "unknown",
      owner: "partial",
      response: "open",
      followup: "ready",
      outcome: "unknown",
    },
  }
  const result = buildInquiryResult(input)!
  assert.deepEqual(
    result.priorities.map((item) => item.id),
    ["owner", "response", "intake"],
  )
  assert.deepEqual(
    result.outstanding.map((item) => item.id),
    ["owner", "response", "intake", "outcome"],
  )
  assert.ok(result.outstanding[2].title.includes("klären"))
  assert.ok(result.outstanding[2].done.includes("Erst danach"))
})

test("unknown means verify, not a diagnosed failure", () => {
  const result = buildInquiryResult({
    version: 1,
    answers: Object.fromEntries(
      Object.keys(ready.answers).map((key) => [key, "unknown"]),
    ),
  })!
  assert.equal(result.priorities.length, 3)
  assert.equal(result.outstanding.length, 5)
  assert.ok(
    result.outstanding.every((item) => item.title.startsWith("Stand zu")),
  )
})

test("the download includes every open point, responsibility and proof fields", () => {
  const plan = buildInquiryPlan({
    version: 1,
    answers: Object.fromEntries(
      Object.keys(ready.answers).map((key) => [key, "open"]),
    ),
  })!
  assert.equal((plan.match(/Abnahmekriterium:/g) ?? []).length, 5)
  assert.equal((plan.match(/Verantwortliche Person:/g) ?? []).length, 5)
  assert.ok(plan.includes("keine gemessenen Verlustfälle"))
  assert.ok(plan.includes("Reaktionszeit"))
  assert.ok(plan.includes("Freigabe"))
  assert.ok(!/\d+\s*%|CHF|garantiert/.test(plan))
})
