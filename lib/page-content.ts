// AgenticIT: Hub-Inhalte. Lösungen und Technologie am 17.10.2026 überarbeitet.
// Die übrigen Einträge gehören zu getrennten Bestandsseiten.

export type Feature = {
  icon: string
  title: string
  subtitle: string
  text: string
  bullets: string[]
  href?: string
  check?: { href: string; label: string }
  /** Optionales Label zur GTM/RevOps-Einordnung (nur Technologie-Hub). */
  groupLabel?: string
  groupColor?: string
}

export type PageContent = {
  slug: string
  eyebrow: string
  h1: string
  lead: string
  introTitle: string
  introText: string
  features: Feature[]
  closingTitle: string
  closingText: string
  check?: { href: string; label: string }
  links?: { href: string; label: string }[]
  faqs?: { question: string; answer: string }[]
  schemaType?: "CollectionPage" | "WebPage"
  sources?: { href: string; label: string }[]
  meta: { title: string; description: string }
}

export const PAGES: Record<string, PageContent> = {
  loesungen: {
    slug: "loesungen",
    eyebrow: "Unsere Lösungen",
    h1: "Marketing. Sales. Digitalisierung & KI.",
    lead: "Wir verbinden Ihren Auftritt, Ihre Kundengewinnung und Ihre täglichen Abläufe. Sie erhalten passende Tools und einen Partner für die Umsetzung – damit Ihr Team mehr Zeit für Kunden hat.",
    introTitle: "Drei Bereiche. Ein durchgängiger Ablauf.",
    introText:
      "Starten Sie dort, wo heute der grösste Bedarf liegt. Wir stimmen Systeme, Zuständigkeiten und nächste Schritte aufeinander ab.",
    features: [
      {
        icon: "",
        title: "Marketing",
        subtitle: "Die Grundlage für neue Anfragen",
        text: "Ihr Angebot wird verständlich und Ihre digitale Präsenz bereit für den nächsten Schritt.",
        bullets: [
          "Website und Landingpages auf Ihre Zielgruppe ausrichten",
          "Werbekonten, Tools und Messung vorbereiten",
          "Inhalte und hilfreiche Lead-Magnete entwickeln",
          "Anfragewege vor dem Kampagnenstart prüfen",
        ],
        href: "/loesungen/gtm-markteintritt",
        check: {
          href: "/marketing-setup-check",
          label: "Marketing-Setup prüfen",
        },
      },
      {
        icon: "",
        title: "Sales",
        subtitle: "Aus Interesse den nächsten Schritt machen",
        text: "Kampagnen, CRM und Team greifen ineinander. Jede Anfrage bekommt eine zuständige Person und eine passende nächste Aktion.",
        bullets: [
          "Kampagnen auf die richtigen Interessenten ausrichten",
          "Anfragen im CRM erfassen und zuordnen",
          "Team bei Gesprächen und Nachfassen unterstützen",
          "Termine und Bearbeitungsstände nachvollziehbar halten",
        ],
        href: "/loesungen/revops-umsatzgenerierung",
        check: {
          href: "/anfragen-check",
          label: "Anfrageweg prüfen",
        },
      },
      {
        icon: "",
        title: "Digitalisierung & KI",
        subtitle: "Routine abgeben. Überblick behalten.",
        text: "Wir vereinfachen wiederkehrende Arbeit und verbinden die dafür nötigen Programme.",
        bullets: [
          "Manuelle und zeitraubende Aufgaben auswählen",
          "Kundenverwaltung und Übergaben verbinden",
          "KI für geeignete Aufgaben einrichten und testen",
          "Ihr Team einweisen und Abläufe weiterentwickeln",
        ],
        href: "/loesungen/prozessautomatisierung",
        check: {
          href: "/automatisierungs-check",
          label: "Zeitpotenzial prüfen",
        },
      },
    ],
    closingTitle: "Wo würde Entlastung am meisten helfen?",
    closingText:
      "Der Kundenreise-Check ordnet Ihre Ausgangslage ein und zeigt einen passenden Einstieg. Das Ergebnis können Sie direkt ansehen und speichern. Eine persönliche Anfrage ist anschliessend freiwillig.",
    check: {
      href: "/kundenreise-check",
      label: "Passenden Einstieg finden",
    },
    links: [
      {
        href: "/loesungen/webdesign",
        label: "Webdesign im Detail",
      },
      {
        href: "/loesungen/ki-entwicklung",
        label: "KI-Entwicklung im Detail",
      },
      {
        href: "/angebot",
        label: "Services nach Ihrer Aufgabe auswählen",
      },
      {
        href: "/excellence",
        label: "Marketing-Kanäle und Anfragewege planen",
      },
      {
        href: "/case-studies",
        label: "Unsere Website als Praxisbeispiel",
      },
    ],
    faqs: [
      {
        question: "Müssen wir alle drei Bereiche gleichzeitig angehen?",
        answer:
          "Nein. Wir wählen gemeinsam einen sinnvollen Einstieg und betrachten die angrenzenden Übergaben mit. Umfang, Zuständigkeiten und Kosten der Umsetzung vereinbaren wir vor dem Start.",
      },
      {
        question: "Was ist der Unterschied zwischen Marketing und Sales?",
        answer:
          "Marketing schafft die Grundlage für Sichtbarkeit und passende Anfragen. Sales kümmert sich um Bearbeitung, Gespräche und nächste Schritte. CRM, Messung und Team verbinden beide Bereiche.",
      },
      {
        question: "Arbeiten die KI-Lösungen ohne menschliche Kontrolle?",
        answer:
          "Wir legen fest, was ein System lesen, vorbereiten oder ausführen darf. Ausgehende Sales-Nachrichten und geschäftliche Empfehlungen benötigen eine menschliche Freigabe. Unklare Fälle gehen an Ihr Team.",
      },
      {
        question: "Können wir unsere bisherigen Programme behalten?",
        answer:
          "Wir prüfen zuerst Ihre vorhandenen Programme, Schnittstellen und Daten. Ob diese weiterverwendet werden können und welche Anpassungen nötig sind, hängt vom konkreten Ablauf ab.",
      },
    ],
    meta: {
      title: "Marketing, Sales und Digitalisierung mit KI",
      description:
        "AgenticIT verbindet Marketing, Sales und Digitalisierung mit KI. Entdecken Sie die drei Bereiche, Webdesign, KI-Entwicklung und passende unverbindliche Checks.",
    },
  },

  technologie: {
    slug: "technologie",
    eyebrow: "Technologie verständlich",
    h1: "Technik, die Ihre Abläufe verbindet.",
    lead: "Ein fester Workflow, ein KI-Agent oder mehrere spezialisierte Agenten: Wir wählen die Lösung nach Ihrer Aufgabe und verbinden sie mit den passenden Systemen.",
    introTitle: "Was passt zu Ihrer Aufgabe?",
    introText:
      "Der Alltag gibt die Richtung vor. Wir betrachten benötigte Informationen, Befugnisse, Kontrollaufwand und Betrieb – bevor wir zusätzliche Technik einführen.",
    features: [
      {
        icon: "",
        title: "KI-Agenten",
        subtitle: "Informationen nutzen. Arbeit vorbereiten.",
        text: "Ein Agent kann Informationen einordnen und freigegebene Werkzeuge nutzen. Aufgabe und Grenzen werden konkret festgelegt.",
        bullets: [
          "Anliegen anhand freigegebener Quellen einordnen",
          "Nächste Schritte und Entwürfe vorbereiten",
          "Befugnisse auf die Aufgabe begrenzen",
          "Unklare Fälle an das Team übergeben",
        ],
        href: "/technologie/autonome-ki-agenten",
        check: {
          href: "/anfragen-check",
          label: "Anfrageweg prüfen",
        },
      },
      {
        icon: "",
        title: "Multi-Agenten-Systeme",
        subtitle: "Teilaufgaben sinnvoll aufteilen.",
        text: "Mehrere Agenten kommen infrage, wenn getrennte Aufgaben und klare Übergaben einen nachweisbaren Nutzen bringen.",
        bullets: [
          "Aufgaben und benötigte Informationen trennen",
          "Ergebnisse vor der Übergabe prüfen",
          "Zeit, Qualität und Kosten vergleichen",
          "Mit einer einfacheren Lösung abgleichen",
        ],
        href: "/technologie/multi-agenten-systeme",
        check: {
          href: "/automatisierungs-check",
          label: "Aufgabe einschätzen",
        },
      },
      {
        icon: "",
        title: "Systemintegration",
        subtitle: "Ihre Programme miteinander verbinden.",
        text: "Wir planen, wie Website, CRM, E-Mail oder Buchhaltung Informationen austauschen sollen.",
        bullets: [
          "Führendes System je Information festlegen",
          "Felder und Zuständigkeiten zuordnen",
          "Dubletten und fehlgeschlagene Übergaben behandeln",
          "Zugriffe und Datenwege je Lösung klären",
        ],
        href: "/technologie/enterprise-integration",
        check: {
          href: "/crm-ablauf-check",
          label: "CRM-Ablauf prüfen",
        },
      },
    ],
    closingTitle: "Erst die Aufgabe. Dann die Technik.",
    closingText:
      "Mit dem Automatisierungs-Check halten Sie manuelle Arbeit, möglichen Automatisierungsanteil und zusätzlichen Kontrollaufwand fest. So entsteht eine nachvollziehbare erste Einschätzung.",
    check: {
      href: "/automatisierungs-check",
      label: "Automatisierungs-Check starten",
    },
    links: [
      {
        href: "/loesungen/ki-entwicklung",
        label: "So entwickeln wir Ihre KI-Lösung",
      },
      {
        href: "/blog/eigene-ki-agenten-vs-chatgpt",
        label: "Tool, Workflow oder eigener Agent?",
      },
    ],
    faqs: [
      {
        question: "Brauchen wir für jede Automatisierung KI?",
        answer:
          "Nein. Feste Zuordnungen und klar geregelte Abläufe lassen sich häufig ohne KI umsetzen. KI kann sinnvoll sein, wenn freie Texte oder wechselnde Informationen eingeordnet werden müssen.",
      },
      {
        question: "Sind mehrere Agenten automatisch besser?",
        answer:
          "Nein. Aufteilung und Koordination verursachen zusätzlichen Aufwand. Wir vergleichen eine einfache Lösung mit dem komplexeren Aufbau anhand derselben Aufgabe und festgelegter Prüffälle.",
      },
      {
        question: "Wer entscheidet über Aktionen nach aussen?",
        answer:
          "Ihr Unternehmen legt Zuständigkeiten und Befugnisse fest. Ausgehende Sales-Nachrichten und geschäftliche Empfehlungen durchlaufen eine menschliche Freigabe. Fehler und unklare Fälle brauchen einen definierten Übergabeweg.",
      },
      {
        question: "Wo werden unsere Daten verarbeitet?",
        answer:
          "Das hängt von den gewählten Programmen, Modellen und Hostingdiensten ab. Vor einer Umsetzung klären wir Anbieter, Verarbeitungsorte, Zugriffe und Aufbewahrung für die konkrete Lösung.",
      },
    ],
    meta: {
      title: "KI-Agenten, Workflows und Systemintegration",
      description:
        "Welche Technik passt zu Ihrem Betrieb? AgenticIT erklärt KI-Agenten, Multi-Agenten-Systeme und Systemintegration – mit Beispielen, Teamkontrolle und passenden Checks.",
    },
  },

  sicherheit: {
    slug: "sicherheit",
    eyebrow: "KI und Daten",
    schemaType: "WebPage",
    h1: "KI nutzen. Daten im Blick.",
    lead: "Welche Informationen braucht Ihre Lösung? Welche Dienste sind beteiligt? Wer darf den nächsten Schritt ausführen? Wir klären diese Fragen mit Ihnen, bevor wir einen Ablauf einrichten.",
    introTitle: "Drei Bereiche, die wir gemeinsam klären.",
    introText:
      "So wird aus einer allgemeinen Sicherheitsfrage ein konkreter Plan für Ihren Betrieb und Ihr Team.",
    features: [
      {
        icon: "",
        title: "Daten und Dienste",
        subtitle: "Wissen, was wohin fliesst.",
        text: "Wir betrachten die benötigten Informationen und die beteiligten Programme als zusammenhängenden Ablauf.",
        bullets: [
          "Aufgabe, Zweck und benötigte Angaben festhalten",
          "Anbieter und Verarbeitungsorte prüfen",
          "Nutzung der Eingaben durch Anbieter klären",
          "Aufbewahrung und Löschung vereinbaren",
        ],
      },
      {
        icon: "",
        title: "Zugriffe und Rollen",
        subtitle: "Befugnisse passend zur Aufgabe.",
        text: "Wer Informationen lesen kann, braucht nicht automatisch das Recht, sie zu verändern oder weiterzugeben.",
        bullets: [
          "Freigegebene Quellen und Systeme bestimmen",
          "Lesezugriff und Änderungen getrennt festlegen",
          "Kunden- und Unternehmensbereiche abgrenzen",
          "Zuständige Personen und Zugänge dokumentieren",
        ],
      },
      {
        icon: "",
        title: "Freigabe und Betrieb",
        subtitle: "Ihr Team behält die Verantwortung.",
        text: "Wir legen fest, wann ein System vorbereiten darf, wann Ihr Team entscheidet und wie es bei Problemen weitergeht.",
        bullets: [
          "Sales-Nachrichten vor dem Versand freigeben",
          "KI-Assistenten zu Beginn als KI kennzeichnen",
          "Fehler und unklare Fälle an Menschen übergeben",
          "Prüfung, Einweisung und Betreuung vereinbaren",
        ],
      },
    ],
    closingTitle: "Ihr Vorhaben auf einer Seite vorbereiten.",
    closingText:
      "Die KI-Einsatzkarte hält Aufgabe, Quellen, Befugnisse und Prüffälle zusammen. Nutzen Sie ein erfundenes Beispiel ohne Kundendaten oder Zugangsschlüssel. Bringen Sie die offenen Fragen ins Gespräch mit.",
    check: {
      href: "/vorlagen/AgenticIT-KI-Einsatzkarte.txt?download=1",
      label: "KI-Einsatzkarte speichern (.txt)",
    },
    links: [
      {
        href: "/datenschutz",
        label: "Datenschutz dieser Website",
      },
      {
        href: "/blog/ki-agenten-sicherheit-compliance",
        label: "KI-Abläufe planen und prüfen",
      },
    ],
    faqs: [
      {
        question: "Bleiben alle Daten in der Schweiz?",
        answer:
          "Die Verarbeitungsorte hängen von den gewählten Programmen, Modellen und Hostingdiensten ab. Wir klären Anbieter, Datenwege und Zugriffe für Ihre konkrete Lösung vor der Einrichtung. Massgeblich sind die tatsächlich beteiligten Dienste und ihre Vereinbarungen.",
      },
      {
        question: "Werden unsere Eingaben für das Training von KI verwendet?",
        answer:
          "Das hängt vom Anbieter, dem verwendeten Angebot und dessen Einstellungen und Vereinbarungen ab. Wir prüfen vor dem Einsatz, wie Eingaben genutzt und aufbewahrt werden dürfen. Für erste Beispiele verwenden wir erfundene Angaben ohne Personendaten.",
      },
      {
        question: "Welche Aktionen brauchen eine menschliche Freigabe?",
        answer:
          "Ausgehende Sales-Nachrichten und geschäftliche Empfehlungen benötigen eine menschliche Freigabe. Wir bestimmen die zuständige Rolle und legen fest, welche Informationen ein System lesen, welche Schritte es vorbereiten und wann ein Mensch übernehmen soll.",
      },
      {
        question: "Was können wir vor dem ersten Gespräch vorbereiten?",
        answer:
          "Beschreiben Sie eine Aufgabe, die betroffenen Programme und das gewünschte Ergebnis. Die KI-Einsatzkarte hilft, Quellen, Befugnisse und Prüffälle festzuhalten. Offene Fragen dürfen offenbleiben; Passwörter oder echte Kundendossiers gehören nicht in die Vorlage.",
      },
    ],
    sources: [
      {
        href: "https://www.edoeb.admin.ch/de/ki-und-datenschutz",
        label: "EDÖB: KI und Datenschutz",
      },
      {
        href: "https://www.bacs.admin.ch/de/csm26-s3-de",
        label: "BACS: KI im Berufsalltag – Empfehlungen vom 16.10.2026",
      },
      {
        href: "https://genai.owasp.org/llmrisk/llm062025-excessive-agency/",
        label: "OWASP: Begrenzte Befugnisse und menschliche Freigabe",
      },
    ],
    meta: {
      title: "KI und Datenschutz: Datenwege, Zugriffe und Kontrolle",
      description:
        "Wie AgenticIT KI-Vorhaben vorbereitet: Anbieter, Datenwege, Zugriffe und menschliche Freigabe klären. Mit frei nutzbarer KI-Einsatzkarte und offiziellen Grundlagen.",
    },
  },

  branchen: {
    // Neu (26.07.2026, SEMrush-validiert: "ki im vertrieb", "vertriebsautomatisierung",
    // "lead management"): Positionierung statt Branchen-Verticals. Wir sind auf
    // Vertrieb spezialisiert statt auf alles ein bisschen.
    slug: "branchen",
    eyebrow: "Branchen",
    h1: "KI im Vertrieb. Spezialisiert, nicht generisch.",
    lead: "Ihr Vertriebsteam verbringt den Tag mit allem, was kein Verkaufsgespräch ist: nachfassen, protokollieren, Termine jonglieren. Wir sind darauf spezialisiert, genau das von einem digitalen Kollegen übernehmen zu lassen.",
    introTitle: "Vertriebsautomatisierung über die ganze Kundenreise.",
    introText:
      "Von der ersten Anfrage bis zum treuen Stammkunden holen wir das Maximum aus KI und Ihren Daten heraus – damit Ihr Team schneller verkauft und Kunden schneller zu dem kommen, was sie wollen.",
    features: [
      {
        icon: "🔁",
        title: "Wiederkehrende Aufgaben automatisiert",
        subtitle: "Zeit zurück für das Verkaufsgespräch",
        text: "Nachfassen, Terminplanung, Protokolle, CRM-Pflege – Agenten übernehmen die Routine über die ganze Journey, Ihr Team führt die Gespräche.",
        bullets: [
          "Kein Follow-up geht mehr vergessen",
          "CRM pflegt sich von selbst",
          "Mehr Zeit im direkten Kundenkontakt",
        ],
      },
      {
        icon: "📊",
        title: "Maximaler Wert aus Ihren Daten",
        subtitle: "Data Intelligence statt Bauchgefühl",
        text: "Wir holen aus Ihren bestehenden Daten heraus, welcher Lead reif ist, welcher Kunde abwandert und wo der nächste Abschluss wartet.",
        bullets: [
          "Erkennt reife Leads automatisch",
          "Warnt vor Abwanderung, bevor sie passiert",
          "Priorisiert, wo sich der Einsatz lohnt",
        ],
      },
      {
        icon: "🏁",
        title: "Schneller zum Ziel des Kunden",
        subtitle: "Kürzere Wege, zufriedenere Kunden",
        text: "Je schneller ein Kunde bekommt, was er will, desto eher kauft, bleibt und empfiehlt er weiter.",
        bullets: [
          "Kürzere Antwort- und Durchlaufzeiten",
          "Weniger Reibung zwischen den Abteilungen",
          "Höhere Weiterempfehlungsrate",
        ],
      },
    ],
    closingTitle: "Zeigen wir Ihnen, wo Ihr Vertriebsteam Zeit verliert.",
    closingText:
      "In einem kostenlosen Gespräch analysieren wir Ihren Vertriebsalltag und zeigen konkret, welche Aufgabe sich zuerst automatisieren lässt – mit klarer Zahl, was es bringt.",
    meta: {
      title: "KI im Vertrieb für Sales-Teams",
      description:
        "Spezialisiert auf Vertrieb: wiederkehrende Aufgaben automatisiert, maximaler Wert aus Daten, Kunden schneller ans Ziel. Schweizer Datenhaltung.",
    },
  },

  unternehmen: {
    slug: "unternehmen",
    eyebrow: "Unternehmen",
    h1: "Wir reden nicht über die Zukunft. Wir bauen sie für Sie.",
    lead: "Die KI-Agentur aus der Schweiz, die Technologie in messbare Resultate übersetzt – und Ihre Mitarbeiter aktiv mitnimmt.",
    introTitle: "Warum Unternehmen mit uns arbeiten.",
    introText:
      "Wir sind kein anonymes Tech-Haus, sondern Ihr partnerschaftlicher Wegbegleiter in die KI.",
    features: [
      {
        icon: "🤝",
        title: "Über uns",
        subtitle: "Menschen, die KI greifbar machen",
        text: "Technologie ist nur so gut wie der Nutzen, den sie für Menschen schafft.",
        bullets: [
          "Wir analysieren Ihre echte Situation",
          "Wir bauen Berührungsängste ab",
          "Ganzheitlich, Swissness, ROI statt Schickschnack",
        ],
      },
      {
        icon: "📈",
        title: "Praxisbeispiele",
        subtitle: "Zahlen, die für sich sprechen",
        text: "Echte Vorher-Nachher-Kennzahlen aus umgesetzten Projekten – nach Branche filterbar.",
        bullets: [
          "Konkrete Fälle statt Werbefloskeln",
          "Vorher/Nachher mit Zahlen",
          "Gefiltert, damit Sie Ihren Fall erkennen",
        ],
      },
      {
        icon: "📞",
        title: "Kontakt",
        subtitle: "Ihr erster Schritt dauert 60 Sekunden",
        text: "Kein langes Formular, kein Verkaufsdruck. Nur ein einfacher Weg zum Gespräch.",
        bullets: [
          "Direkte Online-Terminbuchung",
          "Oder sofort mit dem KI-Assistenten starten",
          "Persönlich, schnell, unverbindlich",
        ],
      },
    ],
    closingTitle: "Lernen wir uns kennen.",
    closingText:
      "In einem kostenlosen Erstgespräch zeigen wir Ihnen eine konkrete Aufgabe, die wir für Sie automatisieren könnten – mit einer klaren Zahl, was das bringt.",
    meta: {
      title: "Über AgenticIT | Ihre KI-Agentur aus der Schweiz",
      description:
        "Wir machen KI greifbar – mit Schweizer Datenhaltung und messbarem ROI. Lernen Sie das Team kennen, das Ihr digitales Team aufbaut.",
    },
  },
}

export const HUB_SLUGS = Object.keys(PAGES)
