import type { Metadata } from "next"
import { AngebotPage } from "@/components/site/angebot-page"
import { createPageMetadata } from "@/lib/seo"

export const metadata: Metadata = createPageMetadata({
  title: "Unser Angebot: vier Wege zu mehr Umsatz",
  description:
    "Die ganze Kundenreise mit KI: Begeistern, Umsetzen, Erschaffen, Erweitern – vier Bereiche für mehr Umsatz und weniger Handarbeit.",
  path: "/angebot",
})

export default function Page() {
  return <AngebotPage />
}
