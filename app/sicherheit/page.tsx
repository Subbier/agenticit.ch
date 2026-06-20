import type { Metadata } from "next"
import { HubPage } from "@/components/site/hub-page"
import { PAGES } from "@/lib/page-content"
import { createPageMetadata } from "@/lib/seo"

export const metadata: Metadata = createPageMetadata({
  title: PAGES.sicherheit.meta.title,
  description: PAGES.sicherheit.meta.description,
  path: "/sicherheit",
})

export default function Page() {
  return <HubPage slug="sicherheit" />
}
