// Kuratierte Use-Cases aus dem AgenticIT-Gesamtkatalog.
// hours = grobe Std./Woche, die eine Automatisierung typischerweise freisetzt.

export const ZEITFRESSER_MAP: Record<string, { hours: number; solution: string }> = {
  "E-Mail-Bearbeitung": { hours: 5, solution: "KI sortiert, priorisiert und beantwortet Standard-Mails." },
  "Daten- & CRM-Pflege": { hours: 3, solution: "Automatische Anreicherung, Dubletten-Bereinigung und Datenhygiene." },
  "Termine koordinieren": { hours: 2, solution: "Self-Service-Buchung mit Kalender-Sync und Erinnerungen." },
  "Belege & Rechnungen": { hours: 4, solution: "OCR erfasst und verbucht Belege ohne manuelles Tippen." },
  "Angebote schreiben": { hours: 3, solution: "Angebote werden aus CRM-Daten automatisch generiert." },
  Reporting: { hours: 3.5, solution: "Daten ziehen, aufbereiten und Report automatisch erstellen." },
  "Telefon & Anfragen": { hours: 4, solution: "KI-Voice-Agent nimmt an, qualifiziert und bucht – rund um die Uhr." },
  "Social Media": { hours: 2.5, solution: "Planung, Repurposing und Publishing laufen automatisiert." },
}

export const RECOMMENDATIONS = {
  sichtbarkeit: { title: "SEO- & GEO-Sichtbarkeit aufbauen", effect: "Mehr Reichweite in Google und KI-Suchen", area: "Marketing" },
  speed: { title: "Speed-to-Lead < 60 Sekunden", effect: "Bis 9× höhere Kontaktrate", area: "Vertrieb" },
  voice: { title: "KI-Telefon- & Chat-Empfang", effect: "Keine verpasste Anfrage, 24/7 erreichbar", area: "Service" },
  followup: { title: "Follow-up-Autopilot", effect: "+15–25 % Abschlussquote ohne Mehrarbeit", area: "Vertrieb" },
  leadscoring: { title: "Lead-Scoring & Auto-Routing", effect: "Die richtigen Anfragen zuerst", area: "Vertrieb" },
  offer: { title: "Automatische Angebots-Erstellung", effect: "In Minuten statt Stunden beim Kunden", area: "Vertrieb" },
} as const

export const ROUTINE_MID: Record<string, number> = {
  "Unter 5": 4,
  "5–15": 10,
  "15–30": 22,
  "Über 30": 35,
}
