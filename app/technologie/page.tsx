import type { Metadata } from "next"
import { CarbonHubPage } from "@/components/site/carbon-hub-page"
import { PAGES } from "@/lib/page-content"
import { createPageMetadata } from "@/lib/seo"

export const metadata: Metadata = createPageMetadata({
  title: PAGES.technologie.meta.title,
  description: PAGES.technologie.meta.description,
  path: "/technologie",
})

export default function Page() {
  return <CarbonHubPage slug="technologie" />
}
