"use client"

import { useRef, useState } from "react"
import { useFrame } from "@react-three/fiber"
import { Text, Sphere } from "@react-three/drei"
import * as THREE from "three"

interface ProjectStarProps {
  position: [number, number, number]
  color: string
  title: string
  onClick: () => void
}

export function ProjectStar({ position, color, title, onClick }: ProjectStarProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const glowRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.02
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1

      const scale = hovered ? 2.5 : 2
      meshRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1)
    }

    if (glowRef.current) {
      const pulseScale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.2
      glowRef.current.scale.set(pulseScale, pulseScale, pulseScale)
    }
  })

  return (
    <group position={position}>
      <Sphere
        ref={meshRef}
        args={[1, 64, 64]}
        onClick={onClick}
        onPointerOver={() => {
          setHovered(true)
          if (typeof document !== "undefined") {
            document.body.style.cursor = "pointer"
          }
        }}
        onPointerOut={() => {
          setHovered(false)
          if (typeof document !== "undefined") {
            document.body.style.cursor = "auto"
          }
        }}
      >
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={hovered ? 2 : 1}
          roughness={0.1}
          metalness={0.9}
        />
      </Sphere>

      <mesh ref={glowRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2, 0.1, 16, 100]} />
        <meshBasicMaterial color={color} transparent opacity={0.6} />
      </mesh>

      <mesh rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[2.3, 0.08, 16, 100]} />
        <meshBasicMaterial color={color} transparent opacity={0.3} />
      </mesh>

      <Text
        position={[0, 2.5, 0]}
        fontSize={0.5}
        color={color}
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.05}
        outlineColor="#000000"
      >
        {title}
      </Text>

      {hovered && (
        <Text
          position={[0, -2.5, 0]}
          fontSize={0.3}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.03}
          outlineColor="#000000"
        >
          Click to view project
        </Text>
      )}

      <pointLight position={[0, 0, 0]} intensity={hovered ? 3 : 1.5} color={color} distance={10} />
    </group>
  )
}
