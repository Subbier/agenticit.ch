"use client"

import { useEffect, useRef, useState } from "react"
import {
  ArrowRight,
  PhoneCall,
  Megaphone,
  TrendingUp,
  Bot,
  Users,
  Zap,
  CheckCircle2,
} from "lucide-react"
import dynamic from "next/dynamic"
import { GlassmorphismNav } from "@/components/glassmorphism-nav"

// Footer lädt framer-motion – lazy, damit es nicht im kritischen Bundle der Startseite landet
const Footer = dynamic(() => import("@/components/footer").then((m) => m.Footer))
import Aurora from "@/components/site/aurora-bg"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LeadForm } from "@/components/site/lead-form"
import { FlywheelMiniInteractive } from "@/components/site/flywheel"
import { AgentsInteractive, BrandsInteractive } from "@/components/site/pillar-visuals"
import { JsonLd } from "@/components/site/json-ld"
import { FaqSection } from "@/components/site/faq-section"
import { homeFaqs } from "@/lib/seo-faqs"
import { industries, industryLabels } from "@/lib/lead-pricing"
import { getDemand, DEFAULT_DEMAND } from "@/lib/demand-data"

type HomePageProps = {
  jsonLd?: Record<string, unknown>[]
}

const nf = new Intl.NumberFormat("de-CH")

function useCountUp(target: number, duration = 900) {
  const [value, setValue] = useState(target)
  const fromRef = useRef(target)
  useEffect(() => {
    const from = fromRef.current
    const start = performance.now()
    let raf = 0
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      setValue(Math.round(from + (target - from) * eased))
      if (t < 1) raf = requestAnimationFrame(tick)
      else fromRef.current = target
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, duration])
  return value
}

const pillars = [
  {
    key: "revops",
    tab: "RevOps",
    href: "/revops",
    title: "Wir steuern Ihren gesamten Vertrieb.",
    text: "Vom ersten Klick bis zur Empfehlung – wir treiben Ihr digitales Schwungrad an. Effizient, messbar und ohne Aufwand für Ihr Team.",
    bullets: [
      "Nahtlose Prozesse: Marketing, Vertrieb und Service verschmelzen zu einer automatisierten Einheit.",
      "Datengesteuertes Wachstum: Kontinuierliche Optimierung maximiert Ihre Conversion-Rate.",
      "Volle Entlastung: Die Neukundengewinnung läuft verlässlich im Hintergrund.",
    ],
    visual: FlywheelMiniInteractive,
  },
  {
    key: "aiagents",
    tab: "AI Agents",
    href: "/ai-agents",
    title: "Ein KI-Agent erledigt die Arbeit eines ganzen Teams.",
    text: "Ein KI-Manager koordiniert spezialisierte Sub-Agenten für Ihre gesamte Kundenreise – tippen Sie sich einfach durch:",
    bullets: [
      "Strategie-Agent: Analysiert den Markt und steuert Kampagnen live.",
      "Content-Agent: Erstellt konvertierende Werbemittel und Landingpages.",
      "Daten-Agent: Optimiert Budgets rund um die Uhr für maximale Effizienz.",
    ],
    visual: AgentsInteractive,
  },
  {
    key: "excellence",
    tab: "Excellence",
    href: "/excellence",
    title: "Akkreditiert in allen wichtigen Plattformen.",
    text: "Wir sind in den führenden Tools zertifiziert, die Ihren Erfolg sichern. Tippen Sie eine Plattform an:",
    bullets: [
      "Performance: Google Ads, Meta und LinkedIn für maximale Reichweite.",
      "CRM & Automation: Smarte Integration in HubSpot, Salesforce oder Make.",
      "Web & SEO: Modernste Infrastruktur für messbar mehr Anfragen.",
    ],
    visual: BrandsInteractive,
  },
] as const

