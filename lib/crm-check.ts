import { z } from "zod"

const statusSchema = z.enum(["ready", "partial", "open", "unknown"])
export const crmSchema = z
  .object({
    version: z.literal(1),
    answers: z
      .object({
        fields: statusSchema,
        transfer: statusSchema,
        duplicates: statusSchema,
        ownership: statusSchema,
        recovery: statusSchema,
      })
      .strict(),
  })
  .strict()

export type CrmInput = z.infer<typeof crmSchema>
type QuestionId = keyof CrmInput["answers"]
type Status = CrmInput["answers"][QuestionId]
export const crmStatusLabels: Record<Status, string> = {
  ready: "Steht bereits",
  partial: "Teilweise umgesetzt",
  open: "Noch offen",
  unknown: "Noch zu klären",
}

export const crmQuestions: readonly {
  id: QuestionId
  label: string
  question: string
  hint: string
  ready: string
}[] = [
  {
    id: "fields",
    label: "Angaben & Datenquelle",
    question: "Ist klar, welche Angaben Ihr CRM wirklich braucht?",
    hint: "Für einen ausgewählten Ablauf sind die nötigen Felder und ihre Quelle festgelegt. Ihr Team weiss auch, welches System bei abweichenden Angaben massgebend ist.",
    ready: "Felder und massgebende Quelle sind geklärt",
  },
  {
    id: "transfer",
    label: "Erfassung & Übergabe",
    question: "Kommen Angaben ohne erneutes Abtippen am richtigen Ort an?",
    hint: "Zum Beispiel vom Formular oder Gespräch ins CRM: Die benötigten Angaben werden übernommen, dem richtigen Vorgang zugeordnet und im Ziel geprüft.",
    ready: "Übernahme und Zuordnung sind geprüft",
  },
  {
    id: "duplicates",
    label: "Doppelte Übergaben",
    question: "Erkennt Ihr Ablauf, wenn dieselbe Übergabe nochmals ankommt?",
    hint: "Eine technische Wiederholung soll keinen zweiten Vorgang auslösen. Ein neues Anliegen derselben Person muss dagegen erhalten bleiben.",
    ready: "Wiederholung und neues Anliegen sind geprüft",
  },
  {
    id: "ownership",
    label: "Übernahme im Team",
    question: "Kann Ihr Team den Vorgang ohne Suchen übernehmen?",
    hint: "Zuständige Person, Vertretung, Anliegen und nächster Schritt sind sichtbar. Die beteiligten Rollen haben die dafür nötigen Zugriffsrechte.",
    ready: "Übernahme und Rollen sind geklärt",
  },
  {
    id: "recovery",
    label: "Fehler & Wiederaufnahme",
    question: "Wird eine fehlgeschlagene Übergabe zuverlässig bemerkt?",
    hint: "Eine verantwortliche Person sieht den Fehler und kann den Vorgang nachvollziehbar weiterführen. Eine Versandbestätigung allein belegt noch keinen Eingang im CRM.",
    ready: "Fehlermeldung und Übernahme sind geprüft",
  },
]

const actions: Record<
  QuestionId,
  { title: string; action: string; done: string; owner: string; verify: string }
