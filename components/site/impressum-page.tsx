import { LegalPageLayout } from "@/components/site/legal-page-layout"
import { impressumSections } from "@/lib/legal-impressum"
import { company } from "@/lib/company"

export function ImpressumPage() {
  return (
    <LegalPageLayout
      title="Impressum"
      intro={`Firmenangaben und Kontakt der ${company.legalName} in Ostermundigen bei Bern.`}
      sections={impressumSections}
    />
  )
}
