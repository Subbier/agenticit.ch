import Link from "next/link"
import { notFound } from "next/navigation"
import { PAGES } from "@/lib/page-content"
import { SUBPAGES_BY_PARENT } from "@/lib/subpage-content"
import { SiteHeader } from "@/components/site/site-header"
import { CarbonFooter } from "@/components/site/carbon-footer"
import { Reveal } from "@/components/site/reveal"
import { CtaContactForm } from "@/components/site/cta-contact-form"
import { breadcrumbJsonLd, serviceJsonLd } from "@/lib/seo"

const TRUST = [
  { ic: "🇨🇭", b: "Schweizer Server", s: "Lokale Infrastruktur" },
  { ic: "📜", b: "DSG-konform", s: "Schweizer Datenschutz" },
  { ic: "🔌", b: "Offline-fähig", s: "Läuft auch ohne Internet" },
  { ic: "🛡️", b: "Private KI", s: "Nur für Ihr Unternehmen" },
]

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block rounded-full bg-[#1F9A5E]/12 px-[13px] py-[6px] text-[12px] font-extrabold uppercase tracking-[0.7px] text-[#57C7FF]">
      {children}
    </span>
  )
}

export function HubPage({ slug }: { slug: string }) {
  const page = PAGES[slug]
  if (!page) notFound()

  const subs = SUBPAGES_BY_PARENT[page.slug] ?? []

  const jsonLd = [
    serviceJsonLd({
      name: page.meta.title,
      description: page.meta.description,
      path: `/${page.slug}`,
    }),
    breadcrumbJsonLd([
      { name: "Start", path: "/" },
      { name: page.eyebrow, path: `/${page.slug}` },
    ]),
  ]

  return (
    <main className="min-h-screen bg-white text-[#0A0C10]">
      {jsonLd.map((obj, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(obj) }} />
      ))}

      {/* HEADER (dunkel, mit Dropdown-Navigation) */}
      <SiteHeader activeSlug={page.slug} />

      {/* HERO (dunkelblau, zentriert) */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0A0C10] to-[#1E2631] px-5 pb-16 pt-16 sm:px-6 sm:pb-20 sm:pt-20">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[460px] w-[860px] -translate-x-1/2 rounded-full bg-[#1F9A5E]/10 blur-[130px]" />
        <div className="relative mx-auto flex w-full max-w-[820px] flex-col items-center text-center">
          <nav aria-label="Brotkrumen" className="mb-5 text-[12px] font-semibold text-[#9AA6B2]">
            <Link href="/" className="hover:text-white">
              Start
            </Link>
            <span className="mx-2 text-white/30">/</span>
            <span className="text-white/80">{page.eyebrow}</span>
          </nav>
          <span className="inline-block rounded-full bg-[#1F9A5E]/15 px-[13px] py-[6px] text-[11px] font-extrabold uppercase tracking-[0.7px] text-[#57C7FF] sm:text-[12px]">
            {page.eyebrow}
          </span>
          <h1 className="mt-5 max-w-[640px] text-[clamp(30px,5.6vw,46px)] font-extrabold leading-[1.06] tracking-[-0.8px] text-white">
            {page.h1}
          </h1>
          <p className="mt-5 max-w-[600px] text-[clamp(15px,3.5vw,19px)] leading-relaxed text-[#C3CBD3]">{page.lead}</p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <a
              href="#kontakt"
              className="rounded-[12px] bg-[#8FE05A] px-[24px] py-[15px] text-[15px] font-extrabold text-[#122400] shadow-[0_6px_16px_rgba(10,12,16,0.18)] transition hover:-translate-y-[1px]"
            >
              Kostenloses Erstgespräch sichern
            </a>
            <a
              href="/#rechner"
              className="rounded-[12px] border border-white/20 px-[24px] py-[15px] text-[15px] font-extrabold text-white/90 transition hover:border-[#1F9A5E]/60 hover:text-white"
            >
              Potenzial berechnen →
            </a>
          </div>
        </div>
      </section>

      {/* INTRO + FEATURES (zentriert) */}
      <section className="px-5 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-[1000px]">
          <Reveal className="mx-auto mb-11 flex max-w-[680px] flex-col items-center text-center sm:mb-12">
            <Eyebrow>Alles aus einer Hand</Eyebrow>
            <h2 className="mt-[14px] text-[clamp(27px,5.2vw,38px)] font-extrabold leading-[1.08] tracking-[-0.6px]">
              {page.introTitle}
            </h2>
            {page.introText ? (
              <p className="mt-4 max-w-[600px] text-[clamp(15px,3.5vw,17px)] leading-relaxed text-[#5A6B82]">
                {page.introText}
              </p>
            ) : null}
          </Reveal>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {page.features.map((f, i) => {
              const sub = subs[i]
              const inner = (
                <>
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-4 grid h-[52px] w-[52px] place-items-center rounded-[14px] bg-gradient-to-br from-[#FAFAF7] to-[#F1F3F5] text-[24px] ring-1 ring-[#E1E4E8]">
                      {f.icon}
                    </div>
                    <h3 className="text-[clamp(20px,4.5vw,24px)] font-extrabold leading-tight tracking-[-0.4px] text-[#0A0C10]">
                      {f.title}
                    </h3>
                    <p className="mt-1.5 text-[12px] font-extrabold uppercase tracking-[0.5px] text-[#57C7FF]">
                      {f.subtitle}
                    </p>
                  </div>
                  <div className="mt-5 flex-1 text-left">
                    {f.text ? <p className="text-[14.5px] leading-relaxed text-[#5A6B82]">{f.text}</p> : null}
                    <ul className="mt-4 space-y-2.5 border-t border-[#F1F3F5] pt-4">
                      {f.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-2 text-[14px] font-bold text-[#0A0C10]">
                          <span className="mt-[7px] h-1.5 w-1.5 flex-none rounded-full bg-[#1F9A5E]" aria-hidden="true" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {sub ? (
                    <span className="mt-6 inline-flex items-center gap-1 text-[14px] font-extrabold text-[#57C7FF]">
                      Mehr erfahren →
                    </span>
                  ) : null}
                </>
              )
              const cardClass =
                "flex h-full flex-col rounded-[18px] border border-[#E1E4E8] bg-white p-6 shadow-[0_6px_20px_rgba(10,12,16,0.07)] transition duration-300 hover:-translate-y-[4px] hover:border-[#1F9A5E]/40 hover:shadow-[0_20px_50px_rgba(10,12,16,0.13)] sm:p-7"
              return (
                <Reveal key={f.title} delay={i * 110} className="h-full">
                  {sub ? (
                    <Link href={`/${sub.slug}`} className={cardClass}>
                      {inner}
                    </Link>
                  ) : (
                    <div className={cardClass}>{inner}</div>
                  )}
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="bg-[#F1F3F5] px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-[1000px]">
          <Reveal className="mx-auto mb-10 flex max-w-[720px] flex-col items-center text-center">
            <Eyebrow>Sicher wie ein Schweizer Tresor</Eyebrow>
            <h2 className="mt-[12px] text-[clamp(23px,3.4vw,32px)] font-extrabold tracking-[-0.4px]">
              Ihre Daten bleiben in der Schweiz.
            </h2>
          </Reveal>
          <div className="grid grid-cols-2 gap-[14px] md:grid-cols-4">
            {TRUST.map((t, i) => (
              <Reveal key={t.b} delay={i * 90} className="h-full">
                <div className="flex h-full flex-col items-center rounded-[14px] border border-[#E1E4E8] bg-white p-[20px] text-center">
                  <div className="text-[26px]">{t.ic}</div>
                  <b className="mt-2 block text-[15px] text-[#0A0C10]">{t.b}</b>
                  <span className="text-[12.5px] text-[#5A6B82]">{t.s}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA mit Lead-Formular */}
      <section id="kontakt" className="scroll-mt-20 bg-gradient-to-b from-[#FAFAF7] to-white px-5 py-16 sm:px-6 sm:py-20">
        <Reveal className="mx-auto flex max-w-[640px] flex-col items-center text-center">
          <Eyebrow>Unverbindlich · Persönlich</Eyebrow>
          <h2 className="mt-[14px] text-[clamp(26px,5vw,36px)] font-extrabold leading-[1.08] tracking-[-0.5px]">
            {page.closingTitle}
          </h2>
          <p className="mt-4 max-w-[520px] text-[clamp(15px,3.5vw,17px)] leading-relaxed text-[#5A6B82]">
            {page.closingText}
          </p>
          <CtaContactForm />
          <p className="mt-4 text-[12px] text-[#9aa9bf]">
            DSG-konform · Antwort innert 24 Stunden · Keine Verpflichtung
          </p>
        </Reveal>
      </section>

      {/* FOOTER — zentral in carbon-footer.tsx (ein Footer für die ganze Seite) */}
      <CarbonFooter />
    </main>
  )
}
