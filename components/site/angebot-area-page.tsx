// Design-System "Carbon & Signal" (26.07.2026) — Angebot ist im Scope des Redesigns.
import Link from "next/link"
import { CarbonHeader } from "@/components/site/carbon-header"
import { CarbonFooter } from "@/components/site/carbon-footer"
import { Reveal } from "@/components/site/reveal"
import { CtaContactForm } from "@/components/site/cta-contact-form"
import { AngebotAccordion } from "@/components/site/angebot-accordion"
import { AngebotChart } from "@/components/site/angebot-charts"
import { ANGEBOT_AREAS, ANGEBOT_AUSWAHL, ANGEBOT_COMPLIANCE, type AngebotArea } from "@/lib/angebot-content"
import { breadcrumbJsonLd, serviceJsonLd } from "@/lib/seo"

type CssVars = React.CSSProperties & Record<"--accent" | "--accent-soft", string>

export function AngebotAreaPage({ area }: { area: AngebotArea }) {
  const siblings = ANGEBOT_AREAS.filter((a) => a.key !== area.key)

  const accentStyle: CssVars = {
    "--accent": area.accent,
    "--accent-soft": area.accentSoft,
  }

  // Flyer-Logik: Wachstum Smaragd, Reduktion Cyan, neutral = Akzent.
  const statColor = (v: string) => (v.includes("−") ? "#57C7FF" : v.includes("+") ? "#1F9A5E" : area.accent)

  const jsonLd = [
    serviceJsonLd({ name: `${area.name} (${area.german})`, description: area.meta.description, path: `/${area.slug}` }),
    breadcrumbJsonLd([
      { name: "Start", path: "/" },
      { name: "Angebot", path: "/angebot" },
      { name: area.navLabel, path: `/${area.slug}` },
    ]),
  ]

  return (
    <main className="min-h-screen bg-[#FAFAF7] text-[#101418]" style={accentStyle}>
      {jsonLd.map((obj, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(obj) }} />
      ))}

      <CarbonHeader activeSlug={area.slug} />

      {/* HERO (hell, flach) */}
      <section className="border-b border-[#E1E4E8] bg-white px-5 pb-12 pt-9 sm:px-6 sm:pb-16 sm:pt-11">
        <div className="mx-auto max-w-[1040px]">
          <nav aria-label="Brotkrumen" className="font-[family-name:var(--font-carbon-text)] text-[12px] font-medium text-[#6B7480]">
            <Link href="/" className="hover:text-[#101418]">Start</Link>
            <span className="px-2 text-[#C7CDD4]">/</span>
            <Link href="/angebot" className="hover:text-[#101418]">Angebot</Link>
            <span className="px-2 text-[#C7CDD4]">/</span>
            <span className="text-[#101418]">{area.navLabel}</span>
          </nav>

          <div className="mt-5 flex items-center gap-4 border-t border-[#E1E4E8] pt-6">
            <span
              className="grid h-[58px] w-[58px] flex-none place-items-center rounded-[14px] text-[27px]"
              style={{ background: area.accentSoft }}
              aria-hidden="true"
            >
              {area.icon}
            </span>
            <div>
              <span className="font-[family-name:var(--font-mono-signal)] text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color: area.accent }}>
                {area.eyebrow}
              </span>
              <h1 className="mt-1 font-[family-name:var(--font-display)] text-[clamp(28px,4.6vw,42px)] font-bold leading-[1.05] tracking-[-0.02em] text-[#101418]">
                {area.name} <span style={{ color: area.accent }}>({area.german})</span>
              </h1>
            </div>
          </div>

          <p className="mt-5 max-w-[700px] font-[family-name:var(--font-carbon-text)] text-[clamp(16px,2.2vw,19px)] leading-snug text-[#4A545F]">
            {area.tagline}
          </p>

          <div className="mt-6 max-w-[760px] rounded-[12px] border border-[#E1E4E8] px-5 py-4" style={{ background: area.accentSoft }}>
            <span className="font-[family-name:var(--font-carbon-text)] text-[14px] font-semibold text-[#101418]">Ihr Nutzen: </span>
            <span className="font-[family-name:var(--font-carbon-text)] text-[15px] leading-relaxed text-[#4A545F]">{area.nutzen}</span>
          </div>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a
              href="#kontakt"
              className="rounded-[8px] bg-[#8FE05A] px-[24px] py-[13px] text-center font-[family-name:var(--font-carbon-text)] text-[15px] font-semibold text-[#122400] transition hover:bg-[#A2E874]"
            >
              Erstgespräch sichern
            </a>
            <a
              href="#details"
              className="rounded-[8px] border border-[#E1E4E8] px-[22px] py-[13px] text-center font-[family-name:var(--font-carbon-text)] text-[15px] font-medium text-[#101418] transition hover:border-[color:var(--accent)] hover:text-[color:var(--accent)]"
            >
              Alle Leistungen ansehen →
            </a>
          </div>
        </div>
      </section>

      {/* BELEGTE WIRKUNG · ROI */}
      <section className="bg-[#FAFAF7] px-5 py-14 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-[1040px]">
          <div className="mb-7">
            <span className="font-[family-name:var(--font-mono-signal)] text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8B94A1]">
              Belegte Wirkung · Ihr Return on Invest
            </span>
            <h2 className="mt-1.5 font-[family-name:var(--font-display)] text-[clamp(22px,3.2vw,30px)] font-bold tracking-[-0.015em] text-[#101418]">Was es bringt.</h2>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.05fr_0.95fr]">
            <Reveal className="rounded-[14px] border border-[#E1E4E8] bg-white p-6 sm:p-7">
              <div className="mb-4 flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: area.accent }} aria-hidden="true" />
                <span className="font-[family-name:var(--font-carbon-text)] text-[13px] font-semibold text-[#101418]">{area.chart.title}</span>
              </div>
              <AngebotChart chart={area.chart} accent={area.accent} />
            </Reveal>

            <Reveal delay={120} className="rounded-[14px] border border-[#E1E4E8] bg-white px-6 py-3 sm:px-7">
              <div className="border-b border-[#E1E4E8] pb-3 pt-2 font-[family-name:var(--font-carbon-text)] text-[13px] font-semibold text-[#101418]">
                Was es bringt <span className="font-normal text-[#8B94A1]">(Studien-Richtwerte)</span>
              </div>
              <div className="divide-y divide-[#E1E4E8]">
                {area.stats.map((s) => (
                  <div key={s.label} className="py-[18px]">
                    <div
                      className="font-[family-name:var(--font-display)] text-[clamp(28px,4.4vw,38px)] font-bold leading-none tracking-[-0.02em]"
                      style={{ color: statColor(s.value) }}
                    >
                      {s.value}
                    </div>
                    <div className="mt-2 font-[family-name:var(--font-carbon-text)] text-[14.5px] font-semibold text-[#101418]">
                      {s.label}
                      {s.source ? (
                        <span className="ml-2 font-[family-name:var(--font-carbon-text)] text-[12px] font-normal italic text-[#8B94A1]">Quelle: {s.source}</span>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <p className="mt-6 max-w-[820px] font-[family-name:var(--font-carbon-text)] text-[12px] leading-relaxed text-[#8B94A1]">{ANGEBOT_COMPLIANCE}</p>
        </div>
      </section>

      {/* IHRE SERVICES (AUSWAHL) */}
      <section className="bg-[#FAFAF7] px-5 pb-2 sm:px-6">
        <div className="mx-auto max-w-[1040px]">
          <div className="mb-6 border-t border-[#E1E4E8] pt-8">
            <span className="font-[family-name:var(--font-mono-signal)] text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8B94A1]">
              Ihre Services (Auswahl) — alle im Detail unten
            </span>
          </div>
          <div className="grid grid-cols-1 gap-x-10 gap-y-[18px] sm:grid-cols-2">
            {ANGEBOT_AUSWAHL[area.key].map((s) => (
              <div key={s.lead} className="flex items-start gap-3">
                <span className="mt-[6px] h-2.5 w-2.5 flex-none rounded-[3px]" style={{ background: area.accent }} aria-hidden="true" />
                <div>
                  <div className="font-[family-name:var(--font-carbon-text)] text-[15px] font-semibold text-[#101418]">{s.lead}</div>
                  <div className="mt-0.5 font-[family-name:var(--font-carbon-text)] text-[13.5px] leading-snug text-[#4A545F]">{s.text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA-BAR */}
      <section className="bg-[#FAFAF7] px-5 py-10 sm:px-6">
        <div className="mx-auto max-w-[1040px]">
          <div className="rounded-[14px] border border-[#E1E4E8] px-6 py-7 text-center sm:px-8" style={{ background: area.accentSoft }}>
            <p className="font-[family-name:var(--font-display)] text-[clamp(18px,2.6vw,24px)] font-bold text-[#101418]">
              Welcher Hebel bringt Ihnen am meisten?{" "}
              <a href="#kontakt" className="underline-offset-2 hover:underline" style={{ color: area.accent }}>
                Sprechen wir darüber.
              </a>
            </p>
            <p className="mt-2 font-[family-name:var(--font-carbon-text)] text-[13px] text-[#4A545F]">
              <span className="font-semibold text-[#101418]">AgenticIT</span> ·{" "}
              <a href="mailto:info@agenticit.ch" className="hover:text-[#101418]">info@agenticit.ch</a> · alle 60+ Services in
              der Leistungsübersicht «KI &amp; Agentic Services»
            </p>
          </div>
        </div>
      </section>

      {/* ALLE LEISTUNGEN */}
      <section id="details" className="scroll-mt-20 bg-white px-5 py-14 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-[1000px]">
          <div className="mx-auto mb-9 max-w-[680px] text-center">
            <span className="font-[family-name:var(--font-mono-signal)] text-[11px] font-semibold uppercase tracking-[0.18em] text-[#57C7FF]">
              KI &amp; Agentic Services
            </span>
            <h2 className="mt-2 font-[family-name:var(--font-display)] text-[clamp(22px,3.2vw,30px)] font-bold tracking-[-0.015em] text-[#101418]">
              Alle Leistungen im Detail.
            </h2>
            <p className="mt-3 font-[family-name:var(--font-carbon-text)] text-[15px] text-[#4A545F]">
              {area.services.length} Leistungen – tippen Sie auf eine, um die Erklärung aufzuklappen.
            </p>
          </div>
          <AngebotAccordion items={area.services.map((s) => ({ q: s.lead, a: s.long }))} accent={area.accent} />
        </div>
      </section>

      {/* WEITER IM ANGEBOT */}
      <section className="bg-white px-5 py-14 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-[1000px]">
          <div className="mx-auto mb-8 max-w-[680px] text-center">
            <span className="font-[family-name:var(--font-mono-signal)] text-[11px] font-semibold uppercase tracking-[0.18em] text-[#57C7FF]">Die ganze Reise</span>
            <h2 className="mt-2 font-[family-name:var(--font-display)] text-[clamp(22px,3.2vw,30px)] font-bold tracking-[-0.015em] text-[#101418]">Weiter im Angebot.</h2>
          </div>
          <div className="grid grid-cols-1 gap-[14px] sm:grid-cols-3">
            {siblings.map((s) => (
              <Link
                key={s.key}
                href={`/${s.slug}`}
                className="group flex h-full flex-col rounded-[14px] border border-[#E1E4E8] bg-[#F1F3F5] p-5 transition duration-200 hover:-translate-y-[2px]"
              >
                <div className="grid h-[42px] w-[42px] place-items-center rounded-[10px] text-[20px]" style={{ background: s.accentSoft }} aria-hidden="true">
                  {s.icon}
                </div>
                <div className="mt-3 font-[family-name:var(--font-carbon-text)] text-[16px] font-semibold text-[#101418]">
                  {s.name} <span className="text-[#8B94A1]">({s.german})</span>
                </div>
                <div className="mt-1 flex-1 font-[family-name:var(--font-carbon-text)] text-[13.5px] text-[#4A545F]">{s.eyebrow}</div>
                <span className="mt-3 font-[family-name:var(--font-carbon-text)] text-[13px] font-semibold" style={{ color: s.accent }}>
                  Ansehen →
                </span>
              </Link>
            ))}
          </div>
          <div className="mt-7 text-center">
            <Link href="/angebot" className="font-[family-name:var(--font-carbon-text)] text-[14px] font-semibold text-[#57C7FF] hover:underline">
              ← Zur Angebot-Übersicht
            </Link>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section id="kontakt" className="scroll-mt-20 bg-[#F1F3F5] px-5 py-14 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-[1000px]">
          <div className="flex flex-col items-center rounded-[16px] border border-[#E1E4E8] bg-white p-8 text-center sm:p-10">
            <span className="font-[family-name:var(--font-mono-signal)] text-[11px] font-semibold uppercase tracking-[0.18em] text-[#57C7FF]">
              Unverbindlich · Persönlich
            </span>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-[clamp(24px,3.6vw,34px)] font-bold tracking-[-0.015em] text-[#101418]">
              Welcher Hebel bringt Ihnen am meisten?
            </h2>
            <p className="mt-3 max-w-[520px] font-[family-name:var(--font-carbon-text)] text-[16px] leading-relaxed text-[#4A545F]">
              Sprechen wir darüber. Hinterlassen Sie kurz Ihre Angaben – wir melden uns persönlich.
            </p>
            <CtaContactForm />
          </div>
        </div>
      </section>

      <CarbonFooter />
    </main>
  )
}
