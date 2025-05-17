"use client"

import type React from "react"

import { useState } from "react"
import { MessageSquare, FileText, Video, Users, X, Maximize2, Minimize2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import type { User } from "@/types/user"
import type { ChatMessage } from "@/types/chat"

interface CollaborationToolsProps {
  currentDepartment: string
  users: User[]
}

export function CollaborationTools({ currentDepartment, users }: CollaborationToolsProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [activeTab, setActiveTab] = useState("chat")
  const [chatMessage, setChatMessage] = useState("")
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: "1", sender: "System", content: `Welcome to ${currentDepartment}!`, timestamp: new Date() },
  ])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (chatMessage.trim()) {
      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        sender: "You",
        content: chatMessage,
        timestamp: new Date(),
      }
      setMessages([...messages, newMessage])
      setChatMessage("")
    }
  }

  const toggleOpen = () => {
    setIsOpen(!isOpen)
    setIsMinimized(false)
  }

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized)
  }

  return (
    <>
      {/* Collaboration tools toggle buttons */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 flex gap-2 bg-white rounded-full shadow-md p-1">
        <Button
          variant={activeTab === "chat" && isOpen ? "default" : "ghost"}
          size="icon"
          className="rounded-full"
          onClick={() => {
            setActiveTab("chat")
            toggleOpen()
          }}
        >
          <MessageSquare className="h-5 w-5" />
        </Button>
        <Button
          variant={activeTab === "documents" && isOpen ? "default" : "ghost"}
          size="icon"
          className="rounded-full"
          onClick={() => {
            setActiveTab("documents")
            toggleOpen()
          }}
        >
          <FileText className="h-5 w-5" />
        </Button>
        <Button
          variant={activeTab === "meetings" && isOpen ? "default" : "ghost"}
          size="icon"
          className="rounded-full"
          onClick={() => {
            setActiveTab("meetings")
            toggleOpen()
          }}
        >
          <Video className="h-5 w-5" />
        </Button>
        <Button
          variant={activeTab === "team" && isOpen ? "default" : "ghost"}
          size="icon"
          className="rounded-full"
          onClick={() => {
            setActiveTab("team")
            toggleOpen()
          }}
        >
          <Users className="h-5 w-5" />
        </Button>
      </div>

      {/* Collaboration panel */}
      {isOpen && (
        <div
          className={`absolute bottom-20 left-1/2 transform -translate-x-1/2 z-20 bg-white rounded-lg shadow-lg transition-all duration-200 ${
            isMinimized ? "w-40 h-10" : "w-80 h-96"
          }`}
        >
          {isMinimized ? (
            <div className="flex items-center justify-between p-2">
              <span className="text-sm font-medium">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</span>
              <div className="flex gap-1">
                <Button variant="ghost" size="icon" onClick={toggleMinimize}>
                  <Maximize2 className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={toggleOpen}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between p-2 border-b">
                <span className="text-sm font-medium">{currentDepartment} - Collaboration</span>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" onClick={toggleMinimize}>
                    <Minimize2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={toggleOpen}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Tabs value={activeTab} onValueChange={setActiveTab} className="h-[calc(100%-40px)]">
                <TabsList className="grid grid-cols-4">
                  <TabsTrigger value="chat">Chat</TabsTrigger>
                  <TabsTrigger value="documents">Docs</TabsTrigger>
                  <TabsTrigger value="meetings">Meetings</TabsTrigger>
                  <TabsTrigger value="team">Team</TabsTrigger>
                </TabsList>

                <TabsContent value="chat" className="h-[calc(100%-40px)] flex flex-col">
                  <div className="flex-1 overflow-y-auto p-2 space-y-2">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex flex-col ${message.sender === "You" ? "items-end" : "items-start"}`}
                      >
                        <div
                          className={`px-3 py-2 rounded-lg max-w-[80%] ${
                            message.sender === "You" ? "bg-primary text-primary-foreground" : "bg-muted"
                          }`}
                        >
                          {message.content}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {message.sender} •{" "}
                          {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </div>
                      </div>
                    ))}
                  </div>

                  <form onSubmit={handleSendMessage} className="p-2 border-t">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Type a message..."
                        value={chatMessage}
                        onChange={(e) => setChatMessage(e.target.value)}
                      />
                      <Button type="submit" size="sm">
                        Send
                      </Button>
                    </div>
                  </form>
                </TabsContent>

                <TabsContent value="documents" className="h-[calc(100%-40px)] p-2">
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Department Documents</h3>
                    <div className="border rounded-md p-2 text-sm">
                      <div className="flex items-center gap-2 p-1 hover:bg-accent rounded cursor-pointer">
                        <FileText className="h-4 w-4" />
                        <span>Department Overview.docx</span>
                      </div>
                      <div className="flex items-center gap-2 p-1 hover:bg-accent rounded cursor-pointer">
                        <FileText className="h-4 w-4" />
                        <span>Q2 Planning.xlsx</span>
                      </div>
                      <div className="flex items-center gap-2 p-1 hover:bg-accent rounded cursor-pointer">
                        <FileText className="h-4 w-4" />
                        <span>Team Roster.pdf</span>
                      </div>
                    </div>

                    <h3 className="text-sm font-medium mt-4">Shared Whiteboard</h3>
                    <div className="border rounded-md p-2 h-32 bg-gray-50 flex items-center justify-center">
                      <span className="text-sm text-muted-foreground">Whiteboard content will appear here</span>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="meetings" className="h-[calc(100%-40px)] p-2">
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Upcoming Meetings</h3>
                    <div className="border rounded-md p-2">
                      <div className="text-sm p-2 border-b">
                        <div className="font-medium">Daily Standup</div>
                        <div className="text-xs text-muted-foreground">Today, 9:00 AM - 9:15 AM</div>
                      </div>
                      <div className="text-sm p-2 border-b">
                        <div className="font-medium">Project Review</div>
                        <div className="text-xs text-muted-foreground">Today, 2:00 PM - 3:00 PM</div>
                      </div>
                      <div className="text-sm p-2">
                        <div className="font-medium">Department Sync</div>
                        <div className="text-xs text-muted-foreground">Tomorrow, 10:00 AM - 11:00 AM</div>
                      </div>
                    </div>

                    <Button className="w-full mt-2" size="sm">
                      Schedule Meeting
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="team" className="h-[calc(100%-40px)] p-2">
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Team Members ({users.length})</h3>
                    <div className="border rounded-md p-2 max-h-[calc(100%-60px)] overflow-y-auto">
                      {users.map((user) => (
                        <div key={user.id} className="flex items-center gap-2 p-2 hover:bg-accent rounded">
                          <div className="relative">
                            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                              {user.name.charAt(0)}
                            </div>
                            <div
                              className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                                user.status === "online"
                                  ? "bg-green-500"
                                  : user.status === "away"
                                    ? "bg-yellow-500"
                                    : user.status === "busy"
                                      ? "bg-red-500"
                                      : user.status === "inMeeting"
                                        ? "bg-purple-500"
                                        : "bg-gray-500"
                              }`}
                            />
                          </div>
                          <div>
                            <div className="text-sm font-medium">{user.name}</div>
                            <div className="text-xs text-muted-foreground">{user.role}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </>
          )}
        </div>
      )}
    </>
  )
}
