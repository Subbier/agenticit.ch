"use client"

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

export default function RastoderPage() {
  return (
    <main>
      <Experience />
    </main>
  )
}
