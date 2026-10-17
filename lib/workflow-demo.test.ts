import assert from "node:assert/strict"
import test from "node:test"
import { initialWorkflowDemo, workflowDemoReducer } from "./workflow-demo"

test("the example requires preparation and review before approval", () => {
  const start = initialWorkflowDemo
  assert.deepEqual(workflowDemoReducer(start, { type: "approve" }), start)
  const prepared = workflowDemoReducer(start, { type: "advance" })
  assert.equal(prepared.stage, "prepared")
  assert.deepEqual(workflowDemoReducer(prepared, { type: "approve" }), prepared)
  const review = workflowDemoReducer(prepared, { type: "advance" })
  assert.equal(review.stage, "review")
  assert.deepEqual(workflowDemoReducer(review, { type: "advance" }), review)
  assert.equal(
    workflowDemoReducer(review, { type: "approve" }).stage,
    "approved",
  )
})

test("missing ownership blocks the example and cannot be approved", () => {
  let state = workflowDemoReducer(initialWorkflowDemo, {
    type: "select",
    scenario: "missing-owner",
  })
  state = workflowDemoReducer(state, { type: "advance" })
  state = workflowDemoReducer(state, { type: "advance" })
  assert.equal(state.stage, "blocked")
  assert.deepEqual(workflowDemoReducer(state, { type: "approve" }), state)
  assert.deepEqual(workflowDemoReducer(state, { type: "advance" }), state)
})

test("changing the scenario clears a previous approval and returns to the beginning", () => {
  let state = workflowDemoReducer(initialWorkflowDemo, { type: "advance" })
  state = workflowDemoReducer(state, { type: "advance" })
  state = workflowDemoReducer(state, { type: "approve" })
  assert.deepEqual(
    workflowDemoReducer(state, { type: "select", scenario: "missing-owner" }),
    {
      scenario: "missing-owner",
      stage: "received",
    },
  )
})

test("restart clears the example progress while preserving the selected situation", () => {
  const selected = workflowDemoReducer(initialWorkflowDemo, {
    type: "select",
    scenario: "missing-owner",
  })
  assert.deepEqual(
    workflowDemoReducer(workflowDemoReducer(selected, { type: "advance" }), {
      type: "reset",
    }),
    selected,
  )
  assert.equal(
    initialWorkflowDemo.stage,
    "received",
    "A shared initial object must not be mutated",
  )
})

test("approved examples cannot progress or approve themselves again", () => {
  let state = workflowDemoReducer(initialWorkflowDemo, { type: "advance" })
  state = workflowDemoReducer(state, { type: "advance" })
  state = workflowDemoReducer(state, { type: "approve" })
  assert.deepEqual(workflowDemoReducer(state, { type: "advance" }), state)
  assert.deepEqual(workflowDemoReducer(state, { type: "approve" }), state)
})

test("the public AI page offers a labelled example with no form or real submission control", async () => {
  const baseUrl = process.env.SITE_TEST_BASE_URL ?? "http://127.0.0.1:3105"
  const response = await fetch(new URL("/loesungen/ki-entwicklung", baseUrl))
  assert.equal(response.status, 200)
  const html = await response.text()
  const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1] ?? ""
  assert.ok(main.includes('aria-label="Interaktives Ablaufbeispiel"'))
  assert.ok(main.includes("Es wird nichts gespeichert oder versendet."))
  assert.ok(main.includes('value="missing-owner"'))
  assert.ok(main.includes('aria-live="polite"'))
  assert.ok(main.includes('href="/anfragen-check"'))
  assert.ok(!/<form\b/.test(main))
  assert.ok(!/action="\/api/.test(main))
})
