import Link from "next/link"
import {
  ArrowLeft,
  ArrowUpRight,
  CalendarDays,
  Clock3,
  MapPin,
} from "lucide-react"
import type { KarriereJob } from "@/lib/karriere-content"
import { CareerApplication } from "./career-application"
import { JourneyShell } from "./shell"
import styles from "./journey.module.css"
import career from "./careers.module.css"

export function CareerJob({ job }: { job: KarriereJob }) {
  return (
    <JourneyShell>
      <main>
        <div className={styles.container}>
          <div className={career.backLink}>
            <Link href="/karriere#stellen" className={styles.textLink}>
              <ArrowLeft size={16} aria-hidden="true" /> Alle offenen Stellen
            </Link>
          </div>
          <section className={career.detailHero} aria-labelledby="job-title">
            <div className={career.heroContent}>
              <span className={styles.eyebrow}>{job.tagLabel}</span>
              <h1 id="job-title">{job.title}</h1>
              <p>{job.teaser}</p>
            </div>
            <aside
              className={`${career.stage} ${career.jobFacts}`}
              aria-label="Die Stelle auf einen Blick"
            >
              <span className={career.factsHeading}>Auf einen Blick</span>
              <dl>
                <div>
                  <Clock3 size={19} aria-hidden="true" />
                  <dt>Pensum / Dauer</dt>
                  <dd>{job.pensum}</dd>
                </div>
                <div>
                  <MapPin size={19} aria-hidden="true" />
                  <dt>Arbeitsmodell</dt>
                  <dd>{job.setup}</dd>
                </div>
                <div>
                  <CalendarDays size={19} aria-hidden="true" />
                  <dt>Start</dt>
                  <dd>{job.start}</dd>
                </div>
              </dl>
              <Link href="#bewerbung" className={styles.button}>
                Für diese Stelle bewerben{" "}
                <ArrowUpRight size={17} aria-hidden="true" />
              </Link>
            </aside>
          </section>
          <div className={career.detailContent}>
            <section
              className={career.detailSection}
              aria-labelledby="tasks-title"
            >
              <span className={styles.eyebrow}>Ihre Aufgaben</span>
              <h2 id="tasks-title">{job.spielfeldTitle}</h2>
              <ul className={career.detailList}>
                {job.spielfeld.map((task) => (
                  <li key={task}>{task}</li>
                ))}
              </ul>
            </section>
            <section
              className={career.detailSection}
              aria-labelledby="skills-title"
            >
              <span className={styles.eyebrow}>Ihr Profil</span>
              <h2 id="skills-title">Was Sie mitbringen</h2>
              <ul className={career.detailList}>
                {job.mitbringst.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </section>
          </div>
          <section className={career.offer} aria-labelledby="offer-title">
            <div>
              <span className={`${styles.eyebrow} ${career.offerEyebrow}`}>
                Arbeiten bei AgenticIT
              </span>
              <h2 id="offer-title">Was wir Ihnen bieten.</h2>
              {job.badge === "ausbildung" ? (
                <span className={career.trainingBadge}>
                  Wir bilden aus · Informatik EFZ
                </span>
              ) : null}
            </div>
            <p>{job.bieten}</p>
          </section>
        </div>
        <CareerApplication key={job.slug} initialPosition={job.title} />
      </main>
    </JourneyShell>
  )
}
