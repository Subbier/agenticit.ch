// Branchen-Landingpage im Design "Carbon & Signal" — datengetrieben aus
// lib/branchen-content.ts (Quelle: T-One-Claudio Master, 04_Landingpages).
// Aufbau wie die Lösungs-Unterseiten: Pain → Agitate → Solution → Ablauf →
// FAQ → CTA. Flache Flächen, Signal-Grün nur als Aktionsfarbe.
import Link from "next/link"
import { notFound } from "next/navigation"
import { BRANCHEN_LPS, BRANCHEN_LP_BY_SLUG, type LpBullet } from "@/lib/branchen-content"
import { CarbonHeader } from "@/components/site/carbon-header"
import { CarbonFooter } from "@/components/site/carbon-footer"
import { Reveal } from "@/components/site/reveal"
import { CtaContactForm } from "@/components/site/cta-contact-form"
import { breadcrumbJsonLd, faqPageJsonLd, serviceJsonLd } from "@/lib/seo"

function Eyebrow({ children, tone = "cyan" }: { children: React.ReactNode; tone?: "cyan" | "dark" }) {
  return (
    <span
      className={`font-[family-name:var(--font-mono-signal)] text-[11px] font-semibold uppercase tracking-[0.22em] ${
        tone === "cyan" ? "text-[#57C7FF]" : "text-[#0E7490]"
      }`}
    >
      {children}
    </span>
  )
}

function BulletCard({ b, index }: { b: LpBullet; index: number }) {
  return (
    <Reveal delay={index * 90} className="h-full">
      <div className="flex h-full flex-col rounded-[14px] border border-[#E1E4E8] bg-[#F1F3F5] p-6">
        <h3 className="border-b border-[#E1E4E8] pb-4 font-[family-name:var(--font-display)] text-[clamp(16px,3.8vw,19px)] font-bold leading-tight tracking-[-0.01em] text-[#101418]">
          {b.lead}
        </h3>
        <p className="mt-4 flex-1 font-[family-name:var(--font-carbon-text)] text-[14px] leading-relaxed text-[#4A545F]">{b.text}</p>
      </div>
    </Reveal>
  )
}

