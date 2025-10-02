"use client"

import { Download, Menu, X } from "lucide-react"
import { useState } from "react"

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const scrollToSection = (sectionId: string) => {
    const scrollPositions: Record<string, number> = {
      home: 0,
      journey: window.innerHeight * 1.5,
      skills: window.innerHeight * 2,
      work: window.innerHeight * 4,
      contact: window.innerHeight * 9,
    }

    window.scrollTo({
      top: scrollPositions[sectionId] || 0,
      behavior: "smooth",
    })

    setMobileMenuOpen(false)
  }

  const handleResumeDownload = () => {
    const link = document.createElement("a")
    link.href = "/resume.pdf"
    link.download = "Sajid_Khan_Resume.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    setMobileMenuOpen(false)
  }

  return (
    <>
      <nav className="fixed left-0 right-0 top-0 z-50 p-3 md:p-6">
        <div className="glass-panel mx-auto max-w-7xl rounded-xl px-4 py-3 md:rounded-2xl md:px-6 md:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary font-mono text-xs font-bold text-primary-foreground md:h-8 md:w-8 md:text-sm">
                SK
              </div>
              <span className="font-mono text-base font-bold text-foreground md:text-lg">Sajid Khan</span>
            </div>

            <div className="hidden items-center gap-8 md:flex">
              <button
                onClick={() => scrollToSection("journey")}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                JOURNEY
              </button>
              <button
                onClick={() => scrollToSection("skills")}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                SKILLS
              </button>
              <button
                onClick={() => scrollToSection("work")}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                WORK
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                CONTACT
              </button>
              <button
                onClick={handleResumeDownload}
                className="glow-border flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-all hover:scale-105"
              >
                <Download className="h-4 w-4" />
                RESUME
              </button>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex items-center justify-center rounded-lg p-2 text-foreground transition-colors hover:bg-primary/10 md:hidden"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-background/95 backdrop-blur-lg"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="glass-panel relative mx-4 mt-20 rounded-2xl p-6">
            <div className="flex flex-col gap-4">
              <button
                onClick={() => scrollToSection("journey")}
                className="rounded-lg p-3 text-left text-base font-medium text-foreground transition-colors hover:bg-primary/10"
              >
                JOURNEY
              </button>
              <button
                onClick={() => scrollToSection("skills")}
                className="rounded-lg p-3 text-left text-base font-medium text-foreground transition-colors hover:bg-primary/10"
              >
                SKILLS
              </button>
              <button
                onClick={() => scrollToSection("work")}
                className="rounded-lg p-3 text-left text-base font-medium text-foreground transition-colors hover:bg-primary/10"
              >
                WORK
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="rounded-lg p-3 text-left text-base font-medium text-foreground transition-colors hover:bg-primary/10"
              >
                CONTACT
              </button>
              <button
                onClick={handleResumeDownload}
                className="glow-border flex items-center justify-center gap-2 rounded-lg bg-primary p-3 text-base font-medium text-primary-foreground transition-all hover:scale-105"
              >
                <Download className="h-5 w-5" />
                DOWNLOAD RESUME
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
