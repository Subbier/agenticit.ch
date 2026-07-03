"use client"

import { forwardRef, useEffect, useMemo, useRef, useState } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

import {
  earthVertexShader,
  earthFragmentShader,
  atmosphereVertexShader,
  atmosphereFragmentShader,
} from "../shaders/earth"
import { EARTH_RADIUS } from "../lib/geo"

const TEX = {
  day: "/rastoder/textures/earth_day.jpg",
  night: "/rastoder/textures/earth_night.jpg",
  clouds: "/rastoder/textures/earth_clouds.jpg",
  specular: "/rastoder/textures/earth_specular.jpg",
}

// Richtung der Sonne (Welt-Raum), bestimmt Tag/Nacht-Grenze.
const SUN_DIRECTION = new THREE.Vector3(1.2, 0.35, 0.9).normalize()

/** 1×1-Fallback, falls eine Textur (noch) fehlt – Seite bleibt lauffähig. */
function solidTexture(hex: string): THREE.Texture {
  const c = new THREE.Color(hex)
  const data = new Uint8Array([c.r * 255, c.g * 255, c.b * 255, 255])
  const t = new THREE.DataTexture(data, 1, 1, THREE.RGBAFormat)
  t.needsUpdate = true
  return t
}

interface EarthProps {
  cloudDrift?: number
}

export const Earth = forwardRef<THREE.Group, EarthProps>(function Earth(
  { cloudDrift = 0.006 },
  ref,
) {
  const cloudsRef = useRef<THREE.Mesh>(null)

  // Fallback-Texturen (sofort verfügbar)
  const fallback = useMemo(
    () => ({
      day: solidTexture("#1b3a5c"),
      night: solidTexture("#05060a"),
      clouds: solidTexture("#000000"),
      specular: solidTexture("#222222"),
    }),
    [],
  )

  const surfaceUniforms = useMemo(
    () => ({
      uDay: { value: fallback.day },
      uNight: { value: fallback.night },
      uSpecular: { value: fallback.specular },
      uClouds: { value: fallback.clouds },
      uSunDirection: { value: SUN_DIRECTION },
      uAtmosphereColor: { value: new THREE.Color("#7ab4ff") },
      uTime: { value: 0 },
    }),
    [fallback],
  )

  const [cloudsMap, setCloudsMap] = useState<THREE.Texture>(fallback.clouds)

  // Echte Texturen asynchron nachladen; bei 404 bleibt der Fallback.
  useEffect(() => {
    const loader = new THREE.TextureLoader()
    const load = (url: string, srgb: boolean, apply: (t: THREE.Texture) => void) =>
      loader.load(url, (t) => {
        if (srgb) t.colorSpace = THREE.SRGBColorSpace
        t.anisotropy = 8
        apply(t)
      })

    load(TEX.day, true, (t) => (surfaceUniforms.uDay.value = t))
    load(TEX.night, true, (t) => (surfaceUniforms.uNight.value = t))
    load(TEX.specular, false, (t) => (surfaceUniforms.uSpecular.value = t))
    load(TEX.clouds, false, (t) => {
      surfaceUniforms.uClouds.value = t
      setCloudsMap(t)
    })
  }, [surfaceUniforms])

  const atmosphereUniforms = useMemo(
    () => ({
      uSunDirection: { value: SUN_DIRECTION },
      uAtmosphereDay: { value: new THREE.Color("#5fa8ff") },
      uAtmosphereTwilight: { value: new THREE.Color("#ff7a4d") },
    }),
    [],
  )

  useFrame((_, delta) => {
    surfaceUniforms.uTime.value += delta
    if (cloudsRef.current) cloudsRef.current.rotation.y += delta * cloudDrift
  })

  return (
    <group ref={ref}>
      {/* Oberfläche */}
      <mesh>
        <sphereGeometry args={[EARTH_RADIUS, 128, 128]} />
        <shaderMaterial
          vertexShader={earthVertexShader}
          fragmentShader={earthFragmentShader}
          uniforms={surfaceUniforms}
        />
      </mesh>

      {/* Wolken-Ebene (leicht erhöht, semi-transparent) */}
      <mesh ref={cloudsRef}>
        <sphereGeometry args={[EARTH_RADIUS * 1.01, 96, 96]} />
        <meshStandardMaterial
          map={cloudsMap}
          alphaMap={cloudsMap}
          transparent
          opacity={0.55}
          depthWrite={false}
        />
      </mesh>

      {/* Atmosphären-Glühen (Backside-Fresnel) */}
      <mesh scale={1.16}>
        <sphereGeometry args={[EARTH_RADIUS, 64, 64]} />
        <shaderMaterial
          vertexShader={atmosphereVertexShader}
          fragmentShader={atmosphereFragmentShader}
          uniforms={atmosphereUniforms}
          transparent
          side={THREE.BackSide}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  )
})
