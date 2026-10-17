import { ArrowDown, ArrowUpRight, Check, ChevronRight } from "lucide-react"
import { JsonLd } from "@/components/site/json-ld"
import { CtaContactForm } from "@/components/site/cta-contact-form"
import { breadcrumbJsonLd, faqPageJsonLd, serviceJsonLd } from "@/lib/seo"
import {
  industryImplementation,
  type IndustryFocus,
} from "@/lib/industry-focus"
import { relatedIndustries } from "@/lib/industry-sectors"
import { JourneyShell } from "./shell"
import shared from "./journey.module.css"
import ui from "./core-service-page.module.css"
import styles from "./industry-focus.module.css"

export function IndustryFocusPage({
  focus,
  showCallback = false,
}: {
  focus: IndustryFocus
  showCallback?: boolean
}) {
  const path = `/branchen/${focus.slug}`
  return (
    <JourneyShell>
      <JsonLd
        data={[
          serviceJsonLd({
            name: focus.title,
            description: focus.description,
            path,
          }),
          breadcrumbJsonLd([
            { name: "Startseite", path: "/" },
            { name: "Branchen", path: "/branchen" },
            { name: focus.label, path },
          ]),
          faqPageJsonLd([...focus.faqs]),
        ]}
      />
      <main
        id="main-content"
        tabIndex={-1}
        className={`${shared.container} ${ui.main} ${styles.main}`}
      >
        <nav
          className={`${ui.breadcrumb} ${styles.breadcrumb}`}
          aria-label="Seitenpfad"
        >
          <a href="/branchen">Branchen</a>
          <ChevronRight size={13} aria-hidden="true" />
          <span aria-current="page">{focus.label}</span>
        </nav>
        <section className={ui.hero} aria-labelledby="industry-title">
          <div className={ui.heroContent}>
            <span className={shared.eyebrow}>{focus.label}</span>
            <h1 id="industry-title">{focus.headline}</h1>
            <p className={ui.lede}>{focus.intro}</p>
            <div className={`${ui.actions} ${styles.actions}`}>
              <a className={shared.button} href={focus.checkHref}>
                {focus.checkLabel}
                <ArrowUpRight size={17} aria-hidden="true" />
              </a>
              <a href="#bereiche" className={ui.quietLink}>
                Möglichkeiten ansehen
                <ArrowDown size={16} aria-hidden="true" />
              </a>
            </div>
            <p className={ui.note}>{focus.audience}</p>
          </div>
          <aside
            className={ui.visual}
            aria-label="Beispiel eines möglichen Ablaufs"
          >
            <div className={ui.visualTop}>
              <span>Vom Anliegen zum nächsten Schritt</span>
              <span className={ui.exampleLabel}>Beispiel</span>
            </div>
            <h2>Ein Anliegen. Ein klarer Weg.</h2>
            <ol className={ui.flow}>
              {focus.flow.map(([title, copy], index) => (
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
              Die fachliche Verantwortung bleibt bei Ihrem Team.
            </div>
          </aside>
        </section>
        <section
          id="bereiche"
          className={ui.section}
          aria-labelledby="areas-title"
        >
          <div className={ui.sectionHeading}>
            <span className={shared.eyebrow}>Wobei wir Sie unterstützen</span>
            <h2 id="areas-title">Drei Bereiche. Ein verbundener Ablauf.</h2>
            <p>
              Das sind mögliche Bausteine für Ihren Betrieb. Wir wählen
              gemeinsam, was zu Ihrem Anliegen und Ihren vorhandenen Systemen
              passt.
            </p>
          </div>
          <div className={styles.areaCards}>
            {focus.areas.map((area) => (
              <article key={area.name}>
                <h3>{area.name}</h3>
                <p>{area.copy}</p>
                <ul>
                  {area.items.map((item) => (
                    <li key={item}>
                      <Check size={16} aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <a href={area.href}>
                  {area.name} im Detail
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              </article>
            ))}
          </div>
        </section>
        <section className={ui.process} aria-labelledby="implementation-title">
          <div className={ui.processHeading}>
            <span className={shared.eyebrow}>Mit Ihrem Team umgesetzt</span>
            <h2 id="implementation-title">
              Vom heutigen Ablauf in den Alltag.
            </h2>
            <p>
              Wir richten die Lösung auf Ihre Arbeit aus und führen Ihr Team an
              den konkreten Aufgaben ein. Kundenorientierte Assistenten stellen
              sich als KI vor. Ausgehende Sales-Nachrichten benötigen eine
              menschliche Freigabe vor dem Versand.
            </p>
          </div>
          <ol>
            {industryImplementation.map(([title, copy], index) => (
              <li key={title}>
                <span>0{index + 1}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </li>
            ))}
          </ol>
          <p className={ui.processNote}>
            Umfang, Ergebnis, Kosten und Abnahme vereinbaren wir vor dem Start.
          </p>
        </section>
        <section className={ui.nextStep} aria-labelledby="industry-check-title">
          <div>
            <span className={shared.eyebrow}>Ein nützlicher Einstieg</span>
            <h2 id="industry-check-title">{focus.checkTitle}</h2>
            <p>{focus.checkCopy}</p>
          </div>
          <a
            href={focus.checkHref}
            className={`${shared.button} ${styles.checkLink}`}
          >
            {focus.checkLabel}
            <ArrowUpRight size={18} aria-hidden="true" />
          </a>
        </section>
        <section className={ui.questions} aria-labelledby="industry-faq-title">
          <div className={ui.sectionHeading}>
            <span className={shared.eyebrow}>Vor dem Start</span>
            <h2 id="industry-faq-title">Ihre Fragen. Klar beantwortet.</h2>
            <p>
              Sie haben einen konkreten Ablauf im Blick?{" "}
              <a href="/kontakt">Sprechen wir darüber.</a>
            </p>
          </div>
          <div className={ui.faqs}>
            {focus.faqs.map((faq) => (
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
        <nav
          className={`${ui.related} ${styles.related}`}
          aria-label="Weitere Branchen"
        >
          <span>Weitere Orientierung</span>
          {relatedIndustries(focus).map((item) => (
            <a key={item.slug} href={`/branchen/${item.slug}`}>
              {item.label}
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          ))}
          <a href="/branchen">
            Alle Branchen
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </nav>
        {showCallback && (
          <section
            id="kontakt"
            className={styles.contact}
            aria-labelledby="callback-title"
          >
            <div>
              <span className={shared.eyebrow}>Persönlich weiterdenken</span>
              <h2 id="callback-title">
                Welchen Ablauf möchten Sie vereinfachen?
              </h2>
              <p>
                Erzählen Sie uns von Ihrem Betrieb. Wir besprechen, welcher
                nächste Schritt zu Ihrem Team und Ihren vorhandenen Tools passt.
              </p>
              <p className={shared.fine}>
                Persönliche Rückmeldung · Keine Verpflichtung
              </p>
            </div>
            <CtaContactForm pagePath={path} />
          </section>
        )}
      </main>
    </JourneyShell>
  )
}
