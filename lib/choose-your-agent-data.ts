export type AgentStep = { h: string; s: string }

export type AgentDemo = {
  id: string
  icon: string
  name: string
  color: string
  trigger: string
  say: string
  steps: AgentStep[]
  stats: [string, string][]
}

export const AGENT_DEMOS: AgentDemo[] = [
  {
    id: "empfang",
    icon: "📞",
    name: "Empfangs-Agent",
    color: "#16C7C0",
    trigger: "Das Telefon klingelt – unbekannte Nummer, Dienstagabend 21:47 Uhr.",
    say: "„Ich bin der <em>KI-Assistent von AgenticIT</em>. Wie kann ich Ihnen helfen?“",
    steps: [
      { h: "Anruf angenommen & gemeldet", s: "Begrüsst den Anrufer freundlich und transparent als KI." },
      { h: "Anliegen erfasst", s: "Versteht: Interessent möchte einen Beratungstermin." },
      { h: "Verfügbarkeit geprüft", s: "Liest den Team-Kalender in Echtzeit aus." },
      { h: "Termin gebucht", s: "Bucht Di, 14:00 Uhr – und bestätigt mündlich." },
      { h: "CRM aktualisiert", s: "Legt Kontakt + Termin an, hinterlegt Gesprächsnotiz." },
      { h: "Bestätigung versendet", s: "Schickt WhatsApp + Kalendereinladung automatisch." },
    ],
    stats: [
      ["38 Sek.", "Bearbeitung"],
      ["0", "Klicks von dir"],
      ["21:47", "mitten in der Nacht"],
    ],
  },
  {
    id: "vertrieb",
    icon: "🎯",
    name: "Vertriebs-Agent",
    color: "#2DA8FF",
    trigger: "Neuer Lead trifft über das Website-Formular ein.",
    say: "„Ich bin der <em>KI-Assistent von AgenticIT</em> – ich habe Ihre Anfrage gesehen und melde mich direkt.“",
    steps: [
      { h: "Lead bewertet", s: "KI-Score 87/100 – hohe Kaufbereitschaft erkannt." },
      { h: "Daten angereichert", s: "Firma, Rolle und Signale aus 50+ Quellen ergänzt." },
      { h: "Erstkontakt personalisiert", s: "Passende Ansprache je nach Segment formuliert." },
      { h: "Kontakt aufgenommen", s: "Anruf + WhatsApp parallel – auf dem Lieblingskanal." },
      { h: "Bedarf qualifiziert", s: "Budget, Zeitrahmen und Entscheider sauber geklärt." },
      { h: "Beratungstermin gebucht", s: "Übergabe an dein Team – mit komplettem Briefing." },
    ],
    stats: [
      ["1 Min.", "Reaktionszeit"],
      ["87", "Lead-Score"],
      ["100%", "selbst erledigt"],
    ],
  },
  {
    id: "support",
    icon: "💬",
    name: "Support-Agent",
    color: "#7C5CFF",
    trigger: "Kunde schreibt: „Ihre letzte Rechnung stimmt nicht.“",
    say: "„Ich bin der <em>KI-Assistent von AgenticIT</em>. Ich schaue mir Ihre Rechnung sofort an.“",
    steps: [
      { h: "Anliegen erkannt", s: "Klassifiziert die Nachricht: Rechnungsdifferenz." },
      { h: "Rechnung gezogen", s: "Holt den passenden Beleg direkt aus dem System." },
      { h: "Differenz geprüft", s: "Findet die doppelt berechnete Position automatisch." },
      { h: "Korrektur erstellt", s: "Bereitet Gutschrift-Entwurf regelkonform vor." },
      { h: "Kunde informiert", s: "Antwortet klar, freundlich und nachvollziehbar." },
      { h: "Nur Ausnahme eskaliert", s: "Übergibt an Mensch – aber nur, wenn nötig." },
    ],
    stats: [
      ["24/7", "erreichbar"],
      ["12 Sek.", "bis zur Antwort"],
      ["1", "Klick zur Freigabe"],
    ],
  },
  {
    id: "termin",
    icon: "📅",
    name: "Termin-Agent",
    color: "#F5A623",
    trigger: "Termin morgen 10:00 – Kunde hat noch nicht bestätigt.",
    say: "„Ich bin der <em>KI-Assistent von AgenticIT</em> und erinnere Sie an Ihren Termin morgen um 10:00.“",
    steps: [
      { h: "Erinnerung gesendet", s: "Freundliche Nachricht zum richtigen Zeitpunkt." },
      { h: "Antwort verarbeitet", s: "Kunde bittet um Verschiebung – kein Problem." },
      { h: "Alternativen vorgeschlagen", s: "Bietet automatisch 3 freie Slots an." },
      { h: "Neuer Termin gebucht", s: "Bucht Do, 16:30 – sofort bestätigt." },
      { h: "Kalender & CRM aktualisiert", s: "Alles synchron, kein doppelter Eintrag." },
      { h: "Team benachrichtigt", s: "Verhindert No-Show – ganz ohne dein Zutun." },
    ],
    stats: [
      ["−42%", "No-Shows"],
      ["0", "manuelle Mails"],
      ["sofort", "umgebucht"],
    ],
  },
]
