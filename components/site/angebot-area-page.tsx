import Link from "next/link"
import { SiteHeader } from "@/components/site/site-header"
import { Reveal } from "@/components/site/reveal"
import { CtaContactForm } from "@/components/site/cta-contact-form"
import { AngebotAccordion } from "@/components/site/angebot-accordion"
import { AngebotChart } from "@/components/site/angebot-charts"
import { ANGEBOT_AREAS, ANGEBOT_AUSWAHL, ANGEBOT_COMPLIANCE, type AngebotArea } from "@/lib/angebot-content"
import { SITE_TRUST_LINE } from "@/lib/site-trust-line"
import { breadcrumbJsonLd, serviceJsonLd } from "@/lib/seo"

type CssVars = React.CSSProperties & Record<"--accent" | "--accent-soft", string>

export function AngebotAreaPage({ area }: { area: AngebotArea }) {
  const siblings = ANGEBOT_AREAS.filter((a) => a.key !== area.key)

  const accentStyle: CssVars = {
    "--accent": area.accent,
    "--accent-soft": area.accentSoft,
  }

  // Flyer-Logik: Wachstum grün, Reduktion warm/orange, neutral = Akzent.
  const statColor = (v: string) => (v.includes("−") ? "#E8722B" : v.includes("+") ? "#16A34A" : area.accent)
  const serif = { fontFamily: "Georgia, 'Times New Roman', serif" }

  const jsonLd = [
    serviceJsonLd({ name: `${area.name} (${area.german})`, description: area.meta.description, path: `/${area.slug}` }),
    breadcrumbJsonLd([
      { name: "Start", path: "/" },
      { name: "Angebot", path: "/angebot" },
      { name: area.navLabel, path: `/${area.slug}` },
    ]),
  ]

  return (
    <main className="min-h-screen bg-white text-[#0B1F3A]" style={accentStyle}>
      {jsonLd.map((obj, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(obj) }} />
      ))}

      <SiteHeader activeSlug={area.slug} />

      {/* FLYER-HERO (hell, im Stil des Leistungs-Flyers) */}
      <section className="relative overflow-hidden border-b border-[#E3E9F2] bg-white px-5 pb-12 pt-9 sm:px-6 sm:pb-16 sm:pt-11">
        {/* dezente Outline-Kreise oben rechts – wie auf dem Flyer */}
        <div className="pointer-events-none absolute right-[-70px] top-[-70px] hidden sm:block" aria-hidden="true">
          <div className="h-[280px] w-[280px] rounded-full border border-[#E9EEF5]" />
          <div
            className="absolute right-[46px] top-[46px] h-[190px] w-[190px] rounded-full border"
            style={{ borderColor: `${area.accent}30` }}
          />
        </div>

        <div className="relative mx-auto max-w-[1040px]">
          {/* Briefkopf-Zeile */}
          <div className="flex items-center justify-between border-b border-[#E3E9F2] pb-4">
            <div className="flex items-baseline gap-3">
              <span className="text-[17px] font-extrabold tracking-[-0.3px] text-[#0B1F3A]">
                Agentic<span className="text-[#16C7C0]">IT</span>
              </span>
              <span className="hidden text-[10px] font-bold uppercase tracking-[1.3px] text-[#9aa7ba] sm:inline">
                Agentic RevOps · KI &amp; Data Intelligence
              </span>
            </div>
            <span className="text-[11px] font-extrabold uppercase tracking-[1.4px]" style={{ color: area.accent }}>
              Leistungs-Übersicht
            </span>
          </div>

          {/* Brotkrumen */}
          <nav aria-label="Brotkrumen" className="mt-5 text-[12px] font-semibold text-[#8294ad]">
            <Link href="/" className="hover:text-[#0B1F3A]">Start</Link>
            <span className="px-2 text-[#cbd5e1]">/</span>
            <Link href="/angebot" className="hover:text-[#0B1F3A]">Angebot</Link>
            <span className="px-2 text-[#cbd5e1]">/</span>
            <span className="text-[#0B1F3A]">{area.navLabel}</span>
          </nav>

          {/* Titelblock */}
          <div className="mt-5 flex items-center gap-4">
            <span
              className="grid h-[60px] w-[60px] flex-none place-items-center rounded-[16px] text-[28px]"
              style={{ background: area.accentSoft }}
              aria-hidden="true"
            >
              {area.icon}
            </span>
            <div>
              <span className="text-[12px] font-extrabold uppercase tracking-[1px]" style={{ color: area.accent }}>
                {area.eyebrow}
              </span>
              <h1
                className="mt-1 text-[clamp(28px,4.6vw,44px)] font-bold leading-[1.05] tracking-[-0.5px] text-[#0B1F3A]"
                style={serif}
              >
                {area.name} <span style={{ color: area.accent }}>({area.german})</span>
              </h1>
            </div>
          </div>

          <p className="mt-5 max-w-[700px] text-[clamp(17px,2.4vw,23px)] italic leading-snug text-[#314866]" style={serif}>
            {area.tagline}
          </p>

          {/* Ihr Nutzen */}
          <div className="mt-6 max-w-[760px] rounded-[14px] px-5 py-4" style={{ background: area.accentSoft }}>
            <span className="text-[14px] font-extrabold text-[#0B1F3A]">Ihr Nutzen: </span>
            <span className="text-[15px] leading-relaxed text-[#314866]">{area.nutzen}</span>
          </div>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a
              href="#kontakt"
              className="rounded-[12px] bg-gradient-to-br from-[#3BD974] to-[#22C55E] px-[24px] py-[13px] text-center text-[15px] font-extrabold text-white shadow-[0_10px_24px_rgba(34,197,94,0.28)] transition hover:-translate-y-[1px]"
            >
              Erstgespräch sichern
            </a>
            <a
              href="#details"
              className="rounded-[12px] border border-[#D9E2EE] px-[22px] py-[13px] text-center text-[15px] font-extrabold text-[#0B1F3A] transition hover:border-[color:var(--accent)] hover:text-[color:var(--accent)]"
            >
              Alle Leistungen ansehen →
            </a>
          </div>
        </div>
      </section>

      {/* BELEGTE WIRKUNG · ROI (Chart + Kennzahlen – zwei Panels wie im Flyer) */}
      <section className="px-5 py-14 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-[1040px]">
          <div className="mb-7">
            <span className="text-[12px] font-extrabold uppercase tracking-[1px] text-[#8294ad]">
              Belegte Wirkung · Ihr Return on Invest
            </span>
            <h2 className="mt-1.5 text-[clamp(22px,3.2vw,30px)] font-extrabold tracking-[-0.4px]">Was es bringt.</h2>
          </div>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.05fr_0.95fr]">
            {/* Chart-Panel */}
            <Reveal className="rounded-[18px] border border-[#E3E9F2] bg-white p-6 shadow-[0_8px_24px_rgba(11,31,58,0.06)] sm:p-7">
              <div className="mb-4 flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: area.accent }} aria-hidden="true" />
                <span className="text-[13px] font-extrabold text-[#0B1F3A]">{area.chart.title}</span>
              </div>
              <AngebotChart chart={area.chart} accent={area.accent} />
            </Reveal>

            {/* Kennzahlen-Panel */}
            <Reveal
              delay={120}
              className="rounded-[18px] border border-[#E3E9F2] bg-white px-6 py-3 shadow-[0_8px_24px_rgba(11,31,58,0.06)] sm:px-7"
            >
              <div className="border-b border-[#EEF2F7] pb-3 pt-2 text-[13px] font-extrabold text-[#0B1F3A]">
                Was es bringt <span className="font-normal text-[#8294ad]">(Studien-Richtwerte)</span>
              </div>
              <div className="divide-y divide-[#EEF2F7]">
                {area.stats.map((s) => (
                  <div key={s.label} className="py-[18px]">
                    <div
                      className="text-[clamp(28px,4.4vw,38px)] font-extrabold leading-none tracking-[-1px]"
                      style={{ color: statColor(s.value) }}
                    >
                      {s.value}
                    </div>
                    <div className="mt-2 text-[14.5px] font-bold text-[#0B1F3A]">
                      {s.label}
                      {s.source ? (
                        <span className="ml-2 text-[12px] font-normal italic text-[#8294ad]">Quelle: {s.source}</span>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <p className="mt-6 max-w-[820px] text-[12px] leading-relaxed text-[#8294ad]">{ANGEBOT_COMPLIANCE}</p>
        </div>
      </section>

      {/* IHRE SERVICES (AUSWAHL) — Flyer-Stil: saubere 2-Spalten-Liste, keine Kästen */}
      <section className="px-5 pb-2 sm:px-6">
        <div className="mx-auto max-w-[1040px]">
          <div className="mb-6 border-t border-[#E3E9F2] pt-8">
            <span className="text-[12px] font-extrabold uppercase tracking-[1px] text-[#8294ad]">
              Ihre Services (Auswahl) — alle im Detail unten
            </span>
          </div>
          <div className="grid grid-cols-1 gap-x-10 gap-y-[18px] sm:grid-cols-2">
            {ANGEBOT_AUSWAHL[area.key].map((s) => (
              <div key={s.lead} className="flex items-start gap-3">
                <span
                  className="mt-[6px] h-2.5 w-2.5 flex-none rounded-[3px]"
                  style={{ background: area.accent }}
                  aria-hidden="true"
                />
                <div>
                  <div className="text-[15px] font-bold text-[#0B1F3A]">{s.lead}</div>
                  <div className="mt-0.5 text-[13.5px] leading-snug text-[#5A6B82]">{s.text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FLYER-CTA-BAR */}
      <section className="px-5 py-10 sm:px-6">
        <div className="mx-auto max-w-[1040px]">
          <div className="rounded-[16px] px-6 py-7 text-center sm:px-8" style={{ background: area.accentSoft }}>
            <p className="text-[clamp(18px,2.6vw,24px)] font-extrabold text-[#0B1F3A]">
              Welcher Hebel bringt Ihnen am meisten?{" "}
              <a href="#kontakt" className="underline-offset-2 hover:underline" style={{ color: area.accent }}>
                Sprechen wir darüber.
              </a>
            </p>
            <p className="mt-2 text-[13px] text-[#5A6B82]">
              <span className="font-bold text-[#0B1F3A]">AgenticIT</span> ·{" "}
              <a href="mailto:info@agenticit.ch" className="hover:text-[#0B1F3A]">info@agenticit.ch</a> · alle 60+ Services in
              der Leistungsübersicht «KI &amp; Agentic Services»
            </p>
          </div>
        </div>
      </section>

      {/* ALLE LEISTUNGEN — eine einzige, aufklappbare Liste */}
      <section id="details" className="scroll-mt-20 bg-[#F5F8FC] px-5 py-14 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-[1000px]">
          <div className="mx-auto mb-9 max-w-[680px] text-center">
            <span className="text-[12px] font-extrabold uppercase tracking-[0.7px] text-[#0a8f89]">
              KI &amp; Agentic Services
            </span>
            <h2 className="mt-2 text-[clamp(22px,3.2vw,30px)] font-extrabold tracking-[-0.4px]">
              Alle Leistungen im Detail.
            </h2>
            <p className="mt-3 text-[15px] text-[#5A6B82]">
              {area.services.length} Leistungen – tippen Sie auf eine, um die Erklärung aufzuklappen.
            </p>
          </div>
          <AngebotAccordion
            items={area.services.map((s) => ({ q: s.lead, a: s.long }))}
            accent={area.accent}
          />
        </div>
      </section>

      {/* WEITER IM ANGEBOT */}
      <section className="bg-[#F5F8FC] px-5 py-14 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-[1000px]">
          <div className="mx-auto mb-8 max-w-[680px] text-center">
            <span className="text-[12px] font-extrabold uppercase tracking-[0.7px] text-[#0a8f89]">Die ganze Reise</span>
            <h2 className="mt-2 text-[clamp(22px,3.2vw,30px)] font-extrabold tracking-[-0.4px]">Weiter im Angebot.</h2>
          </div>
          <div className="grid grid-cols-1 gap-[14px] sm:grid-cols-3">
            {siblings.map((s) => (
              <Link
                key={s.key}
                href={`/${s.slug}`}
                className="group flex h-full flex-col rounded-[16px] border border-[#E3E9F2] bg-white p-5 shadow-[0_5px_16px_rgba(11,31,58,0.05)] transition hover:-translate-y-[2px] hover:shadow-[0_14px_34px_rgba(11,31,58,0.1)]"
              >
                <div
                  className="grid h-[42px] w-[42px] place-items-center rounded-[12px] text-[20px]"
                  style={{ background: s.accentSoft }}
                  aria-hidden="true"
                >
                  {s.icon}
                </div>
                <div className="mt-3 text-[16px] font-bold text-[#0B1F3A]">
                  {s.name} <span className="text-[#8294ad]">({s.german})</span>
                </div>
                <div className="mt-1 flex-1 text-[13.5px] text-[#5A6B82]">{s.eyebrow}</div>
                <span className="mt-3 text-[13px] font-extrabold" style={{ color: s.accent }}>
                  Ansehen →
                </span>
              </Link>
            ))}
          </div>
          <div className="mt-7 text-center">
            <Link href="/angebot" className="text-[14px] font-extrabold text-[#0a8f89] hover:underline">
              ← Zur Angebot-Übersicht
            </Link>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section id="kontakt" className="scroll-mt-20 bg-gradient-to-b from-[#F1F8FF] to-white px-5 py-14 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-[1000px]">
          <div className="flex flex-col items-center rounded-[22px] border border-[#E3E9F2] bg-gradient-to-br from-[#F1F8FF] to-[#EAF9F7] p-8 text-center shadow-[0_6px_20px_rgba(11,31,58,0.07)] sm:p-10">
            <span className="inline-block rounded-full bg-[#16C7C0]/12 px-[13px] py-[6px] text-[12px] font-extrabold uppercase tracking-[0.7px] text-[#0a8f89]">
              Unverbindlich · Persönlich
            </span>
            <h2 className="mt-[10px] text-[clamp(24px,3.6vw,34px)] font-extrabold tracking-[-0.5px] text-[#0B1F3A]">
              Welcher Hebel bringt Ihnen am meisten?
            </h2>
            <p className="mt-3 max-w-[520px] text-[16px] leading-relaxed text-[#5A6B82]">
              Sprechen wir darüber. Hinterlassen Sie kurz Ihre Angaben – wir melden uns persönlich.
            </p>
            <CtaContactForm />
          </div>
        </div>
      </section>

      <AngebotFooter />
    </main>
  )
}

export function AngebotFooter() {
  return (
    <footer className="bg-[#0B1F3A] py-12 text-[#c6d2e4]">
      <div className="mx-auto flex max-w-[1120px] flex-wrap justify-between gap-10 px-6">
        <div className="max-w-[300px]">
          <div className="text-[19px] font-extrabold text-white">
            Agentic<span className="text-[#16C7C0]">IT</span>
          </div>
          <p className="mt-[10px] text-[13px] leading-relaxed text-[#9fb0c8]">
            Ihr digitales Team für Kundengewinnung, Abschluss, Bindung und Betrieb – sicher gehostet in der Schweiz.
          </p>
        </div>
        <div>
          <b className="mb-[10px] block text-[13px] tracking-[0.3px] text-white">ANGEBOT</b>
          {ANGEBOT_AREAS.map((a) => (
            <Link key={a.key} href={`/${a.slug}`} className="block py-[3px] text-[#9fb0c8] hover:text-white">
              {a.name} ({a.german})
            </Link>
          ))}
        </div>
        <div>
          <b className="mb-[10px] block text-[13px] tracking-[0.3px] text-white">UNTERNEHMEN</b>
          <Link href="/kontakt" className="block py-[3px] text-[#9fb0c8] hover:text-white">Kontakt</Link>
          <Link href="/sicherheit" className="block py-[3px] text-[#9fb0c8] hover:text-white">Sicherheit</Link>
          <Link href="/datenschutz" className="block py-[3px] text-[#9fb0c8] hover:text-white">Datenschutz</Link>
          <Link href="/impressum" className="block py-[3px] text-[#9fb0c8] hover:text-white">Impressum</Link>
        </div>
      </div>
      <div className="mx-auto mt-8 max-w-[1120px] border-t border-white/10 px-6 pt-5 text-[12px] text-[#8294ad]">
        <p>© 2026 AgenticIT. Alle Rechte vorbehalten.</p>
        <p className="mt-1">{SITE_TRUST_LINE}</p>
      </div>
    </footer>
  )
}
