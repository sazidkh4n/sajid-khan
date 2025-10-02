"use client"

import { useEffect, useState } from "react"

interface ProjectCardOverlayProps {
  scrollProgress: number
  projects: Array<{
    id: string
    title: string
    description: string
    scrollRange: [number, number]
  }>
  onProjectClick: (projectId: string) => void
}

export function ProjectCardOverlay({ scrollProgress, projects, onProjectClick }: ProjectCardOverlayProps) {
  const [activeProject, setActiveProject] = useState<string | null>(null)

  useEffect(() => {
    const active = projects.find(
      (project) => scrollProgress >= project.scrollRange[0] && scrollProgress <= project.scrollRange[1],
    )
    setActiveProject(active?.id || null)
  }, [scrollProgress, projects])

  const currentProject = projects.find((p) => p.id === activeProject)

  if (!currentProject) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-30 flex items-center justify-center p-8">
      <div className="glass-panel pointer-events-auto max-w-md animate-in fade-in slide-in-from-bottom-4 rounded-2xl p-6 duration-500">
        <div className="mb-4 flex items-center gap-3">
          <div className="h-3 w-3 animate-pulse rounded-full bg-primary" />
          <h3 className="font-mono text-sm uppercase tracking-wider text-primary">Featured Project</h3>
        </div>
        <h2 className="mb-3 text-balance text-2xl font-bold text-foreground">{currentProject.title}</h2>
        <p className="mb-4 text-pretty text-sm leading-relaxed text-muted-foreground">{currentProject.description}</p>
        <button
          onClick={() => onProjectClick(currentProject.id)}
          className="w-full rounded-lg bg-primary px-4 py-3 font-medium text-primary-foreground transition-all hover:scale-105 hover:shadow-lg hover:shadow-primary/50"
        >
          View Full Project Details
        </button>
        <p className="mt-3 text-center text-xs text-muted-foreground">or click the glowing star in 3D space</p>
      </div>
    </div>
  )
}
