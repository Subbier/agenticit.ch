import { JourneyShell } from "@/components/journey/shell"
import { JourneyCta } from "@/components/journey/sections"
import { createPageMetadata } from "@/lib/seo"
import styles from "@/components/journey/journey.module.css"

export const metadata = createPageMetadata({
  title: "So starten wir Ihre digitale Kundenreise",
  description:
    "Vom Diagnosegespräch über den begrenzten Pilot bis zur Übergabe oder Betreuung. Klare Verantwortlichkeiten, menschliche Freigaben und nachvollziehbare Ergebnisse.",
  path: "/zusammenarbeit",
})

const steps = [
  [
    "01",
    "Ihr Anliegen verstehen",
    "Wir gehen einen echten Vorgang durch: Was löst ihn aus, wer bearbeitet ihn und wo bleibt etwas liegen? Bestehende Systeme und bisherige Versuche gehören dazu.",
    "Ergebnis: ein bestätigter Bedarf und eine verantwortliche Person.",
  ],
  [
    "02",
    "Den Test eingrenzen",
    "Wir vereinbaren genau einen Ablauf, die nötigen Übergaben, Umfang, Preis und Fremdkosten. Ausgangslage und Kriterien für die Abnahme stehen vor dem Start fest.",
    "Ergebnis: ein konkreter Auftrag mit verständlichen Grenzen.",
  ],
  [
    "03",
    "Den Kundenstart vorbereiten",
    "Verkauf und Umsetzung übergeben dieselben Zusagen. Im Kick-off klären wir Ansprechpartner, benötigte Unterlagen, sichere Zugänge und den ersten Arbeitsschritt.",
    "Ergebnis: vollständige Startvoraussetzungen und ein gemeinsamer Ablauf.",
  ],
  [
    "04",
    "Mit Ihrem Team erproben",
    "Wir richten den vereinbarten Prozess ein und prüfen Normalfall, Fehlerfall und menschliche Übernahme. Schlüsselanwender erhalten eine Einweisung. Bei kundenorientierter KI ist erkennbar, mit wem man spricht.",
    "Ergebnis: ein geprüfter Ablauf und eine nachvollziehbare Messung.",
  ],
  [
    "05",
    "Ergebnis und nächsten Schritt entscheiden",
    "Wir besprechen Wirkung, Aufwand und Grenzen. Sie entscheiden über Abschluss und Übergabe, eine gezielte Anpassung oder eine separat vereinbarte Betreuung.",
    "Ergebnis: eine fundierte Entscheidung über die Zusammenarbeit.",
  ],
]

export default function Page() {
  return (
    <JourneyShell>
      <main className={styles.container}>
        <div className={styles.pageHero}>
          <span className={styles.eyebrow}>Von der Idee in Ihren Alltag</span>
          <h1>
            Ein Partner fürs Ganze.
            <br />
            Schritt für Schritt weiter.
          </h1>
          <p>
            Wir begleiten Ihr Unternehmen aus der Schweiz in die digitale
            Zukunft. Website, Systeme, Kommunikation und interne Abläufe denken
            wir zusammen. KI kommt dort zum Einsatz, wo sie Ihr Team entlastet –
            mit einem klaren Fahrplan und einem Ansprechpartner.
          </p>
        </div>
        <section
          className={`${styles.checkArea} ${styles.wideContent}`}
          aria-label="Ablauf der Zusammenarbeit"
        >
          <div className={styles.fullSteps}>
            {steps.map(([number, title, text, outcome]) => (
              <article className={styles.fullStep} key={number}>
                <span>{number}</span>
                <div>
                  <h2>{title}</h2>
                  <p>{text}</p>
                  <small>{outcome}</small>
                </div>
              </article>
            ))}
          </div>
        </section>
        <section className={styles.section}>
          <span className={styles.eyebrow}>Business und Technologie</span>
          <h2>Ein Gesamtplan. Gemeinsam umgesetzt.</h2>
          <div className={styles.team}>
            <article>
              <h3>Business und Zusammenarbeit</h3>
              <p>
                Wir klären Ziele, Prioritäten und wirtschaftlichen Nutzen.
                Bestehende Ressourcen werden einbezogen; Aufwand und Budget
                bleiben im Blick.
              </p>
            </article>
            <article>
              <h3>Technologie und Umsetzung</h3>
              <p>
                Wir verbinden Systeme und vereinfachen Abläufe. Datenwege,
                Zugriffe und menschliche Verantwortung klären wir bei jedem
                Schritt – von Entwicklung und Test bis zur Einweisung und
                Betreuung.
              </p>
            </article>
          </div>
          <JourneyCta />
        </section>
      </main>
    </JourneyShell>
  )
}
