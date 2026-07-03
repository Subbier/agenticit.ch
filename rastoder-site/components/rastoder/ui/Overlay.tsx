"use client"

import { useEffect, useState } from "react"

import { useExperience } from "../lib/store"
import { LOCATIONS, MASTERPIECE_WORDS, MONTENEGRO_WORD } from "../lib/geo"
import { ScrambleText } from "./ScrambleText"
import { CornerUI } from "./CornerUI"
import styles from "./rastoder.module.css"

export function Overlay() {
  const phase = useExperience((s) => s.phase)
  const awaitingContinue = useExperience((s) => s.awaitingContinue)
  const continueFn = useExperience((s) => s.continueFn)

  // morphende "Masterpiece"-Schleife (nur in Phase Bern)
  const [wordIndex, setWordIndex] = useState(0)
  useEffect(() => {
    if (phase !== "bern") return
    setWordIndex(0)
    const id = setInterval(() => {
      setWordIndex((i) => (i + 1) % MASTERPIECE_WORDS.length)
    }, 1700)
    return () => clearInterval(id)
  }, [phase])

  const showBern = phase === "bern"
  const showMonte = phase === "montenegro"
  const word = showBern ? MASTERPIECE_WORDS[wordIndex] : MONTENEGRO_WORD
  const place = showMonte ? LOCATIONS.montenegro.label : LOCATIONS.bern.label

  return (
    <div className="pointer-events-none absolute inset-0 z-20 select-none">
      <CornerUI />

      {/* Intro-Hinweis */}
      {phase === "intro" && (
        <div className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center ${styles.fadeUp}`}>
          <p className={`${styles.kicker} text-xs md:text-sm`}>Initializing transmission</p>
          <p
            className={`${styles.glitch} ${styles.mono} mt-3 text-2xl text-white md:text-4xl`}
            data-text="RASTODER.COM"
          >
            RASTODER.COM
          </p>
        </div>
      )}

      {/* Stadt-Label + Masterpiece-Wort */}
      {(showBern || showMonte) && (
        <div className="absolute bottom-[14%] left-1/2 w-full -translate-x-1/2 text-center">
          <p className={`${styles.kicker} mb-4 text-[10px] md:text-xs`}>{place}</p>
          <div className={styles.hairline + " mx-auto mb-6 w-24"} />
          <h1
            key={phase}
            className={`${styles.fashionWord} ${showMonte ? styles.fashionWordBold : ""} text-5xl md:text-8xl ${styles.fadeUp}`}
          >
            <ScrambleText text={word} duration={650} />
          </h1>
        </div>
      )}

      {/* Continue-Trigger (Klick/Scroll), wenn Timeline pausiert */}
      {awaitingContinue && (
        <button
          onClick={() => continueFn?.()}
          className={`pointer-events-auto absolute bottom-10 left-1/2 -translate-x-1/2 ${styles.fadeUp}`}
        >
          <span className={`${styles.kicker} text-[10px] md:text-xs animate-pulse`}>
            ↓ Continue · nächster Hop
          </span>
        </button>
      )}
    </div>
  )
}
