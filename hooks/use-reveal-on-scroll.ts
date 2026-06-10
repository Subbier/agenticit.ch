"use client"

import { useEffect, useRef, useState } from "react"

type UseRevealOnScrollOptions = {
  threshold?: number
  rootMargin?: string
  fallbackMs?: number
}

export function useRevealOnScroll({
  threshold = 0.1,
  rootMargin = "0px 0px -80px 0px",
  fallbackMs = 1200,
}: UseRevealOnScrollOptions = {}) {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) {
      setVisible(true)
      return
    }

    const fallback = window.setTimeout(() => setVisible(true), fallbackMs)

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          window.clearTimeout(fallback)
          observer.disconnect()
        }
      },
      { threshold, rootMargin },
    )

    observer.observe(node)

    return () => {
      window.clearTimeout(fallback)
      observer.disconnect()
    }
  }, [threshold, rootMargin, fallbackMs])

  const revealClass = visible
    ? "opacity-100 translate-y-0"
    : "opacity-0 translate-y-8"

  return { ref, visible, revealClass }
}
