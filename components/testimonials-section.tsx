"use client"

import { useEffect, useState } from "react"
import { Quote } from "lucide-react"

const testimonials = [
  {
    name: "Rajesh Sharma",
    role: "CEO",
    company: "TechVista Solutions",
    text: "Sajid delivered an exceptional e-commerce platform that exceeded our expectations. His expertise in full-stack development and attention to detail made the entire process seamless.",
    avatar: "RS",
  },
  {
    name: "Priya Mehta",
    role: "Product Manager",
    company: "InnovateLabs",
    text: "Working with Sajid on our mobile app was a game-changer. His Flutter expertise and ability to integrate complex APIs resulted in a robust, user-friendly application.",
    avatar: "PM",
  },
  {
    name: "Amit Verma",
    role: "CTO",
    company: "Digital Dynamics",
    text: "Sajid's technical consulting helped us architect a scalable cloud solution. His deep knowledge of AWS and modern development practices was invaluable to our team.",
    avatar: "AV",
  },
]

export function TestimonialsSection({ scrollProgress }: { scrollProgress: number }) {
  const [isVisible, setIsVisible] = useState(false)
  const [opacity, setOpacity] = useState(0)

  useEffect(() => {
    if (scrollProgress >= 0.75 && scrollProgress <= 0.81) {
      setIsVisible(true)
      if (scrollProgress < 0.76) {
        setOpacity((scrollProgress - 0.75) / 0.01)
      } else if (scrollProgress > 0.8) {
        setOpacity((0.81 - scrollProgress) / 0.01)
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
      <div className="w-full max-w-6xl px-6">
        <h2 className="glow-text mb-8 text-center font-mono text-3xl font-bold text-primary">Client Testimonials</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="glass-panel group relative overflow-hidden rounded-2xl p-6 transition-all hover:scale-105"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="relative">
                <Quote className="mb-4 h-8 w-8 text-primary opacity-50" />
                <p className="mb-6 text-sm leading-relaxed text-muted-foreground">{testimonial.text}</p>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 font-mono text-sm font-bold text-primary">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-mono text-sm font-bold text-foreground">{testimonial.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {testimonial.role}, {testimonial.company}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
