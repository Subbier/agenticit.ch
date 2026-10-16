import { CoreServicePage } from "@/components/journey/core-service-page"
import { coreServices } from "@/lib/core-services"
import { createPageMetadata } from "@/lib/seo"

const service = coreServices[0]
export const metadata = createPageMetadata({
  title: service.title,
  description: service.description,
  path: `/loesungen/${service.slug}`,
  image: `/loesungen/${service.slug}/opengraph-image`,
  imageAlt: `${service.title} – AgenticIT`,
})

export default function Page() {
  return <CoreServicePage service={service} />
}
