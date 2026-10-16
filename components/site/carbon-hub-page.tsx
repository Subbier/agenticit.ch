import { JourneyContent } from "@/components/journey/content"
import design from "@/components/journey/content.module.css"
// Design-System "Carbon & Signal" (26.07.2026) — Hub-Renderer NUR für
// Lösungen/Technologie/Branchen. Sicherheit/Unternehmen bleiben auf hub-page.tsx
// (Startseite/Unternehmen/Karriere sind für dieses Redesign tabu).
import Link from "next/link"
import { notFound } from "next/navigation"
import { PAGES } from "@/lib/page-content"
import { SUBPAGES_BY_PARENT } from "@/lib/subpage-content"
import { BRANCHEN_LPS } from "@/lib/branchen-content"
import { Reveal } from "@/components/site/reveal"
import { CtaContactForm } from "@/components/site/cta-contact-form"
import { breadcrumbJsonLd, serviceJsonLd } from "@/lib/seo"

const TRUST = [
  { ic: "🇨🇭", b: "Schweizer Server", s: "Lokale Infrastruktur" },
  { ic: "📜", b: "DSG-konform", s: "Schweizer Datenschutz" },
  { ic: "🔌", b: "Offline-fähig", s: "Läuft auch ohne Internet" },
  { ic: "🛡️", b: "Private KI", s: "Nur für Ihr Unternehmen" },
]

function Eyebrow({
  children,
  dark = false,
}: {
  children: React.ReactNode
  dark?: boolean
}) {
  return (
    <span
      className={`font-[family-name:var(--font-mono-signal)] text-[11px] font-semibold uppercase tracking-[0.22em] ${
        dark ? "text-[#4d7c36]" : "text-[#4d7c36]"
      }`}
    >
      {children}
    </span>
  )
}

