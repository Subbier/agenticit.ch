"use client"

import Link from "next/link"
import { ArrowRight, Bot, BrainCircuit, Layers, Network, Smartphone, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import RotatingText from "@/components/RotatingText"
import type { ServicePageContent } from "@/lib/site-content"

const iconSet = [Bot, Network, BrainCircuit, Smartphone, Layers, Sparkles]

const rotatingByService: Record<string, string[]> = {
  "ai-agents": ["AI Agents", "24/7 Inbound", "Outbound Co-Pilot", "Live-Coaching"],
  revops: ["RevOps", "Anfrage", "Qualifizierung", "Abschluss"],
  excellence: ["Excellence", "Omnichannel", "Lead-Scoring", "Cockpit"],
  omnichannel: ["Omnichannel", "Web", "WhatsApp", "Mail", "Phone"],
  intelligence: ["Predicting", "Lead-Scoring", "Insights", "Cockpit"],
  "smart-apps": ["Smart Apps", "First-Party Data", "Lead Magnet", "Brand Loyalty"],
}

const definitionByService: Record<string, string> = {
  "ai-agents":
    "KI Agenten sind autonome Assistenten von AgenticIT: Anfragen per Telefon, Web und WhatsApp entgegennehmen, Leads qualifizieren, Termine buchen – 24/7.",
  revops:
    "Revenue Operations heisst: Marketing, Vertrieb und Daten als ein System. AgenticIT übernimmt den ganzen Ablauf von der Anfrage bis zum anrufbereiten Kontakt.",
  excellence:
    "Excellence verbindet Omnichannel-Dialog (WhatsApp, Web, Mail, Phone) mit Predicting Lead Scoring – ein Gespräch über alle Kanäle und klare Prioritäten.",
  omnichannel:
    "Omnichannel Marketing verbindet WhatsApp Business API, Web, E-Mail und Telefon zu einer Customer Journey ohne Kontextverlust.",
  intelligence:
    "Lead Scoring bewertet Anfragen nach Kaufwahrscheinlichkeit und Dringlichkeit – AgenticIT liefert Echtzeit-Prioritäten für Ihr Vertriebsteam.",
  "smart-apps":
    "Smart Apps sind branchenspezifische KI-Mini-Apps wie advok.app: echter Nutzen für Endkunden, qualifizierte Leads für Partner.",
}

export function ServiceHero({ page }: { page: ServicePageContent }) {
  const rotating = rotatingByService[page.slug] ?? [page.navLabel, "Agentic AI"]

  return (
    <section className="min-h-[90vh] flex items-center justify-center px-4 py-20 relative">
      <div className="max-w-7xl mx-auto w-full grid gap-12 lg:grid-cols-[1.05fr_0.95fr] items-center relative z-10">
        {/* Left: Headline & CTA */}
        <div className="animate-fade-in-hero text-center lg:text-left">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium mb-8 mt-12 animate-fade-in-badge max-w-[95vw]">
            <span className="w-2 h-2 bg-emerald-300 rounded-full mr-2 animate-pulse shrink-0"></span>
            <span>{page.eyebrow}</span>
          </div>

          {/* Heading + Rotating */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-balance mb-6 animate-fade-in-heading">
            <span className="block text-foreground">{page.title}</span>
            <span className="inline-flex items-center justify-center lg:justify-start flex-wrap gap-2 mt-4 sm:mt-6">
              <RotatingText
                texts={rotating}
                mainClassName="px-2 sm:px-2 md:px-3 bg-white text-black overflow-hidden py-1 sm:py-1 md:py-2 justify-center rounded-lg shadow-lg"
                staggerFrom={"last"}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-120%" }}
                staggerDuration={0.025}
                splitLevelClassName="overflow-hidden pb-1 sm:pb-1 md:pb-1"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                rotationInterval={2200}
              />
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-lg md:text-xl text-white/80 text-balance max-w-2xl mx-auto lg:mx-0 mb-4 leading-relaxed animate-fade-in-subheading font-light">
            {page.subtitle}
          </p>
          <p className="text-sm text-white/55 text-balance max-w-2xl mx-auto lg:mx-0 mb-8 leading-relaxed">
            {definitionByService[page.slug]}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4 animate-fade-in-buttons">
            <a href="#contact">
              <Button
                size="lg"
                className="bg-white text-black rounded-full px-8 py-4 text-lg font-medium transition-all duration-300 hover:bg-gray-50 hover:scale-105 hover:shadow-lg group cursor-pointer"
              >
                {page.primaryCta}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
            <Link href="/">
              <Button
                variant="outline"
                size="lg"
                className="rounded-full px-8 py-4 text-lg font-medium border-border hover:bg-accent transition-all duration-200 hover:scale-105 group bg-transparent cursor-pointer"
              >
                Zur Startseite
              </Button>
            </Link>
          </div>
        </div>

        {/* Right: Live-Console-Card */}
        <div className="animate-fade-in-trust rounded-2xl border border-white/15 bg-black/40 p-5 backdrop-blur-xl shadow-2xl shadow-black/30">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-white/50">AgenticIT Console</p>
              <h2 className="mt-1 text-lg font-semibold text-white">{page.navLabel}</h2>
            </div>
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-300/15 px-3 py-1 text-xs font-medium text-emerald-100 border border-emerald-300/30">
              <span className="size-2 rounded-full bg-emerald-300 animate-pulse" />
              Live
            </span>
          </div>
          <div className="mt-5 grid gap-3">
            {page.useCases.map((item, index) => {
              const Icon = iconSet[index % iconSet.length]
              return (
                <div
                  key={item.title}
                  className="rounded-xl border border-white/10 bg-white/5 p-4 transition-all duration-300 hover:bg-white/10 hover:border-emerald-300/30"
                >
                  <div className="flex items-start gap-3">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-emerald-300/15 text-emerald-100">
                      <Icon className="size-4" />
                    </span>
                    <div>
                      <h3 className="text-sm font-semibold text-white">{item.title}</h3>
                      <p className="mt-1 text-sm leading-6 text-white/60">{item.text}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
