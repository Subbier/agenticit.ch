import type { Metadata } from "next"
import { ImpressumPage } from "@/components/site/impressum-page"
import { impressumMeta } from "@/lib/legal-impressum"
import { createPageMetadata } from "@/lib/seo"

export const metadata: Metadata = {
  ...createPageMetadata({
    title: impressumMeta.title,
    description: impressumMeta.description,
    path: "/impressum",
  }),
  title: { absolute: `${impressumMeta.title} | AgenticIT` },
}

export default function Page() {
  return <ImpressumPage />
}
