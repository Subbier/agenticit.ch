import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { decisionGuides } from "@/lib/decision-guides"
import styles from "./journey.module.css"

export function DecisionGuides() {
  return (
    <section className={styles.section} aria-labelledby="decision-guides-title">
      <div className={styles.sectionHead}>
        <div>
          <span className={styles.eyebrow}>Für Ihre nächste Entscheidung</span>
          <h2 id="decision-guides-title">Klarer sehen. Gezielt starten.</h2>
          <p className={styles.sectionIntro}>
            Konkrete Antworten und Vorlagen für Ihr Vorhaben. Direkt nutzbar,
            bevor Sie etwas beauftragen.
          </p>
        </div>
        <Link className={styles.textLink} href="/blog">
          Mehr Praxiswissen <ArrowUpRight size={16} aria-hidden="true" />
        </Link>
      </div>
      <div className={styles.challengeGrid}>
        {decisionGuides.map((guide) => (
          <Link
            className={styles.challengeCard}
            key={guide.slug}
            href={`/blog/${guide.slug}`}
          >
            <span className={styles.eyebrow}>{guide.topic}</span>
            <h3>{guide.title}</h3>
            <p>{guide.copy}</p>
            <span className={styles.cardBottom}>
              {guide.linkLabel} <ArrowUpRight size={17} aria-hidden="true" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}
