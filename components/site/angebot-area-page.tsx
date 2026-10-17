import { ArrowDown, ArrowUpRight } from "lucide-react"
import { JourneyShell } from "@/components/journey/shell"
import { JsonLd } from "./json-ld"
import { SupportingFaq } from "./supporting-page-parts"
import { OfferClosing, OfferFlow } from "./offer-page-parts"
import { ANGEBOT_AREAS, type AngebotArea } from "@/lib/angebot-content"
import { breadcrumbJsonLd, faqPageJsonLd, serviceJsonLd } from "@/lib/seo"
import shared from "@/components/journey/journey.module.css"
import ui from "@/components/journey/supporting-pages.module.css"
import styles from "@/components/journey/offer-pages.module.css"

export function AngebotAreaPage({ area }: { area: AngebotArea }) {
  return (
    <JourneyShell>
      <JsonLd
        data={[
          serviceJsonLd({
            name: area.meta.title,
            description: area.meta.description,
            path: "/" + area.slug,
          }),
          breadcrumbJsonLd([
            { name: "Startseite", path: "/" },
            { name: "Angebot", path: "/angebot" },
            { name: area.navLabel, path: "/" + area.slug },
          ]),
          faqPageJsonLd(area.faqs),
        ]}
      />
      <main className={[shared.container, ui.main, styles.page].join(" ")}>
        <nav className={ui.breadcrumb} aria-label="Seitenpfad">
          <a href="/">Startseite</a>
          <span aria-hidden="true">/</span>
          <a href="/angebot">Angebot</a>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{area.navLabel}</span>
        </nav>
        <section className={ui.hero} aria-labelledby="offer-title">
          <span className={shared.eyebrow}>{area.eyebrow}</span>
          <h1 id="offer-title">{area.name}</h1>
          <p className={ui.lead}>{area.tagline}</p>
          <div className={[ui.actions, styles.actions].join(" ")}>
            <a href={area.check.href} className={shared.button}>
              {area.check.label}
              <ArrowUpRight size={17} aria-hidden="true" />
            </a>
            <a href="#details" className={ui.textLink}>
              Aufgaben ansehen
              <ArrowDown size={16} aria-hidden="true" />
            </a>
          </div>
        </section>
        <section
          id="details"
          className={ui.section}
          aria-labelledby="tasks-title"
        >
          <div className={ui.heading}>
            <span className={shared.eyebrow}>Passend zu Ihrem Alltag</span>
            <h2 id="tasks-title">Wobei wir Sie unterstützen.</h2>
            <p>{area.nutzen}</p>
          </div>
          <ul className={styles.tasks} data-offer-tasks="true">
            {area.services.map((service, index) => (
              <li className={ui.card} key={service.lead}>
                <span className={ui.number}>0{index + 1}</span>
                <h3>{service.lead}</h3>
                <strong className={ui.subtitle}>{service.short}</strong>
                <p>{service.long}</p>
              </li>
            ))}
          </ul>
        </section>
        <OfferFlow steps={area.flow} />
        <section className={ui.section} aria-labelledby="evaluation-title">
          <div className={ui.heading}>
            <span className={shared.eyebrow}>Klarer Massstab</span>
            <h2 id="evaluation-title">Was wir gemeinsam prüfen.</h2>
            <p>
              Ausgangslage und Abnahme gehören zum vereinbarten Umfang. Die
              Wirkung beurteilen wir anhand Ihres Ablaufs und der tatsächlichen
              Ergebnisse.
            </p>
          </div>
          <ul className={styles.evaluation}>
            {area.evaluation.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <nav
            className={styles.detailsLinks}
            aria-label="Passende Leistungen und Hilfen"
          >
            {area.related.map((link) => (
              <a href={link.href} className={ui.textLink} key={link.href}>
                {link.label}
                <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            ))}
          </nav>
        </section>
        <SupportingFaq faqs={area.faqs} />
        <OfferClosing check={area.check} />
        <nav className={styles.detailsLinks} aria-label="Weitere Aufgaben">
          <a href="/angebot" className={ui.textLink}>
            Angebot im Überblick
            <ArrowUpRight size={15} aria-hidden="true" />
          </a>
          {ANGEBOT_AREAS.filter((other) => other.key !== area.key).map(
            (other) => (
              <a
                href={"/" + other.slug}
                className={ui.textLink}
                key={other.key}
              >
                {other.navLabel}
                <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            ),
          )}
        </nav>
      </main>
    </JourneyShell>
  )
}
