import { JourneyShell } from "@/components/journey/shell"
import { AutomationCheck } from "@/components/journey/automation-check"
import { createPageMetadata } from "@/lib/seo"
import styles from "@/components/journey/journey.module.css"

export const metadata = createPageMetadata({
  title: "Automatisierungs-Check: Ihr Zeitpotenzial in Minuten und CHF",
  description:
    "Manuelle Aufgaben wählen und Zeitpotenzial mit Ihren Angaben berechnen – inklusive zusätzlicher Kontrolle, vorsichtigerem Szenario und einem Plan für Ihren nächsten Schritt.",
  path: "/automatisierungs-check",
})

export default function Page() {
  return (
    <JourneyShell>
      <main className={styles.container}>
        <div className={styles.pageHero}>
          <span className={styles.eyebrow}>
            Weniger Handarbeit. Mehr Freiraum.
          </span>
          <h1>
            Was kostet Sie
            <br />
            Ihre tägliche Routine?
          </h1>
          <p>
            Wählen Sie Ihre Branche und die Aufgaben, die Ihr Team noch von Hand
            erledigt. Mit Ihren Zahlen wird sichtbar, wo Automatisierung Zeit
            freigeben könnte – mit zusätzlicher Kontrollzeit und einem Plan zum
            Speichern.
          </p>
        </div>
        <AutomationCheck />
      </main>
    </JourneyShell>
  )
}
