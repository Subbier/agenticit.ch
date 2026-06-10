// Branchenspezifische Inhalte für die interaktive Customer Journey und das
// Flywheel auf der RevOps-Seite. Die Branchen-Werte stammen aus lead-pricing.ts.

export type JourneySnippet = {
  /** Wie wir die richtigen Interessenten anziehen */
  attract: string
  /** Was beim Abschluss passiert */
  close: string
  /** Cross-/Up-Selling nach dem Abschluss */
  expand: string
  /** Aus Kunden werden Botschafter */
  advocate: string
}

const DEFAULT_SNIPPET: JourneySnippet = {
  attract: "Wir machen Sie dort sichtbar, wo Ihre Wunschkunden gerade suchen.",
  close: "Die Anfrage ist qualifiziert und anrufbereit – Sie führen das Gespräch und schliessen ab.",
  expand: "Passende Folgeangebote werden im richtigen Moment automatisch angestossen.",
  advocate: "Zufriedene Kunden empfehlen Sie weiter – das Schwungrad dreht von allein weiter.",
}

export const journeyByIndustry: Record<string, JourneySnippet> = {
  versicherung: {
    attract: "Gezielte Kampagnen zu Krankenkasse, Zusatz- und Sachversicherung.",
    close: "Die passende Police ist offeriert, der Abschluss anrufbereit vorbereitet.",
    expand: "Automatische Hinweise auf Zusatzdeckungen und jährliche Vorsorge-Checks.",
    advocate: "Zufriedene Versicherte empfehlen Sie weiter – mit kleinem Anreiz.",
  },
  solar: {
    attract: "Anfragen von Eigenheimbesitzern mit echtem Interesse an Photovoltaik.",
    close: "Die Offerte für die Anlage steht, der Beratungstermin ist sauber vorbereitet.",
    expand: "Folgeangebote für Speicher, Wallbox und Wartungsvertrag laufen automatisch.",
    advocate: "Referenz-Dächer und Empfehlungen aus der Nachbarschaft bringen neue Anfragen.",
  },
  waermepumpe: {
    attract: "Hausbesitzer, die ihre alte Heizung ersetzen wollen.",
    close: "Die Offerte für die Wärmepumpe steht, der Vor-Ort-Termin ist vorbereitet.",
    expand: "Service-Abo, Förderberatung und die Kombination mit Solar folgen automatisch.",
    advocate: "Empfehlungen zufriedener Hausbesitzer öffnen die nächste Tür.",
  },
  finanzberatung: {
    attract: "Anfragen zu Hypothek, Finanzierung und persönlicher Beratung.",
    close: "Der Beratungstermin ist mit allen Unterlagen vorbereitet und bestätigt.",
    expand: "Anschlussthemen wie Vorsorge, Versicherung und Refinanzierung werden angestossen.",
    advocate: "Empfehlungen im Familien- und Bekanntenkreis bringen warme Kontakte.",
  },
  vorsorge: {
    attract: "Interessenten für Säule 3a, Pensionsplanung und Vorsorge.",
    close: "Der Vorsorge-Termin ist sauber vorbereitet und anrufbereit übergeben.",
    expand: "Jährliche Optimierung, Steuerthemen und Aufstockungen werden automatisch erinnert.",
    advocate: "Zufriedene Kundinnen und Kunden empfehlen Sie aktiv weiter.",
  },
  immobilien: {
    attract: "Verkäufer und Käufer in Ihrer Region – im richtigen Moment.",
    close: "Besichtigung und Mandat sind vorbereitet, der Termin ist anrufbereit.",
    expand: "Folgegeschäft wie Finanzierung, Versicherung und nächste Objekte wird angestossen.",
    advocate: "Empfehlungen nach erfolgreichem Verkauf füllen Ihre Pipeline.",
  },
  treuhand: {
    attract: "KMU und Private mit konkretem Treuhand- und Steuerbedarf.",
    close: "Das Erstgespräch ist mit allen Eckdaten vorbereitet und terminiert.",
    expand: "Jahresabschluss, Lohnbuchhaltung und Beratung werden zum laufenden Mandat.",
    advocate: "Empfehlungen in der Unternehmer-Community bringen neue Mandate.",
  },
  medizin: {
    attract: "Patientinnen und Patienten für Ihre Behandlungen und Angebote.",
    close: "Der Termin ist inklusive Anamnese vorbereitet und bestätigt.",
    expand: "Folgebehandlungen, Pakete und Nachsorge werden automatisch angeboten.",
    advocate: "Bewertungen und Empfehlungen zufriedener Patienten stärken Ihren Ruf.",
  },
  umzug: {
    attract: "Anfragen für Umzug, Reinigung und Premium-Zusatzservices.",
    close: "Die Offerte steht und der Termin ist mit allen Eckdaten erfasst.",
    expand: "Zusatzleistungen wie Reinigung, Lager und Entsorgung werden mitverkauft.",
    advocate: "Empfehlungen nach einem reibungslosen Umzug bringen Folgeaufträge.",
  },
  sonstige: DEFAULT_SNIPPET,
}

export function getJourney(value: string): JourneySnippet {
  return journeyByIndustry[value] ?? DEFAULT_SNIPPET
}
