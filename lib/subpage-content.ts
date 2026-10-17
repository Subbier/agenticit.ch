// AgenticIT: Inhalte der Technologie-Unterseiten, überarbeitet am 17.10.2026.
// Ältere Lösungsdaten bleiben für bestehende Alias-Routen erhalten. Die
// kanonischen Lösungsseiten verwenden lib/core-services.ts.

import type { AngebotChartData } from "@/lib/angebot-content"

export type SubBullet = { lead?: string; text: string }

export type SubPageContent = {
  slug: string // voller Pfad-Slug, z. B. "loesungen/gtm-markteintritt"
  parentSlug: string // "loesungen"
  parentLabel: string // "Lösungen"
  navLabel: string // "GTM: Markteintritt"
  problem: { title: string; body: string[]; kicker?: string }
  agitate: {
    title: string
    intro?: string
    bullets: SubBullet[]
    outro?: string[]
  }
  solution: {
    title: string
    intro: string[]
    changeTitle?: string
    bullets: SubBullet[]
    easyTitle?: string
    easyText?: string
  }
  /** Optionales Style-Visual (wiederverwendet die Angebot-Chart-Bibliothek). */
  chart?: AngebotChartData
  chartAccent?: string
  /** Cross-Links zu passenden Angebot-Bereichen (z. B. GTM → Begeistern/Umsetzen). */
  relatedAngebot?: Array<"begeistern" | "umsetzen" | "erschaffen" | "erweitern">
  interactive?: { label: string; text: string }
  voiceAgent?: {
    agentId: string
    branchId?: string
    eyebrow?: string
    title?: string
    description?: string
  }
  chooseAgentDemo?: boolean
  multiAgentTimeWin?: boolean
  enterpriseOrgChart?: boolean
  /** GTM-Seite: Story-Sektion "Warum Go-to-Market entscheidet" + Checklisten-Lead-Magnet. */
  gtmPlaybook?: boolean
  cta: { title: string; text: string; primary: string; assistant: string }
  check?: { href: string; label: string }
  resource?: {
    href: string
    label: string
    title: string
    text: string
    guideHref: string
    guideLabel: string
  }
  faqs?: { question: string; answer: string }[]
  sources?: { href: string; label: string }[]
  contact?: {
    email?: string
    phone?: string
    address?: string
    calendar?: string
  }
  meta: { title: string; description: string }
}

