export const automationTasks = [
  {
    id: "intake",
    label: "Kontaktdaten erfassen und ins CRM übertragen",
    detail: "Angaben aus Formularen oder E-Mails strukturiert übernehmen.",
  },
  {
    id: "appointments",
    label: "Termine koordinieren und bestätigen",
    detail:
      "Verfügbarkeiten, Buchungen und vereinbarte Erinnerungen verbinden.",
  },
  {
    id: "meeting",
    label: "Gesprächsnotizen in Aufgaben umwandeln",
    detail: "Zusammenfassungen und nächste Schritte zur Prüfung vorbereiten.",
  },
  {
    id: "documents",
    label: "Unterlagen sammeln und zuordnen",
    detail: "Dokumente ablegen und fehlende Angaben zur Prüfung markieren.",
  },
  {
    id: "followup",
    label: "Offerten nachhalten und Rückfragen vorbereiten",
    detail:
      "Status und nächste Schritte pflegen; Nachrichten vor Versand freigeben.",
  },
  {
    id: "reporting",
    label: "Berichte und Übersichten zusammenstellen",
    detail: "Freigegebene Daten aus vorhandenen Systemen zusammenführen.",
  },
  {
    id: "policy",
    label: "Policenangaben in die Kundenakte übertragen",
    detail:
      "Stammdaten und Vertragsangaben strukturiert zur Kontrolle übernehmen.",
  },
  {
    id: "deadlines",
    label: "Fristen erfassen und Wiedervorlagen anlegen",
    detail: "Bestätigte Termine und Fristen in zuständige Aufgaben überführen.",
  },
  {
    id: "finance-dossier",
    label: "Finanzierungsdossiers zusammenstellen",
    detail:
      "Vorhandene Unterlagen bündeln und eine Vollständigkeitsliste vorbereiten.",
  },
  {
    id: "pension-dossier",
    label: "Vorsorgeunterlagen erfassen und zuordnen",
    detail:
      "Dokumente für die persönliche Beratung übersichtlich bereitstellen.",
  },
  {
    id: "review",
    label: "Regelmässige Beratungstermine vorbereiten",
    detail: "Bestätigte Kontaktanlässe und offene Punkte für Ihr Team bündeln.",
  },
  {
    id: "project-intake",
    label: "Projektanfragen mit Adresse und Fotos zuordnen",
    detail: "Anfrageangaben in eine einheitliche Projektübersicht übernehmen.",
  },
  {
    id: "quote",
    label: "Offerten aus vorhandenen Angaben vorbereiten",
    detail:
      "Daten in eine Vorlage einsetzen; Preise und Zusagen bleiben in Prüfung.",
  },
  {
    id: "handover",
    label: "Aufträge an Planung und Ausführung übergeben",
    detail:
      "Freigegebene Angaben, Aufgaben und Zuständigkeiten zusammenbringen.",
  },
  {
    id: "property",
    label: "Immobilienanfragen den Objekten zuordnen",
    detail: "Interessen und Rückfragen in der richtigen Objektakte sammeln.",
  },
  {
    id: "listing",
    label: "Objektangaben in Exposévorlagen übernehmen",
    detail: "Freigegebene Stammdaten für die Veröffentlichung vorbereiten.",
  },
  {
    id: "receipts",
    label: "Belege erfassen und zur Prüfung vorbereiten",
    detail:
      "Belegfelder auslesen und Zuordnungsvorschläge kontrollieren lassen.",
  },
  {
    id: "invoices",
    label: "Rechnungsdaten mit Aufträgen abgleichen",
    detail:
      "Abweichungen markieren und Freigaben an zuständige Personen geben.",
  },
  {
    id: "reception",
    label: "Empfangsanfragen erfassen und weiterleiten",
    detail:
      "Organisatorische Anliegen aufnehmen; fachliche Fragen an Menschen übergeben.",
  },
  {
    id: "moving",
    label: "Umzugsangaben in die Offertenvorlage übertragen",
    detail:
      "Adressen, Termine und erfassten Umfang zur Prüfung zusammenführen.",
  },
  {
    id: "dispatch",
    label: "Einsatzdaten und Teamaufgaben zusammenstellen",
    detail:
      "Bestätigte Aufträge in eine gemeinsame Einsatzübersicht übertragen.",
  },
] as const

