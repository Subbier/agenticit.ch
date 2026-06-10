"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

import { latLngToVector3, EARTH_RADIUS } from "../lib/geo"

interface PinProps {
  lat: number
  lng: number
  /** Steuert das Setzen/Verschwinden – intern weich interpoliert */
  active?: boolean
  color?: string
}

/**
 * Schlanke, metallische Luxus-Stecknadel. Wird als Child der Erd-Group
 * gerendert, sitzt also lokal auf der Kugel und rotiert mit.
 */
export function Pin({ lat, lng, active = true, color = "#e8e8ec" }: PinProps) {
  const group = useRef<THREE.Group>(null)
  const ring = useRef<THREE.Mesh>(null)
  const reveal = useRef(0)

  const pos = latLngToVector3(lat, lng, EARTH_RADIUS)
  // Quaternion, die +Y (Nadel-Achse) entlang der Oberflächen-Normale ausrichtet
  const quat = new THREE.Quaternion().setFromUnitVectors(
    new THREE.Vector3(0, 1, 0),
    pos.clone().normalize(),
  )

  useFrame((state, delta) => {
    if (!group.current) return
    // weiches Ein-/Ausblenden Richtung Zielzustand
    reveal.current = THREE.MathUtils.damp(reveal.current, active ? 1 : 0, 6, delta)
    const t = reveal.current
    // sanftes Drop-in + Schweben
    const float = Math.sin(state.clock.elapsedTime * 1.6) * 0.05
    group.current.scale.setScalar(t)
    group.current.position.copy(pos).addScaledVector(pos.clone().normalize(), float * t)
    if (ring.current) {
      const pulse = (state.clock.elapsedTime * 0.6) % 1
      ring.current.scale.setScalar(1 + pulse * 2.2)
      ;(ring.current.material as THREE.MeshBasicMaterial).opacity = (1 - pulse) * 0.5 * t
    }
  })

  return (
    <group ref={group} quaternion={quat} position={pos}>
      {/* Nadel-Schaft */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.018, 0.05, 1.0, 24]} />
        <meshStandardMaterial color={color} metalness={1} roughness={0.18} />
      </mesh>
      {/* Kopf */}
      <mesh position={[0, 1.05, 0]}>
        <sphereGeometry args={[0.12, 32, 32]} />
        <meshStandardMaterial
          color={color}
          metalness={1}
          roughness={0.1}
          emissive={color}
          emissiveIntensity={0.25}
        />
      </mesh>
      {/* Boden-Glow-Punkt */}
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.08, 32]} />
        <meshBasicMaterial color={color} transparent opacity={0.9} />
      </mesh>
      {/* Puls-Ring */}
      <mesh ref={ring} position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.1, 0.13, 48]} />
        <meshBasicMaterial color={color} transparent opacity={0.5} side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}
