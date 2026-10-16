import { JourneyShell } from "@/components/journey/shell"
import {
  JourneyCta,
  JourneyFaqs,
  PackageCards,
} from "@/components/journey/sections"
import { createPageMetadata } from "@/lib/seo"
import styles from "@/components/journey/journey.module.css"

export const metadata = createPageMetadata({
  title: "Testpakete für Vertrieb und digitale Abläufe",
  description:
    "Ein abgegrenzter Pilot für Anfragen, Terminierung oder einen wiederkehrenden Ablauf. Klare Voraussetzungen, vereinbarte Abnahme und separate Entscheidung über den Ausbau.",
  path: "/pakete",
})

export default function Page() {
  return (
    <JourneyShell>
      <main className={styles.container}>
        <div className={styles.pageHero}>
          <span className={styles.eyebrow}>Gezielt ausprobieren</span>
          <h1>
            Erst ein Prozess.
            <br />
            Dann eine gute Entscheidung.
          </h1>
          <p>
            Eine ganze Kundenreise lässt sich Schritt für Schritt verbessern.
            Wir beginnen dort, wo ein begrenzter Test für Ihr Team sinnvoll ist.
          </p>
        </div>
        <section className={styles.checkArea} aria-label="Unsere Testpakete">
          <PackageCards expanded />
          <div className={styles.measurement}>
            <strong>So bleibt der Pilot überschaubar</strong>Wir halten
            Ergebnis, Zuständigkeiten, Startvoraussetzungen, Kundeneinsatz,
            Nutzungslimits und Abnahme schriftlich fest. Bei zu wenig Vorgängen
            besprechen wir die Datenlage. Einen grösseren Ausbau oder eine
            Verlängerung vereinbaren wir separat.
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
