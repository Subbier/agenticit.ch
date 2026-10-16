import assert from "node:assert/strict"
import test from "node:test"
import {
  buildAutomationPlan,
  calculateAutomationPotential,
  calculateAutomationScenarios,
  formatAutomationDuration,
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

const withControl: AutomationInput = {
  version: 2,
  industryIds: ["versicherung"],
  tasks: [
    {
      id: "intake",
      weeklyCount: 20,
      minutes: 15,
      automationPercent: 80,
      controlMinutes: 2,
    },
    {
      id: "meeting",
      weeklyCount: 10,
      minutes: 30,
      automationPercent: 40,
      controlMinutes: 5,
    },
  ],
  hourlyRate: 100,
}

test("deducts explicit control time from gross automation without changing legacy results", () => {
  const result = calculateAutomationPotential(withControl)!
  assert.equal(result.currentHours, 10)
  assert.equal(result.automatedHours, 6)
  assert.equal(result.controlHours, 1.5)
  assert.equal(result.freedHours, 4.5)
  assert.equal(result.remainingHours, 5.5)
  assert.equal(result.automationPercent, 60)
  assert.equal(result.monthlyHours, 19.5)
  assert.equal(result.monthlyTimeValue, 1950)
  assert.equal(calculateAutomationPotential(input)!.freedHours, 6)
})

test("rejects missing or invalid review estimates before a version 2 result is shown", () => {
  for (const controlMinutes of [-1, NaN, Infinity, 10081, undefined]) {
    const invalid = {
      ...withControl,
      tasks: [{ ...withControl.tasks[0], controlMinutes }],
    } as AutomationInput
    assert.equal(calculateAutomationPotential(invalid), null)
  }
})

test("shows additional effort honestly when controls take longer than the automated time", () => {
  const small: AutomationInput = {
    version: 2,
    industryIds: ["versicherung"],
    tasks: [
      {
        id: "intake",
        weeklyCount: 1,
        minutes: 10,
        automationPercent: 10,
        controlMinutes: 2,
      },
    ],
    hourlyRate: 100,
  }
  const result = calculateAutomationPotential(small)!
  assert.equal(result.freedHours, -1 / 60)
  assert.equal(result.remainingHours, 11 / 60)
  assert.ok(result.monthlyTimeValue! < 0)
  assert.ok(buildAutomationPlan(small)!.includes("Mehraufwand"))
  assert.ok(buildAutomationPlan(small)!.includes("Mehraufwand: 1 Min./Woche"))
})

test("small positive and negative durations remain readable instead of rounding to zero hours", () => {
  assert.equal(formatAutomationDuration(0.5), "30 Min.")
  assert.equal(formatAutomationDuration(-1 / 60), "-1 Min.")
  assert.equal(formatAutomationDuration(4.5), "4.5 Std.")
  assert.equal(formatAutomationDuration(0), "0 Std.")
})

test("zero automation does not introduce an unused control step", () => {
  const zero: AutomationInput = {
    version: 2,
    industryIds: ["versicherung"],
    tasks: [
      {
        id: "intake",
        weeklyCount: 20,
        minutes: 15,
        automationPercent: 0,
        controlMinutes: 2,
      },
    ],
  }
  const result = calculateAutomationPotential(zero)!
  assert.equal(result.controlHours, 0)
  assert.equal(result.freedHours, 0)
})

test("compares an explicitly cautious assumption with the plan and retains the controls", () => {
  const scenarios = calculateAutomationScenarios(withControl)!
  assert.equal(scenarios.planned.freedHours, 4.5)
  assert.equal(scenarios.cautious.freedHours, 3)
  assert.equal(scenarios.cautious.controlHours, 1.5)
  assert.equal(scenarios.cautious.automationPercent, 45)
  assert.equal(
    calculateAutomationScenarios({ ...withControl, tasks: [] }),
    null,
  )
})

test("the saved plan includes review time, both assumptions and a concrete next step", () => {
  const plan = buildAutomationPlan(withControl)!
  assert.ok(plan.includes("Kontrolle"))
  assert.ok(plan.includes("1,5") || plan.includes("1.5"))
  assert.ok(plan.includes("75 %"))
  assert.ok(plan.includes("CHF 1'950"))
  assert.ok(plan.includes("Zuerst prüfen: Kontaktdaten erfassen"))
  assert.ok(plan.includes("keine automatisch eingesparte Ausgabe"))
})

test("the lead handoff recalculates version 2 and rejects control-field tampering", () => {
  const lead = {
    source: "automation-check",
    name: "Internal Test",
    email: "control@example.invalid",
    company: "Test organisation",
    consent: true,
    automation: withControl,
  }
  const parsed = leadSchema.parse({
    ...lead,
    monthlyTimeValue: 999999,
    message: "Do not use",
  })
  const payload = prepareLeadPayload(parsed, "2026-10-17T00:00:00Z")
  assert.ok(payload.message?.includes("1'950"))
  assert.equal(payload.automation?.version, 2)
  assert.equal(payload.marketingConsent, false)
  assert.equal(
    leadSchema.safeParse({
      ...lead,
      automation: {
        ...withControl,
        tasks: [{ ...withControl.tasks[0], controlMinutes: -1 }],
      },
    }).success,
    false,
  )
})
