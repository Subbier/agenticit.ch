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
      <footer id="footer" className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.footerTop}>
            <div className={styles.footerBrand}>
              <Brand />
              <p className={styles.footerCopy}>
                Schweizer Lösungen. Digital verbunden.
                <br />
                Mehr Freiraum für Ihr Unternehmen.
              </p>
            </div>
            <nav aria-label="Fussnavigation" className={styles.footerLinks}>
              <div>
                <strong>Entdecken</strong>
                <Link href="/werkzeuge">Checks & Vorlagen</Link>
                <Link href="/pakete">Testpakete</Link>
                <Link href="/zusammenarbeit">So arbeiten wir</Link>
              </div>
              <div>
                <strong>Wissen</strong>
                <Link href="/blog">Blog</Link>
                <Link href="/branchen">Branchen</Link>
              </div>
              <div>
                <strong>Kontakt</strong>
                <a href="tel:+41315394444">031 539 44 44</a>
                <a href="mailto:info@agenticit.ch">info@agenticit.ch</a>
                <Link href="/kontakt">Kontaktformular ↗</Link>
                <span>Bern, Schweiz</span>
              </div>
            </nav>
            <div
              className={styles.footerTrust}
              aria-label="Mitgliedschaften und Ausbildung"
            >
              <a
                href="https://www.swissict.ch/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.footerTrustLink}
                aria-label="Mitglied bei swissICT"
                title="Mitglied bei swissICT"
              >
                <span className={styles.footerTrustImage}>
                  <img
                    src="/logos/swissict-src.png"
                    alt="swissICT"
                    width="166"
                    height="74"
                    loading="lazy"
                    className={styles.swissictLogo}
                  />
                </span>
                <span>Mitglied</span>
              </a>
              <a
                href="https://www.swico.ch/de/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.footerTrustLink}
                aria-label="Mitglied bei Swico"
                title="Mitglied bei Swico"
              >
                <span className={styles.footerTrustImage}>
                  <img
                    src="/logos/swico-rgb.jpg"
                    alt="Swico"
                    width="2000"
                    height="852"
                    loading="lazy"
                    className={styles.swicoLogo}
                  />
                </span>
                <span>Mitglied</span>
              </a>
              <Link
                href="/karriere"
                className={`${styles.footerTrustLink} ${styles.footerTrustTraining}`}
                aria-label="Wir bilden aus – Ausbildung und Karriere"
                title="Ausbildung und Karriere bei AgenticIT"
              >
                <span className={styles.footerTrustImage}>
                  <img
                    src="/logos/wir-bilden-aus.png"
                    alt=""
                    width="600"
                    height="600"
                    loading="lazy"
                    className={styles.trainingLogo}
                  />
                </span>
                <span>Wir bilden aus</span>
              </Link>
            </div>
          </div>
          <div className={styles.footerBottom}>
            <span>
              © {new Date().getFullYear()} AgenticIT GmbH · Bern, Schweiz
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
