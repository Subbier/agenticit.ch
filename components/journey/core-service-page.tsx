import Link from "next/link"
import type { ReactNode } from "react"
import { ArrowDown, ArrowUpRight, Check, ChevronRight } from "lucide-react"
import { coreServices, type CoreService } from "@/lib/core-services"
import { decisionGuides } from "@/lib/decision-guides"
import { breadcrumbJsonLd, faqPageJsonLd, serviceJsonLd } from "@/lib/seo"
import { JsonLd } from "@/components/site/json-ld"
import { JourneyShell } from "./shell"
import { WebdesignCheck } from "./webdesign-check"
import { PotentialCheck } from "./potential-check"
import { MobileReadMore } from "./mobile-read-more"
import type { PotentialKind } from "@/lib/potential-report"
import shared from "./journey.module.css"
import styles from "./core-service-page.module.css"

const serviceGuides: Partial<
  Record<CoreService["slug"], { href: string; label: string }>
> = {
  "ki-entwicklung": {
    href: "/blog/eigene-ki-agenten-vs-chatgpt",
    label: "ChatGPT oder eigener Agent? Entscheidungshilfe lesen",
  },
  webdesign: {
    href: "/blog/website-briefing-vorlage",
    label: "Website planen: Briefing und Vorlage ansehen",
  },
  prozessautomatisierung: {
    href: "/blog/prozessautomatisierung-kmu-leitfaden",
    label: "Welche Aufgabe zuerst? Leitfaden lesen",
  },
  "gtm-markteintritt": {
    href: "/blog/neukundengewinnung-kmu-schweiz",
    label: "Neukundengewinnung planen: Leitfaden und Vorlage",
  },
  "revops-umsatzgenerierung": {
    href: "/blog/ki-automatisierung-vertrieb",
    label: "Von der Anfrage ins CRM: Leitfaden und Prüfplan",
  },
}

