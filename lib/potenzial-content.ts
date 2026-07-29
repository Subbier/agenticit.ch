// Copy für die Bait-Stufe der Value Ladder (Potenzialrechner-Landingpage).
// Quelle: Webseite/Master/AgenticIT-Conversion-Funnel.md (Abschnitte 2–5).
// Texte sind 1:1 aus dem Funnel-Dokument übernommen (Pre-Frame-Regel: was die
// Quelle verspricht, löst die Landeseite sofort ein).

export const POTENZIAL_HERO = {
  eyebrow: "Potenzialrechner · Gratis",
  h1: "Jeden Monat suchen Tausende Schweizer nach Ihrer Dienstleistung.",
  h1Accent: "Die meisten finden Ihre Konkurrenz – nicht Sie.",
  lead: "Das Problem ist nie die Nachfrage. Es fehlt der Weg, der diese Menschen im richtigen Moment zu Ihnen führt.",
  offer: "Geben Sie Ihre Branche ein und sehen Sie in fünf Sekunden, wie viel Potenzial auf Sie wartet.",
} as const

export const POTENZIAL_CALC = {
  eyebrow: "Schritt 1 von 2",
  title: "Sehen Sie die Nachfrage in Ihrer Branche – bevor es Ihre Konkurrenz tut.",
  subline:
    "Wählen Sie Ihre Branche. Sie sehen sofort, wie viele Menschen in der Schweiz jeden Monat danach suchen – und was eine Kundenanfrage in Ihrem Markt wert ist.",
  selectLabel: "Ihre Branche",
  selectPlaceholder: "Branche wählen",
  searchesLabel: "Suchanfragen pro Monat",
  priceLabel: "Richtwert pro Kundenanfrage",
  keywordsLabel: "Beispiel-Suchbegriffe",
  sourceNote:
    "Datenbasis: Semrush, Deutschschweiz (DB ch), Stand Q2 2026. Summe der wichtigsten Suchbegriffe je Branche, gerundet. Quartalsweise aktualisiert.",
  sonstigeNote:
    "Für Ihre Branche ermitteln wir die genaue Nachfrage im Gespräch – die Datenbasis dafür haben wir.",
} as const

export const POTENZIAL_BRIDGE = {
  eyebrow: "Die Nachfrage ist da",
  headline: "Landet sie bei Ihnen oder bei jemand anderem?",
  body:
    "Das ist keine Schätzung, das sind echte Menschen mit konkretem Interesse – genau jetzt, in der Schweiz. In einem kurzen, unverbindlichen Rückruf zeigen wir Ihnen, wie Ihre Kundenreise konkret aussehen würde – und wie das Schnupper-Abo für Ihre Branche startet (3 Monate, keine Startkosten).",
  bullets: [
    "Warme, anrufbereite Anfragen statt Kaltakquise – Sie führen nur das Gespräch.",
    "Marketing, Vertrieb und Betreuung als ein System – kein Tool-Wildwuchs.",
    "Ein Experte steuert KI-Agenten – schneller und günstiger als ein 15-köpfiges Team.",
    "3 Monate testen, keine Startkosten – Sie sehen das Ergebnis, bevor Sie investieren.",
  ],
  cta: "Unverbindlichen Rückruf anfragen",
} as const

// Stufe 3 – Qualifizierung. So wenig Reibung wie möglich, aber genug, um
// terminreif zu filtern (Funnel-Dokument Abschnitt 4).
export const POTENZIAL_FORM = {
  eyebrow: "Schritt 2 von 2",
  title: "Unverbindlichen Rückruf anfragen",
  microcopy:
    "Hinterlassen Sie uns kurz Ihre Angaben – wir melden uns mit einem unverbindlichen Rückruf. Kein Verkaufsdruck, keine Vorbereitung nötig.",
  submitLabel: "Rückruf anfragen",
  submitLoadingLabel: "Wird gesendet …",
  // Angst-Killer direkt unter dem Button
  fearKiller:
    "Ein kurzer Rückruf, ein konkreter Plan für Ihre Branche – Sie entscheiden danach in Ruhe.",
  consentLabel:
    "Ich bin einverstanden, dass AgenticIT meine Angaben zur Bearbeitung der Anfrage nutzt.",
  errorLabel: "Senden fehlgeschlagen. Bitte versuchen Sie es erneut.",
} as const

// Dropdown "Ihr Ziel" – misst Bedarf & Reife, steuert das Telefongespräch.
export const GOAL_OPTIONS = [
  "Mehr Anfragen",
  "Planbarer Umsatz",
  "Zeit gewinnen",
  "Weiss noch nicht",
] as const

export type GoalOption = (typeof GOAL_OPTIONS)[number]

// Stufe 4 – Danke-/Bestätigungsseite (Funnel-Dokument Abschnitt 5).
export const CALLBACK_PHONE_TEL = "+41762020136"
export const CALLBACK_PHONE_LABEL = "+41 76 202 01 36"

export const DANKE_CONTENT = {
  eyebrow: "Anfrage eingegangen",
  h1: "Danke – Ihre Anfrage ist da.",
  lead: "Wir melden uns innerhalb eines Werktags mit einem kurzen, unverbindlichen Rückruf.",
  stepsTitle: "Was als Nächstes passiert",
  steps: [
    "Wir schauen uns die Nachfrage in Ihrer Branche konkret an.",
    "Im Gespräch (ca. 15 Min.) zeigen wir Ihnen Ihre Kundenreise – Schritt für Schritt.",
    "Wenn es passt, starten Sie mit dem Schnupper-Abo. Wenn nicht, haben Sie trotzdem einen klaren Plan.",
  ],
  phoneNote:
    "Damit nichts verloren geht: Speichern Sie unsere Nummer – wir rufen von dieser Nummer an.",
  // Platzhalter-Satz im Sinne des Attractive Character (Funnel-Dokument Abschnitt 0).
  // TODO Sabir: durch eigenen Wortlaut ersetzen und freigeben, bevor die Seite live geht.
  trustStatement:
    "Wir liefern kein weiteres Dashboard, sondern Anfragen – ein Experte steuert die KI-Agenten, Sie führen das Gespräch.",
  trustAuthor: "Sabir Rastoder, CTO AgenticIT",
  referenceLabel: "Nachprüfbare Referenz",
  referenceText: "advok.app – Schweizer Rechtsplattform, von uns gebaut und betrieben.",
} as const
