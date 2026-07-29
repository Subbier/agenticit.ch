// Design-System "Carbon & Signal" (26.07.2026). Dieser Renderer bedient
// ausschliesslich Lösungen- (GTM/RevOps) und Technologie-Unterseiten — beide
// im Scope des Redesigns. Startseite/Unternehmen/Karriere sind nicht betroffen.
import Link from "next/link"
import { notFound } from "next/navigation"
import { SUBPAGES, SUBPAGES_BY_PARENT, type SubBullet } from "@/lib/subpage-content"
import { CarbonHeader } from "@/components/site/carbon-header"
import { CarbonFooter } from "@/components/site/carbon-footer"
import { Reveal } from "@/components/site/reveal"
import { CtaContactForm } from "@/components/site/cta-contact-form"
import { VoiceAgentSection } from "@/components/site/voice-agent-section"
import { GtmStrategieSection } from "@/components/site/gtm-strategie-section"
import { GtmChecklisteSection } from "@/components/site/gtm-checkliste-section"
import { AngebotChart } from "@/components/site/angebot-charts"
import { ANGEBOT_BY_KEY } from "@/lib/angebot-content"
import { breadcrumbJsonLd, serviceJsonLd } from "@/lib/seo"

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-[family-name:var(--font-mono-signal)] text-[11px] font-semibold uppercase tracking-[0.22em] text-[#57C7FF]">
      {children}
    </span>
  )
}

function Bullet({ b }: { b: SubBullet }) {
  return (
    <li className="flex items-start gap-2 font-[family-name:var(--font-carbon-text)] text-[14px] font-semibold leading-snug text-[#101418]">
      <span className="mt-[7px] h-1.5 w-1.5 flex-none rounded-full bg-[#1F9A5E]" aria-hidden="true" />
      <span>
        {b.lead ? <span className="font-bold">{b.lead}</span> : null}
        {b.lead && b.text ? " " : ""}
        {b.text ? <span className="font-medium text-[#4A545F]">{b.text}</span> : null}
      </span>
    </li>
  )
}

