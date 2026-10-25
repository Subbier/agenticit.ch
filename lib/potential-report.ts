import { z } from "zod"

export const potentialKinds = [
  "acquisition",
  "conversion",
  "admin",
  "onboarding",
  "phone",
  "retention",
  "partnership",
] as const
export type PotentialKind = (typeof potentialKinds)[number]

export const potentialConfigs = {
  acquisition: {
    label: "Mehr passende Anfragen",
    title: "Was wären mehr Wunschkunden für Sie wert?",
    intro:
      "Rechnen Sie aus, welchen zusätzlichen Umsatz mehr passende Anfragen für Ihr Unternehmen bedeuten könnten.",
    unit: "Passende Anfragen pro Monat",
    targetUnit: "Wie viele passende Anfragen wünschen Sie sich pro Monat?",
    rate: "Wie viel Prozent werden heute zu Aufträgen?",
    targetRate: "Welche Abschlussquote möchten Sie erreichen?",
    value: "Durchschnittlicher Auftragswert in CHF",
    time: "Minuten Bearbeitung pro Anfrage",
    targetTime: "Künftig: Minuten pro Anfrage",
    mode: "revenue",
    source: "marketing-setup-check",
    path: "/marketing-setup-check",
    opportunity:
      "Mehr passende Anfragen geben Ihrem Vertrieb mehr Chancen auf die Aufträge, die zu Ihnen passen. Ihre Rechnung zeigt, was Ihr Wunschvolumen bei Ihrer gewählten Abschlussquote bedeuten würde.",
  },
  conversion: {
    label: "Mehr Gespräche und Abschlüsse",
    title: "Wie viel mehr steckt in Ihren Anfragen?",
    intro:
      "Entdecken Sie, was zusätzliche Abschlüsse aus Ihren bestehenden Anfragen und weniger Nachfassen für Sie wert wären.",
    unit: "Anfragen pro Monat",
    targetUnit: "Anfragen im Szenario",
    rate: "Ihre heutige Abschlussquote in Prozent",
    targetRate: "Welche Abschlussquote wäre für Sie ein Gewinn?",
    value: "Durchschnittlicher Auftragswert in CHF",
    time: "Minuten Bearbeitung und Nachfassen pro Anfrage",
    targetTime: "Künftig: Minuten pro Anfrage",
    mode: "revenue",
    source: "anfragen-check",
    path: "/anfragen-check",
    opportunity:
      "Sie müssen für zusätzliche Abschlüsse nicht zwingend mehr Anfragen einkaufen. Ihr Szenario zeigt den Wert einer höheren Abschlussquote aus dem bestehenden Anfragevolumen.",
  },
  admin: {
    label: "Mehr Zeit. Weniger Handarbeit.",
    title: "Wie viel Ihrer Zeit könnten Sie zurückgewinnen?",
    intro:
      "Sehen Sie in Stunden und Franken, was weniger Routinearbeit für Sie und Ihr Team bedeuten könnte.",
    unit: "Wiederkehrende Vorgänge pro Monat",
    targetUnit: "Vorgänge im Szenario",
    rate: "",
    targetRate: "",
    value: "",
    time: "Heute: Minuten Handarbeit pro Vorgang",
    targetTime: "Wie wenige Minuten wären künftig nötig?",
    mode: "time",
    source: "automation-check",
    path: "/automatisierungs-check",
    opportunity:
      "Weniger kopieren, erfassen und nacharbeiten schafft Platz für Kunden und wertvollere Aufgaben. Der Zeitwert zeigt die frei werdende Kapazität; eine tatsächliche Kostensenkung setzt entsprechend weniger Ausgaben voraus.",
  },
  onboarding: {
    label: "Ein Kundenstart, der sich auszahlt",
    title: "Mehr neue Kunden. Weniger Aufwand beim Start.",
    intro:
      "Was könnten Sie gewinnen, wenn jeder neue Kunde weniger Administration auslöst? Berechnen Sie Ihre freie Kapazität.",
    unit: "Neue Kunden pro Monat",
    targetUnit: "Neue Kunden im Szenario",
    rate: "",
    targetRate: "",
    value: "",
    time: "Heute: Minuten Aufwand pro Kundenstart",
    targetTime: "Ihr Wunsch: Minuten pro Kundenstart",
    mode: "time",
    source: "journey-check",
    path: "/kundenreise-check?thema=onboarding",
    opportunity:
      "Ein einfacherer Kundenstart spart bei jedem neuen Auftrag erneut Zeit. Ihre zusätzliche Kapazität kann in persönliche Betreuung fliessen oder weitere Kundenstarts ermöglichen.",
  },
  phone: {
    label: "Aus Anrufen werden Chancen",
    title: "Was wären mehr Aufträge aus Ihren Anrufen wert?",
    intro:
      "Berechnen Sie, was mehr gewonnene Aufträge aus Ihrem Anrufvolumen und weniger Telefonaufwand für Sie bedeuten könnten.",
    unit: "Geschäftliche Anrufe pro Monat",
    targetUnit: "Anrufe im Szenario",
    rate: "Anteil aller Anrufe, aus denen heute ein Auftrag entsteht (%)",
    targetRate: "Aus wie viel Prozent sollen künftig Aufträge entstehen?",
    value: "Durchschnittlicher Auftragswert in CHF",
    time: "Minuten Aufwand pro Anruf inklusive Nacharbeit",
    targetTime: "Künftig: Minuten Aufwand pro Anruf",
    mode: "revenue",
    source: "journey-check",
    path: "/kundenreise-check?thema=phone",
    opportunity:
      "Ihr Szenario macht den Wert zusätzlicher Aufträge aus dem bestehenden Anrufvolumen sichtbar. Gemeint sind Aufträge aus allen geschäftlichen Anrufen, nicht nur angenommene Gespräche.",
  },
  retention: {
    label: "Mehr Wert aus Kundenbeziehungen",
    title: "Was wäre es wert, wenn mehr Kunden bleiben?",
    intro:
      "Berechnen Sie den möglichen Umsatzunterschied, wenn mehr anstehende Verlängerungen zu einem weiteren Auftrag werden.",
    unit: "Kunden mit anstehender Verlängerung pro Monat",
    targetUnit: "Anstehende Verlängerungen im Szenario",
    rate: "Wie viel Prozent verlängern heute?",
    targetRate: "Welche Verlängerungsquote möchten Sie erreichen?",
    value:
      "Umsatz pro verlängerndem Kunden für die nächste Vertragsperiode (CHF)",
    time: "Minuten Betreuung pro anstehender Verlängerung",
    targetTime: "Künftig: Minuten Betreuung pro Verlängerung",
    mode: "revenue",
    source: "journey-check",
    path: "/kundenreise-check?thema=retention",
    opportunity:
      "Bestehende Kunden kennen Ihren Wert bereits. Die Rechnung zeigt den Umsatzwert zusätzlicher Verlängerungen. Der Jahreswert setzt jeden Monat eine neue Kundengruppe mit gleich vielen anstehenden Verlängerungen voraus.",
  },
  partnership: {
    label: "Mehr Geschäft. Weniger Technikaufwand.",
    title: "Was kostet es Sie, alles selbst zusammenzuhalten?",
    intro:
      "Rechnen Sie aus, wie viel Zeit und Kapazität Sie durch weniger Abstimmung zwischen Tools und Dienstleistern gewinnen könnten.",
    unit: "Abstimmungen oder technische Routinefälle pro Monat",
    targetUnit: "Fälle im Szenario",
    rate: "",
    targetRate: "",
    value: "",
    time: "Heute: Minuten Aufwand pro Fall",
    targetTime: "Mit einem Partner: gewünschte Minuten pro Fall",
    mode: "time",
    source: "journey-check",
    path: "/kundenreise-check?thema=partnership",
    opportunity:
      "Weniger Abstimmung zwischen Website, CRM, Marketing und Telefonie lässt mehr Zeit für Ihr Geschäft. Ihre Rechnung zeigt, welchen Kapazitätswert ein zentraler Ansprechpartner für Sie haben könnte.",
  },
} as const

