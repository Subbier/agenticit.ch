import type { Metadata } from "next"
import { AngebotAreaPage } from "@/components/site/angebot-area-page"
import { ANGEBOT_BY_KEY } from "@/lib/angebot-content"
import { createPageMetadata } from "@/lib/seo"

// Alt-Slug "acquire" -> "begeistern" (siehe permanenter Redirect in next.config.mjs).
const area = ANGEBOT_BY_KEY.begeistern

export const metadata: Metadata = createPageMetadata({
  title: area.meta.title,
  description: area.meta.description,
  path: `/${area.slug}`,
})

export default function Page() {
  return <AngebotAreaPage area={area} />
}
