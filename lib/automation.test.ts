import assert from "node:assert/strict"
import test from "node:test"
import {
  buildAutomationPlan,
  calculateAutomationPotential,
  getAutomationTasks,
  type AutomationInput,
} from "./automation"
import { leadSchema, prepareLeadPayload } from "./lead-intake"

const input: AutomationInput = {
  version: 1,
  industryIds: ["versicherung", "finanz", "vorsorge"],
  tasks: [
    { id: "intake", weeklyCount: 20, minutes: 15, automationPercent: 80 },
    { id: "meeting", weeklyCount: 10, minutes: 30, automationPercent: 40 },
  ],
  hourlyRate: 100,
}

test("industry-specific tasks are combined without duplicates", () => {
  const tasks = getAutomationTasks(input.industryIds)
  assert.equal(tasks.filter((task) => task.id === "intake").length, 1)
  assert.ok(tasks.some((task) => task.id === "policy"))
  assert.ok(tasks.some((task) => task.id === "finance-dossier"))
  assert.ok(tasks.some((task) => task.id === "pension-dossier"))
  assert.equal(
    getAutomationTasks(["immobilien"]).some((task) => task.id === "policy"),
    false,
  )
})

test("uses entered time and weighted target shares for hours and CHF", () => {
  const result = calculateAutomationPotential(input)!
  assert.equal(result.currentHours, 10)
  assert.equal(result.freedHours, 6)
  assert.equal(result.remainingHours, 4)
  assert.equal(result.automationPercent, 60)
  assert.equal(result.monthlyHours, 26)
  assert.equal(result.monthlyTimeValue, 2600)
  assert.equal(
    calculateAutomationPotential({ ...input, hourlyRate: undefined })!
      .monthlyTimeValue,
    null,
  )
  assert.equal(
    calculateAutomationPotential({ ...input, hourlyRate: 0 })!.monthlyTimeValue,
    0,
  )
})

test("rejects invalid or duplicate tasks and tasks outside the selected industries", () => {
  for (const invalid of [
    { ...input, industryIds: [] },
    { ...input, industryIds: ["unknown"] },
    { ...input, industryIds: ["finanz", "finanz"] },
    { ...input, tasks: [] },
    { ...input, tasks: [input.tasks[0], input.tasks[0]] },
    { ...input, tasks: [{ ...input.tasks[0], id: "property" }] },
    { ...input, tasks: [{ ...input.tasks[0], weeklyCount: -1 }] },
    { ...input, tasks: [{ ...input.tasks[0], weeklyCount: 1.5 }] },
    { ...input, tasks: [{ ...input.tasks[0], minutes: 0 }] },
    { ...input, tasks: [{ ...input.tasks[0], automationPercent: 101 }] },
    { ...input, tasks: [{ ...input.tasks[0], minutes: NaN }] },
    { ...input, hourlyRate: Infinity },
  ])
    assert.equal(calculateAutomationPotential(invalid), null)
})

test("zero target yields zero capacity and the plan explains assumptions", () => {
  const zero = {
    ...input,
    tasks: [{ ...input.tasks[0], automationPercent: 0 }],
  }
  assert.equal(calculateAutomationPotential(zero)!.freedHours, 0)
  const plan = buildAutomationPlan(input)!
  assert.ok(plan.includes("CHF 2'600"))
  assert.ok(plan.includes("keine automatisch eingesparte Ausgabe"))
  assert.ok(plan.includes("vor Versand freigeben"))
  assert.equal(buildAutomationPlan({ ...input, tasks: [] }), null)
})

test("automation inquiry validates and derives its own result before delivery", () => {
  const lead = {
    source: "automation-check",
    name: "Internal Test",
    email: "automation@example.invalid",
    company: "Test organisation",
    consent: true,
    automation: input,
  }
  const parsed = leadSchema.parse({
    ...lead,
    message: "Override",
    monthlyTimeValue: 999999,
  })
  const payload = prepareLeadPayload(parsed, "2026-10-16T12:00:00Z")
  assert.ok(payload.message?.includes("2'600"))
  assert.ok(payload.tags.includes("quelle:automatisierungs-check"))
  assert.ok(payload.tags.includes("pilot:workflow"))
  assert.equal(payload.followUpTask, "Automatisierungs-Check persönlich prüfen")
  assert.equal(payload.marketingConsent, false)
  assert.equal(leadSchema.safeParse({ ...lead, consent: false }).success, false)
  assert.equal(
    leadSchema.safeParse({ ...lead, automation: undefined }).success,
    false,
  )
  assert.equal(
    leadSchema.safeParse({
      ...lead,
      automation: {
        ...input,
        tasks: [{ ...input.tasks[0], automationPercent: 110 }],
      },
    }).success,
    false,
  )
})
