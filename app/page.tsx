"use client"

import dynamic from "next/dynamic"
import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { HeroOverlay } from "@/components/hero-overlay"
import { JourneyOverlay } from "@/components/journey-overlay"
import { ProjectModal } from "@/components/project-modal"
import { LoadingScreen } from "@/components/loading-screen"
import { ScrollIndicator } from "@/components/scroll-indicator"
import { ProjectCardOverlay } from "@/components/project-card-overlay"
import { ContactOverlay } from "@/components/contact-overlay"
import { WorkSectionOverlay } from "@/components/work-section-overlay"
import { ServicesSection } from "@/components/services-section"
import { StatsSection } from "@/components/stats-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { TimelineSection } from "@/components/timeline-section"
import { AvailabilityBadge } from "@/components/availability-badge"

const Canvas = dynamic(() => import("@react-three/fiber").then((mod) => ({ default: mod.Canvas })), {
  ssr: false,
})

const Scene = dynamic(() => import("@/components/scene").then((mod) => ({ default: mod.Scene })), {
  ssr: false,
})

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    if (typeof document !== "undefined") {
      document.body.style.height = "1000vh"
    }

    const handleScroll = () => {
      if (typeof window !== "undefined" && typeof document !== "undefined") {
        const progress = window.scrollY / (document.body.scrollHeight - window.innerHeight)
        setScrollProgress(progress)
      }
    }

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll)
    }

    return () => {
      if (typeof document !== "undefined") {
        document.body.style.height = ""
      }
      if (typeof window !== "undefined") {
        window.removeEventListener("scroll", handleScroll)
      }
    }
  }, [])

  const projectData = [
    {
      id: "quickcore",
      title: "QuickCore",
      description:
        "A Flutter-based mobile app with Supabase backend, AWS S3 integration, and real-time data synchronization.",
      scrollRange: [0.58, 0.61] as [number, number],
    },
    {
      id: "jewel-jaipur",
      title: "The Jewel Jaipur",
      description:
        "Full-stack e-commerce platform with WordPress backend, React/Next.js frontend, and integrated payment/shipping APIs.",
      scrollRange: [0.61, 0.64] as [number, number],
    },
    {
      id: "woocommerce-platform",
      title: "WooCommerce Platform",
      description: "Custom e-commerce solution with multi-gateway payments and real-time inventory synchronization.",
      scrollRange: [0.64, 0.67] as [number, number],
    },
    {
      id: "ai-analytics",
      title: "AI Analytics Dashboard",
      description:
        "Machine learning-powered analytics platform with real-time data processing and predictive insights.",
      scrollRange: [0.67, 0.7] as [number, number],
    },
    {
      id: "social-network",
      title: "Social Network",
      description: "Modern social platform with real-time messaging, media sharing, and community features.",
      scrollRange: [0.7, 0.73] as [number, number],
    },
    {
      id: "analytics-tool",
      title: "Analytics Tool",
      description: "Business intelligence platform with customizable dashboards and automated reporting.",
      scrollRange: [0.73, 0.75] as [number, number],
    },
  ]

  return (
    <main className="relative h-screen w-full overflow-hidden bg-background">
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      <Navigation />
      <HeroOverlay />
      <JourneyOverlay />
      <ScrollIndicator />
      <AvailabilityBadge />

      <ServicesSection scrollProgress={scrollProgress} />
      <StatsSection scrollProgress={scrollProgress} />
      <WorkSectionOverlay scrollProgress={scrollProgress} />
      <ProjectCardOverlay scrollProgress={scrollProgress} projects={projectData} onProjectClick={setSelectedProject} />
      <TestimonialsSection scrollProgress={scrollProgress} />
      <TimelineSection scrollProgress={scrollProgress} />
      <ContactOverlay scrollProgress={scrollProgress} />

      {mounted && (
        <div className="pointer-events-none fixed inset-0">
          <Canvas
            className="pointer-events-auto"
            gl={{
              antialias: true,
              alpha: true,
              powerPreference: "high-performance",
            }}
            dpr={[1, 2]}
          >
            <Scene onProjectClick={setSelectedProject} />
          </Canvas>
        </div>
      )}

      {selectedProject && <ProjectModal projectId={selectedProject} onClose={() => setSelectedProject(null)} />}
    </main>
  )
}
