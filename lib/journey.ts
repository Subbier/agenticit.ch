import { projectStartResource } from "./project-start"

export const challenges = [
  {
    id: "acquisition",
    label: "Mehr passende Anfragen",
    description:
      "Gefunden werden und aus Interesse eine konkrete Anfrage machen.",
    magnet: "Ihr Marketing-Setup-Check",
    result: "Ein klarer Weg von der Zielgruppe zur Anfrage.",
    packageId: "acquisition",
    icon: "search",
  },
  {
    id: "conversion",
    label: "Mehr Gespräche und Abschlüsse",
    description: "Anfragen, Termine und Offerten verlässlich weiterführen.",
    magnet: "Ihr Follow-up-Plan",
    result: "Eine Kontaktfolge mit Anlass und nächstem Schritt.",
    packageId: "appointments",
    icon: "messages",
  },
  {
    id: "admin",
    label: "Mehr Zeit. Weniger Handarbeit.",
    description:
      "Wiederkehrende Aufgaben automatisieren – von der Datenerfassung bis zur Nacharbeit nach Meetings.",
    magnet: "Ihr Automatisierungs-Check",
    result:
      "Ihre manuellen Aufgaben, Ihr Zeitpotenzial und ein erster Ansatzpunkt.",
    packageId: "workflow",
    icon: "clock",
  },
  {
    id: "onboarding",
    label: "Ein klarer Kundenstart",
    description:
      "Unterlagen, Zuständigkeiten und nächste Schritte zusammenbringen.",
    magnet: "Ihr Onboarding-Plan",
    result: "Eine Checkliste vom Auftrag bis zum ersten Ergebnis.",
    packageId: "workflow",
    icon: "check",
  },
  {
    id: "phone",
    label: "Besser erreichbar sein",
    description: "Anliegen aufnehmen und an die richtige Person weitergeben.",
    magnet: "Ihr Empfangs-Check",
    result: "Ein Gesprächsleitfaden mit menschlicher Übergabe.",
    packageId: "workflow",
    icon: "phone",
  },
  {
    id: "retention",
    label: "Kunden aktiv betreuen",
    description: "Betreuungsanlässe erkennen und Beziehungen weiterentwickeln.",
    magnet: "Ihr Betreuungsplan",
    result: "Eine Struktur für Kontaktanlässe und Verantwortung.",
    packageId: "workflow",
    icon: "heart",
  },
  {
    id: "partnership",
    label: "Ein Partner für Ihre Digitalisierung",
    description:
      "Website, CRM, Marketing, Telefonie und Support verbinden. Mit einem Ansprechpartner und einem klaren Fahrplan.",
    magnet: "Ihr Digitalisierungs-Fahrplan",
    result: "Eine Übersicht Ihrer Systeme, Partner und nächsten Schritte.",
    packageId: "workflow",
    icon: "network",
  },
] as const

export type ChallengeId = (typeof challenges)[number]["id"]
export type PackageId = (typeof challenges)[number]["packageId"]
export type JourneyAnswers = {
  challenge: ChallengeId
  channel: "web" | "phone" | "mixed"
  system: "manual" | "crm" | "connected"
}

export const channelLabels = {
  web: "Website und Formulare",
  phone: "Telefon und E-Mail",
  mixed: "Mehrere Kanäle",
}
export const systemLabels = {
  manual: "Listen und Einzeltools",
  crm: "Ein CRM mit manuellen Schritten",
  connected: "Unsere Systeme sind verbunden",
}

