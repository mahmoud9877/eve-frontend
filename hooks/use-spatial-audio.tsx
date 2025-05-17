"use client"

import { useCallback, useRef, useEffect } from "react"
import type { User } from "@/types/user"

export function useSpatialAudio() {
  const audioContextRef = useRef<AudioContext | null>(null)
  const gainNodesRef = useRef<Map<string, GainNode>>(new Map())
  const pannerNodesRef = useRef<Map<string, PannerNode>>(new Map())
  const oscillatorsRef = useRef<Map<string, OscillatorNode>>(new Map())
  const listenerRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 })

  const initializeAudio = useCallback(() => {
    if (typeof window !== "undefined" && !audioContextRef.current) {
      try {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
        console.log("Audio context initialized")
      } catch (error) {
        console.error("Failed to initialize audio context:", error)
      }
    }
  }, [])

  const updateAudioPositions = useCallback((users: User[]) => {
    if (!audioContextRef.current) return

    // Find current user to use as audio listener
    const currentUser = users.find((user) => user.id === "1")
    if (currentUser) {
      listenerRef.current = {
        x: currentUser.position.x,
        y: currentUser.position.y,
      }
    }

    // Update or create audio nodes for each user
    users.forEach((user) => {
      // Skip current user (listener)
      if (user.id === "1") return

      // Calculate distance from listener
      const dx = user.position.x - listenerRef.current.x
      const dy = user.position.y - listenerRef.current.y
      const distance = Math.sqrt(dx * dx + dy * dy)

      // Normalize to screen coordinates (assuming 2000x2000 virtual space)
      const normalizedX = dx / 1000
      const normalizedY = dy / 1000

      // Get or create audio nodes for this user
      let oscillator = oscillatorsRef.current.get(user.id)
      let panner = pannerNodesRef.current.get(user.id)
      let gain = gainNodesRef.current.get(user.id)

      if (!oscillator || !panner || !gain) {
        // Create new audio nodes
        oscillator = audioContextRef.current.createOscillator()
        panner = audioContextRef.current.createPanner()
        gain = audioContextRef.current.createGain()

        // Set up audio graph
        oscillator.connect(gain)
        gain.connect(panner)
        panner.connect(audioContextRef.current.destination)

        // Store references
        oscillatorsRef.current.set(user.id, oscillator)
        pannerNodesRef.current.set(user.id, panner)
        gainNodesRef.current.set(user.id, gain)

        // Start oscillator with unique frequency per user
        oscillator.frequency.value = 220 + Number.parseInt(user.id) * 20
        oscillator.start()
      }

      // Update spatial position
      panner.positionX.value = normalizedX
      panner.positionY.value = normalizedY
      panner.positionZ.value = 0

      // Update gain based on distance and microphone state
      const maxDistance = 500 // Maximum audible distance
      const volume = user.isMicrophoneOn ? Math.max(0, 1 - distance / maxDistance) : 0

      gain.gain.value = volume * 0.01 // Keep volume very low for demo
    })
  }, [])

  // Clean up audio context on unmount
  useEffect(() => {
    return () => {
      if (audioContextRef.current) {
        oscillatorsRef.current.forEach((osc) => {
          try {
            osc.stop()
          } catch (e) {
            // Ignore errors if oscillator already stopped
          }
        })

        audioContextRef.current.close().catch(console.error)
      }
    }
  }, [])

  return {
    initializeAudio,
    updateAudioPositions,
  }
}