export function SubPage({ slug }: { slug: string }) {
  const page = SUBPAGES[slug]
  if (!page) notFound()

  const siblings = (SUBPAGES_BY_PARENT[page.parentSlug] ?? []).filter((s) => s.slug !== page.slug)

  const jsonLd = [
    serviceJsonLd({ name: page.meta.title, description: page.meta.description, path: `/${page.slug}` }),
    breadcrumbJsonLd([
      { name: "Start", path: "/" },
      { name: page.parentLabel, path: `/${page.parentSlug}` },
      { name: page.navLabel, path: `/${page.slug}` },
    ]),
  ]

  return (
    <main className="min-h-screen bg-[#FAFAF7] text-[#101418]">
      {jsonLd.map((obj, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(obj) }} />
      ))}

      <CarbonHeader activeSlug={page.parentSlug} />

      {/* HERO = PROBLEM — flach Carbon, harter Schnitt (R4/R7) */}
      <section className="bg-[#0A0C10] px-5 pb-16 pt-16 sm:px-6 sm:pb-20 sm:pt-20">
        <div className="mx-auto flex w-full max-w-[760px] flex-col items-center text-center">
          <nav aria-label="Brotkrumen" className="mb-5 font-[family-name:var(--font-carbon-text)] text-[12px] font-medium text-[#6B7480]">
            <Link href="/" className="hover:text-white">Start</Link>
            <span className="mx-2 text-white/20">/</span>
            <Link href={`/${page.parentSlug}`} className="hover:text-white">{page.parentLabel}</Link>
            <span className="mx-2 text-white/20">/</span>
            <span className="text-[#B9C2CE]">{page.navLabel}</span>
          </nav>
          <span className="font-[family-name:var(--font-mono-signal)] text-[11px] font-semibold uppercase tracking-[0.22em] text-[#57C7FF]">
            {page.parentLabel} · {page.navLabel}
          </span>
          <h1 className="mt-5 max-w-[620px] font-[family-name:var(--font-display)] text-[clamp(29px,5.6vw,45px)] font-bold leading-[1.04] tracking-[-0.02em] text-white">
            {page.problem.title}
          </h1>
          {page.problem.kicker ? (
            <p className="mt-4 max-w-[540px] font-[family-name:var(--font-display)] text-[clamp(16px,3.5vw,20px)] font-bold italic leading-snug text-[#57C7FF]">
              {page.problem.kicker}
            </p>
          ) : null}
          <div className="mt-6 max-w-[600px] space-y-3 font-[family-name:var(--font-carbon-text)] text-[clamp(15px,3.2vw,17px)] leading-relaxed text-[#B9C2CE]">
            {page.problem.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Live-Sprachassistent (echte ElevenLabs-Demo) – nur wo hinterlegt */}
      {page.voiceAgent ? <VoiceAgentSection {...page.voiceAgent} theme="carbon" /> : null}

      {/* AGITATE — hell, flache Karten auf Karten-Grau, kein Glow */}
      <section className="bg-white px-5 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-[1000px]">
          <Reveal className="mx-auto mb-10 flex max-w-[660px] flex-col items-center text-center sm:mb-12">
            <Eyebrow>Was das kostet</Eyebrow>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-[clamp(26px,5.2vw,36px)] font-bold leading-[1.08] tracking-[-0.015em] text-[#101418]">
              {page.agitate.title}
            </h2>
            {page.agitate.intro ? (
              <p className="mt-4 max-w-[560px] font-[family-name:var(--font-carbon-text)] text-[clamp(14px,3.5vw,16px)] leading-relaxed text-[#4A545F]">
                {page.agitate.intro}
              </p>
            ) : null}
          </Reveal>
          <div className="grid gap-4 md:grid-cols-3">
            {page.agitate.bullets.map((b, i) => (
              <Reveal key={i} delay={i * 100} className="h-full">
                <div className="flex h-full flex-col rounded-[14px] border border-[#E1E4E8] bg-[#F1F3F5] p-6">
                  {b.lead ? (
                    <h3 className="border-b border-[#E1E4E8] pb-4 text-center font-[family-name:var(--font-display)] text-[clamp(17px,4vw,20px)] font-bold leading-tight tracking-[-0.01em] text-[#101418]">
                      {b.lead}
                    </h3>
                  ) : null}
                  {b.text ? (
                    <p className="mt-4 flex-1 text-left font-[family-name:var(--font-carbon-text)] text-[14px] leading-relaxed text-[#4A545F]">{b.text}</p>
                  ) : null}
                </div>
              </Reveal>
            ))}
          </div>
          {page.agitate.outro?.length ? (
            <Reveal className="mx-auto mt-10 flex max-w-[660px] flex-col items-center gap-3 text-center font-[family-name:var(--font-carbon-text)] text-[15px] leading-relaxed text-[#4A545F]">
              {page.agitate.outro.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </Reveal>
          ) : null}
        </div>
      </section>

      {/* SOLUTION */}
      <section className="bg-[#FAFAF7] px-5 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-[1000px]">
          <Reveal className="mx-auto mb-12 flex max-w-[660px] flex-col items-center text-center">
            <Eyebrow>Die Lösung</Eyebrow>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-[clamp(26px,5.2vw,36px)] font-bold leading-[1.08] tracking-[-0.015em] text-[#101418]">
              {page.solution.title}
            </h2>
          </Reveal>

          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
            <Reveal className="text-left">
              <div className="space-y-3 font-[family-name:var(--font-carbon-text)] text-[15px] leading-relaxed text-[#4A545F]">
                {page.solution.intro.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              {page.solution.changeTitle ? (
                <p className="mb-3 mt-7 font-[family-name:var(--font-mono-signal)] text-[12px] font-semibold uppercase tracking-[0.18em] text-[#57C7FF]">
                  {page.solution.changeTitle}
                </p>
              ) : (
                <div className="mt-6" />
              )}
              <ul className="space-y-3">
                {page.solution.bullets.map((b, i) => (
                  <Bullet key={i} b={b} />
                ))}
              </ul>
            </Reveal>

            {page.chart || page.solution.easyTitle ? (
              <Reveal delay={120}>
                <div className="rounded-[16px] border border-[#E1E4E8] bg-[#F1F3F5] p-7">
                  {page.chart ? (
                    <div className={page.solution.easyTitle ? "mb-6 border-b border-[#E1E4E8] pb-6" : ""}>
                      <h3 className="text-center font-[family-name:var(--font-mono-signal)] text-[11px] font-semibold uppercase tracking-[0.18em] text-[#57C7FF]">
                        {page.chart.title}
                      </h3>
                      <div className="mt-4">
                        <AngebotChart chart={page.chart} accent={page.chartAccent ?? "#1F9A5E"} />
                      </div>
                    </div>
                  ) : null}
                  {page.solution.easyTitle ? (
                    <>
                      <h3 className="text-center font-[family-name:var(--font-display)] text-[clamp(17px,4vw,20px)] font-bold text-[#101418]">
                        {page.solution.easyTitle}
                      </h3>
                      <p className="mt-3 text-left font-[family-name:var(--font-carbon-text)] text-[14.5px] leading-relaxed text-[#4A545F]">{page.solution.easyText}</p>
                    </>
                  ) : null}
                </div>
              </Reveal>
            ) : null}
          </div>
        </div>
      </section>

      {/* GTM: Story "Warum Go-to-Market entscheidet" + Checklisten-Lead-Magnet */}
      {page.gtmPlaybook ? (
        <>
          <GtmStrategieSection />
          <GtmChecklisteSection />
        </>
      ) : null}

      {siblings.length ? (
        <section className="border-t border-[#E1E4E8] bg-white px-5 py-16 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-[1000px]">
            <Reveal className="mb-10 flex flex-col items-center gap-3 text-center sm:mb-12">
              <h2 className="font-[family-name:var(--font-display)] text-[clamp(21px,4.5vw,26px)] font-bold tracking-[-0.01em] text-[#101418]">
                Weitere Themen aus {page.parentLabel}
              </h2>
              <Link href={`/${page.parentSlug}`} className="font-[family-name:var(--font-carbon-text)] text-[14px] font-semibold text-[#57C7FF] hover:underline">
                Alle {page.parentLabel} ansehen →
              </Link>
            </Reveal>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {siblings.map((s, i) => (
                <Reveal key={s.slug} delay={i * 100} className="h-full">
                  <Link
                    href={`/${s.slug}`}
                    className="group flex h-full flex-col rounded-[14px] border border-[#E1E4E8] bg-[#F1F3F5] p-6 transition duration-200 hover:-translate-y-[3px] hover:border-[#1F9A5E]/40"
                  >
                    <span className="font-[family-name:var(--font-mono-signal)] text-[10.5px] font-semibold uppercase tracking-[0.16em] text-[#57C7FF]">
                      {page.parentLabel}
                    </span>
                    <h3 className="mt-1.5 font-[family-name:var(--font-display)] text-[clamp(17px,4vw,21px)] font-bold leading-tight tracking-[-0.01em] text-[#101418]">
                      {s.navLabel}
                    </h3>
                    <p className="my-4 flex-1 text-left font-[family-name:var(--font-carbon-text)] text-[14px] leading-relaxed text-[#4A545F]">{s.meta.description}</p>
                    <span className="font-[family-name:var(--font-carbon-text)] text-[14px] font-semibold text-[#57C7FF]">Mehr erfahren →</span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {page.relatedAngebot?.length ? (
        <section className="border-t border-[#E1E4E8] bg-[#F1F3F5] px-5 py-16 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-[1000px]">
            <Reveal className="mb-10 flex flex-col items-center gap-2 text-center sm:mb-12">
              <Eyebrow>Passend aus unserem Angebot</Eyebrow>
              <h2 className="mt-2 font-[family-name:var(--font-display)] text-[clamp(21px,4.5vw,26px)] font-bold tracking-[-0.01em] text-[#101418]">
                So setzen wir das für Sie um.
              </h2>
            </Reveal>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {page.relatedAngebot.map((key, i) => {
                const area = ANGEBOT_BY_KEY[key]
                return (
                  <Reveal key={key} delay={i * 100} className="h-full">
                    <Link
                      href={`/${area.slug}`}
                      className="group flex h-full flex-col rounded-[14px] border border-[#E1E4E8] bg-white p-6 transition duration-200 hover:-translate-y-[3px]"
                      style={{ borderTop: `3px solid ${area.accent}` }}
                    >
                      <span className="font-[family-name:var(--font-mono-signal)] text-[10.5px] font-semibold uppercase tracking-[0.16em]" style={{ color: area.accent }}>
                        Angebot · {area.eyebrow}
                      </span>
                      <h3 className="mt-1.5 font-[family-name:var(--font-display)] text-[clamp(17px,4vw,21px)] font-bold leading-tight tracking-[-0.01em] text-[#101418]">
                        {area.name} <span className="text-[#8B94A1]">({area.german})</span>
                      </h3>
                      <p className="my-4 flex-1 text-left font-[family-name:var(--font-carbon-text)] text-[14px] leading-relaxed text-[#4A545F]">{area.tagline}</p>
                      <span className="font-[family-name:var(--font-carbon-text)] text-[14px] font-semibold" style={{ color: area.accent }}>
                        {area.navLabel} entdecken →
                      </span>
                    </Link>
                  </Reveal>
                )
              })}
            </div>
          </div>
        </section>
      ) : null}

      {/* CTA mit Lead-Formular */}
      <section id="kontakt" className="scroll-mt-20 bg-white px-5 py-16 sm:px-6 sm:py-20">
        <Reveal className="mx-auto flex max-w-[640px] flex-col items-center text-center">
          <Eyebrow>Unverbindlich · Persönlich</Eyebrow>
          <h2 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(24px,5vw,32px)] font-bold leading-[1.1] tracking-[-0.015em] text-[#101418]">
            {page.cta.title}
          </h2>
          <p className="mt-4 max-w-[520px] font-[family-name:var(--font-carbon-text)] text-[clamp(15px,3.5vw,17px)] leading-relaxed text-[#4A545F]">{page.cta.text}</p>
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
