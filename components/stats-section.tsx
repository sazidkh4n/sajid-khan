"use client"

import { useEffect, useState, useRef } from "react"

interface StatItemProps {
  value: number
  label: string
  suffix?: string
  delay?: number
}

function StatItem({ value, label, suffix = "", delay = 0 }: StatItemProps) {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (hasAnimated) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTimeout(() => {
            const duration = 2000
            const steps = 60
            const increment = value / steps
            let current = 0

            const timer = setInterval(() => {
              current += increment
              if (current >= value) {
                setCount(value)
                clearInterval(timer)
                setHasAnimated(true)
              } else {
                setCount(Math.floor(current))
              }
            }, duration / steps)
          }, delay)
        }
      },
      { threshold: 0.5 },
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => observer.disconnect()
  }, [value, delay, hasAnimated])

  return (
    <div
      ref={elementRef}
      className="glass-panel group relative overflow-hidden rounded-xl p-4 transition-all hover:scale-105 md:rounded-2xl md:p-6"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      <div className="relative">
        <div className="glow-text mb-1 font-mono text-2xl font-bold text-primary md:mb-2 md:text-4xl">
          {count}
          {suffix}
        </div>
        <div className="text-xs font-medium text-muted-foreground md:text-sm">{label}</div>
      </div>
    </div>
  )
}

export function StatsSection({ scrollProgress }: { scrollProgress: number }) {
  const [isVisible, setIsVisible] = useState(false)
  const [opacity, setOpacity] = useState(0)

  useEffect(() => {
    if (scrollProgress >= 0.52 && scrollProgress <= 0.58) {
      setIsVisible(true)
      if (scrollProgress < 0.53) {
        setOpacity((scrollProgress - 0.52) / 0.01)
      } else if (scrollProgress > 0.57) {
        setOpacity((0.58 - scrollProgress) / 0.01)
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
      className="pointer-events-none fixed inset-0 z-20 flex items-center justify-center transition-opacity duration-300"
      style={{ opacity }}
    >
      <div className="w-full max-w-6xl px-4 md:px-6">
        <h2 className="glow-text mb-4 text-center font-mono text-xl font-bold text-primary md:mb-8 md:text-3xl">
          Impact & Achievements
        </h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-6">
          <StatItem value={5} label="Years of Experience" suffix="+" delay={0} />
          <StatItem value={50} label="Projects Completed" suffix="+" delay={200} />
          <StatItem value={40} label="Happy Clients" suffix="+" delay={400} />
          <StatItem value={25} label="Technologies Mastered" suffix="+" delay={600} />
        </div>
      </div>
    </div>
  )
}
