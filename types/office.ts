export interface Position {
  x: number
  y: number
}

export interface Furniture {
  type: string
  x: number
  y: number
  width?: number
  height?: number
}

export interface Wall {
  x: number
  y: number
  width: number
  height: number
}

export interface ConversationZone {
  name: string
  x: number
  y: number
  radius: number
}

export interface OfficeArea {
  id: string
  name: string
  position: Position
  width: number
  height: number
  floorColor?: string
  walls?: Wall[]
  furniture?: Furniture[]
  conversationZones?: ConversationZone[]
}

export interface Connection {
  x: number
  y: number
  width: number
  height: number
}

export interface OfficeFloor {
  id: string
  areas: OfficeArea[]
  connections?: Connection[]
}
