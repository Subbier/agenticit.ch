import Link from "next/link"
import { notFound } from "next/navigation"
import { PAGES } from "@/lib/page-content"
import { SUBPAGES_BY_PARENT } from "@/lib/subpage-content"
import { SITE_TRUST_LINE } from "@/lib/site-trust-line"
import { SiteHeader } from "@/components/site/site-header"
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
    <span className="inline-block rounded-full bg-[#16C7C0]/12 px-[13px] py-[6px] text-[12px] font-extrabold uppercase tracking-[0.7px] text-[#0a8f89]">
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
    <main className="min-h-screen bg-white text-[#0B1F3A]">
      {jsonLd.map((obj, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(obj) }} />
      ))}

      {/* HEADER (dunkel, mit Dropdown-Navigation) */}
      <SiteHeader activeSlug={page.slug} />

      {/* HERO (dunkelblau, zentriert) */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0B1F3A] to-[#13294B] px-5 pb-16 pt-16 sm:px-6 sm:pb-20 sm:pt-20">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[460px] w-[860px] -translate-x-1/2 rounded-full bg-[#16C7C0]/10 blur-[130px]" />
        <div className="relative mx-auto flex w-full max-w-[820px] flex-col items-center text-center">
          <nav aria-label="Brotkrumen" className="mb-5 text-[12px] font-semibold text-[#9fb0c8]">
            <Link href="/" className="hover:text-white">
              Start
            </Link>
            <span className="mx-2 text-white/30">/</span>
            <span className="text-white/80">{page.eyebrow}</span>
          </nav>
          <span className="inline-block rounded-full bg-[#16C7C0]/15 px-[13px] py-[6px] text-[11px] font-extrabold uppercase tracking-[0.7px] text-[#16C7C0] sm:text-[12px]">
            {page.eyebrow}
          </span>
          <h1 className="mt-5 max-w-[640px] text-[clamp(30px,5.6vw,46px)] font-extrabold leading-[1.06] tracking-[-0.8px] text-white">
            {page.h1}
          </h1>
          <p className="mt-5 max-w-[600px] text-[clamp(15px,3.5vw,19px)] leading-relaxed text-[#b9c6da]">{page.lead}</p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <a
              href="#kontakt"
              className="rounded-[12px] bg-gradient-to-br from-[#3BD974] to-[#22C55E] px-[24px] py-[15px] text-[15px] font-extrabold text-white shadow-[0_10px_24px_rgba(34,197,94,0.32)] transition hover:-translate-y-[1px]"
            >
              Kostenloses Erstgespräch sichern
            </a>
            <a
              href="/#rechner"
              className="rounded-[12px] border border-white/20 px-[24px] py-[15px] text-[15px] font-extrabold text-white/90 transition hover:border-[#16C7C0]/60 hover:text-white"
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
                    <div className="mb-4 grid h-[52px] w-[52px] place-items-center rounded-[14px] bg-gradient-to-br from-[#F1F8FF] to-[#EAF9F7] text-[24px] ring-1 ring-[#E3E9F2]">
                      {f.icon}
                    </div>
                    <h3 className="text-[clamp(20px,4.5vw,24px)] font-extrabold leading-tight tracking-[-0.4px] text-[#0B1F3A]">
                      {f.title}
                    </h3>
                    <p className="mt-1.5 text-[12px] font-extrabold uppercase tracking-[0.5px] text-[#0a8f89]">
                      {f.subtitle}
                    </p>
                  </div>
                  <div className="mt-5 flex-1 text-left">
                    {f.text ? <p className="text-[14.5px] leading-relaxed text-[#5A6B82]">{f.text}</p> : null}
                    <ul className="mt-4 space-y-2.5 border-t border-[#EEF2F7] pt-4">
                      {f.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-2 text-[14px] font-bold text-[#0B1F3A]">
                          <span className="mt-[7px] h-1.5 w-1.5 flex-none rounded-full bg-[#16C7C0]" aria-hidden="true" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {sub ? (
                    <span className="mt-6 inline-flex items-center gap-1 text-[14px] font-extrabold text-[#0a8f89]">
                      Mehr erfahren →
                    </span>
                  ) : null}
                </>
              )
              const cardClass =
                "flex h-full flex-col rounded-[18px] border border-[#E3E9F2] bg-white p-6 shadow-[0_6px_20px_rgba(11,31,58,0.07)] transition duration-300 hover:-translate-y-[4px] hover:border-[#16C7C0]/40 hover:shadow-[0_20px_50px_rgba(11,31,58,0.13)] sm:p-7"
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
      <section className="bg-[#F5F8FC] px-6 py-16 sm:py-20">
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
                <div className="flex h-full flex-col items-center rounded-[14px] border border-[#E3E9F2] bg-white p-[20px] text-center">
                  <div className="text-[26px]">{t.ic}</div>
                  <b className="mt-2 block text-[15px] text-[#0B1F3A]">{t.b}</b>
                  <span className="text-[12.5px] text-[#5A6B82]">{t.s}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA mit Lead-Formular */}
      <section id="kontakt" className="scroll-mt-20 bg-gradient-to-b from-[#F1F8FF] to-white px-5 py-16 sm:px-6 sm:py-20">
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

      {/* FOOTER */}
      <footer className="bg-[#0B1F3A] py-12 text-[#c6d2e4]">
        <div className="mx-auto flex max-w-[1120px] flex-wrap justify-between gap-10 px-6">
          <div className="max-w-[280px]">
            <div className="text-[19px] font-extrabold text-white">
              Agentic<span className="text-[#16C7C0]">IT</span>
            </div>
            <p className="mt-[10px] text-[13px] leading-relaxed text-[#9fb0c8]">
              Ihr digitales Team für Kundendienst, Automatisierung und Wachstum – sicher gehostet in der Schweiz.
            </p>
          </div>
          <div>
            <b className="mb-[10px] block text-[13px] tracking-[0.3px] text-white">LÖSUNGEN</b>
            <Link href="/loesungen/kundendienst-ki" className="block py-[3px] text-[#9fb0c8] hover:text-white">Kundendienst-KI</Link>
            <Link href="/loesungen/prozessautomatisierung" className="block py-[3px] text-[#9fb0c8] hover:text-white">Prozessautomatisierung</Link>
            <Link href="/loesungen/revops-growth" className="block py-[3px] text-[#9fb0c8] hover:text-white">RevOps & Growth</Link>
          </div>
          <div>
            <b className="mb-[10px] block text-[13px] tracking-[0.3px] text-white">TECHNOLOGIE</b>
            <Link href="/technologie/autonome-ki-agenten" className="block py-[3px] text-[#9fb0c8] hover:text-white">Autonome KI-Agenten</Link>
            <Link href="/technologie/multi-agenten-systeme" className="block py-[3px] text-[#9fb0c8] hover:text-white">Multi-Agenten-Systeme</Link>
            <Link href="/technologie/enterprise-integration" className="block py-[3px] text-[#9fb0c8] hover:text-white">Enterprise-Integration</Link>
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
    </main>
  )
}
