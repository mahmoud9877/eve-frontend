"use client"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { departments } from "@/lib/departments"

interface DepartmentSelectorProps {
  currentDepartment: string
  onDepartmentChange: (department: string) => void
}

export function DepartmentSelector({ currentDepartment, onDepartmentChange }: DepartmentSelectorProps) {
  return (
    <div className="bg-white rounded-lg">
      <Select value={currentDepartment} onValueChange={onDepartmentChange}>
        <SelectTrigger className="w-[200px] border-none">
          <SelectValue placeholder="Select Department" />
        </SelectTrigger>
        <SelectContent>
          {departments.map((dept) => (
            <SelectItem key={dept} value={dept}>
              {dept}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
