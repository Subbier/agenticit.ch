"use client"

import { useEffect, useRef } from "react"
import { CalendarCheck, DatabaseZap, Mail } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { LeadForm } from "@/components/site/lead-form"
import { industryLabels } from "@/lib/lead-pricing"

export function CTASection() {
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
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-200">Kennenlernen</p>
            <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-light text-white leading-tight text-balance">
              Sehen Sie in einem kurzen Gespräch, was bei Ihnen möglich ist.
            </h2>
            <p className="mt-6 text-base md:text-lg text-white/70 leading-relaxed">
              Unverbindlich, ohne Vorbereitung von Ihrer Seite. Wir zeigen Ihnen konkret, wie warme Anfragen zu Ihnen
              kommen – und wie das Schnupper-Abo für Ihre Branche aussehen könnte.
            </p>
            <div className="mt-7 grid gap-3 text-sm text-white/70">
              <Benefit icon={CalendarCheck} text="Ein kurzer, unverbindlicher Rückruf" />
              <Benefit icon={DatabaseZap} text="Konkrete Möglichkeiten für Ihre Branche" />
              <Benefit icon={Mail} text="3 Monate testen – keine Startkosten, Zahlung in 3 Raten" />
            </div>
          </div>

          <div className="fade-in-element opacity-0 translate-y-8 transition-all duration-1000 ease-out">
            <LeadForm
              source="home"
              title="Lernen wir uns kurz kennen."
              description="Hinterlassen Sie uns kurz Ihre Angaben – wir melden uns mit einem unverbindlichen Rückruf."
              submitLabel="Rückruf anfragen"
              selectFields={[{ name: "industry", label: "Branche", options: industryLabels }]}
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
