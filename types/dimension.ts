import type { Position } from "./office"

export interface DimensionAnomaly {
  areaId: string
  name: string
  x: number
  y: number
  radius: number
  color: string
}

export interface DimensionPortal {
  position: Position
  targetId: string
  targetName: string
  color?: string
}

export interface Dimension {
  id: string
  name: string
  description: string
  createdAt: string
  userCount: number
  color?: string
  officeConfig: Record<string, any>
  parentId: string | null
  effects?: {
    avatarEffect: string | null
  }
  anomalies?: DimensionAnomaly[]
  portals?: DimensionPortal[]
  weather?: string | null
  decorations?: Record<string, any[]>
}
