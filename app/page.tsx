import type { Metadata } from "next"
import { JourneyHome } from "@/components/journey/home"
import { JsonLd } from "@/components/site/json-ld"
import { createPageMetadata, faqPageJsonLd } from "@/lib/seo"
import { journeyFaqs } from "@/lib/journey"

export const metadata: Metadata = {
  ...createPageMetadata({
    title: "Kunden gewinnen und Beziehungen stärken",
    description:
      "AgenticIT verbindet Marketing, Vertrieb und Kundenbetreuung für Schweizer Beratungs- und Vertriebsfirmen. Finden Sie mit dem kostenlosen Kundenreise-Check Ihren Ansatzpunkt.",
    path: "/",
  }),
}

export default function Page() {
  return (
    <>
      <JsonLd data={[faqPageJsonLd(journeyFaqs)]} />
      <JourneyHome />
    </>
  )
}
