"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { X, Send, Clock, Layers, Search, Phone, VideoIcon, User, UserPlus, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { formatDate } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { User as UserType } from "@/types/user"
import type { ChatMessage } from "@/types/chat"
import type { Dimension } from "@/types/dimension"

interface SidePanelProps {
  content: string
  users: UserType[]
  currentTime: Date
  currentDimension?: Dimension
  onClose: () => void
}

export function SidePanel({ content, users, currentTime, currentDimension, onClose }: SidePanelProps) {
  const [activeTab, setActiveTab] = useState(content)
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      sender: "System",
      content: "Welcome to the office chat!",
      timestamp: new Date(),
      dimensionId: "default",
    },
    {
      id: "2",
      sender: "John Doe",
      content: "Hey everyone, how's it going?",
      timestamp: new Date(Date.now() - 300000),
      dimensionId: "default",
    },
    {
      id: "3",
      sender: "Jane Smith",
      content: "Working on the new homepage design",
      timestamp: new Date(Date.now() - 120000),
      dimensionId: "default",
    },
  ])
  const [searchQuery, setSearchQuery] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        sender: "You",
        content: message,
        timestamp: currentTime,
        dimensionId: currentDimension?.id || "default",
      }
      setMessages([...messages, newMessage])
      setMessage("")
    }
  }

  // Filter messages based on current time and dimension
  const filteredMessages = messages.filter(
    (msg) =>
      msg.timestamp.getTime() <= currentTime.getTime() &&
      (msg.dimensionId === currentDimension?.id || msg.dimensionId === "default"),
  )

  // Filter users based on search query
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.status.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="absolute right-0 top-16 bottom-16 w-80 bg-white shadow-lg z-10 flex flex-col">
      <div className="flex items-center justify-between p-3 border-b">
        <div className="flex items-center">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2">
              <TabsTrigger value="chat">Chat</TabsTrigger>
              <TabsTrigger value="people">People</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose} className="ml-2">
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex items-center justify-between px-3 py-2 bg-muted/30">
        <div className="flex items-center text-xs text-muted-foreground">
          <Clock className="h-3 w-3 mr-1" />
          <span>{formatDate(currentTime, true)}</span>
        </div>
        {currentDimension && (
          <div className="flex items-center text-xs" style={{ color: currentDimension.color || "#7c3aed" }}>
            <Layers className="h-3 w-3 mr-1" />
            <span>{currentDimension.name}</span>
          </div>
        )}
      </div>

      <TabsContent value="chat" className="flex-1 flex flex-col p-0 m-0">
        <ScrollArea className="flex-1 p-3">
          <div className="space-y-3">
            {filteredMessages.map((msg) => (
              <div key={msg.id} className={`flex flex-col ${msg.sender === "You" ? "items-end" : "items-start"}`}>
                <div
                  className={`px-3 py-2 rounded-lg max-w-[90%] ${
                    msg.sender === "You" ? "bg-primary text-primary-foreground" : "bg-muted"
                  }`}
                >
                  {msg.content}
                </div>
                <div className="text-xs text-muted-foreground mt-1 flex items-center">
                  <span>{msg.sender}</span>
                  <span className="mx-1">•</span>
                  <span>{msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                  {msg.dimensionId !== "default" && msg.dimensionId !== currentDimension?.id && (
                    <>
                      <span className="mx-1">•</span>
                      <span className="flex items-center">
                        <Layers className="h-2 w-2 mr-0.5" />
                        <span>Alt</span>
                      </span>
                    </>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        <form onSubmit={handleSendMessage} className="p-3 border-t">
          <div className="flex gap-2">
            <Input
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" size="icon" disabled={!message.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </TabsContent>

      <TabsContent value="people" className="flex-1 flex flex-col p-0 m-0">
        <div className="p-3 border-b">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search people..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-3">
            <div className="space-y-1 mb-4">
              <h4 className="text-sm font-medium text-muted-foreground">In this space ({filteredUsers.length})</h4>
            </div>

            {filteredUsers.length > 0 ? (
              <div className="space-y-2">
                {filteredUsers.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between p-2 hover:bg-muted/50 rounded-md group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar>
                          {user.photoUrl ? (
                            <AvatarImage src={user.photoUrl || "/placeholder.svg"} alt={user.name} />
                          ) : (
                            <AvatarFallback style={{ backgroundColor: user.color || "#2196f3" }}>
                              {user.name.charAt(0)}
                            </AvatarFallback>
                          )}
                        </Avatar>

                        <div
                          className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white"
                          style={{ backgroundColor: user.isActive ? "#4CAF50" : "#9E9E9E" }}
                        />
                      </div>

                      <div>
                        <div className="font-medium text-sm">{user.name}</div>
                        <div className="text-xs text-muted-foreground">{user.status}</div>
                      </div>
                    </div>

                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Mail className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <VideoIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <User className="h-12 w-12 text-muted-foreground/30 mb-4" />
                <p className="text-muted-foreground mb-2">No users found</p>
                <p className="text-xs text-muted-foreground/70 max-w-[200px]">
                  Try adjusting your search or invite more people to join
                </p>
                <Button variant="outline" size="sm" className="mt-4">
                  <UserPlus className="h-4 w-4 mr-1" />
                  Invite People
                </Button>
              </div>
            )}
          </div>
        </ScrollArea>
      </TabsContent>
    </div>
  )
}
