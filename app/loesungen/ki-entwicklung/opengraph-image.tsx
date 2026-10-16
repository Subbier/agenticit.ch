import { createSocialImage } from "@/components/site/social-image"
import { coreServices } from "@/lib/core-services"

const service = coreServices[0]
export const alt = "AgenticIT: KI-Entwicklung für Schweizer KMU"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function Image() {
  return createSocialImage({
    title: service.headline,
    description:
      "Individuelle KI-Anwendungen und Assistenten, die mit Ihren bestehenden Tools zusammenarbeiten.",
    category: service.name,
  })
}
