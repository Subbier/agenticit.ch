import type { Metadata } from "next"
import { JourneyHome } from "@/components/journey/home"
import { JsonLd } from "@/components/site/json-ld"
import { createPageMetadata, faqPageJsonLd } from "@/lib/seo"
import { journeyFaqs } from "@/lib/journey"

export const metadata: Metadata = {
  ...createPageMetadata({
    title: "Schweizer Lösungen: digital verbunden, mit KI entlastet",
    description:
      "AgenticIT verbindet Website, Marketing, Vertrieb und interne Abläufe. Schweizer Lösungen und passende KI für weniger Handarbeit und mehr Freiraum. Entdecken Sie Ihren Ansatzpunkt.",
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
