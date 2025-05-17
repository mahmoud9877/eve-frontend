"use client"

import { useRef, useEffect } from "react"
import type { Dimension } from "@/types/dimension"

interface DimensionVisualizationProps {
  dimensions: Dimension[]
  currentDimension: Dimension
  onSelectDimension: (dimensionId: string) => void
}

export function DimensionVisualization({
  dimensions,
  currentDimension,
  onSelectDimension,
}: DimensionVisualizationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Create a visualization of the dimension tree/network
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Set up dimensions for visualization
    const nodeRadius = 20
    const horizontalSpacing = 120
    const verticalSpacing = 80

    // Create a map of dimensions by parent ID
    const dimensionsByParent: Record<string, Dimension[]> = {}
    dimensions.forEach((dimension) => {
      const parentId = dimension.parentId || "root"
      if (!dimensionsByParent[parentId]) {
        dimensionsByParent[parentId] = []
      }
      dimensionsByParent[parentId].push(dimension)
    })

    // Calculate positions for each dimension node
    const positions: Record<string, { x: number; y: number }> = {}

    // Helper function to position nodes in a tree layout
    const positionNodes = (parentId: string, level: number, index: number, totalSiblings: number) => {
      const children = dimensionsByParent[parentId] || []

      children.forEach((dimension, i) => {
        // Calculate x position based on level
        const x = 100 + level * horizontalSpacing

        // Calculate y position based on index within siblings
        const siblingCount = children.length
        const y = 50 + ((canvas.height - 100) * (i + 0.5)) / siblingCount

        positions[dimension.id] = { x, y }

        // Position children
        if (dimensionsByParent[dimension.id]) {
          positionNodes(dimension.id, level + 1, i, siblingCount)
        }
      })
    }

    // Start positioning from root nodes
    positionNodes("root", 0, 0, dimensionsByParent["root"]?.length || 1)

    // Draw connections between dimensions
    ctx.strokeStyle = "#aaa"
    ctx.lineWidth = 1

    dimensions.forEach((dimension) => {
      if (dimension.parentId && positions[dimension.parentId] && positions[dimension.id]) {
        const parent = positions[dimension.parentId]
        const current = positions[dimension.id]

        ctx.beginPath()
        ctx.moveTo(parent.x, parent.y)
        ctx.lineTo(current.x, current.y)
        ctx.stroke()
      }
    })

    // Draw dimension nodes
    dimensions.forEach((dimension) => {
      const pos = positions[dimension.id]
      if (!pos) return

      // Draw circle
      ctx.beginPath()
      ctx.arc(pos.x, pos.y, nodeRadius, 0, Math.PI * 2)

      // Highlight current dimension
      if (dimension.id === currentDimension.id) {
        ctx.fillStyle = "#3b82f6"
      } else {
        ctx.fillStyle = "#64748b"
      }

      ctx.fill()

      // Draw text
      ctx.fillStyle = "#fff"
      ctx.font = "10px Arial"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(dimension.name.substring(0, 3), pos.x, pos.y)

      // Add click handler
      canvas.onclick = (e) => {
        const rect = canvas.getBoundingClientRect()
        const mouseX = e.clientX - rect.left
        const mouseY = e.clientY - rect.top

        dimensions.forEach((dim) => {
          const pos = positions[dim.id]
          if (!pos) return

          // Check if click is within node
          const distance = Math.sqrt(Math.pow(mouseX - pos.x, 2) + Math.pow(mouseY - pos.y, 2))
          if (distance <= nodeRadius) {
            onSelectDimension(dim.id)
          }
        })
      }
    })
  }, [dimensions, currentDimension, onSelectDimension])

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="text-sm font-medium mb-2">Dimension Map</h3>
      <canvas ref={canvasRef} width={500} height={300} className="w-full h-[300px] border rounded" />
    </div>
  )
}
