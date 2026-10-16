import { createSocialImage } from "@/components/site/social-image"
import { coreServices } from "@/lib/core-services"

const service = coreServices[1]
export const alt = "AgenticIT: Webdesign für Schweizer KMU"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function Image() {
  return createSocialImage({
    title: service.headline,
    description:
      "Websites und Landingpages mit klaren Inhalten, guter Mobilbedienung und einem passenden Weg zur Anfrage.",
    category: service.name,
  })
}
