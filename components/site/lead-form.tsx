"use client"

import type { FormEvent } from "react"
import { useId, useState } from "react"
import Link from "next/link"
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react"
import type { LeadSource } from "@/lib/site-content"
import { assertLeadAcknowledged } from "@/lib/lead-acknowledgement"
import shared from "@/components/journey/journey.module.css"
import styles from "./lead-form.module.css"

type SelectField = {
  name: "leadVolume" | "challenge" | "industry" | "goal"
  label: string
  options: string[]
}
type LeadFormProps = {
  source: LeadSource
  title: string
  description: string
  submitLabel: string
  selectFields?: SelectField[]
  compact?: boolean
  requirePhone?: boolean
}
type FormState = "idle" | "loading" | "success" | "error"

export function LeadForm({
  source,
  title,
  description,
  submitLabel,
  selectFields = [],
  compact = false,
  requirePhone = false,
}: LeadFormProps) {
  const formId = useId()
  const [state, setState] = useState<FormState>("idle")
  const [message, setMessage] = useState("")
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (state === "loading") return
    setState("loading")
    setMessage("")
    const form = event.currentTarget
    const data = new FormData(form)
    const industry = String(data.get("industry") || "")
    const payload = {
      source,
      name: String(data.get("name") || ""),
      email: String(data.get("email") || ""),
      company: String(data.get("company") || ""),
      phone: String(data.get("phone") || ""),
      message: String(data.get("message") || ""),
      leadVolume: String(data.get("leadVolume") || ""),
      challenge: String(data.get("challenge") || ""),
      industry,
      goal: String(data.get("goal") || ""),
      contactMethod: requirePhone ? "phone" : "email",
      consent: data.get("consent") === "on",
      company_website: String(data.get("company_website") || ""),
    }
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      })
      await assertLeadAcknowledged(response, payload.company_website)
      setState("success")
      setMessage(
        "Danke. Ihre Angaben wurden übermittelt. Wir prüfen Ihr Anliegen persönlich und melden uns über die angegebenen Kontaktdaten.",
      )
      form.reset()
    } catch (error) {
      setState("error")
      setMessage(
        error instanceof Error
          ? error.message
          : "Die Anfrage konnte nicht übermittelt werden.",
      )
    }
  }
  return (
    <form
      id={`${formId}-form`}
      onSubmit={handleSubmit}
      className={`${shared.contact} ${styles.form}`}
    >
      <header className={styles.heading}>
        <span className={shared.eyebrow}>Unverbindliche Anfrage</span>
        <h3 style={{ fontSize: compact ? 24 : 28 }}>{title}</h3>
        <p>{description}</p>
      </header>
      <div className={shared.hiddenField} aria-hidden="true">
        <label>
          Dieses Feld bitte leer lassen
          <input
            type="text"
            name="company_website"
            tabIndex={-1}
            autoComplete="off"
          />
        </label>
      </div>
      <div className={shared.formGrid}>
        <Field
          label="Vorname & Nachname *"
          name="name"
          required
          autoComplete="name"
        />
        <Field
          label="Geschäftliche E-Mail *"
          name="email"
          type="email"
          required
          autoComplete="email"
        />
        <Field
          label="Unternehmen (optional)"
          name="company"
          autoComplete="organization"
        />
        <Field
          label={
            requirePhone ? "Telefon für den Rückruf *" : "Telefon (optional)"
          }
          name="phone"
          type="tel"
          required={requirePhone}
          autoComplete="tel"
        />
        {selectFields.map((field) => (
          <label key={field.name} className={shared.field}>
            {field.label}
            <select name={field.name} defaultValue="">
              <option value="">Bitte wählen</option>
              {field.options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
        ))}
        <label className={`${shared.field} ${shared.fieldFull}`}>
          Nachricht (optional)
          <textarea
            name="message"
            rows={4}
            maxLength={1200}
            placeholder="Was soll AgenticIT für Sie prüfen?"
          />
        </label>
      </div>
      <label className={shared.consent}>
        <input name="consent" type="checkbox" required />
        <span>
          Ich bin einverstanden, dass AgenticIT meine Angaben zur Bearbeitung
          dieser Anfrage verwendet und mich dazu kontaktiert.{" "}
          <Link href="/datenschutz">Datenschutz</Link>
        </span>
      </label>
      <div className={styles.actions}>
        <button
          type="submit"
          disabled={state === "loading"}
          className={shared.button}
        >
          {state === "loading" ? (
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
          ) : (
            <Send className="size-4" aria-hidden="true" />
          )}
          {state === "loading" ? "Wird übermittelt …" : submitLabel}
        </button>
      </div>
      {message ? (
        <div
          className={state === "success" ? styles.success : styles.error}
          role={state === "error" ? "alert" : "status"}
        >
          {state === "success" ? (
            <CheckCircle2 size={18} aria-hidden="true" />
          ) : (
            <AlertCircle size={18} aria-hidden="true" />
          )}
          <span>{message}</span>
        </div>
      ) : null}
    </form>
  )
}

type FieldProps = {
  label: string
  name: string
  type?: string
  required?: boolean
  autoComplete?: string
}
function Field({
  label,
  name,
  type = "text",
  required = false,
  autoComplete,
}: FieldProps) {
  const maxLength =
    name === "email"
      ? 180
      : name === "company"
        ? 160
        : name === "phone"
          ? 80
          : 120
  return (
    <label className={shared.field}>
      {label}
      <input
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        minLength={
          required
            ? name === "phone"
              ? 7
              : name === "name"
                ? 2
                : undefined
            : undefined
        }
        maxLength={maxLength}
      />
    </label>
  )
}
