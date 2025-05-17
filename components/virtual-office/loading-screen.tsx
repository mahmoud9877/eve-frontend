"use client"

import { useEffect, useState } from "react"
import { Layers, Clock } from "lucide-react"

export function LoadingScreen() {
  const [loadingText, setLoadingText] = useState("Initializing virtual office")
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const messages = [
      "Initializing virtual office",
      "Loading office layout",
      "Connecting to dimensions",
      "Calibrating time controls",
      "Preparing spatial audio",
      "Setting up avatars",
      "Almost ready...",
    ]

    let currentIndex = 0
    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % messages.length
      setLoadingText(messages[currentIndex])
      setProgress((prev) => Math.min(prev + Math.random() * 15, 95))
    }, 800)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-gray-100">
      <div className="w-full max-w-md px-8 flex flex-col items-center">
        <div className="relative w-24 h-24 mb-8">
          <div className="absolute inset-0 flex items-center justify-center animate-pulse">
            <Layers className="h-12 w-12 text-primary" />
          </div>
          <div
            className="absolute inset-0 flex items-center justify-center animate-spin opacity-30"
            style={{ animationDuration: "3s" }}
          >
            <Clock className="h-20 w-20 text-primary" />
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-2 text-gray-800">Virtual Office</h2>
        <p className="text-muted-foreground mb-6 text-center">{loadingText}...</p>

        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
          <div
            className="h-full bg-primary rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <p className="text-xs text-muted-foreground">5D Workspace Experience</p>
      </div>
    </div>
  )
}
