"use client"

import { ArrowRight, CheckCircle2, Search, Megaphone, Plug } from "lucide-react"
import { GlassmorphismNav } from "@/components/glassmorphism-nav"
import { Footer } from "@/components/footer"
import Aurora from "@/components/site/aurora-bg"
import { ExcellenceMap } from "@/components/site/excellence-map"
import { OmnichannelWheel } from "@/components/site/omnichannel-wheel"
import { BrandsInteractive } from "@/components/site/pillar-visuals"
import { LeadForm } from "@/components/site/lead-form"
import { JsonLd } from "@/components/site/json-ld"
import { breadcrumbJsonLd, serviceJsonLd, faqPageJsonLd } from "@/lib/seo"
import { pageSeo, excellenceFaqs } from "@/lib/seo-faqs"
import { FaqSection } from "@/components/site/faq-section"
import { industryLabels } from "@/lib/lead-pricing"

export function ExcellencePage() {
  return (
    <div className="min-h-screen bg-black overflow-hidden">
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Startseite", path: "/" },
            { name: "Excellence", path: "/excellence" },
          ]),
          serviceJsonLd({ name: "Excellence – Online-Marketing", description: pageSeo.excellence.description, path: "/excellence" }),
          faqPageJsonLd(excellenceFaqs),
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
                Excellence – alles für Ihre Sichtbarkeit
              </div>
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white text-balance mb-6 leading-tight">
                Alles, was Sie sichtbar macht.
                <br />
                <span className="bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent">
                  Aus einer Meisterhand.
                </span>
              </h1>
              <p className="text-base sm:text-xl text-white/75 max-w-2xl mx-auto leading-relaxed font-light mb-8">
                Social Media, SEO, Performance-Marketing, Content und ein Auftritt, der überzeugt – wir verbinden alle
                Disziplinen zu einem System, das in der Deutschschweiz gefunden wird und Anfragen bringt. Sie behalten
                Ihre Tools, wir den Überblick.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href="#contact" className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-lg font-medium text-black transition hover:scale-105 hover:bg-gray-50">
                  Unverbindlich kennenlernen
                  <ArrowRight className="h-5 w-5" />
                </a>
                <a href="#disziplinen" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-4 text-lg font-medium text-white transition hover:scale-105 hover:bg-white/10">
                  Disziplinen ansehen
                </a>
              </div>
            </div>
          </section>

          {/* INSIGHT */}
          <section className="px-4 py-12 sm:py-16">
            <div className="max-w-3xl mx-auto text-center">
              <p className="overline text-sm font-semibold uppercase tracking-[0.2em] text-emerald-200">Der Gedanke dahinter</p>
              <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-bold text-white text-balance">
                Einzelne Tools bringen wenig. Das Zusammenspiel bringt Kunden.
              </h2>
              <p className="mt-5 text-base sm:text-lg text-white/75 leading-relaxed font-light">
                Anzeigen ohne gute Seite verpuffen. SEO ohne Inhalte bleibt unsichtbar. Erst wenn alle Disziplinen
                ineinandergreifen, entsteht ein verlässlicher Strom an Anfragen. Genau das bauen wir für Sie – als
                ein System.
              </p>
            </div>
          </section>

          {/* INTERAKTIVE DISZIPLINEN-MAP */}
          <section id="disziplinen" className="scroll-mt-24 px-4 py-12 sm:py-16">
            <div className="max-w-5xl mx-auto grid gap-10 lg:grid-cols-2 lg:items-center">
              <div>
                <p className="overline text-sm font-semibold uppercase tracking-[0.2em] text-emerald-200">Unsere Meisterschaft</p>
                <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-bold text-white text-balance">
                  Sechs Disziplinen. Ein Ergebnis.
                </h2>
                <p className="mt-5 text-base sm:text-lg text-white/75 leading-relaxed font-light">
                  Tippen Sie auf eine Disziplin – sie zeigt Ihnen, was wir übernehmen. In der Mitte hält AgenticIT
                  alles zusammen, damit aus Performance-Marketing, SEO, Social Media, Content, Omnichannel und CRM
                  ein reibungsloser Ablauf wird.
                </p>
                <ul className="mt-6 space-y-3">
                  {[
                    "Gefunden werden – auf Google und in den sozialen Medien.",
                    "Überzeugen – mit Inhalten und einem Auftritt, der wirkt.",
                    "Übergeben – jede Anfrage sauber in Ihrem CRM.",
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-3 text-sm sm:text-base text-white/80">
                      <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-emerald-300" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <ExcellenceMap />
            </div>
          </section>

          {/* OMNICHANNEL */}
          <section id="omnichannel" className="scroll-mt-24 px-4 py-12 sm:py-16">
            <div className="max-w-6xl mx-auto grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
              <div>
                <p className="overline text-sm font-semibold uppercase tracking-[0.2em] text-emerald-200">Omnichannel</p>
                <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-bold text-white text-balance">
                  Ein Kanal-Erlebnis. Über alle Kanäle hinweg.
                </h2>
                <p className="mt-5 text-base sm:text-lg text-white/75 leading-relaxed font-light">
                  Ihre Kunden wechseln zwischen Website, WhatsApp, Social Media und Telefon – und erwarten überall
                  dieselbe, nahtlose Erfahrung. Wir verbinden alle Berührungspunkte zu einem einzigen Gespräch: Der
                  Kontext reist mit, nichts geht verloren.
                </p>
                <ul className="mt-6 space-y-3">
                  {[
                    "Digital & persönlich in einem Verlauf – kein Bruch, kein Doppelt-Erzählen.",
                    "Sofort-Reaktion auf jedem Kanal, automatisiert rund um die Uhr.",
                    "Tippen Sie einen Kanal an und sehen Sie, was wir dort für Sie übernehmen.",
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-3 text-sm sm:text-base text-white/80">
                      <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-emerald-300" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <OmnichannelWheel />
            </div>
          </section>

          {/* TRUST / TOOLS */}
          <section className="px-4 py-12 sm:py-16">
            <div className="max-w-5xl mx-auto grid gap-10 lg:grid-cols-2 lg:items-center">
              <div className="order-2 lg:order-1">
                <BrandsInteractive />
              </div>
              <div className="order-1 lg:order-2">
                <div className="mb-5 inline-flex size-12 items-center justify-center rounded-2xl bg-emerald-300/15 text-emerald-200">
                  <Plug className="size-6" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white text-balance">
                  Akkreditiert in Ihren Tools – ohne Lernkurve.
                </h2>
                <p className="mt-4 text-base text-white/72 leading-relaxed">
                  Wir sind in allen führenden Plattformen zertifiziert und arbeiten mit dem, was Sie schon kennen.
                  Für Sie ändert sich faktisch nichts – wir kümmern uns um den Rest im Hintergrund. Tippen Sie eine
                  Plattform an und sehen Sie, wofür wir sie nutzen.
                </p>
              </div>
            </div>
          </section>

          {/* VORTEILE */}
          <section className="px-4 py-12 sm:py-16">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-10">
                <p className="overline text-sm font-semibold uppercase tracking-[0.2em] text-emerald-200">Was das für Sie heisst</p>
                <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-bold text-white text-balance">
                  Mehr Sichtbarkeit. Mehr Anfragen. Kein Aufwand.
                </h2>
              </div>
              <div className="grid gap-5 sm:grid-cols-3">
                {[
                  { icon: Search, title: "Gefunden werden", text: "SEO, Anzeigen und Social Media bringen Sie genau dorthin, wo Ihre Kunden suchen." },
                  { icon: Megaphone, title: "Überzeugen", text: "Ein Auftritt, Inhalte und Kampagnen, die aus Aufmerksamkeit echte Anfragen machen." },
                  { icon: Plug, title: "Keine Lernkurve", text: "Wir fügen uns in Ihre bestehende Tool-Welt ein. Sie arbeiten weiter wie bisher." },
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
            title="Häufige Fragen zu Excellence"
            intro="Ein nahtlos orchestriertes System aus Social Media, SEO, Performance-Marketing, Content, Omnichannel und CRM steigert in der Deutschschweiz Sichtbarkeit und Anfragen. Als Social Media Agentur Schweiz und SEO Agentur Schweiz verbinden wir diese Disziplinen mit Performance Marketing Schweiz und Content Marketing Schweiz – nahtlos und messbar. Der Kontext bleibt kanalübergreifend erhalten, jede Anfrage landet per CRM-Integration sauber im bestehenden System, und wir priorisieren Leads via Lead Scoring. Ergebnis: gefunden werden, überzeugen und mehr qualifizierte Anfragen ohne Mehraufwand."
            faqs={excellenceFaqs}
          />

          {/* CONTACT */}
          <section id="contact" className="scroll-mt-24 px-4 py-16 sm:py-20">
            <div className="max-w-5xl mx-auto grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <div>
                <p className="overline text-sm font-semibold uppercase tracking-[0.2em] text-emerald-200">Kennenlernen</p>
                <h2 className="mt-4 text-3xl md:text-4xl font-light text-white leading-tight text-balance">
                  Neugierig, wie sichtbar Sie in Ihrer Branche werden können?
                </h2>
                <p className="mt-6 text-base md:text-lg text-white/70 leading-relaxed">
                  In einem kurzen, unverbindlichen Gespräch zeigen wir Ihnen genau die Disziplinen, die für Sie den
                  Unterschied machen – und wie schnell die ersten Anfragen bei Ihnen ankommen.
                </p>
                <div className="mt-7 grid gap-3 text-sm text-white/70">
                  {[
                    "Kurzer, unverbindlicher Rückruf",
                    "Konkrete Möglichkeiten für Ihre Branche",
                    "Keine Umstellung, keine Lernkurve",
                  ].map((b) => (
                    <div key={b} className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.04] p-3">
                      <CheckCircle2 className="size-4 shrink-0 text-emerald-200" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              <LeadForm
                source="excellence"
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
