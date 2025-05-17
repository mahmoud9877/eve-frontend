"use client"

import { Layers, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import type { Dimension } from "@/types/dimension"

interface DimensionControlsProps {
  currentDimension?: Dimension
  dimensionsCount: number
  onOpenDimensionModal: () => void
  isMobile?: boolean
}

export function DimensionControls({
  currentDimension,
  dimensionsCount,
  onOpenDimensionModal,
  isMobile = false,
}: DimensionControlsProps) {
  if (isMobile) {
    return (
      <div className="absolute left-4 top-20 z-10">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="bg-white shadow-md">
              <Layers className="h-4 w-4 mr-1" />
              <span className="text-xs max-w-[80px] truncate">{currentDimension?.name || "Default Dimension"}</span>
              <Badge variant="outline" className="ml-1 h-5 min-w-[20px] px-1">
                {dimensionsCount}
              </Badge>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-72 p-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium">Current Dimension</h4>
                <Badge variant="outline">{dimensionsCount}</Badge>
              </div>

              <div className="px-3 py-2 bg-primary/10 rounded-md">
                <div className="font-medium">{currentDimension?.name || "Default Dimension"}</div>
                <div className="text-muted-foreground text-xs mt-1 line-clamp-2">
                  {currentDimension?.description || "The main office configuration"}
                </div>
              </div>

              <Button size="sm" className="w-full" onClick={onOpenDimensionModal}>
                <Plus className="h-3 w-3 mr-1" />
                Manage Dimensions
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    )
  }

  return (
    <div className="absolute left-4 top-32 z-10 bg-white rounded-md shadow-md">
      <div className="p-2 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Dimension</span>
          </div>
          <Badge variant="outline" className="ml-2">
            {dimensionsCount}
          </Badge>
        </div>

        <div className="px-2 py-1 bg-primary/10 rounded-md text-xs">
          <div className="font-medium">{currentDimension?.name || "Default Dimension"}</div>
          <div className="text-muted-foreground text-[10px] mt-0.5 line-clamp-1">
            {currentDimension?.description || "The main office configuration"}
          </div>
        </div>

        <Button size="sm" variant="outline" className="w-full" onClick={onOpenDimensionModal}>
          <Plus className="h-3 w-3 mr-1" />
          Manage Dimensions
        </Button>
      </div>
    </div>
  )
}
