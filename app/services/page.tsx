import type { Metadata } from "next"
import { ServicesPage } from "@/components/site/services-page"
import { createPageMetadata } from "@/lib/seo"
import { pageSeo } from "@/lib/seo-faqs"

export const metadata: Metadata = createPageMetadata({
  ...pageSeo.services,
  path: "/services",
})

export default function Page() {
  return <ServicesPage />
}
