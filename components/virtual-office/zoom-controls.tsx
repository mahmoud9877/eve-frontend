"use client"

import { Plus, Minus, Maximize } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ZoomControlsProps {
  onZoomIn: () => void
  onZoomOut: () => void
  onCenter: () => void
  scale: number
}

export function ZoomControls({ onZoomIn, onZoomOut, onCenter, scale }: ZoomControlsProps) {
  return (
    <div className="absolute right-4 top-20 z-10 flex flex-col bg-white rounded-md shadow-md">
      <Button variant="ghost" size="icon" onClick={onZoomIn}>
        <Plus className="h-4 w-4" />
      </Button>

      <div className="px-2 py-1 text-xs text-center border-t border-b">{Math.round(scale * 100)}%</div>

      <Button variant="ghost" size="icon" onClick={onZoomOut}>
        <Minus className="h-4 w-4" />
      </Button>

      <div className="border-t w-full" />

      <Button variant="ghost" size="icon" onClick={onCenter}>
        <Maximize className="h-4 w-4" />
      </Button>
    </div>
  )
}
