import Link from "next/link"
import { SITE_TRUST_LINE } from "@/lib/site-trust-line"
import { notFound } from "next/navigation"
import { SUBPAGES, SUBPAGES_BY_PARENT, type SubBullet } from "@/lib/subpage-content"
import { SiteHeader } from "@/components/site/site-header"
import { Reveal } from "@/components/site/reveal"
import { CtaContactForm } from "@/components/site/cta-contact-form"
import { VoiceAgentSection } from "@/components/site/voice-agent-section"
import { breadcrumbJsonLd, serviceJsonLd } from "@/lib/seo"

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block rounded-full bg-[#16C7C0]/12 px-[13px] py-[6px] text-[12px] font-extrabold uppercase tracking-[0.7px] text-[#0a8f89]">
      {children}
    </span>
  )
}

function Bullet({ b }: { b: SubBullet }) {
  return (
    <li className="flex items-start gap-2 text-[14px] font-bold leading-snug text-[#0B1F3A]">
      <span className="mt-[7px] h-1.5 w-1.5 flex-none rounded-full bg-[#16C7C0]" aria-hidden="true" />
      <span>
        {b.lead ? <span className="font-extrabold">{b.lead}</span> : null}
        {b.lead && b.text ? " " : ""}
        {b.text ? <span className="font-semibold text-[#314866]">{b.text}</span> : null}
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
    <main className="min-h-screen bg-white text-[#0B1F3A]">
      {jsonLd.map((obj, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(obj) }} />
      ))}

      <SiteHeader activeSlug={page.parentSlug} />

      {/* HERO = PROBLEM (zentriert) */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0B1F3A] to-[#13294B] px-5 pb-16 pt-16 sm:px-6 sm:pb-20 sm:pt-20">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[460px] w-[860px] -translate-x-1/2 rounded-full bg-[#16C7C0]/10 blur-[130px]" />
        <div className="relative mx-auto flex w-full max-w-[760px] flex-col items-center text-center">
          <nav aria-label="Brotkrumen" className="mb-5 text-[12px] font-semibold text-[#9fb0c8]">
            <Link href="/" className="hover:text-white">
              Start
            </Link>
            <span className="mx-2 text-white/30">/</span>
            <Link href={`/${page.parentSlug}`} className="hover:text-white">
              {page.parentLabel}
            </Link>
            <span className="mx-2 text-white/30">/</span>
            <span className="text-white/80">{page.navLabel}</span>
          </nav>
          <span className="inline-block rounded-full bg-[#16C7C0]/15 px-[13px] py-[6px] text-[11px] font-extrabold uppercase tracking-[0.7px] text-[#16C7C0] sm:text-[12px]">
            {page.parentLabel} · {page.navLabel}
          </span>
          <h1 className="mt-5 max-w-[620px] text-[clamp(29px,5.6vw,45px)] font-extrabold leading-[1.06] tracking-[-0.8px] text-white">
            {page.problem.title}
          </h1>
          {page.problem.kicker ? (
            <p className="mt-4 max-w-[540px] text-[clamp(16px,3.5vw,20px)] font-extrabold leading-snug text-[#16C7C0]">
              {page.problem.kicker}
            </p>
          ) : null}
          <div className="mt-6 max-w-[600px] space-y-3 text-[clamp(15px,3.2vw,17px)] leading-relaxed text-[#b9c6da]">
            {page.problem.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Live-Sprachassistent (echte ElevenLabs-Demo) – nur wo hinterlegt */}
      {page.voiceAgent ? <VoiceAgentSection {...page.voiceAgent} /> : null}

      {/* AGITATE */}
      <section className="bg-[#FBF5F0] px-5 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-[1000px]">
          <Reveal className="mx-auto mb-10 flex max-w-[660px] flex-col items-center text-center sm:mb-12">
            <span className="inline-block rounded-full bg-[#F97316]/12 px-[13px] py-[6px] text-[12px] font-extrabold uppercase tracking-[0.7px] text-[#C2410C]">
              Was das kostet
            </span>
            <h2 className="mt-[12px] text-[clamp(26px,5.2vw,38px)] font-extrabold leading-[1.08] tracking-[-0.6px] text-[#0B1F3A]">
              {page.agitate.title}
            </h2>
            {page.agitate.intro ? (
              <p className="mt-4 max-w-[560px] text-[clamp(14px,3.5vw,16px)] leading-relaxed text-[#5A6B82]">
                {page.agitate.intro}
              </p>
            ) : null}
          </Reveal>
          <div className="grid gap-5 md:grid-cols-3">
            {page.agitate.bullets.map((b, i) => (
              <Reveal key={i} delay={i * 110} className="h-full">
                <div className="flex h-full flex-col rounded-[16px] border border-[#F0D9C7] border-l-[3px] border-l-[#F97316] bg-white p-6 shadow-[0_4px_14px_rgba(11,31,58,0.05)]">
                  {b.lead ? (
                    <h3 className="border-b border-[#F0D9C7] pb-4 text-center text-[clamp(18px,4vw,22px)] font-extrabold leading-tight tracking-[-0.3px] text-[#0B1F3A]">
                      {b.lead}
                    </h3>
                  ) : null}
                  {b.text ? (
                    <p className="mt-4 flex-1 text-left text-[14px] leading-relaxed text-[#5A6B82]">{b.text}</p>
                  ) : null}
                </div>
              </Reveal>
            ))}
          </div>
          {page.agitate.outro?.length ? (
            <Reveal className="mx-auto mt-10 flex max-w-[660px] flex-col items-center gap-3 text-center text-[15px] leading-relaxed text-[#5A6B82]">
              {page.agitate.outro.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </Reveal>
          ) : null}
        </div>
      </section>

      {/* SOLUTION */}
      <section className="px-5 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-[1000px]">
          <Reveal className="mx-auto mb-12 flex max-w-[660px] flex-col items-center text-center">
            <Eyebrow>Die Lösung</Eyebrow>
            <h2 className="mt-[12px] text-[clamp(26px,5.2vw,38px)] font-extrabold leading-[1.08] tracking-[-0.6px] text-[#0B1F3A]">
              {page.solution.title}
            </h2>
          </Reveal>

          <div className="grid items-start gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
            <Reveal className="text-left">
              <div className="space-y-3 text-[15px] leading-relaxed text-[#5A6B82]">
                {page.solution.intro.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              {page.solution.changeTitle ? (
                <p className="mb-3 mt-7 text-[13px] font-extrabold uppercase tracking-[0.6px] text-[#0a8f89]">
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

            {page.solution.easyTitle ? (
              <Reveal delay={120}>
                <div className="rounded-[18px] border border-[#E3E9F2] bg-gradient-to-br from-[#F1F8FF] to-[#EAF9F7] p-7 shadow-[0_6px_20px_rgba(11,31,58,0.07)]">
                  <h3 className="text-center text-[clamp(18px,4vw,21px)] font-extrabold text-[#0B1F3A]">
                    {page.solution.easyTitle}
                  </h3>
                  <p className="mt-3 text-left text-[14.5px] leading-relaxed text-[#5A6B82]">{page.solution.easyText}</p>
                </div>
              </Reveal>
            ) : null}
          </div>
        </div>
      </section>

      {siblings.length ? (
        <section className="border-t border-[#E3E9F2] px-5 py-16 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-[1000px]">
            <Reveal className="mb-10 flex flex-col items-center gap-3 text-center sm:mb-12">
              <h2 className="text-[clamp(22px,4.5vw,28px)] font-extrabold tracking-[-0.4px] text-[#0B1F3A]">
                Weitere Themen aus {page.parentLabel}
              </h2>
              <Link href={`/${page.parentSlug}`} className="text-[14px] font-extrabold text-[#0a8f89] hover:underline">
                Alle {page.parentLabel} ansehen →
              </Link>
            </Reveal>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {siblings.map((s, i) => (
                <Reveal key={s.slug} delay={i * 110} className="h-full">
                  <Link
                    href={`/${s.slug}`}
                    className="group flex h-full flex-col rounded-[18px] border border-[#E3E9F2] bg-white p-6 shadow-[0_6px_20px_rgba(11,31,58,0.07)] transition duration-300 hover:-translate-y-[4px] hover:border-[#16C7C0]/40 hover:shadow-[0_20px_50px_rgba(11,31,58,0.13)]"
                  >
                    <span className="text-[11px] font-extrabold uppercase tracking-[0.5px] text-[#0a8f89]">
                      {page.parentLabel}
                    </span>
                    <h3 className="mt-1.5 text-[clamp(18px,4vw,22px)] font-extrabold leading-tight text-[#0B1F3A]">
                      {s.navLabel}
                    </h3>
                    <p className="my-4 flex-1 text-left text-[14px] leading-relaxed text-[#5A6B82]">{s.meta.description}</p>
                    <span className="text-[14px] font-extrabold text-[#0a8f89]">Mehr erfahren →</span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* CTA mit Lead-Formular */}
      <section id="kontakt" className="scroll-mt-20 bg-gradient-to-b from-[#F1F8FF] to-white px-5 py-16 sm:px-6 sm:py-20">
        <Reveal className="mx-auto flex max-w-[640px] flex-col items-center text-center">
          <Eyebrow>Unverbindlich · Persönlich</Eyebrow>
          <h2 className="mt-[14px] text-[clamp(25px,5vw,35px)] font-extrabold leading-[1.08] tracking-[-0.5px]">
            {page.cta.title}
          </h2>
          <p className="mt-4 max-w-[520px] text-[clamp(15px,3.5vw,17px)] leading-relaxed text-[#5A6B82]">{page.cta.text}</p>
          <CtaContactForm />
          <p className="mt-4 text-[12px] text-[#9aa9bf]">
            DSG-konform · Antwort innert 24 Stunden · Keine Verpflichtung
          </p>
        </Reveal>
      </section>

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
