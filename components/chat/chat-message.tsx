import { forwardRef } from "react"
import { Paperclip } from "lucide-react"
import { cn } from "@/lib/utils"

export type Attachment = {
  name: string
  url: string
  type?: string
}

export type Message = {
  id: string
  sender: "user" | "eve"
  content: string
  timestamp: Date
  attachments?: Attachment[]
}

interface ChatMessageProps {
  message: Message
  isCurrentUser: boolean
}

const ChatMessage = forwardRef<HTMLDivElement, ChatMessageProps>(({ message, isCurrentUser }, ref) => {
  const formattedTime = message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })

  return (
    <div
      ref={ref}
      className={cn("flex", {
        "justify-end": isCurrentUser,
        "justify-start": !isCurrentUser,
      })}
    >
      <div
        className={cn("max-w-[80%] rounded-lg p-3", {
          "bg-blue-600 text-white": isCurrentUser,
          "bg-white/20 text-white": !isCurrentUser,
        })}
      >
        <p className="whitespace-pre-wrap break-words">{message.content}</p>

        {message.attachments && message.attachments.length > 0 && (
          <div className="mt-2 space-y-2">
            {message.attachments.map((attachment, index) => (
              <div key={index} className="bg-white/10 rounded p-2 flex items-center">
                <Paperclip className="h-4 w-4 mr-2" />
                <a
                  href={attachment.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm truncate hover:underline"
                >
                  {attachment.name}
                </a>
              </div>
            ))}
          </div>
        )}

        <div className="text-xs opacity-70 mt-1 text-right">{formattedTime}</div>
      </div>
    </div>
  )
})

ChatMessage.displayName = "ChatMessage"

export default ChatMessage
