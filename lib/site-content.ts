import { industryLabels } from "@/lib/lead-pricing"

export type LeadSource =
  | "home"
  | "ai-agents"
  | "revops"
  | "excellence"
  | "omnichannel"
  | "intelligence"
  | "smart-apps"
  | "case-studies"
  | "blog"

export type ServiceSlug = Exclude<LeadSource, "home">

// Slugs that have a dedicated service landing page (excludes "blog" / "case-studies",
// which are content pages, not service pages).
// "omnichannel"/"intelligence" bleiben als Content-Quelle für die kombinierte
// Excellence-Seite erhalten, haben aber keine eigene Route mehr.
export type ServicePageSlug =
  | "ai-agents"
  | "revops"
  | "excellence"
  | "omnichannel"
  | "intelligence"
  | "smart-apps"

export type ServicePageContent = {
  slug: ServicePageSlug
  navLabel: string
  eyebrow: string
  title: string
  subtitle: string
  primaryCta: string
  sections: {
    title: string
    body: string
    bullets: string[]
  }[]
  useCases: {
    title: string
    text: string
  }[]
  form: {
    title: string
    description: string
    submitLabel: string
    selectFields: {
      name: "leadVolume" | "challenge" | "industry" | "goal"
      label: string
      options: string[]
    }[]
  }
}

export const navItems = [
  { name: "RevOps", href: "/revops" },
  { name: "AI Agents", href: "/ai-agents" },
  { name: "Excellence", href: "/excellence" },
  { name: "Case Studies", href: "/case-studies" },
  { name: "Über uns", href: "/ueber-uns" },
]

