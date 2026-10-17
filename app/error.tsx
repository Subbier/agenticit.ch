"use client"

import { useEffect } from "react"
import { JourneyShell } from "@/components/journey/shell"
import styles from "@/components/journey/journey.module.css"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <JourneyShell>
      <main id="main-content" tabIndex={-1} className={styles.container}>
        <div className={styles.pageHero}>
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold tracking-tight">
              Etwas ist schiefgelaufen
            </h1>
            <p className="max-w-md text-muted-foreground text-sm">
              Die Seite konnte nicht geladen werden. Bitte versuchen Sie es
              erneut.
            </p>
          </div>
          <button
            className={styles.button}
            type="button"
            onClick={() => reset()}
          >
            Erneut laden
          </button>
        </div>
      </main>
    </JourneyShell>
  )
}
