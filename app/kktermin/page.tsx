import type { Metadata } from "next"
import { KkTerminPage } from "@/components/site/kktermin-page"

// Kampagnen-Landingpage (Demo) der fiktiven Maklerservice AG.
// Bewusst noindex: reine Demo-/Kampagnenseite, nicht für Suchmaschinen.
export const metadata: Metadata = {
  title: "Alternativmedizin von der Krankenkasse zurückholen | Maklerservice AG",
  description:
    "Sie zahlen Osteopathie, TCM & Naturheilkunde aus der eigenen Tasche? Kostenloser Prämien-Check mit Fokus Alternativmedizin – in 2 Minuten angefragt.",
  robots: { index: false, follow: false },
}

export default function Page() {
  return <KkTerminPage />
}
