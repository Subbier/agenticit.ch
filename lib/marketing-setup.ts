import { z } from "zod"

const statusSchema = z.enum(["ready", "partial", "open", "unknown"])
export const marketingSetupSchema = z
  .object({
    version: z.literal(1),
    answers: z
      .object({
        offer: statusSchema,
        website: statusSchema,
        accounts: z.enum([
          "ready",
          "partial",
          "open",
          "unknown",
          "not-planned",
        ]),
        measurement: statusSchema,
        handoff: statusSchema,
      })
      .strict(),
  })
  .strict()

export type MarketingSetupInput = z.infer<typeof marketingSetupSchema>
export type MarketingSetupAnswers = MarketingSetupInput["answers"]
type QuestionId = keyof MarketingSetupAnswers
export type MarketingSetupStatus = MarketingSetupAnswers[QuestionId]

export const marketingStatusLabels: Record<MarketingSetupStatus, string> = {
  ready: "Steht bereits",
  partial: "Teilweise vorbereitet",
  open: "Noch offen",
  unknown: "Noch zu klären",
  "not-planned": "Vorerst nicht geplant",
}

export const marketingSetupQuestions: readonly {
  id: QuestionId
  label: string
  question: string
  hint: string
  ready: string
}[] = [
  {
    id: "offer",
    label: "Zielgruppe & Angebot",
    question: "Ist klar, wen Sie mit welchem Angebot erreichen möchten?",
    hint: "Eine konkrete Zielgruppe, ihr Anliegen und ein Angebot, dessen Nutzen sich einfach erklären lässt.",
    ready: "Zielgruppe und Angebot sind klar",
  },
  {
    id: "website",
    label: "Auftritt & Anfrageweg",
    question: "Führt Ihr Auftritt zu einem klaren nächsten Schritt?",
    hint: "Besucher verstehen Ihr Angebot und können auch auf dem Handy einfach anfragen. Der Eingang und die Bestätigung wurden geprüft.",
    ready: "Auftritt und Anfrageweg sind geprüft",
  },
  {
    id: "accounts",
    label: "Werbekonten & Zuständigkeit",
    question: "Sind Sie für geplante Werbekampagnen vorbereitet?",
    hint: "Die passenden Konten, Zugänge, Budgetverantwortung und Freigaben stehen. Sie können auch vorerst ohne bezahlte Werbung starten.",
    ready: "Konten, Zugänge und Freigaben stehen",
  },
  {
    id: "measurement",
    label: "Messung & Einwilligung",
    question: "Können Sie passende Anfragen nachvollziehbar auswerten?",
    hint: "Sie unterscheiden Anfragen, passende Kontakte und Termine. Optionale Analyse- und Werbedienste beachten die gewählte Einwilligung.",
    ready: "Ergebnisse und Einwilligung sind geprüft",
  },
  {
    id: "handoff",
    label: "Übergabe ans Team",
    question: "Weiss Ihr Team, was nach einer Anfrage passiert?",
    hint: "Eine Person übernimmt. Anliegen und Quelle kommen mit. Reaktionszeit, Vertretung und nächster Schritt sind vereinbart.",
    ready: "Zuständigkeit und Übergabe stehen",
  },
]

const actions: Record<
  QuestionId,
  { title: string; action: string; done: string; owner: string; verify: string }
> = {
  offer: {
    title: "Ein Angebot für eine konkrete Zielgruppe schärfen",
    action:
      "Halten Sie fest: Wem helfen wir bei welchem Anliegen, was bieten wir dafür an und welcher nächste Schritt lohnt sich? Stimmen Sie diese drei Sätze mit dem Vertrieb ab.",
    done: "Zielgruppe, Anliegen, Angebot und nächster Schritt stehen auf einer Seite. Marketing und Vertrieb beschreiben denselben Nutzen.",
    owner: "Geschäftsleitung mit Marketing und Vertrieb",
    verify:
      "Klären Sie mit Marketing und Vertrieb, ob ein abgestimmtes Angebotsblatt existiert. Prüfen Sie, ob es noch zur Zielgruppe passt.",
  },
  website: {
    title: "Den Weg vom ersten Blick bis zur Anfrage prüfen",
    action:
      "Gehen Sie eine passende Zielseite auf dem Handy durch: Angebot verstehen, Anfrage ausfüllen, Bestätigung sehen und den Eingang beim Team prüfen. Halten Sie Reibung und fehlende Angaben fest.",
    done: "Eine freigegebene Testanfrage kommt genau einmal mit dem nötigen Kontext an. Der Besucher erhält eine verständliche Bestätigung.",
    owner: "Marketing mit Website-Verantwortlichen",
    verify:
      "Klären Sie mit den Website-Verantwortlichen, wann Anfrageweg, Bestätigung und Eingang zuletzt auf einem Handy geprüft wurden. Lassen Sie sich den Nachweis zeigen.",
  },
  accounts: {
    title: "Zugänge und Freigaben für den Kampagnenstart ordnen",
    action:
      "Notieren Sie je geplantem Werbekanal Konto, Eigentümer, benötigte Rollen und Budgetverantwortung. Klären Sie die Freigabe für Inhalte und Ausgaben, bevor eine Kampagne startet.",
    done: "Die zuständigen Personen haben den passenden Zugriff. Budget, Inhalte und Start sind ausdrücklich freigegeben.",
    owner: "Marketing mit Konto- und Budgetverantwortlichen",
    verify:
      "Prüfen Sie mit den Kontoverantwortlichen, welche Konten zum Unternehmen gehören, wer Zugriff hat und wer Inhalte sowie Ausgaben freigibt. Zugangsdaten gehören nicht in die Übersicht.",
  },
  measurement: {
    title: "Die wichtigen Ergebnisse sauber auseinanderhalten",
    action:
      "Definieren Sie, was als Anfrage, passender Kontakt und Termin zählt. Prüfen Sie die Erfassung mit einem freigegebenen Test sowie das Verhalten optionaler Dienste vor und nach der Cookie-Auswahl.",
    done: "Die vereinbarten Ereignisse werden nachvollziehbar und ohne Doppelzählung erfasst. Optionale Dienste passen zur gewählten Einwilligung.",
    owner: "Marketing mit Technik und Datenschutz-Verantwortlichen",
    verify:
      "Klären Sie mit Marketing und Technik, welche Ereignisse tatsächlich gemessen werden und wie die Einwilligung berücksichtigt wird. Lassen Sie sich einen aktuellen Test zeigen.",
  },
  handoff: {
    title: "Jeder Anfrage eine zuständige Person geben",
    action:
      "Vereinbaren Sie Zuständigkeit, Vertretung und eine realistische Reaktionszeit. Legen Sie im CRM fest, welche Angaben mitkommen und wie der nächste Schritt für das Team sichtbar wird.",
    done: "Eine freigegebene Testanfrage landet genau einmal bei der zuständigen Person. Anliegen, Quelle und nächster Schritt sind sichtbar.",
    owner: "Vertriebsleitung mit CRM-Verantwortlichen",
    verify:
      "Klären Sie mit dem Vertrieb, wer neue Anfragen übernimmt, wie die Vertretung funktioniert und wo der nächste Schritt dokumentiert wird. Prüfen Sie einen freigegebenen Beispielvorgang.",
  },
}

