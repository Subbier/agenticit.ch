import type { Metadata } from "next"
import { AngebotAreaPage } from "@/components/site/angebot-area-page"
import { ANGEBOT_BY_KEY } from "@/lib/angebot-content"
import { createPageMetadata } from "@/lib/seo"

const area = ANGEBOT_BY_KEY.erschaffen

export const metadata: Metadata = createPageMetadata({
  title: area.meta.title,
  description: area.meta.description,
  path: `/${area.slug}`,
})

export default function Page() {
  return <AngebotAreaPage area={area} />
}
