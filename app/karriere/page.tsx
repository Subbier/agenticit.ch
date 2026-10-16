import type { Metadata } from "next"
import { KarrierePage } from "@/components/site/karriere-page"
import { createPageMetadata, breadcrumbJsonLd } from "@/lib/seo"
import { JsonLd } from "@/components/site/json-ld"

export const metadata: Metadata = createPageMetadata({
  title: "Karriere in Bern: Marketing, Sales & KI mitgestalten",
  description:
    "Offene Stellen und Lehrstelle 2027 bei AgenticIT in Bern. Gestalten Sie Marketing, Sales, KI-Automatisierung und Software mit uns. Jetzt Stelle entdecken und bewerben.",
  path: "/karriere",
})

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Startseite", path: "/" },
            { name: "Karriere", path: "/karriere" },
          ]),
        ]}
      />
      <KarrierePage />
    </>
  )
}
