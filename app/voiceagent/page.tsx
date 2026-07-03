import type { Metadata } from "next"
import { VoiceAgentPage } from "@/components/site/voiceagent-page"

// Geheime Seite: nicht indexieren, nicht folgen, nicht in der Sitemap.
// Nur über die direkte URL agenticit.ch/voiceagent erreichbar.
export const metadata: Metadata = {
  title: "Voice Agent – AgenticIT",
  description:
    "Exklusive Demo: KI-Telefonassistent für Finanzdienstleister. Nur für ausgewählte Partner.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
}

export default function Page() {
  return <VoiceAgentPage />
}
