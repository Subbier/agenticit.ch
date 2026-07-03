// AgenticIT · Inhalte der Hub-Seiten (aus den AIDA-Drafts).
// ⚠️ Human-in-the-Loop: Marktzahlen/ROI vor Live-Schaltung menschlich prüfen.

export type Feature = {
  icon: string
  title: string
  subtitle: string
  text: string
  bullets: string[]
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
    introTitle: "Drei Bereiche. Messbare Resultate.",
    introText: "Wir schauen uns Ihre konkrete Situation an und zeigen Ihnen schwarz auf weiss, wo ein digitaler Kollege den grössten Unterschied macht.",
    features: [
      { icon: "💬", title: "Kundendienst-KI", subtitle: "Der Mitarbeiter, der nie schläft", text: "Nimmt Anfragen entgegen, beantwortet die häufigsten Fragen und bucht sogar Termine – automatisch und freundlich.", bullets: ["84 % schneller", "Wichtige Fälle zuerst", "24/7 erreichbar"] },
      { icon: "⚙️", title: "Prozessautomatisierung", subtitle: "Das Ende der Fleissarbeit", text: "Wir verbinden Ihre Systeme und lassen wiederkehrende Abläufe von allein laufen – im Hintergrund, fehlerfrei.", bullets: ["Keine Fehler", "Automatisch starten", "CHF 8–25k/Monat"] },
      { icon: "🚀", title: "RevOps & Growth", subtitle: "Marketing, Vertrieb und Service als ein Motor", text: "Wir verbinden die drei zu einem Wachstumsmotor – datengestützt und automatisiert.", bullets: ["Schneller abschliessen", "Kein Lead verloren", "171 % ROI"] },
    ],
    closingTitle: "Finden wir Ihren grössten Hebel.",
    closingText: "In einem kostenlosen Gespräch zeigen wir Ihnen genau eine Aufgabe, die sich ab nächster Woche automatisieren lässt – samt konkreter Zahl, was Ihnen das bringt.",
    meta: { title: "KI-Lösungen für Unternehmen | Kundendienst, Prozesse & Wachstum – AgenticIT", description: "Ihr digitales Team für Kundendienst-KI, Prozessautomatisierung und Wachstum. Schweizer Datenhaltung, messbarer ROI, startklar ohne Schulung." },
  },

  technologie: {
    slug: "technologie",
    eyebrow: "Technologie",
    h1: "Ein Chatbot redet. Ein KI-Agent handelt.",
    lead: "Die meisten KI-Tools geben Antworten. Ein KI-Agent macht den nächsten Schritt: Er erledigt die Aufgabe – selbstständig, zuverlässig, genau dann, wenn es zählt.",
    introTitle: "Die Technologie hinter Ihrem digitalen Team.",
    introText: "Sie müssen nicht verstehen, wie ein Motor gebaut ist, um Auto zu fahren. Wir kümmern uns um die Technik – Sie sehen das Ergebnis.",
    features: [
      { icon: "🤖", title: "Autonome KI-Agenten", subtitle: "Der Kollege, der selbst anpackt", text: "Ein autonomer Agent erkennt einen Auslöser und handelt – von Anfang bis Ende, ohne Ihr Zutun.", bullets: ["Übernimmt klar definierte Aufgaben komplett", "Arbeitet rund um die Uhr, ohne Müdigkeit", "Sie behalten die Kontrolle über jede Regel"] },
      { icon: "🧩", title: "Multi-Agenten-Systeme", subtitle: "Teamarbeit, die Zeit halbiert", text: "Ein Hauptagent zerlegt die Aufgabe, mehrere Spezial-Agenten arbeiten gleichzeitig daran.", bullets: ["Deutlich schneller als ein einzelner Agent", "Jeder Agent Spezialist für seinen Teil", "Wächst mit Ihren Anforderungen mit"] },
      { icon: "🔌", title: "Enterprise-Integration", subtitle: "Andockt, wo Sie schon arbeiten", text: "Wir integrieren die Agenten in Ihre bestehende Umgebung – E-Mail, Telefonie, CRM, Buchhaltung.", bullets: ["Kein Systemwechsel: Ihre Tools bleiben", "Kundendienst rauf, lästige Aufgaben runter", "Sauber, sicher, nach Schweizer Standard"] },
    ],
    closingTitle: "Erleben Sie einen KI-Agenten – jetzt, live.",
    closingText: "In einem kurzen Gespräch lassen wir einen Agenten eine echte Aufgabe aus Ihrem Alltag übernehmen – damit Sie sehen, was er in Ihrem Betrieb leisten würde.",
    meta: { title: "KI-Agenten & Multi-Agenten-Systeme für Unternehmen – AgenticIT", description: "Autonome KI-Agenten, die Aufgaben wirklich erledigen – einzeln oder als Team. Sicher in Ihre Systeme integriert, Schweizer Datenhaltung." },
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
    slug: "branchen",
    eyebrow: "Branchen",
    h1: "KI, die Ihre Branche versteht.",
    lead: "Keine Standardlösung von der Stange. Sondern ein digitaler Kollege, der Ihre Arbeit kennt – in der Sprache und den Abläufen Ihrer Branche.",
    introTitle: "Drei Branchen. Ein Versprechen: messbarer Vorteil ab Tag eins.",
    introText: "Wir kennen die typischen Zeitfresser und Engpässe Ihrer Branche – und setzen genau dort an.",
    features: [
      { icon: "🏦", title: "Finanzwesen & Treuhand", subtitle: "Mehr Mandate, weniger Routine", text: "Unser digitaler Kollege übernimmt Belege, Fristen und Standardanfragen – Sie konzentrieren sich auf die Beratung.", bullets: ["Belege automatisch erfasst & zugeordnet", "Mandantenanfragen rund um die Uhr beantwortet", "Mandantendaten bleiben in der Schweiz"] },
      { icon: "💼", title: "Professional Services", subtitle: "Abrechenbare Zeit zurückgewinnen", text: "Termine, Nachfassungen und Dokumente laufen automatisch – Sie sprechen nur mit den richtigen Leuten.", bullets: ["Admin automatisiert, mehr fakturierbare Stunden", "Anfragen werden vorqualifiziert", "Höhere Auslastung, mehr Umsatz pro Kopf"] },
      { icon: "🏭", title: "Industrie & Handel", subtitle: "Schneller liefern, weniger Fehler", text: "Unsere Agenten verbinden Ihre Systeme und lassen Bestellungen, Lager und Lieferanten-Kommunikation von allein laufen.", bullets: ["Aufträge automatisch erfasst & weitergeleitet", "Weniger Fehler, schnellere Durchlaufzeiten", "Zufriedenere Kunden, tiefere Prozesskosten"] },
    ],
    closingTitle: "Sehen Sie den Anwendungsfall für Ihre Branche.",
    closingText: "In einem kostenlosen Gespräch zeigen wir Ihnen eine konkrete Aufgabe aus Ihrem Branchenalltag – automatisiert, mit klarer Zahl, was sie bringt.",
    meta: { title: "KI & Digitalisierung für Ihre Branche | KMU, Treuhand, Industrie – AgenticIT", description: "KI, die Ihre Branche versteht: Treuhand, Professional Services, Industrie & Handel. Konkrete Anwendungsfälle, messbarer ROI, Schweizer Datenhaltung." },
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
