import { createSocialImage } from "@/components/site/social-image"

export const alt = "AgenticIT: Neue Kunden. Digitale Abläufe. Ein Partner."
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function Image() {
  return createSocialImage({
    title: "Neue Kunden. Digitale Abläufe. Ein Partner.",
    description:
      "Wir verbinden Marketing und Sales mit Webdesign, CRM und KI-Automatisierung. Damit Ihr Team mehr Zeit für Kunden hat.",
  })
}
