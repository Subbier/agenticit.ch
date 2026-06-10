import { LegalPageLayout } from "@/components/site/legal-page-layout"
import { impressumSections } from "@/lib/legal-impressum"

export function ImpressumPage() {
  return (
    <LegalPageLayout
      title="Impressum"
      intro="Pflichtangaben der Agentic IT GmbH (AgenticIT) gemäss Art. 3 Abs. 1 lit. s UWG – Schweiz."
      sections={impressumSections}
    />
  )
}
