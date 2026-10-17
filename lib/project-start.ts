export const projectStartResource = {
  href: "/vorlagen/AgenticIT-Projektstart-Plan.txt",
  downloadHref: "/vorlagen/AgenticIT-Projektstart-Plan.txt?download=1",
  filename: "AgenticIT-Projektstart-Plan.txt",
} as const

export const projectStartStages = [
  {
    id: "goal",
    title: "Das Ziel gemeinsam klären",
    summary:
      "Wir beginnen mit einer konkreten Aufgabe aus Ihrem Alltag. Was soll besser laufen, für wen und woran erkennen wir eine Verbesserung? Bestehende Systeme und bisherige Versuche gehören dazu.",
    gate: "Startklar, wenn Ziel, Ausgangslage und eine verantwortliche Person feststehen.",
    checklist: [
      "Einen typischen Vorgang und die heutige Handarbeit zeigen.",
      "Gewünschtes Ergebnis und Grenzen des ersten Vorhabens festhalten.",
      "Eine passende Messung mit Datenquelle und Ausgangswert wählen.",
    ],
  },
  {
    id: "agreement",
    title: "Auftrag und Rahmen festhalten",
    summary:
      "Wir beschreiben das vereinbarte Ergebnis, die Leistungen und Ihre Mitwirkung. Einrichtung, Betrieb, Lizenzen und Fremdkosten werden getrennt geklärt. Zusätzliche Wünsche stimmen wir vor ihrer Umsetzung ab.",
    gate: "Startklar, wenn Umfang, Kosten, Voraussetzungen und Abnahme vereinbart sind.",
    checklist: [
      "Leistungen und ausdrücklich nicht enthaltene Arbeiten abgrenzen.",
      "Budget, Fremdkosten, Abhängigkeiten und Termine vereinbaren.",
      "Prüfkriterien und die Person für Freigaben festlegen.",
    ],
  },
  {
    id: "prepare",
    title: "Den Start gemeinsam vorbereiten",
    summary:
      "Im Startgespräch kommen Zusagen, Unterlagen und Zuständigkeiten zusammen. Wir klären, welche Daten und Zugriffe die Aufgabe braucht. Ihr Team weiss, was als Nächstes passiert und wo der gemeinsame Stand zu finden ist.",
    gate: "Startklar, wenn Unterlagen, Ansprechpartner und benötigte Zugriffe bereitstehen.",
    checklist: [
      "Ansprechpartner, Vertretung und Kommunikationsweg benennen.",
      "Unterlagen, Datenwege und beteiligte Dienste erfassen.",
      "Benötigte Rechte über passende Einladungen bereitstellen; keine Passwörter im Startplan sammeln.",
    ],
  },
  {
    id: "validate",
    title: "Mit Ihrem Team umsetzen und prüfen",
    summary:
      "Wir richten den vereinbarten Ablauf ein und prüfen ihn mit Ihrem Team. Zum normalen Fall gehören auch Fehler, Wiederholungen und die Übernahme durch einen Menschen. Ergebnisse und offene Punkte bleiben nachvollziehbar.",
    gate: "Bereit für die Abnahme, wenn die vereinbarten Prüffälle belegt und offene Punkte bewertet sind.",
    checklist: [
      "Normalfall, Fehlerfall und menschliche Übernahme mit freigegebenen Beispielen prüfen.",
      "Erwartetes und tatsächliches Ergebnis samt Nachweis festhalten.",
      "Kundenorientierte KI kennzeichnen; ausgehende Sales-Nachrichten erst nach menschlicher Freigabe senden.",
    ],
  },
  {
    id: "handover",
    title: "Übergeben und Betreuung vereinbaren",
    summary:
      "Ihr Team erhält die vereinbarte Einweisung und Dokumentation. Wir halten fest, was abgenommen wurde, was noch offen ist und wer den Betrieb übernimmt. Betreuung und spätere Erweiterungen richten sich nach Ihrem Auftrag.",
    gate: "Übergeben, wenn Abnahme, Zuständigkeit und der weitere Betrieb geklärt sind.",
    checklist: [
      "Abnahme oder verbleibende Korrekturen mit verantwortlicher Person und Termin festhalten.",
      "Dokumentation, Einweisung, Supportweg und vereinbarte Reaktionszeiten klären.",
      "Nicht mehr benötigte Zugriffe entfernen und den ersten Rückblick vereinbaren.",
    ],
  },
] as const

export const projectStartFaqs = [
  {
    question: "Was sollten wir zum ersten Gespräch mitbringen?",
    answer:
      "Eine konkrete Aufgabe, die heute Aufwand verursacht, und einen Überblick über die beteiligten Werkzeuge. Ein anonymisiertes Beispiel hilft. Falls Sie bereits einen unserer Checks ausgefüllt haben, können Sie Ihren Plan mitbringen. Für das erste Gespräch brauchen wir keine Passwörter oder Kundendaten.",
  },
  {
    question: "Müssen wir dafür unsere Systeme ersetzen?",
    answer:
      "Wir schauen zuerst, was bereits vorhanden ist und genutzt werden kann. Eine bessere Einrichtung oder eine Verbindung kann genügen. Ein Systemwechsel wird nur Teil der Arbeit, wenn er für Ihr Vorhaben sinnvoll und ausdrücklich vereinbart ist.",
  },
  {
    question: "Wie werden Kosten und zusätzliche Wünsche geregelt?",
    answer:
      "Leistungsumfang, Voraussetzungen, Kosten und Abnahme werden vor dem Start vereinbart. Einrichtung, laufender Betrieb, Lizenzen und weitere Fremdkosten werden getrennt betrachtet. Ändert sich der Umfang, klären wir Auswirkungen auf Aufwand, Preis und Termine vor der zusätzlichen Umsetzung.",
  },
  {
    question: "Was passiert nach der Abnahme?",
    answer:
      "Wir klären Dokumentation, Einweisung, Zuständigkeit und offene Punkte. Falls Sie Betreuung wünschen, vereinbaren wir dafür Umfang, Kontaktweg und Reaktionszeiten separat. Nicht mehr benötigte Zugriffe werden entfernt. Eine laufende Betreuung oder Erreichbarkeit rund um die Uhr ist nicht automatisch enthalten.",
  },
] as const
