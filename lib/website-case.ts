export const websiteCase = {
  title: "Von der Frage zum nächsten Schritt.",
  description:
    "Ein Einblick in die AgenticIT Website: Leistungsseiten, vier interaktive Checks und eigene Pläne helfen Besuchern, ihren nächsten Schritt einzuordnen.",
  intro:
    "Auf unserer eigenen Website verbinden wir verständliche Leistungen mit nützlichen Entscheidungshilfen. Besucher wählen ihr Anliegen, nehmen eine erste Orientierung mit und entscheiden selbst über eine Kontaktaufnahme.",
  flow: [
    [
      "Anliegen wählen",
      "Eine konkrete Frage aus dem eigenen Betrieb aufnehmen",
    ],
    [
      "Orientierung erhalten",
      "Angaben einordnen und nächste Schritte sichtbar machen",
    ],
    ["Selbst entscheiden", "Den Plan nutzen oder freiwillig Kontakt aufnehmen"],
  ],
  checks: [
    {
      name: "Kundenreise-Check",
      question: "Wo sollten wir zuerst ansetzen?",
      copy: "Das eigene Anliegen einordnen und einen passenden Einstieg in Marketing, Sales oder digitale Abläufe finden.",
      href: "/kundenreise-check",
      label: "Meinen Einstieg finden",
    },
    {
      name: "Marketing-Setup-Check",
      question: "Sind wir für passende Anfragen bereit?",
      copy: "Fünf Fragen zu Angebot, Auftritt, Konten, Messung und Übergabe. Daraus entsteht ein priorisierter Plan.",
      href: "/marketing-setup-check",
      label: "Mein Marketing-Setup prüfen",
    },
    {
      name: "Anfragen-Check",
      question: "Wer übernimmt unsere nächste Anfrage?",
      copy: "Eingang, Zuständigkeit, Reaktion, Nachfassen und Ergebnis betrachten. Bekannte Lücken und offene Fragen ordnen.",
      href: "/anfragen-check",
      label: "Meinen Anfrageweg prüfen",
    },
    {
      name: "Automatisierungs-Check",
      question: "Welche Routine könnten wir vereinfachen?",
      copy: "Eigene Aufgaben und Zeiten eintragen. Verbleibende Kontrolle und ein vorsichtigeres Szenario in die Einordnung einbeziehen.",
      href: "/automatisierungs-check",
      label: "Meinen Zeitaufwand prüfen",
    },
  ],
  verification: [
    [
      "Bedienung",
      "Schmale und breite Ansichten, Auswahl per Tastatur sowie das Öffnen von Fragen und Antworten prüfen.",
    ],
    [
      "Ergebnislogik",
      "Vorhandene, teilweise vorhandene, offene und ungeklärte Grundlagen unterscheiden. Im Zeitvergleich auch Kontrolle berücksichtigen.",
    ],
    [
      "Eigene Entscheidung",
      "Ergebnis und Kontaktangebot getrennt zeigen. Aus einem Check entsteht nicht automatisch eine Kontaktanfrage.",
    ],
    [
      "Öffentliche Wege",
      "Leistungsseiten, Checks und weiterführende Informationen auf direkte Erreichbarkeit und passende Verweise prüfen.",
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
        "Die vier verlinkten Checks sind öffentlich zugänglich. Sie können ein Anliegen einordnen, Grundlagen prüfen oder mit eigenen Zeitangaben rechnen. Die Ergebnisse dienen zur Orientierung für Ihren Betrieb.",
    },
    {
      question: "Entsteht durch einen Check automatisch eine Anfrage?",
      answer:
        "Nein. Sie können zuerst das Ergebnis ansehen. Eine Kontaktaufnahme ist ein eigener, freiwilliger Schritt. Dafür ist erkennbar, welche Angaben zur Bearbeitung übermittelt werden sollen.",
    },
    {
      question: "Welche Ergebnisse belegt dieser Einblick?",
      answer:
        "Im Fokus stehen Bedienung, Eingabeprüfung, Ergebnislogik und öffentliche Erreichbarkeit. Geschäftsergebnisse wie qualifizierte Anfragen, Termine und Aufträge benötigen eigene bestätigte Quellen und einen passenden Messzeitraum.",
    },
    {
      question: "Können Sie so einen Ablauf für unser Unternehmen umsetzen?",
      answer:
        "Wir nehmen Ihr Anliegen, vorhandene Systeme und Zuständigkeiten auf. Daraus planen wir einen passenden Einstieg mit Ihrem Team. Umfang, Datenwege, Kosten, Freigaben und Abnahme werden für den konkreten Auftrag vereinbart.",
    },
  ],
} as const
