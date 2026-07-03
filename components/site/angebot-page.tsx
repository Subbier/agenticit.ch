import Link from "next/link"
import { SiteHeader } from "@/components/site/site-header"
import { Reveal } from "@/components/site/reveal"
import { CtaContactForm } from "@/components/site/cta-contact-form"
import { AngebotFooter } from "@/components/site/angebot-area-page"
import { AngebotFlywheel } from "@/components/site/angebot-flywheel"
import { ANGEBOT_AREAS, ANGEBOT_COMPLIANCE } from "@/lib/angebot-content"

// Headline-Kennzahlen über die ganze Reise (für den Desire-Block).
const JOURNEY_STATS = [
  { value: "+200%", label: "mehr Conversions", area: "Acquire" },
  { value: "bis +20%", label: "Abschlussquote", area: "Convert" },
  { value: "+25%", label: "Kundenwert (CLV)", area: "Retain" },
  { value: "70%", label: "weniger Admin-Zeit", area: "Operate" },
]

export function AngebotPage() {
  return (
    <main className="min-h-screen bg-white text-[#0B1F3A]">
      <SiteHeader activeSlug="angebot" />

      {/* A · ATTENTION — Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0B1F3A] to-[#13294B] px-5 pb-16 pt-16 text-center sm:px-6 sm:pb-20 sm:pt-20">
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="aurora-blob absolute left-[20%] top-[-10%] h-[360px] w-[520px] -translate-x-1/2 rounded-full bg-[#2DA8FF]/18 blur-[120px] animate-[aurora-drift-1_18s_ease-in-out_infinite] motion-reduce:animate-none" />
          <div className="aurora-blob absolute left-[80%] top-[4%] h-[360px] w-[520px] -translate-x-1/2 rounded-full bg-[#16C7C0]/16 blur-[120px] animate-[aurora-drift-2_22s_ease-in-out_infinite] motion-reduce:animate-none" />
        </div>

        <div className="relative mx-auto flex max-w-[900px] flex-col items-center">
          <span className="inline-block rounded-full border border-white/10 bg-[#16C7C0]/15 px-[13px] py-[6px] text-[12px] font-extrabold uppercase tracking-[0.7px] text-[#16C7C0]">
            Unser Angebot
          </span>
          <h1 className="mx-auto mt-5 max-w-[780px] text-[clamp(31px,5vw,52px)] font-extrabold leading-[1.08] tracking-[-1px] text-white">
            Ein Wachstumsmotor, der{" "}
            <span className="bg-gradient-to-r from-[#16C7C0] to-[#5ee0da] bg-clip-text text-transparent">
              die ganze Kundenreise
            </span>{" "}
            abdeckt.
          </h1>
          <p className="mx-auto mt-5 max-w-[640px] text-[clamp(15px,2vw,18px)] font-medium leading-relaxed text-white/80">
            Gewinnen, abschliessen, binden — und ein Betrieb, der im Hintergrund über alles läuft. Vier Bereiche,
            die ineinandergreifen statt nebeneinander zu existieren.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <a
              href="#bereiche"
              className="rounded-[12px] bg-gradient-to-br from-[#16C7C0] to-[#0a8f89] px-[26px] py-[15px] text-[15px] font-extrabold text-white shadow-[0_10px_24px_rgba(22,199,192,0.3)] transition hover:-translate-y-[1px]"
            >
              Bereiche entdecken ↓
            </a>
            <a
              href="#kontakt"
              className="rounded-[12px] border border-white/20 px-[24px] py-[15px] text-[15px] font-extrabold text-white/90 transition hover:border-[#16C7C0]/60 hover:text-white"
            >
              Erstgespräch sichern →
            </a>
          </div>
        </div>
      </section>

      {/* I · INTEREST — Interaktiver Wachstumsmotor */}
      <section className="px-5 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-[1120px]">
          <div className="mx-auto mb-10 max-w-[680px] text-center">
            <span className="text-[12px] font-extrabold uppercase tracking-[0.7px] text-[#0a8f89]">
              So greift alles ineinander
            </span>
            <h2 className="mt-2 text-[clamp(24px,3.4vw,34px)] font-extrabold tracking-[-0.5px]">
              Die Reise Ihres Kunden — als ein System.
            </h2>
            <p className="mt-3 text-[16px] leading-relaxed text-[#5A6B82]">
              Tippen oder fahren Sie über eine Station, um den Bereich kennenzulernen.
            </p>
          </div>
          <AngebotFlywheel />
        </div>
      </section>

      {/* D · DESIRE — Wirkung über die ganze Reise */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0B1F3A] to-[#13294B] px-5 py-14 sm:px-6 sm:py-16">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[320px] w-[680px] -translate-x-1/2 rounded-full bg-[#2DA8FF]/12 blur-[120px]" />
        <div className="relative mx-auto max-w-[1040px]">
          <div className="mx-auto mb-9 max-w-[680px] text-center">
            <span className="inline-block rounded-full bg-[#2DA8FF]/15 px-[13px] py-[6px] text-[12px] font-extrabold uppercase tracking-[0.7px] text-[#7ec8ff]">
              Belegte Wirkung
            </span>
            <h2 className="mt-3 text-[clamp(24px,3.6vw,34px)] font-extrabold tracking-[-0.5px] text-white">
              Zahlen, die für sich sprechen.
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            {JOURNEY_STATS.map((s, i) => (
              <Reveal
                key={s.label}
                delay={i * 70}
                className="rounded-[16px] border border-white/10 bg-white/[0.06] p-5 text-center backdrop-blur"
              >
                <div className="text-[clamp(24px,4vw,34px)] font-extrabold leading-none tracking-[-0.6px] text-white">
                  {s.value}
                </div>
                <div className="mt-2 text-[13px] font-semibold text-white/75">{s.label}</div>
                <div className="mt-1 text-[11px] font-bold uppercase tracking-[0.4px] text-[#5ee0da]">{s.area}</div>
              </Reveal>
            ))}
          </div>
          <p className="mx-auto mt-6 max-w-[760px] text-center text-[12px] leading-relaxed text-white/45">
            {ANGEBOT_COMPLIANCE}
          </p>
        </div>
      </section>

      {/* D · DESIRE — Vier Bereiche */}
      <section id="bereiche" className="scroll-mt-20 px-5 py-14 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-[1120px]">
          <div className="mx-auto mb-10 max-w-[680px] text-center">
            <span className="text-[12px] font-extrabold uppercase tracking-[0.7px] text-[#0a8f89]">
              Vier Bereiche, ein Wachstumsmotor
            </span>
            <h2 className="mt-2 text-[clamp(24px,3.4vw,34px)] font-extrabold tracking-[-0.5px]">
              Wählen Sie Ihren Bereich.
            </h2>
            <p className="mt-3 text-[16px] leading-relaxed text-[#5A6B82]">
              Jeder Bereich ist einzeln buchbar – oder als Komplett-Paket, das nahtlos zusammenspielt.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-[18px] md:grid-cols-2">
            {ANGEBOT_AREAS.map((area, i) => (
              <Reveal key={area.key} delay={(i % 2) * 90}>
                <Link
                  href={`/${area.slug}`}
                  className="group flex h-full flex-col rounded-[20px] border border-[#E3E9F2] bg-white p-7 shadow-[0_8px_24px_rgba(11,31,58,0.07)] transition hover:-translate-y-[3px] hover:shadow-[0_22px_52px_rgba(11,31,58,0.13)]"
                  style={{ borderTop: `4px solid ${area.accent}` }}
                >
                  <div className="flex items-center gap-4">
                    <span
                      className="grid h-[54px] w-[54px] flex-none place-items-center rounded-[14px] text-[26px]"
                      style={{ background: area.accentSoft }}
                      aria-hidden="true"
                    >
                      {area.icon}
                    </span>
                    <div>
                      <div className="text-[11px] font-extrabold uppercase tracking-[0.5px]" style={{ color: area.accent }}>
                        {area.eyebrow}
                      </div>
                      <h3 className="text-[21px] font-extrabold leading-tight text-[#0B1F3A]">
                        {area.name} <span className="text-[#8294ad]">({area.german})</span>
                      </h3>
                    </div>
                  </div>

                  <p className="mt-4 text-[15px] font-semibold leading-relaxed text-[#314866]">{area.tagline}</p>

                  <ul className="mt-4 grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2">
                    {area.services.slice(0, 4).map((s) => (
                      <li key={s.lead} className="flex items-start gap-2 text-[13.5px] font-semibold text-[#314866]">
                        <span
                          className="mt-[7px] h-1.5 w-1.5 flex-none rounded-full"
                          style={{ background: area.accent }}
                          aria-hidden="true"
                        />
                        <span>{s.lead}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Mini-Kennzahlen-Vorschau */}
                  <div className="mt-5 flex flex-wrap gap-2">
                    {area.stats.map((st) => (
                      <span
                        key={st.label}
                        className="rounded-full px-2.5 py-1 text-[11.5px] font-bold"
                        style={{ background: area.accentSoft, color: area.accent }}
                      >
                        {st.value} {st.label}
                      </span>
                    ))}
                  </div>

                  <span
                    className="mt-5 inline-flex items-center gap-1 text-[14px] font-extrabold transition group-hover:gap-2"
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
      <section id="kontakt" className="scroll-mt-20 bg-gradient-to-b from-[#F1F8FF] to-white px-5 py-14 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-[1120px]">
          <div className="flex flex-col items-center rounded-[22px] border border-[#E3E9F2] bg-gradient-to-br from-[#F1F8FF] to-[#EAF9F7] p-8 text-center shadow-[0_6px_20px_rgba(11,31,58,0.07)] sm:p-10">
            <span className="inline-block rounded-full bg-[#16C7C0]/12 px-[13px] py-[6px] text-[12px] font-extrabold uppercase tracking-[0.7px] text-[#0a8f89]">
              Unverbindlich · Persönlich
            </span>
            <h2 className="mt-[10px] text-[clamp(26px,3.6vw,36px)] font-extrabold tracking-[-0.5px] text-[#0B1F3A]">
              Welcher Bereich bringt Ihnen am meisten?
            </h2>
            <p className="mt-3 max-w-[520px] text-[16px] leading-relaxed text-[#5A6B82]">
              Sagen Sie uns kurz, wo der Schuh drückt – wir zeigen Ihnen den grössten Hebel für Ihr Unternehmen.
            </p>
            <CtaContactForm />
          </div>
        </div>
      </section>

      <AngebotFooter />
    </main>
  )
}
