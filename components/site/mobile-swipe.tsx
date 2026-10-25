"use client"

import { useRef, type ReactNode } from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import styles from "./mobile-scroll.module.css"

export function MobileSwipe({
  children,
  label,
}: {
  children: ReactNode
  label: string
}) {
  const frame = useRef<HTMLDivElement>(null)
  function move(direction: number) {
    const track =
      frame.current?.querySelector<HTMLElement>("[data-swipe-track]")
    if (!track) return
    track.scrollBy({
      left: direction * (track.clientWidth - 20),
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    })
  }
  return (
    <div ref={frame} className={styles.frame}>
      <div
        className={styles.controls}
        aria-label={`${label}: Wisch-Navigation`}
      >
        <button
          type="button"
          onClick={() => move(-1)}
          aria-label={`${label}: nach links blättern`}
        >
          <ArrowLeft size={20} aria-hidden="true" />
        </button>
        <span>Nach links / rechts wischen</span>
        <button
          type="button"
          onClick={() => move(1)}
          aria-label={`${label}: nach rechts blättern`}
        >
          <ArrowRight size={20} aria-hidden="true" />
        </button>
      </div>
      {children}
    </div>
  )
}
