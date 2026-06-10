"use client"

import { useEffect, useState } from "react"
import { advokCaseStudy } from "@/lib/case-study-advok"

export function CaseStudiesSectionNav() {
  type NavId = (typeof advokCaseStudy.navSections)[number]["id"]
  const [activeNav, setActiveNav] = useState<NavId>(advokCaseStudy.navSections[0].id)

  useEffect(() => {
    const sectionIds = advokCaseStudy.navSections.map((s) => s.id)
    const observers: IntersectionObserver[] = []

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveNav(id)
        },
        { rootMargin: "-35% 0px -55% 0px", threshold: 0 },
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  return (
    <div className="sticky top-[4.5rem] z-20 hidden border-b border-white/10 bg-black/60 backdrop-blur-xl lg:block">
      <nav className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-6 py-2">
        {advokCaseStudy.navSections.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
              activeNav === item.id
                ? "bg-white text-black"
                : "text-white/60 hover:bg-white/10 hover:text-white"
            }`}
          >
            {item.label}
          </a>
        ))}
      </nav>
    </div>
  )
}
