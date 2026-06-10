import type { LegalSectionContent } from "@/lib/legal-types"

export const datenschutzMeta = {
  title: "Datenschutz – AgenticIT",
  description: "Datenschutzerklärung der Agentic IT GmbH (AgenticIT) gemäss Schweizer DSG und DSGVO – Lead-Formulare und Website.",
}

export const datenschutzSections: readonly LegalSectionContent[] = [
  {
    title: "Verantwortliche Stelle",
    paragraphs: [
      "Verantwortlich für die Datenbearbeitung im Zusammenhang mit dieser Website ist:",
      "Agentic IT GmbH",
      "3072 Ostermundigen",
      "Schweiz",
    ],
    links: [{ label: "hello@agenticit.ch", href: "mailto:hello@agenticit.ch" }],
  },
  {
    title: "Technische Umsetzung der Website",
    paragraphs: [
      "Die technische Umsetzung und Betreuung dieser Website erfolgt durch expertico.com. Dabei können technische Zugriffsdaten (z. B. IP-Adresse, Zeitstempel, Browsertyp) in Server-Logfiles anfallen, soweit dies für Betrieb, Sicherheit und Stabilität der Website erforderlich ist.",
    ],
    links: [{ label: "expertico.com", href: "https://expertico.com" }],
  },
  {
    title: "Welche Daten wir bearbeiten",
    list: [
      "Kontakt- und Lead-Daten, die Sie uns über Formulare auf dieser Website freiwillig mitteilen (z. B. Name, E-Mail, Unternehmen, Telefon, Nachricht).",
      "Technische Nutzungsdaten beim Besuch der Website (z. B. IP-Adresse, Datum und Uhrzeit des Zugriffs, aufgerufene Seiten, Geräte- und Browserinformationen).",
      "Performance- und Reichweitenmessung über Vercel Speed Insights in anonymisierter bzw. aggregierter Form, soweit Sie dem nicht widersprechen.",
    ],
  },
  {
    title: "Zwecke der Datenbearbeitung",
    list: [
      "Bereitstellung, Betrieb und Sicherheit der Website.",
      "Beantwortung von Anfragen und Bearbeitung von Kontakt- bzw. Lead-Formularen.",
      "Verbesserung von Performance und Nutzererlebnis der Website.",
      "Erfüllung gesetzlicher Pflichten.",
    ],
  },
  {
    title: "Rechtsgrundlagen",
    paragraphs: [
      "Die Bearbeitung erfolgt gestützt auf das Schweizer Datenschutzgesetz (DSG) sowie – soweit anwendbar – auf die Datenschutz-Grundverordnung (DSGVO), insbesondere auf Grundlage Ihrer Einwilligung, zur Vertragserfüllung bzw. vorvertraglicher Massnahmen, zur Wahrung berechtigter Interessen oder zur Erfüllung rechtlicher Pflichten.",
    ],
  },
  {
    title: "Weitergabe von Daten",
    paragraphs: [
      "Personenbezogene Daten geben wir nur weiter, wenn dies zur Erfüllung der genannten Zwecke erforderlich ist, Sie eingewilligt haben oder wir gesetzlich dazu verpflichtet sind. Auftragsbearbeiter (z. B. Hosting auf Vercel) werden vertraglich zur Einhaltung des Datenschutzes verpflichtet.",
    ],
  },
  {
    title: "Speicherdauer",
    paragraphs: [
      "Wir speichern personenbezogene Daten nur so lange, wie dies für die jeweiligen Zwecke erforderlich ist oder gesetzliche Aufbewahrungspflichten bestehen. Anschliessend werden die Daten gelöscht oder anonymisiert.",
    ],
  },
  {
    title: "Cookies und ähnliche Technologien",
    paragraphs: [
      "Diese Website verwendet technisch notwendige Cookies bzw. vergleichbare Technologien, soweit dies für den Betrieb erforderlich ist. Sofern zusätzliche Analyse- oder Marketing-Cookies eingesetzt werden, informieren wir Sie gesondert und holen – soweit erforderlich – Ihre Einwilligung ein.",
    ],
  },
  {
    title: "Ihre Rechte",
    paragraphs: [
      "Sie haben im Rahmen des anwendbaren Datenschutzrechts insbesondere das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Bearbeitung, Datenherausgabe sowie Widerspruch gegen bestimmte Bearbeitungen. Zudem können Sie eine erteilte Einwilligung jederzeit widerrufen.",
      "Für Anfragen zu Ihren Datenschutzrechten wenden Sie sich bitte an hello@agenticit.ch.",
    ],
  },
  {
    title: "Datensicherheit",
    paragraphs: [
      "Wir treffen angemessene technische und organisatorische Massnahmen, um Ihre Daten vor unbefugtem Zugriff, Verlust oder Missbrauch zu schützen. Eine vollständige Sicherheit im Internet kann jedoch nicht garantiert werden.",
    ],
  },
  {
    title: "Änderungen",
    paragraphs: [
      "Wir können diese Datenschutzerklärung bei Bedarf anpassen. Es gilt jeweils die auf dieser Seite veröffentlichte aktuelle Fassung.",
      "Stand: Mai 2026",
    ],
  },
]
