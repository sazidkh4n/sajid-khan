"use client"

import { useEffect, useState } from "react"

interface ContactOverlayProps {
  scrollProgress: number
}

const contactLinks = [
  {
    icon: "💻",
    title: "GitHub",
    subtitle: "View my code",
    url: "https://github.com/sazidkh4n",
  },
  {
    icon: "💼",
    title: "LinkedIn",
    subtitle: "Professional network",
    url: "https://www.linkedin.com/in/sazidkh4n/",
  },
  {
    icon: "🚀",
    title: "Upwork",
    subtitle: "Hire me",
    url: "https://www.upwork.com/freelancers/~01b7467e621536d77a",
  },
  {
    icon: "✉️",
    title: "Email",
    subtitle: "Direct contact",
    url: "mailto:sazid.kh4n@gmail.com",
  },
  {
    icon: "💬",
    title: "WhatsApp",
    subtitle: "Quick chat",
    url: "https://wa.me/919166609320",
  },
]

export function ContactOverlay({ scrollProgress }: ContactOverlayProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [opacity, setOpacity] = useState(0)

  useEffect(() => {
    if (scrollProgress >= 0.87) {
      setIsVisible(true)
      if (scrollProgress < 0.88) {
        setOpacity((scrollProgress - 0.87) / 0.01)
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
      className="pointer-events-none fixed inset-0 z-30 flex items-center justify-center transition-opacity duration-300"
      style={{ opacity }}
    >
      <div className="glass-panel pointer-events-auto max-w-3xl animate-fade-in rounded-2xl p-8 text-center">
        <h2 className="glow-text mb-3 font-mono text-4xl font-bold text-foreground">Connect With Me</h2>
        <p className="mb-6 text-lg text-muted-foreground">Click any glowing star to reach out</p>
        <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground md:grid-cols-5">
          {contactLinks.map((contact) => (
            <a
              key={contact.title}
              href={contact.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group cursor-pointer rounded-lg border border-primary/20 bg-primary/5 p-3 transition-all duration-300 hover:scale-105 hover:border-primary/50 hover:bg-primary/10 hover:shadow-lg hover:shadow-primary/20"
            >
              <div className="mb-1 text-2xl transition-transform duration-300 group-hover:scale-110">
                {contact.icon}
              </div>
              <div className="font-mono font-bold text-primary">{contact.title}</div>
              <div className="text-xs">{contact.subtitle}</div>
            </a>
          ))}
        </div>
        <div className="mt-6 animate-pulse text-xs text-primary">↑ Click the glowing stars above ↑</div>
      </div>
    </div>
  )
}
