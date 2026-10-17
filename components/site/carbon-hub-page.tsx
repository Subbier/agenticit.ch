import { notFound } from "next/navigation"
import { ArrowDown, ArrowUpRight, Check } from "lucide-react"
import { JourneyShell } from "@/components/journey/shell"
import { JsonLd } from "./json-ld"
import { SupportingFaq } from "./supporting-page-parts"
import { PAGES } from "@/lib/page-content"
import { absoluteUrl, breadcrumbJsonLd, faqPageJsonLd } from "@/lib/seo"
import shared from "@/components/journey/journey.module.css"
import styles from "@/components/journey/supporting-pages.module.css"

export function CarbonHubPage({ slug }: { slug: string }) {
  const page = PAGES[slug]
  if (!page || !page.check || !page.faqs) notFound()
  const check = page.check
  const links = [
    ...page.features.flatMap((f) =>
      f.href ? [{ href: f.href, label: f.title }] : [],
    ),
    ...(page.links ?? []),
  ]
  return (
    <JourneyShell>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": page.schemaType ?? "CollectionPage",
            name: page.meta.title,
            description: page.meta.description,
            url: absoluteUrl("/" + slug),
            inLanguage: "de-CH",
            ...(page.sources
              ? { citation: page.sources.map((source) => source.href) }
              : {}),
            ...(page.schemaType === "WebPage"
              ? {}
              : {
                  hasPart: links.map((link) => ({
                    "@type": "WebPage",
                    name: link.label,
                    url: absoluteUrl(link.href),
                  })),
                }),
          },
          breadcrumbJsonLd([
            { name: "Startseite", path: "/" },
            { name: page.eyebrow, path: "/" + slug },
          ]),
          faqPageJsonLd(page.faqs),
        ]}
      />
      <main
        id="main-content"
        tabIndex={-1}
        className={[shared.container, styles.main].join(" ")}
      >
        <nav className={styles.breadcrumb} aria-label="Seitenpfad">
          <a href="/">Startseite</a>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{page.eyebrow}</span>
        </nav>
        <section className={styles.hero} aria-labelledby="hub-title">
          <span className={shared.eyebrow}>{page.eyebrow}</span>
          <h1 id="hub-title">{page.h1}</h1>
          <p className={styles.lead}>{page.lead}</p>
          <div className={styles.actions}>
            <a href={check.href} className={shared.button}>
              {check.label}
              <ArrowUpRight size={17} aria-hidden="true" />
            </a>
            <a href="#bereiche" className={styles.textLink}>
              Bereiche ansehen
              <ArrowDown size={16} aria-hidden="true" />
            </a>
          </div>
        </section>
        <section
          id="bereiche"
          className={styles.section}
          aria-labelledby="areas-title"
        >
          <div className={styles.heading}>
            <span className={shared.eyebrow}>Passend zu Ihrem Alltag</span>
            <h2 id="areas-title">{page.introTitle}</h2>
            <p>{page.introText}</p>
          </div>
          <div className={styles.grid}>
            {page.features.map((feature, index) => (
              <article className={styles.card} key={feature.title}>
                <span className={styles.number}>0{index + 1}</span>
                <h3>{feature.title}</h3>
                <strong className={styles.subtitle}>{feature.subtitle}</strong>
                <p>{feature.text}</p>
                <ul>
                  {feature.bullets.map((bullet) => (
                    <li key={bullet}>
                      <Check size={16} aria-hidden="true" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
                <div className={styles.cardActions}>
                  {feature.href ? (
                    <a className={styles.textLink} href={feature.href}>
                      Service ansehen
                      <ArrowUpRight size={15} aria-hidden="true" />
                    </a>
                  ) : null}
                  {feature.check ? (
                    <a href={feature.check.href} className={styles.cardAction}>
                      {feature.check.label}
                      <ArrowUpRight size={16} aria-hidden="true" />
                    </a>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
          {page.links?.length ? (
            <nav
              aria-label="Weiterführende Informationen"
              className={styles.extraLinks}
            >
              {page.links.map((link) => (
                <a href={link.href} className={styles.textLink} key={link.href}>
                  {link.label}
                  <ArrowUpRight size={15} aria-hidden="true" />
                </a>
              ))}
            </nav>
          ) : null}
        </section>
        <section
          id="kontakt"
          className={styles.banner}
          aria-labelledby="next-title"
        >
          <div>
            <span className={shared.eyebrow}>Ihr nächster Schritt</span>
            <h2 id="next-title">{page.closingTitle}</h2>
            <p>{page.closingText}</p>
          </div>
          <div className={styles.bannerActions}>
            <a href={check.href} className={shared.button}>
              {check.label}
              <ArrowUpRight size={17} aria-hidden="true" />
            </a>
            <a href="/kontakt" className={styles.textLink}>
              Direkt Kontakt aufnehmen
              <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          </div>
        </section>
        <SupportingFaq faqs={page.faqs} />
        {page.sources?.length ? (
          <details className={styles.sources}>
            <summary>Fachliche Grundlagen</summary>
            <p>
              Diese Quellen erläutern den Umgang mit KI, Informationen und
              Befugnissen. Welche Schritte Ihr Vorhaben braucht, klären wir
              anhand des konkreten Ablaufs.
            </p>
            <ul>
              {page.sources.map((source) => (
                <li key={source.href}>
                  <a className={styles.textLink} href={source.href}>
                    {source.label}
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </details>
        ) : null}
      </main>
    </JourneyShell>
  )
}
