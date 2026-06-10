"use client"

import { useExperience } from "../lib/store"
import styles from "./rastoder.module.css"

/** Familien-Mailboxen unter @rastoder.com – dezente Luxus-UI. */
const FAMILY = ["admin", "studio", "press", "family"]

export function CornerUI() {
  const progress = useExperience((s) => s.progress)

  return (
    <>
      {/* oben links: Marke */}
      <div className="absolute left-6 top-6 md:left-10 md:top-8">
        <p className={`${styles.fashionWord} text-sm md:text-base`}>RASTODER</p>
        <p className={`${styles.mono} mt-1 text-[10px] text-white/40`}>est. Bern · Adriatic</p>
      </div>

      {/* oben rechts: Status / Fortschritt */}
      <div className="absolute right-6 top-6 text-right md:right-10 md:top-8">
        <p className={`${styles.kicker} text-[9px] md:text-[10px]`}>System</p>
        <p className={`${styles.mono} mt-1 text-[10px] text-emerald-300/70`}>
          ◉ live · {Math.round(progress * 100)}%
        </p>
      </div>

      {/* unten links: Login-Hinweis name@rastoder.com */}
      <div className="absolute bottom-6 left-6 md:bottom-8 md:left-10">
        <p className={`${styles.kicker} mb-2 text-[9px]`}>Access</p>
        <ul className="space-y-1">
          {FAMILY.map((n) => (
            <li key={n} className={`${styles.mono} text-[10px] text-white/45`}>
              {n}
              <span className="text-white/25">@rastoder.com</span>
            </li>
          ))}
        </ul>
      </div>

      {/* unten rechts: feines Branding */}
      <div className="absolute bottom-6 right-6 text-right md:bottom-8 md:right-10">
        <p className={`${styles.mono} text-[10px] text-white/40`}>↗ login</p>
        <p className={`${styles.kicker} mt-1 text-[9px]`}>Couture Code</p>
      </div>
    </>
  )
}
