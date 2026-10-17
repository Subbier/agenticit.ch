import type { Metadata } from "next"
import { ConfirmationInfo } from "@/components/site/confirmation-info"
export const metadata: Metadata = {
  title: "Ihre Modellrechnung einordnen",
  description:
    "Eigene Annahmen prüfen, einen Ablauf eingrenzen und den nächsten Schritt mit AgenticIT klären.",
  robots: { index: false, follow: false },
}
export default function Page() {
  return <ConfirmationInfo kind="calculation" />
}
