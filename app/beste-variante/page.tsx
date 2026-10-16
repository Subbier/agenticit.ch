import type { Metadata } from "next"
import { InsuranceLeadPage } from "@/components/journey/insurance-lead"

export const metadata: Metadata = {
  title: { absolute: "Lead-Terminierung testen | AgenticIT" },
  description:
    "Teste die Lead-Terminierung mit Mia. Formular ausfüllen, KI-Testanruf erhalten und einen Termin mit Sabir vereinbaren.",
  robots: { index: false, follow: false },
  alternates: { canonical: "https://agenticit.ch/beste-variante" },
}

export default function Page() {
  return <InsuranceLeadPage />
}
