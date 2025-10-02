"use client"

import { useEffect, useState } from "react"
import { Calendar } from "lucide-react"

const milestones = [
  {
    year: "2019",
    title: "Started Freelancing",
    description: "Began journey as a freelance developer, focusing on web development",
  },
  {
    year: "2020",
    title: "First Major Client",
    description: "Landed first enterprise client, delivering a full-stack e-commerce platform",
  },
  {
    year: "2022",
    title: "Expanded to Mobile Development",
    description: "Mastered Flutter and React Native, expanding service offerings",
  },
  {
    year: "2024",
    title: "Full-Stack Architect",
    description: "Established as a full-stack architect with expertise in cloud solutions",
  },
]

export function TimelineSection({ scrollProgress }: { scrollProgress: number }) {
  const [isVisible, setIsVisible] = useState(false)
  const [opacity, setOpacity] = useState(0)

  useEffect(() => {
    if (scrollProgress >= 0.81 && scrollProgress <= 0.87) {
      setIsVisible(true)
      if (scrollProgress < 0.82) {
        setOpacity((scrollProgress - 0.81) / 0.01)
      } else if (scrollProgress > 0.86) {
        setOpacity((0.87 - scrollProgress) / 0.01)
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
      <div className="w-full max-w-4xl px-6">
        <h2 className="glow-text mb-8 text-center font-mono text-3xl font-bold text-primary">Career Journey</h2>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 h-full w-0.5 bg-gradient-to-b from-primary/50 via-primary to-primary/50 md:left-1/2" />

          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div
                key={index}
                className={`relative flex items-center gap-8 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
              >
                {/* Timeline dot */}
                <div className="absolute left-8 z-10 flex h-4 w-4 items-center justify-center rounded-full bg-primary ring-4 ring-background md:left-1/2 md:-translate-x-1/2">
                  <div className="h-2 w-2 rounded-full bg-background" />
                </div>

                {/* Content */}
                <div className={`ml-20 w-full md:ml-0 md:w-5/12 ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                  <div className="glass-panel group rounded-xl p-6 transition-all hover:scale-105">
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                    <div className="relative">
                      <div className="mb-2 flex items-center gap-2 font-mono text-2xl font-bold text-primary">
                        <Calendar className="h-5 w-5" />
                        {milestone.year}
                      </div>
                      <h3 className="mb-2 font-mono text-lg font-bold text-foreground">{milestone.title}</h3>
                      <p className="text-sm text-muted-foreground">{milestone.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="mt-12">
          <h3 className="mb-4 text-center font-mono text-xl font-bold text-primary">Certifications</h3>
          <div className="flex flex-wrap justify-center gap-3">
            <div className="glass-panel rounded-full px-4 py-2 text-sm font-medium text-foreground">
              AWS Certified Solutions Architect
            </div>
            <div className="glass-panel rounded-full px-4 py-2 text-sm font-medium text-foreground">
              Google Cloud Professional
            </div>
            <div className="glass-panel rounded-full px-4 py-2 text-sm font-medium text-foreground">
              Meta React Advanced Certification
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
