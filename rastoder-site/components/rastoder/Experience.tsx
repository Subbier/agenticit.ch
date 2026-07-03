"use client"

import { useEffect } from "react"
import { Canvas } from "@react-three/fiber"
import * as THREE from "three"

import { Scene } from "./scene/Scene"
import { Overlay } from "./ui/Overlay"
import { CodeRush } from "./ui/CodeRush"
import { useExperience } from "./lib/store"

export default function Experience() {
  // Scroll / Tastatur als alternativer "Continue"-Trigger
  useEffect(() => {
    const fire = () => {
      const { awaitingContinue, continueFn } = useExperience.getState()
      if (awaitingContinue) continueFn?.()
    }
    const onWheel = (e: WheelEvent) => {
      if (e.deltaY > 0) fire()
    }
    const onKey = (e: KeyboardEvent) => {
      if (["ArrowDown", " ", "Enter"].includes(e.key)) fire()
    }
    window.addEventListener("wheel", onWheel, { passive: true })
    window.addEventListener("keydown", onKey)
    return () => {
      window.removeEventListener("wheel", onWheel)
      window.removeEventListener("keydown", onKey)
    }
  }, [])

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-[#02040a]">
      {/* CodeRush — farbiger Terminal-Log-Stream hinter der 3D-Szene */}
      <CodeRush opacity={0.16} />

      <Canvas
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.05,
        }}
        camera={{ fov: 42, near: 0.1, far: 2000, position: [0, 30, 240] }}
        dpr={[1, 2]}
      >
        <color attach="background" args={["#02040a"]} />
        <fog attach="fog" args={["#02040a", 220, 900]} />
        <Scene />
      </Canvas>

      <Overlay />
    </div>
  )
}
