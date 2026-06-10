import type { ReactNode } from "react"
import Link from "next/link"
import {
  ArrowRight,
  CalendarCheck,
  CheckCircle2,
  DatabaseZap,
  Mail,
  Scale,
  Shield,
  Users,
} from "lucide-react"
import Aurora from "@/components/site/aurora-bg"
import { Footer } from "@/components/footer"
import { GlassmorphismNav } from "@/components/glassmorphism-nav"
import { CaseStudiesSectionNav } from "@/components/site/case-studies-section-nav"
import { CollapsibleBlock } from "@/components/site/collapsible-block"
import { CaseStudiesContact } from "@/components/site/case-studies-contact"
import { FaqSection } from "@/components/site/faq-section"
import { RelatedLinksSection } from "@/components/site/related-links-section"
import { Button } from "@/components/ui/button"
import { caseStudyFaqs } from "@/lib/seo-faqs"
import { advokCaseStudy as cs } from "@/lib/case-study-advok"
import { speedToLeadPost as blog } from "@/lib/blog-speed-to-lead"

const roleIcons = [Users, Shield, Scale]

export function CaseStudiesPage() {
  return (
    <div className="min-h-screen bg-black">
      <main className="relative min-h-screen">
        <div className="pointer-events-none fixed inset-0">
          <Aurora colorStops={["#475569", "#64748b", "#475569"]} amplitude={1.2} blend={0.6} speed={0.8} />
        </div>

        <div className="relative z-10">
          <GlassmorphismNav />

          <section className="px-4 pb-10 pt-36 sm:px-6 sm:pb-14 sm:pt-40">
            <div className="mx-auto max-w-6xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-md">
                <span className="size-2 animate-pulse rounded-full bg-emerald-300" />
                {cs.hero.eyebrow}
              </div>

              <h1 className="mt-6 text-balance text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
                <span className="bg-gradient-to-r from-white via-emerald-100 to-emerald-200 bg-clip-text text-transparent">
                  {cs.hero.title}
                </span>
                <br />
                <span className="text-white/95">{cs.hero.titleAccent}</span>
              </h1>

              <p className="mt-6 max-w-3xl text-base leading-8 text-white/72 sm:text-lg">
                {cs.hero.subtitle}
              </p>

              <div className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-white/15 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
                {cs.hero.meta.map((item) => (
                  <div key={item.label} className="bg-black/40 px-5 py-4 backdrop-blur-sm">
                    <p className="text-[0.65rem] font-bold uppercase tracking-[0.12em] text-white/45">{item.label}</p>
                    <p className="mt-1 text-sm font-semibold text-white">{item.value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-emerald-300/30 bg-emerald-300/10 sm:grid-cols-2 lg:grid-cols-4">
                {cs.hero.kpis.map((kpi) => (
                  <div
                    key={kpi.label}
                    className="group bg-black/50 px-4 py-6 text-center backdrop-blur-sm transition-colors hover:bg-white/5"
                  >
                    <p className="text-3xl font-bold tracking-tight text-white transition-colors group-hover:text-emerald-100 sm:text-4xl">
                      {kpi.value}
                    </p>
                    <p className="mt-2 text-xs leading-5 text-white/60 sm:text-sm">{kpi.label}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#contact">
                  <Button
                    size="lg"
                    className="rounded-full bg-white px-8 text-black transition-all hover:scale-105 hover:bg-emerald-100"
                  >
                    Strategiegespräch buchen
                    <ArrowRight className="ml-2 size-4" />
                  </Button>
                </a>
                <Link href="/">
                  <Button
                    variant="outline"
                    size="lg"
                    className="rounded-full border-white/20 bg-transparent hover:bg-white/10"
                  >
                    Zur Startseite
                  </Button>
                </Link>
              </div>
            </div>
          </section>

          <CaseStudiesSectionNav />

          <CaseStudySection id="summary" eyebrow={cs.summary.eyebrow} title={cs.summary.title}>
            <div className="grid gap-4">
              <p className="text-base leading-8 text-white/72">{cs.summary.paragraphs[0]}</p>
              <CollapsibleBlock summary="Partnermodell & Resultate im Detail">
                <div className="grid gap-4">
                  <p>{cs.summary.paragraphs[1]}</p>
                  <p>{cs.summary.paragraphs[2]}</p>
                </div>
              </CollapsibleBlock>
            </div>
          </CaseStudySection>

          <CaseStudySection id="situation" eyebrow={cs.situation.eyebrow} title={cs.situation.title}>
            <div className="mb-8 grid gap-4">
              <p className="text-base leading-8 text-white/72">{cs.situation.paragraphs[0]}</p>
              <CollapsibleBlock summary="Auswirkungen für Kanzleien & Versicherer">
                <p className="text-base leading-8 text-white/72">{cs.situation.paragraphs[1]}</p>
              </CollapsibleBlock>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {cs.situation.problems.map((problem) => (
                <article
                  key={problem.title}
                  className="rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/[0.07]"
                >
                  <p className={`text-xs font-bold uppercase tracking-wider ${problem.accent}`}>⚠ {problem.tag}</p>
                  <h3 className="mt-3 text-lg font-semibold text-white">{problem.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-white/65">{problem.text}</p>
                </article>
              ))}
            </div>
          </CaseStudySection>

          <CaseStudySection
            id="solution"
            eyebrow={cs.solution.eyebrow}
            title={cs.solution.title}
            intro={cs.solution.intro}
          >
            <div className="grid gap-4">
              {cs.solution.roles.map((role, index) => {
                const Icon = roleIcons[index] ?? Users
                return (
                  <article
                    key={role.num}
                    className="group grid overflow-hidden rounded-2xl border border-white/15 bg-white/5 transition-all hover:border-emerald-300/30 hover:bg-white/[0.07] md:grid-cols-[72px_1fr]"
                  >
                    <div className="flex items-center justify-center bg-emerald-300/15 text-lg font-black text-emerald-100 md:min-h-full">
                      {role.num}
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-3">
                        <span className="flex size-9 items-center justify-center rounded-lg bg-emerald-300/15 text-emerald-100">
                          <Icon className="size-4" />
                        </span>
                        <h3 className="text-lg font-semibold text-white">{role.title}</h3>
                      </div>
                      <p className="mt-3 text-sm leading-7 text-white/68">{role.text}</p>
                    </div>
                  </article>
                )
              })}
            </div>
          </CaseStudySection>

          <CaseStudySection
            id="technical"
            eyebrow={cs.technical.eyebrow}
            title={cs.technical.title}
            intro={cs.technical.intro}
          >
            <div className="grid gap-3">
              {cs.technical.steps.map((step) => (
                <div
                  key={step.num}
                  className="group grid overflow-hidden rounded-xl border border-white/10 bg-white/[0.04] transition-all hover:border-emerald-300/25 md:grid-cols-[48px_1fr]"
                >
                  <div className="flex items-center justify-center bg-emerald-300/20 text-sm font-bold text-emerald-100">
                    {step.num}
                  </div>
                  <div className="p-4 sm:p-5">
                    <p className="font-semibold text-white">{step.title}</p>
                    <p className="mt-1 text-sm leading-6 text-white/65">{step.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </CaseStudySection>

          <CaseStudySection
            id="results"
            eyebrow={cs.results.eyebrow}
            title={cs.results.title}
            intro={cs.results.intro}
          >
            <div className="overflow-hidden rounded-2xl border border-white/15">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[640px] text-left text-sm">
                  <thead>
                    <tr className="border-b border-emerald-300/30 bg-black/50">
                      <th className="px-4 py-3 font-semibold text-emerald-200">Kennzahl</th>
                      <th className="px-4 py-3 font-semibold text-white/45">Vorher</th>
                      <th className="px-4 py-3 font-semibold text-white">Nachher</th>
                      <th className="px-4 py-3 font-semibold text-emerald-200">Veränderung</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cs.results.rows.map((row, index) => (
                      <tr
                        key={row.metric}
                        className={`border-b border-white/8 transition-colors hover:bg-white/[0.06] ${
                          index % 2 === 0 ? "bg-white/[0.03]" : "bg-transparent"
                        }`}
                      >
                        <td className="px-4 py-3 text-white/75">{row.metric}</td>
                        <td className="px-4 py-3 text-center text-white/45">{row.before}</td>
                        <td className="px-4 py-3 text-center font-semibold text-white">{row.after}</td>
                        <td className="px-4 py-3 text-center font-semibold text-emerald-200">{row.change}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <blockquote className="mt-8 rounded-2xl border border-white/15 bg-white/5 p-8 text-center backdrop-blur-sm sm:p-10">
              <p className="text-lg font-medium italic leading-relaxed text-white/90 sm:text-xl">
                «{cs.results.quote.text}»
              </p>
              <footer className="mt-5 text-sm font-semibold uppercase tracking-wider text-emerald-200">
                — {cs.results.quote.author}
              </footer>
            </blockquote>

            <div className="mt-6 rounded-2xl border border-l-4 border-emerald-300/25 border-l-emerald-300 bg-emerald-300/5 p-6">
              <p className="text-xs font-bold uppercase tracking-wider text-emerald-200">✓ Fazit</p>
              <p className="mt-2 text-sm leading-7 text-white/80 sm:text-base">{cs.results.conclusion}</p>
            </div>
          </CaseStudySection>

          <CaseStudySection
            id="implementation"
            eyebrow={cs.implementation.eyebrow}
            title={cs.implementation.title}
            intro={cs.implementation.intro}
          >
            <div className="grid gap-3">
              {cs.implementation.phases.map((phase) => (
                <div
                  key={phase.period}
                  className="grid overflow-hidden rounded-xl border border-white/10 bg-white/[0.04] transition-all hover:border-white/20 md:grid-cols-[120px_1fr]"
                >
                  <div className="flex items-center justify-center bg-black/30 px-3 py-4 text-center text-xs font-bold uppercase tracking-wide text-emerald-200">
                    {phase.period}
                  </div>
                  <div className="p-4 sm:p-5">
                    <p className="font-semibold text-white">{phase.title}</p>
                    <p className="mt-1 text-sm leading-6 text-white/65">{phase.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </CaseStudySection>

          <CaseStudySection
            id="audience"
            eyebrow={cs.audience.eyebrow}
            title={cs.audience.title}
            intro={cs.audience.intro}
          >
            <div className="grid gap-px overflow-hidden rounded-2xl border border-white/15 bg-white/10 sm:grid-cols-2">
              {cs.audience.fits.map((fit) => (
                <article
                  key={fit.title}
                  className="bg-black/40 p-6 backdrop-blur-sm transition-colors hover:bg-white/[0.04]"
                >
                  <h3 className="flex items-center gap-2 text-base font-semibold text-white">
                    <CheckCircle2 className="size-4 shrink-0 text-emerald-300" />
                    {fit.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-white/65">{fit.text}</p>
                </article>
              ))}
            </div>
          </CaseStudySection>

          <section className="px-4 pb-4 sm:px-6">
            <div className="mx-auto flex max-w-6xl flex-wrap gap-2">
              {cs.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-wide text-white/45"
                >
                  {tag}
                </span>
              ))}
            </div>
          </section>

          <CaseStudySection
            id="speed-to-lead"
            eyebrow={blog.hero.category}
            title="Speed-to-Lead: das Wissen hinter den Resultaten"
            intro={blog.hero.subtitle}
          >
            <div className="grid gap-px overflow-hidden rounded-2xl border border-white/15 bg-white/10 sm:grid-cols-3">
              {blog.stats.map((stat) => (
                <div key={stat.label} className="bg-black/40 p-6 text-center backdrop-blur-sm">
                  <div className="text-3xl font-bold text-emerald-300">{stat.value}</div>
                  <p className="mt-2 text-sm leading-6 text-white/65">{stat.label}</p>
                </div>
              ))}
            </div>
            <h3 className="mt-8 text-xl font-semibold text-white">{blog.speedToLead.title}</h3>
            {blog.speedToLead.paragraphs.map((p, i) => (
              <p key={i} className="mt-3 text-sm leading-7 text-white/70 sm:text-base">
                {p}
              </p>
            ))}
            <blockquote className="mt-6 rounded-xl border-l-4 border-emerald-300 bg-white/[0.04] p-5 text-sm italic leading-7 text-white/80 sm:text-base">
              {blog.speedToLead.quote}
            </blockquote>
          </CaseStudySection>

          <CaseStudiesContact />

          <FaqSection
            title="Häufige Fragen zur advok.app Case Study"
            intro="Kernfragen zu advok.app, Resultaten und Umsetzungsdauer – kompakt beantwortet."
            faqs={caseStudyFaqs}
          />

          <RelatedLinksSection
            title="Verwandte Lösungen"
            links={[
              {
                label: "Smart Apps",
                href: "/smart-apps",
                description: "advok.app ist ein Beispiel für branchenspezifische Smart Apps von AgenticIT.",
              },
              {
                label: "RevOps",
                href: "/revops",
                description: "Ihre Kundengewinnung als ein eingespieltes System – von der Anfrage bis zum Abschluss.",
              },
              {
                label: "KI Agenten",
                href: "/ai-agents",
                description: "Die Technologie hinter autonomen KI-Rechtsassistenten und Lead-Automation.",
              },
            ]}
          />

          <Footer />
        </div>
      </main>
    </div>
  )
}

function CaseStudySection({
  id,
  eyebrow,
  title,
  intro,
  children,
}: {
  id: string
  eyebrow: string
  title: string
  intro?: string
  children: ReactNode
}) {
  return (
    <section id={id} className="scroll-mt-28 px-4 py-10 sm:px-6 sm:py-14">
      <div className="mx-auto max-w-6xl">
        <p className="overline text-sm font-semibold uppercase tracking-[0.2em] text-emerald-200">{eyebrow}</p>
        <h2 className="mt-3 text-balance text-2xl font-semibold text-white sm:text-3xl md:text-4xl">{title}</h2>
        {intro ? <p className="mt-4 max-w-4xl text-base leading-8 text-white/72 sm:text-lg">{intro}</p> : null}
        <div className="mt-8">{children}</div>
      </div>
    </section>
  )
}
