// AgenticIT · Microservice-/Produkt-Datenmodell (Single Source of Truth)
// Speist den ROI-Rechner; perspektivisch auch Lösungs-Seiten & Verkaufskatalog.
// Werte indikativ, aus belegten Studienwerten (siehe `src`).
// ⚠️ Human-in-the-Loop: Zahlen & Quellen vor Live-Schaltung menschlich prüfen.

export type Scenario = "min" | "schnitt" | "pro"

export interface Microservice {
  id: string
  name: string
  desc: string
  /** Quelle/Beleg für die Indikativwerte */
  src: string
  /** 3-Jahres-Effekt (CHF) je Szenario */
  min: number
  schnitt: number
  pro: number
  /** Jährliche Ersparnis (CHF) */
  ers: number
}

export interface Pillar {
  key: "revops" | "service" | "process"
  /** Alltagssprache – versteht jeder auf den ersten Blick */
  plain: string
  /** Kurz, was es konkret bringt */
  benefit: string
  /** Fachbegriff (kleine Unterzeile) */
  name: string
  icon: string
  products: Microservice[]
}

export const PILLARS: Pillar[] = [
  {
    key: "revops",
    plain: "Mehr Umsatz & neue Kunden",
    benefit: "Leads gewinnen, schneller verkaufen",
    name: "RevOps & Growth",
    icon: "🚀",
    products: [
      { id: "lead", name: "Lead-Maschine", desc: "Sinus-Leads, Scoring, Retargeting", src: "Sinus-Institut · +20% Conversion", min: 180000, schnitt: 450000, pro: 900000, ers: 50000 },
      { id: "sales", name: "Sales-Agent", desc: "KI-Verkaufsassistent, Cross-/Upselling", src: "Salesforce · +15–30% Sales", min: 300000, schnitt: 750000, pro: 1500000, ers: 40000 },
      { id: "content", name: "Content- & Social-KI", desc: "Content, Posts, Newsletter, Kampagnen", src: "Vertafore · +50% Content-Effizienz", min: 180000, schnitt: 450000, pro: 900000, ers: 30000 },
    ],
  },
  {
    key: "service",
    plain: "Kundenservice rund um die Uhr",
    benefit: "Anfragen sofort beantworten, Tag & Nacht",
    name: "Kundendienst-KI",
    icon: "💬",
    products: [
      { id: "bot", name: "Kundendienst-Bot", desc: "Chat, FAQ, Routing, 24/7", src: "Boost.ai · 50% effizienterer Service", min: 300000, schnitt: 750000, pro: 1500000, ers: 50000 },
      { id: "voice", name: "Voice-/Call-Agent", desc: "Anrufe, Dialing, Live-Coaching", src: "Genesys · +100% Produktivität", min: 360000, schnitt: 900000, pro: 1800000, ers: 100000 },
    ],
  },
  {
    key: "process",
    plain: "Weniger Handarbeit im Büro",
    benefit: "Routine läuft automatisch, fehlerfrei",
    name: "Prozessautomatisierung",
    icon: "⚙️",
    products: [
      { id: "backoffice", name: "Backoffice-Automatisierung", desc: "Admin, Dokumente, Datenpflege", src: "MarshBerry · 70% Zeitersparnis", min: 180000, schnitt: 450000, pro: 900000, ers: 40000 },
      { id: "claims", name: "Finanz- & Claims-Automatisierung", desc: "Belege, Claims, Underwriting", src: "McKinsey · 50% schnellere Claims", min: 360000, schnitt: 900000, pro: 1800000, ers: 50000 },
      { id: "risk", name: "Risiko- & Fraud-KI", desc: "Risikobewertung, Fraud Detection", src: "Deloitte · 40% Risikoreduktion", min: 360000, schnitt: 900000, pro: 1800000, ers: 50000 },
      { id: "team", name: "Team-Enablement-KI", desc: "Training, Upskilling, Wissen", src: "Swiss Re · +30–50% Talentretention", min: 300000, schnitt: 750000, pro: 1500000, ers: 35000 },
    ],
  },
]

export const ALL_PRODUCTS: Record<string, Microservice> = Object.fromEntries(
  PILLARS.flatMap((p) => p.products.map((m) => [m.id, m])),
)

export interface RoiResult {
  annual: number
  threeYear: number
  savings: number
  roi: number
  count: number
}

/** Jahresnutzen = 3-Jahres-Effekt / 3 + Jahres-Ersparnis; ROI gegen Investition. */
export function computeRoi(selected: Set<string>, scenario: Scenario, investment: number): RoiResult {
  let threeYear = 0
  let savings = 0
  let count = 0
  selected.forEach((id) => {
    const m = ALL_PRODUCTS[id]
    if (!m) return
    threeYear += m[scenario] || 0
    savings += m.ers || 0
    count++
  })
  const annual = threeYear / 3 + savings
  // Ohne Auswahl steht der Rechner auf 0 (statt -100 % gegen die Investition).
  const roi = count > 0 && investment > 0 ? ((annual - investment) / investment) * 100 : 0
  return { annual, threeYear, savings, roi, count }
}
