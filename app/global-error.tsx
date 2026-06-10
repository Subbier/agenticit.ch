"use client"

import { useEffect } from "react"
import "./globals.css"

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
    <html lang="de-CH" className="dark">
      <body className="font-sans antialiased">
        <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background px-6 text-center text-foreground">
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold tracking-tight">
              Kritischer Fehler
            </h1>
            <p className="max-w-md text-muted-foreground text-sm">
              Die Anwendung konnte nicht gestartet werden. Bitte laden Sie die
              Seite neu.
            </p>
          </div>
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow-xs hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
          >
            Erneut versuchen
          </button>
        </div>
      </body>
    </html>
  )
}
