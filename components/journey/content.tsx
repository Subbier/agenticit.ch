import type { CSSProperties, ReactNode } from "react"
import { JourneyShell } from "./shell"
import styles from "./content.module.css"

export function JourneyContent({
  children,
  style,
}: {
  children: ReactNode
  style?: CSSProperties
}) {
  return (
    <JourneyShell>
      <main
        id="main-content"
        tabIndex={-1}
        data-page-content
        className={styles.content}
        style={style}
      >
        {children}
      </main>
    </JourneyShell>
  )
}
