export const benchmarkKpis = [
  { value: "350+", label: "Mögliche MRR (CHF) pro User im Bereich IT-Basis" },
  { value: "5k+", label: "Mögliche MRR (CHF) für ganzheitliches RevOps" },
  { value: "90%", label: "Höhere Compliance-Rate durch Micro-Learning" },
] as const

export const waasBenchmark = [
  { name: "Digital Workplace", price: 100, range: "CHF 80 – 120", color: "hsl(142 70% 55%)" },
  { name: "Managed CRM & Backoffice", price: 185, range: "CHF 150 – 220", color: "hsl(210 40% 70%)" },
  { name: "Premium WaaS", price: 365, range: "CHF 280 – 450", color: "hsl(160 60% 45%)" },
] as const

export const marketingBenchmark = [
  { name: "Einzelkampagnen", price: 1200 },
  { name: "Lead-Gen Suite", price: 2500 },
  { name: "Omnichannel Nurturing", price: 3800 },
  { name: "Full RevOps", price: 6500 },
] as const

export const edtechPie = [
  { name: "Präsenzseminare", value: 25 },
  { name: "Hybride Modelle", value: 35 },
  { name: "SaaS & Micro-Learning", value: 40 },
] as const

export const edtechRetention = [
  { day: "Tag 1", seminar: 100, micro: 100 },
  { day: "Tag 7", seminar: 60, micro: 95 },
  { day: "Tag 14", seminar: 40, micro: 92 },
  { day: "Tag 30", seminar: 25, micro: 88 },
  { day: "Tag 60", seminar: 15, micro: 85 },
] as const

export const roiMatrix = [
  { segment: "Marketing", label: "Lead-Gen", cost: 2500, value: 70, color: "hsl(270 60% 65%)" },
  { segment: "Marketing", label: "Omnichannel", cost: 3800, value: 85, color: "hsl(270 60% 65%)" },
  { segment: "Marketing", label: "RevOps", cost: 6500, value: 95, color: "hsl(270 60% 65%)" },
  { segment: "Workplace", label: "Basis IT", cost: 1000, value: 20, color: "hsl(210 40% 70%)" },
  { segment: "Workplace", label: "Managed CRM", cost: 3000, value: 45, color: "hsl(210 40% 70%)" },
  { segment: "Workplace", label: "Premium WaaS", cost: 5000, value: 60, color: "hsl(210 40% 70%)" },
  { segment: "EdTech", label: "VBV App", cost: 800, value: 30, color: "hsl(142 70% 55%)" },
  { segment: "EdTech", label: "White-Label Academy", cost: 1500, value: 55, color: "hsl(142 70% 55%)" },
] as const

export type PainPointId =
  | "it"
  | "marketing"
  | "compliance"
  | "all"

export const painPointOptions: { id: PainPointId; label: string }[] = [
  { id: "it", label: "Veraltete IT & Security-Risiken" },
  { id: "marketing", label: "Zu wenig Neukunden / Schwaches Marketing" },
  { id: "compliance", label: "Fehlende Cicero/VBV Compliance" },
  { id: "all", label: "Alles digitalisieren (All-in-One)" },
]

export type ItTierId = "basis" | "crm" | "premium"
export type MarketingTierId = "campaign" | "leadgen" | "nurturing" | "revops"
export type EdtechTierId = "vbv" | "academy"

export const itTiers: { id: ItTierId; label: string; pricePerUser: number; description: string }[] = [
  { id: "basis", label: "Digital Workplace", pricePerUser: 100, description: "M365, Cloud, Basis-Support" },
  { id: "crm", label: "Managed CRM", pricePerUser: 185, description: "CRM, Provisionsmanagement, Premium-Support" },
  { id: "premium", label: "Premium WaaS", pricePerUser: 365, description: "Hardware-Miete, volle Suite, 24/7" },
]

export const marketingTiers: { id: MarketingTierId; label: string; retainer: number; description: string }[] = [
  { id: "campaign", label: "Kampagnen", retainer: 1200, description: "Einzelne Marketing-Kampagnen" },
  { id: "leadgen", label: "Lead-Gen Suite", retainer: 2500, description: "Automatisierte Akquise" },
  { id: "nurturing", label: "Omnichannel Nurturing", retainer: 3800, description: "Content & Follow-up" },
  { id: "revops", label: "Full RevOps", retainer: 6500, description: "Ganzheitliches Revenue Operations" },
]

export const edtechTiers: { id: EdtechTierId; label: string; perUser?: number; flat?: number; description: string }[] = [
  { id: "vbv", label: "VBV Compliance App", perUser: 55, description: "Micro-Learning pro Berater" },
  { id: "academy", label: "White-Label Academy", flat: 1200, description: "Corporate Academy Flatrate pro Büro" },
]
