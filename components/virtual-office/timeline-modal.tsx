"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { formatDate } from "@/lib/utils"
import type { TimePoint } from "@/types/time"

interface TimelineModalProps {
  timePoints: TimePoint[]
  currentTime: Date
  onJumpToTime: (timePoint: TimePoint) => void
  onClose: () => void
}

export function TimelineModal({ timePoints, currentTime, onJumpToTime, onClose }: TimelineModalProps) {
  const [activeTab, setActiveTab] = useState("timeline")
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null)

  // Group time points by day
  const timePointsByDay = timePoints.reduce(
    (acc, timePoint) => {
      const date = new Date(timePoint.timestamp)
      const day = date.toDateString()

      if (!acc[day]) {
        acc[day] = []
      }

      acc[day].push(timePoint)
      return acc
    },
    {} as Record<string, TimePoint[]>,
  )

  // Get unique user IDs from time points
  const userIds = Array.from(new Set(timePoints.map((tp) => tp.userId)))

  // Filter time points by selected user
  const filteredTimePoints = selectedUserId ? timePoints.filter((tp) => tp.userId === selectedUserId) : timePoints

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Time Navigation</DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 overflow-hidden flex flex-col">
          <TabsList>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="heatmap">Activity Heatmap</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
          </TabsList>

          <TabsContent value="timeline" className="flex-1 overflow-hidden flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium">Time Events</h3>

              {userIds.length > 0 && (
                <select
                  className="text-xs border rounded p-1"
                  value={selectedUserId || ""}
                  onChange={(e) => setSelectedUserId(e.target.value || null)}
                >
                  <option value="">All Users</option>
                  {userIds.map((id) => (
                    <option key={id} value={id}>
                      User {id}
                    </option>
                  ))}
                </select>
              )}
            </div>

            <div className="flex-1 overflow-y-auto pr-2">
              {Object.entries(timePointsByDay).map(([day, points]) => (
                <div key={day} className="mb-4">
                  <h4 className="text-xs font-medium text-gray-500 mb-2">{day}</h4>

                  <div className="space-y-2">
                    {points
                      .filter((tp) => !selectedUserId || tp.userId === selectedUserId)
                      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
                      .map((timePoint, index) => (
                        <div
                          key={index}
                          className="p-2 border rounded-md hover:bg-gray-50 cursor-pointer flex items-center justify-between"
                          onClick={() => onJumpToTime(timePoint)}
                        >
                          <div>
                            <div className="text-sm font-medium">
                              {timePoint.action === "move" ? "Movement" : "Status Change"}
                            </div>
                            <div className="text-xs text-gray-500">
                              User {timePoint.userId} • {formatDate(new Date(timePoint.timestamp))}
                            </div>
                            {timePoint.action === "status" && (
                              <div className="text-xs mt-1">Status: {timePoint.status}</div>
                            )}
                          </div>

                          <Button size="sm" variant="ghost">
                            Jump
                          </Button>
                        </div>
                      ))}
                  </div>
                </div>
              ))}

              {filteredTimePoints.length === 0 && (
                <div className="text-center py-8 text-gray-500">No time points available</div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="heatmap" className="flex-1 overflow-auto">
            <div className="p-4 h-full flex items-center justify-center">
              <div className="text-center">
                <h3 className="text-lg font-medium mb-2">Activity Heatmap</h3>
                <p className="text-gray-500">Visualize user activity across time and space</p>
                <div className="mt-4 p-4 bg-gray-100 rounded-md">
                  <div className="w-full h-64 bg-white rounded border relative">
                    {/* Render heatmap visualization here */}
                    {timePoints.map((tp, i) => (
                      <div
                        key={i}
                        className="absolute w-2 h-2 rounded-full bg-red-500 opacity-30"
                        style={{
                          left: `${(tp.position.x / 3000) * 100}%`,
                          top: `${(tp.position.y / 2000) * 100}%`,
                        }}
                      />
                    ))}
                  </div>
                  <div className="mt-2 text-xs text-gray-500">Showing {timePoints.length} activity points</div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="users" className="flex-1 overflow-auto">
            <div className="p-4">
              <h3 className="text-sm font-medium mb-4">User Activity Timeline</h3>

              {userIds.map((userId) => {
                const userTimePoints = timePoints.filter((tp) => tp.userId === userId)

                return (
                  <div key={userId} className="mb-6">
                    <h4 className="text-sm font-medium mb-2">User {userId}</h4>

                    <div className="relative h-8 bg-gray-100 rounded-full overflow-hidden">
                      {userTimePoints.map((tp, i) => {
                        const timeOffset = new Date(tp.timestamp).getTime() - new Date().getTime()
                        const position = (timeOffset / (48 * 60 * 60 * 1000) + 0.5) * 100

                        return (
                          <div
                            key={i}
                            className={`absolute w-2 h-2 rounded-full transform -translate-x-1/2 -translate-y-1/2 top-1/2 ${
                              tp.action === "move" ? "bg-blue-500" : "bg-green-500"
                            }`}
                            style={{ left: `${Math.max(0, Math.min(100, position))}%` }}
                            title={formatDate(new Date(tp.timestamp))}
                          />
                        )
                      })}

                      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-red-500" />
                    </div>

                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>-24h</span>
                      <span>Now</span>
                      <span>+24h</span>
                    </div>
                  </div>
                )
              })}

              {userIds.length === 0 && <div className="text-center py-8 text-gray-500">No user activity recorded</div>}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
