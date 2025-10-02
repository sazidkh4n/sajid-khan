"use client"

import { useEffect, useState } from "react"

export function ScrollIndicator() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const progress = window.scrollY / (document.body.scrollHeight - window.innerHeight)
      setScrollProgress(progress)
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="pointer-events-none fixed right-8 top-1/2 z-30 flex -translate-y-1/2 flex-col gap-3">
      {/* Progress bar */}
      <div className="h-48 w-1 rounded-full bg-muted/20">
        <div
          className="w-full rounded-full bg-primary transition-all duration-300"
          style={{ height: `${scrollProgress * 100}%` }}
        />
      </div>

      {/* Percentage */}
      <div className="text-center font-mono text-xs text-muted-foreground">{Math.round(scrollProgress * 100)}%</div>
    </div>
  )
}
