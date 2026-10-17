import { JourneyShell } from "@/components/journey/shell"
import {
  JourneyCta,
  JourneyFaqs,
  PackageCards,
} from "@/components/journey/sections"
import { createPageMetadata } from "@/lib/seo"
import styles from "@/components/journey/journey.module.css"

export const metadata = createPageMetadata({
  title: "Unsere Services: Marketing, Sales und Verwaltung",
  description:
    "Unsere Services für Marketing, Sales und Verwaltung: digitaler Auftritt, aktive Kundengewinnung und einfachere Abläufe mit KI. Ein Partner für Ihre Umsetzung.",
  path: "/pakete",
})

export default function Page() {
  return (
    <JourneyShell>
      <main id="main-content" tabIndex={-1} className={styles.container}>
        <div className={styles.pageHero}>
          <span className={styles.eyebrow}>Drei Bereiche. Ein Partner.</span>
          <h1>
            Unsere Services.
            <br />
            Passend zu Ihrem Unternehmen.
          </h1>
          <p>
            Vom digitalen Auftritt über die Kundengewinnung bis zur Betreuung:
            Wir verbinden Ihre Systeme und begleiten Ihr Team. Sie erhalten die
            Unterstützung, die Ihr Unternehmen weiterbringt – in einem Bereich
            oder über alle drei hinweg.
          </p>
        </div>
        <section className={styles.checkArea} aria-label="Unsere Services">
          <PackageCards expanded />
          <div className={styles.measurement}>
            <strong>Ihre Ziele. Unsere Services. Klar vereinbart.</strong>Die
            Punkte zeigen, wobei wir Sie im jeweiligen Bereich unterstützen.
            Welche Leistungen wir für Sie übernehmen, halten wir vor dem Start
            fest – mit Ergebnis, Zuständigkeiten, Kosten und Abnahme. Auch
            Betrieb und Betreuung stimmen wir auf Ihren Bedarf ab.
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
