"use client"

import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface FloorSelectorProps {
  currentFloor: string
  floors: string[]
  onFloorChange: (floor: string) => void
}

export function FloorSelector({ currentFloor, floors, onFloorChange }: FloorSelectorProps) {
  return (
    <div className="absolute left-4 top-20 z-10 bg-white rounded-md shadow-md">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-40 justify-between">
            {currentFloor}
            <ChevronDown className="h-4 w-4 ml-2" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {floors.map((floor) => (
            <DropdownMenuItem
              key={floor}
              onClick={() => onFloorChange(floor)}
              className={floor === currentFloor ? "bg-accent" : ""}
            >
              {floor}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
