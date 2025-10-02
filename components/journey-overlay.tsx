"use client"

import { useEffect, useState } from "react"

const journeySteps = [
  {
    title: "Chapter 1: The Genesis",
    text: "Jaipur, 2021. In a city of vibrant history, a new journey began—not of stone and forts, but of logic and light. The objective: to architect the digital future.",
    scrollStart: 0.0,
    scrollEnd: 0.12,
  },
  {
    title: "Chapter 2: The Foundation",
    text: "Poornima University (BCA - AI & Data Science), 2021-2024. To build the future, one must first understand the architecture of thought itself. Here, I mastered the fundamental languages of data, algorithms, and artificial intelligence, building the deep logical foundation for everything to come.",
    scrollStart: 0.12,
    scrollEnd: 0.25,
  },
  {
    title: "Skills Constellation",
    text: "Mastery across the full stack—from mobile to web, from frontend to backend, from design to deployment. Each skill a star in the constellation of modern development.",
    scrollStart: 0.25,
    scrollEnd: 0.38,
    isSection: true,
  },
  {
    title: "Chapter 3: The Crucible",
    text: "Freelance Foundations (Web Development). Theory must be forged in the crucible of reality. As a freelance developer, I mastered the core elements of the web—HTML, CSS, and JavaScript—transforming client visions into functional, tangible digital realities.",
    scrollStart: 0.38,
    scrollEnd: 0.45,
  },
]

export function JourneyOverlay() {
  const [activeStep, setActiveStep] = useState<number | null>(null)
  const [opacity, setOpacity] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollProgress = window.scrollY / (document.body.scrollHeight - window.innerHeight)

      // Find active step based on scroll position
      let foundStep: number | null = null
      let stepOpacity = 0

      journeySteps.forEach((step, index) => {
        if (scrollProgress >= step.scrollStart && scrollProgress <= step.scrollEnd) {
          foundStep = index
          // Calculate opacity within the step range
          const stepProgress = (scrollProgress - step.scrollStart) / (step.scrollEnd - step.scrollStart)
          // Fade in first 20%, stay visible 60%, fade out last 20%
          if (stepProgress < 0.2) {
            stepOpacity = stepProgress / 0.2
          } else if (stepProgress > 0.8) {
            stepOpacity = (1 - stepProgress) / 0.2
          } else {
            stepOpacity = 1
          }
        }
      })

      setActiveStep(foundStep)
      setOpacity(stepOpacity)
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Initial check
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (activeStep === null) return null

  const step = journeySteps[activeStep]

  return (
    <div
      className="pointer-events-none fixed inset-0 z-20 flex items-center justify-center p-4 transition-opacity duration-500 md:p-8"
      style={{ opacity }}
    >
      <div
        className={`glass-panel max-w-3xl rounded-2xl p-4 text-center md:rounded-3xl md:p-8 ${step.isSection ? "border-2 border-primary/30" : ""}`}
      >
        <h3
          className={`glow-text mb-3 font-mono text-xl font-bold md:mb-6 md:text-3xl ${step.isSection ? "text-primary" : "text-primary"}`}
        >
          {step.title}
        </h3>
        <p className="text-pretty text-sm leading-relaxed text-foreground md:text-lg">{step.text}</p>
      </div>
    </div>
  )
}
