import Link from "next/link"
import {
  ArrowUpRight,
  Network,
  Play,
  Target,
  TrendingUp,
  Workflow,
} from "lucide-react"
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

const services = [
  {
    icon: Target,
    title: "Marktstrategie",
    detail: "Zielgruppen, Angebote & Positionierung",
  },
  {
    icon: TrendingUp,
    title: "Umsatzmotor",
    detail: "Website, Marketing & Vertrieb",
  },
  {
    icon: Workflow,
    title: "Digital & KI",
    detail: "CRM, Telefonie & Automatisierung",
  },
]

export function JourneyHome() {
  return (
    <JourneyShell>
      <main>
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
                Wir verbinden Marketing und Vertrieb mit digitalen Abläufen. Von
                der Website über CRM und Telefonie bis zu KI-Automatisierungen:
                Wir wählen passende Tools, richten sie ein und halten Ihrem Team
                den Rücken frei.
              </p>
              <div className={styles.actions}>
                <Link href="/kundenreise-check" className={styles.button}>
                  Kostenlosen Check starten{" "}
                  <ArrowUpRight size={18} aria-hidden="true" />
                </Link>
                <a className={styles.textLink} href="#firmenvideo">
                  <Play size={15} aria-hidden="true" /> Video ansehen
                </a>
              </div>
              <p className={`${styles.fine} ${styles.heroFine}`}>
                Kostenloser Check · Ergebnis sofort · Ohne E-Mail-Pflicht
              </p>
            </div>
            <div
              className={styles.serviceIllustration}
              aria-label="AgenticIT verbindet Marktstrategie, Kundengewinnung und Digitalisierung für Ihr Unternehmen"
            >
              <span className={styles.serviceEyebrow}>
                Das verbinden wir für Sie
              </span>
              <div className={styles.serviceHub}>
                <Network size={30} aria-hidden="true" />
                <div>
                  <strong>AgenticIT</strong>
                  <span>Ein Partner für Ihr Unternehmen</span>
                </div>
              </div>
              <div className={styles.serviceBranches}>
                {services.map(({ icon: Icon, title, detail }) => (
                  <div className={styles.serviceNode} key={title}>
                    <Icon size={24} aria-hidden="true" />
                    <strong>{title}</strong>
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
              <div className={styles.serviceExamples}>
                <span>KI-Telefonie</span>
                <span>Digitales Fahrtenbuch</span>
                <span>Meetings → Aufgaben</span>
              </div>
              <p className={styles.serviceSupport}>
                Beratung · Einrichtung · Begleitung im Betrieb
              </p>
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
