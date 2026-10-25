import assert from "node:assert/strict"
import test from "node:test"
import { scenarioChoices, potentialScenes } from "./potential-visual"
import { potentialKinds } from "./potential-report"

test("all seven magnets have distinct visual scenes and editable scenarios", () => {
  assert.equal(
    new Set(potentialKinds.map((kind) => potentialScenes[kind].scene)).size,
    7,
  )
  for (const kind of potentialKinds) {
    const choices = scenarioChoices(kind, {
      volume: 100,
      currentRate: 20,
      minutes: 40,
    })
    assert.equal(choices.length, 3)
    for (const choice of choices) {
      assert.ok(choice.title.length > 0)
      if (["admin", "onboarding", "partnership"].includes(kind))
        assert.ok(choice.targetMinutes! < 40)
      else assert.ok(choice.targetRate! > 20 && choice.targetRate! <= 100)
      if (kind === "acquisition") assert.ok(choice.targetVolume! > 100)
    }
  }
})
test("scenarios handle zero baselines and cap rates without inventing guaranteed gains", () => {
  for (const c of scenarioChoices("conversion", {
    volume: 0,
    currentRate: 99,
    minutes: 0,
  }))
    assert.equal(c.targetRate, 100)
  for (const c of scenarioChoices("admin", {
    volume: 0,
    currentRate: 0,
    minutes: 0,
  }))
    assert.equal(c.targetMinutes, 0)
  for (const c of scenarioChoices("acquisition", {
    volume: 0,
    currentRate: 0,
    minutes: 0,
  }))
    assert.equal(c.targetVolume, 0)
})
