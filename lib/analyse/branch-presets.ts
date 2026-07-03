// AUTO-GENERIERT aus AgenticIT_Master-Tabelle.xlsx – branchenweise Top-Maßnahmen.
// Bei Tabellen-Update neu generieren.

export type PresetItem = { title: string; benefit: string; trigger: string; ablauf: string; bereich: string; aufwand: string; branchSpecific: boolean }
export type BranchPreset = { automation: PresetItem[]; revops: PresetItem[] }

export const BRANCH_PRESETS: Record<string, BranchPreset> = {
  "treuhand": {
    "automation": [
      {
        "title": "Termin-Erinnerungen (E-Mail/SMS)",
        "benefit": "-30-50% No-Shows",
        "trigger": "Kalendereintrag 24h/1h vorher",
        "ablauf": "Automatische Reminder reduzieren No-Shows; Bestätigungs-Link inklusive.",
        "bereich": "Termine vereinbaren",
        "aufwand": "Niedrig",
        "branchSpecific": true
      },
      {
        "title": "Vertragsverlängerungs-Reminder",
        "benefit": "Höhere Renewal-Rate",
        "trigger": "Vertrag läuft in 60/30 Tagen aus",
        "ablauf": "Renewal-Sequenz mit Nutzen-Zusammenfassung + Verlängerungs-Termin.",
        "bereich": "Kundenbindung & Verlängerung",
        "aufwand": "Niedrig",
        "branchSpecific": true
      },
      {
        "title": "Geplante Check-in-Calls",
        "benefit": "Frühe Bindung, weniger Churn",
        "trigger": "X Tage nach Onboarding",
        "ablauf": "Automatischer Terminvorschlag für Zufriedenheits-Check-in.",
        "bereich": "Kundenbindung & Verlängerung",
        "aufwand": "Niedrig",
        "branchSpecific": true
      },
      {
        "title": "Dokumenten-Ablage & Benennung",
        "benefit": "~2 Std./Woche",
        "trigger": "Neues Dokument/Scan eingegangen",
        "ablauf": "Auto-Umbenennung nach Schema + Ablage im richtigen Ordner.",
        "bereich": "Büro & Verwaltung",
        "aufwand": "Niedrig",
        "branchSpecific": true
      },
      {
        "title": "Automatische Übersetzungen",
        "benefit": "~1-2 Std./Woche",
        "trigger": "Dokument/Mail in Fremdsprache",
        "ablauf": "KI übersetzt Texte und legt Version ab oder antwortet mehrsprachig.",
        "bereich": "Büro & Verwaltung",
        "aufwand": "Niedrig",
        "branchSpecific": true
      },
      {
        "title": "Termin-Bestätigung per Anruf/SMS",
        "benefit": "-30-50% No-Shows",
        "trigger": "Termin steht an",
        "ablauf": "Automatisierte Bestätigung und Erinnerung reduziert No-Shows.",
        "bereich": "Telefon & Empfang",
        "aufwand": "Niedrig",
        "branchSpecific": true
      }
    ],
    "revops": [
      {
        "title": "No-Show-Rebooking",
        "benefit": "Show-Rate · Weniger verlorene Termine · Prio 4.0",
        "trigger": "Termin verpasst",
        "ablauf": "Automatisch neuen Slot anbieten und Show-Rate sichern.",
        "bereich": "Termine vereinbaren",
        "aufwand": "Niedrig",
        "branchSpecific": true
      },
      {
        "title": "Renewal-Autopilot (90/60/30 Tage)",
        "benefit": "Renewal-Rate · +Verlängerungsquote · Prio 5.0",
        "trigger": "Vertragsablauf nähert sich",
        "ablauf": "Wert-Report + Verlängerungs-Termin proaktiv vor Ablauf.",
        "bereich": "Kundenbindung & Verlängerung",
        "aufwand": "Niedrig",
        "branchSpecific": true
      },
      {
        "title": "Trigger-Event-Monitoring (News/PR)",
        "benefit": "Antwortrate · Höhere Relevanz & Reply-Rate · Prio 2.0",
        "trigger": "Expansion, Leitungswechsel, Standorteröffnung",
        "ablauf": "Relevantes Event erkennen → Timing-perfekte, personalisierte Ansprache.",
        "bereich": "Kundengewinnung",
        "aufwand": "Mittel",
        "branchSpecific": true
      },
      {
        "title": "Speed-to-Lead < 60 Sekunden",
        "benefit": "Kontaktquote · Bis 9x höhere Kontaktrate · Prio 2.5",
        "trigger": "Inbound-Formular/Anfrage eingegangen",
        "ablauf": "Sofort SMS + Anruf-Routing + Terminslot, bevor der Lead abkühlt.",
        "bereich": "Anfragen bearbeiten",
        "aufwand": "Mittel",
        "branchSpecific": true
      },
      {
        "title": "Recovery abgebrochener Formulare",
        "benefit": "Formular-Conversion · Zurückgewonnene Anfragen · Prio 1.5",
        "trigger": "Formular begonnen, nicht abgeschickt",
        "ablauf": "Erfasste Daten nutzen → freundlicher Anstoß zur Fertigstellung.",
        "bereich": "Anfragen bearbeiten",
        "aufwand": "Mittel",
        "branchSpecific": true
      },
      {
        "title": "Usage-basierter Upsell-Trigger",
        "benefit": "Net Revenue Retention · +Umsatz je Kunde · Prio 2.5",
        "trigger": "Nutzungs-/Erfolgs-Schwelle erreicht",
        "ablauf": "Im richtigen Moment passendes Upgrade anbieten.",
        "bereich": "Kundenbindung & Verlängerung",
        "aufwand": "Mittel",
        "branchSpecific": true
      }
    ]
  },
  "beratung": {
    "automation": [
      {
        "title": "Termin-Erinnerungen (E-Mail/SMS)",
        "benefit": "-30-50% No-Shows",
        "trigger": "Kalendereintrag 24h/1h vorher",
        "ablauf": "Automatische Reminder reduzieren No-Shows; Bestätigungs-Link inklusive.",
        "bereich": "Termine vereinbaren",
        "aufwand": "Niedrig",
        "branchSpecific": true
      },
      {
        "title": "No-Show-Recovery",
        "benefit": "Wiedergewonnene Termine",
        "trigger": "Termin verpasst (kein Erscheinen)",
        "ablauf": "Automatische, freundliche Reschedule-Sequenz mit neuem Buchungslink.",
        "bereich": "Termine vereinbaren",
        "aufwand": "Niedrig",
        "branchSpecific": true
      },
      {
        "title": "Angebots-Follow-up-Sequenz",
        "benefit": "+15-25% Abschlussquote",
        "trigger": "Angebot/Offerte versendet",
        "ablauf": "Automatische Erinnerungen nach 2/5/10 Tagen mit Mehrwert statt Druck.",
        "bereich": "Kundenbetreuung",
        "aufwand": "Niedrig",
        "branchSpecific": true
      },
      {
        "title": "Geplante Check-in-Calls",
        "benefit": "Frühe Bindung, weniger Churn",
        "trigger": "X Tage nach Onboarding",
        "ablauf": "Automatischer Terminvorschlag für Zufriedenheits-Check-in.",
        "bereich": "Kundenbindung & Verlängerung",
        "aufwand": "Niedrig",
        "branchSpecific": true
      },
      {
        "title": "Erster-Erfolg-Gratulation",
        "benefit": "Aktivierung, Begeisterung",
        "trigger": "Kunde erreicht ersten Aha-Moment",
        "ablauf": "Sofort-Glückwunsch + nächster sinnvoller Schritt.",
        "bereich": "Kundenbetreuung",
        "aufwand": "Niedrig",
        "branchSpecific": true
      },
      {
        "title": "Case-Study-Einladung Top-Kunden",
        "benefit": "Social Proof, Referenzen",
        "trigger": "Erfolgskriterien erfüllt",
        "ablauf": "Automatische Einladung zur gemeinsamen Erfolgsgeschichte.",
        "bereich": "Empfehlungen & Bewertungen",
        "aufwand": "Niedrig",
        "branchSpecific": true
      }
    ],
    "revops": [
      {
        "title": "Lead-Magnet-Auslieferung + Sequenz",
        "benefit": "Lead→MQL · Mehr aktivierte Leads · Prio 4.0",
        "trigger": "Download/Opt-in abgeschlossen",
        "ablauf": "Asset sofort liefern → passende Nurture-Sequenz automatisch starten.",
        "bereich": "Anfragen bearbeiten",
        "aufwand": "Niedrig",
        "branchSpecific": true
      },
      {
        "title": "No-Show-Rebooking",
        "benefit": "Show-Rate · Weniger verlorene Termine · Prio 4.0",
        "trigger": "Termin verpasst",
        "ablauf": "Automatisch neuen Slot anbieten und Show-Rate sichern.",
        "bereich": "Termine vereinbaren",
        "aufwand": "Niedrig",
        "branchSpecific": true
      },
      {
        "title": "Show-Rate-Booster-Sequenz",
        "benefit": "Show-Rate · -30-50% No-Shows · Prio 4.0",
        "trigger": "Termin gebucht",
        "ablauf": "Multi-Touch-Reminder (Mail/SMS) + Vorbereitungs-Wert senden.",
        "bereich": "Termine vereinbaren",
        "aufwand": "Niedrig",
        "branchSpecific": true
      },
      {
        "title": "Newsletter→SQL-Pipeline",
        "benefit": "MQL→SQL · Mehr Sales aus Bestandsliste · Prio 3.0",
        "trigger": "Wiederkehrendes Klick-Engagement",
        "ablauf": "Engagement-Muster erkennen → Übergabe als Sales-Qualified-Lead.",
        "bereich": "Angebote & Abschluss",
        "aufwand": "Niedrig",
        "branchSpecific": true
      },
      {
        "title": "Deal-Follow-up-Autopilot",
        "benefit": "Abschlussquote · +15-25% Close-Rate · Prio 5.0",
        "trigger": "Angebot 48h ohne Reaktion",
        "ablauf": "Wertorientiertes Follow-up statt Druck, automatisch getaktet.",
        "bereich": "Angebote & Abschluss",
        "aufwand": "Niedrig",
        "branchSpecific": true
      },
      {
        "title": "Referral-Ask zum NPS-Peak",
        "benefit": "Empfehlungsrate · Mehr warme Leads · Prio 5.0",
        "trigger": "Hoher NPS / Promotor erkannt",
        "ablauf": "Genau im Zufriedenheits-Peak um Empfehlung bitten.",
        "bereich": "Empfehlungen & Bewertungen",
        "aufwand": "Niedrig",
        "branchSpecific": true
      }
    ]
  },
  "agentur": {
    "automation": [
      {
        "title": "Angebots-Follow-up-Sequenz",
        "benefit": "+15-25% Abschlussquote",
        "trigger": "Angebot/Offerte versendet",
        "ablauf": "Automatische Erinnerungen nach 2/5/10 Tagen mit Mehrwert statt Druck.",
        "bereich": "Kundenbetreuung",
        "aufwand": "Niedrig",
        "branchSpecific": true
      },
      {
        "title": "Proaktive Status-Updates",
        "benefit": "Weniger Nachfragen, mehr Vertrauen",
        "trigger": "Projekt-/Auftragsphase wechselt",
        "ablauf": "Kunde erhält automatisch verständliches Fortschritts-Update.",
        "bereich": "Kundenbetreuung",
        "aufwand": "Niedrig",
        "branchSpecific": true
      },
      {
        "title": "Case-Study-Einladung Top-Kunden",
        "benefit": "Social Proof, Referenzen",
        "trigger": "Erfolgskriterien erfüllt",
        "ablauf": "Automatische Einladung zur gemeinsamen Erfolgsgeschichte.",
        "bereich": "Empfehlungen & Bewertungen",
        "aufwand": "Niedrig",
        "branchSpecific": true
      },
      {
        "title": "Automatische Listen-Segmentierung",
        "benefit": "Zielgenaue Ansprache",
        "trigger": "Kriterien/Verhalten erfüllt",
        "ablauf": "Kontakte automatisch in passende Segmente/Listen einsortieren.",
        "bereich": "Büro & Verwaltung",
        "aufwand": "Niedrig",
        "branchSpecific": true
      },
      {
        "title": "Social-Media-Planung & Publishing",
        "benefit": "~3-4 Std./Woche",
        "trigger": "Content-Freigabe",
        "ablauf": "Posts für mehrere Kanäle planen und automatisch veröffentlichen.",
        "bereich": "Marketing & Inhalte",
        "aufwand": "Niedrig",
        "branchSpecific": true
      },
      {
        "title": "Quarterly Business Review",
        "benefit": "Stärkere Kundenbindung B2B",
        "trigger": "Quartalsende erreicht",
        "ablauf": "Automatischer Erfolgs-Report + Terminvorschlag für Review-Call.",
        "bereich": "Empfehlungen & Bewertungen",
        "aufwand": "Mittel",
        "branchSpecific": true
      }
    ],
    "revops": [
      {
        "title": "Case-Study-/Testimonial-Pipeline",
        "benefit": "Social Proof / Sales-Assets · Stärkere Abschluss-Assets · Prio 3.0",
        "trigger": "Erfolgskriterien erfüllt",
        "ablauf": "Top-Kunden automatisch zur Erfolgsgeschichte einladen + erfassen.",
        "bereich": "Empfehlungen & Bewertungen",
        "aufwand": "Niedrig",
        "branchSpecific": true
      },
      {
        "title": "Social-Proof-Recycling → Outbound",
        "benefit": "Reply-/Close-Rate · Glaubwürdigeres Outbound · Prio 3.0",
        "trigger": "Neues Testimonial/Review erfasst",
        "ablauf": "Frischen Social Proof automatisch in Outbound-Sequenzen einspeisen.",
        "bereich": "Empfehlungen & Bewertungen",
        "aufwand": "Niedrig",
        "branchSpecific": true
      },
      {
        "title": "Social-Engagement-Mining",
        "benefit": "Top-of-Funnel · Wärmere Leads, höhere Antwortrate · Prio 2.0",
        "trigger": "Interaktion mit eigenem/Wettbewerber-Content",
        "ablauf": "Engager als Lead erfassen → Connect + kontextbezogene Nachricht.",
        "bereich": "Kundengewinnung",
        "aufwand": "Mittel",
        "branchSpecific": true
      },
      {
        "title": "KI-Angebots-/Proposal-Generierung",
        "benefit": "Angebots-Durchlaufzeit · Schneller beim Kunden · Prio 2.5",
        "trigger": "Discovery abgeschlossen (Stage-Wechsel)",
        "ablauf": "Angebot/Proposal automatisch aus CRM-Daten entwerfen.",
        "bereich": "Angebote & Abschluss",
        "aufwand": "Mittel",
        "branchSpecific": true
      },
      {
        "title": "Intent-Signal-Prospecting",
        "benefit": "Pipeline-Volumen · >+30% qualifizierte Leads · Prio 1.67",
        "trigger": "Jobanzeige / Funding / Tech-Wechsel beim Zielkonto",
        "ablauf": "Kaufsignal erkennen → ICP-Match → angereicherte Liste + personalisierter Outreach-Entwurf.",
        "bereich": "Kundengewinnung",
        "aufwand": "Hoch",
        "branchSpecific": true
      },
      {
        "title": "Autonomes Terminsetzen per E-Mail (KI-SDR)",
        "benefit": "Gebuchte Termine · Mehr Termine ohne Mehrarbeit · Prio 1.67",
        "trigger": "Lead antwortet positiv auf Outreach",
        "ablauf": "KI schlägt Slots vor, klärt Rückfragen und bucht den Termin.",
        "bereich": "Termine vereinbaren",
        "aufwand": "Hoch",
        "branchSpecific": true
      }
    ]
  },
  "handel": {
    "automation": [
      {
        "title": "Vertragsverlängerungs-Reminder",
        "benefit": "Höhere Renewal-Rate",
        "trigger": "Vertrag läuft in 60/30 Tagen aus",
        "ablauf": "Renewal-Sequenz mit Nutzen-Zusammenfassung + Verlängerungs-Termin.",
        "bereich": "Kundenbindung & Verlängerung",
        "aufwand": "Niedrig",
        "branchSpecific": true
      },
      {
        "title": "Negativ-Feedback-Eskalation",
        "benefit": "Beschwerden retten Kunden",
        "trigger": "Schlechte Bewertung/niedriger Score",
        "ablauf": "Sofort-Alert an Verantwortlichen + vorbereiteter Recovery-Entwurf.",
        "bereich": "Kundenbindung & Verlängerung",
        "aufwand": "Niedrig",
        "branchSpecific": true
      },
      {
        "title": "Geburtstags-/Jahrestags-Gruß",
        "benefit": "Emotionale Bindung",
        "trigger": "Datum aus Kontaktprofil erreicht",
        "ablauf": "Persönlicher Gruß, optional mit kleinem Gutschein/Aufmerksamkeit.",
        "bereich": "Kundenbetreuung",
        "aufwand": "Niedrig",
        "branchSpecific": true
      },
      {
        "title": "Spontaner Loyalitäts-Bonus",
        "benefit": "Unerwartete Freude, Buzz",
        "trigger": "Zufallsauswahl treuer Kunden",
        "ablauf": "Unerwarteter Bonus/Upgrade für ausgewählte Stammkunden.",
        "bereich": "Kundenbetreuung",
        "aufwand": "Niedrig",
        "branchSpecific": true
      },
      {
        "title": "Review-Anfrage zum Peak-Moment",
        "benefit": "Mehr & bessere Reviews",
        "trigger": "Höchste Zufriedenheit erkannt",
        "ablauf": "Bewertungsanfrage genau im besten Moment automatisch senden.",
        "bereich": "Empfehlungen & Bewertungen",
        "aufwand": "Niedrig",
        "branchSpecific": true
      },
      {
        "title": "Automatische Übersetzungen",
        "benefit": "~1-2 Std./Woche",
        "trigger": "Dokument/Mail in Fremdsprache",
        "ablauf": "KI übersetzt Texte und legt Version ab oder antwortet mehrsprachig.",
        "bereich": "Büro & Verwaltung",
        "aufwand": "Niedrig",
        "branchSpecific": true
      }
    ],
    "revops": [
      {
        "title": "Renewal-Autopilot (90/60/30 Tage)",
        "benefit": "Renewal-Rate · +Verlängerungsquote · Prio 5.0",
        "trigger": "Vertragsablauf nähert sich",
        "ablauf": "Wert-Report + Verlängerungs-Termin proaktiv vor Ablauf.",
        "bereich": "Kundenbindung & Verlängerung",
        "aufwand": "Niedrig",
        "branchSpecific": true
      },
      {
        "title": "Proaktive Rechnungs-/Preis-Kommunikation",
        "benefit": "Zahlungsquote/Zufriedenheit · Weniger Reibung & Churn · Prio 3.0",
        "trigger": "Stichtag (Anpassung/Verlängerung)",
        "ablauf": "Klar und frühzeitig kommunizieren – ohne böse Überraschung.",
        "bereich": "Kundenbindung & Verlängerung",
        "aufwand": "Niedrig",
        "branchSpecific": true
      },
      {
        "title": "Review-Generierung zum Erfolgsmoment",
        "benefit": "Online-Reputation · Mehr & bessere Reviews · Prio 4.0",
        "trigger": "Erfolgs-/Lieferungs-Meilenstein",
        "ablauf": "Im besten Moment automatisch um Bewertung bitten.",
        "bereich": "Empfehlungen & Bewertungen",
        "aufwand": "Niedrig",
        "branchSpecific": true
      },
      {
        "title": "Wettbewerber-Review-Mining",
        "benefit": "Switch-Pipeline · Günstige Abwerbe-Chancen · Prio 1.5",
        "trigger": "Negative Bewertung beim Wettbewerber",
        "ablauf": "Unzufriedene Kunden erkennen → wertorientierter, taktvoller Outreach.",
        "bereich": "Empfehlungen & Bewertungen",
        "aufwand": "Mittel",
        "branchSpecific": true
      },
      {
        "title": "Recovery abgebrochener Formulare",
        "benefit": "Formular-Conversion · Zurückgewonnene Anfragen · Prio 1.5",
        "trigger": "Formular begonnen, nicht abgeschickt",
        "ablauf": "Erfasste Daten nutzen → freundlicher Anstoß zur Fertigstellung.",
        "bereich": "Anfragen bearbeiten",
        "aufwand": "Mittel",
        "branchSpecific": true
      },
      {
        "title": "Genehmigtes Angebot/Rabatt-Freigabe",
        "benefit": "Sales-Zyklus · Schnellere Freigaben · Prio 1.5",
        "trigger": "Definierte Bedingungen erfüllt",
        "ablauf": "Innerhalb Regeln automatisch freigegebenes Angebot ausspielen.",
        "bereich": "Angebote & Abschluss",
        "aufwand": "Mittel",
        "branchSpecific": true
      }
    ]
  },
  "handwerk": {
    "automation": [
      {
        "title": "Rückruf-Automatik bei verpasstem Anruf",
        "benefit": "Kein verlorener Lead",
        "trigger": "Verpasster eingehender Anruf",
        "ablauf": "SMS mit Entschuldigung + Self-Service-Buchungslink für Rückruf.",
        "bereich": "Telefon & Empfang",
        "aufwand": "Niedrig",
        "branchSpecific": true
      },
      {
        "title": "Proaktive Status-Updates",
        "benefit": "Weniger Nachfragen, mehr Vertrauen",
        "trigger": "Projekt-/Auftragsphase wechselt",
        "ablauf": "Kunde erhält automatisch verständliches Fortschritts-Update.",
        "bereich": "Kundenbetreuung",
        "aufwand": "Niedrig",
        "branchSpecific": true
      },
      {
        "title": "Dokumenten-Ablage & Benennung",
        "benefit": "~2 Std./Woche",
        "trigger": "Neues Dokument/Scan eingegangen",
        "ablauf": "Auto-Umbenennung nach Schema + Ablage im richtigen Ordner.",
        "bereich": "Büro & Verwaltung",
        "aufwand": "Niedrig",
        "branchSpecific": true
      },
      {
        "title": "Beleg- & Reisekosten-Erfassung",
        "benefit": "~3 Std./Woche",
        "trigger": "Foto/Mail eines Belegs",
        "ablauf": "OCR liest Beleg, extrahiert Betrag/Datum und schreibt in Tabelle.",
        "bereich": "Büro & Verwaltung",
        "aufwand": "Mittel",
        "branchSpecific": true
      },
      {
        "title": "Rechnungserstellung & -versand",
        "benefit": "~3 Std./Woche",
        "trigger": "Auftrag/Projekt abgeschlossen",
        "ablauf": "Rechnung automatisch generieren, prüfen lassen und versenden.",
        "bereich": "Buchhaltung & Rechnungen",
        "aufwand": "Mittel",
        "branchSpecific": true
      },
      {
        "title": "Lohn-Vorbereitung",
        "benefit": "~2-3 Std./Monat",
        "trigger": "Periodenende / Stundenerfassung",
        "ablauf": "Stunden zusammenführen und Lohnlauf-Daten vorbereiten.",
        "bereich": "Buchhaltung & Rechnungen",
        "aufwand": "Mittel",
        "branchSpecific": true
      }
    ],
    "revops": [
      {
        "title": "Inbound-Call-Qualifizierung (Voice-AI)",
        "benefit": "Erreichbarkeit · Keine verpassten Anfragen · Prio 1.33",
        "trigger": "Eingehender Anruf",
        "ablauf": "KI nimmt an, qualifiziert und bucht oder routet an Mensch.",
        "bereich": "Anfragen bearbeiten",
        "aufwand": "Hoch",
        "branchSpecific": true
      },
      {
        "title": "Lead-Magnet-Auslieferung + Sequenz",
        "benefit": "Lead→MQL · Mehr aktivierte Leads · Prio 4.0",
        "trigger": "Download/Opt-in abgeschlossen",
        "ablauf": "Asset sofort liefern → passende Nurture-Sequenz automatisch starten.",
        "bereich": "Anfragen bearbeiten",
        "aufwand": "Niedrig",
        "branchSpecific": false
      },
      {
        "title": "No-Show-Rebooking",
        "benefit": "Show-Rate · Weniger verlorene Termine · Prio 4.0",
        "trigger": "Termin verpasst",
        "ablauf": "Automatisch neuen Slot anbieten und Show-Rate sichern.",
        "bereich": "Termine vereinbaren",
        "aufwand": "Niedrig",
        "branchSpecific": false
      },
      {
        "title": "Show-Rate-Booster-Sequenz",
        "benefit": "Show-Rate · -30-50% No-Shows · Prio 4.0",
        "trigger": "Termin gebucht",
        "ablauf": "Multi-Touch-Reminder (Mail/SMS) + Vorbereitungs-Wert senden.",
        "bereich": "Termine vereinbaren",
        "aufwand": "Niedrig",
        "branchSpecific": false
      },
      {
        "title": "Newsletter→SQL-Pipeline",
        "benefit": "MQL→SQL · Mehr Sales aus Bestandsliste · Prio 3.0",
        "trigger": "Wiederkehrendes Klick-Engagement",
        "ablauf": "Engagement-Muster erkennen → Übergabe als Sales-Qualified-Lead.",
        "bereich": "Angebote & Abschluss",
        "aufwand": "Niedrig",
        "branchSpecific": false
      },
      {
        "title": "Deal-Follow-up-Autopilot",
        "benefit": "Abschlussquote · +15-25% Close-Rate · Prio 5.0",
        "trigger": "Angebot 48h ohne Reaktion",
        "ablauf": "Wertorientiertes Follow-up statt Druck, automatisch getaktet.",
        "bereich": "Angebote & Abschluss",
        "aufwand": "Niedrig",
        "branchSpecific": false
      }
    ]
  },
  "gastro": {
    "automation": [
      {
        "title": "Negativ-Feedback-Eskalation",
        "benefit": "Beschwerden retten Kunden",
        "trigger": "Schlechte Bewertung/niedriger Score",
        "ablauf": "Sofort-Alert an Verantwortlichen + vorbereiteter Recovery-Entwurf.",
        "bereich": "Kundenbindung & Verlängerung",
        "aufwand": "Niedrig",
        "branchSpecific": true
      },
      {
        "title": "Spontaner Loyalitäts-Bonus",
        "benefit": "Unerwartete Freude, Buzz",
        "trigger": "Zufallsauswahl treuer Kunden",
        "ablauf": "Unerwarteter Bonus/Upgrade für ausgewählte Stammkunden.",
        "bereich": "Kundenbetreuung",
        "aufwand": "Niedrig",
        "branchSpecific": true
      },
      {
        "title": "Automatische Übersetzungen",
        "benefit": "~1-2 Std./Woche",
        "trigger": "Dokument/Mail in Fremdsprache",
        "ablauf": "KI übersetzt Texte und legt Version ab oder antwortet mehrsprachig.",
        "bereich": "Büro & Verwaltung",
        "aufwand": "Niedrig",
        "branchSpecific": true
      },
      {
        "title": "Visitenkarten/Signatur-Erfassung",
        "benefit": "Schnelle Nacherfassung",
        "trigger": "Foto/Mail eines Kontakts",
        "ablauf": "Kontaktdaten extrahieren und als CRM-Kontakt anlegen.",
        "bereich": "Büro & Verwaltung",
        "aufwand": "Niedrig",
        "branchSpecific": true
      },
      {
        "title": "Reviews sammeln & teilen",
        "benefit": "Kontinuierlicher Social Proof",
        "trigger": "Neue positive Bewertung",
        "ablauf": "Bewertung automatisch als Social-Proof-Post aufbereiten.",
        "bereich": "Empfehlungen & Bewertungen",
        "aufwand": "Niedrig",
        "branchSpecific": true
      },
      {
        "title": "Treue-/Loyalitäts-Tracking",
        "benefit": "Wiederkaufrate steigt",
        "trigger": "Kundenaktivität/Käufe",
        "ablauf": "Punkte automatisch gutschreiben + Status-Update + Belohnungs-Trigger.",
        "bereich": "Kundenbindung & Verlängerung",
        "aufwand": "Mittel",
        "branchSpecific": true
      }
    ],
    "revops": [
      {
        "title": "Review-Generierung zum Erfolgsmoment",
        "benefit": "Online-Reputation · Mehr & bessere Reviews · Prio 4.0",
        "trigger": "Erfolgs-/Lieferungs-Meilenstein",
        "ablauf": "Im besten Moment automatisch um Bewertung bitten.",
        "bereich": "Empfehlungen & Bewertungen",
        "aufwand": "Niedrig",
        "branchSpecific": true
      },
      {
        "title": "Lead-Magnet-Auslieferung + Sequenz",
        "benefit": "Lead→MQL · Mehr aktivierte Leads · Prio 4.0",
        "trigger": "Download/Opt-in abgeschlossen",
        "ablauf": "Asset sofort liefern → passende Nurture-Sequenz automatisch starten.",
        "bereich": "Anfragen bearbeiten",
        "aufwand": "Niedrig",
        "branchSpecific": false
      },
      {
        "title": "No-Show-Rebooking",
        "benefit": "Show-Rate · Weniger verlorene Termine · Prio 4.0",
        "trigger": "Termin verpasst",
        "ablauf": "Automatisch neuen Slot anbieten und Show-Rate sichern.",
        "bereich": "Termine vereinbaren",
        "aufwand": "Niedrig",
        "branchSpecific": false
      },
      {
        "title": "Show-Rate-Booster-Sequenz",
        "benefit": "Show-Rate · -30-50% No-Shows · Prio 4.0",
        "trigger": "Termin gebucht",
        "ablauf": "Multi-Touch-Reminder (Mail/SMS) + Vorbereitungs-Wert senden.",
        "bereich": "Termine vereinbaren",
        "aufwand": "Niedrig",
        "branchSpecific": false
      },
      {
        "title": "Newsletter→SQL-Pipeline",
        "benefit": "MQL→SQL · Mehr Sales aus Bestandsliste · Prio 3.0",
        "trigger": "Wiederkehrendes Klick-Engagement",
        "ablauf": "Engagement-Muster erkennen → Übergabe als Sales-Qualified-Lead.",
        "bereich": "Angebote & Abschluss",
        "aufwand": "Niedrig",
        "branchSpecific": false
      },
      {
        "title": "Deal-Follow-up-Autopilot",
        "benefit": "Abschlussquote · +15-25% Close-Rate · Prio 5.0",
        "trigger": "Angebot 48h ohne Reaktion",
        "ablauf": "Wertorientiertes Follow-up statt Druck, automatisch getaktet.",
        "bereich": "Angebote & Abschluss",
        "aufwand": "Niedrig",
        "branchSpecific": false
      }
    ]
  },
  "gesundheit": {
    "automation": [
      {
        "title": "Termin-Erinnerungen (E-Mail/SMS)",
        "benefit": "-30-50% No-Shows",
        "trigger": "Kalendereintrag 24h/1h vorher",
        "ablauf": "Automatische Reminder reduzieren No-Shows; Bestätigungs-Link inklusive.",
        "bereich": "Termine vereinbaren",
        "aufwand": "Niedrig",
        "branchSpecific": true
      },
      {
        "title": "Rückruf-Automatik bei verpasstem Anruf",
        "benefit": "Kein verlorener Lead",
        "trigger": "Verpasster eingehender Anruf",
        "ablauf": "SMS mit Entschuldigung + Self-Service-Buchungslink für Rückruf.",
        "bereich": "Telefon & Empfang",
        "aufwand": "Niedrig",
        "branchSpecific": true
      },
      {
        "title": "Geburtstags-/Jahrestags-Gruß",
        "benefit": "Emotionale Bindung",
        "trigger": "Datum aus Kontaktprofil erreicht",
        "ablauf": "Persönlicher Gruß, optional mit kleinem Gutschein/Aufmerksamkeit.",
        "bereich": "Kundenbetreuung",
        "aufwand": "Niedrig",
        "branchSpecific": true
      },
      {
        "title": "Termin-Koordination / Scheduling",
        "benefit": "~2 Std./Woche",
        "trigger": "Terminanfrage per Mail/Formular",
        "ablauf": "Verfügbarkeiten prüfen, Slot vorschlagen, buchen und bestätigen.",
        "bereich": "Termine vereinbaren",
        "aufwand": "Niedrig",
        "branchSpecific": true
      },
      {
        "title": "Termin-Bestätigung per Anruf/SMS",
        "benefit": "-30-50% No-Shows",
        "trigger": "Termin steht an",
        "ablauf": "Automatisierte Bestätigung und Erinnerung reduziert No-Shows.",
        "bereich": "Telefon & Empfang",
        "aufwand": "Niedrig",
        "branchSpecific": true
      },
      {
        "title": "Lead-Willkommens-Onboarding",
        "benefit": "Schnellerer Erstkontakt, +Conversion",
        "trigger": "Neuer Lead/Kontakt im CRM",
        "ablauf": "Personalisierte Willkommens-Mail + Ressourcen-Paket + erste Schritte automatisch versenden.",
        "bereich": "Kundenbetreuung",
        "aufwand": "Niedrig",
        "branchSpecific": false
      }
    ],
    "revops": [
      {
        "title": "No-Show-Rebooking",
        "benefit": "Show-Rate · Weniger verlorene Termine · Prio 4.0",
        "trigger": "Termin verpasst",
        "ablauf": "Automatisch neuen Slot anbieten und Show-Rate sichern.",
        "bereich": "Termine vereinbaren",
        "aufwand": "Niedrig",
        "branchSpecific": true
      },
      {
        "title": "Inbound-Call-Qualifizierung (Voice-AI)",
        "benefit": "Erreichbarkeit · Keine verpassten Anfragen · Prio 1.33",
        "trigger": "Eingehender Anruf",
        "ablauf": "KI nimmt an, qualifiziert und bucht oder routet an Mensch.",
        "bereich": "Anfragen bearbeiten",
        "aufwand": "Hoch",
        "branchSpecific": true
      },
      {
        "title": "Lead-Magnet-Auslieferung + Sequenz",
        "benefit": "Lead→MQL · Mehr aktivierte Leads · Prio 4.0",
        "trigger": "Download/Opt-in abgeschlossen",
        "ablauf": "Asset sofort liefern → passende Nurture-Sequenz automatisch starten.",
        "bereich": "Anfragen bearbeiten",
        "aufwand": "Niedrig",
        "branchSpecific": false
      },
      {
        "title": "Show-Rate-Booster-Sequenz",
        "benefit": "Show-Rate · -30-50% No-Shows · Prio 4.0",
        "trigger": "Termin gebucht",
        "ablauf": "Multi-Touch-Reminder (Mail/SMS) + Vorbereitungs-Wert senden.",
        "bereich": "Termine vereinbaren",
        "aufwand": "Niedrig",
        "branchSpecific": false
      },
      {
        "title": "Newsletter→SQL-Pipeline",
        "benefit": "MQL→SQL · Mehr Sales aus Bestandsliste · Prio 3.0",
        "trigger": "Wiederkehrendes Klick-Engagement",
        "ablauf": "Engagement-Muster erkennen → Übergabe als Sales-Qualified-Lead.",
        "bereich": "Angebote & Abschluss",
        "aufwand": "Niedrig",
        "branchSpecific": false
      },
      {
        "title": "Deal-Follow-up-Autopilot",
        "benefit": "Abschlussquote · +15-25% Close-Rate · Prio 5.0",
        "trigger": "Angebot 48h ohne Reaktion",
        "ablauf": "Wertorientiertes Follow-up statt Druck, automatisch getaktet.",
        "bereich": "Angebote & Abschluss",
        "aufwand": "Niedrig",
        "branchSpecific": false
      }
    ]
  },
  "it": {
    "automation": [
      {
        "title": "Vertragsverlängerungs-Reminder",
        "benefit": "Höhere Renewal-Rate",
        "trigger": "Vertrag läuft in 60/30 Tagen aus",
        "ablauf": "Renewal-Sequenz mit Nutzen-Zusammenfassung + Verlängerungs-Termin.",
        "bereich": "Kundenbindung & Verlängerung",
        "aufwand": "Niedrig",
        "branchSpecific": true
      },
      {
        "title": "Failed-Payment-Recovery (Dunning)",
        "benefit": "Weniger unfreiwilliger Churn",
        "trigger": "Zahlung fehlgeschlagen",
        "ablauf": "Freundliche, gestaffelte Reminder + Self-Service-Update der Zahlung.",
        "bereich": "Kundenbindung & Verlängerung",
        "aufwand": "Niedrig",
        "branchSpecific": true
      },
      {
        "title": "Meilenstein-Feier",
        "benefit": "Wow-Moment, Loyalität",
        "trigger": "Kunde erreicht Nutzungs-/Jubiläums-Marke",
        "ablauf": "Automatischer Glückwunsch + ggf. kleines Geschenk/Badge.",
        "bereich": "Kundenbetreuung",
        "aufwand": "Niedrig",
        "branchSpecific": true
      },
      {
        "title": "Erster-Erfolg-Gratulation",
        "benefit": "Aktivierung, Begeisterung",
        "trigger": "Kunde erreicht ersten Aha-Moment",
        "ablauf": "Sofort-Glückwunsch + nächster sinnvoller Schritt.",
        "bereich": "Kundenbetreuung",
        "aufwand": "Niedrig",
        "branchSpecific": true
      },
      {
        "title": "Case-Study-Einladung Top-Kunden",
        "benefit": "Social Proof, Referenzen",
        "trigger": "Erfolgskriterien erfüllt",
        "ablauf": "Automatische Einladung zur gemeinsamen Erfolgsgeschichte.",
        "bereich": "Empfehlungen & Bewertungen",
        "aufwand": "Niedrig",
        "branchSpecific": true
      },
      {
        "title": "Support-Ticket Auto-Triage",
        "benefit": "Schnellere Lösungszeit",
        "trigger": "Eingehende Support-Mail/Ticket",
        "ablauf": "KI klassifiziert Anliegen, priorisiert und routet ans richtige Team.",
        "bereich": "Anfragen bearbeiten",
        "aufwand": "Mittel",
        "branchSpecific": true
      }
    ],
    "revops": [
      {
        "title": "Renewal-Autopilot (90/60/30 Tage)",
        "benefit": "Renewal-Rate · +Verlängerungsquote · Prio 5.0",
        "trigger": "Vertragsablauf nähert sich",
        "ablauf": "Wert-Report + Verlängerungs-Termin proaktiv vor Ablauf.",
        "bereich": "Kundenbindung & Verlängerung",
        "aufwand": "Niedrig",
        "branchSpecific": true
      },
      {
        "title": "Case-Study-/Testimonial-Pipeline",
        "benefit": "Social Proof / Sales-Assets · Stärkere Abschluss-Assets · Prio 3.0",
        "trigger": "Erfolgskriterien erfüllt",
        "ablauf": "Top-Kunden automatisch zur Erfolgsgeschichte einladen + erfassen.",
        "bereich": "Empfehlungen & Bewertungen",
        "aufwand": "Niedrig",
        "branchSpecific": true
      },
      {
        "title": "Website-Visitor-Identifikation → Outbound",
        "benefit": "Inbound→Outbound-Quote · +20-40% genutzte Intent-Signale · Prio 2.5",
        "trigger": "Anonymer Firmen-Besucher auf High-Intent-Seite",
        "ablauf": "Besucher firmografisch identifizieren → SDR-Alert + passende Sequenz.",
        "bereich": "Kundengewinnung",
        "aufwand": "Mittel",
        "branchSpecific": true
      },
      {
        "title": "Wettbewerber-Review-Mining",
        "benefit": "Switch-Pipeline · Günstige Abwerbe-Chancen · Prio 1.5",
        "trigger": "Negative Bewertung beim Wettbewerber",
        "ablauf": "Unzufriedene Kunden erkennen → wertorientierter, taktvoller Outreach.",
        "bereich": "Empfehlungen & Bewertungen",
        "aufwand": "Mittel",
        "branchSpecific": true
      },
      {
        "title": "KI-Chat-zu-Termin",
        "benefit": "Demo-Buchungen · +Conversion aus Web-Traffic · Prio 2.0",
        "trigger": "Website-Chat mit Kaufabsicht",
        "ablauf": "KI qualifiziert im Dialog und bucht direkt einen Termin.",
        "bereich": "Anfragen bearbeiten",
        "aufwand": "Mittel",
        "branchSpecific": true
      },
      {
        "title": "Recovery abgebrochener Formulare",
        "benefit": "Formular-Conversion · Zurückgewonnene Anfragen · Prio 1.5",
        "trigger": "Formular begonnen, nicht abgeschickt",
        "ablauf": "Erfasste Daten nutzen → freundlicher Anstoß zur Fertigstellung.",
        "bereich": "Anfragen bearbeiten",
        "aufwand": "Mittel",
        "branchSpecific": true
      }
    ]
  },
  "andere": {
    "automation": [
      {
        "title": "Angebots-Follow-up-Sequenz",
        "benefit": "+15-25% Abschlussquote",
        "trigger": "Angebot/Offerte versendet",
        "ablauf": "Automatische Erinnerungen nach 2/5/10 Tagen mit Mehrwert statt Druck.",
        "bereich": "Kundenbetreuung",
        "aufwand": "Niedrig",
        "branchSpecific": true
      },
      {
        "title": "Geplante Check-in-Calls",
        "benefit": "Frühe Bindung, weniger Churn",
        "trigger": "X Tage nach Onboarding",
        "ablauf": "Automatischer Terminvorschlag für Zufriedenheits-Check-in.",
        "bereich": "Kundenbindung & Verlängerung",
        "aufwand": "Niedrig",
        "branchSpecific": true
      },
      {
        "title": "Case-Study-Einladung Top-Kunden",
        "benefit": "Social Proof, Referenzen",
        "trigger": "Erfolgskriterien erfüllt",
        "ablauf": "Automatische Einladung zur gemeinsamen Erfolgsgeschichte.",
        "bereich": "Empfehlungen & Bewertungen",
        "aufwand": "Niedrig",
        "branchSpecific": true
      },
      {
        "title": "Formular-Anfragen-Routing",
        "benefit": "~2 Std./Woche",
        "trigger": "Webformular abgeschickt",
        "ablauf": "Anfrage validieren, ans richtige Team leiten + Eingangsbestätigung.",
        "bereich": "Büro & Verwaltung",
        "aufwand": "Niedrig",
        "branchSpecific": true
      },
      {
        "title": "Automatische Übersetzungen",
        "benefit": "~1-2 Std./Woche",
        "trigger": "Dokument/Mail in Fremdsprache",
        "ablauf": "KI übersetzt Texte und legt Version ab oder antwortet mehrsprachig.",
        "bereich": "Büro & Verwaltung",
        "aufwand": "Niedrig",
        "branchSpecific": true
      },
      {
        "title": "Mahnwesen automatisieren",
        "benefit": "~2 Std./Woche",
        "trigger": "Rechnung überfällig",
        "ablauf": "Gestaffelte, freundliche Mahnungen automatisch versenden.",
        "bereich": "Buchhaltung & Rechnungen",
        "aufwand": "Niedrig",
        "branchSpecific": true
      }
    ],
    "revops": [
      {
        "title": "Lead-Magnet-Auslieferung + Sequenz",
        "benefit": "Lead→MQL · Mehr aktivierte Leads · Prio 4.0",
        "trigger": "Download/Opt-in abgeschlossen",
        "ablauf": "Asset sofort liefern → passende Nurture-Sequenz automatisch starten.",
        "bereich": "Anfragen bearbeiten",
        "aufwand": "Niedrig",
        "branchSpecific": true
      },
      {
        "title": "Show-Rate-Booster-Sequenz",
        "benefit": "Show-Rate · -30-50% No-Shows · Prio 4.0",
        "trigger": "Termin gebucht",
        "ablauf": "Multi-Touch-Reminder (Mail/SMS) + Vorbereitungs-Wert senden.",
        "bereich": "Termine vereinbaren",
        "aufwand": "Niedrig",
        "branchSpecific": true
      },
      {
        "title": "Newsletter→SQL-Pipeline",
        "benefit": "MQL→SQL · Mehr Sales aus Bestandsliste · Prio 3.0",
        "trigger": "Wiederkehrendes Klick-Engagement",
        "ablauf": "Engagement-Muster erkennen → Übergabe als Sales-Qualified-Lead.",
        "bereich": "Angebote & Abschluss",
        "aufwand": "Niedrig",
        "branchSpecific": true
      },
      {
        "title": "Deal-Follow-up-Autopilot",
        "benefit": "Abschlussquote · +15-25% Close-Rate · Prio 5.0",
        "trigger": "Angebot 48h ohne Reaktion",
        "ablauf": "Wertorientiertes Follow-up statt Druck, automatisch getaktet.",
        "bereich": "Angebote & Abschluss",
        "aufwand": "Niedrig",
        "branchSpecific": true
      },
      {
        "title": "Referral-Ask zum NPS-Peak",
        "benefit": "Empfehlungsrate · Mehr warme Leads · Prio 5.0",
        "trigger": "Hoher NPS / Promotor erkannt",
        "ablauf": "Genau im Zufriedenheits-Peak um Empfehlung bitten.",
        "bereich": "Empfehlungen & Bewertungen",
        "aufwand": "Niedrig",
        "branchSpecific": true
      },
      {
        "title": "Review-Generierung zum Erfolgsmoment",
        "benefit": "Online-Reputation · Mehr & bessere Reviews · Prio 4.0",
        "trigger": "Erfolgs-/Lieferungs-Meilenstein",
        "ablauf": "Im besten Moment automatisch um Bewertung bitten.",
        "bereich": "Empfehlungen & Bewertungen",
        "aufwand": "Niedrig",
        "branchSpecific": true
      }
    ]
  }
}
