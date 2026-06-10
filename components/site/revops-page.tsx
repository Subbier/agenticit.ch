"use client"

import { CheckCircle2, TrendingUp, ArrowRight, Clock, Layers, ShieldCheck } from "lucide-react"
import { GlassmorphismNav } from "@/components/glassmorphism-nav"
import { Footer } from "@/components/footer"
import Aurora from "@/components/site/aurora-bg"
import { Flywheel } from "@/components/site/flywheel"
import { CustomerJourney } from "@/components/site/customer-journey"
import { LeadForm } from "@/components/site/lead-form"
import { JsonLd } from "@/components/site/json-ld"
import { breadcrumbJsonLd, serviceJsonLd, faqPageJsonLd } from "@/lib/seo"
import { pageSeo, revopsFaqs } from "@/lib/seo-faqs"
import { FaqSection } from "@/components/site/faq-section"
import { industryLabels } from "@/lib/lead-pricing"

export function RevOpsPage() {
  return (
    <div className="min-h-screen bg-black overflow-hidden">
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Startseite", path: "/" },
            { name: "RevOps", path: "/revops" },
          ]),
          serviceJsonLd({
            name: "Revenue Operations",
            description: pageSeo.revops.description,
            path: "/revops",
          }),
          faqPageJsonLd(revopsFaqs),
        ]}
      />
      <main className="min-h-screen relative overflow-hidden">
        <div className="fixed inset-0 w-full h-full">
          <Aurora colorStops={["#475569", "#64748b", "#475569"]} amplitude={1.2} blend={0.6} speed={0.8} />
        </div>

        <div className="relative z-10">
          <GlassmorphismNav />

          {/* HERO – Attention */}
          <section className="px-4 pt-32 pb-16 sm:pb-20 relative">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium mb-8">
                <span className="w-2 h-2 bg-emerald-300 rounded-full mr-2 animate-pulse shrink-0" />
                Revenue Operations – Ihr Wachstum als ein System
              </div>
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white text-balance mb-6 leading-tight">
                Wir sind der Motor hinter Ihrem Wachstum.
                <br />
                <span className="bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent">
                  Sie machen das, was Sie am besten können.
                </span>
              </h1>
              <p className="text-base sm:text-xl text-white/75 max-w-2xl mx-auto leading-relaxed font-light mb-8">
                Wir automatisieren Ihre ganze Kundenreise mit KI-Agenten – von der ersten Aufmerksamkeit über
                den Abschluss bis zur Weiterempfehlung. Alles in einem Paket, ganz ohne Technik-Aufwand für Sie.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-lg font-medium text-black transition hover:scale-105 hover:bg-gray-50"
                >
                  Unverbindlich kennenlernen
                  <ArrowRight className="h-5 w-5" />
                </a>
                <a
                  href="#journey"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-4 text-lg font-medium text-white transition hover:scale-105 hover:bg-white/10"
                >
                  Meine Kundenreise ansehen
                </a>
              </div>
            </div>
          </section>

          {/* PROBLEM – Pain */}
          <section className="px-4 py-12 sm:py-16">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-10">
                <p className="overline text-sm font-semibold uppercase tracking-[0.2em] text-emerald-200">Das Problem</p>
                <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-bold text-white text-balance">
                  Viele Tools, viele Übergaben – und trotzdem geht Umsatz verloren.
                </h2>
              </div>
              <div className="grid gap-5 sm:grid-cols-3">
                {[
                  {
                    icon: Clock,
                    title: "Anfragen verpuffen",
                    text: "Wer nicht sofort antwortet, verliert – gerade nach Feierabend und am Wochenende.",
                  },
                  {
                    icon: Layers,
                    title: "Alles ist Stückwerk",
                    text: "Werbung, Website, CRM, Follow-up: einzelne Inseln, die niemand zusammenhält.",
                  },
                  {
                    icon: TrendingUp,
                    title: "Nach dem Abschluss ist Schluss",
                    text: "Bestehende Kunden werden selten weiterentwickelt – das grösste Potenzial bleibt liegen.",
                  },
                ].map((p) => (
                  <div
                    key={p.title}
                    className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm"
                  >
                    <div className="mb-4 inline-flex size-10 items-center justify-center rounded-lg bg-red-500/15 text-red-300">
                      <p.icon className="size-5" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">{p.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-white/65">{p.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SOLUTION intro */}
          <section className="px-4 py-12 sm:py-16">
            <div className="max-w-3xl mx-auto text-center">
              <p className="overline text-sm font-semibold uppercase tracking-[0.2em] text-emerald-200">Die Lösung</p>
              <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-bold text-white text-balance">
                Ein Motor für Ihren gesamten Umsatz.
              </h2>
              <p className="mt-5 text-base sm:text-lg text-white/75 leading-relaxed font-light">
                Revenue Operations heisst: Marketing, Vertrieb und Betreuung greifen wie Zahnräder ineinander.
                Unsere KI-Agenten führen jede Anfrage durch die gesamte Reise – und hören nicht beim Abschluss
                auf. Sie betreuen weiter, verkaufen Passendes nach und machen aus zufriedenen Kunden echte
                Botschafter. Sie bekommen das Ergebnis, nicht die Baustelle.
              </p>
            </div>
          </section>

          {/* INTERAKTIVE CUSTOMER JOURNEY */}
          <section id="journey" className="scroll-mt-24 px-4 py-12 sm:py-16">
            <CustomerJourney />
          </section>

          {/* FLYWHEEL – Desire */}
          <section id="flywheel" className="scroll-mt-24 px-4 py-14 sm:py-20">
            <div className="max-w-6xl mx-auto">
              {/* Übergeordnete Überschrift */}
              <div className="text-center mb-10 sm:mb-14">
                <p className="overline text-sm font-semibold uppercase tracking-[0.2em] text-emerald-200">Auf Autopilot</p>
                <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-bold text-white text-balance">
                  Ihr Business auf Autopilot: Einmal starten, dauerhaft wachsen.
                </h2>
                <p className="mt-4 text-base sm:text-lg text-white/70 max-w-2xl mx-auto font-light">
                  Sie machen die Arbeit, die Sie lieben. Unser System liefert die Ergebnisse.
                </p>
              </div>

              <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                <div>
                  <p className="overline text-sm font-semibold uppercase tracking-[0.2em] text-emerald-200">Das Flywheel</p>
                  <h3 className="mt-3 text-xl sm:text-2xl font-bold text-white text-balance">
                    Umsatz, der sich selbst multipliziert.
                  </h3>
                  <p className="mt-4 text-base text-white/75 leading-relaxed font-light">
                    Vergessen Sie den klassischen Trichter, der immer wieder bei null beginnt. Ein Schwungrad dreht
                    sich endlos: Jeder zufriedene Kunde kauft mehr, bleibt länger und empfiehlt Sie weiter – wir
                    liefern den Motor, der es Tag und Nacht antreibt.
                  </p>
                  <ul className="mt-6 space-y-3">
                    {[
                      "Mehrwert auf Autopilot: automatisches Cross- und Up-Selling nach dem Abschluss.",
                      "Kostenlose Neukunden: aus Käufern werden Botschafter, die neue Kunden anziehen.",
                      "Absoluter Fokus: Sie machen Ihr Kerngeschäft, das System das Wachstum.",
                    ].map((t) => (
                      <li key={t} className="flex items-start gap-3 text-sm sm:text-base text-white/80">
                        <ShieldCheck className="mt-0.5 size-5 shrink-0 text-emerald-300" />
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 rounded-xl border-l-4 border-emerald-300 bg-white/[0.04] p-4">
                    <p className="text-sm sm:text-base font-semibold text-white">Leads → Kunden. Ohne Kaltakquise.</p>
                    <p className="mt-1 text-sm leading-7 text-white/70">
                      Warme, vorqualifizierte Anfragen landen anrufbereit bei Ihnen. Ihr einziger Job: das Gespräch
                      führen und das Geschäft machen.
                    </p>
                  </div>
                </div>

                {/* Interaktives Flywheel */}
                <Flywheel />
              </div>
            </div>
          </section>

          {/* FAQ */}
          <FaqSection
            title="Häufige Fragen zu RevOps"
            intro="Was Revenue Operations für Sie bedeutet – kurz und ohne Fachjargon."
            faqs={revopsFaqs}
          />

          {/* CONTACT – Action */}
          <section id="contact" className="scroll-mt-24 px-4 py-16 sm:py-20">
            <div className="max-w-5xl mx-auto grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <div>
                <p className="overline text-sm font-semibold uppercase tracking-[0.2em] text-emerald-200">Kennenlernen</p>
                <h2 className="mt-4 text-3xl md:text-4xl font-light text-white leading-tight text-balance">
                  Sehen Sie in einem kurzen Gespräch, wie Ihr Motor laufen würde.
                </h2>
                <p className="mt-6 text-base md:text-lg text-white/70 leading-relaxed">
                  Unverbindlich, ohne Vorbereitung von Ihrer Seite. Wir zeigen Ihnen Ihre Kundenreise konkret –
                  und wie das Schnupper-Abo für Ihre Branche aussehen könnte.
                </p>
                <div className="mt-7 grid gap-3 text-sm text-white/70">
                  {[
                    "Ein kurzer, unverbindlicher Rückruf",
                    "Ihre Kundenreise konkret für Ihre Branche",
                    "3 Monate testen – keine Startkosten",
                  ].map((b) => (
                    <div key={b} className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.04] p-3">
                      <CheckCircle2 className="size-4 shrink-0 text-emerald-200" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              <LeadForm
                source="revops"
                title="Lernen wir uns kurz kennen."
                description="Hinterlassen Sie uns kurz Ihre Angaben – wir melden uns mit einem unverbindlichen Rückruf."
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
