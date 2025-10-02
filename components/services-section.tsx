"use client"

import { useEffect, useState } from "react"
import { Code, Smartphone, Plug, ShoppingCart, Cloud, Users } from "lucide-react"

const services = [
  {
    icon: Code,
    title: "Full-Stack Development",
    description: "End-to-end web applications with modern frameworks",
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    description: "Cross-platform apps with Flutter and React Native",
  },
  {
    icon: Plug,
    title: "API Integration & Development",
    description: "RESTful APIs and third-party integrations",
  },
  {
    icon: ShoppingCart,
    title: "E-commerce Solutions",
    description: "Complete online stores with payment gateways",
  },
  {
    icon: Cloud,
    title: "Cloud Architecture",
    description: "AWS, Google Cloud, and serverless solutions",
  },
  {
    icon: Users,
    title: "Technical Consulting",
    description: "Architecture planning and code reviews",
  },
]

export function ServicesSection({ scrollProgress }: { scrollProgress: number }) {
  const [isVisible, setIsVisible] = useState(false)
  const [opacity, setOpacity] = useState(0)

  useEffect(() => {
    if (scrollProgress >= 0.45 && scrollProgress <= 0.52) {
      setIsVisible(true)
      if (scrollProgress < 0.46) {
        setOpacity((scrollProgress - 0.45) / 0.01)
      } else if (scrollProgress > 0.51) {
        setOpacity((0.52 - scrollProgress) / 0.01)
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
          Services Offered
        </h2>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <div
                key={index}
                className="glass-panel group relative overflow-hidden rounded-xl p-4 transition-all hover:scale-105 md:p-6"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="relative">
                  <Icon className="mb-2 h-6 w-6 text-primary md:mb-4 md:h-8 md:w-8" />
                  <h3 className="mb-1 font-mono text-base font-bold text-foreground md:mb-2 md:text-lg">
                    {service.title}
                  </h3>
                  <p className="text-xs text-muted-foreground md:text-sm">{service.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
