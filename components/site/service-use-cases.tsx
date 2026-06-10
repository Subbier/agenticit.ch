"use client"

import { Zap } from "lucide-react"
import type { ServicePageContent } from "@/lib/site-content"
import { useRevealOnScroll } from "@/hooks/use-reveal-on-scroll"

export function ServiceUseCases({ page }: { page: ServicePageContent }) {
  const { ref, visible, revealClass } = useRevealOnScroll()

  return (
    <section ref={ref} className="py-16 sm:py-24 px-4 relative z-10">
      <div className="max-w-7xl mx-auto rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md p-8 sm:p-12">
        <div className={`grid gap-10 lg:grid-cols-[0.8fr_1.2fr] transition-all duration-1000 ${revealClass}`}>
          <div>
            <p className="overline text-sm font-semibold uppercase tracking-[0.22em] text-emerald-200">Wirkung</p>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white text-balance">
              Vom Kontaktpunkt zum{" "}
              <span className="bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent">
                Wachstumssystem
              </span>
              .
            </h2>
            <p className="mt-5 text-base sm:text-lg text-white/70 leading-relaxed">
              Jeder Use Case verbessert Speed-to-Lead und Lead-Qualifizierung in Ihrer bestehenden Strecke – messbar und
              CRM-integriert.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {page.useCases.map((item, index) => (
              <div
                key={item.title}
                className={`rounded-xl border border-white/10 bg-black/30 backdrop-blur-sm p-5 transition-all duration-700 hover:border-emerald-300/30 hover:bg-black/40 hover:-translate-y-1 ${revealClass}`}
                style={{
                  transitionDelay: visible ? `${400 + index * 150}ms` : "0ms",
                }}
              >
                <div className="flex size-10 items-center justify-center rounded-lg bg-emerald-300/15 text-emerald-100 mb-4">
                  <Zap className="size-5" />
                </div>
                <h3 className="font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-white/65">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
