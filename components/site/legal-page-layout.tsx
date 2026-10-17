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
                className={legal.section}
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
                  <ul>
                    {section.links.map((link) => (
                      <li key={link.href}>
                        <a href={link.href}>{link.label}</a>
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
