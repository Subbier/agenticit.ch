import type { Metadata } from "next"
import { CaseStudiesPage } from "@/components/site/case-studies-page"
import { JsonLd } from "@/components/site/json-ld"
import { articleJsonLd, breadcrumbJsonLd, createPageMetadata, faqPageJsonLd } from "@/lib/seo"
import { caseStudyFaqs, pageSeo } from "@/lib/seo-faqs"
import { advokCaseStudy } from "@/lib/case-study-advok"

export const metadata: Metadata = createPageMetadata({
  ...pageSeo["case-studies"],
  path: "/case-studies",
  type: "article",
  publishedTime: "2026-04-01",
  modifiedTime: "2026-05-22",
})

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Startseite", path: "/" },
            { name: "Case Studies", path: "/case-studies" },
          ]),
          articleJsonLd({
            headline: advokCaseStudy.hero.title + " " + advokCaseStudy.hero.titleAccent,
            description: pageSeo["case-studies"].description,
            path: "/case-studies",
            datePublished: "2026-04-01",
            dateModified: "2026-05-22",
          }),
          faqPageJsonLd(caseStudyFaqs),
        ]}
      />
      <CaseStudiesPage />
    </>
  )
}
