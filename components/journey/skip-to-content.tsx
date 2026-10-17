"use client"

import { jumpToMainContent } from "@/lib/main-content-focus"
import styles from "./journey.module.css"

export function SkipToContent() {
  return (
    <a
      href="#main-content"
      data-skip-link
      className={styles.skipLink}
      onClick={(event) =>
        jumpToMainContent(event, document.getElementById("main-content"))
      }
    >
      Zum Inhalt springen
    </a>
  )
}
