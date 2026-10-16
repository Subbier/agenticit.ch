import { z } from "zod"

const statusSchema = z.enum(["ready", "partial", "open", "unknown"])
export const inquirySchema = z
  .object({
    version: z.literal(1),
    answers: z
      .object({
        intake: statusSchema,
        owner: statusSchema,
        response: statusSchema,
        followup: statusSchema,
        outcome: statusSchema,
      })
      .strict(),
  })
  .strict()
export type InquiryInput = z.infer<typeof inquirySchema>
type QuestionId = keyof InquiryInput["answers"]
type Status = InquiryInput["answers"][QuestionId]
export const inquiryStatusLabels: Record<Status, string> = {
  ready: "Steht bereits",
  partial: "Teilweise umgesetzt",
  open: "Noch offen",
  unknown: "Noch zu klären",
}

export const inquiryQuestions: readonly {
  id: QuestionId
  label: string
  question: string
  hint: string
  ready: string
}[] = [
  {
    id: "intake",
    label: "Eingang & Überblick",
    question: "Können Sie jede neue Anfrage wiederfinden?",
    hint: "Ob Formular, Telefon oder E-Mail: Das Anliegen kommt mit Quelle und Eingangszeit am vereinbarten Ort an. Fehlgeschlagene Übergaben werden sichtbar.",
    ready: "Eingang und Übergabe sind geprüft",
  },
  {
    id: "owner",
    label: "Zuständigkeit & Vertretung",
    question: "Ist bei jeder Anfrage klar, wer übernimmt?",
    hint: "Eine verantwortliche Person und eine Vertretung sind festgelegt. Das Team sieht auch Anfragen, die noch niemand übernommen hat.",
    ready: "Person und Vertretung sind festgelegt",
  },
  {
    id: "response",
    label: "Erste Reaktion",
    question: "Hat Ihr Team eine verlässliche Reaktionszeit vereinbart?",
    hint: "Die Zielzeit passt zu Arbeitszeiten und Kapazität. Sie unterscheiden eine automatische Eingangsbestätigung von der persönlichen Bearbeitung.",
    ready: "Reaktionszeit und Bearbeitung sind geklärt",
  },
  {
    id: "followup",
    label: "Nächster Schritt",
    question:
      "Bleibt nach einem Gespräch oder einer Offerte klar, wie es weitergeht?",
    hint: "Anlass, verantwortliche Person und vereinbarter Zeitpunkt stehen im CRM. Ablehnungen und Abmeldungen werden berücksichtigt.",
    ready: "Nächste Schritte werden festgehalten",
  },
  {
    id: "outcome",
    label: "Ergebnis & Lernen",
    question:
      "Können Sie Anfragen, passende Gespräche und Aufträge unterscheiden?",
    hint: "Ihr Team verwendet gemeinsame Kriterien. Auch Absagen und ihre Gründe helfen, Angebot und Bearbeitung zu verbessern.",
    ready: "Ergebnisse und Kriterien sind nachvollziehbar",
  },
]

const actions: Record<
  QuestionId,
  { title: string; action: string; done: string; owner: string; verify: string }
> = {
  intake: {
    title: "Den Eingang je Anfragequelle belegen",
    action:
      "Prüfen Sie mit einem freigegebenen Beispiel je Quelle, wo das Anliegen ankommt. Vergleichen Sie Eingang und Zielsystem und nehmen Sie einen fehlgeschlagenen Übergabefall dazu.",
    done: "Die Anfrage kommt genau einmal mit Quelle und Eingangszeit an. Eine fehlgeschlagene Übergabe wird für eine verantwortliche Person sichtbar.",
    owner: "Marketing mit CRM- oder Website-Verantwortlichen",
    verify:
      "Klären Sie mit Marketing und Technik, welche Anfragequellen es gibt und wo der Eingang nachgewiesen ist. Lassen Sie sich einen freigegebenen Beispielvorgang zeigen.",
  },
  owner: {
    title: "Verantwortung und Vertretung festlegen",
    action:
      "Vereinbaren Sie, wer neue Anfragen übernimmt, wer vertritt und wer die noch nicht zugeordneten Fälle prüft. Machen Sie diese Zuordnung am Vorgang sichtbar.",
    done: "Das Team kann für einen Beispielvorgang die zuständige Person, ihre Vertretung und den Umgang mit offenen Zuordnungen benennen.",
    owner: "Vertriebsleitung mit dem bearbeitenden Team",
    verify:
      "Klären Sie mit der Vertriebsleitung, wie Anfragen verteilt werden und wer bei Abwesenheit übernimmt. Prüfen Sie die Regel an einem freigegebenen Vorgang.",
  },
  response: {
    title: "Eine realistische Reaktionszeit vereinbaren",
    action:
      "Legen Sie eine Zielzeit für die erste persönliche Bearbeitung innerhalb Ihrer Arbeitszeiten fest. Prüfen Sie an einem freigegebenen Vorgang, ob die Zeitpunkte nachvollziehbar sind und wie verspätete Fälle auffallen.",
    done: "Zielzeit, Arbeitszeiten und verantwortliche Person sind vereinbart. Eingangsbestätigung und tatsächliche Bearbeitung werden getrennt erfasst.",
    owner: "Vertriebsleitung mit Team und CRM-Verantwortlichen",
    verify:
      "Fragen Sie das Team nach der vereinbarten Zielzeit und ihrem Nachweis. Eine automatische Bestätigung allein belegt noch keine persönliche Bearbeitung.",
  },
  followup: {
    title: "Den nächsten Kontakt konkret vereinbaren",
    action:
      "Halten Sie nach Gespräch oder Offerte fest, welcher Punkt offen ist, wer übernimmt und wann der nächste Kontakt vereinbart ist. Berücksichtigen Sie Absagen und Abmeldungen; ausgehende Sales-Nachrichten brauchen eine menschliche Freigabe.",
    done: "Ein offener Vorgang hat Anlass, Verantwortliche und nächsten Zeitpunkt. Abgelehnte Kontakte werden nicht in eine weitere Kontaktfolge übernommen.",
    owner: "Vertrieb mit den Kundenverantwortlichen",
    verify:
      "Prüfen Sie mit dem Vertrieb einen freigegebenen offenen Vorgang: Sind Anlass, Vereinbarung, Zuständigkeit und Freigabe des nächsten Kontakts nachvollziehbar?",
  },
  outcome: {
    title: "Anfragen und Kundenergebnisse getrennt festhalten",
    action:
      "Definieren Sie gemeinsam, wann eine Anfrage passend ist, wann ein Gespräch stattgefunden hat und wann ein Auftrag vorliegt. Halten Sie Absagen und Gründe nach einem einheitlichen Schema fest.",
    done: "Das Team wendet dieselben Kriterien an. Anfrageeingang, qualifizierter Kontakt, Gespräch und Auftrag lassen sich anhand tatsächlicher Vorgänge unterscheiden.",
    owner: "Marketing und Vertrieb gemeinsam",
    verify:
      "Klären Sie mit Marketing und Vertrieb, welche Status und Kriterien gelten und wer sie pflegt. Prüfen Sie einen freigegebenen Fall bis zu seinem tatsächlichen Ergebnis.",
  },
}

