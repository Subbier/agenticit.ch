import Link from "next/link"
import { notFound } from "next/navigation"
import { PAGES } from "@/lib/page-content"
import { SUBPAGES_BY_PARENT } from "@/lib/subpage-content"
import { SiteHeader } from "@/components/site/site-header"
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
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0B1F3A] to-[#13294B] px-5 pb-14 pt-14 text-center sm:px-6 sm:pb-16 sm:pt-16">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-[#16C7C0]/10 blur-[120px]" />
        <div className="relative mx-auto flex w-full max-w-[1120px] flex-col items-center">
          <nav aria-label="Brotkrumen" className="mb-4 text-[12px] font-semibold text-[#9fb0c8]">
            <Link href="/" className="hover:text-white">
              Start
            </Link>
            <span className="mx-2 text-white/30">/</span>
            <span className="text-white/80">{page.eyebrow}</span>
          </nav>
          <span className="inline-block rounded-full bg-[#16C7C0]/15 px-[13px] py-[6px] text-[11px] font-extrabold uppercase tracking-[0.7px] text-[#16C7C0] sm:text-[12px]">
            {page.eyebrow}
          </span>
          <h1 className="mt-4 max-w-[580px] text-[clamp(28px,5.5vw,44px)] font-extrabold leading-[1.08] tracking-[-0.8px] text-white">
            {page.h1}
          </h1>
          <p className="mt-4 max-w-[600px] text-[clamp(15px,3.5vw,19px)] leading-relaxed text-[#b9c6da]">{page.lead}</p>
          <div className="mt-[26px] flex flex-wrap justify-center gap-3">
            <a href="/#kontakt" className="rounded-[12px] bg-gradient-to-br from-[#3BD974] to-[#22C55E] px-[22px] py-[14px] text-[15px] font-extrabold text-white shadow-[0_10px_24px_rgba(34,197,94,0.32)] transition hover:-translate-y-[1px]">
              Kostenloses Erstgespräch sichern
            </a>
            <a href="/#rechner" className="rounded-[12px] bg-gradient-to-br from-[#FB923C] to-[#F97316] px-[22px] py-[14px] text-[15px] font-extrabold text-white shadow-[0_10px_24px_rgba(249,115,22,0.3)] transition hover:-translate-y-[1px]">
              → Potenzial berechnen
            </a>
          </div>
        </div>
      </section>

      {/* INTRO + FEATURES (zentriert, knapp) */}
      <section className="px-5 py-12 sm:px-6 sm:py-14">
        <div className="mx-auto max-w-[960px]">
          <div className="mx-auto mb-8 max-w-[640px] text-center sm:mb-9">
            <Eyebrow>Alles aus einer Hand</Eyebrow>
            <h2 className="mt-[10px] text-[clamp(26px,5.5vw,38px)] font-extrabold leading-[1.08] tracking-[-0.6px]">{page.introTitle}</h2>
            {page.introText ? (
              <p className="mt-3 text-[clamp(14px,3.5vw,16px)] text-[#5A6B82]">{page.introText}</p>
            ) : null}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:gap-[18px] md:grid-cols-3">
            {page.features.map((f, i) => {
              const sub = subs[i]
              const inner = (
                <>
                  <div className="text-center">
                    <div className="mx-auto mb-3 grid h-[44px] w-[44px] place-items-center rounded-[12px] bg-[#F1F8FF] text-[22px] sm:mb-4 sm:h-[46px] sm:w-[46px]">
                      {f.icon}
                    </div>
                    <h3 className="text-[clamp(20px,4.5vw,24px)] font-extrabold leading-tight tracking-[-0.4px] text-[#0B1F3A]">{f.title}</h3>
                    <p className="mt-1.5 text-[12px] font-extrabold uppercase tracking-[0.5px] text-[#0a8f89]">{f.subtitle}</p>
                  </div>
                  <div className="mt-5 flex-1 text-left">
                    {f.text ? (
                      <p className="text-[14.5px] leading-relaxed text-[#5A6B82]">{f.text}</p>
                    ) : null}
                    <ul className="mt-3 space-y-2">
                      {f.bullets.map((b) => (
                        <li key={b} className="flex items-center gap-2 text-[14px] font-bold text-[#0B1F3A]">
                          <span className="h-1.5 w-1.5 flex-none rounded-full bg-[#16C7C0]" aria-hidden="true" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {sub ? <span className="mt-5 inline-block text-[13px] font-extrabold text-[#0a8f89] sm:text-[14px]">Mehr erfahren →</span> : null}
                </>
              )
              const cardClass =
                "flex h-full flex-col rounded-[16px] border border-[#E3E9F2] bg-white p-5 shadow-[0_6px_20px_rgba(11,31,58,0.07)] transition hover:-translate-y-[3px] hover:border-[#16C7C0]/40 hover:shadow-[0_18px_48px_rgba(11,31,58,0.12)] sm:p-6"
              return sub ? (
                <Link key={f.title} href={`/${sub.slug}`} className={cardClass}>
                  {inner}
                </Link>
              ) : (
                <div key={f.title} className={cardClass}>
                  {inner}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="bg-[#F5F8FC] px-6 py-14">
        <div className="mx-auto max-w-[1120px]">
          <div className="mx-auto mb-9 max-w-[720px] text-center">
            <Eyebrow>Sicher wie ein Schweizer Tresor</Eyebrow>
            <h2 className="mt-[10px] text-[clamp(22px,3vw,30px)] font-extrabold">Ihre Daten bleiben in der Schweiz.</h2>
          </div>
          <div className="grid grid-cols-2 gap-[14px] md:grid-cols-4">
            {TRUST.map((t) => (
              <div key={t.b} className="rounded-[14px] border border-[#E3E9F2] bg-white p-[18px] text-center">
                <div className="text-[24px]">{t.ic}</div>
                <b className="mt-2 block text-[15px] text-[#0B1F3A]">{t.b}</b>
                <span className="text-[12.5px] text-[#5A6B82]">{t.s}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section id="kontakt" className="scroll-mt-20 bg-gradient-to-b from-[#F1F8FF] to-white px-5 py-12 sm:px-6 sm:py-14">
        <div className="mx-auto max-w-[720px]">
          <div className="rounded-[22px] border border-[#E3E9F2] bg-gradient-to-br from-[#F1F8FF] to-[#EAF9F7] p-6 text-center shadow-[0_6px_20px_rgba(11,31,58,0.07)] sm:p-10">
            <Eyebrow>Der zweitbeste Zeitpunkt ist jetzt</Eyebrow>
            <h2 className="mt-[10px] text-[clamp(22px,5vw,30px)] font-extrabold leading-tight">{page.closingTitle}</h2>
            <p className="mx-auto mb-5 mt-3 max-w-[440px] text-[clamp(14px,3.5vw,16px)] font-semibold text-[#5A6B82] sm:mb-[22px]">{page.closingText}</p>
            <div className="flex flex-wrap justify-center gap-3">
              <a href="/#kontakt" className="rounded-[12px] bg-gradient-to-br from-[#3BD974] to-[#22C55E] px-[22px] py-[14px] text-[15px] font-extrabold text-white shadow-[0_10px_24px_rgba(34,197,94,0.32)] transition hover:-translate-y-[1px]">
                Kostenlosen Termin sichern
              </a>
              <a href="/#kontakt" className="rounded-[12px] bg-gradient-to-br from-[#FB923C] to-[#F97316] px-[22px] py-[14px] text-[15px] font-extrabold text-white shadow-[0_10px_24px_rgba(249,115,22,0.3)] transition hover:-translate-y-[1px]">
                💬 Mit dem KI-Assistenten starten
              </a>
            </div>
            <p className="mt-4 text-[11px] text-[#9aa9bf]">
              Hinweis: Jede KI-Interaktion startet mit „Ich bin der KI-Assistent von AgenticIT.“ · DSG-konform.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0B1F3A] py-9 text-[#c6d2e4]">
        <div className="mx-auto flex max-w-[1120px] flex-wrap justify-between gap-10 px-6">
          <div className="max-w-[280px]">
            <div className="text-[19px] font-extrabold text-white">
              Agentic<span className="text-[#16C7C0]">IT</span>
            </div>
            <p className="mt-[10px] text-[13px] text-[#9fb0c8]">KI-Agenten, Omnichannel-Automation und Predictive Lead Scoring für Schweizer Unternehmen.</p>
          </div>
          <div>
            <b className="mb-[10px] block text-[13px] tracking-[0.3px] text-white">LÖSUNGEN</b>
            <Link href="/loesungen" className="block py-[3px] text-[#9fb0c8] hover:text-white">Kundendienst-KI</Link>
            <Link href="/loesungen" className="block py-[3px] text-[#9fb0c8] hover:text-white">Prozessautomatisierung</Link>
            <Link href="/loesungen" className="block py-[3px] text-[#9fb0c8] hover:text-white">RevOps & Growth</Link>
          </div>
          <div>
            <b className="mb-[10px] block text-[13px] tracking-[0.3px] text-white">TECHNOLOGIE</b>
            <Link href="/technologie" className="block py-[3px] text-[#9fb0c8] hover:text-white">Autonome KI-Agenten</Link>
            <Link href="/technologie" className="block py-[3px] text-[#9fb0c8] hover:text-white">Multi-Agenten-Systeme</Link>
            <Link href="/technologie" className="block py-[3px] text-[#9fb0c8] hover:text-white">Enterprise-Integration</Link>
          </div>
          <div>
            <b className="mb-[10px] block text-[13px] tracking-[0.3px] text-white">UNTERNEHMEN</b>
            <Link href="/unternehmen" className="block py-[3px] text-[#9fb0c8] hover:text-white">Über uns</Link>
            <Link href="/datenschutz" className="block py-[3px] text-[#9fb0c8] hover:text-white">Datenschutz</Link>
            <Link href="/impressum" className="block py-[3px] text-[#9fb0c8] hover:text-white">Impressum</Link>
          </div>
        </div>
        <div className="mx-auto mt-6 max-w-[1120px] border-t border-white/10 px-6 pt-4 text-[12px] text-[#8294ad]">
          © 2026 AgenticIT. Alle Rechte vorbehalten.
        </div>
      </footer>
    </main>
  )
}
