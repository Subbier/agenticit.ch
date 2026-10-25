"use client"

import { useId, useState, type ReactNode } from "react"
import styles from "./mobile-read-more.module.css"

export function MobileReadMore({ children }: { children: ReactNode }) {
  const [expanded, setExpanded] = useState(false)
  const contentId = useId()
  return (
    <div className={styles.wrap} data-mobile-reading="true">
      <button
        className={styles.toggle}
        type="button"
        aria-expanded={expanded}
        aria-controls={contentId}
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? "Weniger lesen" : "Mehr lesen"}
        <span aria-hidden="true">{expanded ? "−" : "+"}</span>
      </button>
      <div
        id={contentId}
        className={`${styles.content} ${expanded ? styles.expanded : ""}`}
      >
        {children}
      </div>
    </div>
  )
}
