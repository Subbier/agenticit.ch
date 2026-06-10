// Monatliche Suchnachfrage je Branche in der Deutschschweiz (Google, DB "ch").
// Wert = Summe der monatlichen Suchvolumen der wichtigsten Suchbegriffe der
// Branche (Top-Keywords je Seed), auf saubere Tausender gerundet.
// Quelle: Semrush. Stand: Q2 2026. Wird quartalsweise aktualisiert.

export interface DemandEntry {
  value: string
  label: string
  /** Gerundete monatliche Suchanfragen in der Deutschschweiz */
  monthlySearches: number
  /** Beispielhafte Suchbegriffe der Branche */
  exampleKeywords: string[]
}

export const demandByIndustry: Record<string, DemandEntry> = {
  versicherung: {
    value: "versicherung",
    label: "Versicherung",
    monthlySearches: 153000,
    exampleKeywords: ["versicherung vergleich", "krankenkasse wechseln", "auto versicherung"],
  },
  solar: {
    value: "solar",
    label: "Solar / Photovoltaik",
    monthlySearches: 21000,
    exampleKeywords: ["photovoltaik kosten", "solaranlage", "photovoltaik speicher"],
  },
  waermepumpe: {
    value: "waermepumpe",
    label: "Wärmepumpe / Heizung",
    monthlySearches: 27000,
    exampleKeywords: ["wärmepumpe kosten", "luft wasser wärmepumpe", "wärmepumpe altbau"],
  },
  finanzberatung: {
    value: "finanzberatung",
    label: "Finanzberatung / Hypothek",
    monthlySearches: 54000,
    exampleKeywords: ["hypothek berechnen", "hypotheken vergleich", "saron hypothek"],
  },
  vorsorge: {
    value: "vorsorge",
    label: "Vorsorge / 3a / Pensionskasse",
    monthlySearches: 52000,
    exampleKeywords: ["säule 3a", "säule 3a vergleich", "steuern sparen säule 3a"],
  },
  immobilien: {
    value: "immobilien",
    label: "Immobilien / Makler",
    monthlySearches: 255000,
    exampleKeywords: ["immobilien kaufen", "immobilien in der nähe", "haus verkaufen"],
  },
  treuhand: {
    value: "treuhand",
    label: "Treuhand / Steuerberatung",
    monthlySearches: 34000,
    exampleKeywords: ["treuhand", "treuhänder", "steuererklärung ausfüllen lassen"],
  },
  medizin: {
    value: "medizin",
    label: "Medizin / Ästhetik",
    monthlySearches: 19000,
    exampleKeywords: ["botox", "faltenbehandlung", "schönheitsbehandlung"],
  },
  umzug: {
    value: "umzug",
    label: "Umzug / Premium-Service",
    monthlySearches: 28000,
    exampleKeywords: ["umzug offerte", "umzugsfirma", "kosten umzug schweiz"],
  },
  // Ohne fixe Zahl – wir ermitteln die genaue Nachfrage im Gespräch.
  sonstige: {
    value: "sonstige",
    label: "Sonstige",
    monthlySearches: 0,
    exampleKeywords: [],
  },
}

export const DEFAULT_DEMAND = "versicherung"

export function getDemand(value: string): DemandEntry {
  return demandByIndustry[value] ?? demandByIndustry.sonstige
}