export function HomePage({ jsonLd }: HomePageProps) {
  const [industry, setIndustry] = useState<string>(DEFAULT_DEMAND)
  const [activePillar, setActivePillar] = useState<string>("revops")
  const demand = getDemand(industry)
  const hasNumber = demand.monthlySearches > 0
  const animated = useCountUp(demand.monthlySearches)
  const perDay = Math.round(demand.monthlySearches / 30)
  const pillar = pillars.find((p) => p.key === activePillar) ?? pillars[0]
  const PillarVisual = pillar.visual

  return (
    <div className="min-h-screen bg-black overflow-hidden">
      {jsonLd ? <JsonLd data={jsonLd} /> : null}
      <main className="min-h-screen relative overflow-hidden">
        <div className="fixed inset-0 w-full h-full">
          <Aurora colorStops={["#475569", "#64748b", "#475569"]} amplitude={1.2} blend={0.6} speed={0.8} />
        </div>

        <div className="relative z-10">
          <GlassmorphismNav />

          {/* HERO + POTENZIALRECHNER */}
          <section className="px-4 pt-28 pb-12 sm:pt-32 sm:pb-16">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium mb-8">
                <span className="w-2 h-2 bg-emerald-300 rounded-full mr-2 animate-pulse shrink-0" />
                Ihr Potenzial in der Deutschschweiz – in 5 Sekunden
              </div>
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white text-balance mb-5 leading-tight">
                Sie prägen die Vision.
                <br />
                <span className="bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent">
                  Wir bauen den Antrieb.
                </span>
              </h1>
              <p className="text-base sm:text-xl text-white/75 max-w-2xl mx-auto leading-relaxed font-light mb-10">
                Wählen Sie Ihre Branche: Sehen Sie sofort, wie viel Nachfrage in der Deutschschweiz bereitsteht – und
                wie wir sie direkt zu Ihnen lenken.
              </p>

              <div className="mx-auto max-w-2xl rounded-3xl border border-white/15 bg-white/[0.05] p-6 sm:p-8 backdrop-blur-xl shadow-2xl shadow-black/30">
                <label className="block text-sm font-medium text-white/70 mb-3">Ihre Branche</label>
                <Select value={industry} onValueChange={setIndustry}>
                  <SelectTrigger aria-label="Ihre Branche" className="h-12 bg-white/10 border-white/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-gray-700">
                    {industries.map((ind) => (
                      <SelectItem key={ind.value} value={ind.value}>
                        {ind.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {hasNumber ? (
                  <div className="mt-8">
                    <p className="overline text-sm uppercase tracking-[0.18em] text-emerald-200">Suchvolumen pro Monat</p>
                    <div className="mt-1 text-5xl sm:text-6xl font-bold text-white tabular-nums">{nf.format(animated)}</div>
                    <p className="mt-2 text-sm text-white/60">
                      ≈ {nf.format(perDay)} Menschen suchen täglich in der Deutschschweiz exakt danach.
                    </p>
                    <div className="mt-6">
                      <div className="flex h-4 w-full overflow-hidden rounded-full bg-white/10">
                        <div className="h-full bg-emerald-300" style={{ width: "4%" }} />
                        <div className="h-full bg-white/15" style={{ width: "96%" }} />
                      </div>
                      <div className="mt-2 flex justify-between text-xs text-white/55">
                        <span className="text-emerald-200">Heute bei Ihnen</span>
                        <span>Ungenutzter Umsatz</span>
                      </div>
                    </div>
                    <p className="mt-6 text-base text-white/80 leading-relaxed">
                      Diese Nachfrage ist da. Die Frage ist nur: Landet sie bei Ihnen – oder bei jemand anderem? In
                      einem kurzen, unverbindlichen Rückruf zeigen wir Ihnen, wie Ihre Kundenreise konkret aussähe.
                    </p>
                    <a
                      href="#contact"
                      className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-base font-semibold text-black transition hover:scale-105 hover:bg-gray-50"
                    >
                      Diese Anfragen sichern
                      <ArrowRight className="h-5 w-5" />
                    </a>
                    <p className="mt-3 text-xs text-white/50">
                      3 Monate testen – keine Startkosten. Sie entscheiden danach in Ruhe.
                    </p>
                  </div>
                ) : (
                  <div className="mt-8">
                    <p className="text-base text-white/80 leading-relaxed">
                      Sagen Sie uns Ihre Branche im Gespräch – wir ermitteln Ihre genaue Nachfrage in der Deutschschweiz
                      und zeigen Ihnen, wie wir diese Anfragen zu Ihnen bringen.
                    </p>
                    <a
                      href="#contact"
                      className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-base font-semibold text-black transition hover:scale-105 hover:bg-gray-50"
                    >
                      Mein Potenzial ermitteln
                      <ArrowRight className="h-5 w-5" />
                    </a>
                  </div>
                )}
              </div>
              <p className="mt-4 text-xs text-white/60">
                Basis: Relevante Top-Suchbegriffe Ihrer Branche (Google, Deutschschweiz).
              </p>
            </div>
          </section>

          {/* PROBLEM */}
          <section className="px-4 py-12 sm:py-16">
            <div className="max-w-3xl mx-auto text-center">
              <p className="overline text-sm font-semibold uppercase tracking-[0.2em] text-emerald-200">Der Hebel</p>
              <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-bold text-white text-balance">
                Die Nachfrage ist längst da. Sie sucht nach Ihnen.
              </h2>
              <p className="mt-5 text-base sm:text-lg text-white/75 leading-relaxed font-light">
                Täglich suchen Kunden Ihre Expertise. Es fehlt nur der digitale Weg, der sie im perfekten Moment zu
                Ihnen führt. Sichern Sie sich diese Abschlüsse direkt in Ihrem System – wir automatisieren das für Sie.
              </p>
            </div>
          </section>

          {/* INTERAKTIVER 3-SÄULEN-SLIDER */}
          <section className="px-4 py-12 sm:py-16">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-8">
                <p className="overline text-sm font-semibold uppercase tracking-[0.2em] text-emerald-200">Alles aus einer Hand</p>
                <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-bold text-white text-balance">
                  Ihr Partner für den gesamten digitalen Vertrieb.
                </h2>
              </div>

              {/* Tabs */}
              <div className="mx-auto mb-6 flex max-w-md gap-2 rounded-full border border-white/12 bg-white/[0.04] p-1.5 backdrop-blur-sm">
                {pillars.map((p) => (
                  <button
                    key={p.key}
                    onClick={() => setActivePillar(p.key)}
                    className={`flex-1 rounded-full px-3 py-2 text-sm font-semibold transition ${
                      activePillar === p.key ? "bg-white text-black" : "text-white/70 hover:text-white"
                    }`}
                  >
                    {p.tab}
                  </button>
                ))}
              </div>

              <div className="grid items-center gap-8 rounded-3xl border border-white/10 bg-white/[0.04] p-6 sm:p-10 backdrop-blur-sm md:grid-cols-2">
                <div className="order-2 md:order-1">
                  <h3 className="text-xl sm:text-2xl font-bold text-white text-balance">{pillar.title}</h3>
                  <p className="mt-4 text-base text-white/72 leading-relaxed">{pillar.text}</p>
                  <ul className="mt-5 space-y-2.5">
                    {pillar.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-3 text-sm text-white/80">
                        <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-300" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href={pillar.href}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-200 hover:underline underline-offset-4"
                  >
                    Mehr zu {pillar.tab}
                    <ArrowRight className="size-4" />
                  </a>
                </div>
                <div className="order-1 w-full md:order-2">
                  <PillarVisual />
                </div>
              </div>
            </div>
          </section>

          {/* DREI STRIPES */}
          <section className="px-4 py-12 sm:py-16">
            <div className="max-w-4xl mx-auto space-y-4">
              {[
                {
                  icon: Megaphone,
                  title: "Digitale Sichtbarkeit, die direkt überzeugt.",
                  text: "Perfekt platziert: Ihr Angebot erscheint exakt im Moment der höchsten Kaufbereitschaft Ihrer Zielgruppe.",
                },
                {
                  icon: PhoneCall,
                  title: "Kaufbereite Kontakte für Sie.",
                  text: "Keine Kaltakquise mehr: Der Interessent ist bereits digital vorüberzeugt und fordert gezielt Ihr Angebot an.",
                },
                {
                  icon: Zap,
                  title: "Vollautomatische Prozesse.",
                  text: "Unser System läuft im Hintergrund, damit Sie sich ganz auf Ihre Kernkompetenz fokussieren.",
                },
              ].map((s, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5 sm:p-6 backdrop-blur-sm"
                >
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-emerald-300/15 text-emerald-200">
                    <s.icon className="size-5" />
                  </span>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white text-balance">{s.title}</h3>
                    <p className="mt-1 text-sm leading-7 text-white/65">{s.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* AGENTUR-VERGLEICH */}
          <section className="px-4 py-12 sm:py-16">
            <div className="max-w-4xl mx-auto rounded-3xl border border-white/10 bg-white/[0.04] p-8 sm:p-10 backdrop-blur-sm">
              <div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-center">
                <div>
                  <p className="overline text-sm font-semibold uppercase tracking-[0.2em] text-emerald-200">Der Unterschied</p>
                  <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-bold text-white text-balance">
                    Wo andere Teams aufblähen, nutzen wir KI.
                  </h2>
                  <p className="mt-4 text-base text-white/72 leading-relaxed">
                    Klassische Agenturen kosten Zeit und hohe Budgets. Bei uns steuert ein einziger Experte smarte
                    KI-Agenten. Das Ergebnis: Die Leistung einer ganzen Abteilung – schneller, präziser und deutlich
                    kosteneffizienter.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-center">
                    <Users className="mx-auto size-6 text-white/40" />
                    <div className="mt-2 text-3xl font-bold text-white/70">15</div>
                    <p className="mt-1 text-xs text-white/50">Spezialisten<br />klassische Agentur</p>
                  </div>
                  <div className="rounded-2xl border border-emerald-300/30 bg-emerald-300/10 p-5 text-center">
                    <Bot className="mx-auto size-6 text-emerald-200" />
                    <div className="mt-2 text-3xl font-bold text-white">1</div>
                    <p className="mt-1 text-xs text-emerald-100/80">Person + KI-Agenten<br />AgenticIT</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CONTACT */}
          <section id="contact" className="scroll-mt-24 px-4 py-16 sm:py-20">
            <div className="max-w-5xl mx-auto grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <div>
                <p className="overline text-sm font-semibold uppercase tracking-[0.2em] text-emerald-200">Unverbindlich anfragen</p>
                <h2 className="mt-4 text-3xl md:text-4xl font-light text-white leading-tight text-balance">
                  Wie schnell und zu welchen Konditionen bringen wir diese Kunden zu Ihnen?
                </h2>
                <p className="mt-6 text-base md:text-lg text-white/70 leading-relaxed">
                  Tragen Sie sich kurz ein. Bei unserem unverbindlichen Rückruf präsentieren wir Ihnen exakte Daten für
                  Ihre Branche und den direkten Fahrplan zu Ihren neuen, qualifizierten Kundenanfragen.
                </p>
                <div className="mt-7 grid gap-3 text-sm text-white/70">
                  {[
                    "Kurzer, unverbindlicher Rückruf",
                    "Exakte Kennzahlen für Ihre Branche",
                    "Transparente Kosten & klarer Zeitplan",
                  ].map((b) => (
                    <div key={b} className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.04] p-3">
                      <TrendingUp className="size-4 shrink-0 text-emerald-200" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-5 text-sm text-white/55">
                  Kein Verkaufsdruck, keine Vorbereitung nötig – ein kurzer Rückruf, ein konkreter Plan für Ihre Branche.
                </p>
              </div>

              <LeadForm
                source="home"
                title="Lassen Sie uns starten."
                description="Hinterlassen Sie Ihre Daten für einen schnellen, unverbindlichen Strategie-Rückruf."
                submitLabel="Rückruf anfragen"
                selectFields={[
                  { name: "industry", label: "Branche", options: industryLabels },
                  {
                    name: "goal",
                    label: "Ihr Ziel",
                    options: ["Mehr Anfragen", "Planbarer Umsatz", "Zeit gewinnen", "Weiss ich noch nicht"],
                  },
                ]}
              />
            </div>
          </section>

          <FaqSection
            title="Häufige Fragen zu Leadgenerierung & digitalem Vertrieb"
            intro="Wir erschließen bestehende Nachfrage in der Deutschschweiz und leiten kaufbereite Interessenten mit datengetriebenen Maßnahmen direkt zu Ihnen. Wir übernehmen Ihren digitalen Vertrieb end-to-end – Marketing, Vertrieb und Service –, automatisieren Prozesse mit Marketing-Automation und optimieren kontinuierlich für messbares Wachstum. Durch KI-gestützte Umsetzung statt großer Agentur-Setups erhalten Sie schneller und kosteneffizienter Ergebnisse – starten Sie mit einem 3-Monats-Test ohne Startkosten."
            faqs={homeFaqs}
          />
          <Footer />
        </div>
      </main>
    </div>
  )
}