> = {
  fields: {
    title: "Benötigte Angaben und ihre Quelle festlegen",
    action:
      "Wählen Sie einen Ablauf und notieren Sie je benötigtem Feld Quelle, Ziel und Zweck. Legen Sie fest, welches System bei Änderungen massgebend ist. Erfassen Sie nur Angaben, die der Ablauf braucht.",
    done: "Ihr Team kann jedes benötigte Feld seiner Quelle und seinem CRM-Ziel zuordnen. Bei widersprüchlichen Werten ist klar, wer entscheidet und wo korrigiert wird.",
    owner: "Fachverantwortliche mit CRM-Verantwortlichen",
    verify:
      "Lassen Sie sich die Feldzuordnung für einen freigegebenen Beispielvorgang zeigen. Klären Sie mit dem Team, welches System die gültigen Angaben führt.",
  },
  transfer: {
    title: "Eine Übergabe vom Eingang bis ins CRM prüfen",
    action:
      "Verfolgen Sie einen freigegebenen Beispielvorgang von der Quelle ins vereinbarte CRM-Modul. Vergleichen Sie die benötigten Werte und ihre Zuordnung. Notieren Sie, welche Angaben heute nochmals von Hand erfasst werden.",
    done: "Quellvorgang und CRM-Eintrag sind einander zugeordnet. Die vereinbarten Angaben kommen vollständig und richtig an; verbleibende Handarbeit ist bekannt.",
    owner: "Bearbeitendes Team mit CRM- oder Integrationsverantwortlichen",
    verify:
      "Prüfen Sie gemeinsam einen vorhandenen Übergabenachweis. Eine Meldung im Formular oder im zwischengeschalteten Tool reicht allein nicht als CRM-Nachweis.",
  },
  duplicates: {
    title: "Kontakt und Vorgang getrennt wiedererkennen",
    action:
      "Vereinbaren Sie, woran Kontakt und einzelner Vorgang erkannt werden. Prüfen Sie die erneute Zustellung derselben Übergabe und ein neues Anliegen derselben Person getrennt. Führen Sie Fälle erst nach fachlicher Prüfung zusammen.",
    done: "Die technische Wiederholung erzeugt keine zweite Bearbeitung. Ein neues Anliegen bleibt als eigener Vorgang nachvollziehbar; vorhandene Angaben werden nach einer festgelegten Regel aktualisiert.",
    owner: "CRM-Verantwortliche mit Fachteam und Integration",
    verify:
      "Fragen Sie nach der Regel für doppelte Zustellung und neue Anliegen vorhandener Kontakte. Lassen Sie beide Fälle mit freigegebenen Beispielen belegen.",
  },
  ownership: {
    title: "Die Übernahme am Vorgang sichtbar machen",
    action:
      "Halten Sie Zuständigkeit, Vertretung und nächste Aktion am CRM-Vorgang fest. Prüfen Sie mit den beteiligten Rollen, ob sie die benötigten Informationen sehen und ihre Arbeit dokumentieren können.",
    done: "Die übernehmende Person findet Anliegen, Kontext und nächsten Schritt ohne Rückfrage in verstreuten Listen. Vertretung und ungeklärte Zuständigkeiten haben eine vereinbarte Regel.",
    owner: "Teamleitung mit CRM-Verantwortlichen",
    verify:
      "Lassen Sie eine übernehmende Person oder Vertretung einen freigegebenen Vorgang erklären. Prüfen Sie die sichtbaren Angaben aus ihrer tatsächlichen Rolle.",
  },
  recovery: {
    title: "Einen Fehlerfall bis zur Übernahme prüfen",
    action:
      "Vereinbaren Sie einen freigegebenen Test für eine abgelehnte oder unterbrochene Übergabe. Prüfen Sie Fehlermeldung, verantwortliche Person und sichere Wiederaufnahme. Kontrollieren Sie vor erneutem Senden, ob der CRM-Eintrag bereits vorhanden ist.",
    done: "Der Fehler bleibt sichtbar, bis eine Person ihn übernommen hat. CRM-Eingang und Wiederaufnahme sind belegt; ein unbekannter Ausgang wird nicht vorschnell als Erfolg oder Fehlschlag behandelt.",
    owner: "Integration mit CRM-Verantwortlichen und Teamleitung",
    verify:
      "Klären Sie, wo fehlgeschlagene Übergaben auffallen, wer reagiert und wie ein unbekannter Ausgang geprüft wird. Lassen Sie sich einen freigegebenen Fehlernachweis zeigen.",
  },
}

export function buildCrmResult(input: unknown) {
  const parsed = crmSchema.safeParse(input)
  if (!parsed.success) return null
  const statuses = crmQuestions.map((q) => ({
    ...q,
    status: parsed.data.answers[q.id],
  }))
  const relevant = statuses.filter((q) => q.status !== "ready")
  const ordered = [
    ...relevant.filter((q) => q.status !== "unknown"),
    ...relevant.filter((q) => q.status === "unknown"),
  ]
  const outstanding = ordered.map((q) =>
    q.status === "unknown"
      ? {
          id: q.id as string,
          title: `Stand zu «${q.label}» klären`,
          action: actions[q.id].verify,
          done: "Der aktuelle Stand ist mit der zuständigen Person und einem Nachweis geklärt. Erst danach entscheiden, ob eine Änderung nötig ist.",
          owner: actions[q.id].owner,
        }
      : { id: q.id as string, ...actions[q.id] },
  )
  const testStep = {
    id: "test",
    title: "Den Ablauf gemeinsam belegen",
    action:
      "Prüfen Sie einen freigegebenen Vorgang mit Ihrem Team: vom Eingang über die Feldzuordnung und den CRM-Eintrag bis zur Übernahme. Nehmen Sie eine technische Wiederholung, ein neues Anliegen derselben Person und einen Fehlerfall dazu.",
    done: "Normalfall, erneute Zustellung, neues Anliegen und Fehlerfall sind nachvollziehbar geprüft. Zuständigkeit und Nachweis stehen im Ablaufplan.",
    owner: "Fachteam, CRM-Verantwortliche und Integration gemeinsam",
  }
  return {
    input: parsed.data,
    statuses,
    outstanding,
    priorities: outstanding.length ? outstanding.slice(0, 3) : [testStep],
    title: outstanding.length
      ? "So bringen Sie Ihren CRM-Ablauf weiter."
      : "Ablauf steht. Jetzt gemeinsam belegen.",
    summary: outstanding.length
      ? "Ihre Angaben zeigen diese nächsten Schritte. Der Plan zum Speichern enthält alle offenen Punkte und eine ausfüllbare Vorlage: Quelle → Datenprüfung → CRM-Vorgang → Teamübernahme."
      : "Nach Ihren Angaben stehen die fünf Grundlagen. Im Plan zum Speichern halten Sie Quelle, Feldzuordnung, Zuständigkeit und Prüfnachweise für einen konkreten Ablauf fest.",
  }
}

