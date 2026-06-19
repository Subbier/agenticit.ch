import type { Metadata } from "next"
import { agenticPages } from "@/lib/agentic-pages"
import { AgenticLanding } from "@/components/site/agentic-landing"
import { createPageMetadata } from "@/lib/seo"

const def = agenticPages["agentic-ai"]

export const metadata: Metadata = createPageMetadata({
  title: def.title,
  description: def.description,
  keywords: def.keywords,
  path: "/agentic-ai",
})

export default function Page() {
  return <AgenticLanding def={def} />
}
