// Existing offer addresses describe tasks within Marketing, Sales and Administration.
// Chart types remain available to historical components; no modelled outcome chart is published here.

export type ChartRadar = {
  type: "radar"
  title: string
  axes: string[]
  agentic: number[] // 0..1
  now: number[] // 0..1
}
export type ChartFunnel = {
  type: "funnel"
  title: string
  steps: { label: string; pct: number }[]
}
export type ChartLine = {
  type: "line"
  title: string
  xLabels: string[]
  agentic: number[]
  now: number[]
}
export type ChartDonut = {
  type: "donut"
  title: string
  segments: { label: string; value: number; color: string }[]
}
export type AngebotChartData = ChartRadar | ChartFunnel | ChartLine | ChartDonut

export type AngebotFaq = { q: string; a: string }

export type AngebotArea = {
  slug: string
  key: "begeistern" | "umsetzen" | "erschaffen" | "erweitern"
  navLabel: string
  name: string
  german: string
  icon: string
  eyebrow: string
  tagline: string
  nutzen: string
  accent: string
  accentSoft: string
  services: { lead: string; short: string; long: string }[]
  check: { href: string; label: string }
  flow: { title: string; text: string }[]
  evaluation: string[]
  related: { href: string; label: string }[]
  faqs: { question: string; answer: string }[]
  meta: { title: string; description: string }
}

const palette = { accent: "#4d7c36", accentSoft: "#edf5e7" }

export const offerOverview = {
  title: "Marketing, Sales und Verwaltung verbinden",
  description:
    "Vom ersten Interesse bis zur Kundenbetreuung: AgenticIT verbindet Marketing, Sales und Verwaltung. Aufgaben einordnen und den passenden Check nutzen.",
  h1: "Ein Angebot. Verbundene Abläufe.",
  lead: "Ihre Website weckt Interesse. Ihr Team führt Anfragen weiter. Im Hintergrund bleiben Kundendaten, Aufgaben und Termine verbunden. Wir richten Marketing, Sales und Verwaltung so ein, dass die Übergaben im Alltag funktionieren.",
  faqs: [
    {
      question: "Müssen wir dafür alle Systeme ersetzen?",
      answer:
        "Wir nehmen zuerst auf, was bereits funktioniert. Geeignete Websites, Werbekonten, CRM- und Fachsysteme beziehen wir ein. Neue Tools wählen wir, wenn sie für den vereinbarten Ablauf einen konkreten Nutzen haben und sich passend verbinden lassen.",
    },
    {
      question: "Können wir mit einem Bereich beginnen?",
      answer:
        "Ja. Wir vereinbaren den ersten Service mit einem klaren Umfang und einer verantwortlichen Person. Dabei berücksichtigen wir die Übergaben zu den anderen Bereichen. Welche Leistungen später folgen, entscheiden Sie anhand Ihres Bedarfs.",
    },
    {
      question: "Was klären wir vor dem Start?",
      answer:
        "Ziel, bestehender Ablauf, beteiligte Menschen und Systeme, Datenwege, Befugnisse und Abnahme. Ihr Team bestimmt mit uns, welche Schritte automatisiert werden und wer bei Ausnahmen übernimmt. Preise und laufende Kosten vereinbaren wir vor der Umsetzung.",
    },
    {
      question: "Wie finden wir den passenden Einstieg?",
      answer:
        "Der Kundenreise-Check ordnet Ihr Anliegen ein und liefert einen direkt nutzbaren Plan. Bei einer konkreten Aufgabe wählen Sie unten den passenden Fach-Check. Wenn Sie Ihren Bedarf bereits kennen, können Sie direkt Kontakt aufnehmen.",
    },
  ],
}

export const offerServiceLinks: Record<
  string,
  { href: string; label: string }
> = {
  acquisition: {
    href: "/loesungen/gtm-markteintritt",
    label: "Marketing im Detail",
  },
  appointments: {
    href: "/loesungen/revops-umsatzgenerierung",
    label: "Sales im Detail",
  },
  workflow: {
    href: "/loesungen/prozessautomatisierung",
    label: "Verwaltung im Detail",
  },
}

