"use client"

// Design-System "Carbon & Signal" (26.07.2026) — Bait-Stufe der Value Ladder.
// Eigene Landingpage für den Potenzialrechner; die Startseite bleibt bewusst
// unangetastet (Hero und Farbe in Ruhe lassen).
// Quelle der Copy: Webseite/Master/AgenticIT-Conversion-Funnel.md

import type { FormEvent } from "react"
import { useEffect, useMemo, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { AlertCircle, Loader2, Phone } from "lucide-react"
import { CarbonHeader } from "@/components/site/carbon-header"
import { CarbonFooter } from "@/components/site/carbon-footer"
import { Reveal } from "@/components/site/reveal"
import { demandByIndustry, getDemand } from "@/lib/demand-data"
import { industries, getIndustryByValue } from "@/lib/lead-pricing"
import {
  GOAL_OPTIONS,
  POTENZIAL_BRIDGE,
  POTENZIAL_CALC,
  POTENZIAL_FORM,
  POTENZIAL_HERO,
} from "@/lib/potenzial-content"

// Nur Branchen anzeigen, für die eine Nachfrage-Zahl hinterlegt ist – plus
// "Sonstige" als Auffangoption (dort ermitteln wir die Zahl im Gespräch).
const CALC_INDUSTRIES = industries.filter((i) => Boolean(demandByIndustry[i.value]))

const GTM_CYAN = "#57C7FF"

function Eyebrow({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <span
      className={`font-[family-name:var(--font-mono-signal)] text-[11px] font-semibold uppercase tracking-[0.22em] ${
        dark ? "text-[#57C7FF]" : "text-[#57C7FF]"
      }`}
    >
      {children}
    </span>
  )
}

/** Zählt eine Zahl in ~900 ms hoch (Mikro-Commitment sichtbar machen). */
function CountUp({ value }: { value: number }) {
  const [shown, setShown] = useState(0)
  const frame = useRef<number | null>(null)

  useEffect(() => {
    if (value <= 0) {
      setShown(0)
      return
    }
    const start = performance.now()
    const from = 0
    const duration = 900

    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1)
      // easeOutCubic – schnell hoch, sanft aus
      const eased = 1 - Math.pow(1 - p, 3)
      setShown(Math.round(from + (value - from) * eased))
      if (p < 1) frame.current = requestAnimationFrame(tick)
    }

    frame.current = requestAnimationFrame(tick)
    return () => {
      if (frame.current) cancelAnimationFrame(frame.current)
    }
  }, [value])

  return <>{shown.toLocaleString("de-CH")}</>
}

