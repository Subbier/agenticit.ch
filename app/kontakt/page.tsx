import type { Metadata } from "next"
import { ContactPage } from "@/components/site/contact-page"
import { createPageMetadata } from "@/lib/seo"

export const metadata: Metadata = createPageMetadata({
  title: "Kontakt – AgenticIT | KI-Lösungen für Schweizer KMU",
  description:
    "Sprechen wir über Ihr Potenzial. Schreiben Sie uns – wir melden uns persönlich. Telefon 044 505 20 27, info@agenticit.ch. Daten in der Schweiz, DSG-konform.",
  path: "/kontakt",
})

export default function Page() {
  return <ContactPage />
}
