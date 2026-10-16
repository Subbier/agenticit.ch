import Link from "next/link"
import { ArrowRight, ArrowUpRight, Check, MoveUpRight } from "lucide-react"
import { JourneyShell } from "./shell"
import {
  ChallengeCards,
  CollaborationSteps,
  JourneyCta,
  JourneyFaqs,
  PackageCards,
} from "./sections"
import { JourneyMap } from "./journey-map"
import styles from "./journey.module.css"

const path = [
  ["Sichtbar werden", "Dort, wo Ihre Zielgruppe sucht"],
  ["Interesse wecken", "Mit einer Hilfe, die weiterbringt"],
  ["Gespräche führen", "Gut vorbereitet und persönlich"],
  ["Kunden starten", "Mit klaren nächsten Schritten"],
  ["Beziehungen stärken", "Über den Abschluss hinaus"],
]

export function JourneyHome() {
  return (
    <JourneyShell>
      <main>
        <div className={styles.container}>
          <section className={styles.hero}>
            <div>
              <span className={styles.eyebrow}>
                Für Unternehmen, die beraten und verkaufen
              </span>
              <h1>
                Kunden gewinnen.
                <br />
                Beziehungen stärken.
                <br />
                <em>Weiter wachsen.</em>
              </h1>
              <p className={styles.heroCopy}>
                Wir verbinden Marketing, Vertrieb und Kundenbetreuung. Mit
                passenden digitalen Abläufen und KI, die Ihrem Team Arbeit
                abnimmt und Menschen zusammenbringt.
              </p>
              <div className={styles.actions}>
                <Link href="/kundenreise-check" className={styles.button}>
                  Meinen Ansatzpunkt finden{" "}
                  <ArrowUpRight size={18} aria-hidden="true" />
                </Link>
                <a className={styles.textLink} href="#kundenreise">
                  So hängt es zusammen{" "}
                  <ArrowRight size={15} aria-hidden="true" />
                </a>
              </div>
              <p className={`${styles.fine} ${styles.heroFine}`}>
                Kostenloser Check · Ergebnis sofort · Ohne E-Mail-Pflicht
              </p>
            </div>
            <div
              className={styles.journeyIllustration}
              aria-label="Ihre Kundenreise vom ersten Interesse bis zur Betreuung"
            >
              <div className={styles.illustrationTop}>
                <span>Ihre Kundenreise</span>
                <strong>Ein Weg. Viele Chancen.</strong>
              </div>
              <div className={styles.illustrationPath}>
                {path.map(([title, detail], index) => (
                  <div className={styles.pathRow} key={title}>
                    <span className={styles.pathNumber}>0{index + 1}</span>
                    <div>
                      <strong>{title}</strong>
                      <small>{detail}</small>
                    </div>
                  </div>
                ))}
              </div>
              <div className={styles.illustrationBottom}>
                <span>Gute Übergaben machen den Unterschied.</span>
                <MoveUpRight size={21} aria-hidden="true" />
              </div>
            </div>
          </section>
          <div className={styles.audience}>
            <strong>Für Teams mit persönlichem Kundenkontakt</strong>
            {["Beratung", "Telesales", "Aussendienst", "Kundenbetreuung"].map(
              (item) => (
                <span key={item}>
                  <Check size={13} aria-hidden="true" />
                  {item}
                </span>
              ),
            )}
          </div>
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
              Jeder Kontakt ist Teil
              <br />
              einer grösseren Beziehung.
            </h2>
            <p className={styles.sectionIntro}>
              Eine gute Anzeige allein genügt selten. Entscheidend ist, wie
              Menschen von einem Schritt zum nächsten kommen. Entdecken Sie, was
              wir verbinden.
            </p>
            <JourneyMap />
          </div>
        </section>
        <div className={styles.container}>
          <section className={styles.section} id="pakete">
            <div className={styles.sectionHead}>
              <div>
                <span className={styles.eyebrow}>
                  Klein starten. Konkret lernen.
                </span>
                <h2>
                  Ein klarer Test.
                  <br />
                  Eine fundierte Entscheidung.
                </h2>
                <p className={styles.sectionIntro}>
                  Wir beginnen mit einem abgegrenzten Prozess. So sehen Sie, was
                  die Lösung in Ihrem Alltag leistet, bevor Sie weiter ausbauen.
                </p>
              </div>
              <Link className={styles.textLink} href="/pakete">
                Pakete im Detail <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
            </div>
            <PackageCards />
          </section>
        </div>
        <section className={`${styles.section} ${styles.tint}`}>
          <div className={styles.container}>
            <span className={styles.eyebrow}>Gemeinsam in die Umsetzung</span>
            <h2>Ihr Team bleibt im Mittelpunkt.</h2>
            <p className={styles.sectionIntro}>
              Von der ersten Frage bis zum Betrieb: Wir verbinden die technische
              Umsetzung mit Ihrem Arbeitsalltag.
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