const amount = z.number().finite().min(0).max(10000000)
export const potentialInputSchema = z
  .object({
    version: z.literal(1),
    kind: z.enum(potentialKinds),
    volume: z.number().int().min(0).max(1000000),
    targetVolume: z.number().int().min(0).max(1000000),
    currentRate: z.number().finite().min(0).max(100),
    targetRate: z.number().finite().min(0).max(100),
    value: amount,
    margin: z.number().finite().min(0).max(100),
    minutes: z.number().finite().min(0).max(10080),
    targetMinutes: z.number().finite().min(0).max(10080),
    hourlyRate: z.number().finite().min(0).max(10000),
    setupCost: amount,
    monthlyCost: amount,
  })
  .superRefine((input, ctx) => {
    if (input.kind !== "acquisition" && input.targetVolume !== input.volume)
      ctx.addIssue({
        code: "custom",
        path: ["targetVolume"],
        message: "Das Szenario verwendet dasselbe monatliche Volumen.",
      })
  })
export type PotentialInput = z.infer<typeof potentialInputSchema>

export function calculatePotential(raw: PotentialInput) {
  const input = potentialInputSchema.parse(raw)
  const revenue = potentialConfigs[input.kind].mode === "revenue"
  const currentWins = revenue ? (input.volume * input.currentRate) / 100 : 0
  const targetWins = revenue ? (input.targetVolume * input.targetRate) / 100 : 0
  // Round currency at the boundary, not intermediate order counts.
  const money = (value: number) => Math.round(value * 100) / 100
  const currentRevenue = money(currentWins * input.value)
  const targetRevenue = money(targetWins * input.value)
  const monthlyRevenueDelta = money(targetRevenue - currentRevenue)
  const currentHours = (input.volume * input.minutes) / 60
  const targetHours = (input.targetVolume * input.targetMinutes) / 60
  const hoursSaved = currentHours - targetHours
  const monthlyTimeValue = money(hoursSaved * input.hourlyRate)
  const monthlyContribution = money((monthlyRevenueDelta * input.margin) / 100)
  const monthlyCashAfterCosts = money(monthlyContribution - input.monthlyCost)
  const annualRevenueDelta = money(monthlyRevenueDelta * 12)
  return {
    currentWins,
    targetWins,
    currentRevenue,
    targetRevenue,
    monthlyRevenueDelta,
    annualRevenueDelta,
    currentHours,
    targetHours,
    hoursSaved,
    annualHoursSaved: hoursSaved * 12,
    monthlyTimeValue,
    firstYearTimeValue: money(monthlyTimeValue * 12),
    monthlyContribution,
    monthlyCashAfterCosts,
    firstYearContribution: money(monthlyCashAfterCosts * 12 - input.setupCost),
    firstYearCapacityAfterCosts: money(
      monthlyTimeValue * 12 - input.monthlyCost * 12 - input.setupCost,
    ),
    breakEvenMonths:
      revenue && monthlyCashAfterCosts > 0
        ? input.setupCost / monthlyCashAfterCosts
        : null,
    additionalCapacity:
      !revenue && input.targetMinutes > 0
        ? Math.floor((Math.max(0, hoursSaved) * 60) / input.targetMinutes)
        : null,
  }
}

export function reportSummary(input: PotentialInput) {
  const c = potentialConfigs[input.kind]
  const r = calculatePotential(input)
  return [
    c.label,
    `Variante: ${input.kind}`,
    "Persönliches Potenzial-PDF angefordert.",
    `Eingaben und ausdrücklich gewähltes Szenario: ${JSON.stringify(input)}`,
    `Zusätzlicher Jahresumsatz (Szenario): CHF ${r.annualRevenueDelta}`,
    `Zeitgewinn pro Jahr: ${r.annualHoursSaved} Stunden`,
    `Deckungsbeitrag nach angegebenen Kosten im ersten Jahr: CHF ${r.firstYearContribution}`,
    `Zeitwert im ersten Jahr (keine garantierte Kostenersparnis): CHF ${r.firstYearTimeValue}`,
    "Szenariorechnung, keine Umsatz- oder Gewinnzusage. Umsatz und Zeitwert werden nicht addiert.",
    "PDF-Anfrage persönlich prüfen. Keine automatische Sales-Nachricht; keine Newsletter-Einwilligung.",
  ].join("\n")
}
