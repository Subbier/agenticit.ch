import type { Metadata } from "next"
import { AiAgentsPage } from "@/components/site/ai-agents-page"
import { createPageMetadata } from "@/lib/seo"
import { pageSeo } from "@/lib/seo-faqs"

export const metadata: Metadata = createPageMetadata({
  ...pageSeo["ai-agents"],
  path: "/ai-agents",
})

export default function Page() {
  return <AiAgentsPage />
}
