"use client"

import type { FormEvent } from "react"
import { useId, useState } from "react"
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react"
import type { LeadSource } from "@/lib/site-content"
import { getLeadPriceByLabel } from "@/lib/lead-pricing"

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
}

type FormState = "idle" | "loading" | "success" | "error"

export function LeadForm({
  source,
  title,
  description,
  submitLabel,
  selectFields = [],
  compact = false,
}: LeadFormProps) {
  const formId = useId()
  const [state, setState] = useState<FormState>("idle")
  const [message, setMessage] = useState("")

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setState("loading")
    setMessage("")

    const form = event.currentTarget
    const formData = new FormData(form)
    const industry = String(formData.get("industry") || "")
    const leadPrice = getLeadPriceByLabel(industry)
    const payload = {
      source,
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      company: String(formData.get("company") || ""),
      phone: String(formData.get("phone") || ""),
      message: String(formData.get("message") || ""),
      leadVolume: String(formData.get("leadVolume") || ""),
      challenge: String(formData.get("challenge") || ""),
      industry,
      // Richtwert pro Kundenanfrage (CHF) für Zoho-Tagging; undefined wenn keine Branche gewählt.
      leadPrice,
      goal: String(formData.get("goal") || ""),
      consent: formData.get("consent") === "on",
      // Honeypot – muss leer bleiben; nur Bots füllen dieses versteckte Feld aus.
      company_website: String(formData.get("company_website") || ""),
    }

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        const data = await response.json().catch(() => null)
        throw new Error(data?.message || "Die Anfrage konnte nicht gesendet werden.")
      }

      setState("success")
      setMessage(
        "Danke – Ihre Anfrage ist da. Wir melden uns innerhalb eines Werktags mit einem unverbindlichen Rückruf (von +41 76 202 01 36). Kein Verkaufsdruck – Sie entscheiden danach in Ruhe.",
      )
      form.reset()
    } catch (error) {
      setState("error")
      setMessage(error instanceof Error ? error.message : "Die Anfrage konnte nicht gesendet werden.")
    }
  }

  return (
    <form
      id={`${formId}-form`}
      onSubmit={handleSubmit}
      className="rounded-lg border border-white/[0.12] bg-white/[0.06] p-5 shadow-2xl shadow-black/20 backdrop-blur-md sm:p-6"
    >
      <div className="mb-6">
        <p className="overline text-sm font-semibold uppercase tracking-[0.18em] text-emerald-200">Lead-Formular</p>
        <h3 className={`${compact ? "text-2xl" : "text-3xl"} mt-3 font-semibold tracking-tight text-white`}>
          {title}
        </h3>
        <p className="mt-3 text-sm leading-6 text-white/68">{description}</p>
      </div>

      {/* Honeypot: für Menschen unsichtbar, fängt Bots ab */}
      <div aria-hidden="true" className="absolute left-[-9999px] top-0 h-0 w-0 overflow-hidden">
        <label>
          Bitte dieses Feld leer lassen
          <input
            type="text"
            name="company_website"
            tabIndex={-1}
            autoComplete="off"
          />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Vorname & Nachname" name="name" required autoComplete="name" />
        <Field label="Geschäftliche E-Mail" name="email" type="email" required autoComplete="email" />
        <Field label="Unternehmen" name="company" autoComplete="organization" />
        <Field label="Telefon" name="phone" type="tel" autoComplete="tel" />

        {selectFields.map((field) => (
          <label key={field.name} className="block text-sm text-white/78">
            <span className="mb-2 block font-medium">{field.label}</span>
            <select
              name={field.name}
              className="h-11 w-full rounded-lg border border-white/[0.12] bg-black/[0.45] px-3 text-sm text-white outline-none transition focus:border-emerald-300 focus:ring-2 focus:ring-emerald-300/20"
              defaultValue=""
            >
              <option value="" className="bg-neutral-950">
                Bitte wählen
              </option>
              {field.options.map((option) => (
                <option key={option} value={option} className="bg-neutral-950">
                  {option}
                </option>
              ))}
            </select>
          </label>
        ))}

        <label className="block text-sm text-white/78 sm:col-span-2">
          <span className="mb-2 block font-medium">Nachricht</span>
          <textarea
            name="message"
            rows={4}
            className="w-full rounded-lg border border-white/[0.12] bg-black/[0.45] px-3 py-3 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-emerald-300 focus:ring-2 focus:ring-emerald-300/20"
            placeholder="Was soll AgenticIT für Sie prüfen?"
          />
        </label>
      </div>

      <label className="mt-5 flex gap-3 text-sm leading-6 text-white/68">
        <input
          name="consent"
          type="checkbox"
          required
          className="mt-1 size-4 rounded border-white/20 bg-black accent-emerald-300"
        />
        <span>Ich bin einverstanden, dass AgenticIT meine Angaben zur Bearbeitung der Anfrage nutzt.</span>
      </label>

      <button
        type="submit"
        disabled={state === "loading"}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-emerald-100 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {state === "loading" ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
        {state === "loading" ? "Wird gesendet..." : submitLabel}
      </button>

      {message && (
        <div
          className={`mt-4 flex items-start gap-2 rounded-lg border px-3 py-3 text-sm ${
            state === "success"
              ? "border-emerald-300/25 bg-emerald-300/10 text-emerald-100"
              : "border-red-300/25 bg-red-300/10 text-red-100"
          }`}
          role="status"
        >
          {state === "success" ? <CheckCircle2 className="mt-0.5 size-4" /> : <AlertCircle className="mt-0.5 size-4" />}
          <span>{message}</span>
        </div>
      )}
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

function Field({ label, name, type = "text", required = false, autoComplete }: FieldProps) {
  return (
    <label className="block text-sm text-white/78">
      <span className="mb-2 block font-medium">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className="h-11 w-full rounded-lg border border-white/[0.12] bg-black/[0.45] px-3 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-emerald-300 focus:ring-2 focus:ring-emerald-300/20"
      />
    </label>
  )
}
