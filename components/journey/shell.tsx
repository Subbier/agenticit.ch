import Link from "next/link"
import { ArrowUpRight, Menu } from "lucide-react"
import { ConsentSettingsLink } from "@/components/site/consent-settings-link"
import styles from "./journey.module.css"

function Brand() {
  return (
    <Link className={styles.brand} href="/" aria-label="AgenticIT Startseite">
      <img
        src="/journey-brand.svg"
        width="44"
        height="44"
        alt=""
        className={styles.brandIcon}
      />
      <span>
        Agentic<strong>IT</strong>
      </span>
    </Link>
  )
}

export function JourneyShell({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.shell}>
      <div className={styles.container}>
        <header className={styles.header}>
          <Brand />
          <nav aria-label="Hauptnavigation" className={styles.nav}>
            <Link href="/werkzeuge">Ihr Ansatzpunkt</Link>
            <Link href="/pakete">Testpakete</Link>
            <Link href="/zusammenarbeit">Zusammenarbeit</Link>
            <Link
              className={`${styles.button} ${styles.smallButton}`}
              href="/kundenreise-check"
            >
              Check starten <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          </nav>
          <details className={styles.mobileNav}>
            <summary aria-label="Menü öffnen">
              <Menu size={21} />
            </summary>
            <div>
              <Link href="/werkzeuge">Ihr Ansatzpunkt</Link>
              <Link href="/pakete">Testpakete</Link>
              <Link href="/zusammenarbeit">Zusammenarbeit</Link>
              <Link href="/kundenreise-check">
                Kostenlosen Check starten ↗
              </Link>
            </div>
          </details>
        </header>
      </div>
      {children}
      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.footerTop}>
            <div>
              <Brand />
              <p className={styles.footerCopy}>
                Marketing, Vertrieb und Kundenbetreuung.
                <br />
                Ein klarer Weg, der Menschen verbindet.
              </p>
            </div>
            <nav aria-label="Fussnavigation" className={styles.footerLinks}>
              <Link href="/werkzeuge">Checks & Vorlagen</Link>
              <Link href="/pakete">Testpakete</Link>
              <Link href="/zusammenarbeit">So arbeiten wir</Link>
              <a href="mailto:info@agenticit.ch">Kontakt aufnehmen ↗</a>
            </nav>
          </div>
          <div className={styles.footerBottom}>
            <span>
              © {new Date().getFullYear()} AgenticIT GmbH · Ostermundigen,
              Schweiz
            </span>
            <div>
              <Link href="/datenschutz">Datenschutz</Link>
              <Link href="/impressum">Impressum</Link>
              <ConsentSettingsLink />
              <a href="https://admin.agenticit.ch">Login</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
