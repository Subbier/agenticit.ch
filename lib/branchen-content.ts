// Branchen-Landingpages – Inhalte extrahiert aus den HTML-Quellen (MASTER/04_Landingpages),
// redaktionell gestrafft für das Design "Carbon & Signal". Reine Daten, keine Imports.

export type LpBullet = { lead: string; text: string }
export type LpFaq = { q: string; a: string }
export type LpStat = { value: string; label: string }

export type BranchenLp = {
  slug: string
  navLabel: string
  meta: { title: string; description: string }
  keywords: string[]
  hero: { eyebrow: string; title: string; kicker?: string; body: string[] }
  pains: { title: string; intro?: string; bullets: LpBullet[] }
  solutions: { title: string; intro?: string; bullets: LpBullet[] }
  steps?: { title: string; items: LpBullet[] }
  stats?: LpStat[]
  faq: LpFaq[]
}

export const BRANCHEN_LPS: BranchenLp[] = [
  // ── 1 · Treuhand ────────────────────────────────────────────────────────────
  {
    slug: "treuhand",
    navLabel: "Treuhand",
    meta: {
      title: "KI-Agenten für Treuhänder & Treuhandbüros",
      description:
        "KI-Agenten für Schweizer Treuhandbüros: Belegverarbeitung, Mandantenkommunikation und Fristen automatisieren – nDSG-konform, mit menschlicher Freigabe.",
    },
    keywords: [
      "KI-Agenten Treuhand",
      "Treuhandbüro automatisieren",
      "Belegverarbeitung KI",
      "Mandantenkommunikation automatisieren",
      "Fristenmanagement Treuhand",
      "KI Treuhänder Schweiz",
    ],
    hero: {
      eyebrow: "Branchen · Treuhand",
      title: "KI-Agenten für Treuhänder und Treuhandbüros",
      kicker: "Repetitive, terminkritische Aufgaben binden Ihre Fachkräfte – genau dort setzen KI-Agenten an.",
      body: [
        "Belegverarbeitung, Mandantenkommunikation und Fristen automatisieren – damit sich Ihr Team auf Beratung und anspruchsvolle Mandate konzentriert. nDSG-konform, mit menschlicher Freigabe bei jeder Aktion mit Aussenwirkung.",
      ],
    },
    pains: {
      title: "Wo Treuhandbüros am meisten Zeit verlieren",
      intro:
        "In der Treuhandbranche binden repetitive, terminkritische Aufgaben wertvolle Fachkräfte – ohne dass sie fachliche Beurteilung erfordern.",
      bullets: [
        {
          lead: "Belegflut",
          text: "Belege und Rechnungen manuell erfassen und vorkontieren kostet Stunden, die in der Beratung fehlen.",
        },
        {
          lead: "Wiederkehrende Mandantenanfragen",
          text: "Statusauskünfte und Unterlagen-Nachforderungen unterbrechen die konzentrierte Arbeit am Mandat – immer wieder.",
        },
        {
          lead: "Fristen- und Dokumentendruck",
          text: "Fristenüberwachung, Ablage und Erinnerungen müssen lückenlos laufen – manuell ist das fehleranfällig und aufwendig.",
        },
      ],
    },
    solutions: {
      title: "Was KI-Agenten im Treuhandbüro übernehmen",
      intro: "Repetitive Arbeit wird automatisiert – die fachliche Verantwortung bleibt unangetastet bei Ihrem Team.",
      bullets: [
        {
          lead: "Belegvorerfassung",
          text: "KI-Agenten lesen Belege und Rechnungen aus und bereiten Buchungsvorschläge vor. Freigabe und Kontierung bleiben beim Menschen.",
        },
        {
          lead: "Mandantenkommunikation",
          text: "Wiederkehrende Anfragen wie Statusauskünfte und Unterlagen-Nachforderungen werden automatisch beantwortet – transparent als KI gekennzeichnet.",
        },
        {
          lead: "Fristen und Dokumente",
          text: "Fristenüberwachung, Dokumenten-Ablage und Erinnerungen laufen automatisiert und lückenlos.",
        },
        {
          lead: "Wiederkehrende Reports",
          text: "Die Vorbereitung regelmässiger Auswertungen und Reports wird automatisiert – die fachliche Beurteilung bleibt bei den Treuhänderinnen und Treuhändern.",
        },
      ],
    },
    steps: {
      title: "So führen wir KI-Agenten in Ihrem Büro ein",
      items: [
        {
          lead: "Use-Case-Priorisierung",
          text: "Wir identifizieren den Prozess mit dem grössten Hebel – nach Volumen und Regelhaftigkeit.",
        },
        {
          lead: "Anbindung und Datenbasis",
          text: "Sichere Integration in Ihre Treuhand-Software und Aufbau einer sauberen Wissensbasis.",
        },
        {
          lead: "Pilot mit Leitplanken",
          text: "Start im assistierenden Modus – jede Aktion mit Aussenwirkung wird von einem Menschen freigegeben.",
        },
        {
          lead: "Messen und skalieren",
          text: "Zeitersparnis und Qualität messen, dann auf weitere Prozesse ausrollen.",
        },
      ],
    },
    stats: [
      { value: "24/7", label: "Mandanten-Erstauskunft – auch ausserhalb der Bürozeiten" },
      { value: "Stufe 1", label: "Wiederkehrende Anfragen automatisch beantwortet" },
      { value: "100 %", label: "Menschliche Freigabe bei kritischen Aktionen" },
    ],
    faq: [
      {
        q: "Sind KI-Agenten im Treuhandwesen datenschutzkonform?",
        a: "Ja. AgenticIT arbeitet nDSG- und DSGVO-konform: Datenminimierung, Zweckbindung, klare Auftragsverarbeitung und Human-in-the-Loop bei Aktionen mit Aussenwirkung. Mandantendaten werden vertraulich behandelt.",
      },
      {
        q: "Welche Aufgaben können KI-Agenten im Treuhandbüro übernehmen?",
        a: "Belegvorerfassung, Mandantenkommunikation der Stufe 1, Fristen- und Dokumentenmanagement sowie die Vorbereitung wiederkehrender Reports. Fachliche Beurteilungen bleiben beim Menschen.",
      },
      {
        q: "Ersetzen KI-Agenten Treuhänderinnen und Treuhänder?",
        a: "Nein. Sie übernehmen repetitive Arbeit und schaffen Zeit für Beratung und komplexe Mandate. Fachliche Verantwortung und Freigaben bleiben bei Ihrem Team (Human-in-the-Loop).",
      },
    ],
  },

  // ── 2 · Versicherungen ──────────────────────────────────────────────────────
  {
    slug: "versicherungen",
    navLabel: "Versicherungen",
    meta: {
      title: "Kundenservice-KI für Versicherungen & Krankenkassen",
      description:
        "Kundenservice-KI für Versicherer und Krankenkassen: Anfragen automatisch beantworten, Schaden-Triage und Statusauskünfte – nDSG-konform, mit Human-in-the-Loop.",
    },
    keywords: [
      "Kundenservice-KI Versicherung",
      "KI Krankenkasse Schweiz",
      "Schaden-Triage automatisieren",
      "Versicherung Anfragen automatisieren",
      "KI-Agenten Versicherer",
    ],
    hero: {
      eyebrow: "Branchen · Versicherungen & Krankenkassen",
      title: "Kundenservice-KI für Versicherer und Krankenkassen",
      kicker: "Hohes Anfragevolumen mit klaren Mustern – das ideale Einsatzfeld für Kundenservice-KI.",
      body: [
        "Wiederkehrende Versichertenanfragen automatisch beantworten, Schäden vortriagieren und Statusauskünfte rund um die Uhr geben – transparent gekennzeichnet, mit sauberer Eskalation an Menschen. Fachliche Leistungsentscheide werden nicht automatisiert.",
      ],
    },
    pains: {
      title: "Wo der Kundenservice heute an Grenzen stösst",
      bullets: [
        {
          lead: "Hohes Anfragevolumen",
          text: "Policen-, Deckungs- und Statusfragen kommen in grosser Zahl – die meisten folgen klaren Mustern und binden trotzdem Fachkräfte.",
        },
        {
          lead: "Erreichbarkeit ausserhalb der Bürozeiten",
          text: "Versicherte erwarten Antworten auch abends und am Wochenende – ohne KI bleibt die Erstauskunft liegen.",
        },
        {
          lead: "Manuelles Dokumenten-Handling",
          text: "Fehlende Unterlagen nachfordern und eingehende Dokumente zuordnen kostet Zeit, die in der Fallbearbeitung fehlt.",
        },
        {
          lead: "Unstrukturierte Schadenmeldungen",
          text: "Meldungen ohne Vorstrukturierung landen beim falschen Team und verzögern die Bearbeitung.",
        },
      ],
    },
    solutions: {
      title: "Wo Versicherer und Krankenkassen entlastet werden",
      intro: "Kundenservice-KI übernimmt die Stufe 1 – ohne dass fachliche Leistungsentscheide automatisiert werden.",
      bullets: [
        {
          lead: "Erstauskunft rund um die Uhr",
          text: "Policen-, Deckungs- und Statusfragen der Stufe 1 werden sofort beantwortet – auch ausserhalb der Bürozeiten.",
        },
        {
          lead: "Schaden-Ersttriage",
          text: "Meldungen werden strukturiert erfasst, kategorisiert und dem richtigen Team zugewiesen. Der Leistungsentscheid bleibt beim Menschen.",
        },
        {
          lead: "Dokumenten-Handling",
          text: "Fehlende Unterlagen werden automatisch nachgefordert, eingehende Dokumente korrekt zugeordnet.",
        },
        {
          lead: "Terminanfragen",
          text: "Terminwünsche werden entgegengenommen und strukturiert an die zuständige Stelle weitergeleitet.",
        },
      ],
    },
    steps: {
      title: "Sichere Einführung in vier Schritten",
      items: [
        {
          lead: "Anfrage-Analyse",
          text: "Welche Anfragetypen haben Volumen und klare Muster? Dort startet der Pilot.",
        },
        {
          lead: "Wissensbasis und Anbindung",
          text: "Anbindung an Ihr System und Aufbau einer sauberen Wissensbasis (RAG) – keine erfundenen Antworten.",
        },
        {
          lead: "Pilot mit Kennzeichnung",
          text: "Der KI-Assistent ist transparent gekennzeichnet, mit klarer Eskalationslogik an Ihr Team.",
        },
        {
          lead: "Messen und ausrollen",
          text: "Automatisierungsquote, Antwortzeit und Zufriedenheit messen, dann ausweiten.",
        },
      ],
    },
    stats: [
      { value: "24/7", label: "Versicherten-Erstauskunft" },
      { value: "Stufe 1", label: "Wiederkehrende Anfragen automatisch gelöst" },
      { value: "Klar", label: "Als KI gekennzeichnet, jederzeit an Menschen eskalierbar" },
    ],
    faq: [
      {
        q: "Ist Kundenservice-KI für Versicherer datenschutzkonform?",
        a: "Ja. AgenticIT arbeitet nDSG- und DSGVO-konform: Datenminimierung, Zweckbindung, sichere Verarbeitung und Human-in-the-Loop bei sensiblen Fällen. Versichertendaten werden vertraulich behandelt.",
      },
      {
        q: "Merken Versicherte, dass sie mit einer KI sprechen?",
        a: "Ja. Wir kennzeichnen KI-Assistenten transparent. Die KI gibt sich nie als reale Mitarbeiterin aus, und komplexe oder sensible Anliegen werden sauber an einen Menschen eskaliert.",
      },
      {
        q: "Welche Anfragen kann die Kundenservice-KI übernehmen?",
        a: "Statusauskünfte, Policen- und Deckungsfragen der Stufe 1, Dokumenten-Nachforderung, Schaden-Ersttriage und Terminanfragen. Leistungszusagen und fachliche Entscheide bleiben beim Menschen.",
      },
    ],
  },

  // ── 3 · Gastronomie ─────────────────────────────────────────────────────────
  {
    slug: "gastronomie",
    navLabel: "Gastronomie",
    meta: {
      title: "KI-Agenten für Gastronomie & KMU – Reservierungen & Anfragen 24/7",
      description:
        "KI-Agenten für Restaurants, Hotels und lokale KMU: Reservierungen und Gästefragen rund um die Uhr automatisieren – nDSG-konform, klar gekennzeichnet.",
    },
    keywords: [
      "KI Gastronomie Schweiz",
      "Reservierungen automatisieren",
      "KI-Agent Restaurant",
      "Gästekommunikation automatisieren",
      "No-Shows reduzieren",
      "KI für lokale KMU",
    ],
    hero: {
      eyebrow: "Branchen · Gastronomie & KMU",
      title: "KI-Agenten für Restaurants, Hotels und lokale Betriebe",
      kicker: "Keine verpasste Reservierung mehr, keine unbeantwortete Anfrage nach Feierabend.",
      body: [
        "KI-Agenten nehmen Reservierungen entgegen, beantworten Gästefragen und entlasten Ihr Team – rund um die Uhr, transparent gekennzeichnet und nDSG-konform.",
        "Im Gastgewerbe und in lokalen KMU entscheidet Erreichbarkeit über Umsatz – doch genau während des Betriebs ist niemand am Telefon.",
      ],
    },
    pains: {
      title: "Kommt Ihnen das bekannt vor?",
      intro:
        "Anfragen kommen verstreut über Telefon, Website, Social Media und Messenger – und für einen 24/7-Empfang fehlen Personal und Budget.",
      bullets: [
        {
          lead: "Anrufe während des Services",
          text: "Das Telefon klingelt genau dann, wenn alle Hände am Gast sind.",
        },
        {
          lead: "Reservierungen nach Feierabend",
          text: "Gäste schreiben abends – die Antwort kommt am nächsten Tag, oft zu spät.",
        },
        {
          lead: "Immer dieselben Fragen",
          text: "Öffnungszeiten, Menükarte, Allergene, Parkplatz, Hunde erlaubt? Standardfragen binden das Team jeden Tag aufs Neue.",
        },
        {
          lead: "No-Shows",
          text: "Nicht abgesagte Tische kosten bares Geld und blockieren Kapazität.",
        },
      ],
    },
    solutions: {
      title: "Was ein KI-Agent für Ihren Betrieb übernimmt",
      intro:
        "Immer freundlich, immer erreichbar, in mehreren Sprachen – mit Übergabe an Ihr Team, wenn ein Gast einen Menschen braucht.",
      bullets: [
        {
          lead: "24/7 Reservierungen",
          text: "Tische und Zimmer werden rund um die Uhr gebucht, geändert oder storniert – mit Verfügbarkeitsprüfung in Echtzeit.",
        },
        {
          lead: "Gästefragen beantworten",
          text: "Öffnungszeiten, Karte, Allergene, Anfahrt, Parkplätze – sofort und korrekt, auf allen Kanälen.",
        },
        {
          lead: "Erinnerungen gegen No-Shows",
          text: "Automatische Bestätigungen und Erinnerungen reduzieren nicht wahrgenommene Reservierungen spürbar.",
        },
        {
          lead: "Sonderwünsche erfassen",
          text: "Geburtstage, Unverträglichkeiten, grosse Gruppen – strukturiert erfasst und ans Team übergeben.",
        },
        {
          lead: "Kanäle bündeln",
          text: "Website-Chat, Messenger und Anfragen laufen an einer Stelle zusammen – kein Zettelchaos mehr.",
        },
        {
          lead: "Mehrsprachig für Gäste",
          text: "Deutsch, Französisch, Italienisch und Englisch – für einheimische und internationale Gäste.",
        },
      ],
    },
    steps: {
      title: "So läuft die Einführung ab",
      items: [
        {
          lead: "Anfragen sichten",
          text: "Wir schauen, welche Anfragen automatisierbar sind und welche ans Team gehören.",
        },
        {
          lead: "Wissen und Reservierung anbinden",
          text: "Öffnungszeiten, Karte, Kapazitäten und, wo sinnvoll, Ihr bestehendes Reservierungssystem.",
        },
        {
          lead: "Kennzeichnen und testen",
          text: "Klare KI-Kennzeichnung, definierte Eskalationsregeln, gründlicher Test vor dem Start.",
        },
        {
          lead: "Live mit Sicherheitsnetz",
          text: "Start mit menschlicher Überwachung – Ihr Team behält jederzeit die Kontrolle.",
        },
      ],
    },
    stats: [
      { value: "ca. 40", label: "Verpasste Anfragen pro Monat ausserhalb der Servicezeiten – Annahme im illustrativen Rechenbeispiel" },
      { value: "CHF 90", label: "Angenommener Durchschnittsumsatz pro Reservierung im Rechenbeispiel" },
      { value: "ca. CHF 21'600", label: "Jährlich rückgewinnbares Umsatzpotenzial im illustrativen Rechenbeispiel – kein garantiertes Ergebnis" },
    ],
    faq: [
      {
        q: "Kann ein KI-Agent Reservierungen selbstständig annehmen?",
        a: "Ja. Der Agent nimmt Reservierungen rund um die Uhr entgegen, prüft die Verfügbarkeit und bestätigt oder schlägt Alternativen vor. Sonderwünsche und heikle Fälle werden ans Team übergeben.",
      },
      {
        q: "Funktioniert das auch für kleine Betriebe?",
        a: "Gerade für kleine Betriebe, weil ein KI-Agent die 24/7-Erreichbarkeit ermöglicht, ohne dass zusätzliches Personal nötig ist.",
      },
      {
        q: "Merken Gäste, dass sie mit einer KI schreiben?",
        a: "Ja. Jeder KI-Agent ist klar gekennzeichnet, und Gäste können jederzeit einen Menschen erreichen. Ehrlichkeit schafft Vertrauen.",
      },
      {
        q: "Muss ich mein bestehendes Reservierungssystem wechseln?",
        a: "In der Regel nicht. Wir binden gängige Systeme an oder arbeiten mit Ihrer bestehenden Lösung.",
      },
    ],
  },

  // ── 4 · Gesundheit ──────────────────────────────────────────────────────────
  {
    slug: "gesundheit",
    navLabel: "Gesundheit",
    meta: {
      title: "KI-Agenten fürs Gesundheitswesen – Praxen, Kliniken, Therapie",
      description:
        "KI-Agenten für Arztpraxen, Kliniken und Therapiezentren in der Schweiz: 24/7 Terminvergabe und Entlastung am Empfang – nDSG-konform, mit Human-in-the-Loop.",
    },
    keywords: [
      "KI Arztpraxis Schweiz",
      "Terminvergabe automatisieren",
      "KI-Agent Praxis",
      "Praxisempfang entlasten",
      "KI Gesundheitswesen nDSG",
    ],
    hero: {
      eyebrow: "Branchen · Gesundheitswesen",
      title: "KI-Agenten für Praxen, Kliniken und Therapiezentren",
      kicker: "Hohe Erreichbarkeitserwartung, überlastetes Empfangspersonal, strenge Datenschutzanforderungen – ein einzigartiger Druck.",
      body: [
        "Entlasten Sie Ihren Empfang und bleiben Sie rund um die Uhr erreichbar – mit KI-Agenten, die Termine vergeben und Standardanfragen beantworten. Transparent gekennzeichnet, nDSG-konform, mit medizinischem Fachpersonal im Entscheidungspfad.",
      ],
    },
    pains: {
      title: "Die Herausforderungen, die Sie kennen",
      intro: "Qualifiziertes Personal am Empfang ist knapp und teuer – und digitale Lösungen müssen nDSG-konform und sicher sein.",
      bullets: [
        {
          lead: "Dauerbelegtes Telefon",
          text: "Patientinnen und Patienten erreichen niemanden, das Team wird ständig unterbrochen.",
        },
        {
          lead: "Anfragen ausserhalb der Öffnungszeiten",
          text: "Abends und am Wochenende gehen Terminwünsche verloren.",
        },
        {
          lead: "Repetitive Standardfragen",
          text: "Öffnungszeiten, Anfahrt, Rezeptverlängerung binden wertvolle Zeit des Empfangsteams.",
        },
        {
          lead: "No-Shows",
          text: "Vergessene Termine kosten Umsatz und blockieren Kapazität.",
        },
      ],
    },
    solutions: {
      title: "Was ein KI-Agent für Ihre Praxis übernimmt",
      intro:
        "Rund um die Uhr, in mehreren Sprachen, mit klarer KI-Kennzeichnung – und immer mit Übergabe an Ihr Team, wenn es medizinisch oder sensibel wird.",
      bullets: [
        {
          lead: "24/7 Terminvergabe",
          text: "Termine buchen, verschieben oder stornieren – jederzeit, direkt im Kalender, ohne Wartezeit am Telefon.",
        },
        {
          lead: "Terminerinnerungen",
          text: "Automatische, freundliche Erinnerungen senken No-Show-Raten und schützen Ihre Auslastung.",
        },
        {
          lead: "Standardauskünfte",
          text: "Öffnungszeiten, Anfahrt, Sprechzeiten, Vorbereitung auf Untersuchungen – sofort und korrekt beantwortet.",
        },
        {
          lead: "Anfrage-Triage",
          text: "Anliegen werden strukturiert erfasst und an die richtige Stelle weitergeleitet – medizinische Fragen immer ans Fachpersonal.",
        },
        {
          lead: "Rückruf-Management",
          text: "Rückrufwünsche werden priorisiert erfasst, damit Ihr Team gezielt zurückrufen kann.",
        },
        {
          lead: "Mehrsprachigkeit",
          text: "Deutsch, Französisch, Italienisch und Englisch – für die vielfältige Schweizer Patientenschaft.",
        },
      ],
    },
    steps: {
      title: "So läuft die Einführung ab",
      items: [
        {
          lead: "Analyse Ihrer Anfragen",
          text: "Wir klären gemeinsam, welche Anfragen automatisierbar sind und welche zwingend zum Menschen gehören.",
        },
        {
          lead: "Wissensbasis und Kalender anbinden",
          text: "Öffnungszeiten, Leistungen, Terminlogik – sauber strukturiert und, wo sinnvoll, an Ihr Praxissystem angebunden.",
        },
        {
          lead: "Kennzeichnen und testen",
          text: "Der Agent wird klar als KI markiert, Eskalationsregeln werden definiert, alles wird gründlich getestet.",
        },
        {
          lead: "Live mit Sicherheitsnetz",
          text: "Start mit menschlicher Überwachung – Ihr Team behält jederzeit die Kontrolle und kann eingreifen.",
        },
      ],
    },
    faq: [
      {
        q: "Ist der Einsatz von KI in einer Arztpraxis datenschutzkonform?",
        a: "Ja, bei richtiger Umsetzung. AgenticIT verarbeitet Daten nDSG- und DSGVO-konform, mit Datenminimierung und klaren Zugriffsrechten. Sensible medizinische Inhalte werden nicht durch die KI beurteilt, sondern an medizinisches Personal übergeben.",
      },
      {
        q: "Merken Patientinnen und Patienten, dass sie mit einer KI sprechen?",
        a: "Ja. Jeder KI-Agent ist klar als KI gekennzeichnet, und Patientinnen und Patienten können jederzeit einen Menschen erreichen. Transparenz schafft Vertrauen.",
      },
      {
        q: "Ersetzt die KI mein Empfangs- oder Praxisteam?",
        a: "Nein. Die KI übernimmt repetitive Aufgaben wie Terminvergabe und Standardauskünfte rund um die Uhr. Medizinische und sensible Themen bleiben beim Menschen – die KI entlastet Ihr Team, ersetzt es nicht.",
      },
      {
        q: "Wie lange dauert die Einführung?",
        a: "Je nach Umfang wenige Wochen. Wir starten schlank mit einem klar abgegrenzten Anwendungsfall und bauen von dort aus.",
      },
    ],
  },

  // ── 5 · Autohaus ────────────────────────────────────────────────────────────
  {
    slug: "autohaus",
    navLabel: "Autohaus",
    meta: {
      title: "KI-Agenten fürs Autohaus – mehr Leads, weniger Admin",
      description:
        "KI-Agenten für Autohäuser: Lead-Qualifizierung, Probefahrt-Termine und Service-Erinnerungen automatisieren – nDSG-konform, mit menschlicher Freigabe.",
    },
    keywords: [
      "KI Autohaus Schweiz",
      "Lead-Qualifizierung Autohaus",
      "Probefahrt Termin automatisieren",
      "Service-Erinnerungen Werkstatt",
      "KI-Agent Autohandel",
    ],
    hero: {
      eyebrow: "Branchen · Autohaus",
      title: "KI-Agenten fürs Autohaus: mehr verkaufte Fahrzeuge, weniger Papierkram",
      kicker: "Jede unbeantwortete Anfrage ist ein potenziell verlorenes Fahrzeug.",
      body: [
        "Ihre Verkäufer sollen verkaufen – nicht Anfragen sortieren und Terminen hinterhertelefonieren. AgenticIT baut KI-Agenten, die Leads qualifizieren, Probefahrten koordinieren und Service-Erinnerungen vorbereiten. Schweizer Compliance inklusive.",
      ],
    },
    pains: {
      title: "Die täglichen Zeitfresser im Autohaus",
      bullets: [
        {
          lead: "Anfragen-Flut",
          text: "Portale, Website, WhatsApp, E-Mail – Anfragen kommen von überall und bleiben in Stosszeiten liegen. Wer zu spät reagiert, verliert an den schnelleren Mitbewerber.",
        },
        {
          lead: "Termin-Ping-Pong",
          text: "Probefahrten und Servicetermine kosten unzählige Anrufe und Rückrufe – Zeit, die im Verkauf und in der Werkstatt fehlt.",
        },
        {
          lead: "Verlorene Nachfassaktionen",
          text: "Interessenten, die nicht sofort kaufen, verschwinden. Ohne systematisches Follow-up bleibt Umsatz auf der Strasse liegen.",
        },
      ],
    },
    solutions: {
      title: "Was unsere KI-Agenten fürs Autohaus übernehmen",
      intro: "Der Agent bereitet vor – Ihr Team gibt frei. Immer mit menschlicher Kontrolle (Human-in-the-Loop).",
      bullets: [
        {
          lead: "Leads sofort qualifizieren",
          text: "Anfragen aus allen Kanälen zusammenführen, Wunschfahrzeug, Budget und Dringlichkeit erkennen – als priorisierte Lead-Liste für den Verkauf.",
        },
        {
          lead: "Probefahrten koordinieren",
          text: "Terminvorschläge nach Verfügbarkeit, Bestätigung und Erinnerung vorbereitet – weniger No-Shows durch automatische Reminder.",
        },
        {
          lead: "Service-Erinnerungen",
          text: "Fällige Services und MFK-Termine erkennen, personalisierte Erinnerung im Entwurf – und die Auslastung der Werkstatt erhöhen.",
        },
        {
          lead: "Kundenservice rund um die Uhr",
          text: "Häufige Fragen zu Öffnungszeiten und Verfügbarkeit sofort beantwortet – klar als KI gekennzeichnet, mit nahtloser Übergabe an Mitarbeitende.",
        },
      ],
    },
    steps: {
      title: "So läuft die Einführung ab",
      items: [
        {
          lead: "Analyse (kostenlos)",
          text: "Wir schauen uns Ihre Anfragen- und Terminprozesse an und identifizieren den grössten Hebel.",
        },
        {
          lead: "Pilot",
          text: "Ein KI-Agent für einen klar abgegrenzten Prozess, etwa die Lead-Qualifizierung – im Parallelbetrieb mit menschlicher Freigabe.",
        },
        {
          lead: "Rollout",
          text: "Nach bewiesenem Nutzen weiten wir schrittweise auf Termine, Service und Kundenservice aus.",
        },
        {
          lead: "Betrieb und Optimierung",
          text: "Wir begleiten den laufenden Betrieb und verbessern die Agenten kontinuierlich.",
        },
      ],
    },
    stats: [
      { value: "unter 5 Min.", label: "Ziel-Reaktionszeit auf neue Anfragen – Richtwert je nach Setup, keine Garantie" },
      { value: "24/7", label: "Erreichbarkeit für Erstanfragen" },
      { value: "100 %", label: "Anfragen erfasst und nachverfolgt" },
    ],
    faq: [
      {
        q: "Ersetzt die KI unsere Verkäufer?",
        a: "Nein. Die KI übernimmt Administration und Vorbereitung, damit Ihr Team mehr Zeit für den Verkauf hat. Der Mensch behält die Freigabe und den Kundenkontakt.",
      },
      {
        q: "Ist das datenschutzkonform?",
        a: "Ja. Wir arbeiten nDSG- und DSGVO-konform: Datenminimierung, dokumentierte Verarbeitung und keine automatischen Aktionen ohne menschliche Freigabe.",
      },
      {
        q: "Merken Kunden, dass sie mit einer KI schreiben?",
        a: "Ja – bewusst. Wir kennzeichnen KI-Agenten transparent. Das ist Pflicht und schafft Vertrauen.",
      },
      {
        q: "Wie schnell sehen wir Ergebnisse?",
        a: "Ein erster Pilot ist typischerweise in wenigen Wochen produktiv. Der genaue Zeitrahmen hängt von Ihren Systemen und Daten ab.",
      },
    ],
  },

  // ── 6 · Immobilien ──────────────────────────────────────────────────────────
  {
    slug: "immobilien",
    navLabel: "Immobilien",
    meta: {
      title: "KI-Agenten für Immobilien – mehr Abschlüsse, weniger Admin",
      description:
        "KI-Agenten für Makler und Bewirtschafter in der Schweiz: Lead-Qualifizierung, Besichtigungen und Mieteranfragen automatisieren – nDSG-konform, mit Freigabe.",
    },
    keywords: [
      "KI Immobilien Schweiz",
      "Immobilienmakler Automatisierung",
      "Besichtigungstermine koordinieren",
      "Mieteranfragen automatisieren",
      "Interessenten-Qualifizierung Immobilien",
    ],
    hero: {
      eyebrow: "Branchen · Immobilien",
      title: "KI-Agenten für Immobilien: schneller vermittelt, weniger Verwaltung",
      kicker: "Der beste Interessent ist der, der zuerst eine Antwort bekommt.",
      body: [
        "AgenticIT baut KI-Agenten, die Anfragen sofort qualifizieren, Besichtigungen koordinieren und Mieteranfragen vorbereiten – damit Makler und Bewirtschafter sich auf Abschlüsse und Menschen konzentrieren.",
      ],
    },
    pains: {
      title: "Die täglichen Engpässe in der Immobilienbranche",
      intro: "Ob Verkauf, Vermietung oder Bewirtschaftung – überall entscheidet Reaktionsgeschwindigkeit über den Erfolg.",
      bullets: [
        {
          lead: "Anfragen-Wellen",
          text: "Ein attraktives Inserat löst dutzende Anfragen in Stunden aus. Manuell ist das kaum zu bewältigen – und langsame Antworten kosten die besten Interessenten.",
        },
        {
          lead: "Besichtigungs-Chaos",
          text: "Termine koordinieren, Absagen managen, Sammelbesichtigungen organisieren – ein enormer Koordinationsaufwand.",
        },
        {
          lead: "Mieteranfragen",
          text: "Bewirtschafter ertrinken in wiederkehrenden Fragen zu Nebenkosten, Reparaturen und Kündigungen – meist immer dieselben Themen.",
        },
      ],
    },
    solutions: {
      title: "Was unsere KI-Agenten für Immobilien übernehmen",
      intro: "Der Agent bereitet vor – Ihr Team gibt frei. Immer mit menschlicher Kontrolle (Human-in-the-Loop).",
      bullets: [
        {
          lead: "Interessenten qualifizieren und matchen",
          text: "Anfragen aus Portalen und Website zusammenführen, Kriterien wie Budget, Timing und Bonitätsunterlagen abfragen, passende Objekte vorschlagen – als priorisierte Liste.",
        },
        {
          lead: "Besichtigungen koordinieren",
          text: "Terminvorschläge und Sammelbesichtigungen, Bestätigungen und Erinnerungen im Entwurf – weniger No-Shows dank automatischer Reminder.",
        },
        {
          lead: "Mieteranfragen automatisieren",
          text: "Häufige Fragen sofort beantworten (KI-gekennzeichnet), Reparaturmeldungen strukturiert erfassen, komplexe Fälle an die Bewirtschaftung eskalieren.",
        },
        {
          lead: "Dossier- und Follow-up-Vorbereitung",
          text: "Unterlagen-Checklisten für Interessenten, automatisches und systematisches Nachfassen, saubere Datenpflege im CRM.",
        },
      ],
    },
    steps: {
      title: "So läuft die Einführung ab",
      items: [
        {
          lead: "Analyse (kostenlos)",
          text: "Wir schauen uns Ihre Anfragen-, Besichtigungs- und Bewirtschaftungsprozesse an und finden den grössten Hebel.",
        },
        {
          lead: "Pilot",
          text: "Ein KI-Agent für einen klaren Prozess, etwa die Interessenten-Qualifizierung – im Parallelbetrieb mit menschlicher Freigabe.",
        },
        {
          lead: "Rollout",
          text: "Nach bewiesenem Nutzen weiten wir auf Besichtigungen, Mieteranfragen und Follow-up aus.",
        },
        {
          lead: "Betrieb und Optimierung",
          text: "Wir begleiten den Betrieb und verbessern die Agenten laufend.",
        },
      ],
    },
    stats: [
      { value: "unter 5 Min.", label: "Ziel-Reaktionszeit auf neue Anfragen – Richtwert je nach Setup, keine Garantie" },
      { value: "24/7", label: "Erreichbarkeit für Interessenten und Mieter" },
      { value: "100 %", label: "Anfragen erfasst und nachverfolgt" },
    ],
    faq: [
      {
        q: "Ersetzt die KI unsere Makler und Bewirtschafter?",
        a: "Nein. Die KI übernimmt Administration und Erstkontakt-Vorbereitung. Beratung, Verhandlung und Abschluss bleiben beim Menschen – der auch alle Aktionen freigibt.",
      },
      {
        q: "Wie steht es um den Datenschutz bei Bewerberdossiers?",
        a: "Wir arbeiten nDSG- und DSGVO-konform: Datenminimierung, dokumentierte Verarbeitung, klare Aufbewahrung und keine automatischen Entscheidungen über Personen ohne menschliche Kontrolle.",
      },
      {
        q: "Merken Interessenten, dass sie mit einer KI kommunizieren?",
        a: "Ja – transparent gekennzeichnet. Das ist Pflicht und schafft Vertrauen.",
      },
      {
        q: "Funktioniert das auch für kleinere Verwaltungen?",
        a: "Ja. Wir starten bewusst klein mit einem Anwendungsfall, der sich schnell rechnet, und wachsen von dort.",
      },
    ],
  },

  // ── 7 · Fitness & Studios ───────────────────────────────────────────────────
  {
    slug: "fitness",
    navLabel: "Fitness & Studios",
    meta: {
      title: "KI für Fitness- & Gesundheitsstudios – mehr Mitglieder, weniger Aufwand",
      description:
        "KI-Agenten für Schweizer Fitness- und Gesundheitsstudios: Probetrainings automatisch buchen, Anfragen rund um die Uhr beantworten, No-Shows senken.",
    },
    keywords: [
      "KI Fitnessstudio Schweiz",
      "Probetraining automatisch buchen",
      "No-Shows senken Studio",
      "Mitgliederbindung KI",
      "KI-Agent Gesundheitsstudio",
    ],
    hero: {
      eyebrow: "Branchen · Fitness & Studios",
      title: "KI für Fitness- und Gesundheitsstudios: mehr Mitglieder, weniger Aufwand",
      kicker: "An der Theke ist niemand frei, das Telefon klingelt zur Stosszeit, Interessenten springen ab.",
      body: [
        "Ihre KI-Agenten buchen Probetrainings automatisch, beantworten Anfragen rund um die Uhr und senken No-Shows – damit sich Ihr Team um das kümmert, was zählt: Ihre Mitglieder auf der Fläche.",
      ],
    },
    pains: {
      title: "Wo Studios täglich Umsatz verschenken",
      bullets: [
        {
          lead: "Anfragen nach Feierabend",
          text: "Probetraining-Anfragen kommen abends und am Wochenende – und bleiben liegen.",
        },
        {
          lead: "Rezeption im Dauerstress",
          text: "Zur Stosszeit ist niemand frei, Interessenten warten oder gehen.",
        },
        {
          lead: "No-Shows",
          text: "Nicht wahrgenommene Probetrainings und Kurstermine kosten Umsatz und blockieren Plätze.",
        },
        {
          lead: "Wiederkehrende Standardfragen",
          text: "Öffnungszeiten, Abos und Kurse binden Personal, das auf der Fläche fehlt.",
        },
      ],
    },
    solutions: {
      title: "Was KI für Ihr Studio übernimmt",
      intro: "Konkrete Anwendungen für Gewinnung, Bindung und Entlastung – einzeln startbar.",
      bullets: [
        {
          lead: "Probetraining buchen",
          text: "Der Agent nimmt Interessenten-Anfragen über Website, WhatsApp und Instagram entgegen, prüft freie Slots und bucht das Probetraining – rund um die Uhr.",
        },
        {
          lead: "Anfragen beantworten",
          text: "Öffnungszeiten, Abomodelle, Kursplan, Kündigungsfristen – Standardfragen sind sofort und einheitlich beantwortet.",
        },
        {
          lead: "No-Shows senken",
          text: "Freundliche, mehrstufige Erinnerungen und Ein-Klick-Umbuchung sorgen dafür, dass Probetrainings und Kurstermine wahrgenommen werden.",
        },
        {
          lead: "Mitglieder binden",
          text: "Willkommens- und Reaktivierungsnachrichten (mit Opt-in) halten den Kontakt – gerade bei nachlassender Trainingsfrequenz.",
        },
      ],
    },
    stats: [
      { value: "12 % → 6 %", label: "No-Show-Quote im illustrativen Rechenbeispiel eines Studios mit 800 Terminen pro Monat" },
      { value: "rund 48", label: "Zusätzlich wahrgenommene Termine pro Monat im Rechenbeispiel – zur Veranschaulichung, kein garantiertes Ergebnis" },
      { value: "24/7", label: "Erreichbarkeit für Probetrainings und Anfragen" },
    ],
    faq: [
      {
        q: "Kann ein KI-Agent Probetrainings selbstständig buchen?",
        a: "Ja. Der Agent nimmt die Anfrage entgegen, prüft freie Slots in Echtzeit, bucht das Probetraining und trägt den Interessenten ins System ein – rund um die Uhr.",
      },
      {
        q: "Hilft KI wirklich gegen No-Shows im Studio?",
        a: "Ja. Durch freundliche, mehrstufige Erinnerungen über WhatsApp oder E-Mail und einfache Umbuchung mit einem Klick sinkt die No-Show-Quote spürbar.",
      },
      {
        q: "Merken meine Mitglieder, dass sie mit einer KI schreiben?",
        a: "Ja. Transparente KI-Kennzeichnung ist Teil unseres Standards und in der Schweiz Pflicht. Das schafft Vertrauen. Persönliche Anliegen übergibt der Agent an Ihr Team.",
      },
      {
        q: "Wie werden Gesundheitsdaten geschützt?",
        a: "Alle Daten werden nDSG- und DSGVO-konform verarbeitet – mit besonderem Augenmerk auf sensible Gesundheitsdaten und Zweckbindung.",
      },
    ],
  },

  // ── 8 · Handwerk ────────────────────────────────────────────────────────────
  {
    slug: "handwerk",
    navLabel: "Handwerk",
    meta: {
      title: "KI für Handwerksbetriebe – weniger Büro, mehr Baustelle",
      description:
        "KI-Agenten für Schweizer Handwerksbetriebe: Anfragen rund um die Uhr beantworten, Termine automatisch buchen, Offerten schneller erstellen – nDSG-konform.",
    },
    keywords: [
      "KI Handwerk Schweiz",
      "Handwerksbetrieb Automatisierung",
      "Offerten automatisieren",
      "Termine automatisch buchen",
      "digitaler Empfang Handwerk",
    ],
    hero: {
      eyebrow: "Branchen · Handwerk",
      title: "KI für Handwerksbetriebe: weniger Büro, mehr Baustelle",
      kicker: "Das Büro raubt Ihnen täglich Stunden, die auf der Baustelle fehlen.",
      body: [
        "Ihre KI-Agenten beantworten Anfragen rund um die Uhr, vereinbaren Termine und bereiten Offerten vor – damit Sie sich auf Ihr Handwerk konzentrieren können. Keine verpassten Aufträge mehr, auch nach Feierabend.",
      ],
    },
    pains: {
      title: "Kennen Sie diese Zeitfresser?",
      bullets: [
        {
          lead: "Telefon mitten in der Arbeit",
          text: "Es klingelt auf der Baustelle – und bleibt trotzdem oft unbeantwortet.",
        },
        {
          lead: "Anfragen nach Feierabend",
          text: "Anfragen kommen abends und am Wochenende – wer nicht antwortet, verliert den Auftrag.",
        },
        {
          lead: "Offerten in der Freizeit",
          text: "Offerten schreiben frisst wertvolle Abende und Wochenenden.",
        },
        {
          lead: "Termin- und Datenchaos",
          text: "Termine, Verschiebungen und Kundendaten sorgen für ständiges Durcheinander auf Zetteln und in verschiedenen Postfächern.",
        },
      ],
    },
    solutions: {
      title: "Was KI für Ihren Betrieb übernimmt",
      intro: "Konkrete Anwendungen, die sofort Zeit sparen – einzeln startbar und beliebig kombinierbar.",
      bullets: [
        {
          lead: "Digitaler Empfang",
          text: "Nimmt Anrufe, WhatsApp- und Website-Anfragen entgegen und beantwortet häufige Fragen zu Leistungen, Einzugsgebiet und Preisrahmen – rund um die Uhr.",
        },
        {
          lead: "Automatische Termine",
          text: "Kunden buchen Vor-Ort-Termine selbst, der Agent prüft Ihren Kalender in Echtzeit und trägt ein. Erinnerungen senken No-Shows.",
        },
        {
          lead: "Offerten vorbereiten",
          text: "Aus der Anfrage entsteht ein strukturierter Offert-Entwurf. Sie prüfen und geben frei – so liegt Ihr Angebot oft als Erstes beim Kunden.",
        },
        {
          lead: "Kundendaten pflegen",
          text: "Kontakte und Aufträge landen automatisch strukturiert im System statt auf Zetteln und in verschiedenen Postfächern.",
        },
      ],
    },
    stats: [
      { value: "rund 30 Std.", label: "Pro Monat zurückgewonnene Arbeitszeit im Beispielbetrieb mit täglich 1,5 Stunden Telefon- und Anfrageaufwand – Beispielwert zur Veranschaulichung" },
      { value: "24/7", label: "Erreichbarkeit für Anfragen – auch nach Feierabend und am Wochenende" },
    ],
    faq: [
      {
        q: "Ist KI nicht zu kompliziert für einen kleinen Handwerksbetrieb?",
        a: "Nein. Der Einstieg gelingt mit einem klar umrissenen Anwendungsfall wie der Terminvereinbarung und wächst mit Ihrem Betrieb mit.",
      },
      {
        q: "Verliere ich den persönlichen Kontakt zu meinen Kunden?",
        a: "Im Gegenteil. Weil Routineaufgaben wegfallen, haben Sie wieder mehr Zeit für persönliche Gespräche. Der KI-Agent ist klar gekennzeichnet und übergibt heikle Fälle an Sie.",
      },
      {
        q: "Was kostet KI für einen Handwerksbetrieb?",
        a: "Für einen einfachen Einstieg starten Projekte in der Schweiz oft im unteren vierstelligen Bereich für das Setup, plus planbare monatliche Betriebskosten. Details klären wir in der kostenlosen Potenzialanalyse.",
      },
      {
        q: "Funktioniert das mit meinem bestehenden Kalender?",
        a: "Ja. Gängige Kalender und Systeme lassen sich anbinden, sodass Termine überall konsistent sind.",
      },
    ],
  },

  // ── 9 · Beratung & Consulting ───────────────────────────────────────────────
  {
    slug: "beratung",
    navLabel: "Beratung & Consulting",
    meta: {
      title: "KI für Beratung & Consulting – mehr Zeit für Mandate",
      description:
        "KI für Beratungs- und Consulting-Firmen in der Schweiz: Lead-Qualifizierung, Recherche-Assistenz, Angebots-Automatisierung und Wissensmanagement – nDSG-konform.",
    },
    keywords: [
      "KI Beratung Consulting",
      "Lead-Qualifizierung Beratung",
      "Recherche-Assistenz KI",
      "Angebots-Automatisierung",
      "Wissensmanagement KI",
      "Billable Hours schützen",
    ],
    hero: {
      eyebrow: "Branchen · Beratung & Consulting",
      title: "KI für Beratung und Consulting: mehr Zeit fürs Mandat, weniger für die Administration",
      kicker: "In Beratungshäusern ist die knappste Ressource die Zeit der Expertinnen und Experten.",
      body: [
        "AgenticIT setzt KI-Agenten dort ein, wo sie Stunden zurückgeben: Lead-Qualifizierung, Recherche, Angebote und Wissensmanagement – transparent gekennzeichnet und nDSG-konform.",
      ],
    },
    pains: {
      title: "Wo abrechenbare Zeit heute verloren geht",
      bullets: [
        {
          lead: "Senior-Zeit für Routine",
          text: "Wertvolle Expertenzeit fliesst in Recherche und Angebotsformatierung statt in Analyse und Beziehung.",
        },
        {
          lead: "Liegengebliebene Anfragen",
          text: "Leads warten, bis jemand «Zeit hat» – die passendsten Interessenten sind dann oft schon weiter.",
        },
        {
          lead: "Wissen in Silos",
          text: "Erfahrung steckt in Köpfen und alten Ordnern statt durchsuchbar und wiederverwendbar zu sein.",
        },
        {
          lead: "Unregelmässiges Nachfassen",
          text: "Follow-ups bei Leads passieren sporadisch – und damit bleibt Umsatz liegen.",
        },
      ],
    },
    solutions: {
      title: "Wo KI in Ihrer Beratung wirkt",
      intro: "Billable Hours schützen, Administration automatisieren, Wissen nutzbar machen.",
      bullets: [
        {
          lead: "Lead-Qualifizierung",
          text: "Anfragen werden erfasst, qualifiziert und priorisiert – Ihre Berater sprechen zuerst mit den passendsten Interessenten.",
        },
        {
          lead: "Recherche-Assistenz",
          text: "KI-Agenten sammeln und strukturieren Informationen für Mandate; Bewertung und Verantwortung bleiben beim Menschen.",
        },
        {
          lead: "Angebots-Automatisierung",
          text: "Aus Vorlagen und Gesprächsnotizen entstehen Angebotsentwürfe, die Sie prüfen und individualisieren – statt bei null zu starten.",
        },
        {
          lead: "Wissensmanagement",
          text: "Ihr internes Wissen wird durchsuchbar: frühere Projekte, Templates und Erkenntnisse auf Abruf statt in Silos verloren.",
        },
        {
          lead: "E-Mail und Terminierung",
          text: "Routine-Korrespondenz und Terminabstimmung übernimmt die KI – mit menschlicher Freigabe für alles Sensible.",
        },
        {
          lead: "RevOps-Sicht",
          text: "Marketing, Sales und Delivery datenseitig verbinden: Wo entstehen die besten Mandate, wo bleibt Umsatz liegen?",
        },
      ],
    },
    steps: {
      title: "So starten wir gemeinsam",
      items: [
        {
          lead: "Engpass-Analyse",
          text: "Wo verlieren Ihre Expertinnen und Experten die meiste abrechenbare Zeit an Administration?",
        },
        {
          lead: "Pilot mit einem Use-Case",
          text: "Etwa Lead-Qualifizierung oder Angebots-Vorbereitung – mit klaren Datenschutz- und Vertraulichkeitsregeln.",
        },
        {
          lead: "Messen und nachschärfen",
          text: "Zurückgewonnene Stunden, Angebotsquote, Reaktionszeit – gemessen gegen eine klare Baseline.",
        },
        {
          lead: "Ausweiten",
          text: "Weitere Prozesse und die verbundene RevOps-Sicht – Schritt für Schritt.",
        },
      ],
    },
    faq: [
      {
        q: "Wie sicher sind vertrauliche Mandatsdaten?",
        a: "Vertraulichkeit hat Priorität: definierter Speicherort (Schweiz/EU), Zweckbindung, Löschkonzept und Zugriffskontrolle – nDSG- und DSGVO-konform. Mandantengeheimnis und Datenverträge klären wir vorab.",
      },
      {
        q: "Ersetzt KI die Beratungsleistung?",
        a: "Nein. KI übernimmt Vorbereitung und Routine. Analyse, Urteil, Empfehlung und Verantwortung bleiben bei Ihren Beraterinnen und Beratern.",
      },
      {
        q: "Kann die KI eigenständig Angebote versenden?",
        a: "Nur wenn Sie das für eng definierte Fälle freigeben. Standard ist: Die KI entwirft, ein Mensch prüft und gibt frei (Human-in-the-Loop).",
      },
      {
        q: "Wie schnell sehen wir Nutzen?",
        a: "Für einen klar umrissenen Use-Case ist ein produktiver Pilot in wenigen Wochen realistisch.",
      },
    ],
  },

  // ── 10 · Hotellerie ─────────────────────────────────────────────────────────
  {
    slug: "hotellerie",
    navLabel: "Hotellerie",
    meta: {
      title: "KI für die Hotellerie – mehr Direktbuchungen, entlastete Rezeption",
      description:
        "KI für Hotels und Beherbergung in der Schweiz: Reservationen rund um die Uhr, mehrsprachige Gästekommunikation, entlastete Rezeption – nDSG-konform.",
    },
    keywords: [
      "KI Hotellerie Schweiz",
      "Direktbuchungen steigern",
      "KI-Sprachassistent Hotel",
      "Gästekommunikation automatisieren",
      "Rezeption entlasten",
    ],
    hero: {
      eyebrow: "Branchen · Hotellerie & Beherbergung",
      title: "KI für die Hotellerie: kein verlorener Gast, keine Rezeption im Dauerstress",
      kicker: "Von der ersten Anfrage bis zum Check-out: KI übernimmt die Fleissarbeit, Ihr Team die Gastgeberqualität.",
      body: [
        "AgenticIT bringt KI-Agenten in Ihr Hotel: Reservationsanfragen rund um die Uhr, Gästekommunikation in mehreren Sprachen und Entlastung der Rezeption – transparent gekennzeichnet und nDSG-konform.",
      ],
    },
    pains: {
      title: "Wo Hotels heute Buchungen und Zeit verlieren",
      bullets: [
        {
          lead: "Unbeantwortete Anrufe in Stosszeiten",
          text: "Wer nicht durchkommt, bucht über OTA-Portale – inklusive Provision.",
        },
        {
          lead: "Zerrissene Rezeption",
          text: "Das Team pendelt zwischen Telefon, Check-in und E-Mail – der Gast vor Ort kommt zu kurz.",
        },
        {
          lead: "Anfragen ausserhalb der Bürozeiten",
          text: "Abends und am Wochenende bleiben Reservationsanfragen liegen.",
        },
        {
          lead: "Tägliche Standardfragen",
          text: "Wiederkehrende Fragen zu Anreise, Parkplatz, Frühstück oder Check-in kosten jeden Tag Stunden.",
        },
      ],
    },
    solutions: {
      title: "Wo KI Ihr Hotel entlastet",
      intro: "KI übernimmt die Fleissarbeit – Ihr Team kümmert sich um Gastgeberqualität.",
      bullets: [
        {
          lead: "Reservationen 24/7",
          text: "Der KI-Sprachassistent nimmt Anrufe auch abends und am Wochenende an, beantwortet Verfügbarkeits- und Preisfragen und leitet komplexe Anliegen an die Rezeption.",
        },
        {
          lead: "Anfragen-Automatisierung",
          text: "E-Mail- und Web-Anfragen werden erkannt, priorisiert und mit vorbereiteten Antworten versehen – Ihr Team gibt frei und sendet.",
        },
        {
          lead: "Mehrsprachige Gästekommunikation",
          text: "Standardfragen zu Anreise, Parkplatz, Frühstück oder Check-in-Zeiten – konsistent beantwortet, in mehreren Sprachen.",
        },
        {
          lead: "Weniger No-Shows",
          text: "Automatisierte, freundliche Erinnerungen und Bestätigungen – markenkonform und mit Möglichkeit zur Umbuchung.",
        },
        {
          lead: "Bewertungs-Management",
          text: "Die KI bereitet Antwortentwürfe auf Gästebewertungen vor; die persönliche Note und die Freigabe bleiben bei Ihnen.",
        },
        {
          lead: "Nachfrage verstehen",
          text: "KI-Datenanalyse zeigt, welche Kanäle die besten Direktbuchungen bringen und wo Umsatz liegen bleibt.",
        },
      ],
    },
    steps: {
      title: "So starten wir gemeinsam",
      items: [
        {
          lead: "Analyse Ihrer Gästekommunikation",
          text: "Wir schauen, welche Anfragen wie oft kommen und wo die grössten Engpässe liegen.",
        },
        {
          lead: "Pilot mit einem Use-Case",
          text: "Zum Beispiel die Reservationsannahme per Voice-Agent – gekennzeichnet, mit sauberer Übergabe an die Rezeption.",
        },
        {
          lead: "Messen und nachschärfen",
          text: "Angenommene Anfragen, Direktbuchungen, Entlastung – gemessen gegen eine klare Baseline.",
        },
        {
          lead: "Ausweiten",
          text: "Weitere Sprachen, Kanäle und Prozesse – Schritt für Schritt.",
        },
      ],
    },
    faq: [
      {
        q: "Merken Gäste, dass sie mit einer KI sprechen?",
        a: "Ja – der Assistent weist sich transparent als KI aus. Das ist Pflicht und schafft Vertrauen. Die persönliche Gastgeberqualität bleibt beim Team.",
      },
      {
        q: "Ersetzt die KI unsere Rezeption?",
        a: "Nein. Sie entlastet die Rezeption von Routine und Erreichbarkeitsdruck, damit mehr Zeit für den Gast vor Ort bleibt.",
      },
      {
        q: "Funktioniert das mit unserem Buchungssystem?",
        a: "In der Regel ja – wir prüfen die Anbindung im Erstgespräch. Ziel ist ein reibungsloser Datenfluss zwischen Agent, Kalender und PMS.",
      },
      {
        q: "Wie steht es um den Datenschutz?",
        a: "Gästedaten werden nDSG- und DSGVO-konform verarbeitet, mit definiertem Speicherort und Löschkonzept. Transparenz ist Teil des Setups.",
      },
    ],
  },
]

export const BRANCHEN_LP_BY_SLUG: Record<string, BranchenLp> = Object.fromEntries(
  BRANCHEN_LPS.map((lp) => [lp.slug, lp]),
)