export function BranchenLpPage({ slug }: { slug: string }) {
  const lp = BRANCHEN_LP_BY_SLUG[slug]
  if (!lp) notFound()

  const others = BRANCHEN_LPS.filter((o) => o.slug !== lp.slug).slice(0, 4)

  const jsonLd: object[] = [
    serviceJsonLd({ name: lp.meta.title, description: lp.meta.description, path: `/branchen/${lp.slug}` }),
    breadcrumbJsonLd([
      { name: "Start", path: "/" },
      { name: "Branchen", path: "/branchen" },
      { name: lp.navLabel, path: `/branchen/${lp.slug}` },
    ]),
  ]
  if (lp.faq.length) {
    jsonLd.push(faqPageJsonLd(lp.faq.map((f) => ({ question: f.q, answer: f.a }))))
  }

  return (
    <main className="min-h-screen bg-[#FAFAF7] text-[#101418]">
      {jsonLd.map((obj, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(obj) }} />
      ))}

      <CarbonHeader />

      {/* HERO = PROBLEM — flach Carbon */}
      <section className="bg-[#0A0C10] px-5 pb-16 pt-16 sm:px-6 sm:pb-20 sm:pt-20">
        <div className="mx-auto flex w-full max-w-[760px] flex-col items-center text-center">
          <nav aria-label="Brotkrumen" className="mb-5 font-[family-name:var(--font-carbon-text)] text-[12px] font-medium text-[#6B7480]">
            <Link href="/" className="hover:text-white">Start</Link>
            <span className="mx-2 text-white/20">/</span>
            <Link href="/branchen" className="hover:text-white">Branchen</Link>
            <span className="mx-2 text-white/20">/</span>
            <span className="text-[#B9C2CE]">{lp.navLabel}</span>
          </nav>
          <Eyebrow>{lp.hero.eyebrow}</Eyebrow>
          <h1 className="mt-5 max-w-[640px] font-[family-name:var(--font-display)] text-[clamp(28px,5.6vw,44px)] font-bold leading-[1.05] tracking-[-0.02em] text-white">
            {lp.hero.title}
          </h1>
          {lp.hero.kicker ? (
            <p className="mt-4 max-w-[540px] font-[family-name:var(--font-display)] text-[clamp(16px,3.5vw,20px)] font-bold italic leading-snug text-[#57C7FF]">
              {lp.hero.kicker}
            </p>
          ) : null}
          <div className="mt-6 max-w-[600px] space-y-3 font-[family-name:var(--font-carbon-text)] text-[clamp(15px,3.2vw,17px)] leading-relaxed text-[#B9C2CE]">
            {lp.hero.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <a
            href="#kontakt"
            className="mt-8 rounded-[8px] bg-[#8FE05A] px-[26px] py-[14px] font-[family-name:var(--font-carbon-text)] text-[15px] font-semibold text-[#122400] transition hover:bg-[#A2E874]"
          >
            Online-Meeting vereinbaren
          </a>
        </div>
      </section>

      {/* STATS — dunkles Panel-Band, nur wo Zahlen belegt sind */}
      {lp.stats?.length ? (
        <section className="bg-[#0A0C10] px-5 pb-16 sm:px-6">
          <div className="mx-auto grid w-full max-w-[880px] gap-4 rounded-[20px] border border-white/[0.08] bg-[#141A24] p-6 sm:grid-cols-3 sm:p-8">
            {lp.stats.map((s, i) => (
              <div key={i} className="text-center">
                <div className="font-[family-name:var(--font-display)] text-[clamp(24px,4.8vw,32px)] font-bold tracking-[-0.02em] text-[#57C7FF]">
                  {s.value}
                </div>
                <div className="mt-2 font-[family-name:var(--font-carbon-text)] text-[13px] leading-snug text-[#9AA6B2]">{s.label}</div>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {/* PAINS — hell */}
      <section className="bg-white px-5 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-[1000px]">
          <Reveal className="mx-auto mb-10 flex max-w-[660px] flex-col items-center text-center sm:mb-12">
            <Eyebrow tone="dark">Was heute bremst</Eyebrow>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-[clamp(26px,5.2vw,36px)] font-bold leading-[1.08] tracking-[-0.015em] text-[#101418]">
              {lp.pains.title}
            </h2>
            {lp.pains.intro ? (
              <p className="mt-4 max-w-[560px] font-[family-name:var(--font-carbon-text)] text-[clamp(14px,3.5vw,16px)] leading-relaxed text-[#4A545F]">
                {lp.pains.intro}
              </p>
            ) : null}
          </Reveal>
          <div className={`grid gap-4 ${lp.pains.bullets.length === 4 ? "md:grid-cols-2 lg:grid-cols-4" : "md:grid-cols-3"}`}>
            {lp.pains.bullets.map((b, i) => (
              <BulletCard key={i} b={b} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* SOLUTIONS — Use-Cases */}
      <section className="bg-[#FAFAF7] px-5 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-[1000px]">
          <Reveal className="mx-auto mb-10 flex max-w-[660px] flex-col items-center text-center sm:mb-12">
            <Eyebrow tone="dark">Die Lösung</Eyebrow>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-[clamp(26px,5.2vw,36px)] font-bold leading-[1.08] tracking-[-0.015em] text-[#101418]">
              {lp.solutions.title}
            </h2>
            {lp.solutions.intro ? (
              <p className="mt-4 max-w-[560px] font-[family-name:var(--font-carbon-text)] text-[clamp(14px,3.5vw,16px)] leading-relaxed text-[#4A545F]">
                {lp.solutions.intro}
              </p>
            ) : null}
          </Reveal>
          <div className="grid gap-4 md:grid-cols-2">
            {lp.solutions.bullets.map((b, i) => (
              <Reveal key={i} delay={i * 80} className="h-full">
                <div className="flex h-full items-start gap-4 rounded-[14px] border border-[#E1E4E8] bg-white p-6">
                  <span className="mt-[2px] flex h-8 w-8 flex-none items-center justify-center rounded-full bg-[#1F9A5E]/12 font-[family-name:var(--font-display)] text-[14px] font-bold text-[#1F9A5E]">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-[family-name:var(--font-display)] text-[16.5px] font-bold leading-snug tracking-[-0.01em] text-[#101418]">
                      {b.lead}
                    </h3>
                    <p className="mt-2 font-[family-name:var(--font-carbon-text)] text-[14px] leading-relaxed text-[#4A545F]">{b.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ABLAUF */}
      {lp.steps ? (
        <section className="bg-white px-5 py-16 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-[860px]">
            <Reveal className="mx-auto mb-10 flex max-w-[660px] flex-col items-center text-center">
              <Eyebrow tone="dark">So starten Sie</Eyebrow>
              <h2 className="mt-3 font-[family-name:var(--font-display)] text-[clamp(24px,5vw,33px)] font-bold leading-[1.08] tracking-[-0.015em] text-[#101418]">
                {lp.steps.title}
              </h2>
            </Reveal>
            <ol className="space-y-3">
              {lp.steps.items.map((s, i) => (
                <Reveal key={i} delay={i * 80}>
                  <li className="flex items-start gap-4 rounded-[14px] border border-[#E1E4E8] bg-[#FAFAF7] p-5">
                    <span className="flex h-9 w-9 flex-none items-center justify-center rounded-[10px] bg-[#101418] font-[family-name:var(--font-display)] text-[15px] font-bold text-[#8FE05A]">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="font-[family-name:var(--font-display)] text-[15.5px] font-bold text-[#101418]">{s.lead}</h3>
                      <p className="mt-1 font-[family-name:var(--font-carbon-text)] text-[13.5px] leading-relaxed text-[#4A545F]">{s.text}</p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>
      ) : null}

      {/* FAQ */}
      {lp.faq.length ? (
        <section className="bg-[#FAFAF7] px-5 py-16 sm:px-6 sm:py-20">
          <div className="mx-auto w-full max-w-[760px]">
            <Reveal className="mb-8 flex flex-col items-center text-center">
              <Eyebrow tone="dark">Häufige Fragen</Eyebrow>
              <h2 className="mt-3 font-[family-name:var(--font-display)] text-[clamp(23px,4.6vw,30px)] font-bold leading-[1.1] tracking-[-0.015em] text-[#101418]">
                KI in {lp.navLabel === "Fitness & Studios" || lp.navLabel === "Beratung & Consulting" ? "Ihrem Betrieb" : `der Branche ${lp.navLabel}`} — kurz beantwortet
              </h2>
            </Reveal>
            <div className="space-y-3">
              {lp.faq.map((f, i) => (
                <details key={i} className="group rounded-[14px] border border-[#E1E4E8] bg-white px-6 py-1 open:pb-5">
                  <summary className="cursor-pointer list-none py-4 font-[family-name:var(--font-display)] text-[15.5px] font-bold leading-snug text-[#101418] marker:content-none [&::-webkit-details-marker]:hidden">
                    <span className="mr-2 text-[#1F9A5E]">+</span>
                    {f.q}
                  </summary>
                  <p className="font-[family-name:var(--font-carbon-text)] text-[14.5px] leading-relaxed text-[#4A545F]">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* WEITERE BRANCHEN */}
      <section className="bg-white px-5 py-14 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-[1000px]">
          <Reveal className="mb-8 flex flex-col items-center text-center">
            <Eyebrow tone="dark">Auch für Ihre Branche</Eyebrow>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-[clamp(22px,4.4vw,28px)] font-bold leading-[1.1] tracking-[-0.015em] text-[#101418]">
              Weitere Branchenlösungen
            </h2>
          </Reveal>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((o) => (
              <Link
                key={o.slug}
                href={`/branchen/${o.slug}`}
                className="rounded-[14px] border border-[#E1E4E8] bg-[#FAFAF7] p-5 text-center font-[family-name:var(--font-display)] text-[15px] font-bold text-[#101418] transition hover:-translate-y-[2px] hover:border-[#8FE05A]"
              >
                {o.navLabel}
              </Link>
            ))}
          </div>
          <p className="mt-6 text-center font-[family-name:var(--font-carbon-text)] text-[13.5px] text-[#6B7480]">
            <Link href="/branchen" className="font-semibold text-[#0E7490] underline underline-offset-2">Alle Branchen im Überblick</Link>
          </p>
        </div>
      </section>

      {/* CTA mit Lead-Formular */}
      <section id="kontakt" className="scroll-mt-20 bg-[#FAFAF7] px-5 py-16 sm:px-6 sm:py-20">
        <Reveal className="mx-auto flex max-w-[640px] flex-col items-center text-center">
          <Eyebrow tone="dark">Unverbindlich · Persönlich</Eyebrow>
          <h2 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(24px,5vw,32px)] font-bold leading-[1.1] tracking-[-0.015em] text-[#101418]">
            Was liegt in Ihrem Betrieb drin?
          </h2>
          <p className="mt-4 max-w-[520px] font-[family-name:var(--font-carbon-text)] text-[clamp(15px,3.5vw,17px)] leading-relaxed text-[#4A545F]">
            In einem kurzen Gespräch zeigen wir Ihnen, welche Abläufe sich in Ihrem Betrieb
            automatisieren lassen — konkret, messbar und ohne Verpflichtung.
          </p>
          <CtaContactForm />
          <p className="mt-4 font-[family-name:var(--font-carbon-text)] text-[12px] text-[#8B94A1]">
            DSG-konform · Antwort innert 24 Stunden · Keine Verpflichtung
          </p>
        </Reveal>
      </section>

      <CarbonFooter />
    </main>
  )
}
