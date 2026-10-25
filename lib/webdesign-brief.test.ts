import assert from "node:assert/strict"
import test from "node:test"
import {
  buildWebsiteConcept,
  websiteBriefSchema,
  websiteQuestions,
  websiteBriefSummary,
} from "./webdesign-brief"

test("all visual combinations produce a complete website-specific concept", () => {
  assert.equal(websiteQuestions.length, 5)
  let count = 0
  for (const a of websiteQuestions[0].options)
    for (const b of websiteQuestions[1].options)
      for (const c of websiteQuestions[2].options)
        for (const d of websiteQuestions[3].options)
          for (const e of websiteQuestions[4].options) {
            const input = websiteBriefSchema.parse({
              version: 1,
              type: a.value,
              goal: b.value,
              style: c.value,
              content: d.value,
              timing: e.value,
            })
            const result = buildWebsiteConcept(input)
            assert.equal(result.structure.length, 4)
            assert.equal(result.style.title, c.title)
            assert.ok(websiteBriefSummary(input).includes(e.title))
            count++
          }
  assert.equal(count, 1024)
})
test("a landing page does not promise a shop and the brief rejects incomplete answers", () => {
  const result = buildWebsiteConcept({
    version: 1,
    type: "landing",
    goal: "sales",
    style: "clear",
    content: "new",
    timing: "soon",
  })
  assert.equal(result.goal.cta, "Angebot anfordern")
  assert.ok(result.goal.feature.includes("zusätzlich"))
  assert.equal(
    websiteBriefSchema.safeParse({ version: 1, type: "company" }).success,
    false,
  )
})
