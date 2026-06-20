import Link from "next/link"
import { notFound } from "next/navigation"
import { SUBPAGES, SUBPAGES_BY_PARENT, type SubBullet } from "@/lib/subpage-content"
import { SiteHeader } from "@/components/site/site-header"
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
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0B1F3A] to-[#13294B] px-5 pb-14 pt-14 text-center sm:px-6 sm:pb-16 sm:pt-16">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-[#16C7C0]/10 blur-[120px]" />
        <div className="relative mx-auto flex w-full max-w-[1120px] flex-col items-center">
          <nav aria-label="Brotkrumen" className="mb-4 text-[12px] font-semibold text-[#9fb0c8]">
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
          <h1 className="mt-4 max-w-[580px] text-[clamp(28px,5.5vw,44px)] font-extrabold leading-[1.08] tracking-[-0.8px] text-white">
            {page.problem.title}
          </h1>
          {page.problem.kicker ? (
            <p className="mt-3 max-w-[520px] text-[clamp(16px,3.5vw,20px)] font-extrabold leading-snug text-[#16C7C0]">
              {page.problem.kicker}
            </p>
          ) : null}
          <div className="mt-5 max-w-[600px] space-y-3 text-left text-[clamp(14px,3.2vw,17px)] leading-relaxed text-[#b9c6da] sm:text-center">
            {page.problem.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* AGITATE */}
      <section className="bg-[#FBF5F0] px-5 py-12 sm:px-6 sm:py-14">
        <div className="mx-auto max-w-[960px]">
          <div className="mx-auto mb-8 max-w-[640px] text-center sm:mb-9">
            <span className="inline-block rounded-full bg-[#F97316]/12 px-[13px] py-[6px] text-[12px] font-extrabold uppercase tracking-[0.7px] text-[#C2410C]">
              Was das kostet
            </span>
            <h2 className="mt-[10px] text-[clamp(26px,5.5vw,38px)] font-extrabold leading-[1.08] tracking-[-0.6px] text-[#0B1F3A]">
              {page.agitate.title}
            </h2>
            {page.agitate.intro ? (
              <p className="mt-3 text-[clamp(14px,3.5vw,16px)] text-[#5A6B82]">{page.agitate.intro}</p>
            ) : null}
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {page.agitate.bullets.map((b, i) => (
              <div
                key={i}
                className="flex h-full flex-col rounded-[14px] border border-[#F0D9C7] border-l-[3px] border-l-[#F97316] bg-white p-5 shadow-[0_4px_14px_rgba(11,31,58,0.05)] sm:p-6"
              >
                <div className="border-b border-[#F0D9C7] pb-4 text-center">
                  {b.lead ? (
                    <h3 className="text-[clamp(18px,4vw,22px)] font-extrabold leading-tight tracking-[-0.3px] text-[#0B1F3A]">
                      {b.lead}
                    </h3>
                  ) : null}
                </div>
                {b.text ? (
                  <p className="mt-4 flex-1 text-left text-[14px] leading-relaxed text-[#5A6B82]">{b.text}</p>
                ) : null}
              </div>
            ))}
          </div>
          {page.agitate.outro?.length ? (
            <div className="mx-auto mt-8 max-w-[640px] space-y-3 text-center text-[15px] leading-relaxed text-[#5A6B82]">
              {page.agitate.outro.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          ) : null}
        </div>
      </section>

      {/* SOLUTION */}
      <section className="px-5 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-[960px]">
          <div className="mx-auto mb-10 max-w-[640px] text-center">
            <Eyebrow>Die Lösung</Eyebrow>
            <h2 className="mt-[10px] text-[clamp(26px,5.5vw,38px)] font-extrabold leading-[1.08] tracking-[-0.6px] text-[#0B1F3A]">
              {page.solution.title}
            </h2>
          </div>

          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
            <div className="text-left">
              <div className="space-y-3 text-[15px] leading-relaxed text-[#5A6B82]">
                {page.solution.intro.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              {page.solution.changeTitle ? (
                <p className="mb-3 mt-6 text-[13px] font-extrabold uppercase tracking-[0.6px] text-[#0a8f89]">
                  {page.solution.changeTitle}
                </p>
              ) : (
                <div className="mt-6" />
              )}
              <ul className="space-y-2.5">
                {page.solution.bullets.map((b, i) => (
                  <Bullet key={i} b={b} />
                ))}
              </ul>
            </div>

            <div className="space-y-5">
              {page.solution.easyTitle ? (
                <div className="rounded-[16px] border border-[#E3E9F2] bg-gradient-to-br from-[#F1F8FF] to-[#EAF9F7] p-6 shadow-[0_6px_20px_rgba(11,31,58,0.07)]">
                  <h3 className="text-center text-[clamp(18px,4vw,21px)] font-extrabold text-[#0B1F3A]">{page.solution.easyTitle}</h3>
                  <p className="mt-3 text-left text-[14.5px] leading-relaxed text-[#5A6B82]">{page.solution.easyText}</p>
                </div>
              ) : null}
              {page.interactive ? (
                <div className="rounded-[16px] border border-[#16C7C0]/30 bg-white p-6 shadow-[0_6px_20px_rgba(11,31,58,0.07)]">
                  <div className="text-center">
                    <span className="inline-flex items-center gap-2 rounded-full bg-[#16C7C0]/12 px-[11px] py-[5px] text-[11px] font-extrabold uppercase tracking-[0.5px] text-[#0a8f89]">
                      {page.interactive.label}
                    </span>
                  </div>
                  <p className="mt-3 text-left text-[14.5px] leading-relaxed text-[#5A6B82]">{page.interactive.text}</p>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      {page.contact ? (
        <section className="bg-[#F5F8FC] px-5 py-12 sm:px-6">
          <div className="mx-auto max-w-[960px]">
            <h2 className="text-center text-[clamp(22px,4vw,26px)] font-extrabold text-[#0B1F3A]">So erreichen Sie uns direkt</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { l: "E-Mail", v: page.contact.email },
                { l: "Telefon", v: page.contact.phone },
                { l: "Adresse", v: page.contact.address },
                { l: "Online-Kalender", v: page.contact.calendar },
              ].map((c) => (
                <div key={c.l} className="rounded-[14px] border border-[#E3E9F2] bg-white p-[18px] text-center">
                  <b className="block text-[12px] uppercase tracking-[0.4px] text-[#5A6B82]">{c.l}</b>
                  <span className="mt-1 block text-[14.5px] font-semibold text-[#0B1F3A]">{c.v}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {siblings.length ? (
        <section className="border-t border-[#E3E9F2] px-5 py-12 sm:px-6 sm:py-14">
          <div className="mx-auto max-w-[960px]">
            <div className="mb-8 flex flex-col items-center gap-3 text-center sm:mb-9">
              <h2 className="text-[clamp(22px,4.5vw,28px)] font-extrabold tracking-[-0.4px] text-[#0B1F3A]">
                Weitere Themen aus {page.parentLabel}
              </h2>
              <Link href={`/${page.parentSlug}`} className="text-[14px] font-extrabold text-[#0a8f89] hover:underline">
                Alle {page.parentLabel} ansehen →
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:gap-[18px] md:grid-cols-3">
              {siblings.map((s) => (
                <Link
                  key={s.slug}
                  href={`/${s.slug}`}
                  className="group flex h-full flex-col rounded-[16px] border border-[#E3E9F2] bg-white p-5 shadow-[0_6px_20px_rgba(11,31,58,0.07)] transition hover:-translate-y-[3px] hover:border-[#16C7C0]/40 hover:shadow-[0_18px_48px_rgba(11,31,58,0.12)] sm:p-6"
                >
                  <div className="text-center">
                    <span className="text-[11px] font-extrabold uppercase tracking-[0.5px] text-[#0a8f89]">{page.parentLabel}</span>
                    <h3 className="mt-1.5 text-[clamp(18px,4vw,22px)] font-extrabold leading-tight text-[#0B1F3A]">{s.navLabel}</h3>
                  </div>
                  <p className="my-4 flex-1 text-left text-[14px] leading-relaxed text-[#5A6B82]">{s.meta.description}</p>
                  <span className="text-[13px] font-extrabold text-[#0a8f89] sm:text-[14px]">Mehr erfahren →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* CTA */}
      <section id="kontakt" className="scroll-mt-20 bg-gradient-to-b from-[#F1F8FF] to-white px-5 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-[720px]">
          <div className="rounded-[22px] border border-[#E3E9F2] bg-gradient-to-br from-[#F1F8FF] to-[#EAF9F7] p-6 text-center shadow-[0_6px_20px_rgba(11,31,58,0.07)] sm:p-10">
            <Eyebrow>Der zweitbeste Zeitpunkt ist jetzt</Eyebrow>
            <h2 className="mt-[10px] text-[clamp(24px,5vw,34px)] font-extrabold leading-[1.08] tracking-[-0.5px]">{page.cta.title}</h2>
            <p className="mx-auto mb-5 mt-3 max-w-[520px] text-[clamp(14px,3.5vw,16px)] text-[#5A6B82] sm:mb-[22px]">{page.cta.text}</p>
            <div className="flex flex-wrap justify-center gap-3">
              <a href="/#kontakt" className="rounded-[12px] bg-gradient-to-br from-[#3BD974] to-[#22C55E] px-[22px] py-[14px] text-[15px] font-extrabold text-white shadow-[0_10px_24px_rgba(34,197,94,0.32)] transition hover:-translate-y-[1px]">
                {page.cta.primary}
              </a>
              <a href="/#kontakt" className="rounded-[12px] bg-gradient-to-br from-[#FB923C] to-[#F97316] px-[22px] py-[14px] text-[15px] font-extrabold text-white shadow-[0_10px_24px_rgba(249,115,22,0.3)] transition hover:-translate-y-[1px]">
                💬 {page.cta.assistant}
              </a>
            </div>
            <p className="mt-4 text-[11px] text-[#9aa9bf]">
              Hinweis: Jede KI-Interaktion startet mit „Ich bin der KI-Assistent von AgenticIT.“ · KI-gestützter Entwurf, vor Veröffentlichung menschlich geprüft · DSG-konform.
            </p>
          </div>
        </div>
      </section>

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
            <Link href="/unternehmen/ueber-uns" className="block py-[3px] text-[#9fb0c8] hover:text-white">Über uns</Link>
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
