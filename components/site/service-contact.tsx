"use client"

import { useEffect, useRef } from "react"
import { CalendarCheck, DatabaseZap, Mail } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { LeadForm } from "@/components/site/lead-form"
import type { ServicePageContent } from "@/lib/site-content"

export function ServiceContact({ page }: { page: ServicePageContent }) {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll(".fade-in-element")
            elements.forEach((element, index) => {
              setTimeout(() => {
                element.classList.add("animate-fade-in-up")
              }, index * 200)
            })
          }
        })
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="contact" ref={sectionRef} className="relative py-16 px-4 sm:px-6 lg:px-8 mb-32">
      <div className="relative max-w-7xl mx-auto">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div className="fade-in-element opacity-0 translate-y-8 transition-all duration-1000 ease-out">
            <p className="overline text-sm font-semibold uppercase tracking-[0.22em] text-emerald-200">Potenzial-Audit</p>
            <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-light text-white leading-tight text-balance">
              Lassen Sie uns Ihr nächstes{" "}
              <span className="font-medium italic bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent">
                {page.navLabel}
              </span>
              -System konkret machen.
            </h2>
            <p className="mt-6 text-base md:text-lg text-white/70 leading-relaxed">
              Wir analysieren Speed-to-Lead, Lead-Burnout und CRM-Setup – und skizzieren KI Agenten und Automation, die
              in Ihre Prozesse passen.
            </p>
            <div className="mt-7 grid gap-3 text-sm text-white/70">
              <Benefit icon={CalendarCheck} text="Konkrete Hebel mit klarem Zeitplan" />
              <Benefit icon={DatabaseZap} text="Architektur-Skizze für Ihre Systeme" />
              <Benefit icon={Mail} text="Roadmap mit messbarem Quick Win" />
            </div>
          </div>

          <div className="fade-in-element opacity-0 translate-y-8 transition-all duration-1000 ease-out">
            <LeadForm
              source={page.slug}
              title={page.form.title}
              description={page.form.description}
              submitLabel={page.form.submitLabel}
              selectFields={page.form.selectFields}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

function Benefit({ icon: Icon, text }: { icon: LucideIcon; text: string }) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.04] p-3">
      <Icon className="size-4 text-emerald-200 shrink-0" />
      <span>{text}</span>
    </div>
  )
}
