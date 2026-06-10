import Aurora from "@/components/site/aurora-bg"
import { Footer } from "@/components/footer"
import { GlassmorphismNav } from "@/components/glassmorphism-nav"
import { FaqSection } from "@/components/site/faq-section"
import { JsonLd } from "@/components/site/json-ld"
import { RelatedLinksSection } from "@/components/site/related-links-section"
import { ServicesInteractive } from "@/components/site/services-interactive"
import { breadcrumbJsonLd, faqPageJsonLd } from "@/lib/seo"
import { servicesFaqs, servicesRelatedLinks } from "@/lib/seo-faqs"

export function ServicesPage() {
  return (
    <div className="min-h-screen bg-black overflow-hidden">
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Startseite", path: "/" },
            { name: "Services", path: "/services" },
          ]),
          faqPageJsonLd(servicesFaqs),
        ]}
      />
      <main className="min-h-screen relative overflow-hidden">
        <div className="fixed inset-0 w-full h-full">
          <Aurora colorStops={["#475569", "#64748b", "#475569"]} amplitude={1.2} blend={0.6} speed={0.8} />
        </div>

        <div className="relative z-10">
          <GlassmorphismNav />

          <section className="px-4 pt-40 pb-8 sm:px-6">
            <div className="mx-auto max-w-6xl">
              <p className="overline text-sm font-semibold uppercase tracking-[0.2em] text-emerald-200">Services</p>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl text-balance">
                KI Services & Paket-Benchmark für die Schweiz
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-white/72">
                Interaktive MRR-Schätzung für Workplace, RevOps und EdTech – plus KI Agenten, Omnichannel und
                Lead Scoring von AgenticIT. Datenbasiert, sofort nutzbar im Verkaufsgespräch.
              </p>
            </div>
          </section>

          <section className="px-4 pb-16 sm:px-6">
            <div className="mx-auto max-w-6xl">
              <ServicesInteractive />
            </div>
          </section>

          <FaqSection
            title="Häufige Fragen zu unseren Services"
            intro="Paket-Simulator, KI-Lösungen und Zielgruppe – kompakt erklärt."
            faqs={servicesFaqs}
          />

          <RelatedLinksSection title="AgenticIT Kernleistungen" links={[...servicesRelatedLinks]} />

          <Footer />
        </div>
      </main>
    </div>
  )
}