export function buildCrmPlan(input: unknown) {
  const result = buildCrmResult(input)
  if (!result) return null
  const steps = result.outstanding.length
    ? result.outstanding
    : result.priorities
  return [
    "AGENTICIT · IHR CRM-ABLAUFPLAN",
    "Grundlage: Ihre Selbsteinschätzung. Keine technische Prüfung, keine gemessenen Fehler oder Einsparungen. Kein Zugriff auf Ihre Systeme.",
    "",
    "IHRE FÜNF ANGABEN",
    ...result.statuses.map((q) => `${q.label}: ${crmStatusLabels[q.status]}`),
    "",
    "IHRE NÄCHSTEN SCHRITTE",
    ...steps.flatMap((step, i) => [
      "",
      `${i + 1}. ${step.title}`,
      step.action,
      `Zuständig: ${step.owner}`,
      `Abnahmekriterium: ${step.done}`,
      "Verantwortliche Person: __________________",
      "Prüftermin / Nachweis: __________________",
    ]),
    "",
    "IHR SOLLABLAUF ZUM AUSFÜLLEN",
    "Ablauf / gewünschtes Ergebnis: __________________",
    "1. QUELLE – Wo entsteht der Vorgang? __________________",
    "   Auslöser / Quellvorgang: __________________",
    "2. FELDZUORDNUNG – Welche Angaben werden wo gebraucht?",
    "   Je Feld: Name | Zweck | Quelle | Ziel-Feld | massgebendes System",
    "   ______________________________________________________________",
    "   ______________________________________________________________",
    "3. KONTAKT UND VORGANG – Woran werden sie getrennt erkannt?",
    "   Kontaktkennung: __________________",
    "   Vorgangskennung / Regel bei erneuter Zustellung: __________________",
    "   Neues Anliegen eines vorhandenen Kontakts: __________________",
    "4. ZIEL IM CRM – Wo wird gespeichert und wie der Eingang belegt?",
    "   Modul / Vorgang / Zuordnung: __________________",
    "   CRM-Nachweis / prüfende Person: __________________",
    "5. TEAMÜBERNAHME – Wer führt wie weiter?",
    "   Zuständig / Vertretung / nächste Aktion: __________________",
    "6. FEHLERFALL – Wie wird bemerkt, geprüft und wiederaufgenommen?",
    "   Meldung / Verantwortliche / Nachweis: __________________",
    "",
    "VIER PRÜFFÄLLE – VORHER FREIGEBEN",
    "[ ] Normalfall: Werte stimmen im richtigen CRM-Vorgang; Übernahme ist klar.",
    "[ ] Erneute Zustellung derselben Übergabe: keine zweite Bearbeitung.",
    "[ ] Ein neues Anliegen derselben Person: neuer Vorgang bleibt erhalten.",
    "[ ] Unterbrochene Übergabe: Ausgang prüfen, Fehler sichtbar übernehmen.",
    "Je Fall: Erwartung | tatsächliches Ergebnis | Nachweis | offene Korrektur",
    "______________________________________________________________",
    "",
    "Prüfungen und Änderungen vorab freigeben; keine echten Kundendaten in diese Vorlage eintragen. Ausgehende Sales-Nachrichten brauchen eine menschliche Freigabe. Der Check verändert kein CRM und startet keine Kontakte.",
    "https://agenticit.ch/crm-ablauf-check",
  ].join("\n")
}
