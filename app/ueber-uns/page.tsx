import type { Metadata } from "next"
import { AboutPage } from "@/components/site/about-page"
import { createPageMetadata } from "@/lib/seo"
import { pageSeo } from "@/lib/seo-faqs"

export const metadata: Metadata = createPageMetadata({
  ...pageSeo["ueber-uns"],
  path: "/ueber-uns",
})

export default function Page() {
  return <AboutPage />
}