export const servicePages: Record<ServicePageSlug, ServicePageContent> = {
  revops: {
    slug: "revops",
    navLabel: "RevOps",
    eyebrow: "Revenue Operations aus einer Hand",
    title: "Ihre Kundengewinnung – als ein eingespieltes System.",
    subtitle:
      "Von der ersten Anfrage bis zum anrufbereiten Kontakt: AgenticIT verbindet Marketing, Vertrieb und Daten zu einem reibungslosen Ablauf. Sie konzentrieren sich aufs Abschliessen – um den Rest kümmern wir uns.",
    primaryCta: "Unverbindlich kennenlernen",
    sections: [
      {
        title: "Ein System statt vieler Insellösungen",
        body:
          "Marketing, Vertrieb, CRM und Daten greifen bei uns ineinander – kein Tool-Wirrwarr, keine Übergabeverluste. Sie bekommen ein Ergebnis, keine Baustelle.",
        bullets: [
          "Werbung, Landing Pages und Lead-Erfassung aus einer Hand",
          "Saubere Übergabe ins CRM – ohne doppelte Datenpflege",
          "Ein Ansprechpartner für den ganzen Ablauf",
        ],
      },
      {
        title: "Warme Anfragen, anrufbereit übergeben",
        body:
          "Jede Anfrage wird sofort beantwortet, qualifiziert und vorbereitet. Sie erhalten Kontakte, die wirklich interessiert sind – mit allen Details fürs Gespräch.",
        bullets: [
          "Antwort in Sekunden, rund um die Uhr",
          "Nur warme, qualifizierte Kontakte statt kalter Listen",
          "Branche, Anliegen und Kontext direkt mitgeliefert",
        ],
      },
      {
        title: "Wir betreiben es – Sie sehen das Ergebnis",
        body:
          "Hosting, Automationen und laufende Optimierung übernehmen wir im Hintergrund. Sie merken nur, dass mehr und bessere Anfragen ankommen.",
        bullets: [
          "Always-on Betrieb ohne Technik-Aufwand für Sie",
          "Laufende Optimierung anhand echter Zahlen",
          "3 Monate unverbindlich testen – keine Startkosten",
        ],
      },
    ],
    useCases: [
      {
        title: "Mehr warme Anfragen",
        text: "Wir bringen Ihnen passende Interessenten direkt aufs Handy – Sie rufen an und schliessen ab.",
      },
      {
        title: "Weniger Aufwand",
        text: "Anfragen beantworten, qualifizieren und vorbereiten läuft automatisch im Hintergrund.",
      },
      {
        title: "Voller Überblick",
        text: "Sie sehen jederzeit, was reinkommt und was sich lohnt – ohne selbst Daten pflegen zu müssen.",
      },
    ],
    form: {
      title: "Lernen wir uns kurz kennen.",
      description:
        "Hinterlassen Sie uns kurz Ihre Angaben – wir melden uns mit einem unverbindlichen Rückruf und zeigen, wie RevOps bei Ihnen aussieht.",
      submitLabel: "Rückruf anfragen",
      selectFields: [
        { name: "industry", label: "Branche", options: industryLabels },
        {
          name: "goal",
          label: "Was ist Ihnen am wichtigsten?",
          options: ["Mehr Anfragen", "Weniger Aufwand", "Bessere Daten", "Schnellere Reaktion"],
        },
      ],
    },
  },
  excellence: {
    slug: "excellence",
    navLabel: "Excellence",
    eyebrow: "Omnichannel-Dialog & Data Intelligence",
    title: "Jeder Kanal, ein Gespräch – und Daten, die Prioritäten setzen.",
    subtitle:
      "AgenticIT verbindet alle Kanäle zu einem nahtlosen Dialog und macht aus jeder Interaktion klare Prioritäten – damit sich Ihr Team auf die richtigen Kontakte konzentriert.",
    primaryCta: "Excellence-Audit anfragen",
    sections: [
      {
        title: "Kanalübergreifende Gesprächsführung",
        body:
          "Omnichannel ohne Kontextverlust: Chat, E-Mail und Telefon als ein Dialog – die KI führt jede Journey nahtlos weiter.",
        bullets: [
          "WhatsApp, Web, Mail und Phone als ein zusammenhängender Dialog",
          "Zentrale Lead-Historie statt isolierter Postfächer",
          "Sofortige Übergabe an menschliche Teams mit vollständigem Kontext",
        ],
      },
      {
        title: "Automatisierte Touchpoints",
        body:
          "Follow-ups, Erinnerungen, Qualifizierung und Terminbestätigung – kanalgerecht und zum richtigen Zeitpunkt.",
        bullets: [
          "Trigger für neue Anfragen, offene Angebote und verpasste Termine",
          "Personalisierte Nachrichten statt generischer Kampagnen",
          "Messbare Reaktionsgeschwindigkeit über alle Kanäle hinweg",
        ],
      },
      {
        title: "Predicting Lead Scoring",
        body:
          "Lead Scoring in Echtzeit: Kaufwahrscheinlichkeit, Bedarf und Timing – Ihr Vertrieb sieht sofort die heissesten Leads.",
        bullets: [
          "Scores aus Gesprächsinhalt, Verhalten und CRM-Signalen",
          "Segmentierung nach Buyer Persona, Potenzial und Dringlichkeit",
          "Automatische Alerts für kaufbereite Accounts",
        ],
      },
      {
        title: "Conversation Intelligence & Cockpit",
        body:
          "Jedes Gespräch wird strukturiert, jede Kennzahl sichtbar: Motive, Einwände und nächste Schritte – plus ein Cockpit mit dem grössten ROI-Hebel auf einen Blick.",
        bullets: [
          "Semantische Zusammenfassungen und Themencluster",
          "Messbare Speed-to-Lead-, Conversion- und Follow-up-Kennzahlen",
          "Klare Handlungsempfehlungen für Sales, Marketing und Service",
        ],
      },
    ],
    useCases: [
      {
        title: "Ein Gespräch über alle Kanäle",
        text: "Egal wo der Kunde schreibt – der Dialog bleibt nahtlos, nichts geht verloren.",
      },
      {
        title: "Hot Leads zuerst",
        text: "Ihr Team sieht sofort, welche Anfragen jetzt Abschlusswahrscheinlichkeit haben.",
      },
      {
        title: "Termin- und Angebotsstrecken",
        text: "Bestätigungen, Erinnerungen und Nachfassaktionen laufen automatisch und kanalgenau.",
      },
      {
        title: "Klarer Überblick",
        text: "Antwortzeiten, Übergaben und Engpässe werden messbar, bevor sie Umsatz kosten.",
      },
    ],
    form: {
      title: "Wo verlieren Sie heute Kontext – und Chancen?",
      description:
        "Wir skizzieren, wie ein nahtloser Omnichannel-Dialog mit Lead Scoring bei Ihnen aussieht.",
      submitLabel: "Excellence-Audit anfragen",
      selectFields: [
        { name: "industry", label: "Branche", options: industryLabels },
        {
          name: "goal",
          label: "Primäres Ziel",
          options: ["Schnellere Reaktion", "Mehr Termine", "Bessere Daten", "Service entlasten"],
        },
      ],
    },
  },
  "ai-agents": {
    slug: "ai-agents",
    navLabel: "AI Agents",
    eyebrow: "Conversational AI & Sales Automation",
    title: "KI Agenten für Vertrieb: autonom, präzise und 24/7 im Einsatz.",
    subtitle:
      "AgenticIT entfesselt KI Agenten für Schweizer Unternehmen: Inbound-Anfragen sofort qualifizieren, Outbound-Teams coachen und jede Interaktion nahtlos ins CRM einordnen.",
    primaryCta: "Jetzt KI-Potenzial entfesseln",
    sections: [
      {
        title: "Smart Inbound Automation",
        body:
          "KI Agenten übernehmen Erstannahme per Telefon, Web und WhatsApp: Termine buchen, Leads qualifizieren, komplexe Fälle mit Historie an Ihr Team übergeben.",
        bullets: [
          "Speed-to-Lead in Sekunden – auch abends und am Wochenende",
          "Lead-Qualifizierung nach Bedarf, Budget, Dringlichkeit und Absicht",
          "CRM, Kalender und Follow-ups ohne Medienbruch synchronisiert",
        ],
      },
      {
        title: "Outbound Co-Piloting",
        body:
          "Conversational AI coacht Outbound-Gespräche live: Signale, Transkripte und Follow-ups mit klarer Kaufabsicht – direkt nach dem Call.",
        bullets: [
          "Live-Hinweise für Einwandbehandlung und Next Best Action",
          "Deal-Zusammenfassungen mit Risiken und Chancen automatisch",
          "Personalisierte Nachfass-Sequenzen unmittelbar nach dem Gespräch",
        ],
      },
      {
        title: "Skalierbarkeit ohne Kompromisse",
        body:
          "Skalieren Sie wie Ihr bestes Team – digital, ohne Pause: volle Lead-Abdeckung, kontinuierliches Lernen aus jedem Gespräch.",
        bullets: [
          "Keine verpassten Anfragen dank 24/7 Lead-Abdeckung",
          "Vertrieb fokussiert nur noch vorqualifizierte Chancen",
          "Semantisches Verständnis jeder Anfrage für besseres Scoring",
        ],
      },
    ],
    useCases: [
      {
        title: "Inbound-Leads sichern",
        text: "Inbound über Web, WhatsApp, Mail und Telefon: Antwort, Lead Scoring und Übergabe in Sekunden.",
      },
      {
        title: "Sales-Teams stärken",
        text: "Gesprächsnotizen, Kaufmotive und nächste Schritte werden automatisch strukturiert, damit Ihr Team schneller und präziser abschliesst.",
      },
      {
        title: "Service entlasten",
        text: "Routinefragen, Terminwünsche und Statusabfragen laufen automatisiert, während Spezialfälle menschlich eskaliert werden.",
      },
    ],
    form: {
      title: "Bereit für autonome KI Agenten?",
      description:
        "Kostenloses Potenzial-Audit: Sehen Sie, wie viele Leads heute durch langsame Speed-to-Lead-Reaktion verloren gehen.",
      submitLabel: "Jetzt KI-Potenzial entfesseln",
      selectFields: [
        { name: "leadVolume", label: "Aktuelles Lead-Volumen pro Monat", options: ["< 100", "100-500", "500+"] },
        {
          name: "challenge",
          label: "Grösste Herausforderung aktuell",
          options: ["Inbound-Erreichbarkeit", "Outbound-Performance", "Lead-Qualifizierung", "Etwas anderes"],
        },
      ],
    },
  },
  omnichannel: {
    slug: "omnichannel",
    navLabel: "Omnichannel",
    eyebrow: "Customer Journeys ohne Brüche",
    title: "Eine Konversation. Jeder Kanal. Vollständige Kontinuität.",
    subtitle:
      "AgenticIT orchestriert WhatsApp Business API, Web, Mail und Telefon zu einer nahtlosen Journey – jeder Kontaktpunkt behält Kontext, Kunden fühlen sich sofort verstanden.",
    primaryCta: "Omnichannel-Journey prüfen",
    sections: [
      {
        title: "Kanalübergreifende Gesprächsführung",
        body:
          "Omnichannel ohne Kontextverlust: Chat, E-Mail und Telefon als ein Dialog – die KI führt jede Journey nahtlos weiter.",
        bullets: [
          "WhatsApp, Web, Mail und Phone als ein zusammenhängender Dialog",
          "Zentrale Lead-Historie statt isolierter Postfächer",
          "Sofortige Übergabe an menschliche Teams mit vollständigem Kontext",
        ],
      },
      {
        title: "Automatisierte Touchpoints",
        body:
          "Automatisierte Touchpoints: Follow-ups, Erinnerungen, Qualifizierung und Terminbestätigung – kanalgerecht und zum richtigen Zeitpunkt.",
        bullets: [
          "Trigger für neue Anfragen, offene Angebote und verpasste Termine",
          "Personalisierte Nachrichten statt generischer Kampagnen",
          "Messbare Reaktionsgeschwindigkeit über alle Kanäle hinweg",
        ],
      },
      {
        title: "Journey-Design für Wachstum",
        body:
          "AgenticIT modelliert Ihre Kundenpfade und automatisiert Interaktionen, die Kaufbereitschaft erhöhen und Reibung in der Journey entfernen.",
        bullets: [
          "Klare Phasen von Erstkontakt bis Abschluss",
          "Priorisierung nach Wert, Dringlichkeit und Kaufabsicht",
          "CRM- und Kalender-Integration für operative Verlässlichkeit",
        ],
      },
    ],
    useCases: [
      {
        title: "Lead Nurturing",
        text: "Relevante Antworten und nächste Schritte per Omnichannel – auch wenn Ihr Team offline ist.",
      },
      {
        title: "Termin- und Angebotsstrecken",
        text: "Bestätigungen, Erinnerungen und Nachfassaktionen laufen automatisch und kanalgenau.",
      },
      {
        title: "Premium Support",
        text: "Kunden bekommen schnelle Hilfe auf ihrem bevorzugten Kanal, ohne die Anfrage neu erklären zu müssen.",
      },
    ],
    form: {
      title: "Ihre Journey ist nur so stark wie ihr schwächster Kanal.",
      description: "Journey-Audit: Wo geht Kontext verloren – und wie eine Omnichannel-Architektur mit WhatsApp Business API hilft.",
      submitLabel: "Journey-Audit anfragen",
      selectFields: [
        {
          name: "challenge",
          label: "Grösster Kanalbruch",
          options: ["WhatsApp", "Website-Chat", "E-Mail", "Telefon", "CRM-Übergabe"],
        },
        {
          name: "goal",
          label: "Primäres Ziel",
          options: ["Schnellere Reaktion", "Mehr Termine", "Bessere Daten", "Service entlasten"],
        },
      ],
    },
  },
  intelligence: {
    slug: "intelligence",
    navLabel: "Intelligence",
    eyebrow: "Predicting Data Intelligence",
    title: "Lead Scoring und Data Intelligence für klare Prioritäten.",
    subtitle:
      "AgenticIT analysiert Leads, Gespräche und Verhalten in Echtzeit, erkennt Kaufabsichten früh und macht aus jeder Interaktion einen datenbasierten Wachstumshebel.",
    primaryCta: "Datenpotenzial sichtbar machen",
    sections: [
      {
        title: "Predicting Lead Scoring",
        body:
          "Predicting Lead Scoring in Echtzeit: Kaufwahrscheinlichkeit, Bedarf und Timing – Ihr Vertrieb sieht sofort die heissesten Leads.",
        bullets: [
          "Scores aus Gesprächsinhalt, Verhalten und CRM-Signalen",
          "Segmentierung nach Buyer Persona, Potenzial und Dringlichkeit",
          "Automatische Alerts für kaufbereite Accounts",
        ],
      },
      {
        title: "Conversation Intelligence",
        body:
          "Conversation Intelligence strukturiert jedes Gespräch: Motive, Einwände, Interessen und nächste Schritte – ohne manuelle Auswertung.",
        bullets: [
          "Semantische Zusammenfassungen und Themencluster",
          "Erkennung wiederkehrender Fragen, Reibungen und Abschlussbarrieren",
          "Klare Handlungsempfehlungen für Sales, Marketing und Service",
        ],
      },
      {
        title: "Management Cockpit",
        body:
          "Management-Cockpit: Kanal-Performance, verpasste Chancen und Automationen mit dem grössten ROI-Hebel auf einen Blick.",
        bullets: [
          "Messbare Speed-to-Lead-, Conversion- und Follow-up-Kennzahlen",
          "Transparenz über verpasste Chancen und Reaktionslücken",
          "Strategische Entscheidungsgrundlage für Wachstum und Budget",
        ],
      },
    ],
    useCases: [
      {
        title: "Hot Leads priorisieren",
        text: "Sales sieht sofort, welche Anfragen jetzt Abschlusswahrscheinlichkeit haben und wo manuell nachgefasst werden muss.",
      },
      {
        title: "Marketing präzisieren",
        text: "Echte First-Party-Signale zeigen, welche Botschaften, Branchen und Angebote Nachfrage erzeugen.",
      },
      {
        title: "Operations steuern",
        text: "Antwortzeiten, Übergaben und Engpässe werden messbar, bevor sie Umsatz kosten.",
      },
    ],
    form: {
      title: "Welche Daten bleiben heute ungenutzt?",
      description:
        "Wir skizzieren ein Intelligence-Cockpit, das aus Ihren vorhandenen Interaktionen konkrete Wachstumsentscheidungen ableitet.",
      submitLabel: "Intelligence-Audit sichern",
      selectFields: [
        {
          name: "industry",
          label: "Branche",
          options: ["Automotive", "E-Commerce", "Finance", "Health", "Education", "Andere"],
        },
        {
          name: "goal",
          label: "Analyseziel",
          options: ["Lead Scoring", "Conversion Insights", "Sales Coaching", "Management Dashboard"],
        },
      ],
    },
  },
  "smart-apps": {
    slug: "smart-apps",
    navLabel: "Smart Apps",
    eyebrow: "Digitale Kunden-Apps mit echtem Nutzen",
    title: "Smart Apps, die Leads generieren und Kunden binden.",
    subtitle:
      "AgenticIT formt aus Branchen-Use-Cases konkrete KI-Mini-Apps – mit echtem Nutzen, besserer Datenqualität und mehr Lead-Potenzial für Schweizer Unternehmen.",
    primaryCta: "App-Potenzial entdecken",
    sections: [
      {
        title: "Lifestyle & Alltag",
        body:
          "KI-Mini-Apps für Routinen, Gesundheit und Alltag – hohe Wiederkehr und First-Party-Daten für Lead Scoring.",
        bullets: [
          "Good Habits",
          "Fitness-App",
          "Long-Livity",
        ],
      },
      {
        title: "Reise, Community & Familie",
        body:
          "Produktnahe Apps für Informationszugang, Orientierung und langfristige Nutzerbindung in klar definierten Zielgruppen.",
        bullets: [
          "Ferien-Info",
          "Expats-App",
          "Learn-App (Familie)",
        ],
      },
      {
        title: "Finance, Legal & Utility",
        body:
          "Conversion-orientierte Apps, die Beratung, Qualifizierung und konkrete nächste Schritte in einem Flow verbinden.",
        bullets: [
          "Finance Budget",
          "Advok.app Rechtsberatung",
          "Food-Foto-Kalorien",
        ],
      },
    ],
    useCases: [
      {
        title: "Produkt-Fit pro Branche",
        text: "App-Logik und Features passend zu Produkt, Zielgruppe und Nutzerverhalten in der Schweiz.",
      },
      {
        title: "Mehrwert vor Werbung",
        text: "Jede Smart App liefert zuerst konkreten Nutzen und erzeugt daraus nachhaltige Interaktion.",
      },
      {
        title: "Gespräche definieren den Rahmen",
        text: "Grenzen, Prioritäten und Zielmetriken definieren wir gemeinsam im persönlichen Gespräch.",
      },
    ],
    form: {
      title: "Bereit für Ihre eigene Smart App?",
      description:
        "Smart App als Lead-Magnet mit echtem Nutzen – statt Budget in Werbung ohne messbare Speed-to-Lead-Wirkung.",
      submitLabel: "Jetzt App-Potenzial entdecken",
      selectFields: [
        { name: "industry", label: "Branche", options: ["Travel", "EdTech", "Finance & Health", "Legal", "Andere"] },
        {
          name: "goal",
          label: "Ziel",
          options: ["Leads generieren", "Daten sammeln", "Kundenbindung", "Beratung skalieren"],
        },
      ],
    },
  },
}
