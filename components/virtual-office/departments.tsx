"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { departmentDetails } from "@/lib/department-details"

interface DepartmentsProps {
  currentDepartment: string
}

export function Departments({ currentDepartment }: DepartmentsProps) {
  const [activeTab, setActiveTab] = useState("info")

  const departmentInfo = departmentDetails[currentDepartment] || {
    description: "Department information not available",
    headcount: 0,
    manager: "Not assigned",
    metrics: [],
  }

  return (
    <Card className="w-80 shadow-lg">
      <CardHeader className="pb-2">
        <CardTitle>{currentDepartment}</CardTitle>
        <CardDescription>Department Information</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-2">
            <TabsTrigger value="info">Info</TabsTrigger>
            <TabsTrigger value="metrics">Metrics</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
          </TabsList>

          <TabsContent value="info" className="space-y-2">
            <p className="text-sm">{departmentInfo.description}</p>
            <div className="text-sm">
              <div className="flex justify-between py-1">
                <span className="font-medium">Manager:</span>
                <span>{departmentInfo.manager}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="font-medium">Headcount:</span>
                <span>{departmentInfo.headcount}</span>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="metrics" className="space-y-2">
            {departmentInfo.metrics.length > 0 ? (
              departmentInfo.metrics.map((metric, index) => (
                <div key={index} className="flex justify-between py-1 text-sm">
                  <span className="font-medium">{metric.name}:</span>
                  <span>{metric.value}</span>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">No metrics available</p>
            )}
          </TabsContent>

          <TabsContent value="team" className="space-y-2">
            {departmentInfo.team ? (
              departmentInfo.team.map((member, index) => (
                <div key={index} className="flex items-center gap-2 py-1">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs">
                    {member.name.charAt(0)}
                  </div>
                  <div className="text-sm">
                    <div>{member.name}</div>
                    <div className="text-xs text-muted-foreground">{member.role}</div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">No team members available</p>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
