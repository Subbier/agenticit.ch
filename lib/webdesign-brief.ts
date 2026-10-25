import { z } from "zod"

export const websiteQuestions = [
  {
    id: "type",
    title: "Welche Website wünschen Sie sich?",
    label: "Ihr Vorhaben",
    options: [
      {
        value: "company",
        title: "Eine Firmenwebsite",
        caption: "Mein Unternehmen überzeugend zeigen",
        visual: "company",
      },
      {
        value: "landing",
        title: "Eine Landingpage",
        caption: "Ein Angebot. Mehr passende Anfragen.",
        visual: "landing",
      },
      {
        value: "shop",
        title: "Einen Online-Shop",
        caption: "Meine Produkte online verkaufen",
        visual: "shop",
      },
      {
        value: "relaunch",
        title: "Einen neuen Auftritt",
        caption: "Meine bestehende Website erneuern",
        visual: "relaunch",
      },
    ],
  },
  {
    id: "goal",
    title: "Was soll Ihre Website für Sie erreichen?",
    label: "Ihr Nutzen",
    options: [
      {
        value: "inquiries",
        title: "Mehr Anfragen",
        caption: "Besucher werden zu Interessenten",
        visual: "inquiries",
      },
      {
        value: "bookings",
        title: "Mehr Buchungen",
        caption: "Termine einfach online vereinbaren",
        visual: "bookings",
      },
      {
        value: "sales",
        title: "Mehr Verkäufe",
        caption: "Produkte oder Leistungen verkaufen",
        visual: "sales",
      },
      {
        value: "trust",
        title: "Mehr Vertrauen",
        caption: "Kunden von meinem Angebot überzeugen",
        visual: "trust",
      },
    ],
  },
  {
    id: "style",
    title: "Welcher Auftritt spricht Sie an?",
    label: "Ihr Stil",
    options: [
      {
        value: "clear",
        title: "Klar & ruhig",
        caption: "Viel Weissraum, klare Linien",
        visual: "clear",
      },
      {
        value: "bold",
        title: "Markant & modern",
        caption: "Kräftige Flächen, starke Kontraste",
        visual: "bold",
      },
      {
        value: "personal",
        title: "Nahbar & persönlich",
        caption: "Menschen und echte Einblicke",
        visual: "personal",
      },
      {
        value: "editorial",
        title: "Bildstark & elegant",
        caption: "Grosse Bilder, reduzierte Texte",
        visual: "editorial",
      },
    ],
  },
  {
    id: "content",
    title: "Was bringen Sie schon mit?",
    label: "Ihre Grundlage",
    options: [
      {
        value: "ready",
        title: "Vieles ist vorhanden",
        caption: "Logo, Bilder und Texte sind bereit",
        visual: "ready",
      },
      {
        value: "partial",
        title: "Ein Teil steht schon",
        caption: "Wir ergänzen, was noch fehlt",
        visual: "partial",
      },
      {
        value: "new",
        title: "Ich starte neu",
        caption: "Mein Auftritt darf von Grund auf entstehen",
        visual: "new",
      },
      {
        value: "help",
        title: "Ich wünsche Unterstützung",
        caption: "Inhalte und Gestaltung aus einer Hand",
        visual: "help",
      },
    ],
  },
  {
    id: "timing",
    title: "Wann möchten Sie online gehen?",
    label: "Ihr Wunschtermin",
    options: [
      {
        value: "soon",
        title: "So bald wie möglich",
        caption: "Ich möchte zeitnah starten",
        visual: "soon",
      },
      {
        value: "quarter",
        title: "In 1 bis 3 Monaten",
        caption: "Ich habe ein konkretes Vorhaben",
        visual: "quarter",
      },
      {
        value: "later",
        title: "Später in diesem Jahr",
        caption: "Ich plane mit etwas Vorlauf",
        visual: "later",
      },
      {
        value: "explore",
        title: "Ich orientiere mich",
        caption: "Zuerst herausfinden, was zu mir passt",
        visual: "explore",
      },
    ],
  },
] as const

export const websiteBriefSchema = z.object({
  version: z.literal(1),
  type: z.enum(["company", "landing", "shop", "relaunch"]),
  goal: z.enum(["inquiries", "bookings", "sales", "trust"]),
  style: z.enum(["clear", "bold", "personal", "editorial"]),
  content: z.enum(["ready", "partial", "new", "help"]),
  timing: z.enum(["soon", "quarter", "later", "explore"]),
})
export type WebsiteBrief = z.infer<typeof websiteBriefSchema>
export function websiteSelectionLabel(
  input: WebsiteBrief,
  id: (typeof websiteQuestions)[number]["id"],
) {
  const question = websiteQuestions.find((q) => q.id === id)!
  return question.options.find((o) => o.value === input[id])!.title
}

