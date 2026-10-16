import Link from "next/link"
import { ArrowRight, ArrowUpRight, MoveUpRight } from "lucide-react"
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
                Schweizer Lösungen für Ihre digitale Zukunft
              </span>
              <h1>
                Digital verbunden.
                <br />
                Mit KI entlastet.
                <br />
                <em>Bereit für morgen.</em>
              </h1>
              <p className={styles.heroCopy}>
                Website, Marketing, Vertrieb und interne Abläufe: Wir bringen
                Ihr digitales Umfeld zusammen. Mit Schweizer Lösungen und KI,
                die Ihr Team Schritt für Schritt entlastet. Weniger Handarbeit
                und Abstimmung – mehr Freiraum für Kunden, Team und Wachstum.
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
