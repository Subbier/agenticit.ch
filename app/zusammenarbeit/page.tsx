import { JourneyShell } from "@/components/journey/shell"
import { createPageMetadata, faqPageJsonLd } from "@/lib/seo"
import { JsonLd } from "@/components/site/json-ld"
import { ArrowUpRight, Download } from "lucide-react"
import {
  projectStartFaqs,
  projectStartResource,
  projectStartStages,
} from "@/lib/project-start"
import layout from "@/components/journey/collaboration.module.css"
import styles from "@/components/journey/journey.module.css"
import Link from "next/link"
import { company } from "@/lib/company"

export const metadata = createPageMetadata({
  title: "Zusammenarbeit: Vom Projektstart bis zur Übergabe",
  description:
    "Ihr Projekt mit AgenticIT: Ziel, Auftrag, Einrichtung, Abnahme und Betreuung klar vereinbaren. Mit einer frei nutzbaren Vorlage für Ihren Projektstart.",
  path: "/zusammenarbeit",
})

export default function Page() {
  return (
    <JourneyShell>
      <JsonLd data={[faqPageJsonLd([...projectStartFaqs])]} />
      <main className={styles.container}>
        <div className={styles.pageHero}>
          <span className={styles.eyebrow}>So arbeiten wir zusammen</span>
          <h1>
            Ein Ziel.
            <br />
            Ein klarer Start.
          </h1>
          <p>
            Sie bringen die Aufgabe aus Ihrem Alltag mit. Wir verbinden
            Marketing, Sales und digitale Abläufe zu einem umsetzbaren Vorhaben.
            Gemeinsam klären wir Ergebnis, Aufwand und Verantwortung – damit Ihr
            Team weiss, was passiert und wie es danach weitergeht.
          </p>
          <div className={styles.actions}>
            <Link className={styles.button} href="/kontakt">
              Projekt besprechen <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
            <a
              className={styles.textLink}
              href={projectStartResource.downloadHref}
              download={projectStartResource.filename}
            >
              Startvorlage mitnehmen <Download size={17} aria-hidden="true" />
            </a>
          </div>
        </div>
        <section
          className={`${styles.checkArea} ${styles.wideContent}`}
          aria-labelledby="project-process"
        >
          <h2 className={layout.processTitle} id="project-process">
            Von der Aufgabe in den Alltag.
          </h2>
          <ol className={layout.steps}>
            {projectStartStages.map((stage, index) => (
              <li className={layout.step} key={stage.id}>
                <span aria-hidden="true">0{index + 1}</span>
                <div>
                  <h3>{stage.title}</h3>
                  <p>{stage.summary}</p>
                  <p className={layout.gate}>{stage.gate}</p>
                  <details className={layout.details}>
                    <summary>Was wir dafür klären</summary>
                    <ul>
                      {stage.checklist.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </details>
                </div>
              </li>
            ))}
          </ol>
        </section>
        <section
          className={layout.startPlan}
          id="startplan"
          aria-labelledby="startplan-title"
        >
          <span className={styles.eyebrow}>Direkt für Ihr Team nutzbar</span>
          <h2 id="startplan-title">Ihr gemeinsamer Projektstart-Plan.</h2>
          <p>
            Ein ausfüllbarer Plan für Ziel, Umfang, Zuständigkeiten, Zugänge und
            Abnahme. Mit Platz für offene Punkte und den späteren Betrieb.
            Nutzen Sie ihn im Team oder bringen Sie ihn zum Gespräch mit.
          </p>
          <div className={styles.actions}>
            <a
              className={styles.button}
              href={projectStartResource.downloadHref}
              download={projectStartResource.filename}
            >
              Startplan speichern (.txt){" "}
              <Download size={17} aria-hidden="true" />
            </a>
            <a className={layout.fileView} href={projectStartResource.href}>
              Vorlage im Browser ansehen{" "}
              <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          </div>
          <p className={layout.note}>
            Ohne Registrierung. Keine Passwörter oder Kundendaten eintragen.
          </p>
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
              <a className={styles.textLink} href="/sicherheit">
                So klären wir Datenwege und Freigaben ↗
              </a>
            </article>
          </div>
          <aside
            className={styles.companyFacts}
            aria-label="Firmenangaben und Mitgliedschaft"
          >
            <div>
              <h3>{company.legalName}</h3>
              <p>
                {company.address.streetAddress} · {company.address.postalCode}{" "}
                {company.address.addressLocality}
                <br />
                UID: {company.uid}
              </p>
            </div>
            <div>
              <a className={styles.textLink} href={company.registerUrl}>
                Firmenangaben bei Zefix ↗
              </a>
              <a className={styles.textLink} href={company.swico.directoryUrl}>
                Mitglied im Swico-Verzeichnis ↗
              </a>
              <Link className={styles.textLink} href="/kontakt">
                Kontakt aufnehmen ↗
              </Link>
            </div>
          </aside>
          <p>
            <Link className={styles.textLink} href="/case-studies">
              Einblick: So haben wir unsere eigene Website aufgebaut
            </Link>
          </p>
          <div className={styles.cta}>
            <div>
              <h2>Welches Vorhaben steht bei Ihnen an?</h2>
              <p>
                Bringen Sie Ihre Aufgabe oder einen Check-Plan mit. Wir klären
                den nächsten Schritt persönlich.
              </p>
            </div>
            <Link className={styles.button} href="/kontakt">
              Projekt besprechen <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </section>
        <section
          className={`${styles.section} ${styles.wideContent}`}
          aria-labelledby="collaboration-faq"
        >
          <span className={styles.eyebrow}>Vor dem ersten Schritt</span>
          <h2 id="collaboration-faq">Kurz geklärt.</h2>
          <div className={styles.faqList}>
            {projectStartFaqs.map((faq) => (
              <details className={styles.faq} key={faq.question}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>
      </main>
    </JourneyShell>
  )
}
