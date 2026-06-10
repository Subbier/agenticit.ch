"use client"

import { Bot, BrainCircuit, CheckCircle2, Layers, Network, Smartphone, Sparkles } from "lucide-react"
import { CollapsibleBlock } from "@/components/site/collapsible-block"
import type { ServicePageContent } from "@/lib/site-content"
import { useRevealOnScroll } from "@/hooks/use-reveal-on-scroll"

const iconSet = [Bot, Network, BrainCircuit, Smartphone, Layers, Sparkles]

export function ServiceSections({ page }: { page: ServicePageContent }) {
  const { ref, revealClass } = useRevealOnScroll()

  return (
    <section ref={ref} className="py-16 sm:py-24 px-4 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className={`text-center mb-12 sm:mb-16 transition-all duration-1000 ${revealClass}`}>
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-emerald-300 rounded-full mr-2 animate-pulse"></span>
            Was {page.navLabel} für Sie leistet
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white text-balance mb-4 sm:mb-6">
            Drei Hebel,{" "}
            <span className="bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent">
              messbarer Impact
            </span>
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {page.sections.map((section, index) => (
            <article
              key={section.title}
              className={`rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur-sm transition-all duration-700 hover:border-emerald-300/30 hover:bg-white/[0.07] hover:-translate-y-0.5 ${revealClass}`}
              style={{ transitionDelay: `${index * 120}ms` }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="flex size-10 items-center justify-center rounded-xl bg-emerald-300/15 text-emerald-100">
                  {(() => {
                    const Icon = iconSet[index % iconSet.length]
                    return <Icon className="size-5" />
                  })()}
                </span>
                <h3 className="text-lg font-semibold text-white">{section.title}</h3>
              </div>
              <p className="text-sm leading-7 text-white/65 mb-4">{section.body}</p>
              <CollapsibleBlock summary="Vorteile im Detail">
                <ul className="space-y-2">
                  {section.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2 text-sm text-white/70">
                      <CheckCircle2 className="size-4 shrink-0 text-emerald-300 mt-0.5" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </CollapsibleBlock>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
