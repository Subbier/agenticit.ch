import Aurora from "@/components/site/aurora-bg"
import { Footer } from "@/components/footer"
import { GlassmorphismNav } from "@/components/glassmorphism-nav"
import { FaqSection } from "@/components/site/faq-section"
import { JsonLd } from "@/components/site/json-ld"
import { breadcrumbJsonLd, faqPageJsonLd } from "@/lib/seo"
import { aboutFaqs } from "@/lib/seo-faqs"

const dnaCards = [
  {
    title: "Agilität & Seniorität",
    text: "Start-up-Geschwindigkeit mit 20 Jahren Erfahrung in Digitalisierung, Sales und Marketing in der Schweiz.",
  },
  {
    title: "Tiefe Prozess-Expertise",
    text: "Praktiker für Inbound, Outbound und Skalierung – mit Fokus auf Speed-to-Lead und Lead-Qualifizierung.",
  },
  {
    title: "Partnerschaft auf Augenhöhe",
    text: "Transparente Zusammenarbeit und messbare Resultate. Schweizer Zuverlässigkeit trifft Agentic AI.",
  },
]

export function AboutPage() {
  return (
    <div className="min-h-screen bg-black overflow-hidden">
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Startseite", path: "/" },
            { name: "Über uns", path: "/ueber-uns" },
          ]),
          faqPageJsonLd(aboutFaqs),
        ]}
      />
      <main className="min-h-screen relative overflow-hidden">
        <div className="fixed inset-0 w-full h-full">
          <Aurora colorStops={["#475569", "#64748b", "#475569"]} amplitude={1.2} blend={0.6} speed={0.8} />
        </div>

        <div className="relative z-10">
          <GlassmorphismNav />

          <section className="px-4 pt-40 pb-12 sm:px-6">
            <div className="mx-auto max-w-6xl">
              <p className="overline text-sm font-semibold uppercase tracking-[0.2em] text-emerald-200">Über uns</p>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl text-balance">
                AgenticIT: Schweizer Expertise trifft Agentic AI
              </h1>
              <p className="mt-4 text-lg text-white/78">Zwei Jahrzehnte Erfahrung. Eine neue Ära der Effizienz.</p>
              <p className="mt-8 max-w-4xl text-base leading-8 text-white/72 sm:text-lg">
                AgenticIT ist ein Schweizer Tech-Unternehmen mit klarer Mission: KMU durch{" "}
                <span className="font-semibold text-white">Agentic AI</span> schneller auf Leads reagieren zu lassen.
                Das Fundament: über 20 Jahre Erfahrung in Digitalisierung, Sales und Marketing. Wir lösen
                Speed-to-Lead-Engpässe mit KI Agenten, Omnichannel und Data Intelligence.
              </p>
            </div>
          </section>

          <section className="px-4 py-8 sm:px-6">
            <div className="mx-auto max-w-6xl">
              <h2 className="text-2xl font-semibold text-white sm:text-3xl">Unsere DNA: Warum AgenticIT?</h2>
              <p className="mt-2 text-sm text-white/55">Agilität, Prozesskompetenz und klare Resultatorientierung.</p>
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {dnaCards.map((card) => (
                  <article key={card.title} className="rounded-xl border border-white/15 bg-white/5 p-6 backdrop-blur-sm">
                    <h3 className="text-lg font-semibold text-white">{card.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-white/72">{card.text}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="px-4 py-8 sm:px-6">
            <div className="mx-auto max-w-6xl rounded-2xl border border-white/15 bg-white/5 p-6 sm:p-8">
              <h2 className="text-2xl font-semibold text-white sm:text-3xl">Unsere Philosophie</h2>
              <p className="mt-3 text-white/72">
                Wir betrachten KI nicht als Selbstzweck, sondern als präzises Werkzeug für Ihr Wachstum.
              </p>
              <ul className="mt-6 grid gap-3 text-white/80">
                <li className="rounded-lg border border-white/10 bg-black/20 px-4 py-3">
                  <span className="font-semibold text-white">Resultate statt Funktionen:</span> Jeder Agent und Prozess muss
                  einen klaren ROI liefern.
                </li>
                <li className="rounded-lg border border-white/10 bg-black/20 px-4 py-3">
                  <span className="font-semibold text-white">Mensch + Maschine:</span> KI übernimmt die Routine, Ihr Team
                  konzentriert sich auf Beziehungen und Abschlüsse.
                </li>
              </ul>
            </div>
          </section>

          <section id="contact" className="px-4 py-8 sm:px-6">
            <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1fr_1.05fr]">
              <div className="rounded-2xl border border-white/15 bg-white/5 p-6 sm:p-8">
                <h2 className="text-2xl font-semibold text-white sm:text-3xl">Bereit für die Transformation?</h2>
                <p className="mt-4 text-white/72">
                  Lassen Sie uns in einem unverbindlichen Gespräch herausfinden, wie unsere Erfahrung Ihr Wachstum
                  beschleunigt.
                </p>
                <p className="mt-5 text-sm font-semibold uppercase tracking-[0.16em] text-emerald-200">
                  Kontaktieren Sie die Gründer
                </p>
              </div>

              <form className="rounded-2xl border border-white/15 bg-white/6 p-6 sm:p-8">
                <div className="grid gap-4">
                  <label className="text-sm text-white/80">
                    <span className="mb-2 block font-medium">Name</span>
                    <input
                      type="text"
                      placeholder="Ihr Name"
                      className="h-11 w-full rounded-lg border border-white/15 bg-black/30 px-3 text-sm text-white outline-none focus:border-emerald-300"
                    />
                  </label>
                  <label className="text-sm text-white/80">
                    <span className="mb-2 block font-medium">E-Mail</span>
                    <input
                      type="email"
                      placeholder="name@unternehmen.ch"
                      className="h-11 w-full rounded-lg border border-white/15 bg-black/30 px-3 text-sm text-white outline-none focus:border-emerald-300"
                    />
                  </label>
                  <label className="text-sm text-white/80">
                    <span className="mb-2 block font-medium">Fokus-Thema</span>
                    <input
                      type="text"
                      placeholder="z. B. AI Agents, Omnichannel, Data Intelligence"
                      className="h-11 w-full rounded-lg border border-white/15 bg-black/30 px-3 text-sm text-white outline-none focus:border-emerald-300"
                    />
                  </label>
                </div>
                <button
                  type="button"
                  className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-emerald-100"
                >
                  Jetzt Strategiegespräch vereinbaren
                </button>
              </form>
            </div>
          </section>

          <FaqSection
            title="Häufige Fragen zu AgenticIT"
            intro="Wer wir sind, wo wir sitzen und für wen wir arbeiten – kurz beantwortet."
            faqs={aboutFaqs}
          />

          <Footer />
        </div>
      </main>
    </div>
  )
}
