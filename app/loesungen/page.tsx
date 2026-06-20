import type { Metadata } from "next"
import { HubPage } from "@/components/site/hub-page"
import { PAGES } from "@/lib/page-content"
import { createPageMetadata } from "@/lib/seo"

export const metadata: Metadata = createPageMetadata({
  title: PAGES.loesungen.meta.title,
  description: PAGES.loesungen.meta.description,
  path: "/loesungen",
})

export default function Page() {
  return <HubPage slug="loesungen" />
}