export const SUBPAGES: Record<string, SubPageContent> = {
  // ───────────────────────── LÖSUNGEN ─────────────────────────
  "loesungen/gtm-markteintritt": {
    slug: "loesungen/gtm-markteintritt",
    parentSlug: "loesungen",
    parentLabel: "Lösungen",
    navLabel: "GTM: Markteintritt",
    problem: {
      title: "Ihre Kunden suchen längst. Nur nicht bei Ihnen.",
      body: [
        "Jeden Monat suchen Tausende in der Schweiz genau das, was Sie anbieten – bei Google, und immer öfter direkt bei ChatGPT. Gefunden wird, wer dort steht. Die anderen existieren für den Kunden schlicht nicht.",
        "Und wenn doch eine Anfrage kommt: 19 Uhr, Feierabend. Bis morgen früh hat der Interessent längst beim Nächsten unterschrieben.",
      ],
      kicker: "Der Markt wartet nicht.",
    },
    agitate: {
      title: "Jede unbeantwortete Anfrage ist ein Geschenk an Ihre Konkurrenz.",
      bullets: [
        {
          lead: "Die KI-Suche kennt Sie nicht.",
          text: "Immer mehr Kunden fragen ChatGPT statt Google – wer dort nicht auftaucht, wird nicht einmal verglichen.",
        },
        {
          lead: "Nach 5 Minuten ist der Lead kalt.",
          text: "Die Abschlusswahrscheinlichkeit fällt um ein Vielfaches, wenn die Antwort Stunden statt Sekunden dauert.",
        },
        {
          lead: "Kaltakquise verpufft.",
          text: "Streuverlust statt planbarer Termine – und Ihre besten Leute verbrennen ihre Zeit am Telefon.",
        },
      ],
      outro: [
        "Jeder Monat ohne System vergrössert den Vorsprung der Konkurrenz, die längst automatisiert gefunden wird und automatisiert antwortet.",
      ],
    },
    solution: {
      title:
        "Der agentische Markteintritt: gefunden werden, sofort antworten, Termin sichern.",
      intro: [
        "Wir bauen Ihre Kundengewinnung als System: Zuerst messen wir mit dem Branchen-Radar die echte Nachfrage in Ihrer Region – dann besetzen KI-Agenten jeden Schritt vom ersten Klick bis zum vollen Kalender.",
      ],
      changeTitle: "Das ändert sich ab Tag eins:",
      bullets: [
        {
          lead: "Sichtbar in Google & KI-Antworten",
          text: "– SEO und AIO/GEO sorgen dafür, dass Google UND ChatGPT Sie empfehlen, bevor die Konkurrenz genannt wird.",
        },
        {
          lead: "Kampagnen mit klarem Preisschild",
          text: "– bezahlte Werbung, gesteuert auf Kosten pro Termin statt auf Klicks. Sie sehen jeden Franken und was er bringt.",
        },
        {
          lead: "Speed-to-Lead in Sekunden",
          text: "– ob Formular, Anruf oder WhatsApp: ein Agent meldet sich sofort, qualifiziert und bucht den Termin. 24/7, auch am Sonntag.",
        },
        {
          lead: "Nachfassen läuft automatisch",
          text: "– kein Interessent geht mehr vergessen: freundliche Follow-ups per E-Mail und Telefon, bis der Termin steht oder ein klares Nein.",
        },
        {
          lead: "Volle Kalender statt Telefon-Pingpong",
          text: "– der Agent vereinbart Termine direkt in Ihrer Agenda und erinnert beide Seiten.",
        },
      ],
      easyTitle: "So einfach wie Microsoft Office",
      easyText:
        "Kein neues Tool zum Lernen. Ein klares Dashboard zeigt Nachfrage, Anfragen und Termine – der Rest läuft automatisiert. Daten bleiben in der Schweiz.",
    },
    chart: {
      type: "funnel",
      title: "Vom Unsichtbaren zum Kunden",
      steps: [
        { label: "Sichtbar", pct: 100 },
        { label: "Anfrage", pct: 62 },
        { label: "Termin", pct: 38 },
        { label: "Kunde", pct: 22 },
      ],
    },
    chartAccent: "#57C7FF",
    relatedAngebot: ["begeistern", "umsetzen"],
    gtmPlaybook: true,
    interactive: {
      label: "Live-Element: Speed-to-Lead-Simulator",
      text: "Eine Anfrage trifft ein – sehen Sie live, wie ein Agent in Sekunden antwortet und einen Termin bucht.",
    },
    cta: {
      title: "Sehen Sie Ihren Markteintritt in Zahlen.",
      text: "Der Branchen-Radar zeigt, wie viele Menschen in Ihrer Region jeden Monat nach Ihrem Angebot suchen – und wer diese Anfragen heute bekommt. Spoiler: Es muss nicht die Konkurrenz sein.",
      primary: "Jetzt kostenlosen Rückruf sichern",
      assistant: "Markteintritt prüfen",
    },
    meta: {
      title: "GTM: Kundengewinnung mit KI-Agenten",
      description:
        "Go-to-Market als System: Sichtbarkeit in Google & KI-Antworten (SEO/AIO), Kampagnen auf Kosten pro Termin, Speed-to-Lead in Sekunden, automatische Termine. Planbar statt Kaltakquise.",
    },
  },

  "loesungen/revops-umsatzgenerierung": {
    slug: "loesungen/revops-umsatzgenerierung",
    parentSlug: "loesungen",
    parentLabel: "Lösungen",
    navLabel: "RevOps: Umsatzgenerierung",
    problem: {
      title: "Kunden sind da. Der Umsatz bleibt trotzdem liegen.",
      body: [
        "Dieselbe Excel-Tabelle zum dritten Mal aktualisiert. Ein Vertrag läuft unbemerkt aus.",
        "Marketing, Vertrieb und Service arbeiten nebeneinander – in den Lücken dazwischen verschwindet Ihr Umsatz.",
      ],
      kicker: "Wachstum, das nicht ankommt.",
    },
    agitate: {
      title:
        "Jeder manuelle Prozess kostet mehr als ein neuer Kunde einbringt.",
      bullets: [
        {
          lead: "Abwanderung unbemerkt.",
          text: "Kündigungen kommen selten aus heiterem Himmel – die Warnsignale werden nur übersehen.",
        },
        {
          lead: "Fleissarbeit statt Facharbeit.",
          text: "Ihre besten Leute tippen Daten ab, statt zu beraten.",
        },
        {
          lead: "Bestand ungenutzt.",
          text: "Der günstigste Umsatz – aus bestehenden Kunden – bleibt liegen.",
        },
      ],
      outro: [
        "Das ist kein Wachstum. Das ist ein Bremsklotz, den Sie jeden Monat teurer bezahlen.",
      ],
    },
    solution: {
      title: "Der agentische RevOps-Motor: binden, ausbauen, automatisieren.",
      intro: [
        "Wir verbinden Marketing, Vertrieb und Service zu einem System, das Kunden hält, ausbaut – und den Betrieb im Hintergrund am Laufen.",
      ],
      changeTitle: "Das ändert sich ab Tag eins:",
      bullets: [
        {
          lead: "Kündigungs-Frühwarnung",
          text: "erkennt Abwanderung, bevor sie passiert.",
        },
        {
          lead: "Bestands-Ausbau",
          text: "– mehr Umsatz aus Kunden, die Sie längst haben.",
        },
        {
          lead: "Prozesse laufen von allein",
          text: "– erfassen, prüfen, weiterleiten, fehlerfrei.",
        },
        {
          lead: "Referenz aus dem Markt:",
          text: "vergleichbare KI-Systeme erreichen im Schnitt 171 % ROI.",
        },
      ],
      easyTitle: "So einfach wie Microsoft Office",
      easyText:
        "Ein klares Dashboard zeigt jederzeit, wo jeder Kunde steht. Kein Tool-Wirrwarr, Daten bleiben in der Schweiz.",
    },
    chart: {
      type: "line",
      title: "Umsatz pro Kunde über Zeit (Index)",
      xLabels: ["Start", "+3 Mt.", "+6 Mt.", "+12 Mt."],
      agentic: [100, 122, 148, 178],
      now: [100, 103, 106, 107],
    },
    chartAccent: "#1F9A5E",
    relatedAngebot: ["erschaffen", "erweitern"],
    interactive: {
      label: "Live-Element: Wachstumsrechner",
      text: "Geben Sie Kundenzahl und Abwanderungsquote ein und sehen Sie, wie sich Ihr Umsatz über 12 Monate verändert.",
    },
    voiceAgent: {
      agentId: "agent_0201kwjmq83cf1btc17d9048pf8n",
      branchId: "agtbrch_6601kvjmepw7fa6thh05fk60s626",
      eyebrow: "RevOps live testen",
      title: "Sprechen Sie mit unserem RevOps-Agenten.",
      description:
        "Testen Sie Kundenbindung, Nachfassung und Wachstum – sprechen Sie direkt mit dem Agenten.",
    },
    cta: {
      title: "Sehen Sie, wie viel Umsatz aktuell liegen bleibt.",
      text: "In einer kostenlosen Analyse zeigen wir Ihnen, wo Umsatz versickert – und was es bringt, das zu schliessen.",
      primary: "Jetzt kostenlose Wachstums-Analyse sichern",
      assistant: "Wachstumspotenzial berechnen",
    },
    meta: {
      title: "RevOps: mehr Umsatz aus bestehenden Kunden",
      description:
        "Kundenbindung, Customer Lifetime Value und Prozessautomatisierung als ein RevOps-Motor. Kein Umsatz versickert mehr. Schweizer Datenhaltung.",
    },
  },

  // ───────────────────────── TECHNOLOGIE ─────────────────────────
  "technologie/autonome-ki-agenten": {
    slug: "technologie/autonome-ki-agenten",
    parentSlug: "technologie",
    parentLabel: "Technologie",
    navLabel: "KI-Agenten",
    problem: {
      title: "KI-Agenten mit klarer Aufgabe.",
      body: [
        "Anfragen einordnen, Informationen zusammentragen oder einen nächsten Schritt vorbereiten: Wir entwickeln KI-Agenten für einen konkreten Ablauf in Ihrem Betrieb.",
      ],
    },
    agitate: {
      title: "Was soll der Agent übernehmen?",
      bullets: [
        {
          lead: "Eine konkrete Aufgabe",
          text: "Wählen Sie einen wiederkehrenden Vorgang mit erkennbarem Ergebnis.",
        },
        {
          lead: "Die richtigen Informationen",
          text: "Legen Sie fest, welche Quellen der Agent verwenden darf und welche Angaben fehlen können.",
        },
        {
          lead: "Klare Befugnisse",
          text: "Trennen Sie Lesen, Vorbereiten und Ausführen nach Freigabe.",
        },
      ],
    },
    solution: {
      title: "Vom Eingang zum geprüften nächsten Schritt.",
      intro: [
        "Beispiel: Eine Anfrage kommt an. Der Agent ordnet das Anliegen ein und bereitet eine Aufgabe für die zuständige Person vor. Vor einer ausgehenden Nachricht prüft Ihr Team den Entwurf.",
      ],
      changeTitle: "So planen wir Ihren Ablauf",
      bullets: [
        {
          lead: "Eingang und Ziel",
          text: "Auslöser, benötigte Angaben und gewünschtes Ergebnis festhalten.",
        },
        {
          lead: "Werkzeuge und Grenzen",
          text: "Zugriffe auf die tatsächlich benötigten Funktionen begrenzen.",
        },
        {
          lead: "Freigabe und Übergabe",
          text: "Zuständige Person und Verhalten bei Unsicherheit bestimmen.",
        },
        {
          lead: "Prüfung im Alltag",
          text: "Ergebnisse, Kontrollaufwand und Fehlerfälle vor dem Ausbau bewerten.",
        },
      ],
      easyTitle: "Ihr Team bleibt handlungsfähig.",
      easyText:
        "Wir vereinbaren, wann der Ablauf stoppt und wie Mitarbeitende übernehmen. Anbieter, Datenwege und Betrieb werden für Ihre Lösung gesondert geklärt.",
    },
    check: {
      href: "/anfragen-check",
      label: "Anfrageweg prüfen",
    },
    resource: {
      href: "/vorlagen/AgenticIT-KI-Einsatzkarte.txt",
      label: "KI-Einsatzkarte speichern (.txt)",
      title: "Welche Aufgabe würden Sie abgeben?",
      text: "Die Einsatzkarte hält Aufgabe, Quellen, Befugnisse und Prüffälle zusammen. Füllen Sie sie mit einem erfundenen Beispiel aus.",
      guideHref: "/blog/eigene-ki-agenten-vs-chatgpt",
      guideLabel: "Tool, Workflow oder eigener Agent?",
    },
    cta: {
      title: "Mit einem konkreten Anfrageweg starten.",
      text: "Der Anfragen-Check zeigt, wo Zuständigkeit, Bearbeitung oder Nachfassen heute ungeklärt sind. Das Ergebnis ist direkt verfügbar; eine persönliche Anfrage ist freiwillig.",
      primary: "Anfrageweg prüfen",
      assistant: "Anfrageweg prüfen",
    },
    faqs: [
      {
        question: "Was unterscheidet einen Agenten von einem festen Workflow?",
        answer:
          "Ein Workflow folgt vorgegebenen Schritten. Ein KI-Agent kann innerhalb seiner Befugnisse den nächsten Schritt und passende Werkzeuge auswählen. Für klar geregelte Aufgaben kann ein einfacher Workflow ausreichen.",
      },
      {
        question: "Darf der Agent selbstständig Kunden anschreiben?",
        answer:
          "Ausgehende Sales-Nachrichten und geschäftliche Empfehlungen benötigen bei unseren Abläufen eine menschliche Freigabe. Wir legen diese Kontrolle technisch fest und bestimmen, wer unklare Fälle übernimmt.",
      },
      {
        question: "Können bestehende Programme angebunden werden?",
        answer:
          "Wir prüfen die verfügbaren Schnittstellen, Rechte und benötigten Daten Ihrer Programme. Erst danach legen wir fest, welche Verbindung möglich ist und welche Anpassungen sie erfordert.",
      },
      {
        question: "Wie beginnen wir ohne IT-Vorkenntnisse?",
        answer:
          "Beschreiben Sie eine konkrete Aufgabe, den heutigen Ablauf und das gewünschte Ergebnis. Die Einsatzkarte unterstützt Sie dabei. Einrichtung, Einweisung, Abnahme und Betrieb vereinbaren wir gemeinsam.",
      },
    ],
    sources: [
      {
        href: "https://www.anthropic.com/engineering/building-effective-agents",
        label: "Anthropic: einfache Workflows und Agentenarchitektur (2024)",
      },
      {
        href: "https://genai.owasp.org/llmrisk/llm062025-excessive-agency/",
        label: "OWASP: Befugnisse und menschliche Freigabe (2025)",
      },
    ],
    meta: {
      title: "KI-Agenten für Unternehmen: Aufgaben und Umsetzung",
      description:
        "KI-Agenten für Ihren Betrieb: Anfragen einordnen, Arbeit vorbereiten und Tools verbinden. Mit klaren Befugnissen, menschlicher Freigabe und einer KI-Einsatzkarte.",
    },
  },

  "technologie/multi-agenten-systeme": {
    slug: "technologie/multi-agenten-systeme",
    parentSlug: "technologie",
    parentLabel: "Technologie",
    navLabel: "Multi-Agenten-Systeme",
    problem: {
      title: "Mehrere KI-Agenten. Ein klarer Ablauf.",
      body: [
        "Manche Aufgaben lassen sich sinnvoll aufteilen: Informationen zusammentragen, einen Entwurf erstellen und das Ergebnis prüfen. Wir klären, ob mehrere Agenten dafür einen Nutzen gegenüber einer einfacheren Lösung bringen.",
      ],
    },
    agitate: {
      title: "Wann lohnt sich eine Aufteilung?",
      bullets: [
        {
          lead: "Trennbare Teilaufgaben",
          text: "Jeder Teil braucht ein klares Ziel und eine definierte Übergabe.",
        },
        {
          lead: "Begrenzte Informationen",
          text: "Jede Rolle erhält nur die Quellen und Funktionen, die sie für ihre Aufgabe benötigt.",
        },
        {
          lead: "Messbarer Nutzen",
          text: "Qualität, Bearbeitungszeit, Kosten und menschlicher Kontrollaufwand werden gemeinsam betrachtet.",
        },
      ],
    },
    solution: {
      title: "Aufteilen, zusammenführen und prüfen.",
      intro: [
        "Planungsbeispiel: Eine Rolle sammelt freigegebene Informationen, eine zweite bereitet eine Antwort vor, eine dritte prüft vorgegebene Kriterien. Ihr Team entscheidet über den Versand. Dieses Beispiel beschreibt einen möglichen Aufbau, kein Kundenresultat.",
      ],
      changeTitle: "Darauf kommt es an",
      bullets: [
        {
          lead: "Klare Rollen",
          text: "Auftrag und erwartetes Ergebnis je Teilaufgabe beschreiben.",
        },
        {
          lead: "Geprüfte Übergaben",
          text: "Fehlende Angaben und widersprüchliche Ergebnisse erkennen und weitergeben.",
        },
        {
          lead: "Begrenzter Aufwand",
          text: "Schritte, Kostenrahmen und Stoppbedingungen festlegen.",
        },
        {
          lead: "Vergleichbare Prüffälle",
          text: "Den Aufbau mit einer einfacheren Lösung an derselben Aufgabe vergleichen.",
        },
      ],
      easyTitle: "Mehr Technik braucht einen Grund.",
      easyText:
        "Zusätzliche Agenten bringen Koordinationsaufwand und weitere Fehlermöglichkeiten mit. Ob sich die Aufteilung lohnt, wird am konkreten Ablauf geprüft.",
    },
    check: {
      href: "/automatisierungs-check",
      label: "Automatisierungs-Check starten",
    },
    resource: {
      href: "/vorlagen/AgenticIT-KI-Einsatzkarte.txt",
      label: "KI-Einsatzkarte speichern (.txt)",
      title: "Erst die Aufgabe greifbar machen.",
      text: "Notieren Sie Eingang, Quellen, gewünschtes Ergebnis und Prüffälle in der Einsatzkarte. Die Aufteilung in mehrere Rollen ist erst der nächste Schritt.",
      guideHref: "/blog/multi-agenten-systeme-erklaert",
      guideLabel: "Multi-Agenten-Systeme verständlich erklärt",
    },
    cta: {
      title: "Welcher Ablauf kostet heute Zeit?",
      text: "Der Automatisierungs-Check rechnet mit Ihren Angaben und berücksichtigt zusätzliche Kontrolle. Er liefert eine erste Einschätzung und keine Garantie für die Leistung eines Agenten-Teams.",
      primary: "Automatisierungs-Check starten",
      assistant: "Automatisierungs-Check starten",
    },
    faqs: [
      {
        question: "Brauchen wir mehrere KI-Agenten?",
        answer:
          "Nur wenn die Aufteilung für Ihre Aufgabe einen nachvollziehbaren Nutzen bringt. Wir beginnen mit einer möglichst einfachen Lösung und vergleichen einen komplexeren Aufbau anhand festgelegter Prüffälle.",
      },
      {
        question: "Sind mehrere Agenten schneller oder genauer?",
        answer:
          "Das hängt von Aufgabe, Abhängigkeiten und Koordination ab. Zusätzliche Schritte können auch Zeit und Kosten erhöhen. Eine Aussage ist erst nach einem Vergleich mit denselben Prüffällen sinnvoll.",
      },
      {
        question: "Wer kontrolliert das Gesamtergebnis?",
        answer:
          "Wir bestimmen Prüfkriterien und eine zuständige Person. Ausgehende Sales-Nachrichten und geschäftliche Empfehlungen bleiben an eine menschliche Freigabe gebunden. Ungeklärte Ergebnisse werden nicht als fertig behandelt.",
      },
      {
        question: "Welche Angaben benötigen Sie für die Planung?",
        answer:
          "Eine Beispielaufgabe, freigegebene Quellen, das gewünschte Ergebnis und typische Fehlerfälle. Verwenden Sie für die erste Vorbereitung erfundene Angaben und teilen Sie keine Kundendaten oder Zugangsschlüssel.",
      },
    ],
    sources: [
      {
        href: "https://www.anthropic.com/engineering/building-effective-agents",
        label: "Anthropic: einfache Workflows und Agentenarchitektur (2024)",
      },
      {
        href: "https://genai.owasp.org/llmrisk/llm062025-excessive-agency/",
        label: "OWASP: Befugnisse und menschliche Freigabe (2025)",
      },
    ],
    meta: {
      title: "Multi-Agenten-Systeme sinnvoll planen",
      description:
        "Wann mehrere KI-Agenten sinnvoll sind: Rollen, Übergaben, Kosten und Kontrolle verständlich erklärt. Mit Einsatzkarte und passendem Automatisierungs-Check.",
    },
  },

  "technologie/enterprise-integration": {
    slug: "technologie/enterprise-integration",
    parentSlug: "technologie",
    parentLabel: "Technologie",
    navLabel: "Systemintegration",
    problem: {
      title: "Ihre Systeme. Ein verbundener Ablauf.",
      body: [
        "Website, CRM, E-Mail und Buchhaltung sollen Informationen passend weitergeben. Wir planen und entwickeln die Verbindungen, damit Zuständigkeiten, Daten und nächste Schritte zusammenpassen.",
      ],
    },
    agitate: {
      title: "Wo gehen Informationen heute verloren?",
      bullets: [
        {
          lead: "Mehrfach erfassen",
          text: "Dieselben Angaben werden in mehreren Programmen von Hand gepflegt.",
        },
        {
          lead: "Unklare Zuständigkeit",
          text: "Eine Anfrage ist vorhanden, aber niemand weiss sicher, wer den nächsten Schritt übernimmt.",
        },
        {
          lead: "Fehler ohne Rückmeldung",
          text: "Eine Übergabe scheitert, ohne dass das zuständige Team davon erfährt.",
        },
      ],
    },
    solution: {
      title: "Eine Übergabe nach der anderen verbinden.",
      intro: [
        "Planungsbeispiel: Eine Website-Anfrage wird geprüft, im CRM zugeordnet und als Aufgabe einer zuständigen Person übergeben. Erst eine bestätigte Rückmeldung gilt als erfolgreiche Übergabe.",
      ],
      changeTitle: "Das legen wir gemeinsam fest",
      bullets: [
        {
          lead: "Führendes System",
          text: "Für jede wichtige Information bestimmen, wo der gültige Stand gepflegt wird.",
        },
        {
          lead: "Felder und Zuordnung",
          text: "Erforderliche Angaben, Zuständigkeiten und Regeln für vorhandene Einträge definieren.",
        },
        {
          lead: "Fehler und Wiederholungen",
          text: "Festlegen, wie fehlgeschlagene Übergaben gemeldet und doppelte Ausführungen behandelt werden.",
        },
        {
          lead: "Zugriffe und Freigabe",
          text: "Berechtigungen auf die Aufgabe begrenzen und kritische Aktionen vor der Ausführung prüfen.",
        },
      ],
      easyTitle: "Bestehende Programme zuerst prüfen.",
      easyText:
        "Verfügbare Schnittstellen, Lizenzumfang und Datenqualität bestimmen den Aufwand. Welche Programme bleiben und welche Anpassungen nötig sind, klären wir vor der Umsetzung.",
    },
    check: {
      href: "/crm-ablauf-check",
      label: "CRM-Ablauf prüfen",
    },
    resource: {
      href: "/vorlagen/AgenticIT-Anfrage-CRM-Pruefplan.txt",
      label: "Anfrage-CRM-Prüfplan speichern (.txt)",
      title: "Ihre nächste Übergabe auf einem Blatt.",
      text: "Halten Sie Eingang, Zielfelder, Zuständigkeit und Fehlerfälle fest. Der Prüfplan hilft bei der Vorbereitung, ohne echte Daten übertragen zu müssen.",
      guideHref: "/blog/ki-automatisierung-vertrieb",
      guideLabel: "Von der Anfrage ins CRM: Leitfaden lesen",
    },
    cta: {
      title: "Wie soll eine Anfrage bei Ihnen ankommen?",
      text: "Der CRM-Ablauf-Check ordnet Ihre Angaben und erstellt einen bearbeitbaren Sollablauf. So lassen sich fehlende Felder und Zuständigkeiten vor einer Einrichtung besprechen.",
      primary: "CRM-Ablauf prüfen",
      assistant: "CRM-Ablauf prüfen",
    },
    faqs: [
      {
        question: "Können Sie jedes Programm verbinden?",
        answer:
          "Das lässt sich erst nach einer Prüfung sagen. Wir benötigen geeignete Schnittstellen, passende Berechtigungen und eine geklärte Datenzuordnung. Lizenzgrenzen und notwendige Anpassungen gehören in die Planung.",
      },
      {
        question: "Müssen wir unser CRM wechseln?",
        answer:
          "Wir prüfen zuerst das bestehende CRM und Ihren Ablauf. Ein Wechsel ist keine Voraussetzung. Ob Anpassungen oder ein anderes System nötig sind, hängt von Ihren Anforderungen ab.",
      },
      {
        question:
          "Wie werden doppelte oder fehlgeschlagene Übergaben behandelt?",
        answer:
          "Wir legen Erkennungsmerkmale, Rückmeldungen und Wiederholungsregeln fest und prüfen diese mit Beispielvorgängen. Das zuständige Team braucht einen sichtbaren Weg, um Fehler zu bearbeiten.",
      },
      {
        question: "Wo liegen unsere Daten nach der Verbindung?",
        answer:
          "Das hängt von den beteiligten Programmen und Diensten ab. Anbieter, Verarbeitungsorte, Zugriffe und Aufbewahrung werden für die konkrete Verbindung geklärt. Eine Schnittstelle allein belegt keine bestimmte Datenhaltung.",
      },
    ],
    sources: [
      {
        href: "https://www.anthropic.com/engineering/building-effective-agents",
        label: "Anthropic: einfache Workflows und Agentenarchitektur (2024)",
      },
      {
        href: "https://genai.owasp.org/llmrisk/llm062025-excessive-agency/",
        label: "OWASP: Befugnisse und menschliche Freigabe (2025)",
      },
      {
        href: "https://api-security.owasp.org/editions/2023/en/0xa1-broken-object-level-authorization/",
        label: "OWASP API Security: Berechtigungen je Datenobjekt (2023)",
      },
    ],
    meta: {
      title: "CRM und KI mit bestehenden Systemen verbinden",
      description:
        "Website, CRM und weitere Programme verbinden: Datenzuordnung, Zuständigkeiten, Fehlerfälle und Zugriffe. Mit Anfrage-CRM-Prüfplan und CRM-Ablauf-Check.",
    },
  },
}

export const SUBPAGE_SLUGS = Object.keys(SUBPAGES)

// Unterseiten gruppiert nach Eltern-Hub (für Verlinkung in den Hub-Seiten).
export const SUBPAGES_BY_PARENT: Record<string, SubPageContent[]> =
  SUBPAGE_SLUGS.reduce(
    (acc, key) => {
      const page = SUBPAGES[key]
      ;(acc[page.parentSlug] ||= []).push(page)
      return acc
    },
    {} as Record<string, SubPageContent[]>,
  )
