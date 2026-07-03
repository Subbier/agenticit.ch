"use client"

import { useState } from "react"
import Link from "next/link"
import { Phone, Mail, MapPin, CheckCircle2, Send } from "lucide-react"
import { SiteHeader } from "@/components/site/site-header"

const PHONE_LABEL = "044 505 20 27"
const PHONE_TEL = "+41445052027"
const EMAIL = "info@agenticit.ch"

export function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", message: "" })
  const [consent, setConsent] = useState(false)
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle")
  const [honey, setHoney] = useState("")

  const valid =
    form.name.trim().length >= 2 &&
    /\S+@\S+\.\S+/.test(form.email) &&
    form.message.trim().length >= 5 &&
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

  return (
    <main className="min-h-screen bg-white text-[#0B1F3A]">
      <SiteHeader />

      {/* Hero */}
      <section className="bg-gradient-to-b from-[#0B1F3A] to-[#13294B] px-6 py-16 text-center">
        <div className="mx-auto max-w-[760px]">
          <span className="inline-block rounded-full bg-[#16C7C0]/15 px-[13px] py-[6px] text-[12px] font-extrabold uppercase tracking-[0.7px] text-[#16C7C0]">
            Kontakt
          </span>
          <h1 className="mx-auto mt-4 max-w-[620px] text-[clamp(28px,4.6vw,42px)] font-extrabold leading-[1.1] tracking-[-0.8px] text-white">
            Sprechen wir über Ihr Potenzial.
          </h1>
          <p className="mx-auto mt-4 max-w-[540px] text-[clamp(15px,2vw,18px)] leading-relaxed text-[#b9c6da]">
            Schreiben Sie uns – wir melden uns persönlich. Unverbindlich, konkret, auf Ihr Geschäft zugeschnitten.
          </p>
        </div>
      </section>

      <section className="px-6 py-14">
        <div className="mx-auto grid max-w-[1000px] gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          {/* Kontaktdaten */}
          <div>
            <h2 className="text-[20px] font-extrabold text-[#0B1F3A]">So erreichen Sie uns</h2>
            <div className="mt-5 space-y-4">
              <a href={`tel:${PHONE_TEL}`} className="flex items-center gap-3 text-[15px] font-semibold text-[#0B1F3A] hover:text-[#0a8f89]">
                <span className="grid h-10 w-10 flex-none place-items-center rounded-[12px] bg-[#F1F8FF] text-[#0a8f89]"><Phone className="h-5 w-5" /></span>
                {PHONE_LABEL}
              </a>
              <a href={`mailto:${EMAIL}`} className="flex items-center gap-3 text-[15px] font-semibold text-[#0B1F3A] hover:text-[#0a8f89]">
                <span className="grid h-10 w-10 flex-none place-items-center rounded-[12px] bg-[#F1F8FF] text-[#0a8f89]"><Mail className="h-5 w-5" /></span>
                {EMAIL}
              </a>
              <div className="flex items-center gap-3 text-[15px] font-semibold text-[#0B1F3A]">
                <span className="grid h-10 w-10 flex-none place-items-center rounded-[12px] bg-[#F1F8FF] text-[#F97316]"><MapPin className="h-5 w-5" /></span>
                AgenticIT · Postfach · 3072 Ostermundigen
              </div>
            </div>
            <p className="mt-6 rounded-[14px] border border-[#E3E9F2] bg-[#FAFCFF] p-4 text-[13.5px] leading-relaxed text-[#5A6B82]">
              KI-Lösungen für Schweizer KMU – damit Sie sich auf Ihr Kerngeschäft konzentrieren können. Ihre Daten
              bleiben in der Schweiz, DSG-konform.
            </p>
          </div>

          {/* Formular */}
          <div className="rounded-[20px] border border-[#E3E9F2] bg-white p-6 shadow-[0_18px_48px_rgba(11,31,58,0.10)] md:p-8">
            {status === "done" ? (
              <div className="py-8 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#16C7C0]/15 text-[#0a8f89]">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h2 className="mt-4 text-[22px] font-extrabold text-[#0B1F3A]">Danke{form.name ? `, ${form.name.split(" ")[0]}` : ""}!</h2>
                <p className="mx-auto mt-2 max-w-[400px] text-[14px] leading-relaxed text-[#5A6B82]">
                  Ihre Nachricht ist bei uns eingegangen. Wir melden uns zeitnah persönlich bei Ihnen.
                </p>
                <Link href="/" className="mt-6 inline-block rounded-[12px] bg-[#0B1F3A] px-5 py-3 text-[14px] font-extrabold text-white">
                  Zur Startseite
                </Link>
              </div>
            ) : (
              <form className="space-y-3" onSubmit={submit}>
                <h2 className="text-[18px] font-extrabold text-[#0B1F3A]">Ihre Nachricht</h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  <input required placeholder="Name *" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded-[11px] border border-[#E3E9F2] px-4 py-3 text-[15px] outline-none transition focus:border-[#16C7C0]" />
                  <input required type="email" placeholder="E-Mail *" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full rounded-[11px] border border-[#E3E9F2] px-4 py-3 text-[15px] outline-none transition focus:border-[#16C7C0]" />
                  <input type="tel" placeholder="Telefon" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full rounded-[11px] border border-[#E3E9F2] px-4 py-3 text-[15px] outline-none transition focus:border-[#16C7C0]" />
                  <input placeholder="Firma" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className="w-full rounded-[11px] border border-[#E3E9F2] px-4 py-3 text-[15px] outline-none transition focus:border-[#16C7C0]" />
                </div>
                <textarea required rows={5} placeholder="Wie können wir helfen? *" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full rounded-[11px] border border-[#E3E9F2] px-4 py-3 text-[15px] outline-none transition focus:border-[#16C7C0]" />
                <input type="text" tabIndex={-1} autoComplete="off" value={honey} onChange={(e) => setHoney(e.target.value)} className="absolute left-[-9999px] h-0 w-0 opacity-0" aria-hidden="true" />
                <label className="flex items-start gap-2 text-[12.5px] leading-snug text-[#5A6B82]">
                  <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5 accent-[#16C7C0]" />
                  Ich bin einverstanden, dass AgenticIT meine Angaben zur Bearbeitung meiner Anfrage verwendet (DSG-konform).
                </label>
                {status === "error" ? <p className="text-[13px] font-bold text-red-600">Senden fehlgeschlagen. Bitte erneut versuchen oder rufen Sie uns an.</p> : null}
                <button type="submit" disabled={!valid || status === "loading"} className="flex w-full items-center justify-center gap-2 rounded-[13px] bg-gradient-to-br from-[#3BD974] to-[#22C55E] py-[15px] text-[16px] font-extrabold text-white shadow-[0_8px_20px_rgba(34,197,94,0.3)] transition hover:-translate-y-[1px] disabled:opacity-50 disabled:hover:translate-y-0">
                  <Send className="h-[18px] w-[18px]" />
                  {status === "loading" ? "Wird gesendet …" : "Nachricht senden"}
                </button>
                <p className="text-center text-[11px] text-[#9aa9bf]">
                  Hinweis: Jede KI-Interaktion startet mit „Ich bin der KI-Assistent von AgenticIT." · DSG-konform · Daten in der Schweiz.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      <footer className="bg-[#0B1F3A] py-9 text-center text-[12px] text-[#8294ad]">
        © 2026 AgenticIT · Postfach · 3072 Ostermundigen ·{" "}
        <a href={`tel:${PHONE_TEL}`} className="hover:text-white">{PHONE_LABEL}</a> ·{" "}
        <a href={`mailto:${EMAIL}`} className="hover:text-white">{EMAIL}</a>
      </footer>
    </main>
  )
}
