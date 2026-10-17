import { JourneyShell } from "@/components/journey/shell"
import { JourneyCheck } from "@/components/journey/check"
import { isChallengeId } from "@/lib/journey"
import { createPageMetadata } from "@/lib/seo"
import styles from "@/components/journey/journey.module.css"

export const metadata = createPageMetadata({
  title: "Ihr unverbindlicher Kundenreise-Check",
  description:
    "Finden Sie Ihren Ansatzpunkt für mehr passende Anfragen, bessere Übergaben und weniger Routine. Drei Fragen führen zu einem nutzbaren Plan; Kontakt ist freiwillig.",
  path: "/kundenreise-check",
})

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ thema?: string }>
}) {
  const { thema } = await searchParams
  return (
    <JourneyShell>
      <main className={`${styles.container} ${styles.wideContent}`}>
        <div className={styles.pageHero}>
          <span className={styles.eyebrow}>
            Ein guter Anfang braucht Klarheit
          </span>
          <h1>
            Ihr nächster Schritt.
            <br />
            Passend zu Ihrem Alltag.
          </h1>
          <p>
            Drei kurze Fragen führen zu einem konkreten Plan und einer Vorlage.
            Das Ergebnis sehen Sie direkt. Erst wenn Sie mit uns sprechen
            möchten, brauchen wir Ihre Kontaktdaten.
          </p>
        </div>
        <section className={styles.checkArea} aria-label="Kundenreise-Check">
          <JourneyCheck
            initialChallenge={isChallengeId(thema) ? thema : undefined}
          />
        </section>
      </main>
    </JourneyShell>
  )
}