export function CarbonHubPage({ slug }: { slug: string }) {
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
    <JourneyContent>
      {jsonLd.map((obj, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(obj) }}
        />
      ))}

      {/* HERO — flach Carbon, keine Verläufe/Glow (R4), harter Schnitt zu Hell (R7) */}
      <section className={design.pageHero}>
        <div className="mx-auto flex w-full max-w-[820px] flex-col items-center text-center">
          <nav
            aria-label="Brotkrumen"
            className="mb-5 font-[family-name:var(--font-carbon-text)] text-[12px] font-medium text-[#6B7480]"
          >
            <Link href="/" className="hover:text-[#202522]">
              Start
            </Link>
            <span className="mx-2 text-[#202522]">/</span>
            <span className="text-[#647068]">{page.eyebrow}</span>
          </nav>
          <Eyebrow dark>{page.eyebrow}</Eyebrow>
          <h1 className="mt-4 max-w-[640px] font-[family-name:var(--font-display)] text-[clamp(30px,5.6vw,46px)] font-bold leading-[1.03] tracking-[-0.02em] text-[#202522]">
            {page.h1}
          </h1>
          <p className="mt-5 max-w-[600px] font-[family-name:var(--font-carbon-text)] text-[clamp(15px,3.5vw,18px)] leading-relaxed text-[#647068]">
            {page.lead}
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <a
              href="#kontakt"
              className="rounded-[8px] bg-[#8FE05A] px-[24px] py-[14px] font-[family-name:var(--font-carbon-text)] text-[15px] font-semibold text-[#122400] transition hover:bg-[#A2E874]"
            >
              Kostenloses Erstgespräch sichern
            </a>
            <a
              href="/potenzial"
              className="rounded-[8px] border border-[#dce3db] px-[24px] py-[14px] font-[family-name:var(--font-carbon-text)] text-[15px] font-medium text-[#202522] transition hover:border-[#8FE05A]/50 hover:text-[#202522]"
            >
              Potenzial berechnen →
            </a>
          </div>
        </div>
      </section>

      {/* INTRO + FEATURES — hell, flach, Karten-Grau (kein Glow) */}
      <section className="px-5 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-[1000px]">
          <Reveal className="mx-auto mb-11 flex max-w-[680px] flex-col items-center text-center sm:mb-12">
            <Eyebrow>Alles aus einer Hand</Eyebrow>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-[clamp(24px,4.8vw,34px)] font-bold leading-[1.1] tracking-[-0.015em]">
              {page.introTitle}
            </h2>
            {page.introText ? (
              <p className="mt-4 max-w-[620px] font-[family-name:var(--font-carbon-text)] text-[clamp(15px,3.5vw,17px)] leading-relaxed text-[#647068]">
                {page.introText}
              </p>
            ) : null}
          </Reveal>

          <div
            className={`grid grid-cols-1 gap-4 ${
              page.features.length === 2
                ? "md:grid-cols-2 md:mx-auto md:max-w-[760px]"
                : "md:grid-cols-3"
            }`}
          >
            {page.features.map((f, i) => {
              const sub = subs[i]
              const inner = (
                <>
                  <div className="flex flex-col items-center text-center">
                    {f.groupLabel ? (
                      <span
                        className="mb-3 inline-block rounded-[6px] px-[10px] py-[4px] font-[family-name:var(--font-mono-signal)] text-[10px] font-semibold uppercase tracking-[0.16em]"
                        style={{
                          background: `${f.groupColor ?? "#1F9A5E"}1A`,
                          color: f.groupColor ?? "#1F9A5E",
                        }}
                      >
                        {f.groupLabel}
                      </span>
                    ) : null}
                    <div className="mb-4 grid h-[50px] w-[50px] place-items-center rounded-[12px] bg-white text-[23px] ring-1 ring-[#dce3db]">
                      {f.icon}
                    </div>
                    <h3 className="font-[family-name:var(--font-display)] text-[clamp(19px,4.5vw,22px)] font-bold leading-tight tracking-[-0.01em]">
                      {f.title}
                    </h3>
                    <p className="mt-1.5 font-[family-name:var(--font-mono-signal)] text-[11px] font-semibold uppercase tracking-[0.14em] text-[#4d7c36]">
                      {f.subtitle}
                    </p>
                  </div>
                  <div className="mt-5 flex-1 text-left">
                    {f.text ? (
                      <p className="font-[family-name:var(--font-carbon-text)] text-[14px] leading-relaxed text-[#647068]">
                        {f.text}
                      </p>
                    ) : null}
                    <ul className="mt-4 space-y-2.5 border-t border-[#dce3db] pt-4">
                      {f.bullets.map((b) => (
                        <li
                          key={b}
                          className="flex items-start gap-2 font-[family-name:var(--font-carbon-text)] text-[13.5px] font-medium text-[#202522]"
                        >
                          <span
                            className="mt-[7px] h-1.5 w-1.5 flex-none rounded-full bg-[#8fe05a]"
                            aria-hidden="true"
                          />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {sub ? (
                    <span className="mt-6 inline-flex items-center gap-1 font-[family-name:var(--font-carbon-text)] text-[14px] font-semibold text-[#4d7c36]">
                      Mehr erfahren →
                    </span>
                  ) : null}
                </>
              )
              const cardClass =
                "flex h-full flex-col rounded-[16px] border border-[#dce3db] bg-[#f5f7f2] p-6 transition duration-200 hover:-translate-y-[3px] hover:border-[#1F9A5E]/40 sm:p-7"
              return (
                <Reveal key={f.title} delay={i * 100} className="h-full">
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

      {/* BRANCHEN-LÖSUNGEN — nur auf /branchen: Verticals aus lib/branchen-content */}
      {page.slug === "branchen" && BRANCHEN_LPS.length ? (
        <section className="bg-[#f5f7f2] px-5 py-16 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-[1000px]">
            <Reveal className="mx-auto mb-10 flex max-w-[680px] flex-col items-center text-center">
              <Eyebrow>Vertikale Lösungen</Eyebrow>
              <h2 className="mt-3 font-[family-name:var(--font-display)] text-[clamp(24px,4.8vw,34px)] font-bold leading-[1.1] tracking-[-0.015em]">
                Ihre Branche. Ihre Abläufe. Ihre KI-Agenten.
              </h2>
              <p className="mt-4 max-w-[600px] font-[family-name:var(--font-carbon-text)] text-[clamp(15px,3.5vw,17px)] leading-relaxed text-[#647068]">
                Dieselben Prinzipien, auf Ihre Branche übersetzt: Wir
                automatisieren die Abläufe, die in Ihrem Alltag wirklich Zeit
                kosten.
              </p>
            </Reveal>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {BRANCHEN_LPS.map((lp, i) => (
                <Reveal key={lp.slug} delay={i * 60} className="h-full">
                  <Link
                    href={`/branchen/${lp.slug}`}
                    className="flex h-full flex-col justify-between rounded-[14px] border border-[#dce3db] bg-white p-5 transition hover:-translate-y-[2px] hover:border-[#8FE05A]"
                  >
                    <span className="font-[family-name:var(--font-display)] text-[15.5px] font-bold leading-snug text-[#202522]">
                      {lp.navLabel}
                    </span>
                    <span className="mt-3 font-[family-name:var(--font-carbon-text)] text-[13px] font-semibold text-[#1F9A5E]">
                      Zur Lösung →
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* TRUST — als Chip-Reihe wie im Design-System-Dokument */}
      <section className="bg-white px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-[1000px]">
          <Reveal className="mx-auto mb-9 flex max-w-[720px] flex-col items-center text-center">
            <Eyebrow>Sicher wie ein Schweizer Tresor</Eyebrow>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-[clamp(22px,3.4vw,30px)] font-bold tracking-[-0.015em]">
              Ihre Daten bleiben in der Schweiz.
            </h2>
          </Reveal>
          <div className="flex flex-wrap justify-center gap-3">
            {TRUST.map((t, i) => (
              <Reveal key={t.b} delay={i * 80}>
                <div className="flex items-center gap-2.5 rounded-[12px] border border-[#dce3db] bg-[#f5f7f2] px-4 py-3">
                  <span className="text-[20px]" aria-hidden="true">
                    {t.ic}
                  </span>
                  <div className="text-left">
                    <div className="font-[family-name:var(--font-carbon-text)] text-[13.5px] font-semibold text-[#202522]">
                      {t.b}
                    </div>
                    <div className="font-[family-name:var(--font-carbon-text)] text-[11.5px] text-[#647068]">
                      {t.s}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section
        id="kontakt"
        className="scroll-mt-20 bg-[#f5f7f2] px-5 py-16 sm:px-6 sm:py-20"
      >
        <Reveal className="mx-auto flex max-w-[640px] flex-col items-center text-center">
          <Eyebrow>Unverbindlich · Persönlich</Eyebrow>
          <h2 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(24px,4.6vw,32px)] font-bold leading-[1.1] tracking-[-0.015em]">
            {page.closingTitle}
          </h2>
          <p className="mt-4 max-w-[520px] font-[family-name:var(--font-carbon-text)] text-[clamp(15px,3.5vw,17px)] leading-relaxed text-[#647068]">
            {page.closingText}
          </p>
          <CtaContactForm />
          <p className="mt-4 font-[family-name:var(--font-carbon-text)] text-[12px] text-[#8B94A1]">
            DSG-konform · Antwort innert 24 Stunden · Keine Verpflichtung
          </p>
        </Reveal>
      </section>
    </JourneyContent>
  )
}
