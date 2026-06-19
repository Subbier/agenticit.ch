import type { Metadata } from "next"
import { BlogPage } from "@/components/site/blog-page"
import { createPageMetadata } from "@/lib/seo"
import { pageSeo } from "@/lib/seo-faqs"

export const metadata: Metadata = createPageMetadata({
  ...pageSeo.blog,
  path: "/blog",
})

export default function Page() {
  return <BlogPage />
}