export const packages = [
  {
    id: "acquisition",
    number: "01",
    title: "Marketing",
    short: "Sichtbar werden. Startklar sein.",
    scope: "Von der digitalen Präsenz bis zum Kampagnen-Setup.",
    items: [
      "Website und Inhalte auf Ihre Zielgruppe ausrichten",
      "Passende Tools einrichten und miteinander verbinden",
      "Google Ads, Werbekonten und Messung vorbereiten",
      "Lead-Magnete und Kampagnen für den Start entwickeln",
    ],
    outcome:
      "Wir prüfen, ob Auftritt, Konten, Messung und Anfrageweg für den vereinbarten Kampagnenstart bereit sind.",
    requirement:
      "Ihr Angebot, Ihre Zielgruppe und Zugang zu den vereinbarten Systemen. Den ersten Schritt und allfällige Werbe- oder Toolkosten legen wir gemeinsam fest.",
    challenge: "acquisition",
  },
  {
    id: "appointments",
    number: "02",
    title: "Sales",
    short: "Die richtigen Kunden gewinnen.",
    scope: "Von der Kampagne bis zum Abschluss.",
    items: [
      "Kampagnen starten und passende Interessenten erreichen",
      "Anfragen im CRM bündeln und gezielt weiterführen",
      "Ihr Team bei Gesprächen und Nachfassen unterstützen",
      "Ergebnisse auswerten und Kundengewinnung verbessern",
    ],
    outcome:
      "Wir verfolgen, welche Anfragen passen, wie schnell Ihr Team reagiert und wie daraus Gespräche und Abschlüsse entstehen.",
    requirement:
      "Ein abgestimmtes Angebot, Kapazität für neue Anfragen und eine Ansprechperson im Vertrieb. Kampagnenbudget, Zuständigkeiten und Freigaben vereinbaren wir gemeinsam.",
    challenge: "conversion",
  },
  {
    id: "workflow",
    number: "03",
    title: "Verwaltung",
    short: "Weniger Routine. Mehr Zeit für Kunden.",
    scope: "Vom Kundenstart bis zur langfristigen Betreuung.",
    items: [
      "Wiederkehrende Aufgaben mit KI automatisieren",
      "Kundendaten und Abläufe zentral organisieren",
      "Kundenstart, Termine und Unterlagen koordinieren",
      "Betreuungsanlässe erkennen und Kunden langfristig begleiten",
    ],
    outcome:
      "Wir vergleichen Zeitaufwand, Datenqualität und nötige Nacharbeit im vereinbarten Ablauf. Ihr Team prüft, ob die Lösung im Alltag entlastet.",
    requirement:
      "Ein wiederkehrender Ablauf, die benötigten Systemzugänge und eine verantwortliche Person im Team. Datenwege und menschliche Übernahme klären wir vor dem Start.",
    challenge: "admin",
  },
] as const

export const journeyStages = [
  {
    title: "Gefunden werden",
    detail:
      "Website, Inhalte und Kampagnen bringen Ihr Angebot zu den passenden Menschen.",
    handoff: "Von Aufmerksamkeit zu einer konkreten Frage.",
    challenge: "acquisition",
  },
  {
    title: "Interesse entwickeln",
    detail:
      "Eine hilfreiche Vorlage oder ein Check beantwortet die erste Frage und macht den nächsten Schritt verständlich.",
    handoff: "Vom Interesse zur passenden Anfrage.",
    challenge: "acquisition",
  },
  {
    title: "Gespräche führen",
    detail:
      "Anfragen erhalten eine Zuständigkeit. Terminierung, Vorbereitung und Nachfassen greifen ineinander.",
    handoff: "Von der Anfrage zum persönlichen Gespräch.",
    challenge: "conversion",
  },
  {
    title: "Kunden starten",
    detail:
      "Der Auftrag löst einen klaren Start aus: Unterlagen, Ansprechpartner und erste Schritte stehen fest.",
    handoff: "Vom Abschluss zur verlässlichen Zusammenarbeit.",
    challenge: "onboarding",
  },
  {
    title: "Beziehungen entwickeln",
    detail:
      "Ihr Team kennt den Verlauf, erkennt bestätigte Bedürfnisse und bleibt zum passenden Anlass im Gespräch.",
    handoff: "Von der Betreuung zur nächsten gemeinsamen Chance.",
    challenge: "retention",
  },
] as const

export const journeyFaqs = [
  {
    question: "Muss ich für den Check meine E-Mail angeben?",
    answer:
      "Nein. Sie sehen das Ergebnis direkt und können Ihren Plan speichern. Kontaktdaten brauchen wir erst, wenn Sie eine persönliche Rückmeldung wünschen.",
  },
  {
    question: "Müssen wir unser bestehendes CRM ersetzen?",
    answer:
      "Wir prüfen zuerst Ihren vorhandenen Ablauf und Ihre Systeme. Eine Erweiterung oder Verbindung kann genügen. Ein Wechsel wird nur dann Teil des Auftrags, wenn er gemeinsam vereinbart ist.",
  },
  {
    question: "Wie wählen wir die passenden Services aus?",
    answer:
      "Wir klären Ihre Ziele, prüfen bestehende Abläufe und stellen die passenden Leistungen aus Marketing, Sales und Verwaltung zusammen. Umfang, Preis, Voraussetzungen und Abnahme vereinbaren wir vor dem Start. Betrieb und Betreuung richten sich nach Ihrem Bedarf und dem vereinbarten Auftrag.",
  },
  {
    question: "Was kostet die Zusammenarbeit?",
    answer:
      "Der Preis richtet sich nach dem vereinbarten Umfang, den Systemen und dem Betreuungsbedarf. Einrichtung, laufender Betrieb und Fremdkosten werden vor dem Auftrag transparent festgelegt.",
  },
  {
    question: "Wie bleibt unser Team eingebunden?",
    answer:
      "Eine verantwortliche Person begleitet die Umsetzung. Wir klären Zuständigkeiten, zeigen die Bedienung und prüfen Fehlerfälle sowie die menschliche Übernahme. Ausgehende Sales-Nachrichten brauchen eine menschliche Freigabe.",
  },
  {
    question: "Wo werden unsere Daten verarbeitet?",
    answer:
      "Das hängt von der vereinbarten Lösung und den eingesetzten Diensten ab. Datenwege, Zugriffsrechte und Anforderungen klären wir vor der Umsetzung für Ihren konkreten Auftrag.",
  },
]

