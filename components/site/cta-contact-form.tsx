"use client"

import { useState } from "react"
import { CheckCircle2, Send } from "lucide-react"

const INPUT_CLASS =
  "w-full rounded-[11px] border border-[#AEB8C2] bg-white px-4 py-3 text-[15px] font-medium text-[#0A0C10] outline-none transition placeholder:text-[#5A6B82] hover:border-[#7E8A96] focus:border-[#1F9A5E] focus:shadow-[0_0_0_3px_rgba(31,154,94,0.18)]"

// «Ihr Ziel» steuert Bedarf & Reife im Gespräch (Master: Conversion-Funnel §4).
const ZIELE = ["Mehr Anfragen", "Planbarer Umsatz", "Zeit gewinnen", "Weiss noch nicht"]

export function CtaContactForm() {
  const [form, setForm] = useState({ firstName: "", lastName: "", company: "", phone: "", email: "", goal: "" })
  const [consent, setConsent] = useState(false)
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle")
  const [honey, setHoney] = useState("")

  const valid =
    form.firstName.trim().length >= 2 &&
    form.lastName.trim().length >= 2 &&
    form.phone.trim().length >= 7 &&
    /\S+@\S+\.\S+/.test(form.email) &&
    consent

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!valid) return
    setStatus("loading")
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          source: "home",
          name: `${form.firstName.trim()} ${form.lastName.trim()}`,
          email: form.email.trim(),
          phone: form.phone.trim(),
          company: form.company.trim(),
          goal: form.goal || undefined,
          consent: true,
          company_website: honey,
        }),
      })
      if (!res.ok) throw new Error("failed")
      setStatus("done")
    } catch {
      setStatus("error")
    }
  }

  if (status === "done") {
    return (
      <div className="mx-auto mt-7 flex w-full max-w-[560px] flex-col items-center rounded-[18px] border border-[#E1E4E8] bg-white p-8 text-center shadow-[0_10px_30px_rgba(10,12,16,0.08)]">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#1F9A5E]/15 text-[#57C7FF]">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h3 className="mt-4 text-[20px] font-extrabold text-[#0A0C10]">
          Danke{form.firstName ? `, ${form.firstName.trim()}` : ""}!
        </h3>
        <p className="mt-2 max-w-[400px] text-[14px] leading-relaxed text-[#5A6B82]">
          Ihre Anfrage ist bei uns. Wir rufen Sie zeitnah persönlich an.
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={submit}
      className="mx-auto mt-7 w-full max-w-[560px] rounded-[18px] border border-[#C8D0D8] bg-white p-4 text-left shadow-[0_14px_40px_rgba(10,12,16,0.14)] sm:p-7"
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          required
          autoComplete="given-name"
          placeholder="Vorname *"
          value={form.firstName}
          onChange={(e) => setForm({ ...form, firstName: e.target.value })}
          className={INPUT_CLASS}
        />
        <input
          required
          autoComplete="family-name"
          placeholder="Nachname *"
          value={form.lastName}
          onChange={(e) => setForm({ ...form, lastName: e.target.value })}
          className={INPUT_CLASS}
        />
        <input
          autoComplete="organization"
          placeholder="Firma (optional)"
          value={form.company}
          onChange={(e) => setForm({ ...form, company: e.target.value })}
          className={INPUT_CLASS}
        />
        <input
          required
          type="tel"
          autoComplete="tel"
          placeholder="Telefon *"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className={INPUT_CLASS}
        />
      </div>
      <input
        required
        type="email"
        autoComplete="email"
        placeholder="E-Mail-Adresse *"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        className={`${INPUT_CLASS} mt-3`}
      />
      <select
        value={form.goal}
        onChange={(e) => setForm({ ...form, goal: e.target.value })}
        className={`${INPUT_CLASS} mt-3 ${form.goal ? "text-[#0A0C10]" : "text-[#5A6B82]"}`}
      >
        <option value="">Ihr Ziel (optional)</option>
        {ZIELE.map((z) => (
          <option key={z} value={z}>
            {z}
          </option>
        ))}
      </select>
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={honey}
        onChange={(e) => setHoney(e.target.value)}
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
        aria-hidden="true"
      />
      <label className="mt-3 flex items-start gap-2 text-left text-[12.5px] font-medium leading-snug text-[#33404F]">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5 h-4 w-4 flex-none accent-[#1F9A5E]"
        />
        Ich bin einverstanden, dass AgenticIT meine Angaben zur Bearbeitung meiner Anfrage verwendet (DSG-konform).
      </label>
      {status === "error" ? (
        <p className="mt-3 text-[13px] font-bold text-red-600">Senden fehlgeschlagen. Bitte erneut versuchen.</p>
      ) : null}
      <button
        type="submit"
        disabled={!valid || status === "loading"}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-[13px] bg-[#8FE05A] py-[15px] text-[16px] font-extrabold text-[#122400] shadow-[0_6px_16px_rgba(10,12,16,0.18)] transition hover:-translate-y-[1px] disabled:opacity-50 disabled:hover:translate-y-0"
      >
        <Send className="h-[18px] w-[18px]" />
        {status === "loading" ? "Wird gesendet …" : "Rückruf anfordern – kostenlos"}
      </button>
      <p className="mt-3 text-center text-[12.5px] font-medium text-[#33404F]">
        Ein kurzer Rückruf, ein konkreter Plan für Ihre Branche – Sie entscheiden danach in Ruhe.
      </p>
    </form>
  )
}
