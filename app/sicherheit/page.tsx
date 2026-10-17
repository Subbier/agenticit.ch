import type { Metadata } from "next"
import { CarbonHubPage } from "@/components/site/carbon-hub-page"
import { PAGES } from "@/lib/page-content"
import { createPageMetadata } from "@/lib/seo"

export const metadata: Metadata = createPageMetadata({
  title: PAGES.sicherheit.meta.title,
  description: PAGES.sicherheit.meta.description,
  path: "/sicherheit",
})

export default function Page() {
  return <CarbonHubPage slug="sicherheit" />
}
