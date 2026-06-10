import type { Metadata } from "next"
import { HomePage } from "@/components/site/home-page"
import { createPageMetadata, webApplicationJsonLd } from "@/lib/seo"
import { pageSeo } from "@/lib/seo-faqs"

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
            name: "AgenticIT Potenzialrechner",
            description:
              "Interaktiver Rechner: monatliche Such-Nachfrage nach Ihrer Branche in der Deutschschweiz – und wie viel davon ungenutzt bleibt.",
            path: "/",
          }),
        ]}
      />
    </>
  )
}
