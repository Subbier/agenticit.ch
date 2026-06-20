import type { Metadata } from "next"
import { HubPage } from "@/components/site/hub-page"
import { PAGES } from "@/lib/page-content"
import { createPageMetadata } from "@/lib/seo"

export const metadata: Metadata = createPageMetadata({
  title: PAGES.branchen.meta.title,
  description: PAGES.branchen.meta.description,
  path: "/branchen",
})

export default function Page() {
  return <HubPage slug="branchen" />
}
