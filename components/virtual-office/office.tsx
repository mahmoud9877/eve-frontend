"use client"

import { useEffect, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import type { Group } from "three"
import { departmentConfigs } from "@/lib/department-configs"

interface OfficeProps {
  currentDepartment: string
}

export function Office({ currentDepartment }: OfficeProps) {
  const groupRef = useRef<Group>(null)

  // Get department configuration
  const departmentConfig = departmentConfigs[currentDepartment] || departmentConfigs["CF PS"]

  useEffect(() => {
    if (groupRef.current) {
      // Apply department-specific transformations
      groupRef.current.position.set(
        departmentConfig.position.x,
        departmentConfig.position.y,
        departmentConfig.position.z,
      )
    }
  }, [currentDepartment, departmentConfig])

  useFrame(() => {
    // Any per-frame updates can go here
  })

  return (
    <group ref={groupRef}>
      {/* Basic office environment instead of loading external model */}
      {/* Floor */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color={departmentConfig.floorColor} opacity={0.8} transparent />
      </mesh>

      {/* Walls */}
      <mesh position={[0, 2, -25]} receiveShadow castShadow>
        <boxGeometry args={[50, 4, 0.1]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[0, 2, 25]} receiveShadow castShadow>
        <boxGeometry args={[50, 4, 0.1]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[-25, 2, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow castShadow>
        <boxGeometry args={[50, 4, 0.1]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[25, 2, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow castShadow>
        <boxGeometry args={[50, 4, 0.1]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>

      {/* Department label */}
      <group position={[0, 4, -10]}>
        <mesh>
          <boxGeometry args={[10, 1, 0.1]} />
          <meshStandardMaterial color={departmentConfig.accentColor} />
        </mesh>
      </group>

      {/* Add desks, meeting areas, etc. based on department */}
      {departmentConfig.deskPositions.map((position, index) => (
        <group key={`desk-${index}`} position={[position.x, position.y, position.z]}>
          <mesh receiveShadow castShadow>
            <boxGeometry args={[2, 0.05, 1]} />
            <meshStandardMaterial color="#8B4513" />
          </mesh>
          <mesh position={[0, -0.5, 0]} receiveShadow castShadow>
            <boxGeometry args={[0.1, 1, 0.1]} />
            <meshStandardMaterial color="#8B4513" />
          </mesh>
          {/* Chair */}
          <mesh position={[0, -0.25, 0.75]} receiveShadow castShadow>
            <boxGeometry args={[0.6, 0.1, 0.6]} />
            <meshStandardMaterial color="#444444" />
          </mesh>
          <mesh position={[0, 0.25, 1]} receiveShadow castShadow>
            <boxGeometry args={[0.6, 0.5, 0.1]} />
            <meshStandardMaterial color="#444444" />
          </mesh>
        </group>
      ))}

      {/* Meeting areas */}
      {departmentConfig.meetingAreas.map((area, index) => (
        <group key={`meeting-${index}`} position={[area.position.x, area.position.y, area.position.z]}>
          {/* Table */}
          <mesh receiveShadow castShadow position={[0, 0.4, 0]}>
            <cylinderGeometry args={[area.size, area.size, 0.05, 32]} />
            <meshStandardMaterial color="#555555" />
          </mesh>
          {/* Table leg */}
          <mesh receiveShadow castShadow position={[0, 0, 0]}>
            <cylinderGeometry args={[0.2, 0.2, 0.8, 16]} />
            <meshStandardMaterial color="#333333" />
          </mesh>

          {/* Chairs around the table */}
          {Array.from({ length: 8 }).map((_, chairIndex) => {
            const angle = (chairIndex / 8) * Math.PI * 2
            const chairX = Math.sin(angle) * (area.size + 0.5)
            const chairZ = Math.cos(angle) * (area.size + 0.5)
            return (
              <group key={`chair-${index}-${chairIndex}`} position={[chairX, 0, chairZ]} rotation={[0, -angle, 0]}>
                <mesh receiveShadow castShadow position={[0, 0.25, 0]}>
                  <boxGeometry args={[0.5, 0.1, 0.5]} />
                  <meshStandardMaterial color="#444444" />
                </mesh>
                <mesh receiveShadow castShadow position={[0, 0.6, -0.25]}>
                  <boxGeometry args={[0.5, 0.5, 0.1]} />
                  <meshStandardMaterial color="#444444" />
                </mesh>
              </group>
            )
          })}
        </group>
      ))}
    </group>
  )
}
