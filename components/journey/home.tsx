import Link from "next/link"
import { ArrowUpRight, Play } from "lucide-react"
import { JourneyShell } from "./shell"
import {
  ChallengeCards,
  CollaborationSteps,
  JourneyCta,
  JourneyFaqs,
  PackageCards,
} from "./sections"
import { JourneyMap } from "./journey-map"
import { CompanyVideo } from "./company-video"
import { Careers } from "./careers"
import { ServiceShowcase } from "./service-showcase"
import { DecisionGuides } from "./decision-guides"
import styles from "./journey.module.css"

export function JourneyHome() {
  return (
    <JourneyShell>
      <main id="main-content" tabIndex={-1}>
        <div className={styles.container}>
          <section className={styles.hero}>
            <div>
              <span className={styles.eyebrow}>Schweizer Lösungen für KMU</span>
              <h1>
                Neue Kunden.
                <br />
                Digitale Abläufe.
                <br />
                <em>Ein Partner.</em>
              </h1>
              <p className={styles.heroCopy}>
                Was wäre, wenn Ihre Website verkauft, Ihr CRM Termine bucht und
                Belege sich von selbst einordnen? Das bauen wir: Kundenakquise,
                Digitalisierung und KI für Ihren Betrieb – damit Ihr Unternehmen
                schon heute bereit ist für morgen.
              </p>
              <div className={styles.actions}>
                <Link href="/kundenreise-check" className={styles.button}>
                  Unverbindlichen Check starten{" "}
                  <ArrowUpRight size={18} aria-hidden="true" />
                </Link>
                <Link className={styles.textLink} href="#firmenvideo">
                  <Play size={15} aria-hidden="true" /> Video ansehen
                </Link>
              </div>
              <p className={`${styles.fine} ${styles.heroFine}`}>
                Unverbindlicher Check · Ergebnis sofort
              </p>
            </div>
            <ServiceShowcase />
          </section>
          <CompanyVideo />
          <section className={styles.section} id="ansatzpunkt">
            <div className={styles.sectionHead}>
              <div>
                <span className={styles.eyebrow}>
                  Ihr Anliegen ist der Anfang
                </span>
                <h2>
                  Was soll bei Ihnen
                  <br />
                  besser laufen?
                </h2>
                <p className={styles.sectionIntro}>
                  Wählen Sie Ihre Herausforderung. Sie erhalten einen passenden
                  Check und einen Plan, mit dem Sie direkt weiterarbeiten
                  können.
                </p>
              </div>
              <Link href="/werkzeuge" className={styles.textLink}>
                Alle Checks & Vorlagen{" "}
                <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
            </div>
            <ChallengeCards />
          </section>
        </div>
        <section
          className={`${styles.section} ${styles.tint}`}
          id="kundenreise"
        >
          <div className={styles.container}>
            <span className={styles.eyebrow}>Das Ganze im Blick</span>
            <h2>
              Aus einzelnen Kontakten
              <br />
              wird ein gemeinsamer Weg.
            </h2>
            <p className={styles.sectionIntro}>
              Wenn Website, Marketing, Vertrieb und Betreuung zusammenspielen,
              entstehen klare Übergaben. Daten bleiben nutzbar, Aufgaben haben
              einen Verantwortlichen und Ihr Team behält den Überblick.
            </p>
            <JourneyMap />
          </div>
        </section>
        <section
          className={`${styles.section} ${styles.pilotSection}`}
          id="pakete"
        >
          <div className={styles.container}>
            <div className={styles.sectionHead}>
              <div>
                <span className={styles.eyebrow}>
                  Drei Bereiche. Ein Partner.
                </span>
                <h2>
                  Neue Kunden gewinnen.
                  <br />
                  Den Alltag vereinfachen.
                </h2>
                <p className={styles.sectionIntro}>
                  Wir verbinden Marketing, Sales und Verwaltung zu einem
                  stimmigen Ablauf. Damit Ihr Team weniger organisieren muss und
                  mehr Zeit für Ihre Kunden hat.
                </p>
              </div>
              <Link className={styles.textLink} href="/pakete">
                Services im Detail <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
            </div>
            <PackageCards />
          </div>
        </section>
        <section className={`${styles.section} ${styles.tint}`}>
          <div className={styles.container}>
            <span className={styles.eyebrow}>Gemeinsam in die Umsetzung</span>
            <h2>Die Technik entwickelt sich. Ihr Team kommt mit.</h2>
            <p className={styles.sectionIntro}>
              Als Schweizer Partner begleiten wir Sie von der ersten Idee bis
              zum Betrieb. Wir verbinden Strategie, Systeme und Menschen, bauen
              auf Ihren vorhandenen Ressourcen auf und prüfen den Nutzen bei
              jedem Schritt.
            </p>
            <CollaborationSteps />
            <div className={styles.actions}>
              <Link href="/zusammenarbeit" className={styles.textLink}>
                So starten wir zusammen{" "}
                <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
        <div className={styles.container}>
          <DecisionGuides />
          <Careers />
          <section className={styles.section}>
            <span className={styles.eyebrow}>Gut zu wissen</span>
            <h2>Ihre Fragen, klar beantwortet.</h2>
            <JourneyFaqs />
            <JourneyCta />
          </section>
        </div>
      </main>
    </JourneyShell>
  )
}
