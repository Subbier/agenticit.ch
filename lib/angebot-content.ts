// AgenticIT · Inhalte der Angebot-Seiten (Acquire · Convert · Retain · Operate)
// Quelle: Leistungs-Flyer (v3) + «KI & Agentic Services – Alle Leistungen auf einen Blick».
// ⚠️ Human-in-the-Loop: ROI-/Studien-Richtwerte vor Live-Schaltung menschlich prüfen.

export type AngebotStat = {
  value: string
  label: string
  source?: string
}

// short = Einzeiler für das «Alle Leistungen»-Raster · long = 2–3 Sätze fürs Accordion
export type AngebotService = {
  lead: string
  short: string
  long: string
}

export type AngebotFaq = {
  q: string
  a: string
}

// --- Chart-Datenmodelle (werden von angebot-charts.tsx gerendert) ---
export type ChartRadar = {
  type: "radar"
  title: string
  axes: string[]
  agentic: number[] // 0..1
  now: number[] // 0..1
}
export type ChartFunnel = {
  type: "funnel"
  title: string
  steps: { label: string; pct: number }[]
}
export type ChartLine = {
  type: "line"
  title: string
  xLabels: string[]
  agentic: number[]
  now: number[]
}
export type ChartDonut = {
  type: "donut"
  title: string
  segments: { label: string; value: number; color: string }[]
}
export type AngebotChartData = ChartRadar | ChartFunnel | ChartLine | ChartDonut

export type AngebotArea = {
  slug: string // z. B. "angebot/acquire"
  key: "acquire" | "convert" | "retain" | "operate"
  navLabel: string // "Acquire"
  name: string // "Agentic Acquire"
  german: string // "Gewinnen"
  icon: string
  eyebrow: string // "Neukunden gewinnen"
  tagline: string
  nutzen: string
  accent: string // Hex
  accentSoft: string // sehr helles Hintergrund-Hex
  stats: AngebotStat[]
  chart: AngebotChartData
  services: AngebotService[]
  meta: { title: string; description: string }
}

const COMPLIANCE_LINE =
  "KI transparent gekennzeichnet · revDSG-konform · menschliche Freigabe · Studien-Richtwerte, keine Garantie."

export const ANGEBOT_COMPLIANCE = COMPLIANCE_LINE

