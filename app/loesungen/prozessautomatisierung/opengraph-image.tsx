import { createSocialImage } from "@/components/site/social-image"
import { coreServices } from "@/lib/core-services"

const service = coreServices[2]
export const alt = "AgenticIT: Prozessautomatisierung für Schweizer KMU"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function Image() {
  return createSocialImage({
    title: service.headline,
    description:
      "Wiederkehrende Aufgaben verbinden und vereinfachen. Mit passenden Tools, klaren Kontrollen und Ihrem Team.",
    category: service.name,
  })
}
