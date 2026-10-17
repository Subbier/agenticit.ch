import { createSocialImage } from "@/components/site/social-image"
import { coreServices } from "@/lib/core-services"

const service = coreServices[3]
export const alt = "AgenticIT: Marketing für Schweizer KMU"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function Image() {
  return createSocialImage({
    title: service.headline,
    description:
      "Zielgruppe, Website und Werbekonten für Ihren Kampagnenstart vorbereiten.",
    category: service.name,
  })
}
