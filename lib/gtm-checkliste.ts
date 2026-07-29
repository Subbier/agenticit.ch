// GTM-Checklisten-Generator (Lead-Magnet auf /loesungen/gtm-markteintritt).
// Branche + Ziel → persönliche Go-to-Market-Checkliste zum Download.
// Inhalte bewusst konkret und umsetzbar — kein generisches "mehr posten".

export type GtmBranche = { id: string; label: string }
export type GtmZiel = { id: string; label: string; items: string[] }

export const GTM_BRANCHEN: GtmBranche[] = [
  { id: "treuhand", label: "Treuhand · Finanzen" },
  { id: "bau", label: "Bau · Handwerk" },
  { id: "gesundheit", label: "Gesundheit · Praxis" },
  { id: "gastro", label: "Gastro · Tourismus" },
  { id: "handel", label: "Handel · E-Commerce" },
  { id: "it", label: "IT · Software" },
  { id: "beratung", label: "Beratung · Dienstleistung" },
  { id: "immobilien", label: "Immobilien" },
  { id: "andere", label: "Andere Branche" },
]

export const GTM_ZIELE: GtmZiel[] = [
  {
    id: "mehr-anfragen",
    label: "Mehr Anfragen & Termine",
    items: [
      "Kauf-Keywords identifizieren: Wonach sucht jemand, der JETZT kaufen will — nicht nur stöbern?",
      "Google Ads auf Kosten pro Termin steuern, nicht auf Klicks — jedes Budget-Franken hat ein Preisschild.",
      "Speed-to-Lead unter 5 Minuten — besser: Sekunden. Wer zuerst antwortet, gewinnt den Termin.",
      "Follow-up-Sequenz einrichten: mindestens 3 Kontaktpunkte, bevor ein Lead als verloren gilt.",
      "Bewertungen systematisch sammeln — nach jedem Abschluss, automatisiert angefragt.",
    ],
  },
  {
    id: "neuer-markt",
    label: "Neue Region / neuen Markt erschliessen",
    items: [
      "Nachfrage messen, bevor Sie investieren: Wie viele suchen in der Ziel-Region monatlich nach Ihrem Angebot?",
      "Eigene Landingpage pro Region — mit lokalen Referenzen, nicht mit Textbausteinen.",
      "Google Business Profile für den neuen Standort anlegen und aktiv pflegen.",
      "Lokale Verzeichnisse und Branchenportale der Ziel-Region eintragen.",
      "Regionale Kampagne mit klarem Startbudget und Abbruchkriterium definieren.",
    ],
  },
  {
    id: "bekanntheit",
    label: "Marke & Bekanntheit aufbauen",
    items: [
      "Die 2–3 Kanäle wählen, auf denen Ihre Persona wirklich ist — und die anderen bewusst weglassen.",
      "Content-Plan: eine Kernbotschaft pro Monat, in Formate für jeden Kanal übersetzt.",
      "Sichtbarkeit in KI-Antworten aufbauen (AIO/GEO): Wird Ihre Firma genannt, wenn ChatGPT nach Ihrer Leistung gefragt wird?",
      "Retargeting einrichten — wer einmal da war, sieht Sie wieder.",
      "Newsletter starten: die einzige Reichweite, die Ihnen niemand wegnehmen kann.",
    ],
  },
  {
    id: "online-verkauf",
    label: "Online-Verkauf steigern",
    items: [
      "Produkt-/Angebotsseiten auf EIN Conversion-Ziel ausrichten — jede Ablenkung kostet Umsatz.",
      "Buchungs-/Bezahlstrecke selbst durchspielen: Jeder unnötige Klick ist ein Absprung.",
      "Warenkorb-/Anfrage-Abbrecher automatisch nachfassen (E-Mail-Automation).",
      "Kampagnen auf Umsatz pro Werbefranken (ROAS) steuern statt auf Reichweite.",
      "Social Proof an den Kaufentscheid setzen: Bewertungen und Referenzen direkt neben dem Button.",
    ],
  },
]

/** Fundament — gilt für jede Branche und jedes Ziel. Ohne das verpufft alles andere. */
export const GTM_FUNDAMENT: string[] = [
  "Persona schriftlich festhalten: Wer entscheidet, was treibt ihn an, was hält ihn nachts wach?",
  "Customer Journey skizzieren: Welche Schritte geht Ihr Kunde vom ersten Kontakt bis zur Anfrage?",
  "Website auf EIN klares Ziel pro Seite ausrichten — Anfrage, Anruf oder Termin.",
  "Ladezeit unter 2,5 Sekunden, einwandfrei auf dem Handy — hier verlieren die meisten still ihre Besucher.",
  "Messung einrichten: Ohne Conversion-Tracking wissen Sie nie, welcher Kanal Ihr Geld verdient.",
]

