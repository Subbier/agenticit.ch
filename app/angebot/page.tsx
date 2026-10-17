import type { Metadata } from "next"
import { AngebotPage } from "@/components/site/angebot-page"
import { createPageMetadata } from "@/lib/seo"
import { offerOverview } from "@/lib/angebot-content"

export const metadata: Metadata = createPageMetadata({
  title: offerOverview.title,
  description: offerOverview.description,
  path: "/angebot",
  modifiedTime: "2026-10-17",
})

export default function Page() {
  return <AngebotPage />
}
