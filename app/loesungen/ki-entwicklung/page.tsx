import { CoreServicePage } from "@/components/journey/core-service-page"
import { WorkflowDemo } from "@/components/journey/workflow-demo"
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
  return (
    <CoreServicePage
      service={service}
      example={{
        title: "Ein Anfrageweg. Zum Ausprobieren.",
        intro:
          "Sehen Sie, was KI vorbereitet und wo Ihr Team entscheidet. Wählen Sie auch den Fall, in dem eine Zuständigkeit fehlt.",
        content: <WorkflowDemo />,
      }}
    />
  )
}
