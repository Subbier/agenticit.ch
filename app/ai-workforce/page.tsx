import type { Metadata } from "next"
import { AiWorkforcePage } from "@/components/site/ai-workforce-page"
import { createPageMetadata } from "@/lib/seo"

export const metadata: Metadata = createPageMetadata({
  title: "AI Workforce – KI-Mitarbeiter für Ihr KMU",
  description:
    "Die gut gelaunten KI-Mitarbeiter lassen Sie nie im Stich: Empfang, Back Office und Sales übernehmen KI-Agenten – Anrufe annehmen, Termine buchen, E-Mails vorbereiten. 24/7, revDSG-konform.",
  path: "/ai-workforce",
})

export default function Page() {
  return <AiWorkforcePage />
}
