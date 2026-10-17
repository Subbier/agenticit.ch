import type { Metadata } from "next"
import { ExcellencePage } from "@/components/site/excellence-page"
import { createPageMetadata } from "@/lib/seo"
import { pageSeo } from "@/lib/seo-faqs"

export const metadata: Metadata = createPageMetadata({
  ...pageSeo.excellence,
  path: "/excellence",
  modifiedTime: "2026-10-17",
})

export default function Page() {
  return <ExcellencePage />
}
