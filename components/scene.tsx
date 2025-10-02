"use client"

import { useRef, useEffect, useState } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { Stars, Float, PerspectiveCamera } from "@react-three/drei"
import { ProjectStar } from "./project-star"
import { SkillNebula } from "./skill-nebula"
import { ParticleField } from "./particle-field"
import { ContactBeacon } from "./contact-beacon"

interface SceneProps {
  onProjectClick: (projectId: string) => void
}

const projects = [
  {
    id: "quickcore",
    position: [10, 4, -20],
    title: "QuickCore",
    color: "#5eead4",
  },
  {
    id: "jewel-jaipur",
    position: [-10, -4, -24],
    title: "The Jewel Jaipur",
    color: "#a78bfa",
  },
  {
    id: "woocommerce-platform",
    position: [8, -3, -28],
    title: "WooCommerce Platform",
    color: "#60a5fa",
  },
  {
    id: "ai-analytics",
    position: [-9, 3, -32],
    title: "AI Analytics Dashboard",
    color: "#f472b6",
  },
  {
    id: "social-network",
    position: [7, 5, -36],
    title: "Social Network",
    color: "#fbbf24",
  },
  {
    id: "analytics-tool",
    position: [-8, -5, -40],
    title: "Analytics Tool",
    color: "#34d399",
  },
]

const skills = [
  { position: [-8, 5, -10], scale: 1.8, color: "#5eead4", label: "Flutter", proficiency: "Expert", years: 5 },
  { position: [8, 4, -12], scale: 1.8, color: "#60a5fa", label: "React", proficiency: "Expert", years: 4 },
  { position: [-6, -4, -14], scale: 1.5, color: "#a78bfa", label: "Next.js", proficiency: "Expert", years: 4 },
  { position: [6, -5, -16], scale: 1.3, color: "#f472b6", label: "WordPress", proficiency: "Advanced", years: 5 },
  { position: [-9, 0, -18], scale: 1.2, color: "#fbbf24", label: "API Integration", proficiency: "Expert", years: 5 },
  {
    position: [9, 2, -20],
    scale: 1.4,
    color: "#34d399",
    label: "AI & Data Science",
    proficiency: "Intermediate",
    years: 2,
  },
  { position: [0, 6, -15], scale: 1.3, color: "#fb923c", label: "WooCommerce", proficiency: "Advanced", years: 4 },
]

export function Scene({ onProjectClick }: SceneProps) {
  const { camera } = useThree()
  const scrollProgress = useRef(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useFrame(() => {
    if (typeof window === "undefined" || typeof document === "undefined") return

    const targetScroll = window.scrollY / (document.body.scrollHeight - window.innerHeight)
    scrollProgress.current += (targetScroll - scrollProgress.current) * 0.05

    const cameraMultiplier = isMobile ? 0.5 : 1
    camera.position.z = 10 - scrollProgress.current * 60 * cameraMultiplier
    camera.position.y = Math.sin(scrollProgress.current * Math.PI) * 4 * cameraMultiplier
    camera.position.x = Math.cos(scrollProgress.current * Math.PI * 0.5) * 3 * cameraMultiplier

    camera.lookAt(0, 0, -20 - scrollProgress.current * 30 * cameraMultiplier)
  })

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 10]} />

      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#5eead4" />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#a78bfa" />

      <Stars radius={100} depth={50} count={isMobile ? 2000 : 5000} factor={4} saturation={0} fade speed={0.5} />

      {!isMobile && <ParticleField />}

      {skills.map((skill, index) => (
        <Float key={index} speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
          <SkillNebula
            position={skill.position as [number, number, number]}
            scale={skill.scale}
            color={skill.color}
            label={skill.label}
            proficiency={skill.proficiency}
            years={skill.years}
          />
        </Float>
      ))}

      {projects.map((project) => (
        <Float key={project.id} speed={3} rotationIntensity={0.5} floatIntensity={0.8}>
          <ProjectStar
            position={project.position as [number, number, number]}
            color={project.color}
            title={project.title}
            onClick={() => onProjectClick(project.id)}
          />
        </Float>
      ))}

      <ContactBeacon position={[0, 0, -48]} />
    </>
  )
}
