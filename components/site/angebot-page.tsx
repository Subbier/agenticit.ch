// Design-System "Carbon & Signal" (26.07.2026) — Angebot ist im Scope des Redesigns.
import Link from "next/link"
import { CarbonHeader } from "@/components/site/carbon-header"
import { CarbonFooter } from "@/components/site/carbon-footer"
import { Reveal } from "@/components/site/reveal"
import { CtaContactForm } from "@/components/site/cta-contact-form"
import { AngebotFlywheel } from "@/components/site/angebot-flywheel"
import { ANGEBOT_AREAS, ANGEBOT_COMPLIANCE } from "@/lib/angebot-content"

// Headline-Kennzahlen über die ganze Reise (für den Desire-Block).
const JOURNEY_STATS = [
  { value: "+200%", label: "mehr Conversions", area: "Begeistern" },
  { value: "bis +20%", label: "Abschlussquote", area: "Umsetzen" },
  { value: "+25%", label: "Kundenwert (CLV)", area: "Erschaffen" },
  { value: "70%", label: "weniger Admin-Zeit", area: "Erweitern" },
]

export function AngebotPage() {
  return (
    <main className="min-h-screen bg-[#FAFAF7] text-[#101418]">
      <CarbonHeader activeSlug="angebot" />

      {/* A · ATTENTION — Hero, flach Carbon (R4/R7) */}
      <section className="bg-[#0A0C10] px-5 pb-16 pt-16 text-center sm:px-6 sm:pb-20 sm:pt-20">
        <div className="mx-auto flex max-w-[900px] flex-col items-center">
          <span className="font-[family-name:var(--font-mono-signal)] text-[11px] font-semibold uppercase tracking-[0.22em] text-[#57C7FF]">
            Unser Angebot
          </span>
          <h1 className="mx-auto mt-5 max-w-[780px] font-[family-name:var(--font-display)] text-[clamp(31px,5vw,52px)] font-bold leading-[1.06] tracking-[-0.02em] text-white">
            Ein Wachstumsmotor, der <i className="not-italic text-[#57C7FF]">die ganze Kundenreise</i> abdeckt.
          </h1>
          <p className="mx-auto mt-5 max-w-[640px] font-[family-name:var(--font-carbon-text)] text-[clamp(15px,2vw,18px)] font-medium leading-relaxed text-[#B9C2CE]">
            Gewinnen, abschliessen, binden — und ein Betrieb, der im Hintergrund über alles läuft. Vier Bereiche,
            die ineinandergreifen statt nebeneinander zu existieren.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <a
              href="#bereiche"
              className="rounded-[8px] bg-[#8FE05A] px-[26px] py-[15px] font-[family-name:var(--font-carbon-text)] text-[15px] font-semibold text-[#122400] transition hover:bg-[#A2E874]"
            >
              Bereiche entdecken ↓
            </a>
            <a
              href="#kontakt"
              className="rounded-[8px] border border-white/[0.16] px-[24px] py-[15px] font-[family-name:var(--font-carbon-text)] text-[15px] font-medium text-white/90 transition hover:border-[#8FE05A]/50 hover:text-white"
            >
              Erstgespräch sichern →
            </a>
          </div>
        </div>
      </section>

      {/* I · INTEREST — Interaktiver Wachstumsmotor */}
      <section className="bg-white px-5 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-[1120px]">
          <div className="mx-auto mb-10 max-w-[680px] text-center">
            <span className="font-[family-name:var(--font-mono-signal)] text-[11px] font-semibold uppercase tracking-[0.22em] text-[#57C7FF]">
              So greift alles ineinander
            </span>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-[clamp(24px,3.4vw,34px)] font-bold tracking-[-0.015em] text-[#101418]">
              Die Reise Ihres Kunden — als ein System.
            </h2>
            <p className="mt-3 font-[family-name:var(--font-carbon-text)] text-[16px] leading-relaxed text-[#4A545F]">
              Tippen oder fahren Sie über eine Station, um den Bereich kennenzulernen.
            </p>
          </div>
          <AngebotFlywheel />
        </div>
      </section>

      {/* D · DESIRE — Wirkung über die ganze Reise, flach Carbon */}
      <section className="bg-[#0A0C10] px-5 py-14 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-[1040px]">
          <div className="mx-auto mb-9 max-w-[680px] text-center">
            <span className="font-[family-name:var(--font-mono-signal)] text-[11px] font-semibold uppercase tracking-[0.22em] text-[#57C7FF]">
              Belegte Wirkung
            </span>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-[clamp(24px,3.6vw,34px)] font-bold tracking-[-0.015em] text-white">
              Zahlen, die für sich sprechen.
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            {JOURNEY_STATS.map((s, i) => (
              <Reveal
                key={s.label}
                delay={i * 70}
                className="rounded-[14px] border border-white/[0.1] bg-white/[0.04] p-5 text-center"
              >
                <div className="font-[family-name:var(--font-display)] text-[clamp(24px,4vw,34px)] font-bold leading-none tracking-[-0.015em] text-white">
                  {s.value}
                </div>
                <div className="mt-2 font-[family-name:var(--font-carbon-text)] text-[13px] font-medium text-[#B9C2CE]">{s.label}</div>
                <div className="mt-1 font-[family-name:var(--font-mono-signal)] text-[10.5px] font-semibold uppercase tracking-[0.14em] text-[#57C7FF]">{s.area}</div>
              </Reveal>
            ))}
          </div>
          <p className="mx-auto mt-6 max-w-[760px] text-center font-[family-name:var(--font-carbon-text)] text-[12px] leading-relaxed text-[#6B7480]">
            {ANGEBOT_COMPLIANCE}
          </p>
        </div>
      </section>

      {/* D · DESIRE — Vier Bereiche */}
      <section id="bereiche" className="scroll-mt-20 bg-[#FAFAF7] px-5 py-14 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-[1120px]">
          <div className="mx-auto mb-10 max-w-[680px] text-center">
            <span className="font-[family-name:var(--font-mono-signal)] text-[11px] font-semibold uppercase tracking-[0.22em] text-[#57C7FF]">
              Vier Bereiche, ein Wachstumsmotor
            </span>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-[clamp(24px,3.4vw,34px)] font-bold tracking-[-0.015em] text-[#101418]">
              Wählen Sie Ihren Bereich.
            </h2>
            <p className="mt-3 font-[family-name:var(--font-carbon-text)] text-[16px] leading-relaxed text-[#4A545F]">
              Jeder Bereich ist einzeln buchbar – oder als Komplett-Paket, das nahtlos zusammenspielt.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {ANGEBOT_AREAS.map((area, i) => (
              <Reveal key={area.key} delay={(i % 2) * 90}>
                <Link
                  href={`/${area.slug}`}
                  className="group flex h-full flex-col rounded-[16px] border border-[#E1E4E8] bg-white p-7 transition duration-200 hover:-translate-y-[3px]"
                  style={{ borderTop: `3px solid ${area.accent}` }}
                >
                  <div className="flex items-center gap-4">
                    <span
                      className="grid h-[52px] w-[52px] flex-none place-items-center rounded-[12px] text-[25px]"
                      style={{ background: area.accentSoft }}
                      aria-hidden="true"
                    >
                      {area.icon}
                    </span>
                    <div>
                      <div className="font-[family-name:var(--font-mono-signal)] text-[10.5px] font-semibold uppercase tracking-[0.14em]" style={{ color: area.accent }}>
                        {area.eyebrow}
                      </div>
                      <h3 className="font-[family-name:var(--font-display)] text-[20px] font-bold leading-tight text-[#101418]">
                        {area.name} <span className="text-[#8B94A1]">({area.german})</span>
                      </h3>
                    </div>
                  </div>

                  <p className="mt-4 font-[family-name:var(--font-carbon-text)] text-[15px] font-medium leading-relaxed text-[#4A545F]">{area.tagline}</p>

                  <ul className="mt-4 grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2">
                    {area.services.slice(0, 4).map((s) => (
                      <li key={s.lead} className="flex items-start gap-2 font-[family-name:var(--font-carbon-text)] text-[13.5px] font-medium text-[#101418]">
                        <span className="mt-[7px] h-1.5 w-1.5 flex-none rounded-full" style={{ background: area.accent }} aria-hidden="true" />
                        <span>{s.lead}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {area.stats.map((st) => (
                      <span
                        key={st.label}
                        className="rounded-[6px] px-2.5 py-1 font-[family-name:var(--font-carbon-text)] text-[11.5px] font-semibold"
                        style={{ background: area.accentSoft, color: area.accent }}
                      >
                        {st.value} {st.label}
                      </span>
                    ))}
                  </div>

                  <span
                    className="mt-5 inline-flex items-center gap-1 font-[family-name:var(--font-carbon-text)] text-[14px] font-semibold transition group-hover:gap-2"
                    style={{ color: area.accent }}
                  >
                    {area.navLabel} entdecken →
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* A · ACTION — CTA */}
      <section id="kontakt" className="scroll-mt-20 bg-[#F1F3F5] px-5 py-14 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-[1120px]">
          <div className="flex flex-col items-center rounded-[16px] border border-[#E1E4E8] bg-white p-8 text-center sm:p-10">
            <span className="font-[family-name:var(--font-mono-signal)] text-[11px] font-semibold uppercase tracking-[0.22em] text-[#57C7FF]">
              Unverbindlich · Persönlich
            </span>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-[clamp(26px,3.6vw,36px)] font-bold tracking-[-0.015em] text-[#101418]">
              Welcher Bereich bringt Ihnen am meisten?
            </h2>
            <p className="mt-3 max-w-[520px] font-[family-name:var(--font-carbon-text)] text-[16px] leading-relaxed text-[#4A545F]">
              Sagen Sie uns kurz, wo der Schuh drückt – wir zeigen Ihnen den grössten Hebel für Ihr Unternehmen.
            </p>
            <CtaContactForm />
          </div>
        </div>
      </section>

      <CarbonFooter />
    </main>
  )
}
