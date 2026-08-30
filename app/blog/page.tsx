import type { Metadata } from "next"
import { BlogIndexPage } from "@/components/site/blog-index-page"
import { createPageMetadata } from "@/lib/seo"

export const metadata: Metadata = createPageMetadata({
  title: "Blog: Praxiswissen zu KI-Agenten, RevOps & Automatisierung",
  description:
    "Leitfäden, Kennzahlen und Praxisbeispiele für Schweizer KMU: KI-Agenten, RevOps, Leadgenerierung und Prozessautomatisierung — umsetzbar erklärt.",
  path: "/blog",
})

export default function Page() {
  return <BlogIndexPage />
}
