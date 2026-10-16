import assert from "node:assert/strict"
import test from "node:test"
import {
  REGIONS,
  estimateRegionalVolume,
  getSelectedRegions,
  toggleRegionSelection,
  type RegionId,
} from "./radar-regions"

test("selects several regions and removes only the toggled region", () => {
  const initial: RegionId[] = ["mittelland"]
  const combined = toggleRegionSelection(initial, "zuerich")
  assert.deepEqual(combined, ["mittelland", "zuerich"])
  assert.deepEqual(initial, ["mittelland"])
  assert.deepEqual(toggleRegionSelection(combined, "mittelland"), ["zuerich"])
  assert.deepEqual(toggleRegionSelection(["zuerich"], "zuerich"), [])
})

test("combines regional shares without counting a region twice", () => {
  assert.equal(
    estimateRegionalVolume(69010, ["mittelland", "zuerich"]),
    33814.9,
  )
  assert.equal(
    estimateRegionalVolume(69010, ["mittelland", "zuerich", "mittelland"]),
    33814.9,
  )
})

test("all regions cover the full demand and no regions produce no demand", () => {
  assert.equal(
    estimateRegionalVolume(
      69010,
      REGIONS.map((region) => region.id),
    ),
    69010,
  )
  assert.equal(estimateRegionalVolume(69010, []), 0)
})

test("keeps selected regions in display order with their own context", () => {
  const selected = getSelectedRegions(["zuerich", "mittelland", "zuerich"])
  assert.deepEqual(
    selected.map((region) => region.id),
    ["mittelland", "zuerich"],
  )
  assert.equal(selected[0].cities, "Bern · Biel · Solothurn · Thun")
  assert.equal(selected[1].cities, "Zürich · Winterthur")
})
