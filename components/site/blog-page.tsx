import type { ReactNode } from "react"
import Link from "next/link"
import {
  ArrowRight,
  BookOpen,
  Clock,
  FileText,
  Sparkles,
  X,
  Zap,
} from "lucide-react"
import Aurora from "@/components/site/aurora-bg"
import { Footer } from "@/components/footer"
import { GlassmorphismNav } from "@/components/glassmorphism-nav"
import { BlogContact } from "@/components/site/blog-contact"
import { CollapsibleBlock } from "@/components/site/collapsible-block"
import { BlogSectionNav } from "@/components/site/blog-section-nav"
import { FaqSection } from "@/components/site/faq-section"
import { RelatedLinksSection } from "@/components/site/related-links-section"
import { Button } from "@/components/ui/button"
import { blogFaqs } from "@/lib/seo-faqs"
import { speedToLeadPost as post } from "@/lib/blog-speed-to-lead"

export function BlogPage() {
  return (
    <div className="min-h-screen bg-black">
      <main className="relative min-h-screen">
        <div className="pointer-events-none fixed inset-0">
          <Aurora colorStops={["#475569", "#64748b", "#475569"]} amplitude={1.2} blend={0.6} speed={0.8} />
        </div>

        <div className="relative z-10">
          <GlassmorphismNav />

          {/* Blog hub header */}
          <section className="px-4 pb-6 pt-36 sm:px-6 sm:pb-8 sm:pt-40">
            <div className="mx-auto max-w-4xl text-center">
              <p className="overline text-sm font-semibold uppercase tracking-[0.2em] text-emerald-200">AgenticIT Insights</p>
              <h1 className="mt-4 text-balance text-3xl font-semibold text-white sm:text-4xl md:text-5xl">
                Praxiswissen für{" "}
                <span className="bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent">
                  schnelleres Wachstum
                </span>
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-white/65 sm:text-lg">
                Speed-to-Lead, Lead Scoring und KI Agenten – Praxiswissen aus Schweizer Projekten.
              </p>
            </div>
          </section>

          {/* Featured article hero */}
          <section className="px-4 pb-10 sm:px-6">
            <article className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-white/15 bg-white/[0.04] backdrop-blur-sm">
              <div className="border-b border-white/10 bg-gradient-to-r from-emerald-300/10 to-transparent px-6 py-4 sm:px-8">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-200">
                    <BookOpen className="size-3.5" />
                    Featured Article
                  </div>
                  <span className="rounded-full border border-white/15 bg-black/30 px-3 py-1 text-xs text-white/55">
                    {post.hero.readTime}
                  </span>
                </div>
              </div>

              <div className="px-6 py-8 sm:px-10 sm:py-10">
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300/30 bg-emerald-300/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-100">
                  <span className="size-2 animate-pulse rounded-full bg-emerald-300" />
                  {post.hero.category}
                </div>

                <h2 className="mt-5 text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-[2.5rem] md:leading-tight">
                  {post.hero.title}{" "}
                  <span className="bg-gradient-to-r from-white via-emerald-100 to-emerald-200 bg-clip-text text-transparent">
                    {post.hero.titleAccent}
                  </span>
                </h2>

                <p className="mt-5 text-base leading-8 text-white/72 sm:text-lg">{post.hero.subtitle}</p>

                <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 border-t border-white/10 pt-6 text-xs text-white/50 sm:justify-start sm:text-sm">
                  <span>✍️ {post.hero.author}</span>
                  <span className="hidden sm:inline">·</span>
                  <span>📅 {post.hero.date}</span>
                  <span className="hidden sm:inline">·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="size-3.5" />
                    {post.hero.readTime}
                  </span>
                  <span className="hidden sm:inline">·</span>
                  <span>🏷 {post.hero.topics}</span>
                </div>
              </div>
            </article>
          </section>

          {/* Stat banner */}
          <section className="px-4 pb-10 sm:px-6">
            <div className="mx-auto grid max-w-4xl gap-px overflow-hidden rounded-2xl border border-emerald-300/25 bg-emerald-300/10 sm:grid-cols-3">
              {post.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-black/50 px-5 py-7 text-center backdrop-blur-sm transition-colors hover:bg-white/5"
                >
                  <p className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{stat.value}</p>
                  <p className="mt-2 text-xs leading-5 text-white/60 sm:text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </section>

          <BlogSectionNav />

          <ArticleSection id="einstieg">
            <div className="grid gap-5 text-base leading-8 text-white/72">
              <p>{post.intro.paragraphs[0]}</p>
              <CollapsibleBlock summary="Warum Lead-Burnout unsichtbar bleibt">
                <p>{post.intro.paragraphs[1]}</p>
              </CollapsibleBlock>
            </div>
            <Callout variant="warn" label={post.intro.callout.label} text={post.intro.callout.text} />
          </ArticleSection>

          <ArticleSection id="speed-to-lead" title={post.speedToLead.title}>
            <div className="grid gap-5 text-base leading-8 text-white/72">
              <p>{post.speedToLead.paragraphs[0]}</p>
              <CollapsibleBlock summary="Psychologie des Kauffensters – Details">
                <p>{post.speedToLead.paragraphs[1]}</p>
              </CollapsibleBlock>
            </div>
            <blockquote className="mt-8 rounded-2xl border border-white/15 bg-white/5 p-8 backdrop-blur-sm">
              <p className="text-lg font-medium italic leading-relaxed text-white/90 sm:text-xl">
                «{post.speedToLead.quote}»
              </p>
            </blockquote>
          </ArticleSection>

          <ArticleSection id="kosten" title={post.cost.title} intro={post.cost.intro}>
            <CostBox rows={post.cost.rows} />
            <CollapsibleBlock summary="Hochpreis-Szenarien & Sensitivität" className="mt-6">
              <p>{post.cost.outro}</p>
            </CollapsibleBlock>
          </ArticleSection>

          <ArticleSection id="ursachen" title={post.causes.title}>
            <div className="grid gap-8">
              {post.causes.items.map((item, index) => (
                <div key={item.title} className="grid gap-3 sm:grid-cols-[48px_1fr]">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-emerald-300/15 text-sm font-bold text-emerald-100">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-white/65">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <Callout variant="default" label={post.causes.callout.label} text={post.causes.callout.text} />
          </ArticleSection>

          <ArticleSection id="vergleich" title={post.compare.title}>
            <CompareGrid bad={post.compare.bad} good={post.compare.good} />
          </ArticleSection>

          <ArticleSection id="loesung" title={post.solution.title} intro={post.solution.intro}>
            <div className="grid gap-3">
              {post.solution.steps.map((step) => (
                <div
                  key={step.num}
                  className="group grid overflow-hidden rounded-xl border border-white/10 bg-white/[0.04] transition-all hover:border-emerald-300/25 md:grid-cols-[56px_1fr]"
                >
                  <div className="flex items-center justify-center bg-gradient-to-br from-emerald-300/25 to-white/5 text-sm font-black text-emerald-100">
                    {step.num}
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold text-white">{step.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-white/65">{step.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </ArticleSection>

          <ArticleSection id="resultate" title={post.results.title} intro={post.results.intro}>
            <Callout variant="success" label="Typische Resultate nach 30 Tagen">
              <ul className="mt-3 grid gap-3 text-sm leading-7 text-white/80">
                {post.results.highlights.map((item) => (
                  <li key={item.label}>
                    <strong className="text-white">{item.label}</strong> – {item.text}
                  </li>
                ))}
              </ul>
            </Callout>
            <CollapsibleBlock summary="Benchmarks & Methodik" className="mt-6">
              <p>{post.results.outro}</p>
            </CollapsibleBlock>
          </ArticleSection>

          <ArticleSection id="audit" title={post.audit.title} intro={post.audit.intro}>
            <div className="grid gap-3">
              {post.audit.steps.map((step, index) => (
                <div
                  key={step.title}
                  className="grid gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-5 sm:grid-cols-[40px_1fr]"
                >
                  <span className="flex size-9 items-center justify-center rounded-full border border-emerald-300/30 bg-emerald-300/10 text-sm font-bold text-emerald-200">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="font-semibold text-white">{step.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-white/65">{step.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-6 text-base leading-8 text-white/72">{post.audit.outro}</p>
          </ArticleSection>

          {/* Related */}
          <section className="px-4 py-6 sm:px-6">
            <Link
              href={post.related.href}
              className="group mx-auto flex max-w-4xl items-center justify-between gap-4 rounded-2xl border border-white/15 bg-white/5 p-6 transition-all hover:border-emerald-300/30 hover:bg-white/[0.07]"
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-emerald-200">{post.related.title}</p>
                <p className="mt-2 text-sm text-white/65">{post.related.description}</p>
                <p className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-white transition group-hover:text-emerald-100">
                  {post.related.label}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </p>
              </div>
              <FileText className="size-8 shrink-0 text-emerald-200/60" />
            </Link>
          </section>

          <BlogContact />

          <FaqSection
            title="Häufige Fragen zu Speed-to-Lead"
            intro="Kernfragen zu Speed-to-Lead, Lead-Burnout und KI Agenten – kompakt beantwortet."
            faqs={blogFaqs}
          />

          <RelatedLinksSection
            title="Weiterführende Lösungen"
            links={[
              {
                label: "KI Agenten",
                href: "/ai-agents",
                description: "Autonome KI Agenten beenden Lead-Burnout mit Reaktion in Sekunden.",
              },
              {
                label: "Lead Scoring",
                href: "/intelligence",
                description: "Predicting Lead Scoring priorisiert heisse Leads automatisch.",
              },
              {
                label: "ROI-Rechner",
                href: "/#roi-calculator",
                description: "Berechnen Sie Ihr Umsatzpotenzial durch schnellere Lead-Reaktion.",
              },
            ]}
          />

          {/* Author & tags */}
          <section className="px-4 pb-16 sm:px-6">
            <div className="mx-auto max-w-4xl">
              <div className="flex items-center gap-4 rounded-2xl border border-white/15 bg-white/5 p-5 sm:p-6">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-300 to-white/80 text-sm font-black text-neutral-950">
                  AI
                </span>
                <div>
                  <p className="font-semibold text-white">{post.author.name}</p>
                  <p className="text-sm text-white/55">{post.author.role}</p>
                </div>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-wide text-white/45"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </section>

          <Footer />
        </div>
      </main>
    </div>
  )
}

function ArticleSection({
  id,
  title,
  intro,
  children,
}: {
  id: string
  title?: string
  intro?: string
  children: ReactNode
}) {
  return (
    <section id={id} className="scroll-mt-28 px-4 py-8 sm:px-6 sm:py-10">
      <div className="mx-auto max-w-4xl">
        {title ? (
          <h2 className="text-balance text-2xl font-semibold text-white sm:text-3xl">{title}</h2>
        ) : null}
        {intro ? <p className="mt-4 text-base leading-8 text-white/72">{intro}</p> : null}
        <div className={title || intro ? "mt-6" : ""}>{children}</div>
      </div>
    </section>
  )
}

function Callout({
  variant = "default",
  label,
  text,
  children,
}: {
  variant?: "default" | "warn" | "success"
  label: string
  text?: string
  children?: ReactNode
}) {
  const styles = {
    default: "border-emerald-300/40 bg-emerald-300/5 text-emerald-200",
    warn: "border-orange-400/40 bg-orange-400/5 text-orange-300",
    success: "border-emerald-300/40 bg-emerald-300/5 text-emerald-200",
  }

  return (
    <div className={`mt-6 rounded-2xl border-l-4 border-l-current p-5 sm:p-6 ${styles[variant]}`}>
      <p className="text-xs font-bold uppercase tracking-wider">{label}</p>
      {text ? <p className="mt-2 text-sm leading-7 text-white/80 sm:text-base">{text}</p> : null}
      {children}
    </div>
  )
}

function CostBox({
  rows,
}: {
  rows: readonly { label: string; value: string; highlight?: boolean }[]
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-red-400/25 bg-red-400/5 p-6 sm:p-8">
      <h3 className="flex items-center gap-2 text-lg font-semibold text-red-300">
        <Zap className="size-5" />
        Beispielrechnung: Monatlicher Lead-Burnout
      </h3>
      <dl className="mt-5 divide-y divide-white/8">
        {rows.map((row) => (
          <div
            key={row.label}
            className={`flex items-center justify-between gap-4 py-3 text-sm ${
              row.highlight ? "text-red-300" : "text-white/70"
            }`}
          >
            <dt className={row.highlight ? "font-semibold" : ""}>{row.label}</dt>
            <dd className={`shrink-0 font-bold ${row.highlight ? "text-lg" : "text-white"}`}>{row.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

function CompareGrid({
  bad,
  good,
}: {
  bad: { title: string; items: readonly string[] }
  good: { title: string; items: readonly string[] }
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <CompareColumn variant="bad" title={bad.title} items={bad.items} icon={X} />
      <CompareColumn variant="good" title={good.title} items={good.items} icon={Sparkles} />
    </div>
  )
}

function CompareColumn({
  variant,
  title,
  items,
  icon: Icon,
}: {
  variant: "bad" | "good"
  title: string
  items: readonly string[]
  icon: typeof X
}) {
  const isGood = variant === "good"
  return (
    <div
      className={`rounded-2xl border p-6 backdrop-blur-sm transition-all hover:-translate-y-0.5 ${
        isGood
          ? "border-emerald-300/25 bg-emerald-300/5 hover:border-emerald-300/40"
          : "border-red-400/20 bg-red-400/5 hover:border-red-400/35"
      }`}
    >
      <p
        className={`mb-4 flex items-center gap-2 border-b border-white/10 pb-3 text-xs font-bold uppercase tracking-wider ${
          isGood ? "text-emerald-200" : "text-red-300"
        }`}
      >
        <Icon className="size-4" />
        {title}
      </p>
      <ul className="grid gap-3">
        {items.map((item) => (
          <li key={item} className="flex gap-2 text-sm leading-6 text-white/65">
            <span className={isGood ? "text-emerald-300" : "text-red-300"}>•</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}
