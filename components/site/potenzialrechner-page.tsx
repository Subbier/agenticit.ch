"use client"

// Potenzialrechner-Landingpage — Bait-Stufe der Value Ladder
// (Master: AgenticIT-Conversion-Funnel.md, Abschnitte 3–4).
// Design: Carbon & Signal · Daten: lib/demand-data.ts + lib/lead-pricing.ts.

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { Send } from "lucide-react"
import { SiteHeader } from "@/components/site/site-header"
import { CarbonFooter } from "@/components/site/carbon-footer"
import { demandByIndustry, getDemand } from "@/lib/demand-data"
import { getIndustryByValue } from "@/lib/lead-pricing"

const INPUT_CLASS =
  "w-full rounded-[10px] border border-[#E1E4E8] px-4 py-3 text-[15px] outline-none transition focus:border-[#1F9A5E]"

const ZIELE = ["Mehr Anfragen", "Planbarer Umsatz", "Zeit gewinnen", "Weiss noch nicht"]

const BRANCHEN = Object.values(demandByIndustry)

/** Zahl animiert hochzählen (Rechner-Moment: die Nachfrage wird sichtbar). */
function useCountUp(target: number, durationMs = 900) {
  const [value, setValue] = useState(0)
  const raf = useRef<number>(0)
  useEffect(() => {
    cancelAnimationFrame(raf.current)
    const start = performance.now()
    const from = 0
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs)
      const eased = 1 - Math.pow(1 - t, 3)
      setValue(Math.round(from + (target - from) * eased))
      if (t < 1) raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf.current)
  }, [target, durationMs])
  return value
}

function fmt(n: number): string {
  return n.toLocaleString("de-CH").replace(/,/g, "'")
}

