import type { Metadata } from "next"
import { ContactPage } from "@/components/site/contact-page"
import { createPageMetadata } from "@/lib/seo"

export const metadata: Metadata = createPageMetadata({
  title: "Kontakt – KI-Lösungen für Schweizer KMU",
  description:
    "Ihr Kontakt zu AgenticIT GmbH in Ostermundigen bei Bern. Besprechen wir Marketing, Sales und Digitalisierung mit KI. 031 539 44 44, info@agenticit.ch.",
  path: "/kontakt",
})

export default function Page() {
  return <ContactPage />
}
