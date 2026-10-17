import { z } from "zod"

export const planningIndustries = [
  { value: "versicherung", label: "Versicherung" },
  { value: "finanzberatung", label: "Finanzberatung / Hypothek" },
  { value: "vorsorge", label: "Vorsorge / 3a / Pensionskasse" },
  { value: "immobilien", label: "Immobilien / Makler" },
  { value: "treuhand", label: "Treuhand / Steuerberatung" },
  { value: "solar", label: "Solar / Photovoltaik" },
  { value: "waermepumpe", label: "Wärmepumpe / Heizung" },
  { value: "medizin", label: "Medizin / Ästhetik" },
  { value: "umzug", label: "Umzug / Service" },
  { value: "sonstige", label: "Andere Branche" },
] as const

const industrySchema = z.enum([
  "versicherung",
  "finanzberatung",
  "vorsorge",
  "immobilien",
  "treuhand",
  "solar",
  "waermepumpe",
  "medizin",
  "umzug",
  "sonstige",
])
export const acquisitionPlanSchema = z
  .object({
    version: z.literal(1),
    industryIds: z
      .array(industrySchema)
      .max(10)
      .refine((ids) => new Set(ids).size === ids.length),
    monthlyCustomers: z.number().finite().int().min(1).max(10000),
    closeRate: z.number().finite().min(0.1).max(100),
    handlingMinutes: z.number().finite().min(0).max(1440).optional(),
  })
  .strict()

export type AcquisitionPlanInput = z.infer<typeof acquisitionPlanSchema>
export type PlanningIndustryId = AcquisitionPlanInput["industryIds"][number]
export const formatPlanningNumber = (number: number) =>
  new Intl.NumberFormat("de-CH", { maximumFractionDigits: 2 }).format(number)
export const planningIndustryLabels = (ids: readonly string[]) =>
  planningIndustries
    .filter((industry) => ids.includes(industry.value))
    .map((industry) => industry.label)

export function calculateAcquisitionPlan(input: unknown) {
  const parsed = acquisitionPlanSchema.safeParse(input)
  if (!parsed.success) return null
  const { monthlyCustomers, closeRate, handlingMinutes } = parsed.data
  const requiredInquiries = Math.ceil((monthlyCustomers * 100) / closeRate)
  const cautiousRate = closeRate * 0.8
  return {
    input: parsed.data,
    requiredInquiries,
    handlingMinutes:
      handlingMinutes === undefined
        ? null
        : requiredInquiries * handlingMinutes,
    cautiousRate,
    cautiousInquiries: Math.ceil((monthlyCustomers * 100) / cautiousRate),
  }
}

export function buildAcquisitionPlan(input: unknown): string | null {
  const result = calculateAcquisitionPlan(input)
  if (!result) return null
  const { monthlyCustomers, closeRate, industryIds, handlingMinutes } =
    result.input
  const fmt = formatPlanningNumber
  return [
    "AGENTICIT · ANFRAGENPLANUNG",
    "Ziele und Annahmen für einen Planungsmonat. Eigene Angaben, keine Markt- oder Leistungsdaten.",
    "",
    "IHRE ANGABEN",
    `Branchen: ${planningIndustryLabels(industryIds).join(", ") || "noch zu klären"}`,
    `Kundenziel pro Monat: ${fmt(monthlyCustomers)} Neukunden`,
    `Angenommene Abschlussquote: ${fmt(closeRate)} % der passenden Anfragen`,
    handlingMinutes === undefined
      ? "Bearbeitungszeit: noch zu klären"
      : `Bearbeitungszeit je Anfrage: ${fmt(handlingMinutes)} Minuten`,
    "",
    "IHRE RECHNUNG",
    `${fmt(monthlyCustomers)} × 100 / ${fmt(closeRate)} = ${fmt(result.requiredInquiries)} passende Anfragen (auf nächste ganze Anfrage aufgerundet).`,
    result.handlingMinutes === null
      ? "Gesamter Bearbeitungsaufwand: noch zu klären."
      : `Geplanter Bearbeitungsaufwand: ${fmt(result.handlingMinutes)} Minuten (${fmt(result.handlingMinutes / 60)} Stunden).`,
    `Vorsichtigere Annahme: 80 % Ihrer Abschlussquote, also ${fmt(result.cautiousRate)} %. Dafür wären rechnerisch ${fmt(result.cautiousInquiries)} passende Anfragen nötig.`,
    "",
    "DREI SCHRITTE FÜR IHR TEAM",
    "1. Marketing: Zielgruppe, Angebot und einen Anfrageweg festlegen. Prüfen, ob das Anfrageziel mit Reichweite, Budget und Team erreichbar ist.",
    "2. Sales: Gemeinsam definieren, wann eine Anfrage passt. Zuständigkeit, Reaktion und nächsten Schritt im CRM festhalten.",
    "3. Verwaltung: Passende Anfragen und tatsächliche Abschlüsse derselben Gruppe nachhalten. Bearbeitungszeit messen und Annahmen anschliessend korrigieren.",
    "",
    "ZUM AUSFÜLLEN",
    "Planungsmonat: ____________________",
    "Passende Anfrage bedeutet für uns: ____________________",
    "Gewählter Anfrageweg: ____________________",
    "Verantwortlich und Vertretung: ____________________",
    "Prüftermin und tatsächliche Werte: ____________________",
    "",
    "GRENZEN",
    "Dies ist eine Planungsrechnung, keine Prognose. Suchnachfrage, Werbekosten, Umsatz und Abschlussdauer werden nicht gemessen. Abschlüsse können in einem späteren Monat erfolgen. Die vorsichtigere Quote ist eine zusätzliche Annahme, keine gemessene Schwankung. Ob diese Ziele erreichbar sind, muss im echten Ablauf geprüft werden.",
    "https://agenticit.ch/potenzial",
    "Marketing-Setup prüfen: https://agenticit.ch/marketing-setup-check",
  ].join("\n")
}
