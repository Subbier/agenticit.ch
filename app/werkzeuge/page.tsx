import { JourneyShell } from "@/components/journey/shell"
import { ChallengeCards, JourneyCta } from "@/components/journey/sections"
import { BranchenRadar } from "@/components/site/branchen-radar"
import { createPageMetadata } from "@/lib/seo"
import styles from "@/components/journey/journey.module.css"

export const metadata = createPageMetadata({
  title: "Kostenlose Checks und Vorlagen für Ihre Kundenreise",
  description:
    "Marketing-Setup-Check, Automatisierungs-Check und Vorlagen für Ihre Kundenreise. Finden Sie eine direkt nutzbare Hilfe für Ihre Herausforderung.",
  path: "/werkzeuge",
})

export default function Page() {
  return (
    <JourneyShell>
      <main>
        <div className={styles.container}>
          <div className={styles.pageHero}>
            <span className={styles.eyebrow}>
              Eine Frage. Eine passende Hilfe.
            </span>
            <h1>
              Etwas mitnehmen,
              <br />
              das Sie weiterbringt.
            </h1>
            <p>
              Unsere Checks verbinden Ihre Antworten mit konkreten Schritten und
              einer Vorlage. Kostenlos, direkt sichtbar und speicherbar. Sie
              entscheiden, ob Sie danach mit uns sprechen möchten.
            </p>
          </div>
          <section
            className={styles.checkArea}
            aria-label="Checks und Vorlagen"
          >
            <ChallengeCards />
            <JourneyCta />
          </section>
          <div className={styles.toolArchive}>
            <span className={styles.eyebrow}>Zusätzliche Orientierung</span>
            <h2 style={{ fontSize: 30, margin: "15px 0" }}>
              Wie sieht die Online-Nachfrage aus?
            </h2>
            <p>
              Der bestehende Branchen-Radar zeigt eine datierte Momentaufnahme
              für ausgewählte Branchen. Datenstand und Schätzungen stehen direkt
              beim Tool; daraus folgt keine Zusage künftiger Anfragen.
            </p>
          </div>
        </div>
        <BranchenRadar />
      </main>
    </JourneyShell>
  )
}
