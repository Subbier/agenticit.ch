import Link from "next/link"
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  ChevronRight,
  ShieldCheck,
} from "lucide-react"
import { coreServices, type CoreService } from "@/lib/core-services"
import { breadcrumbJsonLd, faqPageJsonLd, serviceJsonLd } from "@/lib/seo"
import { JsonLd } from "@/components/site/json-ld"
import { JourneyShell } from "./shell"
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

export function CoreServicePage({ service }: { service: CoreService }) {
  const path = `/loesungen/${service.slug}`
  const guide = serviceGuides[service.slug]
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
      <main className={`${shared.container} ${styles.main}`}>
        <nav className={styles.breadcrumb} aria-label="Seitenpfad">
          <Link href="/pakete">Services</Link>
          <ChevronRight size={13} aria-hidden="true" />
          <span aria-current="page">{service.name}</span>
        </nav>

        <section className={styles.hero} aria-labelledby="service-title">
          <div className={styles.heroContent}>
            <span className={shared.eyebrow}>{service.eyebrow}</span>
            <h1 id="service-title">{service.headline}</h1>
            <p className={styles.lede}>{service.intro}</p>
            <div className={styles.actions}>
              <Link href={service.checkHref} className={shared.button}>
                {service.checkLabel}{" "}
                <ArrowUpRight size={17} aria-hidden="true" />
              </Link>
              <Link href="#beispiele" className={styles.quietLink}>
                Beispiele ansehen <ArrowDown size={16} aria-hidden="true" />
              </Link>
            </div>
            <p className={styles.note}>
              Unverbindlicher Check · Ergebnis direkt ansehen
            </p>
          </div>

          <aside
            className={styles.visual}
            aria-label="Beispiel eines möglichen Ablaufs"
          >
            <div className={styles.visualTop}>
              <span>{service.visualLabel}</span>
              <span className={styles.exampleLabel}>Beispiel</span>
            </div>
            <h2>{service.visualTitle}</h2>
            <ol className={styles.flow}>
              {service.visualSteps.map(([title, copy], index) => (
                <li key={title}>
                  <span className={styles.flowNumber} aria-hidden="true">
                    0{index + 1}
                  </span>
                  <div>
                    <strong>{title}</strong>
                    <p>{copy}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className={styles.visualFoot}>
              <ShieldCheck size={18} aria-hidden="true" />
              Ihr Team behält die Verantwortung.
            </div>
          </aside>
        </section>

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
            <h2 id="examples-title">So kann es bei Ihnen aussehen.</h2>
            <p>
              Diese Beispiele zeigen mögliche Einsätze. Was wir für Ihren
              Betrieb umsetzen, klären wir gemeinsam.
            </p>
          </div>
          <div className={styles.examples}>
            {service.examples.map(([title, copy], index) => (
              <article key={title}>
                <span className={styles.exampleNumber}>0{index + 1}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.process} aria-labelledby="process-title">
          <div className={styles.processHeading}>
            <span className={shared.eyebrow}>Ein klarer Weg</span>
            <h2 id="process-title">Gemeinsam gut umgesetzt.</h2>
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
            Umfang, Ergebnis, Kosten und Abnahme vereinbaren wir vor dem Start.
          </p>
        </section>

        <section className={styles.nextStep} aria-labelledby="next-step-title">
          <div>
            <span className={shared.eyebrow}>
              Ihr nächster sinnvoller Schritt
            </span>
            <h2 id="next-step-title">{service.magnetTitle}</h2>
            <p>{service.magnetCopy}</p>
            {guide ? (
              <Link className={styles.guideLink} href={guide.href}>
                {guide.label}
              </Link>
            ) : null}
            {service.slug === "revops-umsatzgenerierung" ? (
              <Link className={styles.guideLink} href="/crm-ablauf-check">
                Daten und Übergaben prüfen: Ihr CRM-Ablauf-Check
              </Link>
            ) : null}
          </div>
          <Link className={shared.button} href={service.checkHref}>
            {service.checkLabel} <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </section>

        <section className={styles.questions} aria-labelledby="questions-title">
          <div className={styles.sectionHeading}>
            <span className={shared.eyebrow}>Vor dem Start</span>
            <h2 id="questions-title">Ihre Fragen. Klar beantwortet.</h2>
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
      </main>
    </JourneyShell>
  )
}
