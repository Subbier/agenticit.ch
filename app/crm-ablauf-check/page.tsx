import { PotentialPage } from "@/components/journey/potential-page"
import { createPageMetadata } from "@/lib/seo"

export const metadata = createPageMetadata({
  title: "CRM-Potenzial: Weniger Handarbeit, mehr Zeit",
  description:
    "Was könnten weniger manuelle CRM-Vorgänge für Sie wert sein? Wählen Sie Ihr Szenario und erhalten Sie Ihre persönliche Berechnung als PDF nach Ihren Kontaktdaten.",
  path: "/crm-ablauf-check",
})

export default function Page() {
  return (
    <PotentialPage
      kind="admin"
      context="crm"
      title="Wie viel Zeit steckt in Ihrer CRM-Handarbeit?"
    />
  )
}