type TaskId = (typeof automationTasks)[number]["id"]
export const automationIndustries: {
  id: string
  label: string
  tasks: readonly TaskId[]
}[] = [
  {
    id: "versicherung",
    label: "Versicherung",
    tasks: [
      "intake",
      "appointments",
      "meeting",
      "documents",
      "policy",
      "deadlines",
      "followup",
    ],
  },
  {
    id: "finanz",
    label: "Finanzberatung",
    tasks: [
      "intake",
      "appointments",
      "documents",
      "finance-dossier",
      "meeting",
      "followup",
      "reporting",
    ],
  },
  {
    id: "vorsorge",
    label: "Vorsorge",
    tasks: [
      "intake",
      "appointments",
      "pension-dossier",
      "review",
      "meeting",
      "deadlines",
      "followup",
    ],
  },
  {
    id: "solar",
    label: "Solar / Photovoltaik",
    tasks: [
      "project-intake",
      "appointments",
      "quote",
      "documents",
      "handover",
      "followup",
    ],
  },
  {
    id: "waermepumpe",
    label: "Wärmepumpe / Heizung",
    tasks: [
      "project-intake",
      "appointments",
      "quote",
      "handover",
      "invoices",
      "followup",
    ],
  },
  {
    id: "immobilien",
    label: "Immobilien",
    tasks: [
      "property",
      "appointments",
      "listing",
      "documents",
      "followup",
      "reporting",
    ],
  },
  {
    id: "treuhand",
    label: "Treuhand",
    tasks: [
      "receipts",
      "documents",
      "invoices",
      "deadlines",
      "reporting",
      "meeting",
    ],
  },
  {
    id: "medizin",
    label: "Medizin / Ästhetik",
    tasks: ["appointments", "reception", "documents", "invoices", "reporting"],
  },
  {
    id: "umzug",
    label: "Umzug",
    tasks: [
      "intake",
      "moving",
      "appointments",
      "dispatch",
      "invoices",
      "followup",
    ],
  },
  {
    id: "allgemein",
    label: "Andere Dienstleistung",
    tasks: [
      "intake",
      "appointments",
      "meeting",
      "documents",
      "followup",
      "reporting",
      "invoices",
    ],
  },
]

export type AutomationTaskInput = {
  id: string
  weeklyCount: number
  minutes: number
  automationPercent: number
}
export type AutomationTaskInputV2 = AutomationTaskInput & {
  controlMinutes: number
}
export type AutomationInput = {
  industryIds: string[]
  hourlyRate?: number
} & (
  | { version: 1; tasks: AutomationTaskInput[] }
  | { version: 2; tasks: AutomationTaskInputV2[] }
)

export function getAutomationTasks(industryIds: string[]) {
  const ids = new Set(
    automationIndustries
      .filter((industry) => industryIds.includes(industry.id))
      .flatMap((industry) => industry.tasks),
  )
  return automationTasks.filter((task) => ids.has(task.id))
}

