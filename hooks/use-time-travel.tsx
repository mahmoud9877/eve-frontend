"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import type { User } from "@/types/user"
import type { TimePoint } from "@/types/time"

export function useTimeTravel() {
  const [currentTime, setCurrentTime] = useState<Date>(new Date())
  const [timeSpeed, setTimeSpeed] = useState<number>(1)
  const [isRecording, setIsRecording] = useState<boolean>(false)
  const [isPaused, setIsPaused] = useState<boolean>(false)
  const [timePoints, setTimePoints] = useState<TimePoint[]>([])

  const timeInterval = useRef<NodeJS.Timeout | null>(null)
  const lastUpdateTime = useRef<number>(Date.now())

  // Initialize time progression
  useEffect(() => {
    if (!isPaused) {
      timeInterval.current = setInterval(() => {
        const now = Date.now()
        const elapsed = now - lastUpdateTime.current
        lastUpdateTime.current = now

        setCurrentTime((prevTime) => {
          const newTime = new Date(prevTime.getTime() + elapsed * timeSpeed)
          return newTime
        })
      }, 100)
    } else if (timeInterval.current) {
      clearInterval(timeInterval.current)
    }

    return () => {
      if (timeInterval.current) {
        clearInterval(timeInterval.current)
      }
    }
  }, [isPaused, timeSpeed])

  // Toggle recording state
  const toggleRecording = useCallback(() => {
    setIsRecording((prev) => !prev)
  }, [])

  // Toggle pause state
  const togglePause = useCallback(() => {
    setIsPaused((prev) => {
      if (prev) {
        lastUpdateTime.current = Date.now()
      }
      return !prev
    })
  }, [])

  // Add a new time point
  const addTimePoint = useCallback((timePoint: TimePoint) => {
    setTimePoints((prev) => [...prev, timePoint])
  }, [])

  // Jump to a specific time point
  const jumpToTimePoint = useCallback((timePoint: TimePoint) => {
    setCurrentTime(new Date(timePoint.timestamp))
    setIsPaused(true)
  }, [])

  // Get users at a specific time
  const getUsersAtTime = useCallback((time: Date, currentUsers: User[]): User[] => {
    if (timePoints.length === 0) return currentUsers

    // Create a map of the latest state for each user before the given time
    const userStates = new Map<string, User>()

    // Start with current users as base
    currentUsers.forEach((user) => {
      userStates.set(user.id, { ...user })
    })

    // Apply time points up to the given time
    timePoints
      .filter((tp) => new Date(tp.timestamp).getTime() <= time.getTime())
      .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
      .forEach((tp) => {
        const user = userStates.get(tp.userId)

        if (user) {
          // Update user based on time point
          if (tp.action === "move") {
            userStates.set(tp.userId, {
              ...user,
              position: tp.position,
            })
          } else if (tp.action === "status") {
            userStates.set(tp.userId, {
              ...user,
              status: tp.status,
            })
          }
        }
      })

    return Array.from(userStates.values())
  }, [])

  return {
    currentTime,
    timeSpeed,
    isRecording,
    isPaused,
    timePoints,
    setCurrentTime,
    setTimeSpeed,
    toggleRecording,
    togglePause,
    addTimePoint,
    jumpToTimePoint,
    getUsersAtTime,
  }
}
