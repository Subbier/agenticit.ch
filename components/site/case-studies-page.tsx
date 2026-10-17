import Link from "next/link"
import { ArrowDown, ArrowUpRight, ChevronRight } from "lucide-react"
import { JourneyShell } from "@/components/journey/shell"
import { websiteCase } from "@/lib/website-case"
import { caseStudyFaqs } from "@/lib/seo-faqs"
import shared from "@/components/journey/journey.module.css"
import ui from "@/components/journey/core-service-page.module.css"
import styles from "@/components/journey/website-case.module.css"

export function CaseStudiesPage() {
  return (
    <JourneyShell>
      <main className={`${shared.container} ${ui.main}`}>
        <nav className={ui.breadcrumb} aria-label="Seitenpfad">
          <Link href="/">Startseite</Link>
          <ChevronRight size={13} aria-hidden="true" />
          <span aria-current="page">Praxisbeispiel</span>
        </nav>
        <section className={ui.hero} aria-labelledby="case-title">
          <div className={ui.heroContent}>
            <span className={shared.eyebrow}>
              Eigenes Projekt · AgenticIT Website
            </span>
            <h1 id="case-title">{websiteCase.title}</h1>
            <p className={ui.lede}>{websiteCase.intro}</p>
            <div className={ui.actions}>
              <a href="#results" className={shared.button}>
                Checks selbst ausprobieren
                <ArrowDown size={17} aria-hidden="true" />
              </a>
              <a href="#implementation" className={ui.quietLink}>
                Einblick in die Prüfung
              </a>
            </div>
            <p className={ui.note}>
              Prüfstand: <time dateTime="2026-10-17">17. Oktober 2026</time>
            </p>
          </div>
          <aside
            className={ui.visual}
            aria-label="Nutzerweg auf der AgenticIT Website"
          >
            <div className={ui.visualTop}>
              <span>Orientierung vor Kontakt</span>
              <span className={ui.exampleLabel}>Eigenes Projekt</span>
            </div>
            <h2>Ihr Anliegen gibt die Richtung vor.</h2>
            <ol className={ui.flow}>
              {websiteCase.flow.map(([title, copy], index) => (
                <li key={title}>
                  <span className={ui.flowNumber} aria-hidden="true">
                    0{index + 1}
                  </span>
                  <div>
                    <strong>{title}</strong>
                    <p>{copy}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className={ui.visualFoot}>
              Leistungen, Entscheidungshilfen und nächste Schritte sind
              miteinander verbunden.
            </div>
          </aside>
        </section>
        <section
          id="situation"
          className={ui.section}
          aria-labelledby="case-task-title"
        >
          <div className={ui.sectionHeading}>
            <span className={shared.eyebrow}>Die Aufgabe</span>
            <h2 id="case-task-title">
              Ein klarer Einstieg in ein breites Angebot.
            </h2>
            <p>
              Marketing, Sales und Administration greifen im Betrieb ineinander.
              Auf der Website soll trotzdem verständlich sein, wo Besucher mit
              ihrem konkreten Anliegen beginnen können. Dafür führen die
              Leistungsseiten zu passenden Checks und weiterführenden
              Informationen.
            </p>
          </div>
        </section>
        <section
          id="results"
          className={ui.section}
          aria-labelledby="case-checks-title"
        >
          <div className={ui.sectionHeading}>
            <span className={shared.eyebrow}>Direkt zugänglich</span>
            <h2 id="case-checks-title">
              Wählen Sie eine Frage aus Ihrem Alltag.
            </h2>
            <p>
              Probieren Sie die Entscheidungshilfen mit eigenen Angaben aus. Sie
              erhalten eine erste Einordnung und können danach selbst über den
              nächsten Schritt entscheiden.
            </p>
          </div>
          <div className={styles.checks}>
            {websiteCase.checks.map((check) => (
              <article key={check.href}>
                <span>{check.name}</span>
                <h3>{check.question}</h3>
                <p>{check.copy}</p>
                <Link href={check.href}>
                  {check.label}
                  <ArrowUpRight size={16} aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
        </section>
        <section
          id="implementation"
          className={ui.process}
          aria-labelledby="case-proof-title"
        >
          <div className={ui.processHeading}>
            <span className={shared.eyebrow}>Einblick in die Prüfung</span>
            <h2 id="case-proof-title">Der ganze Nutzerweg zählt.</h2>
            <p>
              Für diesen Einblick betrachten wir Bedienung, Ergebnislogik und
              Erreichbarkeit. Eingaben, Ergebnis und freiwilliger Kontakt sind
              getrennte Schritte.
            </p>
          </div>
          <div className={styles.verification}>
            {websiteCase.verification.map(([title, copy]) => (
              <article key={title}>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
          <p className={styles.limit}>
            Geschäftsergebnisse werden gesondert belegt: vom tatsächlichen
            Eingang einer Anfrage über die Qualifizierung und den Termin bis zum
            Auftrag. Dafür braucht es bestätigte Quellen und einen passenden
            Messzeitraum.
          </p>
        </section>
        <section className={ui.questions} aria-labelledby="case-faq-title">
          <div className={ui.sectionHeading}>
            <span className={shared.eyebrow}>Zum Einblick</span>
            <h2 id="case-faq-title">Was Sie hier nachvollziehen können.</h2>
          </div>
          <div className={ui.faqs}>
            {caseStudyFaqs.map((faq) => (
              <details key={faq.question}>
                <summary>
                  {faq.question}
                  <span aria-hidden="true">+</span>
                </summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>
        <section className={ui.nextStep} aria-labelledby="case-next-title">
          <div>
            <span className={shared.eyebrow}>Für Ihren Betrieb</span>
            <h2 id="case-next-title">Finden Sie Ihren Einstieg.</h2>
            <p>
              Welche Aufgabe möchten Sie verbessern? Unser Kundenreise-Check
              hilft, Ihr Anliegen einzuordnen. Die konkrete Umsetzung planen wir
              mit Ihrem Team.
            </p>
          </div>
          <Link className={shared.button} href="/kundenreise-check">
            Unverbindlichen Check starten
            <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
        </section>
        <nav className={ui.related} aria-label="Weiterführende Informationen">
          <span>Mehr zum Vorgehen</span>
          <Link href="/zusammenarbeit">
            So arbeiten wir
            <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
          <Link href="/pakete">
            Services im Überblick
            <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </nav>
      </main>
    </JourneyShell>
  )
}
