import type { Position } from "./office"

export interface TimePoint {
  timestamp: Date
  userId: string
  position: Position
  status: string
  action: "move" | "status" | "join" | "leave"
  dimensionId?: string
}

export interface TimeSegment {
  start: Date
  end: Date
  description: string
  users: string[]
}
