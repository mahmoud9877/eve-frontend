"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useTranslation } from "react-i18next"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ArrowLeft, Send, Clock } from "lucide-react"
import Image from "next/image"
import ChatMessage, { type Message, type Attachment } from "./chat/chat-message"
import VoiceRecorder from "./chat/voice-recorder"
import FileUpload from "./chat/file-upload"

type User = {
  name?: string | null
  email?: string | null
  image?: string | null
}

export default function ChatWithEve({ user }: { user: User }) {
  const { t } = useTranslation()
  const router = useRouter()
  const [eveData, setEveData] = useState<any>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Load EVE data from localStorage
  useEffect(() => {
    const storedEve = localStorage.getItem("eveEmployee")
    if (storedEve) {
      const parsedEve = JSON.parse(storedEve)
      setEveData(parsedEve)

      // Add initial greeting message
      setMessages([
        {
          id: "1",
          sender: "eve",
          content: `Hello! I'm ${parsedEve.name}, your EVE employee from the ${parsedEve.department} department. ${parsedEve.introduction}`,
          timestamp: new Date(),
        },
      ])
    } else {
      // If no EVE data is found, redirect to create page
      router.push("/create-eve")
    }
  }, [router])

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = () => {
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate EVE response after a delay
    setTimeout(() => {
      const eveResponse: Message = {
        id: (Date.now() + 1).toString(),
        sender: "eve",
        content: generateEveResponse(input),
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, eveResponse])
      setIsLoading(false)
    }, 1500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleFileUpload = (attachments: Attachment[]) => {
    const fileMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      content: "I've shared some files with you:",
      timestamp: new Date(),
      attachments,
    }

    setMessages((prev) => [...prev, fileMessage])

    // Simulate EVE response after a delay
    setTimeout(() => {
      const eveResponse: Message = {
        id: (Date.now() + 1).toString(),
        sender: "eve",
        content: "Thank you for sharing these files. I'll analyze them and get back to you shortly.",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, eveResponse])
    }, 1500)
  }

  const handleVoiceRecording = (audioBlob: Blob) => {
    // In a real app, we would upload the audio to a server
    const audioUrl = URL.createObjectURL(audioBlob)

    const voiceMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      content: "🎤 Voice message",
      timestamp: new Date(),
      attachments: [
        {
          name: "Voice message",
          url: audioUrl,
          type: "audio/wav",
        },
      ],
    }

    setMessages((prev) => [...prev, voiceMessage])
  }

  const handleVoiceTranscription = (text: string) => {
    // Simulate EVE response after a delay
    setTimeout(() => {
      const eveResponse: Message = {
        id: (Date.now() + 1).toString(),
        sender: "eve",
        content: `I've received your voice message saying: "${text}". Let me process that for you.`,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, eveResponse])
    }, 1000)
  }

  // Simple response generator based on input
  const generateEveResponse = (input: string): string => {
    const lowerInput = input.toLowerCase()

    if (lowerInput.includes("hello") || lowerInput.includes("hi")) {
      return `Hello! How can I assist you today?`
    } else if (lowerInput.includes("help")) {
      return `I'm here to help! What do you need assistance with?`
    } else if (lowerInput.includes("thank")) {
      return `You're welcome! Is there anything else I can help you with?`
    } else if (lowerInput.includes("bye")) {
      return `Goodbye! Feel free to chat with me anytime.`
    } else {
      return `I understand you're asking about "${input}". Let me look into that for you. As an EVE employee from the ${eveData?.department} department, I can provide you with detailed information on this topic.`
    }
  }

  if (!eveData) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-800">
      <div className="container mx-auto py-4 px-4 h-screen flex flex-col">
        <header className="flex items-center mb-4">
          <Button
            variant="ghost"
            className="text-white hover:text-white/80 hover:bg-white/10 mr-4"
            onClick={() => router.push("/home")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t("common.back")}
          </Button>
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-white/20 mr-3">
              <Image
                src={eveData.photoUrl || "/placeholder.svg"}
                alt="EVE Avatar"
                width={40}
                height={40}
                className="object-cover"
              />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">{eveData.name}</h1>
              <p className="text-sm text-blue-200">{eveData.department}</p>
            </div>
          </div>
        </header>

        <Tabs defaultValue="chat" className="flex-1 flex flex-col">
          <TabsList className="mb-4 bg-white/10 text-white">
            <TabsTrigger value="chat" className="data-[state=active]:bg-white/20">
              {t("chat.activeChat")}
            </TabsTrigger>
            <TabsTrigger value="history" className="data-[state=active]:bg-white/20">
              <Clock className="h-4 w-4 mr-2" />
              {t("chat.history")}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="chat" className="flex-1 flex flex-col">
            <Card className="flex-1 bg-white/10 backdrop-blur-md border-none text-white mb-4 overflow-hidden flex flex-col">
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <ChatMessage
                      key={message.id}
                      message={message}
                      isCurrentUser={message.sender === "user"}
                      ref={message.id === messages[messages.length - 1]?.id ? messagesEndRef : undefined}
                    />
                  ))}

                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-white/20 rounded-lg p-3 flex space-x-2">
                        <div
                          className="w-2 h-2 rounded-full bg-white/70 animate-bounce"
                          style={{ animationDelay: "0ms" }}
                        ></div>
                        <div
                          className="w-2 h-2 rounded-full bg-white/70 animate-bounce"
                          style={{ animationDelay: "150ms" }}
                        ></div>
                        <div
                          className="w-2 h-2 rounded-full bg-white/70 animate-bounce"
                          style={{ animationDelay: "300ms" }}
                        ></div>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>
            </Card>

            <div className="flex items-center gap-2">
              <FileUpload onFilesSelected={handleFileUpload} />

              <VoiceRecorder
                onRecordingComplete={handleVoiceRecording}
                onTranscriptionComplete={handleVoiceTranscription}
              />

              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder={t("chat.typeMessage")}
                className="bg-white/10 border-white/30 text-white placeholder:text-white/50"
              />

              <Button
                className="bg-blue-600 hover:bg-blue-700"
                size="icon"
                onClick={handleSendMessage}
                disabled={!input.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="history" className="flex-1">
            <Card className="bg-white/10 backdrop-blur-md border-none text-white h-full">
              <ScrollArea className="h-full p-4">
                <div className="space-y-4">
                  <p className="text-center text-white/70">{t("chat.noHistory")}</p>
                </div>
              </ScrollArea>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
