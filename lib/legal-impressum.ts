import type { LegalSectionContent } from "@/lib/legal-types"

export const impressumMeta = {
  title: "Impressum – AgenticIT Schweiz",
  description: "Impressum und Kontakt der Agentic IT GmbH (AgenticIT) – KI Agenten und Lead Automation aus der Schweiz.",
}

export const impressumSections: readonly LegalSectionContent[] = [
  {
    title: "Anbieter dieser Website",
    paragraphs: ["Agentic IT GmbH", "Schweiz"],
  },
  {
    title: "Kontakt",
    links: [{ label: "hello@agenticit.ch", href: "mailto:hello@agenticit.ch" }],
  },
  {
    title: "Verantwortlich für den Inhalt",
    paragraphs: ["Sabir Rastoder", "CTO"],
    links: [
      { label: "sr@agenticit.ch", href: "mailto:sr@agenticit.ch" },
      { label: "+41 76 202 01 36", href: "tel:+41762020136" },
    ],
  },
  {
    title: "Verantwortlich für die Website",
    paragraphs: ["Zuständig für die technische Umsetzung und Betreuung dieser Website:"],
    links: [{ label: "expertico.com", href: "https://expertico.com" }],
  },
  {
    title: "Haftungsausschluss",
    paragraphs: [
      "Die Inhalte dieser Website wurden mit grösster Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte kann jedoch keine Gewähr übernommen werden.",
      "Haftungsansprüche gegen die Agentic IT GmbH wegen Schäden materieller oder ideeller Art, die durch die Nutzung oder Nichtnutzung der bereitgestellten Informationen bzw. durch die Nutzung fehlerhafter und unvollständiger Informationen verursacht wurden, sind ausgeschlossen, soweit seitens der Agentic IT GmbH kein nachweislich vorsätzliches oder grob fahrlässiges Verschulden vorliegt.",
    ],
  },
  {
    title: "Urheberrecht",
    paragraphs: [
      "Alle Inhalte dieser Website (Texte, Grafiken, Logos, Bilder, Programmcode) sind urheberrechtlich geschützt. Jede Verwendung ausserhalb der Schranken des Urheberrechts bedarf der schriftlichen Zustimmung der Agentic IT GmbH.",
    ],
  },
]