export function CoreServicePage({
  service,
  example,
}: {
  service: CoreService
  example?: { title: string; intro: string; content: ReactNode }
}) {
  const inlineMagnets: Record<
    CoreService["slug"],
    { kind: PotentialKind; intro: string }
  > = {
    "ki-entwicklung": {
      kind: "admin",
      intro:
        "Weniger Routinearbeit. Mehr Zeit für Ihr Geschäft. Finden Sie heraus, welchen Wert eine passende KI-Lösung für Sie haben könnte.",
    },
    webdesign: {
      kind: "acquisition",
      intro:
        "Ihre neue Website soll zu Ihrem Geschäft passen. Wählen Sie in fünf kurzen Fragen, was Sie sich wünschen – mit Bildern statt Fachbegriffen.",
    },
    prozessautomatisierung: {
      kind: "admin",
      intro:
        "Wie viel Handarbeit könnten Sie sich sparen? Berechnen Sie Ihre mögliche Zeitersparnis in Stunden und Franken.",
    },
    "gtm-markteintritt": {
      kind: "acquisition",
      intro:
        "Mehr Wunschkunden erreichen. Berechnen Sie, was zusätzliche Anfragen für Ihren Umsatz bedeuten könnten.",
    },
    "revops-umsatzgenerierung": {
      kind: "conversion",
      intro:
        "Mehr Abschlüsse aus Ihren bestehenden Anfragen. Berechnen Sie direkt Ihren möglichen Mehrumsatz.",
    },
  }
  const magnet = inlineMagnets[service.slug]
  const path = `/loesungen/${service.slug}`
  const guide = serviceGuides[service.slug]
  const decisionGuide = decisionGuides.find(
    (item) => item.serviceSlug === service.slug,
  )
  return (
    <JourneyShell>
      <JsonLd
        data={[
          serviceJsonLd({
            name: service.name,
            description: service.description,
            path,
          }),
          breadcrumbJsonLd([
            { name: "Startseite", path: "/" },
            { name: "Services", path: "/pakete" },
            { name: service.name, path },
          ]),
          faqPageJsonLd([...service.faqs]),
        ]}
      />
      <main
        id="main-content"
        tabIndex={-1}
        className={`${shared.container} ${styles.main}`}
      >
        <nav className={styles.breadcrumb} aria-label="Seitenpfad">
          <Link href="/pakete">Services</Link>
          <ChevronRight size={13} aria-hidden="true" />
          <span aria-current="page">{service.name}</span>
        </nav>

        <section
          className={`${styles.hero} ${styles.webdesignHero}`}
          aria-labelledby="service-title"
        >
          <div className={styles.heroContent}>
            <span className={shared.eyebrow}>{service.eyebrow}</span>
            <h1 id="service-title">{service.headline}</h1>
            <p className={styles.lede}>{magnet.intro}</p>
            <div className={styles.actions}>
              <a href="#potenzial-rechner" className={shared.button}>
                {service.slug === "webdesign"
                  ? "Meine Website planen"
                  : "Potenzial berechnen"}{" "}
                <ArrowUpRight size={17} aria-hidden="true" />
              </a>
              <a href="#beispiele" className={styles.quietLink}>
                Beispiele ansehen <ArrowDown size={16} aria-hidden="true" />
              </a>
            </div>
            <p className={styles.note}>
              Kostenlos · Persönliches PDF nach Ihren Kontaktdaten
            </p>
          </div>

          <section
            id="potenzial-rechner"
            className={styles.calculator}
            data-inline-lead-magnet="true"
            aria-label={
              service.slug === "webdesign"
                ? "Ihr Website-Kompass"
                : "Ihr persönlicher Potenzialrechner"
            }
          >
            {service.slug === "webdesign" ? (
              <WebdesignCheck />
            ) : (
              <PotentialCheck initialKind={magnet.kind} embedded />
            )}
          </section>
        </section>

        <MobileReadMore>
          <p className={styles.serviceDetailIntro}>{service.intro}</p>
          <section className={styles.outcomes} aria-labelledby="outcomes-title">
            <div className={styles.sectionHeading}>
              <span className={shared.eyebrow}>Wobei wir Sie unterstützen</span>
              <h2 id="outcomes-title">{service.resultTitle}</h2>
              <p>{service.resultCopy}</p>
            </div>
            <ul className={styles.benefits}>
              {service.benefits.map(([title, copy]) => (
                <li key={title}>
                  <Check size={19} aria-hidden="true" />
                  <div>
                    <h3>{title}</h3>
                    <p>{copy}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section
            className={styles.section}
            id="beispiele"
            aria-labelledby="examples-title"
          >
            <div className={styles.sectionHeading}>
              <span className={shared.eyebrow}>Von der Idee in den Alltag</span>
              <h2 id="examples-title">
                {example?.title ?? "Welche Einsätze sind möglich?"}
              </h2>
              <p>
                {example?.intro ??
                  "Diese Beispiele zeigen mögliche Einsätze. Was wir für Ihren Betrieb umsetzen, klären wir gemeinsam."}
              </p>
            </div>
            {example ? (
              example.content
            ) : (
              <div className={styles.examples}>
                {service.examples.map(([title, copy], index) => (
                  <article key={title}>
                    <span className={styles.exampleNumber}>0{index + 1}</span>
                    <h3>{title}</h3>
                    <p>{copy}</p>
                  </article>
                ))}
              </div>
            )}
          </section>

          <section className={styles.process} aria-labelledby="process-title">
            <div className={styles.processHeading}>
              <span className={shared.eyebrow}>Ein klarer Weg</span>
              <h2 id="process-title">
                Wie setzen wir Ihr Vorhaben gemeinsam um?
              </h2>
              <p>{service.processIntro}</p>
            </div>
            <ol>
              {service.steps.map(([title, copy], index) => (
                <li key={title}>
                  <span>0{index + 1}</span>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </li>
              ))}
            </ol>
            <p className={styles.processNote}>
              Umfang, Ergebnis, Kosten und Abnahme vereinbaren wir vor dem
              Start.
            </p>
          </section>

          <section
            className={styles.nextStep}
            aria-labelledby="next-step-title"
          >
            <div>
              <span className={shared.eyebrow}>
                Ihr nächster sinnvoller Schritt
              </span>
              <h2 id="next-step-title">
                {service.slug === "webdesign"
                  ? "Ihre Website. Ihr persönliches Konzept."
                  : "Ihre Zahlen. Ihr persönliches Ergebnis."}
              </h2>
              <p>
                {service.slug === "webdesign"
                  ? "Entdecken Sie die passende Website-Art, Seitenstruktur und Gestaltung. Ihr persönliches Konzept nehmen Sie als PDF mit."
                  : "Nutzen Sie den Rechner direkt auf dieser Seite. Ihr persönliches PDF zeigt Ihnen den möglichen Mehrwert pro Monat und Jahr."}
              </p>
              {guide ? (
                <Link className={styles.guideLink} href={guide.href}>
                  {guide.label}
                </Link>
              ) : null}
              {decisionGuide ? (
                <div>
                  <Link
                    className={styles.guideLink}
                    href={`/blog/${decisionGuide.slug}`}
                  >
                    {decisionGuide.linkLabel}
                  </Link>
                </div>
              ) : null}
              {service.slug === "revops-umsatzgenerierung" ? (
                <div>
                  <Link className={styles.guideLink} href="/crm-ablauf-check">
                    Zeitgewinn berechnen: Ihr CRM-Potenzial
                  </Link>
                </div>
              ) : null}
            </div>
            <a className={shared.button} href="#potenzial-rechner">
              {service.slug === "webdesign"
                ? "Zum Website-Kompass"
                : "Zum Rechner"}{" "}
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </section>

          {service.slug === "ki-entwicklung" ? (
            <nav
              className={styles.related}
              aria-label="KI-Technologie verstehen"
            >
              <span>Technologie verstehen</span>
              <Link href="/technologie">KI-Technologie im Überblick</Link>
              <Link href="/technologie/autonome-ki-agenten">
                So arbeiten KI-Agenten
              </Link>
              <Link href="/technologie/multi-agenten-systeme">
                Wenn mehrere Agenten zusammenarbeiten
              </Link>
              <Link href="/technologie/enterprise-integration">
                KI mit Ihren Systemen verbinden
              </Link>
            </nav>
          ) : null}

          <section
            className={styles.questions}
            aria-labelledby="questions-title"
          >
            <div className={styles.sectionHeading}>
              <span className={shared.eyebrow}>Vor dem Start</span>
              <h2 id="questions-title">
                Was möchten Sie vor dem Start wissen?
              </h2>
              <p>
                Sie haben ein konkretes Anliegen?{" "}
                <Link href="/kontakt">Sprechen wir darüber.</Link>
              </p>
            </div>
            <div className={styles.faqs}>
              {service.faqs.map((faq) => (
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

          <nav className={styles.related} aria-label="Weitere Leistungen">
            <span>Was noch dazugehört</span>
            {coreServices
              .filter((item) => item.slug !== service.slug)
              .map((item) => (
                <Link key={item.slug} href={`/loesungen/${item.slug}`}>
                  {item.name} <ArrowUpRight size={16} aria-hidden="true" />
                </Link>
              ))}
          </nav>

        </MobileReadMore>
      </main>
    </JourneyShell>
  )
}
