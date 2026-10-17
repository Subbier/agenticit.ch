import type { Metadata } from "next"
import { CaseStudiesPage } from "@/components/site/case-studies-page"
import { JsonLd } from "@/components/site/json-ld"
import {
  breadcrumbJsonLd,
  createPageMetadata,
  faqPageJsonLd,
  SITE_URL,
} from "@/lib/seo"
import { caseStudyFaqs, pageSeo } from "@/lib/seo-faqs"
import { websiteCase } from "@/lib/website-case"

export const metadata: Metadata = createPageMetadata({
  ...pageSeo["case-studies"],
  path: "/case-studies",
  modifiedTime: "2026-10-17",
})

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Startseite", path: "/" },
            { name: "Praxisbeispiel", path: "/case-studies" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "AgenticIT Website: Einblick in den Nutzerweg",
            description: websiteCase.description,
            url: `${SITE_URL}/case-studies`,
            dateModified: "2026-10-17",
            mainEntity: {
              "@type": "ItemList",
              itemListElement: websiteCase.tools.map((check, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: check.name,
                url: `${SITE_URL}${check.href}`,
              })),
            },
          },
          faqPageJsonLd(caseStudyFaqs),
        ]}
      />
      <CaseStudiesPage />
    </>
  )
}
