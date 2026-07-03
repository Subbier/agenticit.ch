export type OrgNode = {
  id: number
  role: string
  tool: string
  dockTitle: string
  dockText: string
}

export type OrgKpi = {
  id: string
  label: string
  direction: "up" | "down"
  from: number
  to: number
  delta: string
}

export const ORG_NODES: OrgNode[] = [
  {
    id: 0,
    role: "🏢 Geschäftsführung",
    tool: "Reporting",
    dockTitle: "Echtzeit-Insights",
    dockText: "Zahlen aus allen Systemen, automatisch verdichtet.",
  },
  {
    id: 1,
    role: "🎯 Vertrieb",
    tool: "CRM",
    dockTitle: "Lead-Scoring",
    dockText: "Qualifiziert & priorisiert Leads automatisch.",
  },
  {
    id: 2,
    role: "💬 Kundendienst",
    tool: "Telefonie / E-Mail",
    dockTitle: "24/7 Antworten",
    dockText: "Beantwortet Anfragen sofort, rund um die Uhr.",
  },
  {
    id: 3,
    role: "🧾 Buchhaltung",
    tool: "Finanzsoftware",
    dockTitle: "Beleg-Abgleich",
    dockText: "Erfasst & verbucht Belege ohne Doppelpflege.",
  },
]

export const ORG_KPIS: OrgKpi[] = [
  {
    id: "quality",
    label: "Kundendienst-Qualität",
    direction: "up",
    from: 45,
    to: 88,
    delta: "vorher 45 % → nachher 88 %",
  },
  {
    id: "routine",
    label: "Lästige Routine\u00ADaufgaben",
    direction: "down",
    from: 80,
    to: 22,
    delta: "vorher 80 % → nachher 22 %",
  },
  {
    id: "satisfaction",
    label: "Mitarbeiter\u00ADzufriedenheit",
    direction: "up",
    from: 52,
    to: 86,
    delta: "vorher 52 % → nachher 86 %",
  },
]
