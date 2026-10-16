"use client"

import { useEffect } from "react"
import "./globals.css"
import { JourneyShell } from "@/components/journey/shell"
import styles from "@/components/journey/journey.module.css"

export default function GlobalError({
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
    <html lang="de-CH">
      <body className="font-sans antialiased">
        <JourneyShell>
          <main className={styles.container}>
            <div className={styles.pageHero}>
              <div className="space-y-2">
                <h1 className="text-2xl font-semibold tracking-tight">
                  Kritischer Fehler
                </h1>
                <p className="max-w-md text-muted-foreground text-sm">
                  Die Anwendung konnte nicht gestartet werden. Bitte laden Sie
                  die Seite neu.
                </p>
              </div>
              <button
                type="button"
                onClick={() => reset()}
                className={styles.button}
              >
                Erneut versuchen
              </button>
            </div>
          </main>
        </JourneyShell>
      </body>
    </html>
  )
}
