"use client"

import { CalendarCheck, DatabaseZap, Mail } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { LeadForm } from "@/components/site/lead-form"
import { advokCaseStudy as cs } from "@/lib/case-study-advok"

export function CaseStudiesContact() {
  return (
    <section id="contact" className="scroll-mt-28 px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-6xl rounded-2xl border border-white/15 bg-white/[0.04] p-6 sm:p-10">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="overline text-sm font-semibold uppercase tracking-[0.22em] text-emerald-200">Nächster Schritt</p>
            <h2 className="mt-4 text-balance text-3xl font-light text-white sm:text-4xl">{cs.cta.title}</h2>
            <p className="mt-4 text-base leading-7 text-white/70">{cs.cta.description}</p>
            <div className="mt-6 grid gap-3 text-sm text-white/70">
              <Benefit icon={CalendarCheck} text="45-Minuten Strategiegespräch mit Lead-Potenzial-Analyse" />
              <Benefit icon={DatabaseZap} text="ROI-Projektion für Ihre Partnerstruktur" />
              <Benefit icon={Mail} text={cs.cta.email} />
            </div>
            <a
              href={`mailto:${cs.cta.email}`}
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-emerald-200 transition-colors hover:text-white"
            >
              <Mail className="size-4" />
              {cs.cta.email}
            </a>
          </div>

          <LeadForm
            source="case-studies"
            title="Strategiegespräch buchen"
            description="Beschreiben Sie kurz Ihre Branche und Partnerstruktur – wir melden uns mit einem konkreten Vorschlag."
            submitLabel="Jetzt Strategiegespräch buchen"
            selectFields={[
              {
                name: "industry",
                label: "Branche",
                options: ["Rechtsschutz", "Anwaltskanzlei", "Versicherung", "HR/Payroll", "Sonstiges"],
              },
              {
                name: "goal",
                label: "Primäres Ziel",
                options: ["Lead Generation", "Digital Giveaway", "Mandatsvermittlung", "Police-Abschluss"],
              },
            ]}
          />
        </div>
      </div>
    </section>
  )
}

function Benefit({ icon: Icon, text }: { icon: LucideIcon; text: string }) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.04] p-3">
      <Icon className="size-4 shrink-0 text-emerald-200" />
      <span>{text}</span>
    </div>
  )
}
