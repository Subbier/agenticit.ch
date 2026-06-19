import type { LucideIcon } from "lucide-react"
import { CheckCircle2 } from "lucide-react"
import { GlassmorphismNav } from "@/components/glassmorphism-nav"
import { Footer } from "@/components/footer"
import Aurora from "@/components/site/aurora-bg"
import { LeadForm } from "@/components/site/lead-form"
import { FaqSection } from "@/components/site/faq-section"
import { RelatedLinksSection } from "@/components/site/related-links-section"
import { JsonLd } from "@/components/site/json-ld"
import { breadcrumbJsonLd, serviceJsonLd, faqPageJsonLd } from "@/lib/seo"
import type { FaqItem } from "@/lib/seo"
import { industryLabels } from "@/lib/lead-pricing"
import type { LeadSource } from "@/lib/site-content"

export type AgenticPillar = { icon: LucideIcon; title: string; text: string }
export type AgenticSection = { heading: string; body: string[] }
export type AgenticRelated = { label: string; href: string; description: string }

export type AgenticDef = {
  slug: string
  source: LeadSource
  title: string
  description: string
  keywords: string[]
  eyebrow: string
  h1: string
  intro: string
  pillars: AgenticPillar[]
  sections?: AgenticSection[]
  faqs: FaqItem[]
  related?: AgenticRelated[]
  contact: { h2: string; lead: string; bullets: string[] }
}

export function AgenticLanding({ def }: { def: AgenticDef }) {
  return (
    <div className="min-h-screen bg-black overflow-hidden">
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Startseite", path: "/" },
            { name: def.eyebrow, path: `/${def.slug}` },
          ]),
          serviceJsonLd({ name: def.h1, description: def.description, path: `/${def.slug}` }),
          faqPageJsonLd(def.faqs),
        ]}
      />
      <main className="min-h-screen relative overflow-hidden">
        <div className="fixed inset-0 w-full h-full">
          <Aurora colorStops={["#475569", "#64748b", "#475569"]} amplitude={1.2} blend={0.6} speed={0.8} />
        </div>
        <div className="relative z-10">
          <GlassmorphismNav />

          <section className="px-4 pt-28 pb-14 sm:pt-32 sm:pb-16">
            <div className="max-w-4xl mx-auto text-center">
              <p className="overline text-sm font-semibold uppercase tracking-[0.2em] text-emerald-200">{def.eyebrow}</p>
              <h1 className="mt-4 text-4xl md:text-5xl font-light text-white leading-tight text-balance">{def.h1}</h1>
              <p className="mt-6 text-base md:text-lg text-white/70 leading-relaxed">{def.intro}</p>
              <div className="mt-8 flex justify-center">
                <a href="#contact" className="inline-block rounded-lg bg-emerald-300 px-6 py-3 font-medium text-black">
                  Unverbindlich besprechen
                </a>
              </div>
            </div>
          </section>

          <section className="px-4 py-8 sm:py-12">
            <div className="max-w-5xl mx-auto grid gap-6 md:grid-cols-3">
              {def.pillars.map((p) => {
                const Icon = p.icon
                return (
                  <div key={p.title} className="rounded-2xl border border-white/12 bg-white/[0.04] p-6">
                    <span className="flex size-10 items-center justify-center rounded-lg bg-emerald-300/15 text-emerald-200">
                      <Icon className="size-5" />
                    </span>
                    <h2 className="mt-4 text-xl font-semibold text-white">{p.title}</h2>
                    <p className="mt-2 text-sm leading-6 text-white/65">{p.text}</p>
                  </div>
                )
              })}
            </div>
          </section>

          {def.sections && def.sections.length > 0 ? (
            <section className="px-4 py-8 sm:py-12">
              <div className="max-w-3xl mx-auto space-y-10">
                {def.sections.map((sec) => (
                  <div key={sec.heading}>
                    <h2 className="text-2xl font-semibold text-white sm:text-3xl text-balance">{sec.heading}</h2>
                    {sec.body.map((para, i) => (
                      <p key={i} className="mt-4 text-base leading-8 text-white/72">{para}</p>
                    ))}
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          <FaqSection
            title={`Häufige Fragen zu ${def.eyebrow}`}
            intro={def.description}
            faqs={def.faqs}
          />

          {def.related && def.related.length > 0 ? (
            <RelatedLinksSection title="Passende Lösungen" links={def.related} />
          ) : null}

          <section id="contact" className="scroll-mt-24 px-4 py-16 sm:py-20">
            <div className="max-w-5xl mx-auto grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <div>
                <p className="overline text-sm font-semibold uppercase tracking-[0.2em] text-emerald-200">Kennenlernen</p>
                <h2 className="mt-4 text-3xl md:text-4xl font-light text-white leading-tight text-balance">{def.contact.h2}</h2>
                <p className="mt-6 text-base md:text-lg text-white/70 leading-relaxed">{def.contact.lead}</p>
                <div className="mt-7 grid gap-3 text-sm text-white/70">
                  {def.contact.bullets.map((b) => (
                    <div key={b} className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.04] p-3">
                      <CheckCircle2 className="size-4 shrink-0 text-emerald-200" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>
              <LeadForm
                source={def.source}
                title="Lassen Sie uns starten."
                description="Hinterlassen Sie Ihre Daten für einen schnellen, unverbindlichen Strategie-Rückruf."
                submitLabel="Rückruf anfragen"
                selectFields={[{ name: "industry", label: "Branche", options: industryLabels }]}
              />
            </div>
          </section>

          <Footer />
        </div>
      </main>
    </div>
  )
}
