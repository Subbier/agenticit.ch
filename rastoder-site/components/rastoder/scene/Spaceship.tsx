"use client"

import { forwardRef, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

/**
 * Platzhalter-Raumschiff aus Primitives mit fotorealistischem PBR-Material.
 * Für die finale Fassung ein GLTF laden:
 *
 *   const { scene } = useGLTF("/rastoder/models/spaceship.glb")
 *   return <primitive object={scene} ref={ref} />
 *
 * (z. B. Sketchfab "Sci-Fi"-Cruiser, CC-Lizenz; in /public/rastoder/models/)
 */
export const Spaceship = forwardRef<THREE.Group>(function Spaceship(_, ref) {
  const engineGlow = useRef<THREE.PointLight>(null)

  useFrame((state) => {
    if (engineGlow.current) {
      engineGlow.current.intensity = 6 + Math.sin(state.clock.elapsedTime * 12) * 1.5
    }
  })

  return (
    <group ref={ref} dispose={null}>
      {/* Rumpf */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <capsuleGeometry args={[0.35, 1.6, 16, 32]} />
        <meshStandardMaterial color="#c9ced6" metalness={1} roughness={0.25} />
      </mesh>
      {/* Cockpit-Glas */}
      <mesh position={[0, 0.12, 0.9]}>
        <sphereGeometry args={[0.28, 32, 32]} />
        <meshPhysicalMaterial
          color="#0a1622"
          metalness={0}
          roughness={0.05}
          transmission={0.9}
          thickness={0.5}
          clearcoat={1}
        />
      </mesh>
      {/* Flügel */}
      {[-1, 1].map((s) => (
        <mesh key={s} position={[s * 0.55, 0, -0.2]} rotation={[0, 0, s * 0.3]}>
          <boxGeometry args={[0.9, 0.04, 0.7]} />
          <meshStandardMaterial color="#9aa0aa" metalness={1} roughness={0.3} />
        </mesh>
      ))}
      {/* Triebwerks-Düse */}
      <mesh position={[0, 0, -1.1]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.22, 0.3, 0.4, 24]} />
        <meshStandardMaterial color="#2a2e35" metalness={1} roughness={0.4} />
      </mesh>
      {/* Triebwerks-Glühen */}
      <mesh position={[0, 0, -1.35]}>
        <sphereGeometry args={[0.18, 24, 24]} />
        <meshBasicMaterial color="#66ccff" />
      </mesh>
      <pointLight ref={engineGlow} position={[0, 0, -1.5]} color="#66ccff" distance={6} />
    </group>
  )
})
