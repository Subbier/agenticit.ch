import { assertLeadAcknowledged } from "./lead-acknowledgement"

export const CALLBACK_GOALS = [
  "Mehr Anfragen",
  "Planbarer Umsatz",
  "Zeit gewinnen",
  "Weiss noch nicht",
] as const

export type CallbackFields = {
  firstName: string
  lastName: string
  company: string
  phone: string
  email: string
  goal: string
}

export function isCallbackPhoneNumber(value: unknown): value is string {
  return (
    typeof value === "string" &&
    value.length <= 80 &&
    /^[+\d\s()./\-]+$/.test(value) &&
    (value.match(/\d/g)?.length ?? 0) >= 7
  )
}

export function callbackSourceForPath(path: unknown) {
  if (
    typeof path !== "string" ||
    path.length > 240 ||
    !/^\/(?:[a-z0-9]+(?:-[a-z0-9]+)*\/?)*$/.test(path)
  )
    return null
  if (path === "/") return "home"
  if (path === "/blog" || path.startsWith("/blog/")) return "blog"
  if (path.startsWith("/branchen/")) return "industry-page"
  return "website-callback"
}

export function callbackValidationMessage(
  form: CallbackFields,
  consent: boolean,
) {
  if (
    form.firstName.trim().length < 2 ||
    form.lastName.trim().length < 2 ||
    `${form.firstName.trim()} ${form.lastName.trim()}`.length > 120
  )
    return "Bitte geben Sie Vorname und Nachname an."
  if (!isCallbackPhoneNumber(form.phone.trim()))
    return "Bitte geben Sie eine Telefonnummer mit Vorwahl an."
  if (
    form.email.trim().length > 180 ||
    !/^\S+@\S+\.\S+$/.test(form.email.trim())
  )
    return "Bitte prüfen Sie Ihre E-Mail-Adresse."
  if (
    form.company.trim().length > 160 ||
    (form.goal !== "" && !CALLBACK_GOALS.some((goal) => goal === form.goal))
  )
    return "Bitte prüfen Sie Ihre Angaben."
  if (!consent) return "Bitte bestätigen Sie die Bearbeitung Ihrer Anfrage."
  return null
}

export function callbackSummary(context: { path: string; goal?: string }) {
  return [
    "PERSÖNLICHER RÜCKRUF ANGEFRAGT",
    `Seite: https://agenticit.ch${context.path}`,
    `Ziel: ${context.goal || "Anliegen persönlich besprechen"}`,
    "Gewünschter Kontaktweg: Telefon",
    "Bitte das Anliegen persönlich prüfen und den nächsten Schritt vereinbaren.",
  ].join("\n")
}

export function buildCallbackRequest(input: {
  form: CallbackFields
  pagePath: string
  consent: boolean
  honey: string
}) {
  const error = callbackValidationMessage(input.form, input.consent)
  const source = callbackSourceForPath(input.pagePath)
  if (error || !source || input.honey !== "")
    throw new Error(
      error ||
        "Die Anfrage konnte nicht übermittelt werden. Bitte prüfen Sie Ihre Angaben.",
    )
  return {
    source,
    name: `${input.form.firstName.trim()} ${input.form.lastName.trim()}`,
    email: input.form.email.trim(),
    phone: input.form.phone.trim(),
    company: input.form.company.trim() || undefined,
    consent: true as const,
    contactMethod: "phone" as const,
    callback: {
      version: 1 as const,
      path: input.pagePath,
      goal: input.form.goal || undefined,
    },
    company_website: input.honey,
  }
}

// One sender per mounted form: suppress concurrent/repeated success, allow a deliberate retry after failure.
export function createCallbackSender(fetcher: typeof fetch = fetch) {
  let pending = false
  let completed = false
  return async (input: Parameters<typeof buildCallbackRequest>[0]) => {
    if (pending || completed) return false
    const payload = buildCallbackRequest(input)
    pending = true
    try {
      const response = await fetcher("/api/leads", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      })
      await assertLeadAcknowledged(response, input.honey)
      completed = true
      return true
    } finally {
      pending = false
    }
  }
}