/** Branchen-Fokus — die 2–3 Hebel, die in dieser Branche überdurchschnittlich wirken. */
export const GTM_BRANCHEN_TIPPS: Record<string, string[]> = {
  treuhand: [
    "Vertrauen sichtbar machen: Team mit Gesicht, Zertifizierungen, Mitgliedschaften — prominent, nicht im Kleingedruckten.",
    "Fachthemen besetzen (Steuertermine, Vorsorge, Firmengründung) — wer erklärt, wird gefragt.",
  ],
  bau: [
    "Projekte mit Vorher/Nachher-Bildern zeigen — Referenzen verkaufen besser als jede Anzeige.",
    "Anfrageformular radikal kurz halten: Telefonnummer + Projektart reicht für den Erstkontakt.",
  ],
  gesundheit: [
    "Online-Terminbuchung anbieten — wer erst anrufen muss, bucht woanders.",
    "Bewertungsprofil aktiv pflegen: Bei Gesundheitsthemen liest JEDER zuerst die Erfahrungen anderer.",
  ],
  gastro: [
    "Google Business Profile ist Ihre wichtigste Seite: Fotos, Öffnungszeiten, Menü — aktuell halten.",
    "Reservation/Bestellung in maximal 2 Klicks — jede Hürde füllt die Tische der Konkurrenz.",
  ],
  handel: [
    "Produktdaten sauber strukturieren — davon leben Google Shopping und die KI-Suche.",
    "Retouren- und Lieferinfos offensiv kommunizieren: Unsicherheit ist der grösste Kaufabbrecher.",
  ],
  it: [
    "Anwendungsfälle statt Feature-Listen: Zeigen Sie das Problem gelöst, nicht die Technik erklärt.",
    "Case Studies mit Zahlen — im B2B entscheidet der Beweis, nicht das Versprechen.",
  ],
  beratung: [
    "Ein kostenloses Erstgespräch als klares Einstiegsangebot — senkt die Hürde, misst das Interesse.",
    "Expertise zeigen: Fachbeiträge und Vorträge machen aus Ihnen die erste Adresse statt einer von vielen.",
  ],
  immobilien: [
    "Objekte mit professionellen Fotos und virtuellen Rundgängen — hier entscheidet die Präsentation.",
    "Suchaufträge anbieten: Wer sein Wunschobjekt hinterlegt, bleibt Ihr Lead — nicht der des Portals.",
  ],
  andere: [
    "Die 3 häufigsten Kundenfragen auf der Startseite beantworten — bevor sie jemand stellen muss.",
    "Einen einzigen, klaren nächsten Schritt anbieten: Anruf, Termin oder Anfrage — nicht alles gleichzeitig.",
  ],
}

export type GtmCheckliste = {
  brancheLabel: string
  zielLabel: string
  fundament: string[]
  zielItems: string[]
  branchenItems: string[]
}

export function buildGtmCheckliste(brancheId: string, zielId: string): GtmCheckliste | null {
  const branche = GTM_BRANCHEN.find((b) => b.id === brancheId)
  const ziel = GTM_ZIELE.find((z) => z.id === zielId)
  if (!branche || !ziel) return null
  return {
    brancheLabel: branche.label,
    zielLabel: ziel.label,
    fundament: GTM_FUNDAMENT,
    zielItems: ziel.items,
    branchenItems: GTM_BRANCHEN_TIPPS[brancheId] ?? GTM_BRANCHEN_TIPPS["andere"],
  }
}

/** Druck-/Download-fähige HTML-Version der Checkliste (Muster: calculator-reports). */
export function gtmChecklisteHtml(liste: GtmCheckliste, name?: string) {
  const section = (title: string, items: string[]) => `
    <h2>${title}</h2>
    <ul>${items.map((i) => `<li><span class="box"></span><span>${i}</span></li>`).join("")}</ul>`

  return `<!DOCTYPE html><html lang="de"><head><meta charset="utf-8"><title>AgenticIT – Ihre GTM-Checkliste</title><style>
    * { box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; color: #0A0C10; margin: 0; padding: 40px; background: #fff; }
    .brand { font-size: 22px; font-weight: 800; margin-bottom: 4px; }
    .brand span { color: #1F9A5E; }
    .eyebrow { display: inline-block; background: rgba(31,154,94,.12); color: #1F9A5E; font-size: 11px; font-weight: 800; letter-spacing: .6px; text-transform: uppercase; padding: 6px 12px; border-radius: 999px; margin: 16px 0 8px; }
    h1 { font-size: 26px; line-height: 1.15; margin: 0 0 6px; }
    .sub { color: #475569; font-size: 14px; margin-bottom: 8px; }
    h2 { font-size: 15px; text-transform: uppercase; letter-spacing: .5px; color: #1F9A5E; margin: 26px 0 10px; border-bottom: 1px solid #E1E4E8; padding-bottom: 6px; }
    ul { list-style: none; margin: 0; padding: 0; }
    li { display: flex; gap: 10px; align-items: flex-start; padding: 7px 0; font-size: 14px; line-height: 1.5; color: #1E2833; }
    .box { flex: none; width: 15px; height: 15px; border: 2px solid #9AA3AD; border-radius: 4px; margin-top: 2px; }
    .footer { margin-top: 32px; padding-top: 16px; border-top: 1px solid #E1E4E8; font-size: 11px; color: #9aa9bf; }
    @media print { body { padding: 24px; } }
  </style></head><body>
  <div class="brand">Agentic<span>IT</span></div>
  <div class="eyebrow">Go-to-Market-Checkliste</div>
  <h1>Ihr Fahrplan: ${liste.zielLabel}</h1>
  <p class="sub">Branche: ${liste.brancheLabel}${name ? ` · Erstellt für ${name}` : ""} · ${new Date().toLocaleDateString("de-CH")}</p>
  ${section("Das Fundament — ohne das verpufft alles", liste.fundament)}
  ${section(`Ihr Ziel: ${liste.zielLabel}`, liste.zielItems)}
  ${section(`Speziell für ${liste.brancheLabel}`, liste.branchenItems)}
  <div class="footer">Kostenlos erstellt von AgenticIT · agenticit.ch · Fragen? 031 539 44 44 — wir gehen die Liste gerne gemeinsam mit Ihnen durch.</div>
  <script>window.onload=()=>window.print()</script>
  </body></html>`
}
