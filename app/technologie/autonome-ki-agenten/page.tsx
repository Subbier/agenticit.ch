import type { Metadata } from "next"
import { SubPage } from "@/components/site/subpage"
import { SUBPAGES } from "@/lib/subpage-content"
import { createPageMetadata } from "@/lib/seo"

const SLUG = "technologie/autonome-ki-agenten"

export const metadata: Metadata = createPageMetadata({
  title: SUBPAGES[SLUG].meta.title,
  description: SUBPAGES[SLUG].meta.description,
  path: `/${SLUG}`,
})

export default function Page() {
  return <SubPage slug={SLUG} />
}
