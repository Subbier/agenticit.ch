import type { AcquisitionPlanInput } from "./acquisition-planner"

export const websiteCase = {
  title: "Vom Anliegen zum eigenen Plan.",
  summary: "Fünf Checks, eine Anfragenplanung und konkrete nächste Schritte.",
  description:
    "Die eigene AgenticIT Website zeigt fünf Checks und eine Anfragenplanung. Mit eigenen Angaben einordnen, planen und freiwillig Kontakt aufnehmen.",
  intro:
    "Auf unserer Website führen konkrete Fragen zu einem nächsten Schritt. Mit fünf Checks und einer Anfragenplanung können Sie Ihren Betrieb einordnen, einen Plan mitnehmen und selbst entscheiden, ob Sie Unterstützung möchten.",
  exampleInput: {
    version: 1,
    industryIds: [],
    monthlyCustomers: 10,
    closeRate: 25,
    handlingMinutes: 15,
  } satisfies AcquisitionPlanInput,
  tools: [
    {
      kind: "check",
      name: "Kundenreise-Check",
      question: "Wo sollten wir zuerst ansetzen?",
      copy: "Das eigene Anliegen einordnen und einen passenden Einstieg in Marketing, Sales oder digitale Abläufe finden.",
      href: "/kundenreise-check",
      label: "Meinen Einstieg finden",
    },
    {
      kind: "check",
      name: "Marketing-Setup-Check",
      question: "Sind wir für passende Anfragen bereit?",
      copy: "Fünf Fragen zu Angebot, Auftritt, Konten, Messung und Übergabe. Daraus entsteht ein priorisierter Plan.",
      href: "/marketing-setup-check",
      label: "Mein Marketing-Setup prüfen",
    },
    {
      kind: "check",
      name: "Anfragen-Check",
      question: "Wer übernimmt unsere nächste Anfrage?",
      copy: "Eingang, Zuständigkeit, Reaktion, Nachfassen und Ergebnis betrachten. Bekannte Lücken und offene Fragen ordnen.",
      href: "/anfragen-check",
      label: "Meinen Anfrageweg prüfen",
    },
    {
      kind: "check",
      name: "CRM-Ablauf-Check",
      question: "Wo hakt die Datenübergabe?",
      copy: "Datenübernahme, Zuständigkeit und Fehlerfälle für einen Ablauf prüfen. Der Plan bereitet die Abnahme mit Ihrem Team vor.",
      href: "/crm-ablauf-check",
      label: "Meinen CRM-Ablauf prüfen",
    },
    {
      kind: "check",
      name: "Automatisierungs-Check",
      question: "Welche Routine könnten wir vereinfachen?",
      copy: "Eigene Aufgaben und Zeiten eintragen. Verbleibende Kontrolle und ein vorsichtigeres Szenario in die Einordnung einbeziehen.",
      href: "/automatisierungs-check",
      label: "Meinen Zeitaufwand prüfen",
    },
    {
      kind: "planner",
      name: "Anfragenplanung",
      question: "Wie viele Anfragen braucht unser Ziel?",
      copy: "Mit Kundenziel, Abschlussquote und optionaler Bearbeitungszeit rechnen. Drei nächste Schritte für Marketing, Sales und Verwaltung festhalten.",
      href: "/potenzial",
      label: "Mein Anfrageziel planen",
    },
  ],
  verification: [
    [
      "Bedienung",
      "Schmale und breite Ansichten, Auswahl per Tastatur sowie das Öffnen von Fragen und Antworten sind geprüft.",
    ],
    [
      "Ergebnislogik",
      "Eingaben, Prioritäten und Rechenwege sind mit Prüffällen abgeglichen. Kontrollaufwand und unbekannte Angaben bleiben erkennbar.",
    ],
    [
      "Eigene Entscheidung",
      "Ergebnisse und speicherbare Pläne sind vor der Kontaktaufnahme zugänglich. Aus einem Check entsteht nicht automatisch eine Anfrage.",
    ],
    [
      "Öffentliche Wege",
      "Die veröffentlichten Leistungsseiten, Entscheidungshilfen und weiterführenden Verweise sind direkt aufgerufen und geprüft.",
    ],
  ],
  faqs: [
    {
      question: "Ist das eine Kundenreferenz?",
      answer:
        "Wir zeigen hier unsere eigene AgenticIT Website. Der Einblick beschreibt einen nachvollziehbaren Nutzerweg und seine Prüfung. Er wird nicht als Kundenauftrag oder als Beleg für zusätzliche Umsätze dargestellt.",
    },
    {
      question: "Was kann ich selbst ausprobieren?",
      answer:
        "Fünf Checks helfen bei Kundenreise, Marketing-Setup, Anfragebearbeitung, CRM-Ablauf und Automatisierung. Die Anfragenplanung übersetzt ein Kundenziel in benötigte Anfragen und geplanten Bearbeitungsaufwand. Alle sechs Entscheidungshilfen lassen sich mit eigenen Angaben ausprobieren.",
    },
    {
      question: "Entsteht durch einen Check automatisch eine Anfrage?",
      answer:
        "Nein. Sie können zuerst das Ergebnis ansehen. Eine Kontaktaufnahme ist ein eigener, freiwilliger Schritt. Dafür ist erkennbar, welche Angaben zur Bearbeitung übermittelt werden sollen.",
    },
    {
      question: "Welche Ergebnisse belegt dieser Einblick?",
      answer:
        "Geprüft sind Bedienung, Eingaben, Ergebnislogik und öffentliche Erreichbarkeit. Das Rechenbeispiel nutzt frei gewählte Annahmen. Geschäftsergebnisse wie qualifizierte Anfragen, Termine und Aufträge benötigen eigene bestätigte Quellen und einen passenden Messzeitraum.",
    },
    {
      question: "Können Sie so einen Ablauf für unser Unternehmen umsetzen?",
      answer:
        "Wir nehmen Ihr Anliegen, vorhandene Systeme und Zuständigkeiten auf. Daraus planen wir einen passenden Einstieg mit Ihrem Team. Umfang, Datenwege, Kosten, Freigaben und Abnahme werden für den konkreten Auftrag vereinbart.",
    },
  ],
} as const
