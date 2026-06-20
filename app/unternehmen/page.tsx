import type { Metadata } from "next"
import { HubPage } from "@/components/site/hub-page"
import { PAGES } from "@/lib/page-content"
import { createPageMetadata } from "@/lib/seo"

export const metadata: Metadata = createPageMetadata({
  title: PAGES.unternehmen.meta.title,
  description: PAGES.unternehmen.meta.description,
  path: "/unternehmen",
})

export default function Page() {
  return <HubPage slug="unternehmen" />
}
