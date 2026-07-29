// AgenticIT · Inhalte der Hub-Seiten (aus den AIDA-Drafts).
// ⚠️ Human-in-the-Loop: Marktzahlen/ROI vor Live-Schaltung menschlich prüfen.
//
// GTM/RevOps-Split (26.07.2026): "loesungen" verlinkt neu auf die zwei echten
// Unterseiten gtm-markteintritt/revops-umsatzgenerierung (siehe subpage-content.ts).
// "technologie" bekommt keine neuen URLs, die drei Karten sind aber neu als
// GTM- bzw. RevOps-Technologie getaggt (optionales groupLabel/groupColor).
// "branchen" ist neu: Spezialisierung auf Vertrieb statt Branchen-Verticals.

export type Feature = {
  icon: string
  title: string
  subtitle: string
  text: string
  bullets: string[]
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
  meta: { title: string; description: string }
}

export const PAGES: Record<string, PageContent> = {
  loesungen: {
    slug: "loesungen",
    eyebrow: "Lösungen",
    h1: "Schluss mit Fleissarbeit.",
    lead: "Ihre besten Leute verbringen den Tag mit Aufgaben, die ein digitaler Kollege übernimmt – rund um die Uhr. Wir setzen KI dort ein, wo sie sofort Geld spart oder Umsatz bringt.",
    introTitle: "Zwei Wege. Ein Wachstumsmotor.",
    introText: "Kunden gewinnen oder aus bestehenden Kunden mehr machen – wir zeigen Ihnen, wo der grössere Hebel für Sie liegt.",
    features: [
      { icon: "🎯", title: "GTM: Markteintritt", subtitle: "Sichtbar, sofort da, überzeugend", text: "KI-Agenten machen Sie sichtbar, reagieren in Sekunden und führen Interessenten direkt zum Termin.", bullets: ["Sekunden-Reaktion, 24/7", "Sichtbar in Suche & KI-Antworten", "Volle Kalender ohne Telefon-Pingpong"] },
      { icon: "🚀", title: "RevOps: Umsatzgenerierung", subtitle: "Binden, ausbauen, automatisieren", text: "Marketing, Vertrieb und Service als ein System, das Kunden hält, ausbaut und im Hintergrund läuft.", bullets: ["Kündigung erkannt, bevor sie passiert", "Mehr Umsatz aus Bestandskunden", "171 % ROI im Schnitt"] },
    ],
    closingTitle: "Finden wir Ihren grössten Hebel.",
    closingText: "In einem kostenlosen Gespräch zeigen wir Ihnen genau eine Aufgabe, die sich ab nächster Woche automatisieren lässt – samt konkreter Zahl, was Ihnen das bringt.",
    meta: { title: "KI-Lösungen für Schweizer Unternehmen", description: "Ihr digitales Team für Kundendienst-KI, Prozessautomatisierung und Wachstum. Schweizer Datenhaltung, messbarer ROI, startklar ohne Schulung." },
  },

  technologie: {
    slug: "technologie",
    eyebrow: "Technologie",
    h1: "Ein Chatbot redet. Ein KI-Agent handelt.",
    lead: "Die meisten KI-Tools geben Antworten. Ein KI-Agent macht den nächsten Schritt: Er erledigt die Aufgabe – selbstständig, zuverlässig, genau dann, wenn es zählt.",
    introTitle: "Der richtige Stack für Ihr Ziel.",
    introText: "Geht es um Markteintritt (GTM), zählt der Tech-Stack, der Sie sichtbar macht und schnell reagieren lässt. Geht es um RevOps, zählen Agenten, die aus Bestandskunden Umsatz herausholen. Wir wählen die Technologie nach Ihrem Ziel, nicht umgekehrt.",
    features: [
      { icon: "🤖", title: "Autonome KI-Agenten", subtitle: "Der Kollege, der selbst anpackt", text: "Ein autonomer Agent erkennt einen Auslöser und handelt – von Anfang bis Ende, ohne Ihr Zutun. Ideal für die Sekunden-Reaktion beim Markteintritt.", bullets: ["Übernimmt klar definierte Aufgaben komplett", "Arbeitet rund um die Uhr, ohne Müdigkeit", "Sie behalten die Kontrolle über jede Regel"], groupLabel: "GTM-Technologie", groupColor: "#57C7FF" },
      { icon: "🧩", title: "Multi-Agenten-Systeme", subtitle: "Teamarbeit, die Umsatz ausbaut", text: "Ein Hauptagent zerlegt die Aufgabe, mehrere Spezial-Agenten arbeiten gleichzeitig an Kundenbindung, Nachfassung und Ausbau.", bullets: ["Deutlich schneller als ein einzelner Agent", "Jeder Agent Spezialist für seinen Teil", "Wächst mit Ihren Anforderungen mit"], groupLabel: "RevOps-Technologie", groupColor: "#1F9A5E" },
      { icon: "🔌", title: "Enterprise-Integration", subtitle: "Andockt, wo Ihr Umsatz entsteht", text: "Wir integrieren die Agenten in Ihre bestehende Umgebung – E-Mail, Telefonie, CRM, Buchhaltung – als Rückgrat für den RevOps-Motor.", bullets: ["Kein Systemwechsel: Ihre Tools bleiben", "Ein Datenstand für Marketing, Vertrieb, Service", "Sauber, sicher, nach Schweizer Standard"], groupLabel: "RevOps-Technologie", groupColor: "#1F9A5E" },
    ],
    closingTitle: "Erleben Sie einen KI-Agenten – jetzt, live.",
    closingText: "In einem kurzen Gespräch lassen wir einen Agenten eine echte Aufgabe aus Ihrem Alltag übernehmen – damit Sie sehen, was er in Ihrem Betrieb leisten würde.",
    meta: { title: "KI-Agenten & Multi-Agenten-Systeme", description: "Autonome KI-Agenten, die Aufgaben wirklich erledigen – einzeln oder als Team. Sicher in Ihre Systeme integriert, Schweizer Datenhaltung." },
  },

  sicherheit: {
    slug: "sicherheit",
    eyebrow: "Sicherheit",
    h1: "Ihre Daten sind Ihr Kapital. Behalten Sie es.",
    lead: "KI nutzen, ohne firmeninterne Informationen an fremde Server im Ausland zu geben. Bei uns gilt eine klare Regel: Ihre Daten bleiben bei Ihnen.",
    introTitle: "Sicherheit ist bei uns kein Zusatz. Sie ist das Fundament.",
    introText: "Gerade in Treuhand, Finanzbranche und bei Anwälten entscheidet Vertrauen über jeden Auftrag. Deshalb behalten Sie die volle Kontrolle.",
    features: [
      { icon: "🇨🇭", title: "Datensouveränität", subtitle: "Sie bestimmen, wo Ihre Daten liegen", text: "Cloud in der Schweiz oder On-Premise? Sie entscheiden – nicht der Anbieter.", bullets: ["Daten in der Schweiz gespeichert & verarbeitet", "Klar geregelt nach Schweizer DSG", "Jederzeit transparent, wo welche Daten liegen"] },
      { icon: "🔒", title: "Lokale KI-Infrastruktur", subtitle: "Funktioniert sogar offline", text: "Unsere KI kann direkt bei Ihnen im Haus laufen – ohne Abhängigkeit von externen Diensten.", bullets: ["Keine Abhängigkeit von Fremdanbietern", "Läuft weiter, auch ohne Internet", "Was lokal bleibt, kann nicht abfliessen"] },
      { icon: "🛡️", title: "Private Enterprise KI", subtitle: "Eine KI nur für Ihr Unternehmen", text: "Keine geteilte Lösung, kein Training Ihrer Daten für Fremde. Ihre KI gehört Ihnen.", bullets: ["Keine Daten ins Training öffentlicher Modelle", "Zugriff streng geregelt – nur Ihr Unternehmen", "Klare Checkliste: Was bleibt bei Ihnen"] },
    ],
    closingTitle: "Sehen Sie selbst, wie Ihre Daten geschützt bleiben.",
    closingText: "In einem kostenlosen Gespräch zeigen wir Ihnen genau, wo Ihre Daten liegen und wie Sie KI nutzen, ohne Kontrolle abzugeben.",
    meta: { title: "KI & Datenschutz Schweiz | Daten bleiben im Land – AgenticIT", description: "KI nutzen, ohne Ihre Daten aus der Hand zu geben. Schweizer Infrastruktur, DSG-konform, auf Wunsch offline." },
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
    introText: "Von der ersten Anfrage bis zum treuen Stammkunden holen wir das Maximum aus KI und Ihren Daten heraus – damit Ihr Team schneller verkauft und Kunden schneller zu dem kommen, was sie wollen.",
    features: [
      { icon: "🔁", title: "Wiederkehrende Aufgaben automatisiert", subtitle: "Zeit zurück für das Verkaufsgespräch", text: "Nachfassen, Terminplanung, Protokolle, CRM-Pflege – Agenten übernehmen die Routine über die ganze Journey, Ihr Team führt die Gespräche.", bullets: ["Kein Follow-up geht mehr vergessen", "CRM pflegt sich von selbst", "Mehr Zeit im direkten Kundenkontakt"] },
      { icon: "📊", title: "Maximaler Wert aus Ihren Daten", subtitle: "Data Intelligence statt Bauchgefühl", text: "Wir holen aus Ihren bestehenden Daten heraus, welcher Lead reif ist, welcher Kunde abwandert und wo der nächste Abschluss wartet.", bullets: ["Erkennt reife Leads automatisch", "Warnt vor Abwanderung, bevor sie passiert", "Priorisiert, wo sich der Einsatz lohnt"] },
      { icon: "🏁", title: "Schneller zum Ziel des Kunden", subtitle: "Kürzere Wege, zufriedenere Kunden", text: "Je schneller ein Kunde bekommt, was er will, desto eher kauft, bleibt und empfiehlt er weiter.", bullets: ["Kürzere Antwort- und Durchlaufzeiten", "Weniger Reibung zwischen den Abteilungen", "Höhere Weiterempfehlungsrate"] },
    ],
    closingTitle: "Zeigen wir Ihnen, wo Ihr Vertriebsteam Zeit verliert.",
    closingText: "In einem kostenlosen Gespräch analysieren wir Ihren Vertriebsalltag und zeigen konkret, welche Aufgabe sich zuerst automatisieren lässt – mit klarer Zahl, was es bringt.",
    meta: { title: "KI im Vertrieb für Sales-Teams", description: "Spezialisiert auf Vertrieb: wiederkehrende Aufgaben automatisiert, maximaler Wert aus Daten, Kunden schneller ans Ziel. Schweizer Datenhaltung." },
  },

  unternehmen: {
    slug: "unternehmen",
    eyebrow: "Unternehmen",
    h1: "Wir reden nicht über die Zukunft. Wir bauen sie für Sie.",
    lead: "Die KI-Agentur aus der Schweiz, die Technologie in messbare Resultate übersetzt – und Ihre Mitarbeiter aktiv mitnimmt.",
    introTitle: "Warum Unternehmen mit uns arbeiten.",
    introText: "Wir sind kein anonymes Tech-Haus, sondern Ihr partnerschaftlicher Wegbegleiter in die KI.",
    features: [
      { icon: "🤝", title: "Über uns", subtitle: "Menschen, die KI greifbar machen", text: "Technologie ist nur so gut wie der Nutzen, den sie für Menschen schafft.", bullets: ["Wir analysieren Ihre echte Situation", "Wir bauen Berührungsängste ab", "Ganzheitlich, Swissness, ROI statt Schickschnack"] },
      { icon: "📈", title: "Praxisbeispiele", subtitle: "Zahlen, die für sich sprechen", text: "Echte Vorher-Nachher-Kennzahlen aus umgesetzten Projekten – nach Branche filterbar.", bullets: ["Konkrete Fälle statt Werbefloskeln", "Vorher/Nachher mit Zahlen", "Gefiltert, damit Sie Ihren Fall erkennen"] },
      { icon: "📞", title: "Kontakt", subtitle: "Ihr erster Schritt dauert 60 Sekunden", text: "Kein langes Formular, kein Verkaufsdruck. Nur ein einfacher Weg zum Gespräch.", bullets: ["Direkte Online-Terminbuchung", "Oder sofort mit dem KI-Assistenten starten", "Persönlich, schnell, unverbindlich"] },
    ],
    closingTitle: "Lernen wir uns kennen.",
    closingText: "In einem kostenlosen Erstgespräch zeigen wir Ihnen eine konkrete Aufgabe, die wir für Sie automatisieren könnten – mit einer klaren Zahl, was das bringt.",
    meta: { title: "Über AgenticIT | Ihre KI-Agentur aus der Schweiz", description: "Wir machen KI greifbar – mit Schweizer Datenhaltung und messbarem ROI. Lernen Sie das Team kennen, das Ihr digitales Team aufbaut." },
  },
}

export const HUB_SLUGS = Object.keys(PAGES)
