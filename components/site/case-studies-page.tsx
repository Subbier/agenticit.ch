import { JourneyContent } from "@/components/journey/content"
import design from "@/components/journey/content.module.css"
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
    <div className="min-h-screen bg-[#f5f7f2]">
      <JourneyContent>
        <div className="relative z-10">
          <section className={design.pageHero}>
            <div className="mx-auto max-w-6xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#dce3db] bg-white px-4 py-2 text-sm text-[#202522] backdrop-blur-md">
                <span className="size-2 animate-pulse rounded-full bg-emerald-300" />
                {cs.hero.eyebrow}
              </div>

              <h1 className="mt-6 text-balance text-4xl font-bold tracking-tight text-[#202522] sm:text-5xl md:text-6xl">
                <span className="bg-gradient-to-r from-white via-emerald-100 to-emerald-200 bg-clip-text text-[#4d7c36]">
                  {cs.hero.title}
                </span>
                <br />
                <span className="text-[#202522]">{cs.hero.titleAccent}</span>
              </h1>

              <p className="mt-6 max-w-3xl text-base leading-8 text-[#202522] sm:text-lg">
                {cs.hero.subtitle}
              </p>

              <div className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-[#dce3db] bg-white sm:grid-cols-2 lg:grid-cols-4">
                {cs.hero.meta.map((item) => (
                  <div
                    key={item.label}
                    className="bg-[#f5f7f2] px-5 py-4 backdrop-blur-sm"
                  >
                    <p className="text-[0.65rem] font-bold uppercase tracking-[0.12em] text-[#202522]">
                      {item.label}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-[#202522]">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-emerald-300/30 bg-emerald-300/10 sm:grid-cols-2 lg:grid-cols-4">
                {cs.hero.kpis.map((kpi) => (
                  <div
                    key={kpi.label}
                    className="group bg-[#f5f7f2] px-4 py-6 text-center backdrop-blur-sm transition-colors hover:bg-white"
                  >
                    <p className="text-3xl font-bold tracking-tight text-[#202522] transition-colors group-hover:text-[#4d7c36] sm:text-4xl">
                      {kpi.value}
                    </p>
                    <p className="mt-2 text-xs leading-5 text-[#202522] sm:text-sm">
                      {kpi.label}
                    </p>
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
                    className="rounded-full border-[#dce3db] bg-transparent hover:bg-white"
                  >
                    Zur Startseite
                  </Button>
                </Link>
              </div>
            </div>
          </section>

          <CaseStudiesSectionNav />

          <CaseStudySection
            id="summary"
            eyebrow={cs.summary.eyebrow}
            title={cs.summary.title}
          >
            <div className="grid gap-4">
              <p className="text-base leading-8 text-[#202522]">
                {cs.summary.paragraphs[0]}
              </p>
              <CollapsibleBlock summary="Partnermodell & Resultate im Detail">
                <div className="grid gap-4">
                  <p>{cs.summary.paragraphs[1]}</p>
                  <p>{cs.summary.paragraphs[2]}</p>
                </div>
              </CollapsibleBlock>
            </div>
          </CaseStudySection>

          <CaseStudySection
            id="situation"
            eyebrow={cs.situation.eyebrow}
            title={cs.situation.title}
          >
            <div className="mb-8 grid gap-4">
              <p className="text-base leading-8 text-[#202522]">
                {cs.situation.paragraphs[0]}
              </p>
              <CollapsibleBlock summary="Auswirkungen für Kanzleien & Versicherer">
                <p className="text-base leading-8 text-[#202522]">
                  {cs.situation.paragraphs[1]}
                </p>
              </CollapsibleBlock>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {cs.situation.problems.map((problem) => (
                <article
                  key={problem.title}
                  className="rounded-2xl border border-[#dce3db] bg-white p-6 backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-[#dce3db] hover:bg-white"
                >
                  <p
                    className={`text-xs font-bold uppercase tracking-wider ${problem.accent}`}
                  >
                    ⚠ {problem.tag}
                  </p>
                  <h3 className="mt-3 text-lg font-semibold text-[#202522]">
                    {problem.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-[#202522]">
                    {problem.text}
                  </p>
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
                    className="group grid overflow-hidden rounded-2xl border border-[#dce3db] bg-white transition-all hover:border-emerald-300/30 hover:bg-white md:grid-cols-[72px_1fr]"
                  >
                    <div className="flex items-center justify-center bg-emerald-300/15 text-lg font-black text-[#4d7c36] md:min-h-full">
                      {role.num}
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-3">
                        <span className="flex size-9 items-center justify-center rounded-lg bg-emerald-300/15 text-[#4d7c36]">
                          <Icon className="size-4" />
                        </span>
                        <h3 className="text-lg font-semibold text-[#202522]">
                          {role.title}
                        </h3>
                      </div>
                      <p className="mt-3 text-sm leading-7 text-[#202522]">
                        {role.text}
                      </p>
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
                  className="group grid overflow-hidden rounded-xl border border-[#dce3db] bg-white transition-all hover:border-emerald-300/25 md:grid-cols-[48px_1fr]"
                >
                  <div className="flex items-center justify-center bg-emerald-300/20 text-sm font-bold text-[#4d7c36]">
                    {step.num}
                  </div>
                  <div className="p-4 sm:p-5">
                    <p className="font-semibold text-[#202522]">{step.title}</p>
                    <p className="mt-1 text-sm leading-6 text-[#202522]">
                      {step.text}
                    </p>
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
            <div className="overflow-hidden rounded-2xl border border-[#dce3db]">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[640px] text-left text-sm">
                  <thead>
                    <tr className="border-b border-emerald-300/30 bg-[#f5f7f2]">
                      <th className="px-4 py-3 font-semibold text-[#4d7c36]">
                        Kennzahl
                      </th>
                      <th className="px-4 py-3 font-semibold text-[#202522]">
                        Vorher
                      </th>
                      <th className="px-4 py-3 font-semibold text-[#202522]">
                        Nachher
                      </th>
                      <th className="px-4 py-3 font-semibold text-[#4d7c36]">
                        Veränderung
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {cs.results.rows.map((row, index) => (
                      <tr
                        key={row.metric}
                        className={`border-b border-[#dce3db] transition-colors hover:bg-white ${
                          index % 2 === 0 ? "bg-white" : "bg-transparent"
                        }`}
                      >
                        <td className="px-4 py-3 text-[#202522]">
                          {row.metric}
                        </td>
                        <td className="px-4 py-3 text-center text-[#202522]">
                          {row.before}
                        </td>
                        <td className="px-4 py-3 text-center font-semibold text-[#202522]">
                          {row.after}
                        </td>
                        <td className="px-4 py-3 text-center font-semibold text-[#4d7c36]">
                          {row.change}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <blockquote className="mt-8 rounded-2xl border border-[#dce3db] bg-white p-8 text-center backdrop-blur-sm sm:p-10">
              <p className="text-lg font-medium italic leading-relaxed text-[#202522] sm:text-xl">
                «{cs.results.quote.text}»
              </p>
              <footer className="mt-5 text-sm font-semibold uppercase tracking-wider text-[#4d7c36]">
                — {cs.results.quote.author}
              </footer>
            </blockquote>

            <div className="mt-6 rounded-2xl border border-l-4 border-emerald-300/25 border-l-emerald-300 bg-emerald-300/5 p-6">
              <p className="text-xs font-bold uppercase tracking-wider text-[#4d7c36]">
                ✓ Fazit
              </p>
              <p className="mt-2 text-sm leading-7 text-[#202522] sm:text-base">
                {cs.results.conclusion}
              </p>
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
                  className="grid overflow-hidden rounded-xl border border-[#dce3db] bg-white transition-all hover:border-[#dce3db] md:grid-cols-[120px_1fr]"
                >
                  <div className="flex items-center justify-center bg-[#f5f7f2] px-3 py-4 text-center text-xs font-bold uppercase tracking-wide text-[#4d7c36]">
                    {phase.period}
                  </div>
                  <div className="p-4 sm:p-5">
                    <p className="font-semibold text-[#202522]">
                      {phase.title}
                    </p>
                    <p className="mt-1 text-sm leading-6 text-[#202522]">
                      {phase.text}
                    </p>
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
            <div className="grid gap-px overflow-hidden rounded-2xl border border-[#dce3db] bg-white sm:grid-cols-2">
              {cs.audience.fits.map((fit) => (
                <article
                  key={fit.title}
                  className="bg-[#f5f7f2] p-6 backdrop-blur-sm transition-colors hover:bg-white"
                >
                  <h3 className="flex items-center gap-2 text-base font-semibold text-[#202522]">
                    <CheckCircle2 className="size-4 shrink-0 text-[#4d7c36]" />
                    {fit.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-[#202522]">
                    {fit.text}
                  </p>
                </article>
              ))}
            </div>
          </CaseStudySection>

          <section className="px-4 pb-4 sm:px-6">
            <div className="mx-auto flex max-w-6xl flex-wrap gap-2">
              {cs.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md border border-[#dce3db] bg-white px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-wide text-[#202522]"
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
            <div className="grid gap-px overflow-hidden rounded-2xl border border-[#dce3db] bg-white sm:grid-cols-3">
              {blog.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-[#f5f7f2] p-6 text-center backdrop-blur-sm"
                >
                  <div className="text-3xl font-bold text-[#4d7c36]">
                    {stat.value}
                  </div>
                  <p className="mt-2 text-sm leading-6 text-[#202522]">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
            <h3 className="mt-8 text-xl font-semibold text-[#202522]">
              {blog.speedToLead.title}
            </h3>
            {blog.speedToLead.paragraphs.map((p, i) => (
              <p
                key={i}
                className="mt-3 text-sm leading-7 text-[#202522] sm:text-base"
              >
                {p}
              </p>
            ))}
            <blockquote className="mt-6 rounded-xl border-l-4 border-emerald-300 bg-white p-5 text-sm italic leading-7 text-[#202522] sm:text-base">
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
                description:
                  "advok.app ist ein Beispiel für branchenspezifische Smart Apps von AgenticIT.",
              },
              {
                label: "RevOps",
                href: "/revops",
                description:
                  "Ihre Kundengewinnung als ein eingespieltes System – von der Anfrage bis zum Abschluss.",
              },
              {
                label: "KI Agenten",
                href: "/ai-agents",
                description:
                  "Die Technologie hinter autonomen KI-Rechtsassistenten und Lead-Automation.",
              },
            ]}
          />
        </div>
      </JourneyContent>
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
        <p className="overline text-sm font-semibold uppercase tracking-[0.2em] text-[#4d7c36]">
          {eyebrow}
        </p>
        <h2 className="mt-3 text-balance text-2xl font-semibold text-[#202522] sm:text-3xl md:text-4xl">
          {title}
        </h2>
        {intro ? (
          <p className="mt-4 max-w-4xl text-base leading-8 text-[#202522] sm:text-lg">
            {intro}
          </p>
        ) : null}
        <div className="mt-8">{children}</div>
      </div>
    </section>
  )
}