export function calculateAutomationPotential(input: AutomationInput) {
  const allowed = new Set(
    getAutomationTasks(input.industryIds).map((task) => task.id as string),
  )
  if (
    (input.version !== 1 && input.version !== 2) ||
    input.industryIds.length === 0 ||
    new Set(input.industryIds).size !== input.industryIds.length ||
    input.industryIds.some(
      (id) => !automationIndustries.some((industry) => industry.id === id),
    ) ||
    input.tasks.length === 0 ||
    new Set(input.tasks.map((task) => task.id)).size !== input.tasks.length ||
    (input.hourlyRate !== undefined &&
      (!Number.isFinite(input.hourlyRate) ||
        input.hourlyRate < 0 ||
        input.hourlyRate > 10000)) ||
    input.tasks.some(
      (task) =>
        !allowed.has(task.id) ||
        ![task.weeklyCount, task.minutes, task.automationPercent].every(
          Number.isFinite,
        ) ||
        !Number.isInteger(task.weeklyCount) ||
        task.weeklyCount < 1 ||
        task.weeklyCount > 100000 ||
        task.minutes <= 0 ||
        task.minutes > 10080 ||
        task.automationPercent < 0 ||
        task.automationPercent > 100 ||
        (input.version === 2 &&
          (!Number.isFinite((task as AutomationTaskInputV2).controlMinutes) ||
            (task as AutomationTaskInputV2).controlMinutes < 0 ||
            (task as AutomationTaskInputV2).controlMinutes > 10080)),
    )
  )
    return null
  const rows = input.tasks.map((task) => {
    const currentMinutes = task.weeklyCount * task.minutes
    const automatedMinutes = (currentMinutes * task.automationPercent) / 100
    const controlMinutesPerCase =
      input.version === 2 ? (task as AutomationTaskInputV2).controlMinutes : 0
    // With a zero target the workflow is not automated, so no new control step runs.
    const weeklyControlMinutes =
      task.automationPercent === 0
        ? 0
        : task.weeklyCount * controlMinutesPerCase
    return {
      ...task,
      label: automationTasks.find((item) => item.id === task.id)!.label,
      currentMinutes,
      automatedMinutes,
      controlMinutesPerCase,
      weeklyControlMinutes,
      freedMinutes: automatedMinutes - weeklyControlMinutes,
    }
  })
  const currentHours =
    rows.reduce((sum, row) => sum + row.currentMinutes, 0) / 60
  const freedHours = rows.reduce((sum, row) => sum + row.freedMinutes, 0) / 60
  const automatedHours =
    rows.reduce((sum, row) => sum + row.automatedMinutes, 0) / 60
  const controlHours =
    rows.reduce((sum, row) => sum + row.weeklyControlMinutes, 0) / 60
  const monthlyHours = (freedHours * 52) / 12
  return {
    rows,
    currentHours,
    automatedHours,
    controlHours,
    freedHours,
    remainingHours: currentHours - freedHours,
    automationPercent: (automatedHours / currentHours) * 100,
    monthlyHours,
    monthlyTimeValue:
      input.hourlyRate === undefined ? null : monthlyHours * input.hourlyRate,
  }
}

export function calculateAutomationScenarios(input: AutomationInput) {
  const planned = calculateAutomationPotential(input)
  if (!planned) return null
  const cautiousInput: AutomationInput =
    input.version === 2
      ? {
          ...input,
          tasks: input.tasks.map((task) => ({
            ...task,
            automationPercent: task.automationPercent * 0.75,
          })),
        }
      : {
          ...input,
          tasks: input.tasks.map((task) => ({
            ...task,
            automationPercent: task.automationPercent * 0.75,
          })),
        }
  const cautious = calculateAutomationPotential(cautiousInput)!
  return { planned, cautious }
}

export function formatAutomationDuration(hours: number) {
  const inMinutes = Math.abs(hours) > 0 && Math.abs(hours) < 1
  const value = inMinutes ? hours * 60 : hours
  const formatted = new Intl.NumberFormat("de-CH", {
    maximumFractionDigits: 2,
  }).format(value)
  return `${formatted} ${inMinutes ? "Min." : "Std."}`
}

