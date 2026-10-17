import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { JourneyShell } from "@/components/journey/shell"
import { JsonLd } from "@/components/site/json-ld"
import { industryFocus } from "@/lib/industry-focus"
import { BRANCHEN_LPS } from "@/lib/branchen-content"
import { createPageMetadata, SITE_URL } from "@/lib/seo"
import shared from "@/components/journey/journey.module.css"
import ui from "@/components/journey/core-service-page.module.css"
import styles from "@/components/journey/industry-focus.module.css"

export const metadata = createPageMetadata({
  title: "Digitalisierung für Beratung, Broker und Vertriebsteams",
  description:
    "Marketing, Sales und Administration für beratende Schweizer KMU verbinden. Konkrete Abläufe für Beratung, Telesales und Aussendienst mit passenden Checks.",
  path: "/branchen",
})
const otherIndustries = BRANCHEN_LPS.filter(
  (item) => !industryFocus.some((focus) => focus.slug === item.slug),
)
const roles = [
  [
    "Beratung",
    "Unterlagen und Gesprächsvorbereitung verbinden. Vereinbarungen festhalten und den Kundenstart mit klaren nächsten Schritten organisieren.",
  ],
  [
    "Telesales",
    "Anfragen zuordnen, Gesprächsergebnisse im CRM dokumentieren und freigegebene nächste Kontakte mit dem zuständigen Team vorbereiten.",
  ],
  [
    "Aussendienst",
    "Termine vorbereitet übernehmen, Rückmeldungen gemeinsam nutzen und Fahrtendokumentation sowie Nacharbeit passend vereinfachen.",
  ],
] as const

export default function Page() {
  const items = [
    ...industryFocus,
    ...otherIndustries.map((item) => ({
      slug: item.slug,
      label: item.navLabel,
    })),
  ]
  return (
    <JourneyShell>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Branchen und Vertriebsteams",
            url: `${SITE_URL}/branchen`,
            mainEntity: {
              "@type": "ItemList",
              itemListElement: items.map((item, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: item.label,
                url: `${SITE_URL}/branchen/${item.slug}`,
              })),
            },
          },
        ]}
      />
      <main className={`${shared.container} ${ui.main}`}>
        <div className={shared.pageHero}>
          <span className={shared.eyebrow}>Branchen & Teams</span>
          <h1>
            Für Teams, die beraten
            <br />
            und Kunden gewinnen.
          </h1>
          <p>
            Wir verbinden Marketing, Sales und Administration für beratende und
            vertriebsorientierte KMU. Aus einzelnen Tools wird ein abgestimmter
            Ablauf – mit Ihrem Team und einem Partner für die Umsetzung.
          </p>
          <div className={ui.actions}>
            <Link href="/kundenreise-check" className={shared.button}>
              Ihren Einstieg finden
              <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
            <Link href="#branchen" className={ui.quietLink}>
              Passende Beispiele ansehen
            </Link>
          </div>
        </div>
        <section
          id="branchen"
          className={ui.section}
          aria-labelledby="focus-title"
        >
          <div className={ui.sectionHeading}>
            <span className={shared.eyebrow}>Ihr Alltag als Ausgangspunkt</span>
            <h2 id="focus-title">Wo Menschen im Mittelpunkt stehen.</h2>
            <p>
              Persönliche Beratung, viele Anfragen und wiederkehrende Arbeit:
              Hier zeigen wir, wie die drei Bereiche zusammenwirken können.
            </p>
          </div>
          <div className={styles.focusCards}>
            {industryFocus.map((focus) => (
              <Link key={focus.slug} href={`/branchen/${focus.slug}`}>
                <h3>{focus.label}</h3>
                <p>{focus.audience}</p>
                <span>
                  Möglichkeiten ansehen
                  <ArrowUpRight size={16} aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </section>
        <section className={ui.process} aria-labelledby="teams-title">
          <div className={ui.processHeading}>
            <span className={shared.eyebrow}>So arbeitet Ihr Team</span>
            <h2 id="teams-title">
              Ein gemeinsamer Stand. Über alle Kontaktwege.
            </h2>
            <p>
              Ob im Gespräch, am Telefon oder unterwegs: Wir gestalten die
              Übergaben so, dass Anliegen, Verantwortung und nächster Schritt
              zusammenbleiben.
            </p>
          </div>
          <div className={styles.roleCards}>
            {roles.map(([name, copy]) => (
              <article key={name}>
                <h3>{name}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
          <p className={ui.processNote}>
            Wir richten die vereinbarten Tools ein und führen Ihr Team an den
            konkreten Aufgaben ein.
          </p>
        </section>
        <details className={styles.otherIndustries}>
          <summary>Auch für andere Branchen</summary>
          <nav className={styles.otherLinks} aria-label="Weitere Branchen">
            {otherIndustries.map((item) => (
              <Link key={item.slug} href={`/branchen/${item.slug}`}>
                {item.navLabel}
              </Link>
            ))}
          </nav>
        </details>
        <section className={ui.nextStep} aria-labelledby="start-title">
          <div>
            <span className={shared.eyebrow}>
              Mit einer konkreten Frage beginnen
            </span>
            <h2 id="start-title">Was möchten Sie zuerst verbessern?</h2>
            <p>
              Unser Kundenreise-Check hilft, Ihren nächsten Schritt einzuordnen.
              Das Ergebnis sehen Sie direkt. Sie entscheiden anschliessend, ob
              Sie mit uns sprechen möchten.
            </p>
          </div>
          <Link href="/kundenreise-check" className={shared.button}>
            Unverbindlichen Check starten
            <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </section>
      </main>
    </JourneyShell>
  )
}
