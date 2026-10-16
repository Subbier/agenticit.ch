"use client"
import Link from "next/link"
import { useState } from "react"
import { ArrowUpRight } from "lucide-react"
import { journeyStages } from "@/lib/journey"
import styles from "./journey.module.css"

export function JourneyMap() {
  const [active, setActive] = useState(0)
  const selected = journeyStages[active]
  return (
    <>
      <div
        role="tablist"
        aria-label="Schritte Ihrer Kundenreise"
        className={styles.journeyTabs}
      >
        {journeyStages.map((stage, index) => (
          <button
            type="button"
            role="tab"
            key={stage.title}
            id={`stage-${index}`}
            aria-selected={active === index}
            aria-controls="journey-detail"
            tabIndex={active === index ? 0 : -1}
            className={styles.stageButton}
            onClick={() => setActive(index)}
            onKeyDown={(event) => {
              let next = index
              if (event.key === "ArrowRight")
                next = (index + 1) % journeyStages.length
              else if (event.key === "ArrowLeft")
                next = (index + journeyStages.length - 1) % journeyStages.length
              else if (event.key === "Home") next = 0
              else if (event.key === "End") next = journeyStages.length - 1
              else return
              event.preventDefault()
              setActive(next)
              document.getElementById(`stage-${next}`)?.focus()
            }}
          >
            <span>0{index + 1}</span>
            <strong>{stage.title}</strong>
          </button>
        ))}
      </div>
      <div
        role="tabpanel"
        id="journey-detail"
        aria-labelledby={`stage-${active}`}
        className={styles.stageDetail}
      >
        <div>
          <h3>{selected.title}</h3>
          <p>{selected.detail}</p>
        </div>
        <div className={styles.stageHandoff}>
          <strong>{selected.handoff}</strong>
          <Link
            className={styles.textLink}
            href={`/kundenreise-check?thema=${selected.challenge}`}
          >
            Diesen Schritt prüfen <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </>
  )
}