export function PotenzialrechnerSection({ showHero = true }: { showHero?: boolean }) {
  // Kompakt-Variante für die Startseite: ohne eigenes Formular und ohne
  // Vertrauens-Bullets — der CTA führt ans einzige Kontaktformular der Website.
  const compact = !showHero
  const router = useRouter()
  const [selected, setSelected] = useState<string | null>(null)
  const [form, setForm] = useState({ firstName: "", lastName: "", phone: "", email: "", goal: "" })
  const [consent, setConsent] = useState(false)
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle")
  const [honey, setHoney] = useState("")
  const formRef = useRef<HTMLElement>(null)

  const demand = selected ? getDemand(selected) : null
  const pricing = selected ? getIndustryByValue(selected) : null
  const animated = useCountUp(demand?.monthlySearches ?? 0)

  const valid =
    form.firstName.trim().length >= 2 &&
    form.lastName.trim().length >= 2 &&
    form.phone.trim().length >= 7 &&
    /\S+@\S+\.\S+/.test(form.email) &&
    selected !== null &&
    consent

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!valid || !demand || !pricing) return
    setStatus("loading")
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          source: "potenzialrechner",
          name: `${form.firstName.trim()} ${form.lastName.trim()}`,
          email: form.email.trim(),
          phone: form.phone.trim(),
          industry: demand.label,
          leadPrice: pricing.leadPrice,
          goal: form.goal || undefined,
          consent: true,
          company_website: honey,
        }),
      })
      if (!res.ok) throw new Error("failed")
      router.push("/danke")
    } catch {
      setStatus("error")
    }
  }

  return (
    <>
      {showHero ? (
        /* ATTENTION — dunkler Kopf (Funnel §3, Überschrift + Subline) */
        <section className="bg-[#0A0C10] px-5 pb-14 pt-14 text-center sm:px-6 sm:pb-16 sm:pt-20">
          <div className="mx-auto max-w-[820px]">
            <span className="font-[family-name:var(--font-mono-signal)] text-[11.5px] font-semibold uppercase tracking-[0.22em] text-[#57C7FF]">
              Potenzialrechner · Kostenlos
            </span>
            <h1 className="mx-auto mt-4 max-w-[760px] text-[clamp(30px,5vw,48px)] font-bold leading-[1.08] tracking-[-0.015em] text-white">
              Sehen Sie die Nachfrage in Ihrer Branche — <span className="text-[#57C7FF] italic">bevor es Ihre Konkurrenz tut.</span>
            </h1>
            <p className="mx-auto mt-5 max-w-[620px] text-[clamp(15px,2vw,17.5px)] leading-relaxed text-[#A8B2BD]">
              Wählen Sie Ihre Branche. Sie sehen sofort, wie viele Menschen in der Schweiz jeden Monat danach suchen —
              und was eine Kundenanfrage in Ihrem Markt wert ist.
            </p>
          </div>
        </section>
      ) : (
        /* Startseiten-Variante: heller Einstieg, Überschrift als h2 (nur ein h1 pro Seite) */
        <section className="bg-white px-5 pt-10 text-center sm:px-6 sm:pt-12">
          <div className="mx-auto max-w-[820px]">
            <span className="font-[family-name:var(--font-mono-signal)] text-[11.5px] font-semibold uppercase tracking-[0.22em] text-[#57C7FF]">
              Potenzialrechner · Kostenlos
            </span>
            <h2 className="mx-auto mt-4 max-w-[760px] text-[clamp(26px,4vw,40px)] font-bold leading-[1.08] tracking-[-0.015em] text-[#0A0C10]">
              Sehen Sie die Nachfrage in Ihrer Branche — <span className="text-[#57C7FF] italic">bevor es Ihre Konkurrenz tut.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-[620px] text-[clamp(15px,2vw,17.5px)] leading-relaxed text-[#4A545F]">
              Wählen Sie Ihre Branche. Sie sehen sofort, wie viele Menschen in der Schweiz jeden Monat danach suchen —
              und was eine Kundenanfrage in Ihrem Markt wert ist.
            </p>
          </div>
        </section>
      )}

      {/* BAIT — der Rechner */}
      <section className={compact ? "px-5 py-8 sm:px-6 sm:py-10" : "px-5 py-14 sm:px-6"} id="rechner">
        <div className="mx-auto max-w-[880px]">
          <div className="mb-6 text-center">
            <span className="font-[family-name:var(--font-mono-signal)] text-[11px] font-semibold uppercase tracking-[0.2em] text-[#57C7FF]">
              {compact ? "Branche wählen" : "Schritt 1 von 2"}
            </span>
            <h2 className="mt-2 text-[clamp(20px,3vw,26px)] font-bold tracking-[-0.015em]">Ihre Branche:</h2>
          </div>
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-5">
            {BRANCHEN.map((b) => {
              const isOn = selected === b.value
              return (
                <button
                  key={b.value}
                  type="button"
                  onClick={() => setSelected(b.value)}
                  className={`rounded-[10px] border px-3 py-3 text-[13.5px] font-semibold leading-tight transition ${
                    isOn
                      ? "border-[#8FE05A] bg-[#8FE05A] text-[#122400]"
                      : "border-[#E1E4E8] bg-[#F1F3F5] text-[#0A0C10] hover:border-[#1F9A5E]"
                  }`}
                >
                  {b.label}
                </button>
              )
            })}
          </div>

          {/* Ergebnis: dunkles Panel, Zahl in Cyan (Daten-Farbe) */}
          {demand && demand.monthlySearches > 0 ? (
            <div className="mt-8 rounded-[16px] bg-[#141A24] p-7 text-center sm:p-9">
              <div className="font-[family-name:var(--font-mono-signal)] text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8B94A1]">
                Monatliche Suchanfragen · Deutschschweiz
              </div>
              <div className="mt-2 text-[clamp(44px,8vw,72px)] font-bold leading-none tracking-[-0.02em] text-[#57C7FF]">
                {fmt(animated)}
              </div>
              <div className="mx-auto mt-4 flex max-w-[520px] flex-wrap items-center justify-center gap-2">
                {demand.exampleKeywords.map((k) => (
                  <span key={k} className="rounded-[6px] border border-white/10 px-2.5 py-1 font-[family-name:var(--font-mono-signal)] text-[11.5px] text-[#A8B2BD]">
                    {k}
                  </span>
                ))}
              </div>
              {pricing ? (
                <p className="mt-5 text-[14.5px] text-[#A8B2BD]">
                  Richtwert pro Kundenanfrage in Ihrem Markt:{" "}
                  <b className="text-[#57C7FF]">CHF {pricing.leadPrice}</b>
                </p>
              ) : null}
              <p className="mt-1 text-[12px] text-[#6B7683]">Quelle: Semrush (DB ch), Stand Q2 2026 · quartalsweise aktualisiert</p>
            </div>
          ) : null}
          {demand && demand.monthlySearches === 0 ? (
            <div className="mt-8 rounded-[16px] bg-[#141A24] p-7 text-center sm:p-9">
              <p className="text-[16px] font-semibold text-white">
                Für Ihre Branche ermitteln wir die genaue Nachfrage persönlich.
              </p>
              <p className="mt-2 text-[14px] text-[#A8B2BD]">
                Hinterlassen Sie unten Ihre Angaben — wir bringen die echten Suchzahlen mit in den Rückruf.
              </p>
            </div>
          ) : null}

          {/* BRIDGE (Funnel §3, Ergebnis-Block) */}
          {demand && demand.monthlySearches > 0 ? (
            <div className="mx-auto mt-8 max-w-[680px] text-center">
              <h3 className="text-[clamp(19px,2.6vw,24px)] font-bold tracking-[-0.015em]">
                <span className="text-[#57C7FF]">{fmt(demand.monthlySearches)} Suchanfragen pro Monat.</span> Das ist
                keine Schätzung — das sind echte Menschen mit konkretem Interesse.
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-[#4A545F]">
                Die Nachfrage ist da. Die Frage ist nur: Landet sie bei Ihnen oder bei jemand anderem? In einem kurzen,
                unverbindlichen Rückruf zeigen wir Ihnen, wie Ihre Kundenreise konkret aussehen würde — und wie das
                Schnupper-Abo für Ihre Branche startet (3 Monate, keine Startkosten).
              </p>
              <a
                href={compact ? "#kontakt" : "#formular"}
                className="mt-5 inline-block rounded-[8px] bg-[#8FE05A] px-7 py-[14px] text-[15px] font-bold text-[#122400] transition hover:bg-[#A2E874]"
              >
                {compact ? "Mehr Infos anfordern" : "Unverbindlichen Rückruf anfragen"}
              </a>
            </div>
          ) : null}

          {/* Startseite: CTA auch ohne Auswahl sichtbar — führt ans einzige Kontaktformular */}
          {compact && !(demand && demand.monthlySearches > 0) ? (
            <div className="mt-8 text-center">
              <a
                href="#kontakt"
                className="inline-block rounded-[8px] bg-[#8FE05A] px-7 py-[14px] text-[15px] font-bold text-[#122400] transition hover:bg-[#A2E874]"
              >
                Mehr Infos anfordern
              </a>
            </div>
          ) : null}
        </div>
      </section>

      {/* Vertrauens-Bullets — nur auf der eigenen Landingpage */}
      {!compact && (
      <section className="border-y border-[#E1E4E8] bg-[#F1F3F5] px-5 py-12 sm:px-6">
        <div className="mx-auto grid max-w-[880px] gap-4 sm:grid-cols-2">
          {[
            "Warme, anrufbereite Anfragen statt Kaltakquise — Sie führen nur das Gespräch.",
            "Marketing, Vertrieb und Betreuung als ein System — kein Tool-Wildwuchs.",
            "Ein Experte steuert KI-Agenten — schneller und günstiger als ein 15-köpfiges Team.",
            "3 Monate testen, keine Startkosten — Sie sehen das Ergebnis, bevor Sie investieren.",
          ].map((t) => (
            <div key={t} className="flex items-start gap-3 rounded-[12px] border border-[#E1E4E8] bg-white p-4">
              <span className="mt-0.5 font-bold text-[#57C7FF]">✓</span>
              <p className="text-[14px] leading-relaxed text-[#4A545F]">{t}</p>
            </div>
          ))}
        </div>
      </section>
      )}

      {/* QUALI — Formular (Funnel §4) — nur auf der eigenen Landingpage */}
      {!compact && (
      <section id="formular" ref={formRef} className="scroll-mt-20 px-5 py-14 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-[560px]">
          <div className="mb-6 text-center">
            <span className="font-[family-name:var(--font-mono-signal)] text-[11px] font-semibold uppercase tracking-[0.2em] text-[#57C7FF]">
              Schritt 2 von 2 · Unverbindlich
            </span>
            <h2 className="mt-2 text-[clamp(20px,3vw,26px)] font-bold tracking-[-0.015em]">
              Holen Sie diese Nachfrage ab.
            </h2>
            <p className="mt-2 text-[14px] leading-relaxed text-[#4A545F]">
              Hinterlassen Sie uns kurz Ihre Angaben — wir melden uns mit einem unverbindlichen Rückruf. Kein
              Verkaufsdruck, keine Vorbereitung nötig.
            </p>
          </div>

          <form
            onSubmit={submit}
            className="rounded-[16px] border border-[#E1E4E8] bg-white p-5 shadow-[0_10px_30px_rgba(10,12,16,0.08)] sm:p-7"
          >
            <select
              required
              value={selected ?? ""}
              onChange={(e) => setSelected(e.target.value || null)}
              className={`${INPUT_CLASS} text-[#0A0C10]`}
            >
              <option value="">Branche wählen *</option>
              {BRANCHEN.map((b) => (
                <option key={b.value} value={b.value}>
                  {b.label}
                </option>
              ))}
            </select>
            <select
              value={form.goal}
              onChange={(e) => setForm({ ...form, goal: e.target.value })}
              className={`${INPUT_CLASS} mt-3 text-[#0A0C10]`}
            >
              <option value="">Ihr Ziel (optional)</option>
              {ZIELE.map((z) => (
                <option key={z} value={z}>
                  {z}
                </option>
              ))}
            </select>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
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
                required
                type="tel"
                autoComplete="tel"
                placeholder="Telefon *"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className={INPUT_CLASS}
              />
              <input
                required
                type="email"
                autoComplete="email"
                placeholder="Geschäftliche E-Mail *"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={INPUT_CLASS}
              />
            </div>
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={honey}
              onChange={(e) => setHoney(e.target.value)}
              className="absolute left-[-9999px] h-0 w-0 opacity-0"
              aria-hidden="true"
            />
            <label className="mt-3 flex items-start gap-2 text-left text-[12px] leading-snug text-[#4A545F]">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-0.5 accent-[#1F9A5E]"
              />
              Ich bin einverstanden, dass AgenticIT meine Angaben zur Bearbeitung der Anfrage nutzt (DSG-konform).
            </label>
            {status === "error" ? (
              <p className="mt-3 text-[13px] font-bold text-red-600">Senden fehlgeschlagen. Bitte erneut versuchen.</p>
            ) : null}
            <button
              type="submit"
              disabled={!valid || status === "loading"}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-[8px] bg-[#8FE05A] py-[15px] text-[16px] font-bold text-[#122400] transition hover:bg-[#A2E874] disabled:opacity-50"
            >
              <Send className="h-[18px] w-[18px]" />
              {status === "loading" ? "Wird gesendet …" : "Rückruf anfragen"}
            </button>
            <p className="mt-3 text-center text-[12px] text-[#4A545F]">
              Ein kurzer Rückruf, ein konkreter Plan für Ihre Branche — Sie entscheiden danach in Ruhe.
            </p>
          </form>
        </div>
      </section>
      )}
    </>
  )
}

export function PotenzialrechnerPage() {
  return (
    <main className="min-h-screen bg-white text-[#0A0C10]">
      <SiteHeader />
      <PotenzialrechnerSection />
      <CarbonFooter />
    </main>
  )
}
