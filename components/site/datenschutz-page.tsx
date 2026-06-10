import { LegalPageLayout } from "@/components/site/legal-page-layout"
import { datenschutzSections } from "@/lib/legal-datenschutz"

export function DatenschutzPage() {
  return (
    <LegalPageLayout
      title="Datenschutz"
      intro="Datenschutz bei AgenticIT (Agentic IT GmbH, Schweiz): Bearbeitung personenbezogener Daten gemäss DSG und DSGVO."
      sections={datenschutzSections}
    />
  )
}
