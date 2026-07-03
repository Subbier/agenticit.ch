"use client"

import { useEffect, useRef, useState } from "react"

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&@/\\<>=+*-"

/**
 * Entschlüsselungs-Effekt: scrambelt Zeichen und löst sie von links nach
 * rechts in den Zieltext auf. Wird bei jedem `text`-Wechsel neu getriggert.
 */
export function ScrambleText({
  text,
  className,
  duration = 700,
}: {
  text: string
  className?: string
  duration?: number
}) {
  const [display, setDisplay] = useState(text)
  const frame = useRef<number>(0)
  const raf = useRef<number>()

  useEffect(() => {
    const start = performance.now()
    const from = display
    const len = Math.max(text.length, from.length)

    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1)
      const settled = Math.floor(p * len)
      let out = ""
      for (let i = 0; i < text.length; i++) {
        if (i < settled) {
          out += text[i]
        } else if (text[i] === " ") {
          out += " "
        } else {
          out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
        }
      }
      setDisplay(out)
      frame.current++
      if (p < 1) {
        raf.current = requestAnimationFrame(tick)
      } else {
        setDisplay(text)
      }
    }
    raf.current = requestAnimationFrame(tick)
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, duration])

  return <span className={className}>{display}</span>
}
