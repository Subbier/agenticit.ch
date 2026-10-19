import Link from "next/link"
import { JourneyShell } from "@/components/journey/shell"
import type { LegalSectionContent } from "@/lib/legal-types"
import styles from "@/components/journey/journey.module.css"
import legal from "@/components/journey/legal.module.css"

type LegalPageLayoutProps = {
  title: string
  intro: string
  sections: readonly LegalSectionContent[]
}

export function LegalPageLayout({
  title,
  intro,
  sections,
}: LegalPageLayoutProps) {
  return (
    <JourneyShell>
      <main id="main-content" tabIndex={-1} className={styles.container}>
        <div className={legal.hero}>
          <span className={styles.eyebrow}>AgenticIT · Rechtliches</span>
          <h1>{title}</h1>
          <p>{intro}</p>
        </div>
        <div className={legal.layout}>
          <nav
            className={`${legal.navigation} ${legal.desktopNavigation}`}
            aria-label={`${title}: Inhalt`}
          >
            <strong>Auf dieser Seite</strong>
            <ol>
              {sections.map((section, index) => (
                <li key={section.title}>
                  <a href={`#abschnitt-${index + 1}`}>{section.title}</a>
                </li>
              ))}
            </ol>
          </nav>
          <details className={`${legal.navigation} ${legal.mobileNavigation}`}>
            <summary>Auf dieser Seite</summary>
            <nav aria-label={`${title}: Inhalt auf dem Handy`}>
              <ol>
                {sections.map((section, index) => (
                  <li key={section.title}>
                    <a href={`#abschnitt-${index + 1}`}>{section.title}</a>
                  </li>
                ))}
              </ol>
            </nav>
          </details>
          <div className={legal.sections}>
            {sections.map((section, index) => (
              <section
                key={section.title}
                id={`abschnitt-${index + 1}`}
                className={`${legal.section} ${section.compact ? legal.compact : ""}`}
                data-legal-compact={section.compact || undefined}
                aria-labelledby={`titel-${index + 1}`}
              >
                <h2 id={`titel-${index + 1}`}>{section.title}</h2>
                {section.paragraphs?.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.list ? (
                  <ul>
                    {section.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
                {section.links ? (
                  <ul className={legal.links} data-legal-links="true">
                    {section.links.map((link) => (
                      <li key={link.href}>
                        <a href={link.href}>
                          {link.href ===
                          "https://www.linkedin.com/in/rastoder" ? (
                            <svg
                              data-brand="linkedin"
                              className={legal.linkedin}
                              aria-hidden="true"
                              viewBox="0 0 24 24"
                              width="20"
                              height="20"
                              fill="currentColor"
                            >
                              <path d="M20.45 2H3.55C2.69 2 2 2.68 2 3.52v16.96c0 .84.69 1.52 1.55 1.52h16.9c.86 0 1.55-.68 1.55-1.52V3.52c0-.84-.69-1.52-1.55-1.52ZM7.93 18.75H4.98V9.2h2.95v9.55ZM6.45 7.89a1.71 1.71 0 1 1 0-3.42 1.71 1.71 0 0 1 0 3.42Zm12.3 10.86H15.8V14.1c0-1.11-.02-2.54-1.55-2.54-1.55 0-1.79 1.21-1.79 2.46v4.73H9.51V9.2h2.83v1.3h.04c.39-.74 1.36-1.52 2.79-1.52 2.98 0 3.58 1.96 3.58 4.5v5.27Z" />
                            </svg>
                          ) : null}
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : null}
                {section.extra ? <p>{section.extra}</p> : null}
              </section>
            ))}
            <Link href="/" className={`${styles.textLink} ${legal.back}`}>
              ← Zur Startseite
            </Link>
          </div>
        </div>
      </main>
    </JourneyShell>
  )
}
