import type { PotentialKind } from "./potential-report"
export const leadEntries: readonly {
  id: PotentialKind | "webdesign" | "crm"
  kind: PotentialKind
  title: string
  benefit: string
  result: string
  action: string
  href: string
}[] = [
  {
    id: "acquisition",
    kind: "acquisition",
    title: "Was wären mehr Wunschkunden wert?",
    benefit: "Rechnen Sie mit Ihren Anfragen und Ihrem Auftragswert.",
    result: "Ihre Umsatzchance als PDF",
    action: "Meine Umsatzchance berechnen",
    href: "/marketing-setup-check",
  },
  {
    id: "conversion",
    kind: "conversion",
    title: "Mehr Aufträge aus denselben Anfragen?",
    benefit: "Entdecken Sie den Wert zusätzlicher Abschlüsse.",
    result: "Ihr Abschluss-Potenzial als PDF",
    action: "Mein Potenzial berechnen",
    href: "/anfragen-check",
  },
  {
    id: "admin",
    kind: "admin",
    title: "Wie viel Zeit frisst Ihre Routine?",
    benefit: "Machen Sie freie Stunden und ihren Wert sichtbar.",
    result: "Ihr Zeitgewinn als PDF",
    action: "Meinen Zeitgewinn berechnen",
    href: "/automatisierungs-check",
  },
  {
    id: "onboarding",
    kind: "onboarding",
    title: "Mehr Kunden. Weniger Startaufwand?",
    benefit: "Berechnen Sie, was ein einfacherer Kundenstart spart.",
    result: "Ihre freie Kapazität als PDF",
    action: "Meine Kapazität berechnen",
    href: "/kundenreise-check?thema=onboarding",
  },
  {
    id: "phone",
    kind: "phone",
    title: "Was steckt in Ihren Anrufen?",
    benefit: "Sehen Sie, was mehr Aufträge aus Gesprächen bedeuten.",
    result: "Ihr Telefon-Potenzial als PDF",
    action: "Mein Telefon-Potenzial berechnen",
    href: "/kundenreise-check?thema=phone",
  },
  {
    id: "retention",
    kind: "retention",
    title: "Was wäre es wert, wenn mehr Kunden bleiben?",
    benefit: "Vergleichen Sie heutige und mögliche Verlängerungen.",
    result: "Ihre Umsatzchance als PDF",
    action: "Meine Kundenbindung berechnen",
    href: "/kundenreise-check?thema=retention",
  },
  {
    id: "partnership",
    kind: "partnership",
    title: "Weniger abstimmen. Mehr Zeit gewinnen?",
    benefit: "Berechnen Sie den Wert einfacherer Zusammenarbeit.",
    result: "Ihr Kapazitätsgewinn als PDF",
    action: "Meinen Zeitgewinn berechnen",
    href: "/kundenreise-check?thema=partnership",
  },
  {
    id: "webdesign",
    kind: "acquisition",
    title: "Welche Website passt zu Ihnen?",
    benefit: "Wählen Sie Website-Art und Stil mit Bildkarten.",
    result: "Ihr Website-Konzept als PDF",
    action: "Meine Website planen",
    href: "/loesungen/webdesign#potenzial-rechner",
  },
  {
    id: "crm",
    kind: "admin",
    title: "Wie viel Zeit steckt in Ihrer CRM-Handarbeit?",
    benefit: "Weniger doppelt erfassen. Mehr Zeit für Kunden.",
    result: "Ihr CRM-Zeitgewinn als PDF",
    action: "Mein CRM-Potenzial berechnen",
    href: "/crm-ablauf-check",
  },
]
