"use client"

import { useEffect, useRef } from "react"
import { TestimonialsColumn } from "@/components/ui/testimonials-column"

export function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const fallback = window.setTimeout(() => {
      if (!sectionRef.current) return
      const elements = sectionRef.current.querySelectorAll(".fade-in-element")
      elements.forEach((element, index) => {
        setTimeout(() => {
          element.classList.add("animate-fade-in-up")
        }, index * 300)
      })
    }, 1400)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll(".fade-in-element")
            elements.forEach((element, index) => {
              setTimeout(() => {
                element.classList.add("animate-fade-in-up")
              }, index * 300)
            })
          }
        })
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      window.clearTimeout(fallback)
      observer.disconnect()
    }
  }, [])

  const testimonials = [
    {
      text: "Smart App für personalisierte Routinen und starke Nutzerbindung – First-Party-Daten für Marketing.",
      name: "Good Habits",
      role: "Kunden-App Kategorie",
    },
    {
      text: "Informations- und Assistenz-App für Reisen, Planung und spontane Bedürfnisse unterwegs.",
      name: "Ferien-Info",
      role: "Kunden-App Kategorie",
    },
    {
      text: "Aktivitäts- und Trainings-App zur smarten Begleitung von Fitness- und Gesundheitszielen.",
      name: "Fitness-App",
      role: "Kunden-App Kategorie",
    },
    {
      text: "Foto-basierte Ernährungs-App zur Kalorienabschätzung und datenbasierten Essensanalyse.",
      name: "Food-Foto-Kalorien",
      role: "Kunden-App Kategorie",
    },
    {
      text: "Spezialisierte App für internationale Nutzer mit lokalem Support, Services und Orientierung.",
      name: "Expats-App",
      role: "Kunden-App Kategorie",
    },
    {
      text: "KI-Rechtsassistent advok.app: Erstorientierung, Lead Scoring und Terminvermittlung in Minuten.",
      name: "Advok.app Rechtsberatung",
      role: "Kunden-App Kategorie",
    },
    {
      text: "Health- und Longevity-App für Prävention, Tracking und langfristige Optimierung der Lebensqualität.",
      name: "Long-Livity",
      role: "Kunden-App Kategorie",
    },
    {
      text: "Familienorientierte Lern-App mit individueller Förderung, Assistenz und motivierendem Lernfluss.",
      name: "Learn-App (Familie)",
      role: "Kunden-App Kategorie",
    },
    {
      text: "Finanz-App für Budgetplanung, Übersicht und proaktive Empfehlungen auf Basis von Nutzungsdaten.",
      name: "Finance Budget",
      role: "Kunden-App Kategorie",
    },
  ]

  return (
    <section id="testimonials" ref={sectionRef} className="relative pt-16 pb-16 px-4 sm:px-6 lg:px-8">
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header Section - Keep as user loves it */}
        <div className="text-center mb-16 md:mb-32">
          <div className="fade-in-element opacity-0 translate-y-8 transition-all duration-1000 ease-out inline-flex items-center gap-2 text-white/60 text-sm font-medium tracking-wider uppercase mb-6">
            <div className="w-8 h-px bg-white/30"></div>
            Ausgewählte Aufträge
            <div className="w-8 h-px bg-white/30"></div>
          </div>
          <h2 className="fade-in-element opacity-0 translate-y-8 transition-all duration-1000 ease-out text-5xl md:text-6xl lg:text-7xl font-light text-white mb-8 tracking-tight text-balance">
            Projekte, die wir <span className="font-medium italic">umgesetzt</span> haben
          </h2>
          <p className="fade-in-element opacity-0 translate-y-8 transition-all duration-1000 ease-out text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
            Ein kleiner Einblick in das, was wir bauen. Was bei Ihnen möglich ist, finden wir am besten in einem kurzen Gespräch heraus.
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="fade-in-element opacity-0 translate-y-8 transition-all duration-1000 ease-out relative flex justify-center items-center min-h-[600px] md:min-h-[800px] overflow-hidden">
          <div
            className="flex gap-8 max-w-6xl"
            style={{
              maskImage: "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
            }}
          >
            <TestimonialsColumn testimonials={testimonials.slice(0, 3)} duration={15} className="flex-1" />
            <TestimonialsColumn
              testimonials={testimonials.slice(2, 5)}
              duration={12}
              className="flex-1 hidden md:block"
            />
            <TestimonialsColumn
              testimonials={testimonials.slice(1, 4)}
              duration={18}
              className="flex-1 hidden lg:block"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
