import { createSocialImage } from "@/components/site/social-image"
import { coreServices } from "@/lib/core-services"

const service = coreServices[4]
export const alt = "AgenticIT: Sales und CRM für Schweizer KMU"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function Image() {
  return createSocialImage({
    title: service.headline,
    description:
      "Kampagnen umsetzen, Anfragen im CRM weiterführen und Ihr Team bei der Kundenbetreuung unterstützen.",
    category: service.name,
  })
}