export function isChallengeId(value: unknown): value is ChallengeId {
  return challenges.some((challenge) => challenge.id === value)
}

const playbooks: Record<
  ChallengeId,
  { focus: string; action: string; measure: string; template: string }
> = {
  acquisition: {
    focus: "Ein klarer Anfrageweg",
    action:
      "Wählen Sie eine Zielgruppe und eine wiederkehrende Frage. Bieten Sie genau dafür eine hilfreiche Vorlage oder einen Check an und führen Sie zu einer passenden Anfrage.",
    measure:
      "Passende Anfragen je Einstieg und tatsächlich geführte Gespräche.",
    template:
      "ANFRAGE-CHECKLISTE\n[ ] Eine Zielgruppe benannt\n[ ] Eine konkrete Herausforderung beschrieben\n[ ] Eine direkt nutzbare Hilfe angeboten\n[ ] Ein verständlicher nächster Schritt\n[ ] Zuständige Person für neue Anfragen\n[ ] Testanfrage am richtigen Ziel bestätigt\n[ ] Passung der eingegangenen Anfragen im Gespräch geprüft",
  },
  conversion: {
    focus: "Nachfassen mit einem nächsten Schritt",
    action:
      "Legen Sie für jede Anfrage und jede Offerte eine verantwortliche Person, einen Anlass zum Nachfassen und einen konkreten nächsten Schritt fest.",
    measure:
      "Zeit bis zur ersten Reaktion, offene Fälle und tatsächlich geführte passende Gespräche.",
    template:
      "FOLLOW-UP-VORLAGEN · VOR VERWENDUNG ANPASSEN UND FREIGEBEN\n\n1. Nach der Anfrage\nDanke für Ihr Interesse an [Thema]. Damit wir die passende Lösung prüfen können: Was möchten Sie damit zuerst verbessern? Gerne klären wir das in [vereinbarter nächster Schritt].\n\n2. Nach dem Gespräch\nWir haben [Ziel] besprochen. Unser nächster Schritt ist [Aufgabe] bis [Datum]. Passt diese Zusammenfassung für Sie?\n\n3. Zum vereinbarten Nachfassdatum\nWir hatten vereinbart, uns wegen [offener Punkt] nochmals auszutauschen. Welche Frage ist für Ihre Entscheidung noch offen?\n\nZeitpunkte mit dem Kontakt vereinbaren. Ablehnung und Abmeldung respektieren. Keine automatische Kontaktfolge ohne passende Grundlage.",
  },
  admin: {
    focus: "Eine Routine sauber abgrenzen",
    action:
      "Beobachten Sie einen häufigen Vorgang. Notieren Sie Auslöser, Eingaben, nötige Entscheidung und Ergebnis. Wählen Sie den ersten Schritt mit klaren Regeln und einer menschlichen Übernahme.",
    measure:
      "Bearbeitungsminuten pro Vorgang und notwendige Korrekturen bei vergleichbaren Fällen.",
    template:
      "PROZESSVORLAGE\nAuslöser:\nHäufigkeit pro Woche:\nBearbeitungszeit heute:\nEingaben und Quelle:\nErforderliche Entscheidung:\nVerantwortliche Person:\nGewünschtes Ergebnis und Zielsystem:\nFehlerfall und menschliche Übernahme:\nMessung nach dem Test:\n\nMEETING ZU AUFGABEN\nEntscheidung | Aufgabe | Verantwortlich | Fällig am | Freigabe\nErst nach Prüfung in das vereinbarte Aufgabensystem übernehmen. Aufzeichnungen nur mit zulässiger Grundlage.",
  },
  onboarding: {
    focus: "Ein Kundenstart mit klaren Übergaben",
    action:
      "Verbinden Sie die Auftragsbestätigung mit einer Startcheckliste. Jede erforderliche Unterlage und Aufgabe erhält einen Verantwortlichen und ein Fälligkeitsdatum.",
    measure:
      "Zeit vom Auftrag bis zum vollständigen Start und Anzahl fehlender Angaben.",
    template: `KUNDENSTART-CHECKLISTE\n[ ] Auftrag, Umfang und Zusagen bestätigt\n[ ] Übergabe von Verkauf an Umsetzung\n[ ] Ansprechpartner und Kommunikationsweg festgelegt\n[ ] Kick-off vereinbart\n[ ] Benötigte Unterlagen vollständig\n[ ] Zugänge rollenbasiert und sicher bereitgestellt\n[ ] Ausgangslage und Erfolgskriterien festgehalten\n[ ] Erster Arbeitsschritt abgestimmt\n[ ] Erster Ergebnis- und Feedbacktermin vereinbart\n\nJe Zeile ergänzen: Verantwortlich | Fällig am | Erledigt am. Keine Zugangsdaten in dieser Checkliste speichern.\n\nAusfüllbare Vorlage für Projektstart, Abnahme und Betrieb:\nhttps://agenticit.ch${projectStartResource.href}`,
  },
  phone: {
    focus: "Erreichbarkeit mit verlässlicher Übergabe",
    action:
      "Erfassen Sie die häufigsten Anrufgründe. Definieren Sie, was direkt beantwortet werden kann, wer zuständig ist und wann zwingend ein Mensch übernimmt.",
    measure:
      "Nicht bearbeitete Anliegen, korrekte Weiterleitungen und tatsächlich bestätigte Termine.",
    template:
      "EMPFANGSLEITFADEN\nBegrüssung bei KI-Einsatz: Guten Tag, ich bin der KI-Assistent von [Firma]. Wobei kann ich Ihnen helfen?\n\n1. Anliegen in einem Satz bestätigen.\n2. Nur dafür nötige Angaben erfragen.\n3. Aus freigegebenem Wissen antworten oder eine zuständige Person anbieten.\n4. Termine nur mit bestätigter Verfügbarkeit zusagen.\n5. Bei Unsicherheit oder Wunsch nach einem Menschen übergeben.\n6. Vereinbarten nächsten Schritt bestätigen.\n\nZu definieren: Anrufgrund | erlaubte Antwort | zuständige Person | Rückrufweg. Keine erfundenen Auskünfte und keine unbestätigten Buchungen.",
  },
  retention: {
    focus: "Betreuung nach Anlass",
    action:
      "Halten Sie für aktive Kunden fest, welcher Betreuungsanlass als Nächstes relevant ist. Bestätigte Bedürfnisse werden persönlich geprüft, bevor daraus ein Angebot wird.",
    measure:
      "Erledigte Betreuungsanlässe, offene Anliegen und bestätigte zusätzliche Bedürfnisse.",
    template:
      "BETREUUNGSPLAN\nKunde / Verantwortlich / letzter Kontakt / nächster vereinbarter Anlass / offenes Anliegen / erlaubter Kontaktweg\n\nGeeignete Anlässe:\n- Erster Ergebnischeck nach dem Start\n- Vereinbarte Leistungsbesprechung\n- Bestätigte Änderung im Bedarf\n- Rückfrage zu einem offenen Anliegen\n\nVor Reaktivierung prüfen: Kontakterlaubnis, Ablehnung und Abmeldung, tatsächlicher Anlass. Zusatzbedarf im Gespräch bestätigen; Angebote vor Versand menschlich freigeben.",
  },
  partnership: {
    focus: "Ein Plan. Ein Ansprechpartner. Klare Übergaben.",
    action:
      "Bringen Sie Website, CRM, Marketing, Telefonie und Support in eine gemeinsame Übersicht. Halten Sie Zuständigkeiten und Abhängigkeiten fest. Bestimmen Sie eine Person, die den Gesamtplan mit Ihrem Team koordiniert.",
    measure:
      "Abstimmungszeit, ungeklärte Zuständigkeiten und erledigte Meilensteine im vereinbarten Fahrplan.",
    template:
      "IHR DIGITALISIERUNGS-FAHRPLAN\n\nBESTAND AUFNEHMEN\nBereich | System / Partner | Verantwortlich | laufende Kosten | nächste Entscheidung\nWebsite und Inhalte | | | |\nCRM und Kundendaten | | | |\nMarketing und Kampagnen | | | |\nTelefonie und Internet | | | |\nSupport und Betrieb | | | |\n\nZUSAMMENARBEIT KLÄREN\nGesamtverantwortliche Person:\nGemeinsamer Ort für Aufgaben und Status:\nWer gibt Inhalte und Änderungen frei?\nWer übernimmt bei Störungen?\n\nSCHRITTE PRIORISIEREN\nHerausforderung | Nutzen | Abhängigkeiten | Zuständig | Termin | Abnahme\n1.\n2.\n3.\n\nMit einem abgegrenzten Vorhaben beginnen. Bestehende Verträge, Zugänge und Schnittstellen vor einer Umstellung prüfen. Keine Passwörter in dieser Übersicht speichern.",
  },
}

