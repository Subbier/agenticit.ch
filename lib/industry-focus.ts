export type IndustrySlug =
  | "beratung"
  | "versicherungen"
  | "treuhand"
  | "gastronomie"
  | "gesundheit"
  | "autohaus"
  | "immobilien"
  | "fitness"
  | "handwerk"
  | "hotellerie"

export type IndustryFocus = {
  slug: IndustrySlug
  label: string
  title: string
  description: string
  headline: string
  intro: string
  audience: string
  flow: readonly (readonly [string, string])[]
  areas: readonly {
    name: string
    copy: string
    items: readonly string[]
    href: string
  }[]
  checkHref: string
  checkLabel: string
  checkTitle: string
  checkCopy: string
  faqs: readonly { question: string; answer: string }[]
  relatedSlugs?: readonly IndustrySlug[]
}

export const industryFocus: readonly IndustryFocus[] = [
  {
    slug: "beratung",
    label: "Beratung & Vorsorge",
    title: "KI und Digitalisierung für Beratung und Vorsorge",
    description:
      "Marketing, Sales und Administration für Beratungsfirmen, Finanz- und Vorsorgeberatung verbinden. Mit passendem Auftritt, CRM und Abläufen für Ihr Team.",
    headline: "Digitalisierung für Ihr Beratungsteam.",
    intro:
      "Wir verbinden Marketing, Vertrieb und Administration für Beratungsfirmen, Finanz- und Vorsorgeberatung. Ihr Auftritt erklärt das Angebot, Ihr CRM führt Anfragen weiter und passende Automatisierungen unterstützen die Arbeit rund ums Gespräch.",
    audience:
      "Für Beratungsteams mit persönlichem Kontakt, Telesales oder Aussendienst.",
    flow: [
      ["Eine passende Anfrage", "Anliegen und Quelle strukturiert übernehmen"],
      [
        "Ein vorbereitetes Gespräch",
        "Zuständigkeit und benötigte Unterlagen zusammenführen",
      ],
      [
        "Ein klarer nächster Schritt",
        "Vereinbarung, Aufgabe und Kundenstart festhalten",
      ],
    ],
    areas: [
      {
        name: "Marketing",
        copy: "Ihr Angebot verständlich zeigen und den Einstieg ins Gespräch vorbereiten.",
        items: [
          "Zielgruppe und Beratungsangebot schärfen",
          "Website und passende Inhalte gestalten",
          "Nützliche Checks und Anfragewege verbinden",
          "Konten, Messung und Freigaben klären",
        ],
        href: "/loesungen/gtm-markteintritt",
      },
      {
        name: "Sales",
        copy: "Anfragen im Team bearbeiten und Gespräche nachvollziehbar weiterführen.",
        items: [
          "Anfragen und Zuständigkeiten im CRM erfassen",
          "Telefonteam und Aussendienst verbinden",
          "Gespräche und Offerten vorbereiten",
          "Nächsten Kontakt gemeinsam vereinbaren",
        ],
        href: "/loesungen/revops-umsatzgenerierung",
      },
      {
        name: "Administration",
        copy: "Wiederkehrende Arbeit um Beratung und Kundenbetreuung vereinfachen.",
        items: [
          "Gesprächsnotizen als Aufgaben vorbereiten",
          "Unterlagen strukturiert zuordnen",
          "Kundenstart und Betreuung organisieren",
          "Fahrten im Aussendienst dokumentieren",
        ],
        href: "/loesungen/prozessautomatisierung",
      },
    ],
    checkHref: "/marketing-setup-check",
    checkLabel: "Ihr Marketing-Setup prüfen",
    checkTitle: "Steht der Weg zu Ihrer nächsten Anfrage?",
    checkCopy:
      "Fünf Fragen zu Angebot, Auftritt, Konten, Messung und Übergabe. Sie nehmen einen konkreten Plan mit und entscheiden selbst, ob Sie mit uns sprechen möchten.",
    faqs: [
      {
        question: "Passt das auch für Finanz- und Vorsorgeberatung?",
        answer:
          "Wir richten den technischen Ablauf auf Ihr Beratungsangebot und Ihr Team aus: vom Auftritt über die Anfrage und Gesprächsvorbereitung bis zur Betreuung. Fachliche Beurteilungen und Empfehlungen bleiben bei den zuständigen Fachpersonen.",
      },
      {
        question: "Wie nehmen Sie unser Team mit?",
        answer:
          "Wir gehen einen konkreten Ablauf mit den Personen durch, die ihn später nutzen. Danach richten wir die vereinbarten Tools ein, prüfen Beispielvorgänge und üben die Übergaben. Die Einführung konzentriert sich auf Ihre tägliche Arbeit.",
      },
      {
        question: "Können wir unsere bestehenden Tools behalten?",
        answer:
          "Wir prüfen vorhandenes CRM, Telefonie, Kalender und Ablage sowie die verfügbaren Anbindungen. Bestehende Ressourcen fliessen ein. Welche Anpassungen oder zusätzlichen Dienste sinnvoll sind, entscheiden wir anhand des vereinbarten Ablaufs.",
      },
      {
        question: "Wo liegen Daten und Entscheidungen?",
        answer:
          "Datenwege, Anbieter, Speicherorte und Zugriffsrechte werden für den konkreten Auftrag geklärt. KI kann Inhalte und Aufgaben vorbereiten; Ihr Team prüft fachliche Ergebnisse und gibt ausgehende Sales-Nachrichten frei. Kundenorientierte KI-Assistenten kennzeichnen sich als KI.",
      },
      {
        question: "Wie beginnen wir und was kostet es?",
        answer:
          "Wir wählen gemeinsam einen sinnvollen Einstieg und definieren Umfang, Ergebnis, Kosten und Abnahme. Einführung, Lizenzen und laufende Betreuung werden getrennt geplant. Der Check hilft zur ersten Einordnung und erteilt noch keinen Auftrag.",
      },
    ],
  },
  {
    slug: "versicherungen",
    label: "Versicherungen & Broker",
    title: "Digitalisierung für Versicherungsbroker und Beratungsteams",
    description:
      "Marketing, Anfragebearbeitung, CRM und Administration für Versicherungsbroker verbinden. AgenticIT begleitet Ihr Team von der Vorbereitung bis zum Betrieb.",
    headline: "Digitale Abläufe für Ihr Brokerbüro.",
    intro:
      "Vom ersten Interesse bis zur laufenden Kundenbetreuung: Wir verbinden Auftritt, Kampagnen, CRM und wiederkehrende Aufgaben für Versicherungsbroker und Beratungsteams. Ihr Team behält den Überblick und die Verantwortung im Kundengespräch.",
    audience:
      "Für Brokerbüros und Beratungsteams mit Telesales, Aussendienst oder mehreren Standorten.",
    flow: [
      [
        "Das Anliegen kommt an",
        "Quelle und gewünschter Kontaktweg werden übernommen",
      ],
      [
        "Die richtige Person übernimmt",
        "Das Team sieht Zuständigkeit und nächsten Schritt",
      ],
      [
        "Die Betreuung geht weiter",
        "Unterlagen, Vereinbarungen und Anlässe bleiben im Blick",
      ],
    ],
    areas: [
      {
        name: "Marketing",
        copy: "Ein verständlicher Auftritt und ein passender Einstieg für Ihre Zielkunden.",
        items: [
          "Kundengruppe und Angebot abstimmen",
          "Website und Landingpages vorbereiten",
          "Hilfreiche Inhalte und Checks gestalten",
          "Anfrageweg und Einwilligung klären",
        ],
        href: "/loesungen/gtm-markteintritt",
      },
      {
        name: "Sales",
        copy: "Telefonteam, Beratung und Aussendienst am selben Vorgang zusammenbringen.",
        items: [
          "Anliegen und Quelle im CRM erfassen",
          "Verantwortung und Vertretung zuordnen",
          "Gewünschte Beratungstermine abstimmen",
          "Offerten mit nächster Aktion nachhalten",
        ],
        href: "/loesungen/revops-umsatzgenerierung",
      },
      {
        name: "Administration",
        copy: "Die Arbeit rund um Kunden, Unterlagen und Betreuungsanlässe ordnen.",
        items: [
          "Kundendossiers strukturiert führen",
          "Gesprächsnotizen zur Prüfung vorbereiten",
          "Betreuungsanlässe übersichtlich halten",
          "Wiederkehrende Aufgaben vereinfachen",
        ],
        href: "/loesungen/prozessautomatisierung",
      },
    ],
    checkHref: "/anfragen-check",
    checkLabel: "Ihren Anfrageweg prüfen",
    checkTitle: "Wer übernimmt Ihre nächste Anfrage?",
    checkCopy:
      "Fünf kurze Fragen zu Eingang, Zuständigkeit, Reaktion, Nachfassen und Ergebnis. Sie erhalten priorisierte Schritte und einen Plan für Ihr Team.",
    faqs: [
      {
        question: "Arbeiten Sie auch mit kleinen Brokerbüros?",
        answer:
          "Der Einstieg kann ein einzelner Anfrageweg oder eine wiederkehrende Aufgabe sein. Wir stimmen den Umfang mit Ihren Ressourcen ab und beziehen die Personen ein, die den Ablauf im Alltag übernehmen.",
      },
      {
        question: "Kann unser bestehendes CRM weiterarbeiten?",
        answer:
          "Wir prüfen zuerst das vorhandene CRM, die Datenstruktur und verfügbare Anbindungen. Auch eine Plattform wie Zoho CRM muss für Ihren konkreten Ablauf eingerichtet und geprüft werden. Ein neues System wird nur im gemeinsam vereinbarten Umfang eingeführt.",
      },
      {
        question: "Was übernimmt KI in der Versicherungsberatung?",
        answer:
          "KI kann Anliegen strukturieren, freigegebene Informationen finden und Notizen oder Aufgaben vorbereiten. Beratung, fachliche Empfehlungen und Entscheidungen bleiben bei den zuständigen Menschen. Kundenorientierte Assistenten kennzeichnen sich als KI; ausgehende Sales-Nachrichten benötigen eine menschliche Freigabe.",
      },
      {
        question: "Wie behandeln Sie Kundendaten und Kontaktfreigaben?",
        answer:
          "Vor der Umsetzung klären wir Zweck, benötigte Daten, Zugriffsrechte, Anbieter und Speicherorte. Für Kontaktabläufe werden Anlass, gewünschter Kanal, Einwilligung und Abmeldungen berücksichtigt. Diese Punkte gehören zum konkreten Setup und seiner Prüfung.",
      },
      {
        question: "Wie wird aus einer Idee ein nutzbarer Ablauf?",
        answer:
          "Wir nehmen den heutigen Weg mit Ihrem Team auf, richten die vereinbarten Anbindungen ein und prüfen freigegebene Beispiele samt Fehlerfällen. Danach folgen Einführung und vereinbarte Betreuung. Umfang, Kosten und Abnahme stehen vor dem Auftrag fest.",
      },
    ],
  },
]

export const industryImplementation = [
  [
    "Ablauf verstehen",
    "Ziel, heutige Arbeit und Zuständigkeiten mit dem Team aufnehmen.",
  ],
  [
    "Setup vereinbaren",
    "Tools, Datenwege, Zugriffe und menschliche Freigaben festlegen.",
  ],
  [
    "Gemeinsam prüfen",
    "Freigegebene Beispiele, fehlende Angaben und Fehlerfälle durchspielen.",
  ],
  [
    "Im Alltag begleiten",
    "Team einführen, Betrieb klären und gezielte Verbesserungen vereinbaren.",
  ],
] as const
