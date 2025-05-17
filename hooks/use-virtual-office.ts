"use client"

import { useState, useEffect } from "react"

type Position = {
  x: number
  y: number
}

type User = {
  id: string
  name: string
  role?: string
  department?: string
  status?: string
  isActive?: boolean
  position?: Position
}

export function useVirtualOffice() {
  const [isConnected, setIsConnected] = useState(false)
  const [users, setUsers] = useState<User[]>([])
  const [currentUser, setCurrentUser] = useState<User | null>(null)

  // Simulate connecting to a virtual office service
  const connectToOffice = (user: User) => {
    console.log("Connecting to virtual office as:", user)
    setCurrentUser(user)
    setIsConnected(true)

    // Add the user to the list of users
    setUsers((prevUsers) => {
      const existingUserIndex = prevUsers.findIndex((u) => u.id === user.id)
      if (existingUserIndex >= 0) {
        // Update existing user
        const updatedUsers = [...prevUsers]
        updatedUsers[existingUserIndex] = {
          ...updatedUsers[existingUserIndex],
          ...user,
          isActive: true,
        }
        return updatedUsers
      } else {
        // Add new user
        return [...prevUsers, { ...user, isActive: true }]
      }
    })

    return true
  }

  // Simulate disconnecting from the virtual office
  const disconnectFromOffice = () => {
    if (currentUser) {
      console.log("Disconnecting from virtual office:", currentUser.name)

      // Mark the user as inactive
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user.id === currentUser.id ? { ...user, isActive: false } : user)),
      )

      setCurrentUser(null)
      setIsConnected(false)
    }
    return true
  }

  // Update user position in the virtual office
  const updateUserPosition = (userId: string, position: Position) => {
    setUsers((prevUsers) => prevUsers.map((user) => (user.id === userId ? { ...user, position } : user)))

    if (currentUser?.id === userId) {
      setCurrentUser((prev) => (prev ? { ...prev, position } : null))
    }
  }

  // Clean up on unmount
  useEffect(() => {
    return () => {
      disconnectFromOffice()
    }
  }, [])

  return {
    isConnected,
    users,
    currentUser,
    connectToOffice,
    disconnectFromOffice,
    updateUserPosition,
  }
}
