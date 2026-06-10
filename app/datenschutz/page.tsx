import type { Metadata } from "next"
import { DatenschutzPage } from "@/components/site/datenschutz-page"
import { datenschutzMeta } from "@/lib/legal-datenschutz"
import { createPageMetadata } from "@/lib/seo"

export const metadata: Metadata = {
  ...createPageMetadata({
    title: datenschutzMeta.title,
    description: datenschutzMeta.description,
    path: "/datenschutz",
  }),
  title: { absolute: `${datenschutzMeta.title} | AgenticIT` },
}

export default function Page() {
  return <DatenschutzPage />
}