export type MarketingSetupStep = {
  id: QuestionId | "test"
  title: string
  action: string
  done: string
  owner: string
}

export function buildMarketingSetupResult(input: unknown) {
  const parsed = marketingSetupSchema.safeParse(input)
  if (!parsed.success) return null
  const { answers } = parsed.data
  const statuses = marketingSetupQuestions.map((question) => ({
    ...question,
    status: answers[question.id],
  }))
  const outstanding: MarketingSetupStep[] = statuses
    .filter(
      (question) =>
        question.status !== "ready" && question.status !== "not-planned",
    )
    .map((question) => {
      const item = actions[question.id]
      return question.status === "unknown"
        ? {
            id: question.id,
            title: `Stand zu «${question.label}» klären`,
            action: item.verify,
            done: "Der aktuelle Stand ist mit der zuständigen Person geklärt und ein Nachweis liegt vor. Erst danach entscheiden, ob etwas angepasst werden muss.",
            owner: item.owner,
          }
        : { id: question.id, ...item }
    })
  const testStep: MarketingSetupStep = {
    id: "test",
    title: "Den ganzen Anfrageweg einmal gemeinsam durchspielen",
    action:
      "Lassen Sie eine freigegebene Testperson vom gewählten Einstieg bis zur Übergabe ans Team gehen. Prüfen Sie auch einen Fehlerfall. Dokumentieren Sie erst dann, was wirklich funktioniert.",
    done: "Die Anfrage kommt genau einmal an, die vereinbarten Ereignisse stimmen und das Team kann den nächsten Schritt übernehmen.",
    owner: "Marketing, Vertrieb und Technik gemeinsam",
  }
  return {
    input: parsed.data,
    title: outstanding.length
      ? "Ihr nächster sinnvoller Schritt."
      : "Grundlagen stehen. Jetzt den Ablauf prüfen.",
    summary: outstanding.length
      ? "Nach Ihren Angaben gibt es noch offene oder ungeklärte Punkte. Beginnen Sie mit den Grundlagen und arbeiten Sie die nächsten Schritte in dieser Reihenfolge ab."
      : "Nach Ihren Angaben stehen die für Sie geplanten Grundlagen. Ein gemeinsamer Ablauf-Test zeigt, ob sie auch zusammenspielen.",
    statuses,
    ready: statuses.filter((question) => question.status === "ready"),
    excluded: statuses.filter((question) => question.status === "not-planned"),
    outstanding,
    priorities: outstanding.length ? outstanding.slice(0, 3) : [testStep],
  }
}

export function buildMarketingSetupPlan(input: unknown) {
  const result = buildMarketingSetupResult(input)
  if (!result) return null
  const steps = result.outstanding.length
    ? result.outstanding
    : result.priorities
  return [
    "AGENTICIT · IHR MARKETING-SETUP-PLAN",
    "Grundlage: Ihre Selbsteinschätzung. Kein technischer Audit, keine Freigabe zum Kampagnenstart und keine Erfolgsprognose.",
    "",
    "IHRE FÜNF ANGABEN",
    ...result.statuses.map(
      (question) =>
        `${question.label}: ${marketingStatusLabels[question.status]}`,
    ),
    "",
    result.title,
    result.summary,
    ...steps.flatMap((step, index) => [
      "",
      `${index + 1}. ${step.title}`,
      step.action,
      `Zuständig: ${step.owner}`,
      `Abnahmekriterium: ${step.done}`,
      "Verantwortliche Person: __________________",
      "Prüftermin / Nachweis: __________________",
    ]),
    "",
    "Vor einem echten Start Umfang, Zuständigkeiten, Inhalte und allfällige Ausgaben gemeinsam freigeben. Keine automatischen Anrufe oder Nachrichten aus diesem Check.",
    "https://agenticit.ch/marketing-setup-check",
  ].join("\n")
}
