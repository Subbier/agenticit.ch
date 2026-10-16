import assert from "node:assert/strict"
import test from "node:test"
import { createFeedbackHandler } from "./website-feedback-handler"
import {
  canOfferFeedback,
  feedbackMailText,
  feedbackQuestions,
  type FeedbackAnswers,
} from "./website-feedback"

const answers: FeedbackAnswers = {
  clarity: "clear",
  navigation: "easy",
  design: "good",
  missing: "nothing",
  overall: "4",
}
function request(
  body: unknown = { version: 1, answers },
  origin = "https://agenticit.ch",
) {
  return new Request("https://agenticit.ch/api/website-feedback", {
    method: "POST",
    headers: { "content-type": "application/json", origin },
    body: JSON.stringify(body),
  })
}

test("the invitation waits ten seconds and does not interrupt forms, videos or other pages", () => {
  const ready = {
    elapsedMs: 10_000,
    alreadyOffered: false,
    visible: true,
    blocked: false,
    pathname: "/",
  }
  assert.equal(canOfferFeedback(ready), true)
  for (const change of [
    { elapsedMs: 9999 },
    { alreadyOffered: true },
    { visible: false },
    { blocked: true },
    { pathname: "/kundenreise-check" },
  ])
    assert.equal(canOfferFeedback({ ...ready, ...change }), false)
})

test("the mail maps all five answers to readable labels without browser or contact data", () => {
  const text = feedbackMailText(answers, "test-reference")
  assert.equal(feedbackQuestions.length, 5)
  for (const question of feedbackQuestions)
    assert.ok(text.includes(question.title))
  assert.ok(text.includes("Mir fehlt gerade nichts"))
  assert.ok(text.includes("4 – Gut"))
  assert.ok(!text.includes("undefined"))
})

test("only complete valid surveys are delivered, once per request", async () => {
  const received: FeedbackAnswers[] = []
  const handler = createFeedbackHandler(async (data) => {
    received.push(data)
  })
  assert.equal((await handler(request())).status, 200)
  assert.deepEqual(received, [answers])
  for (const invalid of [
    { version: 1, answers: { ...answers, overall: "6" } },
    { version: 1, answers: { clarity: "clear" } },
    { version: 1, answers, email: "not-collected@example.invalid" },
    { version: 1, answers: { ...answers, extra: "not-collected" } },
  ])
    assert.equal((await handler(request(invalid))).status, 400)
  assert.equal(received.length, 1)
})

test("cross-origin and oversized requests are rejected before email", async () => {
  let calls = 0
  const handler = createFeedbackHandler(async () => {
    calls++
  })
  assert.equal(
    (await handler(request(undefined, "https://unrelated.example"))).status,
    403,
  )
  assert.equal(
    (await handler(request({ content: "x".repeat(3000) }))).status,
    413,
  )
  const malformed = new Request("https://agenticit.ch/api/website-feedback", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: "{",
  })
  assert.equal((await handler(malformed)).status, 400)
  assert.equal(calls, 0)
})

test("mail failure never returns success and repeated requests are limited", async () => {
  const failing = createFeedbackHandler(async () => {
    throw new Error("simulated failure")
  })
  const response = await failing(request())
  assert.equal(response.status, 502)
  assert.equal((await response.json()).ok, false)
  let calls = 0
  const limited = createFeedbackHandler(async () => {
    calls++
  })
  for (let i = 0; i < 5; i++)
    assert.equal((await limited(request())).status, 200)
  assert.equal((await limited(request())).status, 429)
  assert.equal(calls, 5)
})