export function buildInquiryResult(input: unknown) {
  const parsed = inquirySchema.safeParse(input)
  if (!parsed.success) return null
  const statuses = inquiryQuestions.map((question) => ({
    ...question,
    status: parsed.data.answers[question.id],
  }))
  const relevant = statuses.filter((question) => question.status !== "ready")
  const ordered = [
    ...relevant.filter((question) => question.status !== "unknown"),
    ...relevant.filter((question) => question.status === "unknown"),
  ]
  const outstanding = ordered.map((question) => {
    const action = actions[question.id]
    return question.status === "unknown"
      ? {
          id: question.id as string,
          title: `Stand zu «${question.label}» klären`,
          action: action.verify,
          done: "Der aktuelle Stand ist mit der zuständigen Person und einem Nachweis geklärt. Erst danach entscheiden, ob eine Änderung nötig ist.",
          owner: action.owner,
        }
      : { id: question.id as string, ...action }
  })
  const testStep = {
    id: "test",
    title: "Einen Anfrageweg gemeinsam bis zum Ergebnis prüfen",
    action:
      "Verfolgen Sie einen freigegebenen Beispielvorgang vom Eingang über die zuständige Person und den nächsten Schritt bis zum tatsächlichen Ergebnis. Prüfen Sie auch Vertretung und fehlgeschlagene Übergaben.",
    done: "Eingang, Verantwortung, Reaktionszeit, Vereinbarung und Ergebnis sind nachvollziehbar. Der Fehlerfall hat eine sichtbare menschliche Übernahme.",
    owner: "Marketing, Vertrieb und CRM-Verantwortliche gemeinsam",
  }
  return {
    input: parsed.data,
    title: outstanding.length
      ? "Hier setzen Sie als Nächstes an."
      : "Ablauf steht. Jetzt gemeinsam belegen.",
    summary: outstanding.length
      ? "Das sind Ansatzpunkte aus Ihren Angaben, keine gemessenen Verlustfälle. Zuerst kommen bekannte Lücken im Ablauf, danach noch ungeklärte Punkte."
      : "Nach Ihren Angaben stehen die fünf Grundlagen. Ein gemeinsamer Blick auf einen freigegebenen Vorgang zeigt, wie sie im Alltag zusammenspielen.",
    statuses,
    outstanding,
    priorities: outstanding.length ? outstanding.slice(0, 3) : [testStep],
  }
}

export function buildInquiryPlan(input: unknown) {
  const result = buildInquiryResult(input)
  if (!result) return null
  const steps = result.outstanding.length
    ? result.outstanding
    : result.priorities
  return [
    "AGENTICIT · IHR PLAN FÜR DIE ANFRAGEBEARBEITUNG",
    "Grundlage: Ihre Selbsteinschätzung. Ansatzpunkte, keine gemessenen Verlustfälle. Kein Zugriff auf Ihre Systeme, keine Verlustquote und keine Umsatzprognose.",
    "",
    "IHRE FÜNF ANGABEN",
    ...result.statuses.map(
      (question) =>
        `${question.label}: ${inquiryStatusLabels[question.status]}`,
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
    "Beispielvorgänge und Änderungen vorab freigeben. Der Check startet keine Anrufe oder Nachrichten. Für eine Umsetzung Umfang, Kosten und Freigaben separat vereinbaren.",
    "https://agenticit.ch/anfragen-check",
  ].join("\n")
}
