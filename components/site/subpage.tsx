import { notFound } from "next/navigation"
import { ArrowUpRight, Download } from "lucide-react"
import { JourneyShell } from "@/components/journey/shell"
import { JsonLd } from "./json-ld"
import { SupportingFaq } from "./supporting-page-parts"
import { SUBPAGES, SUBPAGES_BY_PARENT } from "@/lib/subpage-content"
import { breadcrumbJsonLd, faqPageJsonLd, serviceJsonLd } from "@/lib/seo"
import shared from "@/components/journey/journey.module.css"
import styles from "@/components/journey/supporting-pages.module.css"

export function SubPage({ slug }: { slug: string }) {
  const page = SUBPAGES[slug]
  if (!page) notFound()
  const check = page.check ?? {
    href: "/kundenreise-check",
    label: "Passenden Einstieg finden",
  }
  const siblings = (SUBPAGES_BY_PARENT[page.parentSlug] ?? []).filter(
    (s) => s.slug !== slug,
  )
  return (
    <JourneyShell>
      <JsonLd
        data={[
          serviceJsonLd({
            name: page.navLabel,
            description: page.meta.description,
            path: "/" + slug,
          }),
          breadcrumbJsonLd([
            { name: "Startseite", path: "/" },
            { name: page.parentLabel, path: "/" + page.parentSlug },
            { name: page.navLabel, path: "/" + slug },
          ]),
          ...(page.faqs ? [faqPageJsonLd(page.faqs)] : []),
        ]}
      />
      <main className={[shared.container, styles.main].join(" ")}>
        <nav className={styles.breadcrumb} aria-label="Seitenpfad">
          <a href={"/" + page.parentSlug}>{page.parentLabel}</a>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{page.navLabel}</span>
        </nav>
        <section className={styles.hero} aria-labelledby="technology-title">
          <span className={shared.eyebrow}>
            {page.parentLabel} verständlich
          </span>
          <h1 id="technology-title">{page.problem.title}</h1>
          {page.problem.body.map((copy) => (
            <p className={styles.lead} key={copy}>
              {copy}
            </p>
          ))}
          <div className={styles.actions}>
            <a href={check.href} className={shared.button}>
              {check.label}
              <ArrowUpRight size={17} aria-hidden="true" />
            </a>
            <a href="/loesungen/ki-entwicklung" className={styles.textLink}>
              Umsetzung kennenlernen
              <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          </div>
        </section>
        <section className={styles.section} aria-labelledby="planning-title">
          <div className={styles.heading}>
            <span className={shared.eyebrow}>Vor der Einrichtung</span>
            <h2 id="planning-title">{page.agitate.title}</h2>
          </div>
          <div className={styles.grid}>
            {page.agitate.bullets.map((bullet, index) => (
              <article className={styles.card} key={bullet.lead}>
                <span className={styles.number}>0{index + 1}</span>
                <h3>{bullet.lead}</h3>
                <p>{bullet.text}</p>
              </article>
            ))}
          </div>
        </section>
        <section
          className={styles.section}
          aria-labelledby="implementation-title"
        >
          <div className={styles.heading}>
            <span className={shared.eyebrow}>So kann es funktionieren</span>
            <h2 id="implementation-title">{page.solution.title}</h2>
            {page.solution.intro.map((copy) => (
              <p key={copy}>{copy}</p>
            ))}
          </div>
          <div className={styles.implementation}>
            <ol className={styles.steps}>
              {page.solution.bullets.map((bullet, index) => (
                <li key={bullet.lead}>
                  <span className={styles.number}>0{index + 1}</span>
                  <div>
                    <h3>{bullet.lead}</h3>
                    <p>{bullet.text}</p>
                  </div>
                </li>
              ))}
            </ol>
            <aside className={styles.note}>
              <h3>{page.solution.easyTitle}</h3>
              <p>{page.solution.easyText}</p>
              <p>
                Umfang, Kosten, Abnahme und Betrieb vereinbaren wir vor dem
                Start.
              </p>
            </aside>
          </div>
        </section>
        {page.resource ? (
          <section className={styles.resource} aria-labelledby="resource-title">
            <div>
              <span className={shared.eyebrow}>
                Zum Ausfüllen und Besprechen
              </span>
              <h2 id="resource-title">{page.resource.title}</h2>
              <p>{page.resource.text}</p>
            </div>
            <div className={styles.resourceActions}>
              <a
                href={page.resource.href + "?download=1"}
                download={page.resource.href.split("/").at(-1)}
                className={styles.cardAction}
              >
                <Download size={18} aria-hidden="true" />
                {page.resource.label}
              </a>
              <a className={styles.textLink} href={page.resource.guideHref}>
                {page.resource.guideLabel}
                <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            </div>
          </section>
        ) : null}
        <section
          id="kontakt"
          className={styles.banner}
          aria-labelledby="next-title"
        >
          <div>
            <span className={shared.eyebrow}>Ihr nächster Schritt</span>
            <h2 id="next-title">{page.cta.title}</h2>
            <p>{page.cta.text}</p>
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
        {page.faqs ? <SupportingFaq faqs={page.faqs} /> : null}
        {page.sources?.length ? (
          <details className={styles.sources}>
            <summary>Fachliche Grundlagen</summary>
            <p>
              Architektur- und Sicherheitsprinzipien aus diesen Quellen; die
              Beispiele und Prüfschritte sind unsere Planungshilfe. Der
              Anthropic-Beitrag von 2024 beschreibt Grundmuster, keine aktuelle
              Werkzeugauswahl.
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
        {siblings.length ? (
          <nav className={styles.extraLinks} aria-label="Weitere Technikthemen">
            {siblings.map((sibling) => (
              <a
                className={styles.textLink}
                href={"/" + sibling.slug}
                key={sibling.slug}
              >
                {sibling.navLabel}
                <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            ))}
          </nav>
        ) : null}
      </main>
    </JourneyShell>
  )
}
