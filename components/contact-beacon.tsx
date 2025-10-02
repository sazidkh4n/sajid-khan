"use client"

import { useRef, useState } from "react"
import { useFrame } from "@react-three/fiber"
import { Html, Line } from "@react-three/drei"
import type * as THREE from "three"

interface ContactStarProps {
  position: [number, number, number]
  label: string
  href: string
  color: string
  icon: string
}

function ContactStar({ position, label, href, color, icon }: ContactStarProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.02
      const scale = hovered ? 1.3 : 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1
      meshRef.current.scale.set(scale, scale, scale)
    }
  })

  const handleClick = () => {
    if (href.startsWith("mailto:")) {
      window.location.href = href
    } else {
      window.open(href, "_blank", "noopener,noreferrer")
    }
  }

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={handleClick}
        onPointerDown={(e) => {
          e.stopPropagation()
          handleClick()
        }}
      >
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={hovered ? 3 : 1.5}
          transparent
          opacity={0.9}
        />
      </mesh>

      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.2, 0.05, 16, 100]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={hovered ? 1 : 0.5}
          transparent
          opacity={0.6}
        />
      </mesh>

      <Html center distanceFactor={8} position={[0, -1.5, 0]}>
        <div className="pointer-events-auto cursor-pointer text-center" onClick={handleClick}>
          <div className="mb-1 text-2xl">{icon}</div>
          <div
            className={`font-mono text-sm font-bold transition-all ${
              hovered ? "scale-110 text-primary" : "text-muted-foreground"
            }`}
          >
            {label}
          </div>
          {hovered && <div className="mt-1 animate-pulse text-xs text-primary">Click to connect</div>}
        </div>
      </Html>

      <pointLight color={color} intensity={hovered ? 6 : 3} distance={10} />
    </group>
  )
}

interface ContactBeaconProps {
  position: [number, number, number]
}

export function ContactBeacon({ position }: ContactBeaconProps) {
  const contacts = [
    {
      position: [-4, 2, 0] as [number, number, number],
      label: "GitHub",
      href: "https://github.com/sazidkh4n",
      color: "#a78bfa",
      icon: "💻",
    },
    {
      position: [0, 3, 0] as [number, number, number],
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/sazidkh4n/",
      color: "#60a5fa",
      icon: "💼",
    },
    {
      position: [4, 2, 0] as [number, number, number],
      label: "Upwork",
      href: "https://www.upwork.com/freelancers/~01b7467e621536d77a",
      color: "#34d399",
      icon: "🚀",
    },
    {
      position: [-2, -2, 0] as [number, number, number],
      label: "Email",
      href: "mailto:sazid.kh4n@gmail.com",
      color: "#f472b6",
      icon: "✉️",
    },
    {
      position: [2, -2, 0] as [number, number, number],
      label: "WhatsApp",
      href: "https://wa.me/919166609320",
      color: "#4ade80",
      icon: "💬",
    },
  ]

  const connections = [
    [contacts[0].position, contacts[1].position],
    [contacts[1].position, contacts[2].position],
    [contacts[2].position, contacts[4].position],
    [contacts[4].position, contacts[3].position],
    [contacts[3].position, contacts[0].position],
    [contacts[0].position, contacts[2].position],
    [contacts[1].position, contacts[3].position],
    [contacts[1].position, contacts[4].position],
  ]

  return (
    <group position={position}>
      <mesh>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="#5eead4" emissive="#5eead4" emissiveIntensity={2} transparent opacity={0.8} />
      </mesh>

      {connections.map((points, i) => (
        <Line key={i} points={points} color="#5eead4" lineWidth={1} transparent opacity={0.3} />
      ))}

      {contacts.map((contact, i) => (
        <ContactStar key={i} {...contact} />
      ))}

      <pointLight color="#5eead4" intensity={3} distance={20} />
    </group>
  )
}
