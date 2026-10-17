import { ArrowDown, ArrowUpRight, Check } from "lucide-react"
import { JourneyShell } from "@/components/journey/shell"
import { JsonLd } from "./json-ld"
import { SupportingFaq } from "./supporting-page-parts"
import { OfferClosing, OfferFlow } from "./offer-page-parts"
import {
  ANGEBOT_AREAS,
  offerOverview,
  offerServiceLinks,
} from "@/lib/angebot-content"
import { packages } from "@/lib/journey"
import { absoluteUrl, breadcrumbJsonLd, faqPageJsonLd } from "@/lib/seo"
import shared from "@/components/journey/journey.module.css"
import ui from "@/components/journey/supporting-pages.module.css"
import styles from "@/components/journey/offer-pages.module.css"

const check = { href: "/kundenreise-check", label: "Passenden Einstieg finden" }
const steps = [
  {
    title: "Marketing",
    text: "Ihr Angebot wird verständlich. Website, Inhalte und Kampagnen führen zur passenden Anfrage.",
  },
  {
    title: "Sales",
    text: "Anliegen und Herkunft kommen mit. Das zuständige Team führt die Anfrage zum vereinbarten nächsten Schritt.",
  },
  {
    title: "Verwaltung",
    text: "Unterlagen, Aufgaben und Termine werden weitergeführt. Ihr Team begleitet den Kunden mit dem vorhandenen Wissen.",
  },
]

export function AngebotPage() {
  return (
    <JourneyShell>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: offerOverview.title,
            description: offerOverview.description,
            url: absoluteUrl("/angebot"),
            dateModified: "2026-10-17",
            inLanguage: "de-CH",
            hasPart: ANGEBOT_AREAS.map((area) => ({
              "@type": "WebPage",
              name: area.navLabel,
              url: absoluteUrl("/" + area.slug),
            })),
          },
          breadcrumbJsonLd([
            { name: "Startseite", path: "/" },
            { name: "Angebot", path: "/angebot" },
          ]),
          faqPageJsonLd(offerOverview.faqs),
        ]}
      />
      <main
        id="main-content"
        tabIndex={-1}
        className={[shared.container, ui.main, styles.page].join(" ")}
      >
        <nav className={ui.breadcrumb} aria-label="Seitenpfad">
          <a href="/">Startseite</a>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Angebot</span>
        </nav>
        <section className={ui.hero} aria-labelledby="offer-title">
          <span className={shared.eyebrow}>Marketing · Sales · Verwaltung</span>
          <h1 id="offer-title">{offerOverview.h1}</h1>
          <p className={ui.lead}>{offerOverview.lead}</p>
          <div className={[ui.actions, styles.actions].join(" ")}>
            <a href={check.href} className={shared.button}>
              {check.label}
              <ArrowUpRight size={17} aria-hidden="true" />
            </a>
            <a href="#bereiche" className={ui.textLink}>
              Services ansehen
              <ArrowDown size={16} aria-hidden="true" />
            </a>
          </div>
        </section>
        <section
          id="bereiche"
          className={ui.section}
          aria-labelledby="areas-title"
        >
          <div className={ui.heading}>
            <span className={shared.eyebrow}>
              Drei Bereiche. Ein Ansprechpartner.
            </span>
            <h2 id="areas-title">Was soll bei Ihnen einfacher werden?</h2>
            <p>
              Wir planen den passenden Service und berücksichtigen, was davor
              und danach passiert. Bestehende Tools und Ihr Team beziehen wir
              ein.
            </p>
          </div>
          <div className={ui.grid}>
            {packages.map((service) => (
              <article className={ui.card} key={service.id}>
                <span className={ui.number}>{service.number}</span>
                <h3>{service.title}</h3>
                <strong className={ui.subtitle}>{service.short}</strong>
                <p>{service.scope}</p>
                <ul>
                  {service.items.map((item) => (
                    <li key={item}>
                      <Check size={16} aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className={ui.cardActions}>
                  <a
                    href={offerServiceLinks[service.id].href}
                    className={[ui.cardAction, styles.checkLink].join(" ")}
                  >
                    {offerServiceLinks[service.id].label}
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>
        <OfferFlow steps={steps} />
        <section
          id="aufgaben"
          className={ui.section}
          aria-labelledby="tasks-title"
        >
          <div className={ui.heading}>
            <span className={shared.eyebrow}>Ihr Anliegen vertiefen</span>
            <h2 id="tasks-title">Mit der Aufgabe zum passenden Check.</h2>
            <p>
              Ob vor der ersten Anfrage oder in der laufenden Betreuung: Wählen
              Sie, wo Sie ansetzen möchten.
            </p>
          </div>
          <div className={styles.tasks}>
            {ANGEBOT_AREAS.map((area) => (
              <article className={ui.card} key={area.key}>
                <span className={shared.eyebrow}>{area.eyebrow}</span>
                <h3>{area.navLabel}</h3>
                <p>{area.nutzen}</p>
                <a
                  href={"/" + area.slug}
                  className={[ui.textLink, styles.checkLink].join(" ")}
                >
                  Aufgabe ansehen
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              </article>
            ))}
          </div>
        </section>
        <SupportingFaq faqs={offerOverview.faqs} />
        <OfferClosing check={check} />
      </main>
    </JourneyShell>
  )
}
