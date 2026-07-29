import type { Metadata } from "next"
import { KarrierePage } from "@/components/site/karriere-page"
import { createPageMetadata, breadcrumbJsonLd } from "@/lib/seo"
import { JsonLd } from "@/components/site/json-ld"

export const metadata: Metadata = createPageMetadata({
  title: "Karriere: Dirigent:innen für KI-Agenten gesucht",
  description:
    "Wir suchen AI GTM Spezialist:innen, AI RevOps Architect:innen und Lernende (Informatik EFZ) in Bern – Menschen, die Teams aus KI-Agenten dirigieren.",
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
