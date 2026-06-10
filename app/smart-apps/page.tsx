import type { Metadata } from "next"
import { ServicePage } from "@/components/site/service-page"
import { servicePages } from "@/lib/site-content"
import { createPageMetadata } from "@/lib/seo"
import { pageSeo } from "@/lib/seo-faqs"

export const metadata: Metadata = createPageMetadata({
  ...pageSeo["smart-apps"],
  path: "/smart-apps",
})

export default function Page() {
  return <ServicePage page={servicePages["smart-apps"]} />
}
