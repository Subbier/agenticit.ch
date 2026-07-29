import type { Metadata } from "next"
import { PotenzialrechnerPage } from "@/components/site/potenzialrechner-page"
import { createPageMetadata } from "@/lib/seo"

export const metadata: Metadata = createPageMetadata({
  title: "Potenzialrechner – Nachfrage in Ihrer Branche | AgenticIT",
  description:
    "Wie viele Menschen suchen jeden Monat in der Schweiz nach Ihrer Branche? Der kostenlose Potenzialrechner zeigt die echte Nachfrage – und den Weg, sie abzuholen.",
  path: "/potenzialrechner",
})

export default function Page() {
  return <PotenzialrechnerPage />
}
