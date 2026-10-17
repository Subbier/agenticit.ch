import type { Metadata } from "next"
import { ConfirmationInfo } from "@/components/site/confirmation-info"
export const metadata: Metadata = {
  title: "Nach Ihrer Anfrage",
  description:
    "Wie AgenticIT Ihr Anliegen persönlich prüft und wie Sie uns bei Fragen erreichen.",
  robots: { index: false, follow: false },
}
export default function Page() {
  return <ConfirmationInfo kind="inquiry" />
}
