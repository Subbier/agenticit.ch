import Link from "next/link"
import { ArrowUpRight, Menu, X } from "lucide-react"
import { ConsentSettingsLink } from "@/components/site/consent-settings-link"
import { WebsiteFeedbackLink } from "@/components/site/website-feedback"
import { company } from "@/lib/company"
import { SkipToContent } from "./skip-to-content"
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
    <div className={styles.shell} data-site-design="journey">
      <SkipToContent />
      <div className={styles.container}>
        <header className={styles.header}>
          <Brand />
          <nav aria-label="Hauptnavigation" className={styles.nav}>
            <Link href="/werkzeuge">Ihr Ansatzpunkt</Link>
            <Link href="/pakete">Services</Link>
            <Link href="/zusammenarbeit">Zusammenarbeit</Link>
            <Link href="/karriere">Jobs</Link>
            <Link
              className={`${styles.button} ${styles.smallButton}`}
              href="/kundenreise-check"
            >
              Check starten <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          </nav>
          <details className={styles.mobileNav}>
            <summary aria-label="Menü">
              <Menu
                size={24}
                strokeWidth={2.6}
                className={styles.menuIcon}
                aria-hidden="true"
              />
              <X
                size={24}
                strokeWidth={2.6}
                className={styles.closeMenuIcon}
                aria-hidden="true"
              />
            </summary>
            <div>
              <Link href="/werkzeuge">Ihr Ansatzpunkt</Link>
              <Link href="/pakete">Services</Link>
              <Link href="/zusammenarbeit">Zusammenarbeit</Link>
              <Link href="/karriere">Jobs</Link>
              <Link href="/kundenreise-check">
                Unverbindlichen Check starten ↗
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
              <div className={styles.swissBadge}>
                <img
                  src="/logos/swiss-flag-flat.svg"
                  width="20"
                  height="20"
                  alt=""
                />
                <span>100% Schweizer Software &amp; Hosting</span>
              </div>
            </div>
            <nav aria-label="Fussnavigation" className={styles.footerLinks}>
              <div>
                <strong>Entdecken</strong>
                <Link href="/werkzeuge">Checks & Vorlagen</Link>
                <Link href="/pakete">Services</Link>
                <Link href="/zusammenarbeit">So arbeiten wir</Link>
              </div>
              <div>
                <strong>Wissen</strong>
                <Link href="/blog">Blog</Link>
                <Link href="/branchen">Branchen</Link>
                <Link href="/karriere">Jobs</Link>
              </div>
              <div>
                <strong>Kontakt</strong>
                <a href={`tel:${company.phone}`}>{company.phoneLabel}</a>
                <a href={`mailto:${company.email}`}>{company.email}</a>
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
                href={company.swico.directoryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.footerTrustLink}
                aria-label="Mitglied bei Swico"
                title="Mitglied bei Swico"
              >
                <span
                  className={`${styles.footerTrustImage} ${styles.swicoImage}`}
                >
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
              <a
                href="https://swissmarketing.ch/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.footerTrustLink}
                aria-label="Mitglied bei Swiss Marketing"
                title="Mitglied bei Swiss Marketing"
              >
                <span className={styles.footerTrustImage}>
                  <img
                    src="/logos/swiss-marketing.png"
                    alt="Swiss Marketing"
                    width="278"
                    height="102"
                    loading="lazy"
                    className={styles.swissMarketingLogo}
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
              © {new Date().getFullYear()} {company.legalName} · Bern, Schweiz
            </span>
            <div className={styles.footerCredit}>
              <span>Coded in Bärn mit</span>
              <span
                className={styles.energyCans}
                role="img"
                aria-label="5 Red Bull Sugarfree"
              >
                {Array.from({ length: 5 }, (_, index) => (
                  <img
                    key={index}
                    src="/logos/energy-can.png"
                    width="9"
                    height="24"
                    alt=""
                    loading="lazy"
                  />
                ))}
              </span>
            </div>
            <div className={styles.footerMetaLinks}>
              <Link href="/datenschutz">Datenschutz</Link>
              <Link href="/impressum">Impressum</Link>
              <ConsentSettingsLink />
              <WebsiteFeedbackLink />
              <a href="https://admin.agenticit.ch">Login</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
