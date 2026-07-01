"use client"

import { useState } from "react"
import { CheckCircle2, Send } from "lucide-react"

export function CtaContactForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", message: "" })
  const [consent, setConsent] = useState(false)
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle")
  const [honey, setHoney] = useState("")

  const valid = form.name.trim().length >= 2 && /\S+@\S+\.\S+/.test(form.email) && consent

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
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          company: form.company.trim(),
          message: form.message.trim(),
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
      <div className="mx-auto mt-7 flex max-w-[560px] flex-col items-center rounded-[18px] border border-[#E3E9F2] bg-white p-8 text-center shadow-[0_10px_30px_rgba(11,31,58,0.08)]">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#16C7C0]/15 text-[#0a8f89]">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h3 className="mt-4 text-[20px] font-extrabold text-[#0B1F3A]">
          Danke{form.name ? `, ${form.name.split(" ")[0]}` : ""}!
        </h3>
        <p className="mt-2 max-w-[400px] text-[14px] leading-relaxed text-[#5A6B82]">
          Ihre Anfrage ist bei uns. Wir melden uns zeitnah persönlich bei Ihnen.
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={submit}
      className="mx-auto mt-7 w-full max-w-[560px] rounded-[18px] border border-[#E3E9F2] bg-white p-6 text-left shadow-[0_10px_30px_rgba(11,31,58,0.08)] sm:p-7"
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          required
          placeholder="Name *"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full rounded-[11px] border border-[#E3E9F2] px-4 py-3 text-[15px] outline-none transition focus:border-[#16C7C0]"
        />
        <input
          required
          type="email"
          placeholder="E-Mail *"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full rounded-[11px] border border-[#E3E9F2] px-4 py-3 text-[15px] outline-none transition focus:border-[#16C7C0]"
        />
        <input
          type="tel"
          placeholder="Telefon"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="w-full rounded-[11px] border border-[#E3E9F2] px-4 py-3 text-[15px] outline-none transition focus:border-[#16C7C0]"
        />
        <input
          placeholder="Firma"
          value={form.company}
          onChange={(e) => setForm({ ...form, company: e.target.value })}
          className="w-full rounded-[11px] border border-[#E3E9F2] px-4 py-3 text-[15px] outline-none transition focus:border-[#16C7C0]"
        />
      </div>
      <textarea
        rows={3}
        placeholder="Worum geht es? (optional)"
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
        className="mt-3 w-full rounded-[11px] border border-[#E3E9F2] px-4 py-3 text-[15px] outline-none transition focus:border-[#16C7C0]"
      />
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={honey}
        onChange={(e) => setHoney(e.target.value)}
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
        aria-hidden="true"
      />
      <label className="mt-3 flex items-start gap-2 text-left text-[12px] leading-snug text-[#5A6B82]">
        <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5 accent-[#16C7C0]" />
        Ich bin einverstanden, dass AgenticIT meine Angaben zur Bearbeitung meiner Anfrage verwendet (DSG-konform).
      </label>
      {status === "error" ? (
        <p className="mt-3 text-[13px] font-bold text-red-600">Senden fehlgeschlagen. Bitte erneut versuchen.</p>
      ) : null}
      <button
        type="submit"
        disabled={!valid || status === "loading"}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-[13px] bg-gradient-to-br from-[#3BD974] to-[#22C55E] py-[15px] text-[16px] font-extrabold text-white shadow-[0_8px_20px_rgba(34,197,94,0.3)] transition hover:-translate-y-[1px] disabled:opacity-50 disabled:hover:translate-y-0"
      >
        <Send className="h-[18px] w-[18px]" />
        {status === "loading" ? "Wird gesendet …" : "Unverbindlich anfragen"}
      </button>
    </form>
  )
}
