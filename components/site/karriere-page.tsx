"use client"

import { useRef, useState } from "react"
import Link from "next/link"
import { CheckCircle2, Send } from "lucide-react"
import { SiteHeader } from "@/components/site/site-header"
import { KARRIERE_JOBS } from "@/lib/karriere-content"
import { SITE_TRUST_LINE } from "@/lib/site-trust-line"

const PHONE_LABEL = "031 539 44 44"
const PHONE_TEL = "+41315394444"
const EMAIL = "info@agenticit.ch"

const WHY_US = [
  {
    icon: "🎼",
    title: "Dirigieren statt Ausführen",
    text: "Bei uns verschiebt niemand Pixel im Alleingang. Sie entwerfen die Partitur, ein Ensemble aus KI-Agenten spielt sie – Sie behalten den Taktstock.",
  },
  {
    icon: "🇨🇭",
    title: "Bern, mit Weitblick",
    text: "Kurze Wege, klare Entscheidungen, Kunden in der ganzen Schweiz. Grosse Ambitionen, ohne den Konzern-Ballast.",
  },
  {
    icon: "🤝",
    title: "Vertrauen statt Kontrolle",
    text: "Sie bekommen Verantwortung ab Tag eins – und die Werkzeuge, die Ausstattung und den Freiraum, um sie auch zu nutzen.",
  },
]

type FormState = {
  name: string
  email: string
  phone: string
  position: string
  link: string
  message: string
}

const EMPTY_FORM: FormState = { name: "", email: "", phone: "", position: "", link: "", message: "" }

