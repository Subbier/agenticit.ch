import { LegalPageLayout } from "@/components/site/legal-page-layout"
import { datenschutzSections } from "@/lib/legal-datenschutz"
import { company } from "@/lib/company"

export function DatenschutzPage() {
  return (
    <LegalPageLayout
      title="Datenschutz"
      intro={`Datenschutz bei ${company.legalName}, Schweiz: Bearbeitung personenbezogener Daten gemäss DSG und DSGVO.`}
      sections={datenschutzSections}
    />
  )
}
