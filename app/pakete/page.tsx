import { JourneyShell } from "@/components/journey/shell"
import {
  JourneyCta,
  JourneyFaqs,
  PackageCards,
} from "@/components/journey/sections"
import { createPageMetadata } from "@/lib/seo"
import styles from "@/components/journey/journey.module.css"

export const metadata = createPageMetadata({
  title: "Marketing, Sales und Verwaltung: Ihr passender Einstieg",
  description:
    "Digitaler Auftritt, aktive Kundengewinnung und einfachere Abläufe mit KI. Entdecken Sie Ihren Einstieg in Marketing, Sales oder Verwaltung – mit klar vereinbartem Umfang.",
  path: "/pakete",
})

export default function Page() {
  return (
    <JourneyShell>
      <main className={styles.container}>
        <div className={styles.pageHero}>
          <span className={styles.eyebrow}>Drei Bereiche. Ein Partner.</span>
          <h1>
            Ihr Einstieg.
            <br />
            Passend zu Ihrem Unternehmen.
          </h1>
          <p>
            Vom digitalen Auftritt über die Kundengewinnung bis zur Betreuung:
            Wir verbinden Ihre Systeme und begleiten Ihr Team. Gemeinsam wählen
            wir einen überschaubaren Einstieg, der Ihren Alltag verbessert.
          </p>
        </div>
        <section className={styles.checkArea} aria-label="Unsere Testpakete">
          <PackageCards expanded />
          <div className={styles.measurement}>
            <strong>Ein klarer Einstieg. Gemeinsam vereinbart.</strong>Die
            Punkte zeigen, wobei wir Sie im jeweiligen Bereich unterstützen.
            Welche Leistungen Ihr erster Schritt umfasst, halten wir vor dem
            Start fest – mit Ergebnis, Zuständigkeiten, Kosten und Abnahme.
            Danach entscheiden Sie, wie es weitergeht.
          </div>
          <JourneyCta />
        </section>
        <section className={styles.section}>
          <span className={styles.eyebrow}>Vor dem Start</span>
          <h2>Was Sie wissen möchten.</h2>
          <JourneyFaqs />
        </section>
      </main>
    </JourneyShell>
  )
}
