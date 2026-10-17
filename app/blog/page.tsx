import type { Metadata } from "next"
import { BlogIndexPage } from "@/components/site/blog-index-page"
import { createPageMetadata } from "@/lib/seo"

export const metadata: Metadata = createPageMetadata({
  title: "Blog: Praxiswissen zu KI, Marketing und Webdesign",
  description:
    "Antworten, Entscheidungshilfen und Vorlagen für Schweizer KMU: KI-Entwicklung, Marketing, Webdesign und digitale Abläufe verständlich planen.",
  path: "/blog",
})

export default function Page() {
  return <BlogIndexPage />
}
