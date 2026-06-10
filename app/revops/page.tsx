import type { Metadata } from "next"
import { RevOpsPage } from "@/components/site/revops-page"
import { createPageMetadata } from "@/lib/seo"
import { pageSeo } from "@/lib/seo-faqs"

export const metadata: Metadata = createPageMetadata({
  ...pageSeo.revops,
  path: "/revops",
})

export default function Page() {
  return <RevOpsPage />
}
