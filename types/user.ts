export interface User {
  id: string
  name: string
  role: string
  status: string
  isActive: boolean
  isMicrophoneOn: boolean
  isVideoOn?: boolean
  photoUrl?: string
  color?: string
  position: {
    x: number
    y: number
  }
}

export type UserStatus = "online" | "away" | "busy" | "inMeeting" | "offline"
