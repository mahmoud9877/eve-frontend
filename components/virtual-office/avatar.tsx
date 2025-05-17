"use client"

import { useRef, useState, useEffect } from "react"
import { useFrame } from "@react-three/fiber"
import { Html } from "@react-three/drei"
import { Vector3 } from "three"
import type { User } from "@/types/user"

interface AvatarProps {
  user: User
  position: { x: number; y: number; z: number }
  updatePosition: (position: { x: number; y: number; z: number }) => void
}

export function Avatar({ user, position, updatePosition }: AvatarProps) {
  const groupRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)
  const targetPosition = useRef(new Vector3(position.x, position.y, position.z))

  // Status color mapping
  const statusColors = {
    online: "#4CAF50",
    away: "#FFC107",
    busy: "#F44336",
    inMeeting: "#9C27B0",
    offline: "#9E9E9E",
  }

  useEffect(() => {
    targetPosition.current.set(position.x, position.y, position.z)
  }, [position])

  useFrame(() => {
    if (groupRef.current) {
      // Smooth movement towards target position
      groupRef.current.position.lerp(targetPosition.current, 0.1)

      // Update position in state if moved significantly
      if (groupRef.current.position.distanceTo(targetPosition.current) < 0.01) {
        const newPos = groupRef.current.position
        updatePosition({ x: newPos.x, y: newPos.y, z: newPos.z })
      }
    }
  })

  return (
    <group
      ref={groupRef}
      position={[position.x, position.y, position.z]}
      onPointerOver={() => setIsHovered(true)}
      onPointerOut={() => setIsHovered(false)}
    >
      {/* Simple avatar representation instead of using a model */}
      <mesh position={[0, 0.9, 0]} castShadow>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color="#f0c080" />
      </mesh>
      <mesh position={[0, 0.4, 0]} castShadow>
        <cylinderGeometry args={[0.25, 0.4, 0.8, 16]} />
        <meshStandardMaterial color={user.department === "CF PS" ? "#2196f3" : "#607d8b"} />
      </mesh>

      {/* Status indicator */}
      <mesh position={[0, 1.5, 0]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color={statusColors[user.status] || statusColors.offline} />
      </mesh>

      {/* Nameplate */}
      <Html position={[0, 1.8, 0]} center distanceFactor={10} occlude>
        <div className={`px-2 py-1 rounded-md text-white text-xs ${isHovered ? "bg-black" : "bg-black/70"}`}>
          <div className="font-bold">{user.name}</div>
          {isHovered && (
            <>
              <div className="text-xs">{user.role}</div>
              <div className="text-xs">{user.department}</div>
            </>
          )}
        </div>
      </Html>
    </group>
  )
}