export function PotenzialPage() {
  const router = useRouter()
  const [industry, setIndustry] = useState("")
  const [state, setState] = useState<"idle" | "loading" | "error">("idle")
  const [errorMsg, setErrorMsg] = useState("")

  const selected = industry ? getIndustryByValue(industry) : null
  const demand = useMemo(() => (industry ? getDemand(industry) : null), [industry])
  const hasNumber = Boolean(demand && demand.monthlySearches > 0)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setState("loading")
    setErrorMsg("")

    const data = new FormData(event.currentTarget)
    const payload = {
      source: "potenzial" as const,
      name: `${String(data.get("firstName") || "").trim()} ${String(data.get("lastName") || "").trim()}`.trim(),
      email: String(data.get("email") || "").trim(),
      phone: String(data.get("phone") || "").trim(),
      industry: selected?.label ?? "",
      leadPrice: selected?.leadPrice,
      goal: String(data.get("goal") || ""),
      consent: data.get("consent") === "on",
      // Honeypot – nur Bots füllen dieses Feld aus.
      company_website: String(data.get("company_website") || ""),
    }

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => null)
        throw new Error(body?.message || POTENZIAL_FORM.errorLabel)
      }
      router.push("/danke")
    } catch (err) {
      setState("error")
      setErrorMsg(err instanceof Error ? err.message : POTENZIAL_FORM.errorLabel)
    }
  }

  return (
    <main className="min-h-screen bg-[#FAFAF7] text-[#101418]">
      <CarbonHeader />

      {/* HERO — Hook A, flach Carbon, keine Verläufe/Glow (R4) */}
      <section className="bg-[#0A0C10] px-5 pb-14 pt-16 sm:px-6 sm:pb-16 sm:pt-20">
        <div className="mx-auto flex w-full max-w-[860px] flex-col items-center text-center">
          <nav aria-label="Brotkrumen" className="mb-5 font-[family-name:var(--font-carbon-text)] text-[12px] font-medium text-[#6B7480]">
            <Link href="/" className="hover:text-white">Start</Link>
            <span className="mx-2 text-white/20">/</span>
            <span className="text-[#B9C2CE]">Potenzialrechner</span>
          </nav>
          <Eyebrow dark>{POTENZIAL_HERO.eyebrow}</Eyebrow>
          <h1 className="mt-4 max-w-[720px] font-[family-name:var(--font-display)] text-[clamp(30px,5.6vw,46px)] font-bold leading-[1.05] tracking-[-0.02em] text-white">
            {POTENZIAL_HERO.h1}{" "}
            <em className="not-italic text-[#57C7FF]">{POTENZIAL_HERO.h1Accent}</em>
          </h1>
          <p className="mt-5 max-w-[620px] font-[family-name:var(--font-carbon-text)] text-[clamp(15px,3.5vw,18px)] leading-relaxed text-[#B9C2CE]">
            {POTENZIAL_HERO.lead}
          </p>
          <p className="mt-3 max-w-[620px] font-[family-name:var(--font-carbon-text)] text-[clamp(15px,3.5vw,17px)] font-semibold leading-relaxed text-white">
            {POTENZIAL_HERO.offer}
          </p>
        </div>
      </section>

      {/* RECHNER — Graph/Rechner in eigenem Panel auf Carbon (R2) */}
      <section id="rechner" className="scroll-mt-20 bg-[#0A0C10] px-5 pb-20 sm:px-6 sm:pb-24">
        <div className="mx-auto w-full max-w-[860px]">
          <div className="rounded-[20px] border border-white/[0.08] bg-[#141A24] p-6 sm:p-9">
            <Eyebrow dark>{POTENZIAL_CALC.eyebrow}</Eyebrow>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-[clamp(21px,4.2vw,30px)] font-bold leading-[1.12] tracking-[-0.015em] text-white">
              {POTENZIAL_CALC.title}
            </h2>
            <p className="mt-3 max-w-[640px] font-[family-name:var(--font-carbon-text)] text-[14.5px] leading-relaxed text-[#B9C2CE]">
              {POTENZIAL_CALC.subline}
            </p>

            <label className="mt-7 block">
              <span className="mb-2 block font-[family-name:var(--font-mono-signal)] text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8B94A1]">
                {POTENZIAL_CALC.selectLabel}
              </span>
              <select
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                aria-label={POTENZIAL_CALC.selectLabel}
                className="h-[52px] w-full rounded-[11px] border border-white/[0.14] bg-[#1E2631] px-4 font-[family-name:var(--font-carbon-text)] text-[15px] text-white outline-none transition focus:border-[#8FE05A]"
              >
                <option value="" className="bg-[#1E2631]">
                  {POTENZIAL_CALC.selectPlaceholder}
                </option>
                {CALC_INDUSTRIES.map((i) => (
                  <option key={i.value} value={i.value} className="bg-[#1E2631]">
                    {i.label}
                  </option>
                ))}
              </select>
            </label>

            {/* Ergebnis-Karte auf dem Panel — Hierarchie Carbon → Panel → Karte (R2) */}
            {demand && selected ? (
              <div className="mt-6 rounded-[16px] border border-white/[0.08] bg-[#1E2631] p-6 sm:p-7">
                {hasNumber ? (
                  <>
                    <div
                      key={demand.value}
                      className="font-[family-name:var(--font-display)] text-[clamp(40px,10vw,68px)] font-bold leading-none tracking-[-0.03em]"
                      style={{ color: GTM_CYAN }}
                    >
                      <CountUp value={demand.monthlySearches} />
                    </div>
                    <div className="mt-2 font-[family-name:var(--font-mono-signal)] text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8B94A1]">
                      {POTENZIAL_CALC.searchesLabel}
                    </div>
                    <div className="mt-6 grid gap-5 border-t border-white/[0.08] pt-5 sm:grid-cols-2">
                      <div>
                        <div className="font-[family-name:var(--font-mono-signal)] text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8B94A1]">
                          {POTENZIAL_CALC.priceLabel}
                        </div>
                        <div className="mt-1 font-[family-name:var(--font-display)] text-[24px] font-bold text-white">
                          CHF {selected.leadPrice.toLocaleString("de-CH")}
                        </div>
                      </div>
                      <div>
                        <div className="font-[family-name:var(--font-mono-signal)] text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8B94A1]">
                          {POTENZIAL_CALC.keywordsLabel}
                        </div>
                        <div className="mt-1 font-[family-name:var(--font-carbon-text)] text-[13.5px] leading-relaxed text-[#B9C2CE]">
                          {demand.exampleKeywords.join(" · ")}
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <p className="font-[family-name:var(--font-carbon-text)] text-[15px] leading-relaxed text-[#B9C2CE]">
                    {POTENZIAL_CALC.sonstigeNote}
                  </p>
                )}
                <a
                  href="#rueckruf"
                  className="mt-7 inline-flex rounded-[8px] bg-[#8FE05A] px-[24px] py-[14px] font-[family-name:var(--font-carbon-text)] text-[15px] font-semibold text-[#122400] transition hover:bg-[#A2E874]"
                >
                  {POTENZIAL_BRIDGE.cta}
                </a>
              </div>
            ) : null}

            <p className="mt-5 font-[family-name:var(--font-carbon-text)] text-[11.5px] leading-relaxed text-[#6B7480]">
              {POTENZIAL_CALC.sourceNote}
            </p>
          </div>
        </div>
      </section>

      {/* BRIDGE — harter Band-Schnitt Carbon → Hell (R7) */}
      <section className="px-5 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-[900px]">
          <Reveal className="mx-auto flex max-w-[680px] flex-col items-center text-center">
            <Eyebrow>{POTENZIAL_BRIDGE.eyebrow}</Eyebrow>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-[clamp(24px,4.8vw,34px)] font-bold leading-[1.1] tracking-[-0.015em]">
              {POTENZIAL_BRIDGE.headline}
            </h2>
            <p className="mt-4 max-w-[640px] font-[family-name:var(--font-carbon-text)] text-[clamp(15px,3.5vw,17px)] leading-relaxed text-[#4A545F]">
              {POTENZIAL_BRIDGE.body}
            </p>
          </Reveal>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {POTENZIAL_BRIDGE.bullets.map((b, i) => (
              <Reveal key={b} delay={i * 80} className="h-full">
                <div className="flex h-full items-start gap-3 rounded-[16px] border border-[#E1E4E8] bg-[#F1F3F5] p-5">
                  <span className="mt-[7px] h-1.5 w-1.5 flex-none rounded-full bg-[#1F9A5E]" aria-hidden="true" />
                  <span className="font-[family-name:var(--font-carbon-text)] text-[14.5px] font-medium leading-relaxed text-[#101418]">
                    {b}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* QUALIFIZIERUNG — Stufe 3, so wenig Reibung wie möglich */}
      <section id="rueckruf" className="scroll-mt-20 bg-[#F1F3F5] px-5 py-16 sm:px-6 sm:py-20">
        <Reveal className="mx-auto flex max-w-[620px] flex-col items-center text-center">
          <Eyebrow>{POTENZIAL_FORM.eyebrow}</Eyebrow>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-[clamp(24px,4.6vw,32px)] font-bold leading-[1.1] tracking-[-0.015em]">
            {POTENZIAL_FORM.title}
          </h2>
          <p className="mt-4 max-w-[520px] font-[family-name:var(--font-carbon-text)] text-[15px] leading-relaxed text-[#4A545F]">
            {POTENZIAL_FORM.microcopy}
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-7 w-full rounded-[18px] border border-[#E1E4E8] bg-white p-5 text-left sm:p-7"
          >
            {/* Honeypot: für Menschen unsichtbar, fängt Bots ab */}
            <div aria-hidden="true" className="absolute left-[-9999px] top-0 h-0 w-0 overflow-hidden">
              <label>
                Bitte dieses Feld leer lassen
                <input type="text" name="company_website" tabIndex={-1} autoComplete="off" />
              </label>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <Select
                name="industry"
                label="Branche *"
                value={industry}
                onChange={setIndustry}
                placeholder={POTENZIAL_CALC.selectPlaceholder}
                options={CALC_INDUSTRIES.map((i) => ({ value: i.value, label: i.label }))}
                required
              />
              <Select
                name="goal"
                label="Ihr Ziel *"
                placeholder="Bitte wählen"
                options={GOAL_OPTIONS.map((g) => ({ value: g, label: g }))}
                required
              />
              <Field name="firstName" label="Vorname *" autoComplete="given-name" required />
              <Field name="lastName" label="Nachname *" autoComplete="family-name" required />
              <Field name="phone" label="Telefon *" type="tel" autoComplete="tel" required />
              <Field name="email" label="Geschäftliche E-Mail *" type="email" autoComplete="email" required />
            </div>

            <label className="mt-4 flex items-start gap-2.5 font-[family-name:var(--font-carbon-text)] text-[12.5px] leading-snug text-[#4A545F]">
              <input
                type="checkbox"
                name="consent"
                required
                className="mt-0.5 size-4 flex-none accent-[#1F9A5E]"
              />
              <span>{POTENZIAL_FORM.consentLabel}</span>
            </label>

            {state === "error" ? (
              <div
                role="status"
                className="mt-4 flex items-start gap-2 rounded-[11px] border border-red-300 bg-red-50 px-3 py-3 font-[family-name:var(--font-carbon-text)] text-[13px] text-red-700"
              >
                <AlertCircle className="mt-0.5 size-4 flex-none" />
                <span>{errorMsg || POTENZIAL_FORM.errorLabel}</span>
              </div>
            ) : null}

            <button
              type="submit"
              disabled={state === "loading"}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-[13px] bg-[#8FE05A] py-[15px] font-[family-name:var(--font-carbon-text)] text-[16px] font-bold text-[#122400] transition hover:bg-[#A2E874] disabled:opacity-60"
            >
              {state === "loading" ? (
                <Loader2 className="size-[18px] animate-spin" />
              ) : (
                <Phone className="size-[18px]" />
              )}
              {state === "loading" ? POTENZIAL_FORM.submitLoadingLabel : POTENZIAL_FORM.submitLabel}
            </button>

            {/* Angst-Killer direkt unter dem Button */}
            <p className="mt-3 text-center font-[family-name:var(--font-carbon-text)] text-[12.5px] leading-relaxed text-[#4A545F]">
              {POTENZIAL_FORM.fearKiller}
            </p>
          </form>
        </Reveal>
      </section>

      <CarbonFooter />
    </main>
  )
}

const CONTROL_CLASS =
  "h-[48px] w-full rounded-[11px] border border-[#E1E4E8] bg-white px-4 font-[family-name:var(--font-carbon-text)] text-[15px] text-[#101418] outline-none transition focus:border-[#1F9A5E]"

const LABEL_CLASS =
  "mb-2 block font-[family-name:var(--font-mono-signal)] text-[10.5px] font-semibold uppercase tracking-[0.16em] text-[#4A545F]"

function Field({
  name,
  label,
  type = "text",
  required = false,
  autoComplete,
}: {
  name: string
  label: string
  type?: string
  required?: boolean
  autoComplete?: string
}) {
  return (
    <label className="block">
      <span className={LABEL_CLASS}>{label}</span>
      <input name={name} type={type} required={required} autoComplete={autoComplete} className={CONTROL_CLASS} />
    </label>
  )
}

function Select({
  name,
  label,
  options,
  placeholder,
  required = false,
  value,
  onChange,
}: {
  name: string
  label: string
  options: { value: string; label: string }[]
  placeholder: string
  required?: boolean
  value?: string
  onChange?: (value: string) => void
}) {
  const controlled = typeof value === "string" && typeof onChange === "function"

  return (
    <label className="block">
      <span className={LABEL_CLASS}>{label}</span>
      <select
        name={name}
        required={required}
        className={CONTROL_CLASS}
        {...(controlled
          ? { value, onChange: (e: React.ChangeEvent<HTMLSelectElement>) => onChange?.(e.target.value) }
          : { defaultValue: "" })}
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  )
}
