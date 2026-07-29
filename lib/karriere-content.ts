export type KarriereJob = {
  slug: string
  tagEmoji: string
  tagLabel: string
  title: string
  teaser: string
  start: string
  setup: string
  pensum: string
  spielfeldTitle: string
  spielfeld: string[]
  mitbringst: string[]
  bieten: string
  badge?: "ausbildung"
}

export const KARRIERE_JOBS: KarriereJob[] = [
  {
    slug: "ai-gtm-spezialist",
    tagEmoji: "🛰️",
    tagLabel: "GTM & Agent Orchestration",
    title: "AI GTM Spezialist & AI Agent Orchestrator (w/m/d)",
    teaser:
      "Klassisches Marketing nach Schema F überlassen Sie gerne der Konkurrenz. Sie dirigieren stattdessen ein ganzes Ensemble aus KI-Agenten – mit Stil.",
    start: "1. Oktober 2026",
    setup: "Hybrid (Büro in Bern & Home Office)",
    pensum: "80–100%",
    spielfeldTitle: "Ihr Spielfeld",
    spielfeld: [
      "Agent Orchestration: Sie bauen und dirigieren KI-Agenten, die unsere Marketing- und Sales-Ziele nach vorne bringen. OpenAI, Anthropic, Google, Microsoft – die Werkzeuge der grossen Hyperscaler sind Ihr Wohnzimmer.",
      "Tech-Chamäleon: Wir passen uns an die Stacks unserer Kunden an, nicht umgekehrt. Drei CRMs und vier LLMs an einem Tag jonglieren? Für Sie ein Aufwärmtraining, kein Stress.",
      "Hands-on Tech-Marketing: Etwas Code schreiben, Konnektoren bauen, mit Model Context Protocols (MCP) hantieren – kein Problem für Sie. Statt Pixel in statischen Tools zu verschieben, generieren und automatisieren Sie smarte Outputs.",
      "Sales-Fokus: Ihre Kampagnen und Setups haben immer ein Ziel vor Augen: Sie zahlen direkt auf die Bedürfnisse unserer Kunden ein und machen deren Vertrieb schneller und schlauer.",
    ],
    mitbringst: [
      "Ein abgeschlossenes Studium oder eine mindestens gleichwertige, fundierte Ausbildung an der Schnittstelle von Business, Marketing und Tech.",
      "Spürbare Erfahrung im Umgang mit Vertriebskunden und eine Auffassungsgabe, die neue digitale Ökosysteme in Rekordzeit durchschaut.",
      "Eine selbstständige, proaktive Arbeitsweise: Sie warten nicht auf das perfekte Briefing, Sie bauen einfach die Lösung.",
      "Kommunikationsstärke auf allen Ebenen – vom C-Level-Pitch bis zur einfachen Erklärung von Tech-Details.",
      "Fliessendes Deutsch (C2) und Englisch (C1/C2).",
    ],
    bieten:
      "Überdurchschnittliche Anstellungsbedingungen in einem stark wachsenden Umfeld mit flachen Hierarchien. Sie werden mit der neuesten Technologie ausgestattet – für Büro in Bern, unterwegs und zuhause, inklusive einer wirklich ergonomischen Arbeitsumgebung. Dazu spürbarer Freiraum und die Chance, in einem der grössten Zukunftsthemen ganz vorne mitzuspielen.",
  },
  {
    slug: "ai-revops-architect",
    tagEmoji: "🏗️",
    tagLabel: "RevOps Architecture",
    title: "AI RevOps Architect (w/m/d)",
    teaser:
      "Revenue Operations ist unser Wachstumsmotor – Sie sind die Chef-Architektin, der Chef-Architekt, der ihn baut. Halb beim Kunden die Ärmel hochkrempeln, halb in Ruhe die Architektur feilen.",
    start: "1. Oktober 2026",
    setup: "50% vor Ort beim Kunden, 50% Home Office in Bern",
    pensum: "80–100%",
    spielfeldTitle: "Ihr Spielfeld",
    spielfeld: [
      "Hands-on beim Kunden (50%): Sie sind die Hälfte Ihrer Zeit direkt vor Ort. Prozesse analysieren, Workshops leiten, Architekturen direkt in die Systeme der Kunden einbauen.",
      "Deep Work (50%): Die andere Hälfte arbeiten Sie fokussiert aus Ihrem Home Office in Bern. Hier entwerfen, bauen und skalieren Sie komplexe CRM- und RevOps-Infrastrukturen.",
      "Intelligente Automatisierung: Sie integrieren KI-gestützte Lösungen (Predictive Analytics, Scoring-Modelle, Conversational Intelligence), damit die Vertriebsprozesse unserer Kunden spürbar schneller werden.",
      "Daten-Fluss: Sie orchestrieren saubere Daten-Pipelines und API-Integrationen, damit Teams in Echtzeit die richtigen Entscheidungen treffen können.",
    ],
    mitbringst: [
      "Ein abgeschlossenes Studium in Wirtschaftsinformatik, Data Science, Informatik oder Betriebswirtschaft mit starkem Tech-Fokus.",
      "Mehrjährige, belastbare Erfahrung in Revenue Operations, Sales Ops oder als CRM-Architekt/in.",
      "Echte Beraterqualitäten: Sie sind souverän in Kundenmeetings und übersetzen komplexe Tech-Architekturen so, dass auch der Vertrieb sie versteht.",
      "Solides Know-how in Datenmodellierung, sicherer Umgang mit APIs und ein tiefes Verständnis für aktuelle KI-gestützte RevOps-Tools.",
      "Fliessendes, technisches Englisch und verhandlungssicheres Deutsch.",
    ],
    bieten:
      "Genau wie unser Tech-Stack sind auch unsere Konditionen erstklassig: überdurchschnittliche Anstellungsbedingungen, spürbarer Freiraum. Neueste Hard- und Software für Kundeneinsätze und Home-Office in Bern – inklusive einer wirklich guten ergonomischen Arbeitsumgebung.",
  },
  {
    slug: "lehrstelle-informatik-efz",
    tagEmoji: "🎓",
    tagLabel: "Lehrstelle 2027",
    title: "Lehrstelle 2027: Informatiker/in EFZ – Applikationsentwicklung",
    teaser:
      "Code abtippen kann jedes Tutorial. Wir bringen Ihnen bei, die Softwarelösungen von morgen selbst zu bauen – an echten Projekten, mit echten Nutzer:innen.",
    start: "Sommer 2027",
    setup: "Hybrid (Büro in Bern & Home Office)",
    pensum: "4 Jahre Ausbildung",
    spielfeldTitle: "Ihr Spielfeld (was Sie lernen)",
    spielfeld: [
      "Entwicklung, Testen und Warten von modernen Web- und Backend-Applikationen.",
      "Arbeiten mit den neuesten Programmiersprachen, Cloud-Technologien und Frameworks.",
      "Den souveränen Einsatz von KI beim Programmieren – Copilots, API-Anbindungen von Sprachmodellen und mehr.",
      "Projektmanagement und den direkten Austausch mit dem Team und unseren Kunden.",
    ],
    mitbringst: [
      "Hervorragende Noten auf der höchsten Volksschulstufe (Sekundarschule / Progymnasium), besonders in Mathematik, Naturwissenschaften und Sprachen.",
      "Echtes Feuer für die IT – vielleicht haben Sie schon erste eigene kleine Projekte gebaut oder Tutorials durchgearbeitet.",
      "Vergessen Sie das Klischee vom stillen Hacker im Keller: Sie sind kommunikativ, tauschen sich gerne im Team aus und stellen ohne Scheu Fragen.",
      "Ein starkes logisches Denkvermögen und die Fähigkeit, komplexe Zusammenhänge schnell zu erfassen.",
      "Sehr gutes Deutsch und ein solides Fundament in Englisch.",
    ],
    bieten:
      "Eine Ausbildung auf höchstem Niveau mit überdurchschnittlichen Anstellungsbedingungen für Lernende. Von Tag eins an das neueste Tech-Equipment für Büro, Berufsschule, unterwegs und Ihr ergonomisch eingerichtetes Home-Office.",
    badge: "ausbildung",
  },
]