export const ANGEBOT_AREAS: AngebotArea[] = [
  {
    slug: "angebot/acquire",
    key: "acquire",
    navLabel: "Acquire",
    name: "Agentic Acquire",
    german: "Gewinnen",
    icon: "🎯",
    eyebrow: "Neukunden gewinnen",
    tagline: "Mehr qualifizierte Termine — ohne dass Ihr Team mehr arbeitet.",
    nutzen:
      "Ein digitales Team füllt planbar die Kalender Ihrer Berater — Sie zahlen für Resultate, nicht für Aufwand.",
    accent: "#2DA8FF",
    accentSoft: "#EAF5FF",
    stats: [
      { value: "+200%", label: "mehr Conversions (Websites)", source: "Branchenstudie" },
      { value: "−70%", label: "Kosten pro Lead", source: "Branchenstudie" },
      { value: "+80%", label: "mehr Leads (Automation)", source: "Branchenstudie" },
    ],
    chart: {
      type: "radar",
      title: "Wirkungsprofil",
      axes: ["Mehr Leads", "Kosten/Lead", "Conversion", "Speed-to-Lead", "Reaktivierung"],
      agentic: [0.92, 0.8, 0.85, 0.96, 0.72],
      now: [0.45, 0.5, 0.4, 0.28, 0.35],
    },
    services: [
      {
        lead: "Leads-Aktivierung aus dem Archiv",
        short: "inaktive Kontakte neu ansprechen",
        long: "In Ihrem Archiv liegen Kontakte, die Sie längst bezahlt haben, aber nie ausgeschöpft wurden. Wir sprechen diese inaktiven Adressen automatisiert und zum richtigen Zeitpunkt wieder an. Das ist der günstigste Umsatz überhaupt – ganz ohne neue Werbekosten.",
      },
      {
        lead: "Leadgenerierung Google, Meta, TikTok",
        short: "Kampagnen auf allen Plattformen",
        long: "Wir bespielen die Kanäle, auf denen Ihre Kunden wirklich unterwegs sind – von Google über Meta bis TikTok. Kampagnen, Zielgruppen und Budgets steuern wir datenbasiert und laufend optimiert. So kommen planbar neue Anfragen herein, statt Budget zu verstreuen.",
      },
      {
        lead: "E-Mail-Leadkampagnen",
        short: "gezielte Mailings für neue Leads",
        long: "Mit durchdachten E-Mail-Strecken sprechen wir potenzielle Kunden gezielt und persönlich an. Inhalte und Timing sind auf das jeweilige Segment zugeschnitten. So werden aus kalten Adressen interessierte Kontakte.",
      },
      {
        lead: "Follow-Up-Kampagnen",
        short: "dranbleiben bis zur Antwort",
        long: "Die meisten Abschlüsse gehen verloren, weil niemand konsequent nachfasst. Unsere automatisierten Follow-Ups bleiben freundlich und beharrlich dran, bis eine Antwort kommt. So bleibt kein warmer Kontakt einfach liegen.",
      },
      {
        lead: "Datenanreicherung & Segmentierung",
        short: "Profile ergänzen & gruppieren",
        long: "Aus blossen Adressen machen wir verkaufsreife Profile, angereichert mit relevanten Zusatzinformationen. Anschliessend gruppieren wir die Kontakte in sinnvolle Segmente. So sprechen Sie jede Zielgruppe mit genau der passenden Botschaft an.",
      },
      {
        lead: "Webauftritte & Online-Rechner",
        short: "Seiten, die Leads bringen",
        long: "Wir bauen Webseiten und interaktive Online-Rechner, die Besucher gezielt in Anfragen verwandeln. Jedes Element ist auf Conversion ausgelegt, nicht nur auf schönes Design. So wird Ihr Webauftritt vom Schaufenster zur Lead-Maschine.",
      },
      {
        lead: "Diverse Lead-Magnete",
        short: "Anreize, die Kontakte liefern",
        long: "Checklisten, Rechner, Guides oder Aktionen geben Besuchern einen echten Grund, ihre Kontaktdaten zu hinterlassen. Wir entwickeln Lead-Magnete, die zu Ihrer Zielgruppe passen. So gewinnen Sie laufend neue Kontakte statt anonymer Besucher.",
      },
      {
        lead: "SEO, GEO & AIO",
        short: "gefunden in Suche & KI",
        long: "Wir sorgen dafür, dass Sie dort auftauchen, wo gesucht wird – in der klassischen Suche, lokal und zunehmend in KI-Antworten. SEO, lokale Sichtbarkeit (GEO) und KI-Optimierung (AIO) greifen dabei ineinander. So werden Sie gefunden, bevor es die Konkurrenz wird.",
      },
      {
        lead: "Sales-Funnels & Flywheel",
        short: "Pipeline, die sich selbst füllt",
        long: "Wir bauen durchdachte Funnels, die Interessenten Schritt für Schritt zum Abschluss führen. Im Zusammenspiel entsteht ein Flywheel, das sich mit jedem zufriedenen Kunden weiter beschleunigt. So füllt sich Ihre Pipeline planbar statt zufällig.",
      },
      {
        lead: "Sales-Support",
        short: "Unterstützung im Verkauf",
        long: "Ihr Verkaufsteam wird im Tagesgeschäft aktiv entlastet – von der Vorbereitung bis zur Nachverfolgung. Wir liefern Vorlagen, Daten und Automationen genau dann, wenn sie gebraucht werden. So bleibt mehr Zeit fürs eigentliche Verkaufen.",
      },
      {
        lead: "Wunschkunden-Radar",
        short: "kaufbereite Kontakte finden",
        long: "Statt mit der Giesskanne zu werben, spüren wir gezielt Kontakte mit echtem, aktuellem Bedarf auf. Aus Signalen und Daten entsteht eine Liste kaufbereiter Profile. So investieren Sie Ihr Budget nur dort, wo Abschluss-Potenzial steckt.",
      },
      {
        lead: "Bestands-Reaktivierung",
        short: "alte Verträge wieder ansprechen",
        long: "Auslaufende oder vergessene Verträge sind ideale Verkaufsanlässe. Wir erkennen den richtigen Moment und sprechen die Kunden automatisiert wieder an. So holen Sie Umsatz aus Beziehungen, die längst bestehen.",
      },
      {
        lead: "Zwillings-Zielgruppen",
        short: "mehr wie Ihre besten Kunden",
        long: "Wir analysieren, was Ihre profitabelsten Kunden gemeinsam haben, und suchen gezielt nach ähnlichen Profilen. So gewinnen Sie planbar mehr von der Sorte Kunden, die wirklich zu Ihnen passt. Das bedeutet weniger Streuverlust und höhere Abschlussquoten.",
      },
      {
        lead: "Sekunden-Reaktion",
        short: "sofort auf Anfragen reagieren",
        long: "Wer zuerst antwortet, gewinnt in den meisten Fällen den Auftrag. Unser System reagiert in Sekunden, während das Interesse noch frisch ist. So verlieren Sie keine Leads mehr an schnellere Mitbewerber.",
      },
      {
        lead: "24/7-Erreichbarkeit",
        short: "keine Anfrage geht verloren",
        long: "Anfragen kommen abends, am Wochenende und in der Mittagspause. Ein KI-Agent nimmt rund um die Uhr an und hält den Kontakt warm. So geht keine Anfrage mehr verloren, nur weil gerade niemand da ist.",
      },
      {
        lead: "Mehrkanal-Ansprache",
        short: "Mail, SMS, WhatsApp, Telefon",
        long: "Jeder Kunde hat seinen bevorzugten Kanal – wir bedienen sie alle aus einer Hand. Ob Mail, SMS, WhatsApp oder Telefon, die Ansprache bleibt konsistent und persönlich. So erreichen Sie Menschen dort, wo sie wirklich reagieren.",
      },
      {
        lead: "Auto-Terminvereinbarung",
        short: "fixe Rückruftermine",
        long: "Statt Telefon-Pingpong bucht das System passende Termine direkt in den Kalender Ihrer Berater. Bestätigungen und Erinnerungen laufen automatisch, No-Shows sinken. So bekommen Ihre Verkäufer volle, verlässliche Kalender.",
      },
      {
        lead: "Werbe-Effizienz",
        short: "Budget, das Kunden bringt",
        long: "Wir messen jeden Franken Werbebudget an echten Resultaten, nicht an Klicks. Kampagnen werden laufend auf die profitabelsten Kanäle und Botschaften ausgerichtet. So fliesst Ihr Budget dorthin, wo es tatsächlich Kunden bringt.",
      },
      {
        lead: "Dynamische Landingpages",
        short: "individuelle Ansprache je Besucher",
        long: "Landingpages passen sich automatisch an Herkunft, Kampagne und Interesse des Besuchers an. Jeder sieht die für ihn relevanteste Botschaft. Das hebt die Conversion deutlich gegenüber statischen Standardseiten.",
      },
    ],
    meta: {
      title: "Agentic Acquire – Neukunden gewinnen mit KI | AgenticIT",
      description:
        "Mehr qualifizierte Termine ohne Mehraufwand: Leadgenerierung, Reaktivierung, Sekunden-Reaktion und automatische Terminvereinbarung. Schweizer KI, revDSG-konform.",
    },
  },
  {
    slug: "angebot/convert",
    key: "convert",
    navLabel: "Convert",
    name: "Agentic Convert",
    german: "Konvertieren",
    icon: "⚡",
    eyebrow: "Schneller abschliessen",
    tagline: "Aus Interessenten werden Kunden — schneller und mit höherer Quote.",
    nutzen:
      "Weniger liegengebliebene Chancen, kürzere Verkaufszyklen und mehr Abschlüsse aus denselben Leads.",
    accent: "#22C55E",
    accentSoft: "#EAFBF0",
    stats: [
      { value: "bis +20%", label: "Abschlussquote (Ø)", source: "Branchenstudie" },
      { value: "−40%", label: "Zeit bis zur Offerte", source: "Branchenstudie" },
      { value: "+15–30%", label: "Verkaufs-Boost (KI)", source: "Branchenstudie" },
    ],
    chart: {
      type: "funnel",
      title: "Verkaufstrichter (illustrativ)",
      steps: [
        { label: "Interessenten", pct: 100 },
        { label: "Gespräche", pct: 64 },
        { label: "Offerten", pct: 40 },
        { label: "Abschlüsse", pct: 24 },
      ],
    },
    services: [
      {
        lead: "Beratungs-Briefing",
        short: "Kundeninfos auf einen Blick",
        long: "Vor jedem Gespräch stellt der Agent alle wichtigen Informationen zum Kunden übersichtlich zusammen. Ihr Berater sieht Historie, Bedarf und offene Punkte auf einen Blick. So startet er bestens vorbereitet und wirkt sofort kompetent.",
      },
      {
        lead: "Blitz-Offerte",
        short: "Vergleiche & Angebote in Minuten",
        long: "Aus den Eckdaten erstellt das System verständliche Vergleiche und fertige Offerten in Ihrem Namen. Der Kunde erhält sein Angebot in Minuten statt Tagen – solange das Interesse hoch ist. Diese Schnelligkeit entscheidet oft über Abschluss oder Absage.",
      },
      {
        lead: "Foto-Erfassung",
        short: "fotografieren statt abtippen",
        long: "Ausweis, Police oder Vertrag werden einfach abfotografiert statt mühsam abgetippt. Das System liest die Angaben aus und übernimmt sie automatisch. Das spart Zeit, vermeidet Tippfehler und macht den Abschluss angenehmer.",
      },
      {
        lead: "Abschluss-Pilot",
        short: "automatisch nachfassen",
        long: "Der Abschluss-Pilot bleibt nach dem Erstkontakt automatisch dran – mit der richtigen Nachricht zum richtigen Zeitpunkt. Kein warmer Lead wird vergessen. So steigt die Abschlussquote ganz ohne zusätzlichen Aufwand.",
      },
      {
        lead: "Einwand-Assistent",
        short: "passende Antworten parat",
        long: "Auf «zu teuer», «keine Zeit» oder «muss überlegen» gibt es immer die passende Antwort. Der Assistent liefert sie in Echtzeit und coacht Ihr Team dabei. So führen auch weniger erfahrene Verkäufer Gespräche souverän zum Ziel.",
      },
      {
        lead: "Digital-Signatur",
        short: "Unterschrift in Minuten",
        long: "Sobald der Kunde Ja sagt, wird der Vertrag digital und rechtsgültig unterschrieben. Kein Drucken, Scannen oder Postweg bremst den Abschluss. So kühlt kein Deal mehr im Papierkram ab.",
      },
      {
        lead: "Zusatz-Verkauf",
        short: "passende Ergänzungen anbieten",
        long: "Zum richtigen Zeitpunkt schlägt das System passende Zusatz- und Ergänzungsangebote vor. So steigt der Wert jedes Abschlusses, ohne aufdringlich zu wirken. Cross- und Up-Selling werden zum planbaren Teil jedes Verkaufs.",
      },
      {
        lead: "Deal-Retter",
        short: "festgefahrene Fälle lösen",
        long: "Manche Deals bleiben stecken – der Kunde meldet sich nicht mehr, die Offerte verstaubt. Der Deal-Retter erkennt solche Fälle und bringt sie mit gezielten Impulsen wieder in Bewegung. So wird aus «vielleicht später» doch noch ein Abschluss.",
      },
      {
        lead: "Kaufreue-Behandlung",
        short: "Zweifel nach dem Kauf auflösen",
        long: "Direkt nach dem Kauf kommen oft Zweifel. Wir bestätigen den Kunden aktiv in seiner Entscheidung und nehmen ihm die Unsicherheit. Das senkt Stornos und Widerrufe spürbar.",
      },
      {
        lead: "Kontakt-Warmhalten",
        short: "Interessenten warm halten",
        long: "Nicht jeder Interessent entscheidet sofort – viele brauchen Zeit. Wir halten den Kontakt mit relevanten Impulsen warm, ohne aufdringlich zu sein. So sind Sie präsent, wenn die Entscheidung reift.",
      },
      {
        lead: "Heiss-Lead-Weiche",
        short: "sofort zum richtigen Berater",
        long: "Kaufbereite Anfragen erkennt das System sofort und leitet sie unverzüglich an den passenden Berater weiter. Kein heisser Lead wartet in der Warteschleife. So landet das grösste Potenzial dort, wo es am schnellsten zum Abschluss kommt.",
      },
      {
        lead: "Chancen-Wecker",
        short: "verlorene Anfragen neu prüfen",
        long: "Abgesagte oder liegengebliebene Chancen sind selten endgültig verloren. Wir prüfen sie systematisch erneut und reaktivieren sie, wenn sich die Situation ändert. So holen Sie Umsatz zurück, den die meisten abgeschrieben hätten.",
      },
      {
        lead: "KI-Call-Assistent mit Coaching",
        short: "Live-Hilfe & Tipps im Gespräch",
        long: "Während des Telefonats gibt der KI-Assistent live Hinweise, Argumente und nächste Schritte. Ihr Team wird im Gespräch gecoacht, statt erst danach. So steigen Gesprächsqualität und Abschlussquote spürbar.",
      },
      {
        lead: "Omnichannel-Call-Software",
        short: "alle Kanäle in einer Oberfläche",
        long: "Telefon, Chat und Messaging laufen in einer einzigen Oberfläche zusammen. Ihr Team verliert keinen Kontext mehr zwischen den Kanälen. So wird jede Konversation nahtlos weitergeführt.",
      },
      {
        lead: "Auto-Nummernwahl & Transkript",
        short: "Wählen, Notizen & Gesprächsmitschrift",
        long: "Das System wählt automatisch, protokolliert das Gespräch und erstellt Notizen. Ihr Team muss nicht mehr nebenbei mitschreiben. So ist alles dokumentiert und nichts geht verloren.",
      },
    ],
    meta: {
      title: "Agentic Convert – schneller abschliessen mit KI | AgenticIT",
      description:
        "Aus Interessenten werden Kunden: Blitz-Offerten, Abschluss-Pilot, Einwand-Assistent und digitale Unterschrift. Höhere Quote, kürzere Verkaufszyklen.",
    },
  },
  {
    slug: "angebot/retain",
    key: "retain",
    navLabel: "Retain",
    name: "Agentic Retain",
    german: "Binden",
    icon: "🔄",
    eyebrow: "Kunden halten & ausbauen",
    tagline: "Mehr Umsatz pro Kunde — und Kunden, die bleiben und weiterempfehlen.",
    nutzen:
      "Höhere Verlängerungsquoten, weniger Abwanderung und planbare Empfehlungen statt teurer Neuakquise.",
    accent: "#16C7C0",
    accentSoft: "#E6FAF8",
    stats: [
      { value: "−20%", label: "Abwanderung (Frühwarnung)", source: "Branchenstudie" },
      { value: "+70%", label: "Umsatz via Empfehlungen", source: "Branchenstudie" },
      { value: "+25%", label: "Kundenwert (CLV)", source: "Branchenstudie" },
    ],
    chart: {
      type: "line",
      title: "Kundenwert über Zeit (Index)",
      xLabels: ["Start", "+3 Mt.", "+6 Mt.", "+12 Mt."],
      agentic: [100, 120, 142, 170],
      now: [100, 104, 107, 108],
    },
    services: [
      {
        lead: "Willkommens-Strecke",
        short: "starker Start ab Tag eins",
        long: "Der erste Eindruck nach dem Abschluss prägt die ganze Beziehung. Eine durchdachte Willkommens-Strecke begrüsst neue Kunden professionell und nimmt ihnen jede Unsicherheit. So fühlen sie sich ab Tag eins gut aufgehoben.",
      },
      {
        lead: "Reue-Schutz",
        short: "weniger Stornos",
        long: "Nach dem Kauf kommen oft Zweifel, die zu Stornos führen. Wir bestätigen den Kunden aktiv in seiner Wahl und begleiten ihn durch die erste Phase. Das senkt Widerrufe und festigt die Beziehung.",
      },
      {
        lead: "Lebensphasen-Radar",
        short: "Umzug, Familie, Pension",
        long: "Lebensereignisse wie Umzug, Familienzuwachs oder Pensionierung sind ideale Anlässe für passende Angebote. Wir erkennen diese Momente und melden uns, wenn der Bedarf real ist. Das wirkt aufmerksam statt verkäuferisch.",
      },
      {
        lead: "Verlängerungs-Pilot",
        short: "kein Vertrag läuft unbemerkt aus",
        long: "Verträge laufen oft unbemerkt aus – und mit ihnen der Umsatz. Der Verlängerungs-Pilot meldet sich automatisch rechtzeitig, etwa 90, 60 und 30 Tage vorher. So sichern Sie Verlängerungen, bevor der Kunde über einen Wechsel nachdenkt.",
      },
      {
        lead: "Kündigungs-Frühwarnung",
        short: "Abwanderung früh erkennen",
        long: "Kunden kündigen selten aus heiterem Himmel – es gibt Frühwarnsignale. Wir erkennen sinkende Aktivität oder Unzufriedenheit rechtzeitig und schlagen Gegenmassnahmen vor. So stoppen Sie Abwanderung, solange sich der Kunde noch halten lässt.",
      },
      {
        lead: "Zufriedenheits-Check",
        short: "Feedback nutzen",
        long: "Wir holen systematisch Feedback ein und machen die Stimmung Ihrer Kunden sichtbar. Daraus leiten wir konkrete Verbesserungen ab. So steigt die Zufriedenheit kontinuierlich – und mit ihr die Treue.",
      },
      {
        lead: "Bewertungs-Booster",
        short: "mehr gute Bewertungen",
        long: "Online-Bewertungen entscheiden heute mit über neue Kunden. Wir bitten zufriedene Kunden im richtigen Moment um eine Bewertung und machen es ihnen leicht. So entsteht ein starker Ruf, der von selbst neue Anfragen bringt.",
      },
      {
        lead: "Empfehlungs-Programm",
        short: "Kunden werben Kunden",
        long: "Empfehlungen sind die wertvollsten Leads, aber kaum jemand fragt aktiv danach. Wir machen «Kunden werben Kunden» zu einem planbaren Programm mit echtem Anreiz. So wird Mundpropaganda zu einem verlässlichen Wachstumskanal.",
      },
      {
        lead: "Aufmerksamkeits-Service",
        short: "Geburtstag, Jubiläum",
        long: "Geburtstag, Jubiläum oder ein kleiner Dank zur richtigen Zeit bleiben in Erinnerung. Wir steuern diese Gesten automatisiert, ohne dass sie aufgesetzt wirken. So fühlt sich der Kunde gesehen und bleibt aus Überzeugung.",
      },
      {
        lead: "Bestands-Ausbau",
        short: "Zusatzlösungen anbieten",
        long: "In Ihrem Bestand steckt mehr Potenzial, als die meisten nutzen. Wir bieten passenden Kunden zum richtigen Zeitpunkt sinnvolle Zusatzlösungen an. Das bringt zusätzlichen Umsatz – deutlich günstiger als Neuakquise.",
      },
      {
        lead: "Win-back",
        short: "inaktive Kunden zurückholen",
        long: "Inaktive Kunden sind selten für immer verloren. Wir sprechen sie gezielt und mit dem richtigen Anlass wieder an. So holen Sie schlummernde Umsätze zurück ins Boot.",
      },
      {
        lead: "Reputations-Monitor",
        short: "Stimmen im Netz beobachten",
        long: "Was online über Sie gesagt wird, beeinflusst Ihren Ruf rund um die Uhr. Wir beobachten Bewertungen und Erwähnungen und melden Wichtiges sofort. So reagieren Sie schnell auf Kritik und verstärken positive Stimmen.",
      },
      {
        lead: "Kunden-Lebenszeit-Management",
        short: "Wert über die ganze Beziehung steigern",
        long: "Wir betrachten nicht den einzelnen Abschluss, sondern die gesamte Kundenbeziehung. Über alle Phasen hinweg steuern wir Massnahmen, die den Kundenwert erhöhen. So steigt der Ertrag pro Kunde über die ganze Lebenszeit.",
      },
    ],
    meta: {
      title: "Agentic Retain – Kunden binden & ausbauen mit KI | AgenticIT",
      description:
        "Höhere Verlängerungsquoten, weniger Abwanderung, mehr Empfehlungen: Willkommens-Strecke, Kündigungs-Frühwarnung, Win-back und Empfehlungs-Programm.",
    },
  },
  {
    slug: "angebot/operate",
    key: "operate",
    navLabel: "Operate",
    name: "Agentic Operate",
    german: "Betreiben",
    icon: "⚙️",
    eyebrow: "Betrieb automatisieren",
    tagline: "Stunden zurückgewinnen — Ihr Team konzentriert sich aufs Wesentliche.",
    nutzen:
      "Spürbar weniger Administration, tiefere Kosten und ein Betrieb, der auch dann läuft, wenn niemand Zeit hat.",
    accent: "#F59E0B",
    accentSoft: "#FFF4E2",
    stats: [
      { value: "70%", label: "weniger Admin-Zeit", source: "Branchenstudie" },
      { value: "50%", label: "schnellere Bearbeitung", source: "Branchenstudie" },
      { value: "60%", label: "tiefere Prozesskosten", source: "Branchenstudie" },
    ],
    chart: {
      type: "donut",
      title: "Zeit gewonnen nach Bereich",
      segments: [
        { label: "Büro & Verwaltung", value: 32, color: "#F59E0B" },
        { label: "Buchhaltung", value: 24, color: "#2DA8FF" },
        { label: "Daten & CRM", value: 18, color: "#16C7C0" },
        { label: "Telefon", value: 14, color: "#22C55E" },
        { label: "HR", value: 12, color: "#94A3B8" },
      ],
    },
    services: [
      {
        lead: "CRM-Management",
        short: "Kundendaten zentral gepflegt",
        long: "Ihre Kundendaten werden zentral, aktuell und dublettenfrei gehalten. Jede Information ist dort, wo Ihr Team sie braucht. So ist auf jede Auskunft Verlass – im Vertrieb wie in der Verwaltung.",
      },
      {
        lead: "Buchhaltung-Automatisierung",
        short: "Rechnungen, Belege, Mahnwesen",
        long: "Rechnungen stellen, Belege erfassen und Mahnungen versenden läuft automatisch im Hintergrund. Offene Posten werden pünktlich nachgefasst, ohne dass jemand daran denken muss. Das verbessert Ihre Liquidität und spart Bürozeit.",
      },
      {
        lead: "KI-Assistent Mail-Beantwortung",
        short: "E-Mails automatisch beantwortet",
        long: "Wiederkehrende Anfragen beantwortet der KI-Assistent selbstständig und in Ihrem Ton. Standardfälle sind erledigt, bevor sie liegenbleiben. So bleibt Ihr Posteingang im Griff, statt zur täglichen Last zu werden.",
      },
      {
        lead: "Termin-Koordination & Korrespondenz",
        short: "Termine & Schriftverkehr",
        long: "Terminfindung und Schriftverkehr laufen automatisiert und ohne ständiges Hin und Her. Slots werden vorgeschlagen, gebucht und bestätigt. So sind Termine vereinbart und Korrespondenz erledigt, bevor sie zur Aufgabe wird.",
      },
      {
        lead: "VBV Learn App",
        short: "Schulungs-App fürs Team",
        long: "Mit einer eigenen Lern-App nehmen Sie Ihr Team beim Thema KI und neuen Abläufen aktiv mit. Inhalte sind kurz, praxisnah und jederzeit verfügbar. So bauen Sie Berührungsängste ab und steigern die Kompetenz im Team.",
      },
      {
        lead: "Digital Give-Aways",
        short: "digitale Aufmerksamkeiten",
        long: "Digitale Aufmerksamkeiten schaffen positive Momente bei Kunden und Mitarbeitenden. Wir gestalten und versenden sie automatisiert zum richtigen Anlass. So bleibt Ihre Marke sympathisch in Erinnerung.",
      },
      {
        lead: "KI-Talent-Scouting",
        short: "passende Kandidaten finden",
        long: "Gute Leute zu finden ist aufwändig und langsam. Wir spüren passende Kandidaten gezielt auf und sprechen sie an. So besetzen Sie offene Stellen schneller und mit den richtigen Personen.",
      },
      {
        lead: "Daten-Anreicherung & Segmentierung",
        short: "Profile ergänzen & gruppieren",
        long: "Aus blossen Adressen machen wir vollständige, angereicherte Profile und gruppieren sie sinnvoll. Saubere, segmentierte Daten sind die Grundlage für jede gezielte Ansprache. So arbeitet Ihr ganzer Betrieb auf verlässlicher Datenbasis.",
      },
      {
        lead: "Kommunikations-Automatisierung",
        short: "Nachrichten im richtigen Moment",
        long: "Wir automatisieren Nachrichten so, dass sie genau im richtigen Moment ankommen. Erinnerungen, Bestätigungen und Hinweise laufen von selbst. So bleibt die Kommunikation konsistent, ohne manuellen Aufwand.",
      },
      {
        lead: "Customer-Journey-Management",
        short: "Kundenreise steuern",
        long: "Wir modellieren die Reise Ihrer Kunden und steuern jeden Kontaktpunkt bewusst. Übergänge zwischen den Phasen laufen reibungslos und nichts fällt durchs Raster. So wird aus einzelnen Kontakten ein durchgängiges Erlebnis.",
      },
      {
        lead: "KI-Telefonempfang",
        short: "immer erreichbar",
        long: "Der KI-Telefonempfang nimmt jeden Anruf entgegen, beantwortet Standardfragen und leitet bei Bedarf weiter. Auch nach Feierabend geht niemand mehr ins Leere. So ist Ihr Betrieb immer erreichbar, ohne Dauerbesetzung.",
      },
      {
        lead: "KI-Website-Concierge",
        short: "Besucher beraten & führen",
        long: "Auf Ihrer Website beantwortet ein KI-Concierge Fragen und führt Besucher zum passenden Angebot. Aus anonymen Besuchern werden geführte Interessenten. So steigt die Conversion, ohne dass jemand permanent bereitstehen muss.",
      },
      {
        lead: "Fahrtenbuch & Belegscanner",
        short: "Spesen & Belege automatisch",
        long: "Fahrten und Belege werden automatisch erfasst und korrekt zugeordnet. Statt Zettelwirtschaft entsteht eine saubere, prüffeste Ablage. So sparen Sie Zeit und bleiben jederzeit auskunftsfähig.",
      },
      {
        lead: "Webrechner & Sales-Software",
        short: "Online-Rechner & Verkaufstools",
        long: "Wir entwickeln Online-Rechner und Verkaufstools, die Beratung und Abschluss erleichtern. Kunden erhalten sofort konkrete Ergebnisse, Ihr Team die passenden Hilfsmittel. So wird aus Interesse schneller ein Abschluss.",
      },
      {
        lead: "Onboarding Kunden & Talente",
        short: "neue Kunden & Mitarbeitende startklar",
        long: "Strukturierte Onboarding-Abläufe machen neue Kunden und Mitarbeitende schnell startklar. Alles Wichtige passiert automatisch zur richtigen Zeit. So sind alle früher produktiv und fühlen sich gut begleitet.",
      },
      {
        lead: "Termin-/Login-App & Sales",
        short: "Termine, Zugang & Verkauf gebündelt",
        long: "Eine App bündelt Terminbuchung, Kundenzugang und Verkauf an einem Ort. Kunden erledigen alles bequem selbst, Ihr Team behält den Überblick. So vereinfachen Sie Abläufe und schaffen zusätzliche Verkaufsmomente.",
      },
      {
        lead: "Gamification",
        short: "spielerische Anreize & Motivation",
        long: "Mit spielerischen Anreizen motivieren Sie Team und Kunden nachhaltig. Fortschritt wird sichtbar, gewünschtes Verhalten belohnt. So steigern Sie Engagement und Mitmachen ganz ohne Druck.",
      },
    ],
    meta: {
      title: "Agentic Operate – Betrieb automatisieren mit KI | AgenticIT",
      description:
        "Stunden zurückgewinnen: CRM-Hygiene, Buchhaltung, Mail-Assistent, Termin-Koordination und KI-Telefonempfang. Weniger Admin, tiefere Prozesskosten.",
    },
  },
]

