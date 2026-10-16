import type { Metadata } from "next"
import { JourneyHome } from "@/components/journey/home"
import { JsonLd } from "@/components/site/json-ld"
import { createPageMetadata, faqPageJsonLd } from "@/lib/seo"
import { journeyFaqs } from "@/lib/journey"

export const metadata: Metadata = {
  ...createPageMetadata({
    title: "Neue Kunden. Digitale Abläufe. Ein Partner.",
    description:
      "AgenticIT verbindet Marktstrategie, Marketing und Vertrieb mit CRM, Telefonie und KI-Automatisierung. Schweizer Lösungen für KMU – von der Einrichtung bis zum Betrieb.",
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
