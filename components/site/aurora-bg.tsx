"use client"

import dynamic from "next/dynamic"
import { useEffect, useState } from "react"

// Aurora ist eine WebGL-Komponente (ogl) und rendert ausschließlich im Browser.
// Dynamisch ohne SSR geladen, damit ogl nicht im initialen Server-Bundle landet.
const Aurora = dynamic(() => import("@/components/Aurora"), { ssr: false })

export default function AuroraBg(props: Record<string, unknown>) {
  // Erst nach Idle mounten: WebGL-Setup konkurriert sonst mit Hydration/LCP (TBT auf Mobile)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(() => setReady(true), { timeout: 2000 })
      return () => window.cancelIdleCallback(id)
    }
    const id = window.setTimeout(() => setReady(true), 1200)
    return () => window.clearTimeout(id)
  }, [])

  if (!ready) return null
  return <Aurora {...props} />
}
