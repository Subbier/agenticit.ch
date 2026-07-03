import type { Metadata } from "next"
import { AngebotPage } from "@/components/site/angebot-page"
import { createPageMetadata } from "@/lib/seo"

export const metadata: Metadata = createPageMetadata({
  title: "Unser Angebot – Acquire, Convert, Retain & Operate | AgenticIT",
  description:
    "Die ganze Kundenreise mit KI: Neukunden gewinnen (Acquire), schneller abschliessen (Convert), Kunden binden (Retain) und den Betrieb automatisieren (Operate).",
  path: "/angebot",
})

export default function Page() {
  return <AngebotPage />
}
