import assert from "node:assert/strict"
import test from "node:test"
import { leadEntries } from "./lead-entry"
test("every visual AIDA entry opens its own usable lead magnet directly", () => {
  assert.equal(leadEntries.length, 9)
  assert.equal(new Set(leadEntries.map((e) => e.id)).size, 9)
  for (const entry of leadEntries) {
    assert.ok(entry.title && entry.benefit && entry.result && entry.action)
    assert.ok(entry.href.startsWith("/"))
    assert.ok(!entry.href.startsWith("/werkzeuge"))
    assert.ok(entry.result.includes("PDF"))
  }
  assert.equal(
    leadEntries.find((e) => e.id === "webdesign")?.href,
    "/loesungen/webdesign#potenzial-rechner",
  )
})
