import * as THREE from "three"

/** Erd-Radius der Szene (Welt-Einheiten). Zentral referenziert. */
export const EARTH_RADIUS = 10

/**
 * Wandelt geographische Koordinaten in einen Punkt auf der Kugel um.
 * Passt zur Standard-Equirectangular-UV (u=0 bei lng -180°).
 */
export function latLngToVector3(
  lat: number,
  lng: number,
  radius = EARTH_RADIUS,
): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lng + 180) * (Math.PI / 180)
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  )
}

/**
 * Liefert die earth.rotation.y, die einen Ort frontal zur +Z-Kamera dreht,
 * plus die Höhe (y) des Ortes für das Kamera-Framing.
 */
export function faceCameraRotationY(lat: number, lng: number, radius = EARTH_RADIUS) {
  const v = latLngToVector3(lat, lng, radius)
  // worldX = 0  ->  rotY = atan2(-x, z)
  const rotY = Math.atan2(-v.x, v.z)
  return { rotY, height: v.y, surface: v }
}

/** Die zwei Ziel-Orte der Storyline. */
export const LOCATIONS = {
  bern: { lat: 46.948, lng: 7.4474, label: "Bern · Schweiz" },
  montenegro: { lat: 42.2911, lng: 18.8404, label: "Budva · Montenegro" }, // Adria-Küste
} as const

/** Die "Masterpiece"-Schleife (Phase Bern) und das Montenegro-Label. */
export const MASTERPIECE_WORDS = [
  "Masterpiece", // EN
  "Obra maestra", // ES
  "Meisterwerk", // DE
  "Başyapıt", // TR
  "Kryevepër", // SQ
  "تحفة فنية", // AR
  "Шедевр", // RU
]

export const MONTENEGRO_WORD = "Remek-Djelo"
