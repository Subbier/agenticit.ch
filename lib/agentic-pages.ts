import { Bot, Wrench, ShieldCheck, Workflow, Users, Cpu, GitBranch, Target } from "lucide-react"
import type { AgenticDef } from "@/components/site/agentic-landing"

export const agenticPages: Record<string, AgenticDef> = {
  "agentic-ai": {
    slug: "agentic-ai",
    source: "agentic-ai",
    title: "Agentic AI & Agentic IT: der Leitfaden für Schweizer Unternehmen",
    description:
      "Was ist Agentic AI? Wie autonome KI-Agenten klassische Automatisierung ablösen – Definitionen, Abgrenzung zu RPA und Chatbots, Anwendungsfälle und der Weg zum Autonomous Enterprise in der Schweiz.",
    keywords: ["Agentic AI", "Agentic IT Schweiz", "autonome KI-Agenten", "Autonomous Enterprise", "KI Agenten"],
    eyebrow: "Agentic AI",
    h1: "Agentic AI: von starrer Automatisierung zu autonomen Agenten",
    intro:
      "Agentic AI ist der Sprung von regelbasierter Automatisierung zu autonomen KI-Agenten, die Ziele eigenständig planen, Werkzeuge nutzen und Aufgaben Ende-zu-Ende erledigen. Dieser Leitfaden erklärt, was Agentic AI ausmacht, wie sie sich von RPA und Chatbots unterscheidet – und wie Schweizer Unternehmen sie sicher und messbar einsetzen.",
    pillars: [
      { icon: Bot, title: "Autonom statt regelbasiert", text: "Ein KI-Agent verfolgt ein Ziel, plant die nötigen Schritte selbst und passt sich an – statt nur starre Wenn-Dann-Regeln abzuarbeiten." },
      { icon: Wrench, title: "Werkzeuge & Systeme nutzen", text: "Agenten greifen auf CRM, Kalender, Wissensdatenbanken und APIs zu und führen echte Aktionen aus – nicht nur Textantworten." },
      { icon: ShieldCheck, title: "Mensch behält die Kontrolle", text: "Klare Leitplanken, Freigaben und volle Nachvollziehbarkeit. Kritische Schritte werden menschlich geprüft – Human-in-the-Loop." },
    ],
    sections: [
      {
        heading: "Was ist Agentic AI?",
        body: [
          "Agentic AI bezeichnet KI-Systeme, die nicht nur antworten, sondern handeln: Sogenannte KI-Agenten erhalten ein Ziel, zerlegen es selbstständig in Teilschritte, nutzen Werkzeuge und Daten und führen die Aufgabe bis zum Ergebnis durch. Der Unterschied zu klassischen Chatbots oder Skripten ist die Autonomie – der Agent entscheidet im Rahmen klarer Leitplanken selbst über den nächsten sinnvollen Schritt.",
          "Angetrieben durch Releases wie Salesforce Agentforce oder HPE Agentic Operations entwickelt sich Agentic AI 2025/2026 vom Schlagwort zum Standard im Enterprise-Sektor. Für Schweizer Unternehmen entsteht damit ein konkretes Zeitfenster, sich früh als agentengestützte Organisation zu positionieren.",
        ],
      },
      {
        heading: "Agentic AI vs. RPA vs. Chatbot – der Unterschied",
        body: [
          "RPA (Robotic Process Automation) automatisiert feste, repetitive Klickabläufe – schnell, aber starr: Ändert sich der Prozess, bricht die Automatisierung. Ein Chatbot beantwortet Fragen, handelt aber nicht eigenständig. Agentic AI verbindet beides und geht darüber hinaus: Ein Agent versteht das Ziel, wählt den Weg selbst und reagiert flexibel auf neue Situationen.",
          "Praktisch heisst das: Wo RPA an einer veränderten Maske scheitert, findet ein KI-Agent den neuen Weg. Wo ein Chatbot nur informiert, qualifiziert ein Agent eine Anfrage, bucht den Termin und übergibt den anrufbereiten Kontakt ins CRM.",
        ],
      },
      {
        heading: "Anwendungsfälle in Vertrieb, Marketing und Service",
        body: [
          "AgenticIT setzt autonome KI-Agenten dort ein, wo Geschäftsprozesse heute Reibung verlieren: in der sofortigen Reaktion auf Leads (Speed-to-Lead), der Qualifizierung und Terminbuchung, im automatisierten Follow-up sowie in der kanalübergreifenden Betreuung über Web, WhatsApp, E-Mail und Telefon.",
          "Mehrere spezialisierte Agenten arbeiten dabei als Multi-Agenten-System zusammen, koordiniert von einem KI-Manager – so entsteht die Schlagkraft einer ganzen Abteilung, gesteuert von einer einzigen Person.",
        ],
      },
      {
        heading: "Agentic AI in der Schweiz: Datenschutz als USP",
        body: [
          "Gerade in Finance, Legal und Healthcare ist Datensensibilität entscheidend. AgenticIT setzt auf transparente, DSG- und DSGVO-konforme Verarbeitung und – wo nötig – auf lokale Datenhaltung oder On-Premise-Betrieb. Sovereign Agentic AI und klare Governance machen autonome Systeme in der Schweiz vertrauenswürdig statt riskant.",
          "Kundenkommunikation über KI-Agenten wird dabei stets transparent als solche gekennzeichnet – ein Grundprinzip verantwortungsvoller Agentic AI.",
        ],
      },
    ],
    faqs: [
      { question: "Was ist Agentic AI?", answer: "Agentic AI sind KI-Systeme, die eigenständig handeln: KI-Agenten erhalten ein Ziel, planen die Schritte selbst, nutzen Werkzeuge und Daten und führen Aufgaben Ende-zu-Ende aus – im Rahmen klarer, menschlich kontrollierter Leitplanken." },
      { question: "Was ist der Unterschied zwischen RPA und Agentic AI?", answer: "RPA automatisiert feste, repetitive Abläufe und bricht, wenn sich der Prozess ändert. Agentic AI versteht das Ziel, wählt den Weg flexibel selbst und reagiert auf neue Situationen – robuster und anpassungsfähiger als RPA." },
      { question: "Was ist ein KI-Agent?", answer: "Ein KI-Agent ist eine autonome Software-Einheit, die ein Ziel verfolgt, Entscheidungen trifft, Werkzeuge wie CRM oder Kalender nutzt und Aktionen ausführt – nicht nur Text generiert." },
      { question: "Was ist ein Multi-Agenten-System?", answer: "Ein Multi-Agenten-System besteht aus mehreren spezialisierten KI-Agenten, die zusammenarbeiten und von einem koordinierenden Agenten (KI-Manager) gesteuert werden – so wird ein komplexer Prozess arbeitsteilig und zuverlässig erledigt." },
      { question: "Ist Agentic AI in der Schweiz datenschutzkonform einsetzbar?", answer: "Ja. Mit transparenter, DSG-/DSGVO-konformer Verarbeitung, klarer Governance und bei Bedarf lokaler oder On-Premise-Datenhaltung lässt sich Agentic AI auch für datensensible Branchen sicher betreiben." },
    ],
    related: [
      { label: "KI-Agenten für Unternehmen", href: "/ki-agenten-unternehmen", description: "Autonome Agenten für Vertrieb, Marketing und Service." },
      { label: "RPA vs. Agentic AI", href: "/rpa-vs-agentic-ai", description: "Wo klassische Automatisierung endet und Agenten beginnen." },
      { label: "Agentic AI Beratung Schweiz", href: "/agentic-ai-beratung-schweiz", description: "Strategie und Umsetzung mit lokalem Partner." },
    ],
    contact: {
      h2: "Wo lohnt sich Agentic AI in Ihrem Unternehmen zuerst?",
      lead: "In einem kurzen, unverbindlichen Gespräch identifizieren wir die Prozesse mit dem grössten Hebel – und skizzieren einen sicheren, DSG-konformen Einstieg.",
      bullets: ["Kurzer, unverbindlicher Rückruf", "Konkreter Use-Case für Ihre Branche", "DSG-/DSGVO-konform, Human-in-the-Loop"],
    },
  },

  "ki-agenten-unternehmen": {
    slug: "ki-agenten-unternehmen",
    source: "ki-agenten-unternehmen",
    title: "KI-Agenten für Unternehmen: autonome Agenten für Vertrieb, Marketing & Service",
    description:
      "KI-Agenten (AI Agents) für Schweizer Unternehmen: autonome Software-Mitarbeiter, die Leads qualifizieren, Termine buchen und Routineaufgaben übernehmen – 24/7, CRM-integriert und messbar.",
    keywords: ["KI Agenten für Unternehmen", "AI Agents", "KI Agenten Schweiz", "Vertriebsautomation", "Conversational AI"],
    eyebrow: "KI-Agenten für Unternehmen",
    h1: "KI-Agenten für Unternehmen: Ihr autonomes digitales Team",
    intro:
      "KI-Agenten sind autonome Software-Mitarbeiter, die Anfragen sofort beantworten, Leads qualifizieren, Termine buchen und Routineaufgaben übernehmen – rund um die Uhr und nahtlos in Ihr CRM integriert. Für Schweizer Unternehmen liefern sie die Schlagkraft einer ganzen Abteilung, gesteuert von einer einzigen Person.",
    pillars: [
      { icon: Users, title: "Ein Team aus Spezialisten", text: "Jeder Agent ist Experte für eine Aufgabe – Akquise, Qualifizierung, Follow-up – koordiniert von einem KI-Manager." },
      { icon: Workflow, title: "Echte Aktionen, nicht nur Chat", text: "Agenten buchen Termine, pflegen das CRM, versenden Follow-ups und übergeben anrufbereite Kontakte – sie handeln." },
      { icon: Target, title: "Messbar und 24/7", text: "Reaktion in Sekunden statt Stunden, auch nachts und am Wochenende – mit klaren KPIs für Speed-to-Lead und Conversion." },
    ],
    sections: [
      {
        heading: "Was sind KI-Agenten für Unternehmen?",
        body: [
          "KI-Agenten (englisch AI Agents) sind autonome Systeme, die im Namen Ihres Unternehmens handeln: Sie nehmen Anfragen über Telefon, Web, WhatsApp und E-Mail entgegen, verstehen das Anliegen, qualifizieren den Kontakt und führen konkrete nächste Schritte aus. Anders als ein Chatbot beantworten sie nicht nur Fragen, sondern erledigen Aufgaben Ende-zu-Ende.",
          "Damit schliessen KI-Agenten die teuerste Lücke im Vertrieb: die Zeit zwischen Anfrage und erster qualifizierter Reaktion. Wer in Sekunden statt Stunden antwortet, gewinnt deutlich häufiger den Abschluss.",
        ],
      },
      {
        heading: "Wofür Unternehmen KI-Agenten einsetzen",
        body: [
          "Typische Einsätze sind die sofortige Erstreaktion auf neue Leads, die automatische Qualifizierung nach Bedarf und Dringlichkeit, Terminbuchung direkt im Kalender, strukturiertes Follow-up sowie die Betreuung von Bestandskunden mit Cross- und Up-Selling. Routineaufgaben verschwinden im Hintergrund, das Team konzentriert sich auf die Gespräche, die zählen.",
          "Mehrere Agenten arbeiten als Multi-Agenten-System zusammen und sind vollständig in Ihre bestehenden Tools und Ihr CRM integriert – ohne dass Sie Ihre Systeme umstellen müssen.",
        ],
      },
    ],
    faqs: [
      { question: "Was sind KI-Agenten für Unternehmen?", answer: "Autonome Software-Mitarbeiter, die Anfragen über Telefon, Web, WhatsApp und E-Mail entgegennehmen, Leads qualifizieren, Termine buchen und Routineaufgaben übernehmen – 24/7 und CRM-integriert." },
      { question: "Worin unterscheiden sich KI-Agenten von Chatbots?", answer: "Ein Chatbot beantwortet Fragen. Ein KI-Agent handelt: Er qualifiziert, bucht Termine, pflegt das CRM und übergibt anrufbereite Kontakte – er führt Aufgaben aus, statt nur zu informieren." },
      { question: "Ersetzen KI-Agenten mein Vertriebsteam?", answer: "Nein. KI-Agenten übernehmen Erstqualifizierung, Routine und Follow-ups. Ihr Team bearbeitet nur noch vorqualifizierte Chancen mit der höchsten Abschlusswahrscheinlichkeit." },
      { question: "Muss ich meine Systeme umstellen?", answer: "Nein. Die Agenten fügen sich in Ihre bestehende Umgebung und Ihr CRM ein – ohne doppelte Datenpflege und ohne Technik-Aufwand für Ihr Team." },
    ],
    related: [
      { label: "Agentic AI – der Leitfaden", href: "/agentic-ai", description: "Was Agentic AI ist und wie autonome Agenten funktionieren." },
      { label: "Geschäftsprozesse automatisieren", href: "/geschaeftsprozesse-automatisieren", description: "Sales, Marketing und HR mit Agenten automatisieren." },
      { label: "Agentic AI Beratung Schweiz", href: "/agentic-ai-beratung-schweiz", description: "Strategie und Umsetzung mit lokalem Partner." },
    ],
    contact: {
      h2: "Welche Aufgaben würde Ihr KI-Team zuerst übernehmen?",
      lead: "In einem kurzen, unverbindlichen Gespräch zeigen wir, welche Agenten in Ihrer Branche den grössten Unterschied machen – und wie schnell die ersten anrufbereiten Kontakte ankommen.",
      bullets: ["Kurzer, unverbindlicher Rückruf", "Agenten-Setup für Ihre Branche", "Keine Umstellung, keine Lernkurve"],
    },
  },
}
