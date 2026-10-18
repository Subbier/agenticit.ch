import assert from "node:assert/strict"
import test from "node:test"
import {
  calculateWebsiteOffer,
  compareWebsiteOffers,
  createWebsiteComparisonText,
  emptyWebsiteCostInputs,
  parseWebsiteCost,
} from "./website-cost-comparison"

test("empty amounts stay unknown while an explicit zero is a valid cost", () => {
  for (const value of ["", " ", "\u00a0"])
    assert.deepEqual(parseWebsiteCost(value), { kind: "missing" })
  for (const value of ["0", "0.00", "0,00"])
    assert.deepEqual(parseWebsiteCost(value), { kind: "valid", cents: 0 })
  const result = calculateWebsiteOffer(emptyWebsiteCostInputs(), 36)
  assert.equal(result.complete, false)
  assert.equal(result.totalCents, null)
  assert.equal(result.missing.length, 4)
})

test("Swiss currency inputs preserve exact cents without treating malformed separators as valid", () => {
  for (const value of [
    "1'234.50",
    "1’234,50",
    "1 234.50",
    "1\u202f234,50",
    "CHF 1234.5",
  ])
    assert.deepEqual(parseWebsiteCost(value), { kind: "valid", cents: 123450 })
  for (const value of [
    "-1",
    "1e3",
    "Infinity",
    "NaN",
    "1'23",
    "1 23",
    "1,234",
    "1.234,50",
    "CHF",
    "1,2,3",
    "12.345",
    "1000000.01",
    "9999999999999999999999",
  ])
    assert.deepEqual(parseWebsiteCost(value), { kind: "invalid" }, value)
  assert.deepEqual(parseWebsiteCost("1'000'000.00"), {
    kind: "valid",
    cents: 100000000,
  })
})

const offerA = { setup: "4000", monthly: "60", annually: "100", extras: "0" }
const offerB = { setup: "5000", monthly: "20", annually: "0", extras: "0" }

test("each permitted horizon includes monthly annual and one-time positions once", () => {
  for (const [months, expected] of [
    [12, 482000],
    [24, 564000],
    [36, 646000],
  ] as const)
    assert.equal(calculateWebsiteOffer(offerA, months).totalCents, expected)
  assert.equal(
    calculateWebsiteOffer(
      { setup: "0.01", monthly: "0.02", annually: "0.03", extras: "0.04" },
      36,
    ).totalCents,
    86,
  )
  assert.throws(() => calculateWebsiteOffer(offerA, 13 as 12), RangeError)
})

test("missing or invalid costs never silently yield a partial total or comparison", () => {
  for (const value of ["", "unknown", "-50"])
    for (const field of ["setup", "monthly", "annually", "extras"] as const) {
      const inputs = { ...offerA, [field]: value }
      const result = compareWebsiteOffers(inputs, offerB, 36, true)
      assert.equal(result.offerA.totalCents, null)
      assert.equal(result.differenceCents, null)
      assert.equal(result.lowerCost, null)
      assert.equal(createWebsiteComparisonText(inputs, offerB, 36, true), null)
    }
})

test("totals are available before scope confirmation but no lower-cost offer is asserted", () => {
  const result = compareWebsiteOffers(offerA, offerB, 36, false)
  assert.equal(result.offerA.totalCents, 646000)
  assert.equal(result.offerB.totalCents, 572000)
  assert.equal(result.differenceCents, null)
  assert.equal(result.lowerCost, null)
  const text = createWebsiteComparisonText(offerA, offerB, 36, false)!
  assert.ok(text.includes("noch offen; keine Vergleichsaussage"))
  assert.ok(!text.includes("liegt rechnerisch"))
})

test("comparison follows the chosen period and handles ties without inventing a winner", () => {
  assert.equal(compareWebsiteOffers(offerA, offerB, 12, true).lowerCost, "a")
  const longer = compareWebsiteOffers(offerA, offerB, 36, true)
  assert.equal(longer.lowerCost, "b")
  assert.equal(longer.differenceCents, 74000)
  const same = compareWebsiteOffers(offerA, offerA, 36, true)
  assert.equal(same.differenceCents, 0)
  assert.equal(same.lowerCost, null)
})

test("the downloadable comparison retains both complete inputs, scope status and a useful next step", () => {
  const text = createWebsiteComparisonText(offerA, offerB, 36, true)!
  assert.ok(text.includes("36 Monate"))
  assert.ok(text.includes("OFFERTE A") && text.includes("OFFERTE B"))
  assert.match(text, /4['’]000\.00/)
  assert.match(text, /5['’]000\.00/)
  assert.ok(text.includes("Offerte B liegt rechnerisch"))
  assert.ok(text.includes("vom Nutzer als abgeglichen"))
  assert.ok(text.includes("Keine AgenticIT-Offerte"))
  assert.ok(text.includes("https://agenticit.ch/marketing-setup-check"))
  assert.ok(!text.includes("ß"))
})
