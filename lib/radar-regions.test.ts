import assert from "node:assert/strict"
import test from "node:test"
import {
  REGIONS,
  estimateRegionalVolume,
  getSelectedRegions,
  toggleRadarSelection,
  type RegionId,
} from "./radar-regions"

test("selects several regions and removes only the toggled region", () => {
  const initial: RegionId[] = ["mittelland"]
  const combined = toggleRadarSelection(initial, "zuerich")
  assert.deepEqual(combined, ["mittelland", "zuerich"])
  assert.deepEqual(initial, ["mittelland"])
  assert.deepEqual(toggleRadarSelection(combined, "mittelland"), ["zuerich"])
  assert.deepEqual(toggleRadarSelection(["zuerich"], "zuerich"), [])
})

test("insurance, finance and pension selections can coexist and be removed individually", () => {
  let selected: string[] = []
  for (const id of ["versicherung", "finanz", "vorsorge"]) {
    selected = toggleRadarSelection(selected, id)
  }
  assert.deepEqual(selected, ["versicherung", "finanz", "vorsorge"])
  assert.deepEqual(toggleRadarSelection(selected, "finanz"), [
    "versicherung",
    "vorsorge",
  ])
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
