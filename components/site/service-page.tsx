import type { ServicePageContent } from "@/lib/site-content"
import { GlassmorphismNav } from "@/components/glassmorphism-nav"
import { Footer } from "@/components/footer"
import Aurora from "@/components/site/aurora-bg"
import { ServiceHero } from "@/components/site/service-hero"
import { ServiceSections } from "@/components/site/service-sections"
import { ServiceUseCases } from "@/components/site/service-use-cases"
import { ServiceContact } from "@/components/site/service-contact"
import { FaqSection } from "@/components/site/faq-section"
import { RelatedLinksSection } from "@/components/site/related-links-section"
import { JsonLd } from "@/components/site/json-ld"
import { breadcrumbJsonLd, faqPageJsonLd, serviceJsonLd } from "@/lib/seo"
import {
  aiAgentsFaqs,
  excellenceFaqs,
  intelligenceFaqs,
  omnichannelFaqs,
  pageSeo,
  revopsFaqs,
  serviceRelatedLinks,
  smartAppsFaqs,
} from "@/lib/seo-faqs"

const faqBySlug = {
  "ai-agents": aiAgentsFaqs,
  revops: revopsFaqs,
  excellence: excellenceFaqs,
  omnichannel: omnichannelFaqs,
  intelligence: intelligenceFaqs,
  "smart-apps": smartAppsFaqs,
} as const

export function ServicePage({ page }: { page: ServicePageContent }) {
  const faqs = faqBySlug[page.slug]
  const related = serviceRelatedLinks[page.slug]
  const seo = pageSeo[page.slug]

  return (
    <div className="min-h-screen bg-black overflow-hidden">
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Startseite", path: "/" },
            { name: page.navLabel, path: `/${page.slug}` },
          ]),
          serviceJsonLd({
            name: page.navLabel,
            description: seo.description,
            path: `/${page.slug}`,
          }),
          faqPageJsonLd(faqs),
        ]}
      />
      <main className="min-h-screen relative overflow-hidden">
        <div className="fixed inset-0 w-full h-full">
          <Aurora colorStops={["#475569", "#64748b", "#475569"]} amplitude={1.2} blend={0.6} speed={0.8} />
        </div>
        <div className="relative z-10">
          <GlassmorphismNav />
          <ServiceHero page={page} />
          <ServiceSections page={page} />
          <ServiceUseCases page={page} />
          <FaqSection
            title={`Häufige Fragen zu ${page.navLabel}`}
            intro={`Häufige Fragen zu ${page.navLabel} – praxisnah für Entscheider in der Schweiz.`}
            faqs={faqs}
          />
          <RelatedLinksSection links={[...related]} />
          <ServiceContact page={page} />
          <Footer />
        </div>
      </main>
    </div>
  )
}
