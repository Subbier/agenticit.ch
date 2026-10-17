export const POTENZIAL_HERO = {
  eyebrow: "Ihr Akquise-Plan",
  h1: "Wie viele Anfragen braucht Ihr Ziel?",
  lead: "Kundenziel und Abschlussquote eingeben. Sie sehen, wie viele passende Anfragen Sie dafür einplanen – und was Ihr Team bearbeiten müsste.",
} as const

export const planningSteps = [
  {
    title: "Marketing",
    text: "Zielgruppe, Angebot und einen Anfrageweg wählen. Anfrageziel mit Reichweite und Budget abgleichen.",
  },
  {
    title: "Sales",
    text: "Passende Anfragen erkennen. Reaktion, Zuständigkeit und nächsten Schritt im CRM festhalten.",
  },
  {
    title: "Verwaltung",
    text: "Anfragen und Abschlüsse gemeinsam nachhalten. Bearbeitungszeit prüfen und die Planung anpassen.",
  },
] as const

export const planningFaqs = [
  {
    q: "Zeigt der Planer echte Suchnachfrage?",
    a: "Nein. Er rechnet mit Ihrem Kundenziel und Ihrer angenommenen Abschlussquote. Er misst keine Suchanfragen, Marktgrösse oder erreichbare Reichweite. Eine Marktprüfung gehört zum nächsten Planungsschritt.",
  },
  {
    q: "Welche Abschlussquote soll ich eingeben?",
    a: "Nutzen Sie nach Möglichkeit den Anteil tatsächlicher Neukunden aus einer vergleichbaren Gruppe passender Anfragen. Ohne eigene Daten ist Ihre Eingabe eine Annahme. Beobachten Sie die Gruppe über ihre Abschlussdauer; Anfragen eines Monats werden nicht zwingend im selben Monat zu Kunden.",
  },
  {
    q: "Was bedeutet die vorsichtigere Annahme?",
    a: "Der Vergleich rechnet mit 80 Prozent Ihrer eingegebenen Abschlussquote. Aus 25 Prozent werden zum Beispiel 20 Prozent. Er zeigt, wie sich der rechnerische Bedarf verändert, und ist keine gemessene Marktschwankung.",
  },
  {
    q: "Was passiert mit meinen Angaben?",
    a: "Die Rechnung läuft in Ihrem Browser. Eine Kontaktanfrage ist freiwillig. Erst wenn Sie diese mit Einwilligung senden, werden Ihre Angaben und der daraus abgeleitete Plan zur persönlichen Prüfung übermittelt. Die allgemeinen Datenschutzinformationen gelten weiterhin.",
  },
] as const