export function buildJourneyPlan(answers: JourneyAnswers) {
  const challenge = challenges.find((item) => item.id === answers.challenge)!
  const playbook = playbooks[answers.challenge]
  const intake =
    answers.channel === "web"
      ? "Prüfen Sie eine Anfrage von Ihrem Formular bis zur zuständigen Person. Eingang, Rückmeldung und nächster Schritt müssen zusammenpassen."
      : answers.channel === "phone"
        ? "Erfassen Sie Anliegen aus Telefon und E-Mail nach derselben kurzen Vorlage: Bedarf, zuständige Person und nächster Schritt."
        : "Ein gemeinsamer Eingang: Führen Sie Anfragen aus den gewählten Kanälen mit Zuständigkeit und nächstem Schritt zusammen."
  const system =
    answers.system === "manual"
      ? "Beginnen Sie mit einer gemeinsamen, klaren Liste. Definieren Sie Pflichtangaben und Zuständigkeit, bevor Sie weitere Systeme verbinden."
      : answers.system === "crm"
        ? "Nutzen Sie Ihr CRM als gemeinsame Sicht. Prüfen Sie zuerst genau eine manuelle Übergabe und testen Sie auch den Fehlerfall."
        : "Ihre Systeme sind bereits verbunden. Prüfen Sie eine bestehende Übergabe auf doppelte Einträge, fehlende Angaben und menschliche Übernahme."
  const partnershipIntake = {
    web: "Beginnen Sie bei Website und Formularen: Wer betreut Inhalte und Technik, wohin gehen Anfragen und wer übernimmt sie im CRM?",
    phone:
      "Gehen Sie einen Kontakt über Telefon und E-Mail durch: Welche Anbieter, Postfächer und Systeme sind beteiligt, wer pflegt sie und wo entsteht Abstimmungsaufwand?",
    mixed:
      "Ein gemeinsamer Eingang ist nur der Anfang: Erfassen Sie, welche Partner und Systeme an Website, CRM, Marketing, Telefonie und Support beteiligt sind.",
  }
  const steps = [
    answers.challenge === "partnership"
      ? partnershipIntake[answers.channel]
      : intake,
    playbook.action,
    answers.challenge === "partnership"
      ? `${system} Dokumentieren Sie den Gesamtstatus, die nächste Entscheidung und die Abnahme an einem gemeinsamen Ort.`
      : system,
  ]
  const download = [
    "AGENTICIT · IHR KUNDENREISE-PLAN",
    "",
    challenge.magnet,
    `Ihr Ziel: ${challenge.label}`,
    `Eingang: ${channelLabels[answers.channel]}`,
    `Arbeitsweise: ${systemLabels[answers.system]}`,
    "",
    ...steps.map((step, index) => `${index + 1}. ${step}`),
    "",
    "Daran erkennen Sie eine Verbesserung:",
    playbook.measure,
    "",
    playbook.template,
    "",
    "Selbsteinschätzung auf Basis Ihrer Antworten. Kein Systemaudit und keine Ergebnisgarantie.",
    "Die passenden Services für Ihr Unternehmen besprechen wir gemeinsam. https://agenticit.ch/kundenreise-check",
  ].join("\n")
  return {
    title: challenge.magnet,
    focus: playbook.focus,
    steps,
    measure: playbook.measure,
    template: playbook.template,
    packageId: challenge.packageId,
    download,
  }
}

export function calculateTimePotential(
  weeklyCases: number,
  currentMinutes: number,
  futureMinutes: number,
) {
  if (
    ![weeklyCases, currentMinutes, futureMinutes].every(Number.isFinite) ||
    !Number.isInteger(weeklyCases) ||
    weeklyCases < 0 ||
    weeklyCases > 100000 ||
    currentMinutes < 0 ||
    futureMinutes < 0 ||
    futureMinutes > currentMinutes ||
    currentMinutes > 10080
  )
    return null
  return {
    currentHours: (weeklyCases * currentMinutes) / 60,
    futureHours: (weeklyCases * futureMinutes) / 60,
    freedHours: (weeklyCases * (currentMinutes - futureMinutes)) / 60,
  }
}
