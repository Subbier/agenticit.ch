import type { Metadata } from "next"
import { JourneyHome } from "@/components/journey/home"
import { JsonLd } from "@/components/site/json-ld"
import { createPageMetadata, faqPageJsonLd } from "@/lib/seo"
import { journeyFaqs } from "@/lib/journey"

const homeTitle = "Marketing, Sales & KI für Schweizer KMU | AgenticIT"

export const metadata: Metadata = {
  ...createPageMetadata({
    title: homeTitle,
    description:
      "AgenticIT verbindet Marketing und Sales mit CRM, Telefonie und KI-Automatisierung. Für Schweizer KMU – von der Website über die Kundengewinnung bis zum Betrieb.",
    path: "/",
  }),
  // Das Titel-Template des Root-Layouts gilt nur für untergeordnete Segmente.
  title: { absolute: homeTitle },
}

export default function Page() {
  return (
    <>
      <JsonLd data={[faqPageJsonLd(journeyFaqs)]} />
      <JourneyHome />
    </>
  )
}
