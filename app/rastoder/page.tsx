import type { Metadata } from "next"
import dynamic from "next/dynamic"

// 3D-Experience nur clientseitig laden (WebGL/Three braucht das DOM)
const Experience = dynamic(() => import("@/components/rastoder/Experience"), {
  ssr: false,
  loading: () => (
    <div className="flex h-screen w-screen items-center justify-center bg-[#02040a]">
      <p className="font-mono text-xs tracking-[0.4em] text-white/50">LOADING EXPERIENCE…</p>
    </div>
  ),
})

export const metadata: Metadata = {
  title: "RASTODER — Masterpiece",
  description: "An interactive cinematic journey from deep space to Bern and the Adriatic coast.",
}

export default function RastoderPage() {
  return (
    <main>
      <Experience />
    </main>
  )
}
