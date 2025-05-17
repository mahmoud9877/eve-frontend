"use client"

import {
  MessageSquare,
  Users,
  Mic,
  MicOff,
  Video,
  VideoOff,
  Share,
  ShareIcon as ShareOff,
  ZoomIn,
  ZoomOut,
  Maximize,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface BottomToolbarProps {
  onToggleChat: () => void
  onTogglePeople: () => void
  isChatActive: boolean
  isPeopleActive: boolean
  onZoomIn?: () => void
  onZoomOut?: () => void
  onCenter?: () => void
}

export function BottomToolbar({
  onToggleChat,
  onTogglePeople,
  isChatActive,
  isPeopleActive,
  onZoomIn,
  onZoomOut,
  onCenter,
}: BottomToolbarProps) {
  const [isMicOn, setIsMicOn] = useState(true)
  const [isVideoOn, setIsVideoOn] = useState(true)
  const [isScreenSharing, setIsScreenSharing] = useState(false)

  const showMobileControls = Boolean(onZoomIn && onZoomOut && onCenter)

  return (
    <div className="absolute bottom-0 left-0 right-0 h-16 bg-white shadow-sm z-20 flex items-center justify-center px-4">
      <div className="flex items-center gap-2 justify-between w-full max-w-3xl">
        <div className="flex items-center gap-2">
          <Button
            variant={isChatActive ? "default" : "outline"}
            size="icon"
            onClick={onToggleChat}
            className="rounded-full h-10 w-10"
            aria-label={isChatActive ? "Close chat" : "Open chat"}
          >
            <MessageSquare className="h-5 w-5" />
          </Button>

          <Button
            variant={isPeopleActive ? "default" : "outline"}
            size="icon"
            onClick={onTogglePeople}
            className="rounded-full h-10 w-10"
            aria-label={isPeopleActive ? "Close people list" : "Open people list"}
          >
            <Users className="h-5 w-5" />
          </Button>
        </div>

        {showMobileControls && (
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={onZoomIn}
              className="rounded-full h-10 w-10"
              aria-label="Zoom in"
            >
              <ZoomIn className="h-5 w-5" />
            </Button>

            <Button
              variant="outline"
              size="icon"
              onClick={onZoomOut}
              className="rounded-full h-10 w-10"
              aria-label="Zoom out"
            >
              <ZoomOut className="h-5 w-5" />
            </Button>

            <Button
              variant="outline"
              size="icon"
              onClick={onCenter}
              className="rounded-full h-10 w-10"
              aria-label="Center view"
            >
              <Maximize className="h-5 w-5" />
            </Button>
          </div>
        )}

        <div className="flex items-center gap-2">
          <Button
            variant={isMicOn ? "outline" : "destructive"}
            size="icon"
            onClick={() => setIsMicOn(!isMicOn)}
            className="rounded-full h-10 w-10"
            aria-label={isMicOn ? "Turn microphone off" : "Turn microphone on"}
          >
            {isMicOn ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
          </Button>

          <Button
            variant={isVideoOn ? "outline" : "destructive"}
            size="icon"
            onClick={() => setIsVideoOn(!isVideoOn)}
            className="rounded-full h-10 w-10"
            aria-label={isVideoOn ? "Turn video off" : "Turn video on"}
          >
            {isVideoOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
          </Button>

          <Button
            variant={isScreenSharing ? "default" : "outline"}
            size="icon"
            onClick={() => setIsScreenSharing(!isScreenSharing)}
            className="rounded-full h-10 w-10"
            aria-label={isScreenSharing ? "Stop screen sharing" : "Start screen sharing"}
          >
            {isScreenSharing ? <ShareOff className="h-5 w-5" /> : <Share className="h-5 w-5" />}
          </Button>
        </div>
      </div>
    </div>
  )
}
