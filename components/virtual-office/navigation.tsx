"use client"

import type React from "react"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Map, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { departments } from "@/lib/departments"

interface NavigationProps {
  currentDepartment: string
  onDepartmentChange: (department: string) => void
}

export function Navigation({ currentDepartment, onDepartmentChange }: NavigationProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const currentIndex = departments.indexOf(currentDepartment)
  const prevDepartment = currentIndex > 0 ? departments[currentIndex - 1] : null
  const nextDepartment = currentIndex < departments.length - 1 ? departments[currentIndex + 1] : null

  const filteredDepartments = departments.filter((dept) => dept.toLowerCase().includes(searchQuery.toLowerCase()))

  const handlePrevious = () => {
    if (prevDepartment) {
      onDepartmentChange(prevDepartment)
    }
  }

  const handleNext = () => {
    if (nextDepartment) {
      onDepartmentChange(nextDepartment)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (filteredDepartments.length > 0) {
      onDepartmentChange(filteredDepartments[0])
    }
  }

  return (
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 flex items-center gap-2">
      <Button variant="outline" size="icon" onClick={handlePrevious} disabled={!prevDepartment}>
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <div className="bg-background/90 backdrop-blur-sm rounded-lg p-2 flex items-center gap-2">
        <form onSubmit={handleSearch} className="relative">
          <Search className="h-4 w-4 absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            className="pl-8 h-8 w-40"
            placeholder="Search departments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Map className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center">
            {departments.map((dept) => (
              <DropdownMenuItem
                key={dept}
                onClick={() => onDepartmentChange(dept)}
                className={dept === currentDepartment ? "bg-accent" : ""}
              >
                {dept}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="text-sm font-medium px-2">{currentDepartment}</div>
      </div>

      <Button variant="outline" size="icon" onClick={handleNext} disabled={!nextDepartment}>
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}
