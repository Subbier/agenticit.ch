import { isCallbackPhoneNumber } from "./callback-inquiry"
import { assertLeadAcknowledged } from "./lead-acknowledgement"

export type ContactFields = {
  name: string
  email: string
  phone: string
  company: string
  message: string
}

export function contactValidationMessage(
  form: ContactFields,
  consent: boolean,
) {
  if (form.name.trim().length < 2 || form.name.trim().length > 120)
    return "Bitte geben Sie Ihren Namen an (2 bis 120 Zeichen)."
  if (
    form.email.trim().length > 180 ||
    !/^\S+@\S+\.\S+$/.test(form.email.trim())
  )
    return "Bitte prüfen Sie Ihre E-Mail-Adresse."
  if (form.phone.trim() && !isCallbackPhoneNumber(form.phone.trim()))
    return "Bitte prüfen Sie Ihre Telefonnummer mit Vorwahl oder lassen Sie das Feld leer."
  if (form.company.trim().length > 160)
    return "Bitte kürzen Sie den Firmennamen auf höchstens 160 Zeichen."
  if (form.message.trim().length < 5 || form.message.trim().length > 1200)
    return "Bitte beschreiben Sie Ihr Anliegen in 5 bis 1200 Zeichen."
  if (!consent) return "Bitte bestätigen Sie die Bearbeitung Ihrer Anfrage."
  return null
}

export function contactSummary(message: string) {
  return [
    "KONTAKTANFRAGE",
    "Seite: https://agenticit.ch/kontakt",
    "Gewünschter Kontaktweg: E-Mail",
    "Bitte das Anliegen persönlich prüfen.",
    "",
    "Nachricht:",
    message,
  ].join("\n")
}

export function buildContactRequest(input: {
  form: ContactFields
  consent: boolean
  honey: string
}) {
  const error = contactValidationMessage(input.form, input.consent)
  if (error || input.honey !== "")
    throw new Error(
      error ||
        "Die Anfrage konnte nicht übermittelt werden. Bitte prüfen Sie Ihre Angaben.",
    )
  return {
    source: "contact-page" as const,
    name: input.form.name.trim(),
    email: input.form.email.trim(),
    phone: input.form.phone.trim() || undefined,
    company: input.form.company.trim() || undefined,
    message: input.form.message.trim(),
    consent: true as const,
    contactMethod: "email" as const,
    company_website: input.honey,
  }
}

// One sender per mounted form; retry after failure requires a new deliberate submission.
export function createContactSender(fetcher: typeof fetch = fetch) {
  let pending = false
  let completed = false
  return async (input: Parameters<typeof buildContactRequest>[0]) => {
    if (pending || completed) return false
    const payload = buildContactRequest(input)
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
