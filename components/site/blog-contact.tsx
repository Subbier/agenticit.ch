"use client"

import { CalendarCheck, DatabaseZap, Mail, Timer } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { LeadForm } from "@/components/site/lead-form"
import { speedToLeadPost as post } from "@/lib/blog-speed-to-lead"

export function BlogContact() {
  return (
    <section id="contact" className="scroll-mt-28 px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-4xl rounded-2xl border border-emerald-300/25 bg-gradient-to-br from-emerald-300/10 via-transparent to-white/[0.04] p-6 sm:p-10">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <p className="overline text-sm font-semibold uppercase tracking-[0.22em] text-emerald-200">Potenzial-Audit</p>
            <h2 className="mt-4 text-balance text-3xl font-light text-white sm:text-4xl">{post.cta.title}</h2>
            <p className="mt-4 text-base leading-7 text-white/70">{post.cta.description}</p>
            <div className="mt-6 grid gap-3 text-sm text-white/70">
              <Benefit icon={Timer} text="Reaktionszeit-Analyse Ihrer aktuellen Lead-Strecke" />
              <Benefit icon={DatabaseZap} text="Lead-Verlust in CHF quantifiziert" />
              <Benefit icon={CalendarCheck} text="Konkrete Roadmap mit ROI-Schätzung" />
            </div>
            <a
              href="mailto:hello@agenticit.ch"
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-emerald-200 transition-colors hover:text-white"
            >
              <Mail className="size-4" />
              hello@agenticit.ch
            </a>
          </div>

          <LeadForm
            source="blog"
            title="Potenzial-Audit sichern"
            description="Beschreiben Sie kurz Ihre Lead-Situation – wir zeigen Ihnen, wo Speed-to-Lead heute verbrennt."
            submitLabel="Jetzt Potenzial-Audit sichern"
            selectFields={[
              {
                name: "leadVolume",
                label: "Monatliches Lead-Volumen",
                options: ["< 100", "100-500", "500+"],
              },
              {
                name: "challenge",
                label: "Grösste Herausforderung",
                options: ["Antwortzeit", "Lead-Qualifizierung", "CRM-Integration", "Kundenbindung"],
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