export function buildAutomationPlan(input: AutomationInput) {
  const result = calculateAutomationPotential(input)
  if (!result) return null
  const fmt = (value: number) =>
    new Intl.NumberFormat("de-CH", { maximumFractionDigits: 1 }).format(value)
  const duration =
    input.version === 2
      ? formatAutomationDuration
      : (hours: number) => `${fmt(hours)} Stunden`
  const first = [...result.rows].sort(
    (a, b) => b.freedMinutes - a.freedMinutes,
  )[0]
  const scenarios =
    input.version === 2 ? calculateAutomationScenarios(input) : null
  return [
    "AGENTICIT · IHR AUTOMATISIERUNGS-CHECK",
    `Branchen: ${automationIndustries
      .filter((industry) => input.industryIds.includes(industry.id))
      .map((industry) => industry.label)
      .join(", ")}`,
    "",
    "IHRE AUSGEWÄHLTEN MANUELLEN AUFGABEN",
    ...result.rows.map(
      (row) =>
        `${row.label}: ${row.weeklyCount} Vorgänge/Woche × ${row.minutes} Minuten; Zielanteil ${row.automationPercent} %; ${input.version === 2 ? `zusätzliche Kontrolle ${row.controlMinutesPerCase} Minuten/Vorgang; ` : ""}rechnerischer Zeitgewinn ${duration(row.freedMinutes / 60)}/Woche.`,
    ),
    "",
    `Erfasster heutiger Aufwand: ${duration(result.currentHours)}/Woche`,
    `Geplanter Automatisierungsgrad des erfassten Zeitaufwands: ${fmt(result.automationPercent)} %`,
    ...(input.version === 2
      ? [
          `Automatisierte Bearbeitungszeit: ${duration(result.automatedHours)}/Woche`,
          `Zusätzliche Kontrolle: ${duration(result.controlHours)}/Woche`,
        ]
      : []),
    `${input.version === 2 ? "Rechnerischer Zeitgewinn nach Kontrolle" : "Rechnerisch freie Kapazität"}: ${duration(result.freedHours)}/Woche, ${duration(result.monthlyHours)}/Monat`,
    ...(input.version === 2
      ? [
          `Verbleibender Gesamtaufwand: ${duration(result.remainingHours)}/Woche`,
        ]
      : []),
    input.hourlyRate === undefined
      ? "Kein Stundensatz angegeben; kein Zeitwert in CHF berechnet."
      : `Interner Stundensatz: CHF ${fmt(input.hourlyRate)}; rechnerischer Zeitwert: CHF ${fmt(result.monthlyTimeValue!)} pro Monat.`,
    ...(scenarios
      ? [
          "",
          "VORSICHTIGER RECHNEN",
          `Vergleich mit 75 % Ihres Zielanteils und unveränderter Kontrollzeit: ${duration(scenarios.cautious.freedHours)}/Woche. Dies ist eine andere Annahme, keine Prognose oder Erfolgswahrscheinlichkeit.`,
        ]
      : []),
    "",
    result.freedHours > 0
      ? `Zuerst prüfen: ${first.label}. Grenzen Sie einen Schritt ab, bestätigen Sie Datenzugang und Zuständigkeit und messen Sie die tatsächliche Zeit vor und nach einem Test.`
      : result.freedHours < 0
        ? `Rechnerischer Mehraufwand: ${duration(-result.freedHours)}/Woche. Die zusätzliche Kontrolle kostet mehr Zeit, als die Automatisierung freigibt. Prüfen Sie einen einfacheren Ablauf.`
        : "Unter diesen Annahmen entsteht rechnerisch keine freie Kapazität. Prüfen Sie einen geeigneten Teilprozess.",
    ...(input.version === 2
      ? [
          "1. Heute messen: Zeit und Häufigkeit des ausgewählten Ablaufs an realen Vorgängen festhalten.",
          "2. Grenzen festlegen: Datenzugang, Ausnahmen, Zuständigkeit und menschliche Freigaben vereinbaren.",
          "3. Gemeinsam vergleichen: Bearbeitung plus Kontrolle nach einem begrenzten Test erneut messen und die laufenden Kosten einbeziehen.",
        ]
      : []),
    "Fachliche Entscheidungen, Ausnahmen und Freigaben bleiben beim zuständigen Menschen. Geschäftliche Nachrichten vor Versand freigeben.",
    "",
    `Planung mit Ihren Angaben. Beispielwerte und Zielanteile sind keine Branchenbenchmarks und keine geprüfte technische Machbarkeit. Monatswert = Wochenwert × 52 / 12. Freie Zeit ist keine automatisch eingesparte Ausgabe. Umsetzung, Software und Betrieb sind nicht als Kosten abgezogen. ${input.version === 2 ? "Die eingegebene zusätzliche Kontrollzeit ist als Zeitaufwand abgezogen. Sie gilt je Vorgang, sobald der Zielanteil grösser als 0 % ist." : "Kontrollen müssen bereits im eingegebenen Netto-Zielanteil berücksichtigt sein."}`,
    "https://agenticit.ch/automatisierungs-check",
  ].join("\n")
}
