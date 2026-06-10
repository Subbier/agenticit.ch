"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"

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
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-6 px-6 text-center">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">
          Etwas ist schiefgelaufen
        </h1>
        <p className="max-w-md text-muted-foreground text-sm">
          Die Seite konnte nicht geladen werden. Bitte versuchen Sie es erneut.
        </p>
      </div>
      <Button type="button" onClick={() => reset()}>
        Erneut laden
      </Button>
    </div>
  )
}
