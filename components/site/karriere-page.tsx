import Link from "next/link"
import { ArrowDown, ArrowUpRight, Code2, Target, Workflow } from "lucide-react"
import { CareerApplication } from "@/components/journey/career-application"
import { JourneyShell } from "@/components/journey/shell"
import { KARRIERE_JOBS } from "@/lib/karriere-content"
import styles from "@/components/journey/journey.module.css"
import career from "@/components/journey/careers.module.css"

const WORK_AREAS = [
  { title: "Strategie", text: "Marketing & Sales voranbringen", icon: Target },
  { title: "Systeme", text: "Prozesse mit KI verbinden", icon: Workflow },
  { title: "Software", text: "Lösungen für den Alltag bauen", icon: Code2 },
]

export function KarrierePage() {
  return (
    <JourneyShell>
      <main id="main-content" tabIndex={-1}>
        <div className={styles.container}>
          <section className={career.hero} aria-labelledby="career-title">
            <div className={career.heroContent}>
              <span className={styles.eyebrow}>Arbeiten bei AgenticIT</span>
              <h1 id="career-title">
                Bauen Sie mit uns, was Unternehmen <em>weiterbringt.</em>
              </h1>
              <p>
                Marketing, Sales und KI: Wir machen daraus Lösungen, die im
                Alltag helfen. Bringen Sie Ihre Ideen ein und gestalten Sie
                digitale Abläufe für Schweizer Unternehmen mit.
              </p>
              <div className={career.actions}>
                <a href="#stellen" className={styles.button}>
                  Offene Stellen ansehen{" "}
                  <ArrowDown size={17} aria-hidden="true" />
                </a>
                <a href="#bewerbung" className={styles.textLink}>
                  Direkt bewerben <ArrowUpRight size={17} aria-hidden="true" />
                </a>
              </div>
            </div>
            <div className={career.stage}>
              <div className={career.stageTop}>
                <span>Raum für Ihre Ideen</span>
                <span>Bern · Hybrid</span>
              </div>
              <p className={career.stageTitle}>
                Zukunft gestalten.
                <br />
                <span>Im echten Alltag.</span>
              </p>
              <div className={career.workAreas}>
                {WORK_AREAS.map(({ title, text, icon: Icon }, index) => (
                  <div className={career.workArea} key={title}>
                    <span className={career.areaIcon}>
                      <Icon size={22} strokeWidth={1.5} aria-hidden="true" />
                    </span>
                    <div>
                      <strong>{title}</strong>
                      <span>{text}</span>
                    </div>
                    <span className={career.areaNumber}>0{index + 1}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
          <section
            id="stellen"
            className={`${styles.section} ${career.openings}`}
            aria-labelledby="openings-title"
          >
            <div className={styles.sectionHead}>
              <div>
                <span className={styles.eyebrow}>Ihre Möglichkeiten</span>
                <h2 id="openings-title">Finden Sie Ihren Platz bei uns.</h2>
              </div>
              <span className={career.openCount}>
                {KARRIERE_JOBS.length} offene Stellen
              </span>
            </div>
            <div className={career.jobList}>
              {KARRIERE_JOBS.map((job, index) => (
                <Link
                  key={job.slug}
                  id={job.slug}
                  href={`/karriere/${job.slug}`}
                  className={career.jobCard}
                >
                  <span className={career.jobNumber}>0{index + 1}</span>
                  <div>
                    <span className={styles.careerTag}>{job.tagLabel}</span>
                    <h3>{job.title}</h3>
                    <p>
                      {job.pensum} · {job.setup}
                    </p>
                  </div>
                  <span className={career.jobArrow}>
                    <ArrowUpRight size={23} aria-hidden="true" />
                  </span>
                </Link>
              ))}
            </div>
          </section>
          <section
            className={career.benefits}
            aria-label="Was uns als Arbeitgeber ausmacht"
          >
            <div>
              <span>01 / Mitgestalten</span>
              <h2>Ihre Ideen zählen.</h2>
              <p>
                Kurze Wege und klare Entscheidungen. Sie übernehmen
                Verantwortung und bringen Projekte selbst voran.
              </p>
            </div>
            <div>
              <span>02 / Weiterkommen</span>
              <h2>Neue Werkzeuge. Echte Praxis.</h2>
              <p>
                Arbeiten Sie mit aktuellen KI- und Cloud-Technologien an
                Aufgaben, die für unsere Kunden etwas bewegen.
              </p>
            </div>
            <div>
              <span>03 / Zusammenarbeiten</span>
              <h2>In Bern. Und nah am Kunden.</h2>
              <p>
                Persönlicher Austausch im Team, hybride Zusammenarbeit und
                Projekte für Unternehmen in der Schweiz.
              </p>
            </div>
          </section>
        </div>
        <CareerApplication />
      </main>
    </JourneyShell>
  )
}
