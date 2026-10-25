import assert from "node:assert/strict"
import test from "node:test"
import { potentialQuestions, potentialStepLabels } from "./potential-questions"
import { potentialKinds } from "./potential-report"
test("all seven calculators ask complete questions with an explicit subject and unit", () => {
  for (const kind of potentialKinds) {
    const q = potentialQuestions[kind]
    assert.ok(q.volume.includes("?") && q.volume.includes("Monat"))
    for (const value of Object.values(q)) assert.ok(value.includes("?"))
  }
  assert.deepEqual(potentialStepLabels, [
    "Ihre Zahlen",
    "Ihr Wunschziel",
    "PDF anfordern",
  ])
  assert.ok(potentialQuestions.acquisition.rate.includes("dieser Anfragen"))
  assert.ok(potentialQuestions.phone.rate.includes("dieser Anrufe"))
  assert.ok(potentialQuestions.retention.value.includes("Verlängerung"))
})
