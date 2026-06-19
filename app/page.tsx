import type { Metadata } from "next"
import { HomePage } from "@/components/site/home-page"
import { createPageMetadata, serviceJsonLd, faqPageJsonLd } from "@/lib/seo"
import { pageSeo, homeFaqs } from "@/lib/seo-faqs"

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
          serviceJsonLd({
            name: "AgenticIT Potenzialrechner",
            description:
              "Interaktiver Rechner: monatliche Such-Nachfrage nach Ihrer Branche in der Deutschschweiz – und wie viel davon ungenutzt bleibt.",
            path: "/",
          }),
          faqPageJsonLd(homeFaqs),
        ]}
      />
    </>
  )
}
