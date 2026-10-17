import { ArrowDown, ArrowUpRight, ChevronRight } from "lucide-react"
import { JourneyShell } from "@/components/journey/shell"
import { websiteCase } from "@/lib/website-case"
import {
  calculateAcquisitionPlan,
  formatPlanningNumber,
} from "@/lib/acquisition-planner"
import { caseStudyFaqs } from "@/lib/seo-faqs"
import shared from "@/components/journey/journey.module.css"
import ui from "@/components/journey/core-service-page.module.css"
import styles from "@/components/journey/website-case.module.css"

export function CaseStudiesPage() {
  const example = calculateAcquisitionPlan(websiteCase.exampleInput)
  if (!example || example.handlingMinutes === null)
    throw new Error("The website case needs a valid planning example")
  const input = example.input
  const minutesPerInquiry = websiteCase.exampleInput.handlingMinutes
  const fmt = formatPlanningNumber
  return (
    <JourneyShell>
      <main className={`${shared.container} ${ui.main} ${styles.page}`}>
        <nav className={ui.breadcrumb} aria-label="Seitenpfad">
          <a href="/">Startseite</a>
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
            <div className={`${ui.actions} ${styles.heroActions}`}>
              <a href="/potenzial" className={shared.button}>
                Mit eigenen Zahlen planen
                <ArrowUpRight size={17} aria-hidden="true" />
              </a>
              <a href="#results" className={ui.quietLink}>
                Passenden Check finden
                <ArrowDown size={15} aria-hidden="true" />
              </a>
            </div>
            <p className={ui.note}>
              Prüfstand: <time dateTime="2026-10-17">17. Oktober 2026</time>
            </p>
          </div>
          <aside
            className={ui.visual}
            aria-label="Beispiel aus der Anfragenplanung"
          >
            <div className={ui.visualTop}>
              <span>Beispiel · Anfragenplanung</span>
              <span className={ui.exampleLabel}>Annahmen</span>
            </div>
            <h2>Vom Kundenziel zum Zeitbedarf.</h2>
            <dl className={styles.exampleInputs}>
              <div>
                <dt>Ziel pro Monat</dt>
                <dd>{fmt(input.monthlyCustomers)} Neukunden</dd>
              </div>
              <div>
                <dt>Abschlussquote</dt>
                <dd>{fmt(input.closeRate)} %</dd>
              </div>
              <div>
                <dt>Je Anfrage</dt>
                <dd>{fmt(minutesPerInquiry)} Minuten</dd>
              </div>
            </dl>
            <dl className={styles.exampleResults}>
              <div>
                <dt>Passende Anfragen</dt>
                <dd>
                  <strong>{fmt(example.requiredInquiries)}</strong>
                  <span>im Planungsmonat</span>
                </dd>
              </div>
              <div>
                <dt>Zeitbedarf</dt>
                <dd>
                  <strong>{fmt(example.handlingMinutes / 60)}</strong>
                  <span>Stunden Bearbeitung</span>
                </dd>
              </div>
            </dl>
            <details className={styles.calculation}>
              <summary>
                Rechenweg ansehen{" "}
                <span className={styles.toggle} aria-hidden="true" />
              </summary>
              <p>
                {fmt(input.monthlyCustomers)} × 100 ÷ {fmt(input.closeRate)} ={" "}
                {fmt(example.requiredInquiries)} passende Anfragen.
              </p>
              <p>
                {fmt(example.requiredInquiries)} × {fmt(minutesPerInquiry)} ={" "}
                {fmt(example.handlingMinutes)} Minuten, also{" "}
                {fmt(example.handlingMinutes / 60)} Stunden geplanter
                Bearbeitungsaufwand.
              </p>
            </details>
            <p className={styles.exampleNote}>
              Frei gewählte Planungswerte für einen Beispielmonat.
            </p>
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
              Marketing, Sales und Verwaltung greifen im Betrieb ineinander. Auf
              der Website soll trotzdem verständlich sein, wo Besucher mit ihrem
              konkreten Anliegen beginnen können. Dafür führen die
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
            {websiteCase.tools.map((check) => (
              <article key={check.href}>
                <span>{check.name}</span>
                <h3>{check.question}</h3>
                <p>{check.copy}</p>
                <a href={check.href}>
                  {check.label}
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
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
              Geprüft sind Bedienung, Eingaben, Ergebnislogik und
              Erreichbarkeit. Ergebnis und freiwilliger Kontakt sind getrennte
              Schritte.
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
                  <span className={styles.toggle} aria-hidden="true" />
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
          <a
            className={`${shared.button} ${styles.finalAction}`}
            href="/kundenreise-check"
          >
            Check starten
            <ArrowUpRight size={17} aria-hidden="true" />
          </a>
        </section>
        <nav className={ui.related} aria-label="Weiterführende Informationen">
          <span>Mehr zum Vorgehen</span>
          <a href="/zusammenarbeit">
            So arbeiten wir
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
          <a href="/pakete">
            Services im Überblick
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </nav>
      </main>
    </JourneyShell>
  )
}
