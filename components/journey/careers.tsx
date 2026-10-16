import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { KARRIERE_JOBS } from "@/lib/karriere-content"
import styles from "./journey.module.css"

export function Careers() {
  return (
    <section
      className={styles.section}
      id="karriere"
      aria-labelledby="careers-title"
    >
      <div className={styles.sectionHead}>
        <div>
          <span className={styles.eyebrow}>Arbeiten bei AgenticIT</span>
          <h2 id="careers-title">Wir suchen Verstärkung.</h2>
          <p className={styles.sectionIntro}>
            Bringen Sie Marketing, Vertrieb und Technologie mit uns voran.
            Entdecken Sie unsere offenen Stellen und die Lehrstelle 2027 in
            Bern.
          </p>
        </div>
        <Link href="/karriere#bewerbung" className={styles.textLink}>
          Zur Bewerbung <ArrowUpRight size={16} aria-hidden="true" />
        </Link>
      </div>
      <div className={styles.careerList}>
        {KARRIERE_JOBS.map((job) => (
          <Link
            key={job.slug}
            href={`/karriere/${job.slug}`}
            className={styles.careerRow}
          >
            <div>
              <span className={styles.careerTag}>{job.tagLabel}</span>
              <h3>{job.title}</h3>
              <p>
                {job.pensum} · {job.setup}
              </p>
            </div>
            <ArrowUpRight size={22} aria-hidden="true" />
          </Link>
        ))}
      </div>
    </section>
  )
}
