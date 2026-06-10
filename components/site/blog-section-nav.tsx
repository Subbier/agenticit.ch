"use client"

import { useEffect, useState } from "react"
import { speedToLeadPost } from "@/lib/blog-speed-to-lead"

export function BlogSectionNav() {
  type NavId = (typeof speedToLeadPost.navSections)[number]["id"]
  const [activeNav, setActiveNav] = useState<NavId>(speedToLeadPost.navSections[0].id)

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    speedToLeadPost.navSections.forEach(({ id }) => {
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
      <nav className="mx-auto flex max-w-4xl gap-1 overflow-x-auto px-6 py-2">
        {speedToLeadPost.navSections.map((item) => (
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
