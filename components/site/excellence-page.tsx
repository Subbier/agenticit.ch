"use client"

import { JourneyContent } from "@/components/journey/content"

import design from "@/components/journey/content.module.css"
import styles from "./excellence.module.css"

import { ArrowRight, CheckCircle2, Search, Megaphone, Plug } from "lucide-react"
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
    <div className="min-h-screen bg-[#f5f7f2] overflow-hidden">
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Startseite", path: "/" },
            { name: "Marketing-Kanäle", path: "/excellence" },
          ]),
          serviceJsonLd({
            name: "Marketing-Kanäle und Anfragewege",
            description: pageSeo.excellence.description,
            path: "/excellence",
          }),
          faqPageJsonLd(excellenceFaqs),
        ]}
      />
      <JourneyContent>
        <div className={`relative z-10 ${styles.page}`}>
          {/* HERO */}
          <section className={design.pageHero}>
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white backdrop-blur-md border border-[#dce3db] text-[#202522] text-sm font-medium mb-8">
                <span className="w-2 h-2 bg-emerald-300 rounded-full mr-2 animate-pulse shrink-0" />
                Marketing-Kanäle & Anfragewege
              </div>
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-[#202522] text-balance mb-6 leading-tight">
                Ihre Kanäle.
                <br />
                <span className="bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-[#4d7c36]">
                  Ein klarer Anfrageweg.
                </span>
              </h1>
              <p className="text-base sm:text-xl text-[#202522] max-w-2xl mx-auto leading-relaxed font-light mb-8">
                Wir verbinden Website, Suche, Werbung und Anfragebearbeitung zu
                einem geplanten Ablauf. Gemeinsam klären wir Zielgruppe,
                passende Kanäle und die Übernahme durch Ihr Team.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="/marketing-setup-check"
                  className="inline-flex items-center gap-2 rounded-full bg-[#8fe05a] px-8 py-4 text-lg font-medium text-[#18320d] transition hover:bg-[#a3ea76]"
                >
                  Marketing-Setup prüfen
                  <ArrowRight className="h-5 w-5" />
                </a>
                <a
                  href="#disziplinen"
                  className="inline-flex items-center gap-2 rounded-full border border-[#dce3db] px-8 py-4 text-lg font-medium text-[#202522] transition hover:scale-105 hover:bg-white"
                >
                  Bausteine entdecken
                </a>
              </div>
            </div>
          </section>

          {/* INSIGHT */}
          <section className="px-4 py-12 sm:py-16">
            <div className="max-w-3xl mx-auto text-center">
              <p className="overline text-sm font-semibold uppercase tracking-[0.2em] text-[#4d7c36]">
                Der Gedanke dahinter
              </p>
              <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-bold text-[#202522] text-balance">
                Am Übergang entscheidet sich der Ablauf.
              </h2>
              <p className="mt-5 text-base sm:text-lg text-[#202522] leading-relaxed font-light">
                Vom ersten Klick bis zur zuständigen Person: Wir klären, welche
                Inhalte gebraucht werden, wie Interessenten anfragen und wie Ihr
                Team den nächsten Schritt übernimmt.
              </p>
            </div>
          </section>

          {/* INTERAKTIVE DISZIPLINEN-MAP */}
          <section
            id="disziplinen"
            className="scroll-mt-24 px-4 py-12 sm:py-16"
          >
            <div className="max-w-5xl mx-auto grid gap-10 lg:grid-cols-2 lg:items-center">
              <div>
                <p className="overline text-sm font-semibold uppercase tracking-[0.2em] text-[#4d7c36]">
                  Bausteine zur Auswahl
                </p>
                <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-bold text-[#202522] text-balance">
                  Welche Aufgabe steht bei Ihnen an?
                </h2>
                <p className="mt-5 text-base sm:text-lg text-[#202522] leading-relaxed font-light">
                  Tippen Sie auf einen Baustein und entdecken Sie mögliche
                  Aufgaben. Wir beginnen mit einem abgegrenzten Anliegen und
                  prüfen, welche Verbindung Ihrem Team hilft.
                </p>
                <ul className="mt-6 space-y-3">
                  {[
                    "Sichtbarkeit: passende Themen und Anfragewege planen.",
                    "Inhalte: Angebot und nächsten Schritt verständlich machen.",
                    "Übergabe: Eingang, Zuständigkeit und Bearbeitung prüfen.",
                  ].map((t) => (
                    <li
                      key={t}
                      className="flex items-start gap-3 text-sm sm:text-base text-[#202522]"
                    >
                      <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-[#4d7c36]" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <ExcellenceMap />
            </div>
          </section>

          {/* OMNICHANNEL */}
          <section
            id="omnichannel"
            className="scroll-mt-24 px-4 py-12 sm:py-16"
          >
            <div className="max-w-6xl mx-auto grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
              <div>
                <p className="overline text-sm font-semibold uppercase tracking-[0.2em] text-[#4d7c36]">
                  Omnichannel
                </p>
                <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-bold text-[#202522] text-balance">
                  Ein nächster Schritt. Über Kanalgrenzen hinweg.
                </h2>
                <p className="mt-5 text-base sm:text-lg text-[#202522] leading-relaxed font-light">
                  Welche Angaben braucht die nächste Person, wenn jemand den
                  Kanal wechselt? Wir planen ausgewählte Übergaben und prüfen
                  Quelle, Berechtigung und Zuständigkeit im Zielsystem.
                </p>
                <ul className="mt-6 space-y-3">
                  {[
                    "Benötigte Angaben gemeinsam festlegen.",
                    "Automatische Reaktion und persönliche Übernahme abstimmen.",
                    "Kanal auswählen und ein mögliches Einsatzgebiet ansehen.",
                  ].map((t) => (
                    <li
                      key={t}
                      className="flex items-start gap-3 text-sm sm:text-base text-[#202522]"
                    >
                      <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-[#4d7c36]" />
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
                <div className="mb-5 inline-flex size-12 items-center justify-center rounded-2xl bg-emerald-300/15 text-[#4d7c36]">
                  <Plug className="size-6" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#202522] text-balance">
                  Werkzeuge passend zum Ablauf wählen.
                </h2>
                <p className="mt-4 text-base text-[#202522] leading-relaxed">
                  Die Plattformen zeigen mögliche Einsatzgebiete. Gemeinsam
                  prüfen wir, welche vorhandenen Tools, Lizenzen und Zugänge zu
                  Ihrem Vorhaben passen. Auswahl und Verbindung werden
                  projektspezifisch vereinbart.
                </p>
              </div>
            </div>
          </section>

          {/* VORTEILE */}
          <section className="px-4 py-12 sm:py-16">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-10">
                <p className="overline text-sm font-semibold uppercase tracking-[0.2em] text-[#4d7c36]">
                  Was das für Sie heisst
                </p>
                <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-bold text-[#202522] text-balance">
                  Ein klares Ziel. Ein gemeinsamer Ablauf.
                </h2>
              </div>
              <div className="grid gap-5 sm:grid-cols-3">
                {[
                  {
                    icon: Search,
                    title: "Gefunden werden",
                    text: "Zielgruppe, relevante Fragen und einen passenden Einstieg bestimmen.",
                  },
                  {
                    icon: Megaphone,
                    title: "Überzeugen",
                    text: "Angebot und nächsten Schritt auf Seite, Inhalt und Kampagne abstimmen.",
                  },
                  {
                    icon: Plug,
                    title: "Team mitnehmen",
                    text: "Zuständigkeit, Einweisung und Freigaben mit den beteiligten Personen klären.",
                  },
                ].map((c) => (
                  <div
                    key={c.title}
                    className="rounded-2xl border border-[#dce3db] bg-white p-6 backdrop-blur-sm"
                  >
                    <div className="mb-4 inline-flex size-10 items-center justify-center rounded-xl bg-emerald-300/15 text-[#4d7c36]">
                      <c.icon className="size-5" />
                    </div>
                    <h3 className="text-lg font-semibold text-[#202522]">
                      {c.title}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-[#202522]">
                      {c.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* FAQ */}
          <FaqSection
            title="Fragen zu Kanälen und Übergaben"
            intro="Was wir gemeinsam klären, bevor wir Kanäle verbinden."
            faqs={excellenceFaqs}
          />
          <section className="px-4 pb-6">
            <div className="mx-auto max-w-5xl text-sm leading-7 text-[#647068]">
              <p>
                Grundlage zur Suche:{" "}
                <a
                  href="https://developers.google.com/search/docs/appearance/ai-features?hl=de"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-4"
                >
                  Google Search Central zu KI-Funktionen und SEO
                </a>
                .
              </p>
              <p>
                Inhaltlich aktualisiert: 17. Oktober 2026. Die Darstellungen
                sind Einsatzbeispiele und keine gemessenen Kundenresultate.
              </p>
            </div>
          </section>

          {/* CONTACT */}
          <section id="contact" className="scroll-mt-24 px-4 py-16 sm:py-20">
            <div className="max-w-5xl mx-auto grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <div>
                <p className="overline text-sm font-semibold uppercase tracking-[0.2em] text-[#4d7c36]">
                  Kennenlernen
                </p>
                <h2 className="mt-4 text-3xl md:text-4xl font-light text-[#202522] leading-tight text-balance">
                  Welcher Übergang kostet Sie heute Zeit?
                </h2>
                <p className="mt-6 text-base md:text-lg text-[#202522] leading-relaxed">
                  Beschreiben Sie uns Ihr Anliegen. Wir prüfen gemeinsam Kanal,
                  Anfrageweg und Bearbeitung – und klären einen passenden
                  nächsten Schritt.
                </p>
                <div className="mt-7 grid gap-3 text-sm text-[#202522]">
                  {[
                    "Kurzer, unverbindlicher Rückruf",
                    "Konkrete Möglichkeiten für Ihre Branche",
                    "Vorgehen und Umfang vor dem Start klären",
                  ].map((b) => (
                    <div
                      key={b}
                      className="flex items-center gap-3 rounded-lg border border-[#dce3db] bg-white p-3"
                    >
                      <CheckCircle2 className="size-4 shrink-0 text-[#4d7c36]" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              <LeadForm
                source="excellence"
                requirePhone
                title="Lassen Sie uns starten."
                description="Ihre Angaben helfen uns, einen unverbindlichen Rückruf zu Ihrem Anliegen vorzubereiten."
                submitLabel="Rückruf anfragen"
                selectFields={[
                  {
                    name: "industry",
                    label: "Branche",
                    options: industryLabels,
                  },
                ]}
              />
            </div>
          </section>
        </div>
      </JourneyContent>
    </div>
  )
}
