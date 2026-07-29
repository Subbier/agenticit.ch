import type { Metadata } from "next"
import { HomePage } from "@/components/site/home-page"
import { createPageMetadata, faqPageJsonLd, webApplicationJsonLd } from "@/lib/seo"
import { pageSeo, homeAllFaqs } from "@/lib/seo-faqs"

export const metadata: Metadata = {
  ...createPageMetadata({
    ...pageSeo.home,
    path: "/",
  }),
  title: { absolute: pageSeo.home.title },
}

export default function Page() {
  return (
    <>
      <HomePage
        jsonLd={[
          webApplicationJsonLd({
            name: "AgenticIT Branchen-Radar",
            description:
              "Interaktives Nachfrage-Tool: Branche und Region wählen und sofort sehen, wie viele Suchanfragen pro Monat auf Ihren Markt entfallen und welche 10 Anbieter die Google-Rangliste anführen. Datenbasis Ubersuggest/Google, Schweiz.",
            path: "/",
          }),
          faqPageJsonLd(homeAllFaqs),
        ]}
      />
    </>
  )
}
