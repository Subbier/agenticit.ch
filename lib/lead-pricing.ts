// Zentrale Branchen-Konfiguration für ROI-Rechner und Lead-Formular.
// Lead-Preise (CHF) = veröffentlichter Richtwert pro Kundenanfrage (Lead).
// Die teuersten Keywords werden bewusst ausgeschlossen, um den Preis tief zu
// halten. Quartalsweise via Semrush überprüft. Stand: Q2 2026.

export interface IndustryConfig {
  /** Technischer Wert (Select-Value, stabil – nicht ändern) */
  value: string
  /** Anzeigename in Dropdowns */
  label: string
  /** Richtwert pro Kundenanfrage (Lead) in CHF */
  leadPrice: number
  /** Default Ø Auftragswert (CHF) für den Rechner */
  avgOrder: number
  /** Maximaler Slider-Wert für den Auftragswert (CHF) */
  maxOrder: number
  /** Schrittweite des Auftragswert-Sliders (CHF) */
  step: number
  /** Erwartete Conversion-Steigerung in % */
  conversion: number
  /** Schnellere Reaktionszeit in % */
  response: number
  /** Höhere Kundenzufriedenheit in % */
  satisfaction: number
}

export const industries: IndustryConfig[] = [
  { value: "versicherung", label: "Versicherung", leadPrice: 50, avgOrder: 1200, maxOrder: 10000, step: 100, conversion: 35, response: 85, satisfaction: 50 },
  { value: "solar", label: "Solar / Photovoltaik", leadPrice: 65, avgOrder: 18000, maxOrder: 60000, step: 1000, conversion: 30, response: 80, satisfaction: 45 },
  { value: "waermepumpe", label: "Wärmepumpe / Heizung", leadPrice: 55, avgOrder: 25000, maxOrder: 80000, step: 1000, conversion: 30, response: 80, satisfaction: 45 },
  { value: "finanzberatung", label: "Finanzberatung / Hypothek", leadPrice: 30, avgOrder: 3000, maxOrder: 30000, step: 500, conversion: 35, response: 85, satisfaction: 50 },
  { value: "vorsorge", label: "Vorsorge / 3a / Pensionskasse", leadPrice: 20, avgOrder: 2000, maxOrder: 20000, step: 500, conversion: 35, response: 85, satisfaction: 50 },
  { value: "immobilien", label: "Immobilien / Makler", leadPrice: 45, avgOrder: 5000, maxOrder: 50000, step: 1000, conversion: 40, response: 85, satisfaction: 50 },
  { value: "treuhand", label: "Treuhand / Steuerberatung", leadPrice: 35, avgOrder: 1500, maxOrder: 12000, step: 100, conversion: 30, response: 80, satisfaction: 45 },
  { value: "medizin", label: "Medizin / Ästhetik", leadPrice: 25, avgOrder: 800, maxOrder: 6000, step: 100, conversion: 35, response: 85, satisfaction: 50 },
  { value: "umzug", label: "Umzug / Premium-Service", leadPrice: 70, avgOrder: 1500, maxOrder: 8000, step: 100, conversion: 30, response: 80, satisfaction: 40 },
  { value: "sonstige", label: "Sonstige", leadPrice: 40, avgOrder: 150, maxOrder: 2000, step: 25, conversion: 35, response: 80, satisfaction: 45 },
]

export const DEFAULT_INDUSTRY = "versicherung"

export const industryLabels: string[] = industries.map((i) => i.label)

export function getIndustryByValue(value: string): IndustryConfig {
  return industries.find((i) => i.value === value) ?? industries[industries.length - 1]
}

export function getIndustryByLabel(label: string): IndustryConfig | undefined {
  return industries.find((i) => i.label === label)
}

/** Lead-Preis (CHF) zu einem Branchen-Label, oder undefined wenn unbekannt. */
export function getLeadPriceByLabel(label: string): number | undefined {
  return getIndustryByLabel(label)?.leadPrice
}
