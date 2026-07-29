"use client"

import { useState } from "react"
import Link from "next/link"
import { Phone, Mail, MapPin, CheckCircle2, Send } from "lucide-react"
import { SiteHeader } from "@/components/site/site-header"
import { CarbonFooter } from "@/components/site/carbon-footer"

const PHONE_LABEL = "031 539 44 44"
const PHONE_TEL = "+41315394444"
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
    <main className="min-h-screen bg-white text-[#0A0C10]">
      <SiteHeader />

      {/* Hero */}
      <section className="bg-gradient-to-b from-[#0A0C10] to-[#1E2631] px-6 py-16 text-center">
        <div className="mx-auto max-w-[760px]">
          <span className="inline-block rounded-full bg-[#1F9A5E]/15 px-[13px] py-[6px] text-[12px] font-extrabold uppercase tracking-[0.7px] text-[#57C7FF]">
            Kontakt
          </span>
          <h1 className="mx-auto mt-4 max-w-[620px] text-[clamp(28px,4.6vw,42px)] font-extrabold leading-[1.1] tracking-[-0.8px] text-white">
            Sprechen wir über Ihr Potenzial.
          </h1>
          <p className="mx-auto mt-4 max-w-[540px] text-[clamp(15px,2vw,18px)] leading-relaxed text-[#C3CBD3]">
            Schreiben Sie uns – wir melden uns persönlich. Unverbindlich, konkret, auf Ihr Geschäft zugeschnitten.
          </p>
        </div>
      </section>

      <section className="px-6 py-14">
        <div className="mx-auto grid max-w-[1000px] gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          {/* Kontaktdaten */}
          <div>
            <h2 className="text-[20px] font-extrabold text-[#0A0C10]">So erreichen Sie uns</h2>
            <div className="mt-5 space-y-4">
              <a href={`tel:${PHONE_TEL}`} className="flex items-center gap-3 text-[15px] font-semibold text-[#0A0C10] hover:text-[#57C7FF]">
                <span className="grid h-10 w-10 flex-none place-items-center rounded-[12px] bg-[#FAFAF7] text-[#57C7FF]"><Phone className="h-5 w-5" /></span>
                {PHONE_LABEL}
              </a>
              <a href={`mailto:${EMAIL}`} className="flex items-center gap-3 text-[15px] font-semibold text-[#0A0C10] hover:text-[#57C7FF]">
                <span className="grid h-10 w-10 flex-none place-items-center rounded-[12px] bg-[#FAFAF7] text-[#57C7FF]"><Mail className="h-5 w-5" /></span>
                {EMAIL}
              </a>
              <div className="flex items-center gap-3 text-[15px] font-semibold text-[#0A0C10]">
                <span className="grid h-10 w-10 flex-none place-items-center rounded-[12px] bg-[#FAFAF7] text-[#F97316]"><MapPin className="h-5 w-5" /></span>
                AgenticIT · Postfach · 3072 Ostermundigen
              </div>
            </div>
            <p className="mt-6 rounded-[14px] border border-[#E1E4E8] bg-[#FAFAF7] p-4 text-[13.5px] leading-relaxed text-[#5A6B82]">
              KI-Lösungen für Schweizer KMU – damit Sie sich auf Ihr Kerngeschäft konzentrieren können. Ihre Daten
              bleiben in der Schweiz, DSG-konform.
            </p>
          </div>

          {/* Formular */}
          <div className="rounded-[20px] border border-[#E1E4E8] bg-white p-6 shadow-[0_18px_48px_rgba(10,12,16,0.10)] md:p-8">
            {status === "done" ? (
              <div className="py-8 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#1F9A5E]/15 text-[#57C7FF]">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h2 className="mt-4 text-[22px] font-extrabold text-[#0A0C10]">Danke{form.name ? `, ${form.name.split(" ")[0]}` : ""}!</h2>
                <p className="mx-auto mt-2 max-w-[400px] text-[14px] leading-relaxed text-[#5A6B82]">
                  Ihre Nachricht ist bei uns eingegangen. Wir melden uns zeitnah persönlich bei Ihnen.
                </p>
                <Link href="/" className="mt-6 inline-block rounded-[12px] bg-[#8FE05A] px-5 py-3 text-[14px] font-extrabold text-[#122400]">
                  Zur Startseite
                </Link>
              </div>
            ) : (
              <form className="space-y-3" onSubmit={submit}>
                <h2 className="text-[18px] font-extrabold text-[#0A0C10]">Ihre Nachricht</h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  <input required placeholder="Name *" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded-[11px] border border-[#E1E4E8] px-4 py-3 text-[15px] outline-none transition focus:border-[#1F9A5E]" />
                  <input required type="email" placeholder="E-Mail *" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full rounded-[11px] border border-[#E1E4E8] px-4 py-3 text-[15px] outline-none transition focus:border-[#1F9A5E]" />
                  <input type="tel" placeholder="Telefon" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full rounded-[11px] border border-[#E1E4E8] px-4 py-3 text-[15px] outline-none transition focus:border-[#1F9A5E]" />
                  <input placeholder="Firma" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className="w-full rounded-[11px] border border-[#E1E4E8] px-4 py-3 text-[15px] outline-none transition focus:border-[#1F9A5E]" />
                </div>
                <textarea required rows={5} placeholder="Wie können wir helfen? *" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full rounded-[11px] border border-[#E1E4E8] px-4 py-3 text-[15px] outline-none transition focus:border-[#1F9A5E]" />
                <input type="text" tabIndex={-1} autoComplete="off" value={honey} onChange={(e) => setHoney(e.target.value)} className="absolute left-[-9999px] h-0 w-0 opacity-0" aria-hidden="true" />
                <label className="flex items-start gap-2 text-[12.5px] leading-snug text-[#5A6B82]">
                  <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5 accent-[#1F9A5E]" />
                  Ich bin einverstanden, dass AgenticIT meine Angaben zur Bearbeitung meiner Anfrage verwendet (DSG-konform).
                </label>
                {status === "error" ? <p className="text-[13px] font-bold text-red-600">Senden fehlgeschlagen. Bitte erneut versuchen oder rufen Sie uns an.</p> : null}
                <button type="submit" disabled={!valid || status === "loading"} className="flex w-full items-center justify-center gap-2 rounded-[13px] bg-[#8FE05A] py-[15px] text-[16px] font-extrabold text-[#122400] shadow-[0_6px_16px_rgba(10,12,16,0.18)] transition hover:-translate-y-[1px] disabled:opacity-50 disabled:hover:translate-y-0">
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

      {/* Häufige Fragen — beantwortet vorab, was sonst per Mail gefragt wird */}
      <section className="border-t border-[#E1E4E8] bg-[#FAFAF7] px-6 py-14">
        <div className="mx-auto max-w-[760px]">
          <h2 className="text-center text-[24px] font-extrabold text-[#0A0C10]">Häufige Fragen vor dem ersten Gespräch</h2>
          <div className="mt-8 space-y-5">
            {[
              {
                q: "Wie schnell melden Sie sich?",
                a: "Anfragen, die an einem Werktag bis 16 Uhr eintreffen, beantworten wir noch am selben Tag. Alles andere spätestens am nächsten Werktag. Erreichbar sind wir Montag bis Freitag von 08:00 bis 18:00 Uhr unter 031 539 44 44.",
              },
              {
                q: "Was passiert nach meiner Anfrage?",
                a: "Zuerst ein kurzes Telefonat von rund 15 Minuten: Wir hören zu, welche Aufgaben bei Ihnen täglich Zeit kosten. Danach erhalten Sie von uns eine Einschätzung mit einer konkreten Zahl — welche Aufgabe sich zuerst automatisieren lässt und was das bringt. Erst wenn das für Sie stimmt, sprechen wir über ein Angebot.",
              },
              {
                q: "Kostet das erste Gespräch etwas?",
                a: "Nein. Das Erstgespräch und die anschliessende Einschätzung sind kostenlos und unverbindlich. Es entsteht keine Verpflichtung, und wir arbeiten ohne Verkaufsdruck.",
              },
              {
                q: "Müssen wir unsere bestehenden Programme wechseln?",
                a: "In aller Regel nicht. Wir docken an das an, was Sie bereits nutzen — E-Mail, Telefonie, CRM, Buchhaltung. Ein Systemwechsel ist die Ausnahme, nicht der Ausgangspunkt.",
              },
              {
                q: "Was passiert mit unseren Daten?",
                a: "Ihre Daten bleiben in der Schweiz und gehören Ihnen. Wir arbeiten nach dem revidierten Schweizer Datenschutzgesetz und der DSGVO, geben nichts an Dritte weiter und betreiben Lösungen auf Wunsch vollständig ohne Internetverbindung. Details stehen in unserer Datenschutzerklärung.",
              },
              {
                q: "Für welche Unternehmensgrösse lohnt sich das?",
                a: "Der Hebel entsteht nicht durch die Anzahl Mitarbeitender, sondern durch wiederkehrende Aufgaben. Sobald mehrere Stunden pro Woche in Routine fliessen — Anfragen beantworten, nachfassen, Daten erfassen — rechnet sich der Einsatz. Das gilt für Betriebe ab wenigen Personen ebenso wie für grössere Teams.",
              },
            ].map((f) => (
              <div key={f.q} className="rounded-[14px] border border-[#E1E4E8] bg-white p-5">
                <h3 className="text-[16px] font-extrabold text-[#0A0C10]">{f.q}</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-[#5A6B82]">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER — zentral in carbon-footer.tsx (ein Footer für die ganze Seite) */}
      <CarbonFooter />
    </main>
  )
}
