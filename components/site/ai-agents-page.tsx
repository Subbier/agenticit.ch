"use client"

import { ArrowRight, Clock, Zap, Wallet, CheckCircle2 } from "lucide-react"
import { GlassmorphismNav } from "@/components/glassmorphism-nav"
import { Footer } from "@/components/footer"
import Aurora from "@/components/site/aurora-bg"
import { AgentTeam } from "@/components/site/agent-team"
import { LeadForm } from "@/components/site/lead-form"
import { JsonLd } from "@/components/site/json-ld"
import { breadcrumbJsonLd, serviceJsonLd, faqPageJsonLd } from "@/lib/seo"
import { pageSeo, aiAgentsFaqs } from "@/lib/seo-faqs"
import { FaqSection } from "@/components/site/faq-section"
import { industryLabels } from "@/lib/lead-pricing"

export function AiAgentsPage() {
  return (
    <div className="min-h-screen bg-black overflow-hidden">
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Startseite", path: "/" },
            { name: "AI Agents", path: "/ai-agents" },
          ]),
          serviceJsonLd({ name: "AI Agents", description: pageSeo["ai-agents"].description, path: "/ai-agents" }),
          faqPageJsonLd(aiAgentsFaqs),
        ]}
      />
      <main className="min-h-screen relative overflow-hidden">
        <div className="fixed inset-0 w-full h-full">
          <Aurora colorStops={["#475569", "#64748b", "#475569"]} amplitude={1.2} blend={0.6} speed={0.8} />
        </div>

        <div className="relative z-10">
          <GlassmorphismNav />

          {/* HERO */}
          <section className="px-4 pt-32 pb-16 sm:pb-20">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium mb-8">
                <span className="w-2 h-2 bg-emerald-300 rounded-full mr-2 animate-pulse shrink-0" />
                AI Agents – Ihr digitales Team
              </div>
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white text-balance mb-6 leading-tight">
                Ein ganzes Team.
                <br />
                <span className="bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent">
                  Geführt wie aus einer Hand.
                </span>
              </h1>
              <p className="text-base sm:text-xl text-white/75 max-w-2xl mx-auto leading-relaxed font-light mb-8">
                Während Sie schlafen, arbeitet Ihr Team weiter: Es findet Kunden, beantwortet Anfragen und bereitet
                Termine vor – und übergibt Ihnen nur das, was zählt. Anrufbereite Kontakte.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href="#contact" className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-lg font-medium text-black transition hover:scale-105 hover:bg-gray-50">
                  Unverbindlich kennenlernen
                  <ArrowRight className="h-5 w-5" />
                </a>
                <a href="#team" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-4 text-lg font-medium text-white transition hover:scale-105 hover:bg-white/10">
                  Mein Team ansehen
                </a>
              </div>
            </div>
          </section>

          {/* INSIGHT */}
          <section className="px-4 py-12 sm:py-16">
            <div className="max-w-3xl mx-auto text-center">
              <p className="overline text-sm font-semibold uppercase tracking-[0.2em] text-emerald-200">Der Gedanke dahinter</p>
              <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-bold text-white text-balance">
                Ein Mensch kann nicht überall zugleich sein. Ein KI-Team schon.
              </h2>
              <p className="mt-5 text-base sm:text-lg text-white/75 leading-relaxed font-light">
                Jeder Agent ist Spezialist für eine Aufgabe – und alle arbeiten zusammen, geführt von einem KI-Manager.
                So entsteht die Schlagkraft einer ganzen Abteilung, ohne dass Sie auch nur eine Person einstellen müssen.
              </p>
            </div>
          </section>

          {/* INTERAKTIVES TEAM */}
          <section id="team" className="scroll-mt-24 px-4 py-12 sm:py-16">
            <div className="max-w-5xl mx-auto grid gap-10 lg:grid-cols-2 lg:items-center">
              <div>
                <p className="overline text-sm font-semibold uppercase tracking-[0.2em] text-emerald-200">Ihr Team</p>
                <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-bold text-white text-balance">
                  Lernen Sie Ihr Team kennen.
                </h2>
                <p className="mt-5 text-base sm:text-lg text-white/75 leading-relaxed font-light">
                  Tippen Sie auf einen Agenten – er zeigt Ihnen, was er rund um die Uhr für Sie übernimmt. In der
                  Mitte hält der KI-Manager alle Fäden zusammen, damit bei Ihnen nur das Ergebnis ankommt.
                </p>
                <ul className="mt-6 space-y-3">
                  {[
                    "Jeder Agent ein Spezialist – keine Reibungsverluste.",
                    "Ein Manager, der priorisiert und übergibt.",
                    "Nahtlos verbunden mit Ihren Tools und Ihrem CRM.",
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-3 text-sm sm:text-base text-white/80">
                      <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-emerald-300" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <AgentTeam />
            </div>
          </section>

          {/* VORTEILE */}
          <section className="px-4 py-12 sm:py-16">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-10">
                <p className="overline text-sm font-semibold uppercase tracking-[0.2em] text-emerald-200">Was das für Sie heisst</p>
                <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-bold text-white text-balance">
                  Mehr Leistung. Weniger Aufwand. Spürbar tiefere Kosten.
                </h2>
              </div>
              <div className="grid gap-5 sm:grid-cols-3">
                {[
                  { icon: Clock, title: "Immer im Einsatz", text: "24/7 aktiv – ohne Pause, ohne Urlaub, ohne Wartezeit. Auch nachts und am Wochenende." },
                  { icon: Zap, title: "Schneller als jedes Team", text: "Reaktion in Sekunden statt Stunden. Wer zuerst antwortet, gewinnt den Kunden." },
                  { icon: Wallet, title: "Bruchteil der Kosten", text: "Die Leistung einer ganzen Abteilung – gesteuert von einer einzigen Person." },
                ].map((c) => (
                  <div key={c.title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm">
                    <div className="mb-4 inline-flex size-10 items-center justify-center rounded-xl bg-emerald-300/15 text-emerald-200">
                      <c.icon className="size-5" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">{c.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-white/65">{c.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* FAQ */}
          <FaqSection
            title="Häufige Fragen zu AI Agents"
            intro="KI-Agenten und Conversational AI von AgenticIT übernehmen Kundenservice und Vertrieb rund um die Uhr: Anfragen über Telefon, Web, WhatsApp Business API und E-Mail werden in Sekunden beantwortet, qualifiziert und per Conversational-AI-CRM-Integration sauber ins CRM übergeben. Gerade KI im Kundenservice zeigt hier den grössten Effekt – schnellere Antworten, weniger Wartezeit, höhere Zufriedenheit."
            faqs={aiAgentsFaqs}
          />

          {/* CONTACT */}
          <section id="contact" className="scroll-mt-24 px-4 py-16 sm:py-20">
            <div className="max-w-5xl mx-auto grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <div>
                <p className="overline text-sm font-semibold uppercase tracking-[0.2em] text-emerald-200">Kennenlernen</p>
                <h2 className="mt-4 text-3xl md:text-4xl font-light text-white leading-tight text-balance">
                  Lassen Sie Ihr Team für sich arbeiten.
                </h2>
                <p className="mt-6 text-base md:text-lg text-white/70 leading-relaxed">
                  In einem kurzen, unverbindlichen Gespräch zeigen wir Ihnen genau, welche Agenten in Ihrer Branche den
                  Unterschied machen – und wie schnell die ersten anrufbereiten Kontakte bei Ihnen ankommen.
                </p>
                <div className="mt-7 grid gap-3 text-sm text-white/70">
                  {[
                    "Kurzer, unverbindlicher Rückruf",
                    "Ihr Agenten-Team für Ihre Branche",
                    "Klarer Fahrplan zu mehr Anfragen",
                  ].map((b) => (
                    <div key={b} className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.04] p-3">
                      <CheckCircle2 className="size-4 shrink-0 text-emerald-200" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              <LeadForm
                source="ai-agents"
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