export const ANGEBOT_BY_KEY: Record<string, AngebotArea> = ANGEBOT_AREAS.reduce(
  (acc, a) => {
    acc[a.key] = a
    return acc
  },
  {} as Record<string, AngebotArea>,
)

// Für die Navigation (Dropdown unter „Angebot")
export const ANGEBOT_NAV_SUBS = ANGEBOT_AREAS.map((a) => ({
  navLabel: a.navLabel,
  slug: a.slug,
}))

// Kuratierte „Auswahl" wie auf dem Leistungs-Flyer (8 Highlights pro Bereich).
// Bewusst kürzer als die vollständige Liste (= Accordion „Alle Leistungen im Detail").
export const ANGEBOT_AUSWAHL: Record<string, { lead: string; text: string }[]> = {
  acquire: [
    { lead: "Leadgenerierung auf allen Kanälen", text: "Suche, Social & E-Mail — planbar neue Anfragen." },
    { lead: "Wunschkunden-Radar", text: "Genau die Kontakte, die jetzt kaufbereit sind." },
    { lead: "Archiv- & Bestands-Reaktivierung", text: "Umsatz aus Kontakten, die Sie längst haben." },
    { lead: "Daten anreichern & segmentieren", text: "Aus Adressen werden verkaufsreife Profile." },
    { lead: "Webauftritte, Rechner & Lead-Magnete", text: "Seiten, die Besucher in Anfragen verwandeln." },
    { lead: "Sekunden-Reaktion & 24/7-Erreichbarkeit", text: "Wer zuerst antwortet, gewinnt." },
    { lead: "Sichtbarkeit in Suche & KI", text: "Gefunden werden, wo Kunden suchen." },
    { lead: "Automatische Terminvereinbarung", text: "Volle Berater-Kalender, ganz automatisch." },
  ],
  convert: [
    { lead: "Beratungs-Briefing & Blitz-Offerte", text: "Alles parat — Angebote in Minuten." },
    { lead: "Foto-Erfassung statt Abtippen", text: "Dokumente fotografieren, fertig." },
    { lead: "Abschluss-Pilot & Follow-up", text: "Kein Abschluss bleibt liegen." },
    { lead: "Einwand-Assistent mit Coaching", text: "Souveräne Antwort auf jeden Einwand." },
    { lead: "Digitale Unterschrift", text: "Vom Ja zur Unterschrift in Minuten." },
    { lead: "Zusatz- & Cross-Selling", text: "Mehr Wert aus jedem Abschluss." },
    { lead: "Deal-Retter & Kaufreue-Schutz", text: "Festgefahrene Fälle lösen, Stornos vermeiden." },
    { lead: "Omnichannel-Telefonie & Transkript", text: "Wählen, Notizen & Mitschrift automatisch." },
  ],
  retain: [
    { lead: "Willkommens-Strecke", text: "Starker Start ab Tag eins." },
    { lead: "Verlängerungs-Pilot (90/60/30 T.)", text: "Höhere Verlängerungsquote, automatisch." },
    { lead: "Kündigungs-Frühwarnung", text: "Abwanderung stoppen, bevor sie passiert." },
    { lead: "Bestands-Ausbau & Lebensphasen", text: "Umzug, Familie, Pension als Verkaufsanlass." },
    { lead: "Win-back inaktiver Kunden", text: "Schlummernde Umsätze reaktivieren." },
    { lead: "Empfehlungs-Programm", text: "Kunden werben Kunden — planbar." },
    { lead: "Bewertungs-Booster", text: "Mehr und bessere Bewertungen." },
    { lead: "Kunden-Lebenszeit-Management", text: "Mehr Wert über die ganze Beziehung." },
  ],
  operate: [
    { lead: "CRM-Management & Datenhygiene", text: "Saubere Daten, auf die Verlass ist." },
    { lead: "Buchhaltung & Belege automatisch", text: "Rechnungen, Mahnwesen, Spesen ohne Aufwand." },
    { lead: "KI-Mail- & Korrespondenz-Assistent", text: "Posteingang & Schriftverkehr im Griff." },
    { lead: "Termin-Koordination", text: "Planung ohne Hin und Her." },
    { lead: "KI-Telefonempfang & Website-Concierge", text: "Immer erreichbar, auch nach Feierabend." },
    { lead: "Talent-Scouting & Onboarding", text: "Passende Leute finden & startklar machen." },
    { lead: "Webrechner & Sales-Software", text: "Online-Rechner & Verkaufstools." },
    { lead: "Team-Schulung & Gamification", text: "Mitarbeitende mitnehmen, spielerisch motiviert." },
  ],
}
