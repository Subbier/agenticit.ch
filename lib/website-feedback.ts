export const FEEDBACK_VERSION = 1
export const FEEDBACK_SESSION_KEY = "agenticit-website-feedback-v1"
export const FEEDBACK_OPEN_EVENT = "agenticit:open-website-feedback"
export const FEEDBACK_DELAY_MS = 10_000

export const feedbackQuestions = [
  {
    id: "clarity",
    title: "Ist klar, was wir für Ihr Unternehmen tun?",
    options: [
      { value: "clear", label: "Ja, auf Anhieb" },
      { value: "mostly", label: "Grösstenteils" },
      { value: "unclear", label: "Noch nicht klar genug" },
      { value: "unknown", label: "Kann ich noch nicht beurteilen" },
    ],
  },
  {
    id: "navigation",
    title: "Wie leicht finden Sie, was Sie suchen?",
    options: [
      { value: "easy", label: "Leicht" },
      { value: "mixed", label: "Teils, teils" },
      { value: "difficult", label: "Schwierig" },
      { value: "unknown", label: "Noch nicht ausprobiert" },
    ],
  },
  {
    id: "design",
    title: "Wie gefällt Ihnen die Gestaltung?",
    options: [
      { value: "very-good", label: "Sehr gut" },
      { value: "good", label: "Gut" },
      { value: "mixed", label: "Teils, teils" },
      { value: "poor", label: "Weniger gut" },
      { value: "very-poor", label: "Gar nicht" },
    ],
  },
  {
    id: "missing",
    title: "Was fehlt Ihnen am ehesten?",
    options: [
      { value: "examples", label: "Konkrete Praxisbeispiele" },
      { value: "services", label: "Mehr zu Leistungen und Ablauf" },
      { value: "pricing", label: "Informationen zu Kosten" },
      { value: "contact", label: "Ein einfacherer Weg zum Kontakt" },
      { value: "nothing", label: "Mir fehlt gerade nichts" },
    ],
  },
  {
    id: "overall",
    title: "Wie ist Ihr Gesamteindruck?",
    options: [
      { value: "1", label: "1 – Schwach" },
      { value: "2", label: "2 – Ausbaufähig" },
      { value: "3", label: "3 – Okay" },
      { value: "4", label: "4 – Gut" },
      { value: "5", label: "5 – Sehr gut" },
    ],
  },
] as const

export type FeedbackQuestionId = (typeof feedbackQuestions)[number]["id"]
export type FeedbackAnswers = Record<FeedbackQuestionId, string>

export function isFeedbackAnswer(id: FeedbackQuestionId, value: unknown) {
  return (
    feedbackQuestions
      .find((question) => question.id === id)
      ?.options.some((option) => option.value === value) === true
  )
}

export function canOfferFeedback(context: {
  elapsedMs: number
  alreadyOffered: boolean
  visible: boolean
  blocked: boolean
  pathname: string
}) {
  return (
    context.elapsedMs >= FEEDBACK_DELAY_MS &&
    !context.alreadyOffered &&
    context.visible &&
    !context.blocked &&
    context.pathname === "/"
  )
}

export function feedbackMailText(answers: FeedbackAnswers, receiptId: string) {
  return [
    "Neue Rückmeldung zur AgenticIT-Webseite",
    `Referenz: ${receiptId}`,
    "",
    ...feedbackQuestions.flatMap((question, index) => [
      `${index + 1}. ${question.title}`,
      question.options.find((option) => option.value === answers[question.id])
        ?.label ?? "–",
      "",
    ]),
    "Freiwillige Website-Umfrage. Keine Namen, Kontaktdaten oder Formularinhalte erhoben.",
  ].join("\n")
}
