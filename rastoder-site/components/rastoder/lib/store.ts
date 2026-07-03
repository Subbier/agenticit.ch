"use client"

import { create } from "zustand"

/**
 * Phasen der cineastischen Storyline.
 *  intro      – Deep Space / Planet Hopping
 *  approach   – Anflug auf die Erde (Google-Earth-Zoom)
 *  bern       – Fokus Schweiz/Bern, "Masterpiece"-Schleife
 *  transit    – Hop nach Montenegro (Erde rotiert)
 *  montenegro – Küste, Pin, "Remek-Djelo"
 */
export type Phase = "intro" | "approach" | "bern" | "transit" | "montenegro"

interface ExperienceState {
  phase: Phase
  /** true, sobald die Timeline auf eine User-Interaktion (Klick/Scroll) wartet */
  awaitingContinue: boolean
  /** 0..1 globaler Fortschritt der Master-Timeline (für UI-Reaktionen) */
  progress: number
  /** Wird von der Timeline gesetzt; von der UI aufgerufen, um fortzufahren */
  continueFn: (() => void) | null
  setPhase: (p: Phase) => void
  setAwaitingContinue: (v: boolean) => void
  setProgress: (v: number) => void
  setContinueFn: (fn: (() => void) | null) => void
}

export const useExperience = create<ExperienceState>((set) => ({
  phase: "intro",
  awaitingContinue: false,
  progress: 0,
  continueFn: null,
  setPhase: (phase) => set({ phase }),
  setAwaitingContinue: (awaitingContinue) => set({ awaitingContinue }),
  setProgress: (progress) => set({ progress }),
  setContinueFn: (continueFn) => set({ continueFn }),
}))
