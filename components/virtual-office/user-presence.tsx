"use client"
import type { User, UserStatus } from "@/types/user"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { CircleUser, Clock, Video, BellOff, LogOut, ChevronDown } from "lucide-react"

interface UserPresenceProps {
  user: User | null
  updateStatus: (userId: string, status: UserStatus) => void
}

export function UserPresence({ user, updateStatus }: UserPresenceProps) {
  if (!user) return null

  const statusIcons = {
    online: <CircleUser className="h-4 w-4 text-green-500" />,
    away: <Clock className="h-4 w-4 text-yellow-500" />,
    busy: <BellOff className="h-4 w-4 text-red-500" />,
    inMeeting: <Video className="h-4 w-4 text-purple-500" />,
    offline: <CircleUser className="h-4 w-4 text-gray-500" />,
  }

  const statusLabels = {
    online: "Online",
    away: "Away",
    busy: "Do Not Disturb",
    inMeeting: "In a Meeting",
    offline: "Offline",
  }

  const handleStatusChange = (status: UserStatus) => {
    updateStatus(user.id, status)
  }

  return (
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">{user.name.charAt(0)}</div>

      <div className="text-sm">
        <div className="font-medium">{user.name}</div>
        <div className="text-xs text-muted-foreground">{user.role}</div>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="flex items-center gap-1 h-7 px-2">
            {statusIcons[user.status]}
            <span className="text-xs">{statusLabels[user.status]}</span>
            <ChevronDown className="h-3 w-3" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => handleStatusChange("online")}>
            <CircleUser className="h-4 w-4 text-green-500 mr-2" />
            Online
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleStatusChange("away")}>
            <Clock className="h-4 w-4 text-yellow-500 mr-2" />
            Away
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleStatusChange("busy")}>
            <BellOff className="h-4 w-4 text-red-500 mr-2" />
            Do Not Disturb
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleStatusChange("inMeeting")}>
            <Video className="h-4 w-4 text-purple-500 mr-2" />
            In a Meeting
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleStatusChange("offline")}>
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
