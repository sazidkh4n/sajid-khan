"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Text } from "@react-three/drei"
import type * as THREE from "three"

interface SkillNebulaProps {
  position: [number, number, number]
  scale: number
  color: string
  label: string
  proficiency?: string
  years?: number
}

export function SkillNebula({ position, scale, color, label, proficiency = "Advanced", years = 3 }: SkillNebulaProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const ringRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.002
      meshRef.current.rotation.y += 0.003
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += 0.01
    }
  })

  const proficiencyLevel = proficiency === "Expert" ? 1 : proficiency === "Advanced" ? 0.75 : 0.5
  const ringScale = scale * 1.3 * proficiencyLevel

  return (
    <group position={position}>
      <mesh ref={meshRef} scale={scale}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.3}
          wireframe
          transparent
          opacity={0.4}
        />
      </mesh>

      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]} scale={ringScale}>
        <ringGeometry args={[1.2, 1.3, 32]} />
        <meshBasicMaterial color={color} transparent opacity={0.6} />
      </mesh>

      <Text position={[0, -1.5, 0]} fontSize={0.4} color={color} anchorX="center" anchorY="middle">
        {label}
      </Text>

      <Text position={[0, -2, 0]} fontSize={0.25} color={color} anchorX="center" anchorY="middle" opacity={0.7}>
        {proficiency} • {years}y
      </Text>
    </group>
  )
}
