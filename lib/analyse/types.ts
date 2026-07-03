// Gemeinsame Typen für das KI-Analyse-Backend.

export type Contact = {
  anrede?: string // "Herr" | "Frau"
  vorname: string
  nachname: string
  firma: string
  url: string
  email: string
  phone: string
  plz: string
  stadt: string
}

export type Answers = {
  // Branche (für branchengenaue Use-Case-Auswahl)
  branche: string
  // Bereich 1 – Webauftritt & Online-Marketing
  web_zufriedenheit: string
  sichtbarkeit: string
  marketing: string
  web_anfragen: string
  routine_stunden: string
  // Bereich 2 – branchenübliche Automatisierungen: was schon / noch nicht
  automation_done: string[]
  automation_todo: string[]
  // Bereich 3 – branchenübliche RevOps: was schon / noch nicht
  revops_done: string[]
  revops_todo: string[]
}

export type UseCasePick = {
  title: string
  benefit: string
  trigger: string
  ablauf: string
  bereich: string
  aufwand: string
  branchSpecific: boolean
}

export type Lighthouse = {
  found: boolean
  performance: number | null
  seo: number | null
  lcp: number | null
  note?: string
}

export type SearchDemand = {
  keywords: { keyword: string; volume: number }[]
  total: number
  potentialVisitors: number
  potentialLeads: number
}

export type AnalysePayload = {
  contact: Contact
  answers: Answers
  consent: boolean
  whatsapp_opt_in?: boolean // Besucher erlaubt WhatsApp-Kontakt → WhatsApp-first-Flow
  company_website?: string // Honeypot
}

export type SemrushResult = {
  found: boolean
  rank?: number
  organicKeywords?: number
  organicTraffic?: number
  paidKeywords?: number
  topKeywords: { keyword: string; position: number; volume: number; cpc: number }[]
  note?: string
}

export type Analysis = {
  contact: Contact
  answers: Answers
  generatedAt: string
  visibility: { google: number; local: number; bing: number; ki: number }
  semrush: SemrushResult
  lighthouse: Lighthouse
  searchDemand: SearchDemand
  freed: { weeklyHours: number; yearlyHours: number; fte: number }
  roi: { timeValue: number; dealsValue: number; retentionValue: number; total: number; paybackMonths: number }
  tasks: { label: string; hours: number }[]
  recommendations: { title: string; effect: string; area: string }[]
  roadmap: { period: string; title: string; desc: string }[]
  priorities: { want: string; answer: string }[]
  branchLabel: string
  automation: UseCasePick[]
  revops: UseCasePick[]
}
