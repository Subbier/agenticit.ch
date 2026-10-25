import { JourneyShell } from "@/components/journey/shell"
import { ChallengeCards, JourneyCta } from "@/components/journey/sections"
import { WorksheetLibrary } from "@/components/journey/worksheet-library"
import { BranchenRadar } from "@/components/site/branchen-radar"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { createPageMetadata } from "@/lib/seo"
import styles from "@/components/journey/journey.module.css"

export const metadata = createPageMetadata({
  title: "Kostenlose Checks und Vorlagen für KMU",
  description:
    "Checks für Marketing, Anfragen, CRM und Automatisierung. Finden Sie konkrete nächste Schritte und direkt nutzbare Vorlagen für Ihr Team.",
  path: "/werkzeuge",
})

export default function Page() {
  return (
    <JourneyShell>
      <main id="main-content" tabIndex={-1}>
        <div className={styles.container}>
          <div className={styles.pageHero}>
            <span className={styles.eyebrow}>
              Eine Frage. Eine passende Hilfe.
            </span>
            <h1 style={{ fontSize: "clamp(28px, 4vw, 42px)" }}>
              Was könnten Sie gewinnen?
            </h1>
            <p>
              Mehr Umsatz. Mehr freie Zeit. Ihr passender Webauftritt. Ein Klick
              öffnet Ihre Entscheidungshilfe. Ihr persönliches Ergebnis als PDF.
            </p>
          </div>
          <section
            className={styles.checkArea}
            aria-label="Checks und Vorlagen"
          >
            <ChallengeCards />
            <WorksheetLibrary />
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
            <p>
              Ihr Kundenziel steht schon? Mit der{" "}
              <Link
                href="/potenzial"
                style={{
                  textDecoration: "underline",
                  textUnderlineOffset: 4,
                  display: "inline-flex",
                  alignItems: "center",
                  minHeight: 50,
                }}
              >
                Anfragenplanung
              </Link>{" "}
              rechnen Sie aus, wie viele passende Anfragen Sie dafür benötigen.
            </p>
            <p>
              Sie planen einen neuen Webauftritt?{" "}
              <Link
                className={styles.textLink}
                href="/blog/webdesign-kosten-schweiz#offertenvergleich"
              >
                Website-Offerten vergleichen{" "}
                <ArrowUpRight size={16} aria-hidden="true" />
              </Link>{" "}
              – mit Ihren eigenen Beträgen und einem speicherbaren Ergebnis.
            </p>
          </div>
        </div>
        <BranchenRadar />
      </main>
    </JourneyShell>
  )
}
