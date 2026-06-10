"use client"

import { useEffect, useRef } from "react"

/**
 * CodeRush — stylischer, farbcodierter Terminal-Log-Stream.
 * Vertikal rauschende Spalten aus Log-Tokens (Level, Hex-Bytes, Pfade,
 * Flavor-Wörter) im Andromeda-Farbschema, mit Glow-Head und CRT-Scanlines.
 */

// Andromeda-Palette (Hue pro Spalte, persistent)
const HUES = [
  "#36c9c9", // cyan
  "#2bd99f", // mint
  "#b48cff", // violet
  "#ff5f8f", // magenta
  "#ffb454", // amber
  "#7fdbff", // sky
]

// Token-Quellen — wirken wie echte Logzeilen
const LEVELS = ["INFO", "OK", "WARN", "ERR", "TRACE", "SYNC", "WARP", "DONE"]
const PATHS = [
  "core::warp",
  "nav::andromeda",
  "auth@rastoder",
  "gpu::shade",
  "net::tx",
  "fs::vault",
  "orbit::sync",
  "io::stream",
]
const WORDS = ["ANDROMEDA", "PEACE", "BYE", "RASTODER", "MASTERPIECE", "CODERUSH", "REMEK·DJELO"]
const GLYPHS = ["░▒▓", "▚▞", "::", "=>", "→", "✦", "·", "//", "0x"]
const HEXCH = "0123456789ABCDEF"

function randHex(len: number) {
  let s = ""
  for (let i = 0; i < len; i++) s += HEXCH[(Math.random() * 16) | 0]
  return s
}

/** Liefert ein Token + ob es ein "Highlight" (heller/weiß) ist. */
function nextToken(): { text: string; word: boolean } {
  const r = Math.random()
  if (r < 0.5) return { text: "0x" + randHex(2 + ((Math.random() * 3) | 0)), word: false }
  if (r < 0.66) return { text: "[" + LEVELS[(Math.random() * LEVELS.length) | 0] + "]", word: false }
  if (r < 0.82) return { text: PATHS[(Math.random() * PATHS.length) | 0], word: false }
  if (r < 0.9) return { text: GLYPHS[(Math.random() * GLYPHS.length) | 0], word: false }
  return { text: WORDS[(Math.random() * WORDS.length) | 0], word: true }
}

interface Column {
  x: number
  y: number // aktuelle Reihe (float)
  lastRow: number
  speed: number // Reihen/Sekunde
  hue: string
}

export function CodeRush({ opacity = 0.16 }: { opacity?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const fontSize = 13
    const lineH = 17
    const colW = 96
    let cols: Column[] = []
    let raf = 0

    const resize = () => {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      canvas.width = w * devicePixelRatio
      canvas.height = h * devicePixelRatio
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0)
      const n = Math.max(1, Math.floor(w / colW))
      cols = Array.from({ length: n }, (_, i) => ({
        x: i * colW + 8,
        y: -Math.random() * (h / lineH),
        lastRow: -9999,
        speed: 6 + Math.random() * 16,
        hue: HUES[(Math.random() * HUES.length) | 0],
      }))
    }
    resize()
    window.addEventListener("resize", resize)

    let last = performance.now()
    const draw = (now: number) => {
      raf = requestAnimationFrame(draw)
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now
      const h = canvas.offsetHeight

      // weicher Trail: vorherige Frames abdunkeln (lange, elegante Streaks)
      ctx.fillStyle = "rgba(6, 7, 16, 0.10)"
      ctx.fillRect(0, 0, canvas.offsetWidth, h)
      ctx.font = `${fontSize}px "JetBrains Mono", ui-monospace, monospace`
      ctx.textBaseline = "top"

      for (const c of cols) {
        c.y += c.speed * dt
        const row = Math.floor(c.y)
        if (row !== c.lastRow) {
          c.lastRow = row
          const py = row * lineH
          if (py > -lineH && py < h) {
            const { text, word } = nextToken()
            ctx.shadowColor = c.hue
            ctx.shadowBlur = word ? 12 : 6
            // Highlight-Wörter weiß-heiß, sonst Spalten-Hue
            ctx.fillStyle = word ? "rgba(240, 246, 255, 0.95)" : c.hue
            ctx.fillText(text, c.x, py)
            ctx.shadowBlur = 0
          }
          // Reset, wenn unten raus
          if (py > h + lineH) {
            c.y = -Math.random() * 8
            c.speed = 6 + Math.random() * 16
            c.hue = HUES[(Math.random() * HUES.length) | 0]
          }
        }
      }
    }
    raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <div className="pointer-events-none absolute inset-0" style={{ opacity }}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        style={{ mixBlendMode: "screen" }}
      />
      {/* CRT-Scanlines */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(0,0,0,0.18) 0px, rgba(0,0,0,0.18) 1px, transparent 2px, transparent 3px)",
          mixBlendMode: "multiply",
        }}
      />
      {/* Terminal-Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 50%, transparent 55%, rgba(2,3,10,0.55) 100%)",
        }}
      />
    </div>
  )
}
