export interface ChatMessage {
  id: string
  sender: string
  content: string
  timestamp: Date
  dimensionId?: string
}