export function KarrierePage() {
  const [openSlug, setOpenSlug] = useState<string | null>(KARRIERE_JOBS[0]?.slug ?? null)
  const [form, setForm] = useState<FormState>(EMPTY_FORM)
  const [consent, setConsent] = useState(false)
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle")
  const [honey, setHoney] = useState("")
  const formRef = useRef<HTMLElement>(null)

  const valid =
    form.name.trim().length >= 2 &&
    /\S+@\S+\.\S+/.test(form.email) &&
    form.position.trim().length > 0 &&
    consent

  function bewerbenFuer(jobTitle: string) {
    setForm((f) => ({ ...f, position: jobTitle }))
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!valid) return
    setStatus("loading")
    try {
      const res = await fetch("/api/karriere", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          position: form.position.trim(),
          link: form.link.trim(),
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
      <SiteHeader activeSlug="karriere" />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0A0C10] px-4 py-16 text-center sm:px-6 sm:py-20">
        <div className="relative mx-auto max-w-[780px]">
          <span className="inline-block rounded-full border border-white/10 bg-[#1F9A5E]/15 px-[13px] py-[6px] text-[12px] font-extrabold uppercase tracking-[0.7px] text-[#57C7FF]">
            AgenticIT · Karriere
          </span>
          <h1 className="mx-auto mt-6 max-w-[720px] text-[clamp(28px,4.6vw,44px)] font-extrabold leading-[1.12] tracking-[-0.8px] text-white">
            Wir suchen keine Mitarbeitenden. Wir suchen{" "}
            <span className="text-[#57C7FF]">
              Dirigent:innen für Teams aus KI-Agenten.
            </span>
          </h1>
          <p className="mx-auto mt-5 max-w-[600px] text-[clamp(15px,2vw,18px)] leading-relaxed text-[#A8B2BD]">
            Anderswo entwirft ein Dutzend Spezialist:innen eine Kampagne. Bei uns genügt ein kluger Kopf, der ein
            ganzes Ensemble aus KI-Agenten dirigiert. Was anderswo nach Zukunftsmusik klingt, ist bei uns ein ganz
            gewöhnlicher Montag.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <a
              href="#stellen"
              className="rounded-[12px] bg-[#8FE05A] px-[26px] py-[15px] text-[15px] font-extrabold text-[#122400] transition hover:bg-[#A2E874]"
            >
              Offene Stellen ansehen
            </a>
            <a
              href="#bewerbung"
              className="rounded-[12px] border border-white/20 px-[24px] py-[15px] text-[15px] font-extrabold text-white/90 transition hover:border-[#8FE05A]/60 hover:text-white"
            >
              Direkt bewerben →
            </a>
          </div>
        </div>
      </section>

      {/* Warum AgenticIT */}
      <section className="px-4 py-14 sm:px-6">
        <div className="mx-auto max-w-[1120px]">
          <div className="mx-auto mb-9 max-w-[640px] text-center">
            <span className="inline-block rounded-full bg-[#1F9A5E]/12 px-[13px] py-[6px] text-[12px] font-extrabold uppercase tracking-[0.7px] text-[#57C7FF]">
              Warum AgenticIT
            </span>
            <h2 className="mt-5 text-[clamp(24px,3.2vw,32px)] font-extrabold leading-tight tracking-[-0.4px]">
              Ein Haus, das Werkzeuge von Weltrang gibt – und den Rest Ihnen überlässt.
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-3">
            {WHY_US.map((w) => (
              <div
                key={w.title}
                className="flex h-full flex-col rounded-[16px] border border-[#E1E4E8] bg-white p-6 shadow-[0_6px_20px_rgba(10,12,16,0.07)]"
              >
                <div className="mb-[14px] grid h-[46px] w-[46px] place-items-center rounded-[12px] bg-[#F1F3F5] text-[22px]">
                  {w.icon}
                </div>
                <h3 className="text-[19px] font-extrabold leading-tight tracking-[-0.3px] text-[#0A0C10]">
                  {w.title}
                </h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-[#4A545F]">{w.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Offene Stellen */}
      <section id="stellen" className="scroll-mt-20 bg-[#F1F3F5] px-4 py-14 sm:px-6">
        <div className="mx-auto max-w-[840px]">
          <div className="mx-auto mb-9 max-w-[640px] text-center">
            <span className="inline-block rounded-full bg-[#1F9A5E]/12 px-[13px] py-[6px] text-[12px] font-extrabold uppercase tracking-[0.7px] text-[#57C7FF]">
              Offene Stellen
            </span>
            <h2 className="mt-5 text-[clamp(24px,3.2vw,32px)] font-extrabold leading-tight tracking-[-0.4px]">
              Drei Pulte. Ein Orchester.
            </h2>
          </div>

          <div className="space-y-5">
            {KARRIERE_JOBS.map((job) => {
              const isOpen = openSlug === job.slug
              return (
                <div
                  key={job.slug}
                  className="relative rounded-[20px] border border-[#E1E4E8] bg-white shadow-[0_10px_30px_rgba(10,12,16,0.06)]"
                >
                  {job.badge === "ausbildung" ? (
                    <img
                      src="/images/wir-bilden-aus-badge.png"
                      alt="Wir bilden aus – Bewirb dich jetzt"
                      className="pointer-events-none absolute -right-3 -top-3 z-10 h-[76px] w-[76px] invert sm:h-[92px] sm:w-[92px]"
                    />
                  ) : null}

                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenSlug(isOpen ? null : job.slug)}
                    className="flex w-full items-start gap-4 px-5 py-5 text-left sm:px-7 sm:py-6"
                  >
                    <span className="grid h-11 w-11 flex-none place-items-center rounded-[12px] bg-[#F1F3F5] text-[20px]">
                      {job.tagEmoji}
                    </span>
                    <span className="flex-1">
                      <span className="block text-[11px] font-extrabold uppercase tracking-[0.5px] text-[#57C7FF]">
                        {job.tagLabel}
                      </span>
                      <span className="mt-1 block text-[18px] font-extrabold leading-snug tracking-[-0.3px] text-[#0A0C10] sm:text-[20px]">
                        {job.title}
                      </span>
                      <span className="mt-1.5 block text-[14px] leading-relaxed text-[#4A545F]">{job.teaser}</span>
                    </span>
                    <svg
                      className={`mt-2 h-4 w-4 flex-none text-[#57C7FF] transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                      viewBox="0 0 12 12"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path d="M2.5 4.5 6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>

                  <div className={`grid transition-all duration-300 ease-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                    <div className="overflow-hidden">
                      <div className="border-t border-[#E1E4E8] px-5 pb-6 pt-5 sm:px-7">
                        <div className="mb-5 flex flex-wrap gap-2">
                          <span className="rounded-full bg-[#F1F3F5] px-3 py-[6px] text-[12.5px] font-bold text-[#0A0C10]">
                            📅 Start: {job.start}
                          </span>
                          <span className="rounded-full bg-[#F1F3F5] px-3 py-[6px] text-[12.5px] font-bold text-[#0A0C10]">
                            📍 {job.setup}
                          </span>
                          <span className="rounded-full bg-[#F1F3F5] px-3 py-[6px] text-[12.5px] font-bold text-[#0A0C10]">
                            ⏳ {job.pensum}
                          </span>
                        </div>

                        <h4 className="text-[14px] font-extrabold uppercase tracking-[0.3px] text-[#57C7FF]">
                          {job.spielfeldTitle}
                        </h4>
                        <ul className="mt-2 space-y-2">
                          {job.spielfeld.map((s) => (
                            <li key={s} className="flex items-start gap-2 text-[14px] leading-relaxed text-[#4A545F]">
                              <span className="mt-[7px] h-1.5 w-1.5 flex-none rounded-full bg-[#1F9A5E]" />
                              <span>{s}</span>
                            </li>
                          ))}
                        </ul>

                        <h4 className="mt-5 text-[14px] font-extrabold uppercase tracking-[0.3px] text-[#57C7FF]">
                          Was Sie mitbringen
                        </h4>
                        <ul className="mt-2 space-y-2">
                          {job.mitbringst.map((s) => (
                            <li key={s} className="flex items-start gap-2 text-[14px] leading-relaxed text-[#4A545F]">
                              <span className="mt-[7px] h-1.5 w-1.5 flex-none rounded-full bg-[#1F9A5E]" />
                              <span>{s}</span>
                            </li>
                          ))}
                        </ul>

                        <h4 className="mt-5 text-[14px] font-extrabold uppercase tracking-[0.3px] text-[#57C7FF]">
                          Was wir bieten
                        </h4>
                        <p className="mt-2 text-[14px] leading-relaxed text-[#4A545F]">{job.bieten}</p>

                        <button
                          type="button"
                          onClick={() => bewerbenFuer(job.title)}
                          className="mt-6 inline-flex items-center gap-2 rounded-[12px] bg-[#8FE05A] px-5 py-[12px] text-[14px] font-extrabold text-[#122400] transition hover:bg-[#A2E874]"
                        >
                          Jetzt für diese Stelle bewerben →
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Bewerbungsformular */}
      <section id="bewerbung" className="scroll-mt-20 px-4 py-14 sm:px-6" ref={formRef}>
        <div className="mx-auto max-w-[640px]">
          <div className="mb-8 text-center">
            <span className="inline-block rounded-full bg-[#1F9A5E]/12 px-[13px] py-[6px] text-[12px] font-extrabold uppercase tracking-[0.7px] text-[#57C7FF]">
              Bewerbung
            </span>
            <h2 className="mt-5 text-[clamp(24px,3.2vw,32px)] font-extrabold leading-tight tracking-[-0.4px]">
              Ihr Auftritt.
            </h2>
            <p className="mx-auto mt-3 max-w-[480px] text-[15px] leading-relaxed text-[#4A545F]">
              Ein paar Zeilen genügen – den Rest besprechen wir persönlich. Kein Bewerbungsportal, kein
              Formular-Marathon.
            </p>
          </div>

          <div className="rounded-[20px] border border-[#E1E4E8] bg-white p-6 shadow-[0_18px_48px_rgba(10,12,16,0.10)] md:p-8">
            {status === "done" ? (
              <div className="py-6 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#1F9A5E]/15 text-[#57C7FF]">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h3 className="mt-4 text-[20px] font-extrabold text-[#0A0C10]">
                  Danke{form.name ? `, ${form.name.split(" ")[0]}` : ""} – Ihre Bewerbung ist bei uns angekommen.
                </h3>
                <p className="mx-auto mt-2 max-w-[420px] text-[14px] leading-relaxed text-[#4A545F]">
                  Wir lesen jede Bewerbung persönlich und melden uns mit echtem Interesse zurück – kein
                  automatisiertes Absagen, kein Warten im Ungewissen.
                </p>
                <Link href="/" className="mt-6 inline-block rounded-[12px] bg-[#8FE05A] px-5 py-3 text-[14px] font-extrabold text-[#122400]">
                  Zur Startseite
                </Link>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-3">
                <div className="grid gap-3 sm:grid-cols-2">
                  <input
                    required
                    placeholder="Name *"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full rounded-[11px] border border-[#E1E4E8] px-4 py-3 text-[15px] outline-none transition focus:border-[#1F9A5E]"
                  />
                  <input
                    required
                    type="email"
                    placeholder="E-Mail *"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full rounded-[11px] border border-[#E1E4E8] px-4 py-3 text-[15px] outline-none transition focus:border-[#1F9A5E]"
                  />
                  <input
                    type="tel"
                    placeholder="Telefon (optional)"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full rounded-[11px] border border-[#E1E4E8] px-4 py-3 text-[15px] outline-none transition focus:border-[#1F9A5E]"
                  />
                  <input
                    placeholder="LinkedIn / Portfolio (optional)"
                    value={form.link}
                    onChange={(e) => setForm({ ...form, link: e.target.value })}
                    className="w-full rounded-[11px] border border-[#E1E4E8] px-4 py-3 text-[15px] outline-none transition focus:border-[#1F9A5E]"
                  />
                </div>
                <select
                  required
                  value={form.position}
                  onChange={(e) => setForm({ ...form, position: e.target.value })}
                  className="w-full rounded-[11px] border border-[#E1E4E8] px-4 py-3 text-[15px] text-[#0A0C10] outline-none transition focus:border-[#1F9A5E]"
                >
                  <option value="">Für welche Stelle? *</option>
                  {KARRIERE_JOBS.map((job) => (
                    <option key={job.slug} value={job.title}>
                      {job.title}
                    </option>
                  ))}
                </select>
                <textarea
                  rows={4}
                  placeholder="Ein paar Zeilen zu Ihnen (optional)"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full rounded-[11px] border border-[#E1E4E8] px-4 py-3 text-[15px] outline-none transition focus:border-[#1F9A5E]"
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
                <label className="flex items-start gap-2 text-[12px] leading-snug text-[#4A545F]">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-0.5 accent-[#1F9A5E]"
                  />
                  Ich bin einverstanden, dass AgenticIT meine Angaben zur Bearbeitung meiner Bewerbung verwendet
                  (DSG-konform).
                </label>
                {status === "error" ? (
                  <p className="text-[13px] font-bold text-red-600">
                    Senden fehlgeschlagen. Bitte erneut versuchen oder direkt an {EMAIL} schreiben.
                  </p>
                ) : null}
                <button
                  type="submit"
                  disabled={!valid || status === "loading"}
                  className="flex w-full items-center justify-center gap-2 rounded-[13px] bg-[#8FE05A] py-[15px] text-[16px] font-extrabold text-[#122400] transition hover:bg-[#A2E874] disabled:opacity-50"
                >
                  <Send className="h-[18px] w-[18px]" />
                  {status === "loading" ? "Wird gesendet …" : "Bewerbung senden"}
                </button>
                <p className="text-center text-[11px] text-[#8B94A1]">
                  Hinweis: Bewerbungen laufen in unsere Zoho-People-Pipeline. Jede Rückmeldung wird von einem
                  Menschen gelesen und beantwortet – kein Auto-Reject durch eine KI.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      <footer className="bg-[#0A0C10] py-12 text-[#A8B2BD]">
        <div className="mx-auto grid max-w-[1120px] gap-10 px-4 sm:px-6 md:grid-cols-[1.5fr_1fr_1fr]">
          <div className="max-w-[340px]">
            <div className="text-[20px] font-extrabold text-white">
              Agentic<span className="text-[#57C7FF]">IT</span>
            </div>
            <p className="mt-3 text-[13.5px] leading-relaxed text-[#98A2AD]">
              Wir suchen Menschen, die lieber Agenten dirigieren als Formulare ausfüllen.
            </p>
            <a
              href="https://www.swissict.ch"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex flex-col items-center opacity-75 transition hover:opacity-100"
              title="swissICT – Schweizer Fachverband für IT & Kommunikationstechnologie"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logos/swissict-white.png"
                alt="swissICT – Schweizer Fachverband für IT & Kommunikationstechnologie"
                className="h-10 w-auto object-contain"
              />
              <span className="mt-2 text-center text-[11px] leading-snug text-[#9AA6B2]">
                Schweizer Fachverband für IT &amp;
                <br />
                Kommunikationstechnologie
              </span>
            </a>
          </div>
          <div>
            <b className="mb-[10px] block text-[13px] tracking-[0.3px] text-white">KONTAKT</b>
            <a href={`tel:${PHONE_TEL}`} className="block py-[3px] text-[#98A2AD] hover:text-white">
              {PHONE_LABEL}
            </a>
            <a href={`mailto:${EMAIL}`} className="block py-[3px] text-[#98A2AD] hover:text-white">
              {EMAIL}
            </a>
            <Link href="/kontakt" className="mt-1 block py-[3px] font-semibold text-[#57C7FF] hover:text-white">
              Zum Kontaktformular →
            </Link>
          </div>
          <div>
            <b className="mb-[10px] block text-[13px] tracking-[0.3px] text-white">UNTERNEHMEN</b>
            <Link href="/" className="block py-[3px] text-[#98A2AD] hover:text-white">Startseite</Link>
            <Link href="/blog" className="block py-[3px] text-[#98A2AD] hover:text-white">Blog</Link>
            <Link href="/sicherheit" className="block py-[3px] text-[#98A2AD] hover:text-white">Sicherheit</Link>
            <Link href="/datenschutz" className="block py-[3px] text-[#98A2AD] hover:text-white">Datenschutz</Link>
            <Link href="/impressum" className="block py-[3px] text-[#98A2AD] hover:text-white">Impressum</Link>
          </div>
        </div>
        <div className="mx-auto mt-5 max-w-[1120px] px-4 text-[12px] text-[#6B7683] sm:px-6">
          <p>© 2026 AgenticIT · Postfach · 3072 Ostermundigen · Alle Rechte vorbehalten.</p>
          <p className="mt-1">{SITE_TRUST_LINE}</p>
        </div>
      </footer>
    </main>
  )
}
