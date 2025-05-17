"use client"

import { useRef, useEffect } from "react"
import type { User } from "@/types/user"
import { departments } from "@/lib/departments"

interface MiniMapProps {
  currentDepartment: string
  users: User[]
}

export function MiniMap({ currentDepartment, users }: MiniMapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw background
    ctx.fillStyle = "#f5f5f5"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw department areas
    const departmentWidth = canvas.width / 5
    const departmentHeight = canvas.height / 5

    departments.forEach((dept, index) => {
      const row = Math.floor(index / 5)
      const col = index % 5
      const x = col * departmentWidth
      const y = row * departmentHeight

      // Department area
      ctx.fillStyle = dept === currentDepartment ? "#e0e0e0" : "#f0f0f0"
      ctx.fillRect(x, y, departmentWidth, departmentHeight)

      // Department border
      ctx.strokeStyle = dept === currentDepartment ? "#000000" : "#cccccc"
      ctx.lineWidth = dept === currentDepartment ? 2 : 1
      ctx.strokeRect(x, y, departmentWidth, departmentHeight)

      // Department label
      ctx.fillStyle = "#000000"
      ctx.font = "8px Arial"
      ctx.textAlign = "center"
      ctx.fillText(dept, x + departmentWidth / 2, y + departmentHeight / 2)
    })

    // Draw users
    users.forEach((user) => {
      const deptIndex = departments.indexOf(user.department)
      if (deptIndex >= 0) {
        const row = Math.floor(deptIndex / 5)
        const col = deptIndex % 5
        const x = col * departmentWidth + departmentWidth / 2
        const y = row * departmentHeight + departmentHeight / 2

        // User dot
        ctx.beginPath()
        ctx.arc(x, y, 3, 0, Math.PI * 2)
        ctx.fillStyle = user.department === currentDepartment ? "#ff0000" : "#0000ff"
        ctx.fill()
      }
    })
  }, [currentDepartment, users, departments])

  return (
    <div className="bg-background border rounded-md p-1 shadow-md">
      <canvas ref={canvasRef} width={150} height={150} className="w-[150px] h-[150px]" />
    </div>
  )
}
