import Link from "next/link"
import { JourneyShell } from "@/components/journey/shell"
import styles from "@/components/journey/journey.module.css"

export default function NotFound() {
  return (
    <JourneyShell>
      <main id="main-content" tabIndex={-1} className={styles.container}>
        <div className={styles.pageHero}>
          <span className={styles.eyebrow}>Seite nicht gefunden</span>
          <h1>Hier geht es gerade nicht weiter.</h1>
          <p>
            Diese Adresse ist nicht verfügbar. Auf der Startseite finden Sie
            unsere Lösungen und den passenden Einstieg.
          </p>
          <div className={styles.actions}>
            <Link className={styles.button} href="/">
              Zur Startseite
            </Link>
            <Link className={styles.secondary} href="/werkzeuge">
              Checks & Vorlagen
            </Link>
          </div>
        </div>
      </main>
    </JourneyShell>
  )
}
