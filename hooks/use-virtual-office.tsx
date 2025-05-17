"use client"

import { useState, useEffect, useCallback } from "react"
import type { User } from "@/types/user"
import type { Position } from "@/types/office"

export function useVirtualOffice() {
  const [users, setUsers] = useState<User[]>([])
  const [isConnected, setIsConnected] = useState(false)

  // Mock users for demonstration
  useEffect(() => {
    const mockUsers: User[] = [
      {
        id: "2",
        name: "Jane Smith",
        role: "UX Designer",
        status: "Designing new components",
        isActive: true,
        isMicrophoneOn: true,
        isVideoOn: true,
        color: "#9c27b0",
        position: { x: 650, y: 350 },
      },
      {
        id: "3",
        name: "Bob Johnson",
        role: "Developer",
        status: "Fixing bugs",
        isActive: true,
        isMicrophoneOn: false,
        isVideoOn: false,
        color: "#4caf50",
        position: { x: 400, y: 450 },
      },
      {
        id: "4",
        name: "Alice Williams",
        role: "Project Manager",
        status: "In a meeting",
        isActive: true,
        isMicrophoneOn: true,
        isVideoOn: true,
        color: "#ff9800",
        position: { x: 800, y: 500 },
      },
      {
        id: "5",
        name: "Charlie Brown",
        role: "QA Engineer",
        status: "Out to lunch",
        isActive: false,
        isMicrophoneOn: false,
        isVideoOn: false,
        color: "#f44336",
        position: { x: 1200, y: 300 },
      },
      {
        id: "6",
        name: "Diana Prince",
        role: "Marketing",
        status: "Creating social media posts",
        isActive: true,
        isMicrophoneOn: true,
        isVideoOn: false,
        color: "#00bcd4",
        position: { x: 1000, y: 400 },
      },
      {
        id: "7",
        name: "Edward Stark",
        role: "CEO",
        status: "Available",
        isActive: true,
        isMicrophoneOn: false,
        isVideoOn: false,
        color: "#795548",
        position: { x: 1500, y: 350 },
      },
    ]

    setUsers(mockUsers)
  }, [])

  const connectToOffice = useCallback((user: User) => {
    setUsers((prevUsers) => {
      // Check if user already exists
      const existingUserIndex = prevUsers.findIndex((u) => u.id === user.id)

      if (existingUserIndex >= 0) {
        // Update existing user
        const updatedUsers = [...prevUsers]
        updatedUsers[existingUserIndex] = user
        return updatedUsers
      } else {
        // Add new user
        return [...prevUsers, user]
      }
    })

    setIsConnected(true)
    console.log(`Connected to virtual office as ${user.name}`)
  }, [])

  const disconnectFromOffice = useCallback((userId: string) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId))
    setIsConnected(false)
    console.log(`Disconnected from virtual office`)
  }, [])

  const updateUserPosition = useCallback((userId: string, position: Position) => {
    setUsers((prevUsers) => prevUsers.map((user) => (user.id === userId ? { ...user, position } : user)))
  }, [])

  return {
    users,
    isConnected,
    connectToOffice,
    disconnectFromOffice,
    updateUserPosition,
  }
}