export const ANGEBOT_AREAS: AngebotArea[] = [
  {
    ...palette,
    slug: "angebot/begeistern",
    key: "begeistern",
    navLabel: "Anfragen gewinnen",
    name: "Die richtigen Menschen erreichen.",
    german: "Marketing",
    icon: "01",
    eyebrow: "Marketing",
    tagline:
      "Eine verständliche Website, hilfreiche Inhalte und vorbereitete Kampagnen machen aus Ihrem Angebot einen klaren Einstieg für Interessenten.",
    nutzen:
      "Sie wissen, wen Sie erreichen wollen, was Sie anbieten und wie eine Anfrage zu Ihrem Team gelangt.",
    services: [
      {
        lead: "Angebot und Zielgruppe schärfen",
        short: "Eine klare Richtung",
        long: "Wir klären Anlass, Zielgruppe und nächsten Schritt. Daraus entstehen eine verständliche Botschaft und ein Anfrageweg, der zu Ihrem Beratungs- oder Vertriebsalltag passt.",
      },
      {
        lead: "Digitale Präsenz aufbauen",
        short: "Sichtbar und verständlich",
        long: "Website, Landingpages und Inhalte beantworten die Fragen Ihrer Interessenten. Suchabsicht, mobile Bedienung und ein erkennbarer nächster Schritt gehören zusammen.",
      },
      {
        lead: "Tools und Kampagnen vorbereiten",
        short: "Bereit für den Start",
        long: "Wir richten die vereinbarten Werbekonten, Zielseiten und Messwege ein. Zielgruppe, Budget und Inhalte werden vor dem Kampagnenstart abgestimmt und freigegeben.",
      },
      {
        lead: "Einen nützlichen Einstieg schaffen",
        short: "Nutzen vor Kontakt",
        long: "Ein Check, Rechner oder eine Vorlage hilft bei einer konkreten Entscheidung. Interessenten sehen ihr Ergebnis und entscheiden selbst, ob sie eine persönliche Unterstützung anfragen.",
      },
    ],
    check: { href: "/marketing-setup-check", label: "Marketing-Setup prüfen" },
    flow: [
      {
        title: "Interesse wecken",
        text: "Eine passende Suche, Empfehlung oder Kampagne führt auf die richtige Seite.",
      },
      {
        title: "Orientierung geben",
        text: "Angebot und Hilfsmittel beantworten die erste Frage und zeigen den nächsten Schritt.",
      },
      {
        title: "Sauber übergeben",
        text: "Eine freiwillige Anfrage gelangt mit Anliegen und erlaubtem Kontaktweg an Ihr Team.",
      },
    ],
    evaluation: [
      "Passt die Botschaft zur tatsächlichen Zielgruppe?",
      "Sind Auftritt, Konten und Messung für den vereinbarten Start bereit?",
      "Erreicht eine erlaubte Testanfrage die zuständige Person mit ihrem Kontext?",
    ],
    related: [
      { href: "/loesungen/webdesign", label: "Webdesign" },
      { href: "/loesungen/gtm-markteintritt", label: "Marketing-Setup" },
    ],
    faqs: [
      {
        question: "Ist das nur Webdesign?",
        answer:
          "Der Auftritt ist ein Teil davon. Wir verbinden Angebot, Inhalte, passende Kanäle und den Anfrageweg. So ist vor dem Start geklärt, was ein Interessent tun kann und wie Ihr Team die Anfrage weiterbearbeitet.",
      },
      {
        question: "Brauchen wir sofort Werbebudget?",
        answer:
          "Zuerst prüfen wir Ziel, Auftritt und Anfrageweg. Ob eine bezahlte Kampagne sinnvoll ist, klären wir danach. Werbe- und Toolkosten werden vor dem Start vereinbart; sie sind keine hier zugesagte Pauschale.",
      },
      {
        question: "Was passiert mit alten Kontakten?",
        answer:
          "Eine frühere Anfrage ist keine automatische Erlaubnis für neue Werbung. Vor einer erneuten Ansprache prüfen wir Anlass, Kontaktberechtigung und Widersprüche. Nachrichten und geschäftliche Empfehlungen benötigen eine menschliche Freigabe.",
      },
      {
        question: "Was zeigt uns der Marketing-Setup-Check?",
        answer:
          "Er ordnet Angebot, Zielgruppe, Auftritt, Anfrageweg und Messung ein. Sie erhalten bis zu drei priorisierte Ansatzpunkte und einen vollständigen Plan. Kontakt können Sie anschliessend freiwillig aufnehmen.",
      },
    ],
    meta: {
      title: "Anfragen gewinnen mit einem klaren Marketing-Setup",
      description:
        "Angebot, Website, Inhalte, Werbekonten und Lead-Magnete verbinden. Einen verständlichen Anfrageweg aufbauen und Ihr Marketing-Setup prüfen.",
    },
  },
  {
    ...palette,
    slug: "angebot/umsetzen",
    key: "umsetzen",
    navLabel: "Anfragen weiterführen",
    name: "Aus Interesse wird ein nächster Schritt.",
    german: "Sales",
    icon: "02",
    eyebrow: "Sales",
    tagline:
      "Kampagnen bringen Kontakte. Ein klarer Vertriebsablauf hilft Ihrem Team, passende Anfragen zu erkennen und verlässlich weiterzuführen.",
    nutzen:
      "Ihr Team sieht, wer zuständig ist, welche Informationen vorliegen und was als Nächstes zu tun ist.",
    services: [
      {
        lead: "Kampagnen in den Vertrieb überführen",
        short: "Ein Eingang mit Kontext",
        long: "Wir verbinden die vereinbarten Anfragequellen mit dem CRM. Herkunft, Anliegen und erlaubter Kontaktweg sollen beim zuständigen Team ankommen.",
      },
      {
        lead: "Anfragen einordnen und verteilen",
        short: "Klare Verantwortung",
        long: "Gemeinsam definieren wir, wann eine Anfrage passt, welche Angaben fehlen und wer übernimmt. Ausnahmen landen zur Prüfung bei einem Menschen.",
      },
      {
        lead: "Gespräche und Angebote vorbereiten",
        short: "Das Team unterstützen",
        long: "Vorlagen, Gesprächsnotizen und relevante Kundendaten helfen bei der Vorbereitung. KI kann Entwürfe liefern; geschäftliche Empfehlungen und Angebote werden vor dem Versand geprüft.",
      },
      {
        lead: "Den nächsten Schritt nachhalten",
        short: "Nachfassen mit Augenmass",
        long: "Aufgaben und Erinnerungen machen offene Zusagen sichtbar. Kontaktwünsche, Absagen und Widersprüche werden berücksichtigt. Vereinbarte Kennzahlen zeigen, wo der Ablauf verbessert werden muss.",
      },
    ],
    check: { href: "/anfragen-check", label: "Anfrageweg prüfen" },
    flow: [
      {
        title: "Anfrage einordnen",
        text: "Anliegen, Kontaktdaten und Herkunft stehen im vereinbarten CRM-Vorgang.",
      },
      {
        title: "Team übernimmt",
        text: "Die zuständige Person prüft den Bedarf und vereinbart den nächsten Schritt.",
      },
      {
        title: "Ergebnis festhalten",
        text: "Gespräch, Angebot, Absage oder offene Aufgabe werden nachvollziehbar weitergeführt.",
      },
    ],
    evaluation: [
      "Kommt jede geprüfte Anfrage mit dem nötigen Kontext an?",
      "Sind Zuständigkeit, Aufgabe und nächster Schritt sichtbar?",
      "Werden Absagen, Fehlerfälle und menschliche Freigaben berücksichtigt?",
    ],
    related: [
      { href: "/loesungen/revops-umsatzgenerierung", label: "Sales und CRM" },
      {
        href: "/blog/ki-im-verkaufsgespraech",
        label: "KI im Verkaufsgespräch",
      },
    ],
    faqs: [
      {
        question: "Ersetzt die Lösung unser Verkaufsteam?",
        answer:
          "Sie unterstützt das Team bei Vorbereitung, Erfassung und Nachverfolgung. Bedarf einordnen, beraten und geschäftliche Entscheidungen treffen bleiben menschliche Aufgaben. Was ein Agent selbst ausführen darf, wird ausdrücklich begrenzt.",
      },
      {
        question: "Können wir unser CRM behalten?",
        answer:
          "Wir prüfen zuerst, ob Ihr CRM die vereinbarten Daten, Aufgaben und Übergaben unterstützt. Schnittstellen, Berechtigungen und mögliche Grenzen werden vor der Umsetzung geklärt. Ein Wechsel ist keine Voraussetzung dieser Seite.",
      },
      {
        question: "Wird automatisch ein Termin bestätigt?",
        answer:
          "Eine Bestätigung setzt eine tatsächlich gespeicherte Buchung im vorgesehenen Kalender voraus. Verfügbarkeit, Zeitzone, Berechtigung und Fehlerfälle müssen geprüft sein. Bei einem Fehler übernimmt die zuständige Person.",
      },
      {
        question: "Was erhalten wir im Anfragen-Check?",
        answer:
          "Sie prüfen Eingang, Reaktion, Verantwortung und Nachfassen. Das Ergebnis benennt priorisierte Lücken und enthält einen direkt nutzbaren Plan. Eine Kontaktanfrage ist freiwillig.",
      },
    ],
    meta: {
      title: "Anfragen im CRM verlässlich weiterführen",
      description:
        "Kampagnen, Anfragebearbeitung und Vertrieb verbinden. Zuständigkeiten klären, Ihr Team unterstützen und den nächsten Schritt im CRM sichtbar machen.",
    },
  },
  {
    ...palette,
    slug: "angebot/erschaffen",
    key: "erschaffen",
    navLabel: "Kunden begleiten",
    name: "Kunden gut begleiten. Im Alltag verbunden.",
    german: "Sales und Verwaltung",
    icon: "03",
    eyebrow: "Kundenbetreuung",
    tagline:
      "Nach dem Auftrag beginnt die Zusammenarbeit. Wir verbinden Kundenstart, Unterlagen, Aufgaben und Betreuungsanlässe in einem nachvollziehbaren Ablauf.",
    nutzen:
      "Ihr Team kann auf bestehendes Wissen aufbauen und sieht, was mit dem Kunden vereinbart wurde.",
    services: [
      {
        lead: "Den Kundenstart organisieren",
        short: "Ein klarer erster Schritt",
        long: "Zuständigkeiten, Unterlagen und vereinbarte Leistungen werden für den Start zusammengestellt. Offene Voraussetzungen bleiben sichtbar, bevor der nächste Schritt beginnt.",
      },
      {
        lead: "Kundendaten verbunden halten",
        short: "Wissen weitergeben",
        long: "Wir legen fest, welches System welche Information führt. Übergaben, Dubletten und Änderungen werden anhand konkreter Fälle geprüft, damit Ihr Team nicht immer wieder dieselben Angaben erfragen muss.",
      },
      {
        lead: "Betreuungsanlässe sichtbar machen",
        short: "Zum passenden Zeitpunkt",
        long: "Vereinbarte Fristen, offene Anliegen und Kundenwünsche können Aufgaben auslösen. Zusatzangebote werden fachlich geprüft und nur über erlaubte Wege angesprochen.",
      },
      {
        lead: "Rückmeldungen in Verbesserungen übersetzen",
        short: "Aus dem Alltag lernen",
        long: "Feedback wird der zuständigen Person zugeordnet. Wiederkehrende Fragen und Stolperstellen helfen, Service und Ablauf zu verbessern. Bewertungen bleiben freiwillig und werden nicht vorgegeben.",
      },
    ],
    check: { href: "/crm-ablauf-check", label: "CRM-Ablauf prüfen" },
    flow: [
      {
        title: "Auftrag klären",
        text: "Leistung, Ansprechpartner und benötigte Unterlagen sind vereinbart.",
      },
      {
        title: "Start begleiten",
        text: "Aufgaben haben Verantwortliche; fehlende Angaben werden gezielt geklärt.",
      },
      {
        title: "Betreuung fortführen",
        text: "Offene Anliegen, Fristen und freigegebene nächste Schritte bleiben sichtbar.",
      },
    ],
    evaluation: [
      "Kann das Team vereinbarte Leistungen und offene Punkte finden?",
      "Sind Kundenstart und Datenübergaben mit realistischen Fällen geprüft?",
      "Wer übernimmt Rückfragen und Ausnahmen im laufenden Betrieb?",
    ],
    related: [
      { href: "/zusammenarbeit", label: "Projektstart und Übergabe" },
      {
        href: "/loesungen/revops-umsatzgenerierung",
        label: "Sales und Kundenbetreuung",
      },
    ],
    faqs: [
      {
        question: "Ist Kundenbetreuung ein zusätzlicher Angebotsbereich?",
        answer:
          "Sie verbindet Sales und Verwaltung. Der Vertrieb hält Vereinbarungen fest; die Verwaltung führt Unterlagen, Aufgaben und Termine weiter. Wir planen die Übergaben innerhalb der drei Bereiche Marketing, Sales und Verwaltung.",
      },
      {
        question: "Werden Kunden automatisch angeschrieben?",
        answer:
          "Wir legen zuerst Anlass, erlaubten Kontaktweg und Verantwortung fest. Automatisierte Sales-Nachrichten und geschäftliche Empfehlungen brauchen eine menschliche Freigabe vor dem Versand. Ein Download oder alter Datensatz löst hier keine Ansprache aus.",
      },
      {
        question: "Was brauchen wir für einen guten Kundenstart?",
        answer:
          "Einen bestätigten Auftrag, die zuständigen Personen, benötigte Zugänge und Unterlagen sowie klare Abnahmekriterien. Die Projektstart-Vorlage auf unserer Seite zur Zusammenarbeit hilft, diese Punkte gemeinsam festzuhalten.",
      },
      {
        question: "Wie hilft der CRM-Ablauf-Check?",
        answer:
          "Er ordnet Datenquellen, Übergaben, Zuständigkeiten und mögliche Dubletten ein. Sie erhalten priorisierte Ansatzpunkte und einen ausfüllbaren Sollablauf. Eine vollständige technische CRM-Prüfung wird damit nicht vorweggenommen.",
      },
    ],
    meta: {
      title: "Kundenstart und Betreuung im CRM verbinden",
      description:
        "Kunden nach dem Auftrag verlässlich begleiten: Unterlagen, Aufgaben, Fristen und Zuständigkeiten verbinden. Den passenden CRM-Ablauf prüfen.",
    },
  },
  {
    ...palette,
    slug: "angebot/erweitern",
    key: "erweitern",
    navLabel: "Routine vereinfachen",
    name: "Routine abgeben. Freiraum gewinnen.",
    german: "Verwaltung",
    icon: "04",
    eyebrow: "Verwaltung",
    tagline:
      "Belege zuordnen, Termine koordinieren und Daten übertragen: Wir prüfen, welche wiederkehrenden Aufgaben sich mit passenden Tools und KI vereinfachen lassen.",
    nutzen:
      "Sie sehen, welcher Ablauf Zeit bindet, wo Automatisierung hilft und welche Kontrolle Ihr Team weiterhin braucht.",
    services: [
      {
        lead: "Dokumente und Belege vorbereiten",
        short: "Weniger abtippen",
        long: "Geeignete Angaben können aus Dokumenten übernommen und einem Vorgang zugeordnet werden. Unklare Werte und fachliche Entscheidungen gehen zur Prüfung an die zuständige Person.",
      },
      {
        lead: "Termine und Aufgaben verbinden",
        short: "Zusagen weiterführen",
        long: "Aus vereinbarten Abläufen entstehen Aufgaben und Erinnerungen. Bei freigegebener Gesprächserfassung können Notizentwürfe unterstützen. Die Übernahme in Aufgaben wird vorab mit Ihrem Team abgestimmt.",
      },
      {
        lead: "Fahrten und wiederkehrende Erfassungen vereinfachen",
        short: "Informationen einmal aufnehmen",
        long: "Wir prüfen passende Fahrtenbuch-, Spesen- und Erfassungslösungen. Zuordnung, Korrektur und Export müssen zu Ihrem Betrieb passen; eine pauschale steuerliche oder rechtliche Anerkennung wird nicht zugesagt.",
      },
      {
        lead: "Assistenten und eigene Anwendungen einrichten",
        short: "Passend zum Alltag",
        long: "Ein klar begrenzter Assistent oder eine eigene App kann bestehende Systeme verbinden. Befugnisse, Übergabe an Menschen und Einweisung des Teams gehören zur Planung und Prüfung.",
      },
    ],
    check: { href: "/automatisierungs-check", label: "Routineaufwand prüfen" },
    flow: [
      {
        title: "Aufwand aufnehmen",
        text: "Häufigkeit, Bearbeitungszeit und nötige Kontrolle werden für einen Ablauf erfasst.",
      },
      {
        title: "Verbindung umsetzen",
        text: "Passende Tools übernehmen die vereinbarten Schritte mit begrenzten Befugnissen.",
      },
      {
        title: "Im Alltag prüfen",
        text: "Ihr Team vergleicht Aufwand, Nacharbeit und Qualität und übernimmt Ausnahmen.",
      },
    ],
    evaluation: [
      "Wie viel Zeit kostet der Ablauf einschliesslich Kontrolle?",
      "Was passiert bei fehlenden oder unklaren Daten?",
      "Kann Ihr Team Ergebnisse korrigieren und den Ablauf selbst weiterführen?",
    ],
    related: [
      {
        href: "/loesungen/prozessautomatisierung",
        label: "Prozessautomatisierung",
      },
      { href: "/loesungen/ki-entwicklung", label: "KI-Entwicklung" },
    ],
    faqs: [
      {
        question: "Welche Aufgabe eignet sich für den Anfang?",
        answer:
          "Eine regelmässige Aufgabe mit klarem Eingang, nachvollziehbaren Schritten und überprüfbarem Ergebnis. Wir berücksichtigen Häufigkeit, Kontrollaufwand und Folgen eines Fehlers. Nicht jede Aufgabe braucht KI.",
      },
      {
        question: "Sind damit alle Abläufe vollautomatisch?",
        answer:
          "Wir vereinbaren, welche Schritte automatisch laufen dürfen und wo ein Mensch prüft. Fehlende Daten, unklare Ergebnisse oder fehlende Befugnisse benötigen eine geregelte Übernahme. Die Grenzen werden mit dem Team getestet.",
      },
      {
        question: "Muss unser Team zuerst einen KI-Kurs machen?",
        answer:
          "Die Lösung wird an den Arbeitsablauf angepasst. Ihr Team erhält eine praktische Einweisung für Bedienung, Kontrolle und Ausnahmen. Welche weitere Schulung sinnvoll ist, richtet sich nach Rollen und Vorhaben.",
      },
      {
        question: "Wie berechnet der Check den möglichen Zeitgewinn?",
        answer:
          "Mit Ihren Angaben zu Häufigkeit, Zeit pro Aufgabe, angenommener Automatisierung und zusätzlicher Kontrolle. Die Rechnung zeigt ein Planungsszenario. Erst der Vergleich im tatsächlichen Betrieb belegt eine erreichte Entlastung.",
      },
    ],
    meta: {
      title: "Routineaufgaben mit Tools und KI vereinfachen",
      description:
        "Belege, Aufgaben, Termine und Erfassungen passend automatisieren. Aufwand, Kontrolle und menschliche Übernahme klären. Ihren Routineaufwand prüfen.",
    },
  },
]

export const ANGEBOT_BY_KEY: Record<string, AngebotArea> = Object.fromEntries(
  ANGEBOT_AREAS.map((area) => [area.key, area]),
)

export const ANGEBOT_NAV_SUBS = ANGEBOT_AREAS.map((area) => ({
  navLabel: area.navLabel,
  slug: area.slug,
}))
