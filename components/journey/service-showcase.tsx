"use client"

import { useEffect, useRef, useState } from "react"
import { Megaphone, Pause, Play, TrendingUp, Workflow } from "lucide-react"
import styles from "./journey.module.css"

const areas = [
  {
    id: "marketing",
    title: "Marketing",
    benefit: "Sichtbar werden.\nInteresse wecken.",
    examples: "Websites · Kampagnen · Content",
    icon: Megaphone,
  },
  {
    id: "revenue",
    title: "Sales",
    benefit: "Kontakte weiterbringen.\nKunden gewinnen.",
    examples: "CRM · Termine · Kundenbindung",
    icon: TrendingUp,
  },
  {
    id: "automation",
    title: "Digitalisierung & KI",
    benefit: "Routine abgeben.\nFreiraum gewinnen.",
    examples: "KI-Telefonie · Workflows · Apps",
    icon: Workflow,
  },
]

export function ServiceShowcase() {
  const [active, setActive] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isHovered, setIsHovered] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const playbackRef = useRef<HTMLButtonElement>(null)
  const activeAreaRef = useRef<HTMLButtonElement>(null)
  const restoreAreaFocus = useRef(false)
  const area = areas[active]
  const Icon = area.icon
  const isAdvancing = isPlaying && !isHovered && !reducedMotion && isVisible

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)")
    const updateMotion = () => {
      restoreAreaFocus.current = Boolean(
        motion.matches &&
          playbackRef.current &&
          document.activeElement === playbackRef.current,
      )
      setReducedMotion(motion.matches)
    }
    const updateVisibility = () => setIsVisible(!document.hidden)
    updateMotion()
    updateVisibility()
    motion.addEventListener("change", updateMotion)
    document.addEventListener("visibilitychange", updateVisibility)
    return () => {
      motion.removeEventListener("change", updateMotion)
      document.removeEventListener("visibilitychange", updateVisibility)
    }
  }, [])

  useEffect(() => {
    if (!reducedMotion || !restoreAreaFocus.current) return
    restoreAreaFocus.current = false
    activeAreaRef.current?.focus({ preventScroll: true })
  }, [reducedMotion])

  useEffect(() => {
    if (!isAdvancing) return
    const timer = window.setTimeout(() => {
      setActive((current) => (current + 1) % areas.length)
    }, 6000)
    return () => window.clearTimeout(timer)
  }, [active, isAdvancing])

  return (
    <div
      className={styles.showcase}
      role="region"
      aria-roledescription="Karussell"
      aria-label="Marketing, Sales und Digitalisierung mit KI"
      data-running={isAdvancing}
      onFocusCapture={(event) => {
        if (event.target.matches(":focus-visible")) setIsPlaying(false)
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={styles.showcaseToolbar}>
        <span className={styles.showcaseCounter}>
          0{active + 1} <span>/ 03</span>
        </span>
        {!reducedMotion ? (
          <button
            ref={playbackRef}
            type="button"
            className={styles.showcasePlayback}
            aria-label={
              isPlaying
                ? "Automatischen Wechsel pausieren"
                : "Automatischen Wechsel starten"
            }
            onClick={() => setIsPlaying((current) => !current)}
          >
            {isPlaying ? (
              <Pause size={16} aria-hidden="true" />
            ) : (
              <Play size={16} aria-hidden="true" />
            )}
          </button>
        ) : null}
      </div>
      <div className={styles.showcaseStage} key={area.id}>
        <div
          className={styles.showcaseArt}
          data-area={area.id}
          aria-hidden="true"
        >
          <span />
          <span />
          <span />
          <Icon size={62} strokeWidth={1.25} />
        </div>
        <div className={styles.showcaseCopy}>
          <h2>{area.title}</h2>
          <p>{area.benefit}</p>
          <span>{area.examples}</span>
        </div>
      </div>
      <div
        className={styles.showcaseNav}
        role="group"
        aria-label="Bereich auswählen"
      >
        {areas.map((item, index) => (
          <button
            ref={active === index ? activeAreaRef : undefined}
            type="button"
            key={item.id}
            aria-label={`${item.title} anzeigen`}
            aria-pressed={active === index}
            onClick={() => {
              setActive(index)
              setIsPlaying(false)
            }}
          >
            <span className={styles.showcaseDot} aria-hidden="true" />
            <span>{item.title}</span>
            {active === index ? (
              <span
                className={styles.showcaseProgress}
                key={active}
                aria-hidden="true"
              />
            ) : null}
          </button>
        ))}
      </div>
      <span
        className={styles.showcaseAnnouncement}
        aria-live={isPlaying ? "off" : "polite"}
        aria-atomic="true"
      >
        {area.title}: {area.benefit.replace("\n", " ")} {area.examples}
      </span>
    </div>
  )
}
