"use client"

import { useEffect, useState } from "react"

export function HeroOverlay() {
  const [opacity, setOpacity] = useState(1)

  useEffect(() => {
    const handleScroll = () => {
      const scrollProgress = window.scrollY / window.innerHeight
      setOpacity(Math.max(0, 1 - scrollProgress * 2))
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div
      className="pointer-events-none fixed inset-0 z-10 flex items-center justify-center transition-opacity duration-300"
      style={{ opacity }}
    >
      <div className="text-center">
        <h1 className="glow-text mb-4 font-mono text-6xl font-bold tracking-tight text-foreground md:text-8xl">
          SAJID KHAN
        </h1>
        <p className="text-balance text-xl text-primary md:text-2xl">Full-Stack Architect</p>
        <p className="mt-4 text-balance text-lg text-muted-foreground md:text-xl">
          Scroll to explore the digital cosmos
        </p>
      </div>
    </div>
  )
}
