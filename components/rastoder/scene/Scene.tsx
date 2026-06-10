"use client"

import { Suspense, useEffect, useMemo, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Stars } from "@react-three/drei"
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing"
import * as THREE from "three"

import { Earth } from "./Earth"
import { Pin } from "./Pin"
import { Spaceship } from "./Spaceship"
import { useCinematicTimeline } from "./useCinematicTimeline"
import { useExperience } from "../lib/store"
import { LOCATIONS } from "../lib/geo"

/** Entfernte Planeten für das "Planet Hopping"-Gefühl. */
function Planets() {
  const bodies = useMemo(
    () => [
      { pos: [-90, 20, -60], r: 14, color: "#caa472", emissive: "#3a2a12" },
      { pos: [120, -30, -120], r: 22, color: "#7a8aa0", emissive: "#1a2230" },
      { pos: [-140, -10, -200], r: 30, color: "#b06b4f", emissive: "#2a120a" },
    ],
    [],
  )
  return (
    <>
      {bodies.map((b, i) => (
        <mesh key={i} position={b.pos as [number, number, number]}>
          <sphereGeometry args={[b.r, 48, 48]} />
          <meshStandardMaterial
            color={b.color}
            emissive={b.emissive}
            emissiveIntensity={0.4}
            roughness={0.9}
          />
        </mesh>
      ))}
    </>
  )
}

/**
 * Spiegelt die Erd-Rotation, damit Pins exakt mit der Oberfläche mitrotieren.
 * (Hält die Earth-Komponente frei von Pin-Logik.)
 */
function PinsLayer({
  earthRef,
  phase,
}: {
  earthRef: React.RefObject<THREE.Group>
  phase: string
}) {
  const group = useRef<THREE.Group>(null)
  useFrame(() => {
    if (group.current && earthRef.current) {
      group.current.rotation.y = earthRef.current.rotation.y
    }
  })
  return (
    <group ref={group}>
      <Pin {...LOCATIONS.bern} active={phase === "bern"} color="#f2f2f5" />
      <Pin {...LOCATIONS.montenegro} active={phase === "montenegro"} color="#d8c9a8" />
    </group>
  )
}

export function Scene() {
  const earthRef = useRef<THREE.Group>(null)
  const shipRef = useRef<THREE.Group>(null)
  const phase = useExperience((s) => s.phase)
  const setContinueFn = useExperience((s) => s.setContinueFn)

  const { resume } = useCinematicTimeline(earthRef, shipRef)

  // resume der UI zugänglich machen (resume ist stabil via useCallback)
  useEffect(() => {
    setContinueFn(resume)
    return () => setContinueFn(null)
  }, [resume, setContinueFn])

  return (
    <>
      {/* Sonnenlicht (Key) + dezentes Fill */}
      <directionalLight position={[120, 40, 90]} intensity={3.2} color="#fff5e8" />
      <ambientLight intensity={0.08} />

      <Stars radius={400} depth={120} count={9000} factor={5} saturation={0} fade speed={0.4} />
      <Planets />

      <Suspense fallback={null}>
        <Earth ref={earthRef} />
      </Suspense>

      <PinsLayer earthRef={earthRef} phase={phase} />
      <Spaceship ref={shipRef} />

      <EffectComposer>
        <Bloom intensity={0.7} luminanceThreshold={0.6} luminanceSmoothing={0.3} mipmapBlur />
        <Vignette offset={0.25} darkness={0.85} />
      </EffectComposer>
    </>
  )
}
