"use client"

import { useEffect, useState } from "react"

export function WorkSectionOverlay({ scrollProgress }: { scrollProgress: number }) {
  const [isVisible, setIsVisible] = useState(false)
  const [opacity, setOpacity] = useState(0)

  useEffect(() => {
    if (scrollProgress >= 0.58 && scrollProgress <= 0.75) {
      setIsVisible(true)
      // Fade in at start, fade out at end
      if (scrollProgress < 0.59) {
        setOpacity((scrollProgress - 0.58) / 0.01)
      } else if (scrollProgress > 0.74) {
        setOpacity((0.75 - scrollProgress) / 0.01)
      } else {
        setOpacity(1)
      }
    } else {
      setIsVisible(false)
      setOpacity(0)
    }
  }, [scrollProgress])

  if (!isVisible) return null

  return (
    <div
      className="pointer-events-none fixed left-0 right-0 top-24 z-20 flex justify-center transition-opacity duration-300"
      style={{ opacity }}
    >
      <div className="glass-panel rounded-2xl px-8 py-4">
        <h2 className="glow-text text-center font-mono text-2xl font-bold text-primary">Featured Work</h2>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          Click the glowing stars below to explore projects
        </p>
      </div>
    </div>
  )
}
