"use client"

import { useEffect, useId, useRef, useState, type FormEvent } from "react"
import { CheckCircle2, Send } from "lucide-react"
import {
  CALLBACK_GOALS,
  callbackValidationMessage,
  createCallbackSender,
  type CallbackFields,
} from "@/lib/callback-inquiry"
import styles from "./callback-form.module.css"

const fields = [
  {
    name: "firstName",
    label: "Vorname",
    type: "text",
    autoComplete: "given-name",
    required: true,
    max: 59,
  },
  {
    name: "lastName",
    label: "Nachname",
    type: "text",
    autoComplete: "family-name",
    required: true,
    max: 59,
  },
  {
    name: "phone",
    label: "Telefon",
    type: "tel",
    autoComplete: "tel",
    required: true,
    max: 80,
  },
  {
    name: "email",
    label: "E-Mail-Adresse",
    type: "email",
    autoComplete: "email",
    required: true,
    max: 180,
  },
  {
    name: "company",
    label: "Firma (optional)",
    type: "text",
    autoComplete: "organization",
    required: false,
    max: 160,
  },
] as const

export function CtaContactForm({ pagePath }: { pagePath: string }) {
  return <CallbackForm key={pagePath} pagePath={pagePath} />
}

function CallbackForm({ pagePath }: { pagePath: string }) {
  const formId = useId()
  const [form, setForm] = useState<CallbackFields>({
    firstName: "",
    lastName: "",
    company: "",
    phone: "",
    email: "",
    goal: "",
  })
  const [consent, setConsent] = useState(false)
  const [honey, setHoney] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle",
  )
  const [error, setError] = useState("")
  const sender = useRef<ReturnType<typeof createCallbackSender> | null>(null)
  const successRef = useRef<HTMLDivElement>(null)
  if (sender.current === null) sender.current = createCallbackSender()
  const valid = callbackValidationMessage(form, consent) === null

  useEffect(() => {
    if (status === "done") successRef.current?.focus()
  }, [status])

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!valid || status === "loading") return
    setStatus("loading")
    setError("")
    try {
      if (await sender.current!({ form, pagePath, consent, honey }))
        setStatus("done")
    } catch (failure) {
      setError(
        failure instanceof Error
          ? failure.message
          : "Die Anfrage konnte nicht übermittelt werden. Bitte versuchen Sie es erneut.",
      )
      setStatus("error")
    }
  }

  if (status === "done")
    return (
      <div
        className={styles.success}
        role="status"
        tabIndex={-1}
        ref={successRef}
      >
        <CheckCircle2 size={32} aria-hidden="true" />
        <h3>Danke für Ihre Anfrage.</h3>
        <p>
          Ihre Rückrufanfrage wurde übermittelt. Wir prüfen Ihr Anliegen
          persönlich und melden uns über die angegebene Telefonnummer.
        </p>
      </div>
    )

  return (
    <form
      onSubmit={submit}
      className={styles.form}
      aria-label="Persönlichen Rückruf anfragen"
      data-callback-page={pagePath}
      aria-busy={status === "loading"}
    >
      <div className={styles.grid}>
        {fields.map((field) => (
          <label
            className={styles.field}
            htmlFor={formId + "-" + field.name}
            key={field.name}
          >
            <span>
              {field.label}
              {field.required ? <span aria-hidden="true"> *</span> : null}
            </span>
            <input
              id={formId + "-" + field.name}
              name={field.name}
              type={field.type}
              required={field.required}
              autoComplete={field.autoComplete}
              maxLength={field.max}
              minLength={
                field.name === "firstName" || field.name === "lastName"
                  ? 2
                  : undefined
              }
              value={form[field.name]}
              onChange={(event) =>
                setForm((previous) => ({
                  ...previous,
                  [field.name]: event.target.value,
                }))
              }
              aria-describedby={
                field.name === "phone" ? formId + "-phone-hint" : undefined
              }
            />
            {field.name === "phone" ? (
              <span className={styles.hint} id={formId + "-phone-hint"}>
                Mit Vorwahl angeben.
              </span>
            ) : null}
          </label>
        ))}
        <label className={styles.field} htmlFor={formId + "-goal"}>
          <span>Ihr Ziel (optional)</span>
          <select
            id={formId + "-goal"}
            name="goal"
            value={form.goal}
            onChange={(event) =>
              setForm((previous) => ({ ...previous, goal: event.target.value }))
            }
          >
            <option value="">Bitte wählen</option>
            {CALLBACK_GOALS.map((goal) => (
              <option value={goal} key={goal}>
                {goal}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className={styles.honey} aria-hidden="true">
        <input
          type="text"
          name="company_website"
          tabIndex={-1}
          autoComplete="off"
          value={honey}
          onChange={(event) => setHoney(event.target.value)}
        />
      </div>
      <label className={styles.consent}>
        <input
          type="checkbox"
          name="consent"
          required
          checked={consent}
          onChange={(event) => setConsent(event.target.checked)}
        />
        <span>
          Ich bin einverstanden, dass AgenticIT meine Angaben zur Bearbeitung
          meiner Rückrufanfrage verwendet.
        </span>
      </label>
      {status === "error" ? (
        <p className={styles.error} role="alert">
          {error}
        </p>
      ) : null}
      <div className={styles.submitRow}>
        <button
          type="submit"
          className={styles.submit}
          disabled={!valid || status === "loading"}
        >
          <Send size={17} aria-hidden="true" />
          {status === "loading" ? "Wird übermittelt …" : "Rückruf anfragen"}
        </button>
      </div>
      <p className={styles.privacy}>
        Informationen zur Bearbeitung Ihrer Angaben:{" "}
        <a
          href="/datenschutz"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Datenschutzerklärung (neuer Tab)"
          title="Datenschutzerklärung in einem neuen Tab öffnen"
        >
          Datenschutzerklärung
        </a>
      </p>
    </form>
  )
}