export function buildWebsiteConcept(raw: WebsiteBrief) {
  const input = websiteBriefSchema.parse(raw)
  const structures = {
    company: [
      "Startseite: Ihr Angebot und der Nutzen auf einen Blick",
      "Leistungen: Angebote mit Beispielen und klaren Vorteilen",
      "Über uns: Menschen und nachvollziehbare Erfahrung",
      "Kontakt: Der kurze Weg zur persönlichen Anfrage",
    ],
    landing: [
      "Einstieg: Ein klares Angebot für eine Zielgruppe",
      "Nutzen: Was Ihr Kunde konkret davon hat",
      "Einblicke: Produkt, Leistung oder Arbeitsweise zeigen",
      "Abschluss: Eine eindeutige nächste Aktion",
    ],
    shop: [
      "Startseite: Ihre Produkte und passende Kategorien",
      "Produktseiten: Bilder, Eigenschaften und klare Preise",
      "Warenkorb und Checkout: Ein einfacher Kaufabschluss",
      "Service: Lieferung, Rückgabe und Kontakt verständlich zeigen",
    ],
    relaunch: [
      "Startseite: Ihr heutiges Angebot klar neu positionieren",
      "Leistungen: Die wichtigsten Kundenfragen beantworten",
      "Einblicke: Aktuelle Bilder und überzeugende Beispiele",
      "Kontakt: Anfrage oder Buchung mobil einfach machen",
    ],
  }
  const goals = {
    inquiries: {
      cta: "Unverbindlich anfragen",
      benefit:
        "Ein kurzer Anfrageweg macht es interessierten Besuchern leicht, mit Ihnen ins Gespräch zu kommen.",
      feature:
        "Ein kurzes Anfrageformular mit Bestätigung und klarer Kontaktmöglichkeit.",
    },
    bookings: {
      cta: "Termin auswählen",
      benefit:
        "Eine direkte Terminwahl kann die Abstimmung für Ihre Kunden und Ihr Team vereinfachen.",
      feature:
        "Eine mobil bedienbare Terminwahl mit Bestätigung; Kalenderanbindung nach Absprache.",
    },
    sales: {
      cta: input.type === "shop" ? "Jetzt einkaufen" : "Angebot anfordern",
      benefit:
        "Bilder, klare Angebotsinformationen und eine eindeutige Kauf- oder Anfrageaktion helfen Kunden bei ihrer Entscheidung.",
      feature:
        input.type === "shop"
          ? "Ein klarer Kaufweg mit Warenkorb und Checkout."
          : "Angebotsseiten mit Anfrageweg. Für direkten Online-Verkauf wäre zusätzlich eine Bestell- oder Shopfunktion nötig.",
    },
    trust: {
      cta: "Persönlich kennenlernen",
      benefit:
        "Menschen, verständliche Leistungen und belegbare Beispiele geben Ihren Besuchern Orientierung und Vertrauen.",
      feature:
        "Teamfotos, persönliche Ansprechpartner und echte Arbeitsbeispiele statt unbelegter Versprechen.",
    },
  }
  const styles = {
    clear: {
      title: "Klar & ruhig",
      color: "#4D7C36",
      description:
        "Heller Hintergrund, grosszügige Abstände und eine klare Hierarchie. Wenige, gezielte Bilder geben Ihren Leistungen Raum.",
    },
    bold: {
      title: "Markant & modern",
      color: "#3347A8",
      description:
        "Dunkle und helle Flächen im Kontrast, prägnante Überschriften und gezielt eingesetzte Akzentfarben.",
    },
    personal: {
      title: "Nahbar & persönlich",
      color: "#227A70",
      description:
        "Echte Bilder von Ihnen und Ihrem Team, freundliche Farben und kurze, persönliche Texte.",
    },
    editorial: {
      title: "Bildstark & elegant",
      color: "#6B568E",
      description:
        "Grosse, sorgfältig ausgewählte Bilder, ruhige Typografie und kompakte Textblöcke.",
    },
  }
  const material = {
    ready:
      "Ihre vorhandenen Logos, Bilder und Texte können die Grundlage des Entwurfs bilden. Nutzungsrechte und Aktualität werden bei der Planung geklärt.",
    partial:
      "Der Entwurf kann auf Ihren vorhandenen Materialien aufbauen. Fehlende Bilder und Texte werden gezielt ergänzt.",
    new: "Für Ihren Neustart gehören Bildsprache, Inhalte und Gestaltung gemeinsam ins Konzept.",
    help: "Für Sie passt eine gemeinsame Planung von Texten, Bildmaterial und Gestaltung. So entsteht ein stimmiger Auftritt aus einer Hand.",
  }
  return {
    input,
    title: websiteSelectionLabel(input, "type"),
    goal: goals[input.goal],
    style: styles[input.style],
    structure: structures[input.type],
    material: material[input.content],
    timing: websiteSelectionLabel(input, "timing"),
  }
}

export function websiteBriefSummary(input: WebsiteBrief) {
  const c = buildWebsiteConcept(input)
  return [
    "WEBDESIGN - PERSÖNLICHES WEBSITE-KONZEPT",
    "Seite: https://agenticit.ch/loesungen/webdesign",
    ...websiteQuestions.map(
      (q) => `${q.label}: ${websiteSelectionLabel(input, q.id)}`,
    ),
    `Empfohlene Hauptaktion: ${c.goal.cta}`,
    c.goal.benefit,
    c.goal.feature,
    "Seitenstruktur:",
    ...c.structure,
    `Bildsprache: ${c.style.description}`,
    c.material,
    "Wunschtermin, keine bestätigte Lieferzusage. Keine automatische Sales-Nachricht. PDF-Anfrage persönlich prüfen.",
  ].join("\n")
}
