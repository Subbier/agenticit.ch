"use client"

import { useCallback, useEffect, useRef } from "react"
import { useThree, useFrame } from "@react-three/fiber"
import * as THREE from "three"
import gsap from "gsap"

import { faceCameraRotationY, LOCATIONS, EARTH_RADIUS } from "../lib/geo"
import { useExperience } from "../lib/store"

/**
 * Steuerwerte, die GSAP animiert und useFrame jeden Frame auf die Szene anwendet.
 * Entkoppelt die Timeline vom Render-Loop (kein Re-Render pro Frame).
 */
interface ControlState {
  camX: number
  camY: number
  camZ: number
  lookX: number
  lookY: number
  lookZ: number
  earthRotY: number
  shipX: number
  shipY: number
  shipZ: number
}

const bern = faceCameraRotationY(LOCATIONS.bern.lat, LOCATIONS.bern.lng)
const monte = faceCameraRotationY(LOCATIONS.montenegro.lat, LOCATIONS.montenegro.lng)

export function useCinematicTimeline(
  earthRef: React.RefObject<THREE.Group>,
  shipRef: React.RefObject<THREE.Group>,
) {
  const camera = useThree((s) => s.camera)
  // Selektoren statt useExperience() -> KEINE Re-Subscription pro Frame
  const setPhase = useExperience((s) => s.setPhase)
  const setAwaitingContinue = useExperience((s) => s.setAwaitingContinue)
  const setProgress = useExperience((s) => s.setProgress)
  const tlRef = useRef<gsap.core.Timeline | null>(null)

  const ctrl = useRef<ControlState>({
    // Start: tief im All, weit entfernt
    camX: 0,
    camY: 30,
    camZ: 240,
    lookX: 0,
    lookY: 0,
    lookZ: 0,
    earthRotY: bern.rotY - 1.2, // Erde startet leicht weggedreht
    shipX: -60,
    shipY: 8,
    shipZ: 140,
  })

  // Welt-Anwendung der Steuerwerte
  const lookTarget = useRef(new THREE.Vector3())
  useFrame(() => {
    const c = ctrl.current
    camera.position.set(c.camX, c.camY, c.camZ)
    lookTarget.current.set(c.lookX, c.lookY, c.lookZ)
    camera.lookAt(lookTarget.current)
    if (earthRef.current) earthRef.current.rotation.y = c.earthRotY
    if (shipRef.current) {
      shipRef.current.position.set(c.shipX, c.shipY, c.shipZ)
      // Schiff blickt grob in Flugrichtung (zur Erde)
      shipRef.current.lookAt(0, 0, 0)
    }
  })

  useEffect(() => {
    const c = ctrl.current
    const ease = "power3.inOut"

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease },
        onUpdate: () => setProgress(tl.progress()),
      })
      tlRef.current = tl

      // ── PHASE 1: Intro / Planet Hopping ─────────────────────────────
      tl.add(() => setPhase("intro"))
      // Schiff zieht von links durchs Bild
      tl.to(c, { shipX: 50, shipZ: 90, shipY: 4, duration: 6, ease: "none" }, 0)
      // Kamera gleitet langsam, Parallaxe der Planeten
      tl.to(c, { camX: 10, camY: 18, camZ: 180, duration: 6, ease: "sine.inOut" }, 0)

      // ── PHASE 2: Anflug auf die Erde (Google-Earth-Zoom) ────────────
      tl.add(() => setPhase("approach"), ">-0.5")
      tl.to(
        c,
        {
          camX: 0,
          camY: 6,
          camZ: EARTH_RADIUS * 2.4, // dichter, atemberaubender Zoom
          duration: 5,
          ease: "power2.inOut",
        },
        ">",
      )
      // Erde dreht Bern frontal heran
      tl.to(c, { earthRotY: bern.rotY, duration: 5, ease: "power2.inOut" }, "<")
      // Schiff aus dem Bild ziehen
      tl.to(c, { shipX: 120, shipY: 40, duration: 4, ease: "power1.in" }, "<")
      // Blick leicht auf Bern-Höhe heben
      tl.to(c, { lookY: bern.height * 0.45, duration: 5, ease: "power2.inOut" }, "<")

      // ── PHASE 3: Fokus Bern, "Masterpiece"-Schleife ─────────────────
      tl.add(() => setPhase("bern"))
      // sanfter Push-in + minimale Drift (lebendige Kamera)
      tl.to(c, { camZ: EARTH_RADIUS * 1.9, camY: bern.height * 0.5 + 2, duration: 3 })
      // Halt: auf User-Interaktion (Klick/Scroll) warten
      tl.addPause(undefined, () => setAwaitingContinue(true))

      // ── PHASE 4: Hop nach Montenegro ────────────────────────────────
      tl.add(() => {
        setAwaitingContinue(false)
        setPhase("transit")
      })
      // erst leicht herauszoomen
      tl.to(c, { camZ: EARTH_RADIUS * 2.8, lookY: 0, duration: 2 })
      // Erde rotiert zur Adria-Küste (cineastisch)
      tl.to(c, { earthRotY: monte.rotY, duration: 4.5, ease: "power2.inOut" })
      // Re-Zoom an die Küste + Pin setzen
      tl.add(() => setPhase("montenegro"), ">-1.2")
      tl.to(
        c,
        { camZ: EARTH_RADIUS * 1.9, camY: monte.height * 0.5 + 2, lookY: monte.height * 0.45, duration: 3 },
        ">-1.2",
      )
    })

    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /** Stabile Referenz, damit der Registrierungs-Effekt nur einmal läuft. */
  const resume = useCallback(() => tlRef.current?.play(), [])

  return { resume }
}
