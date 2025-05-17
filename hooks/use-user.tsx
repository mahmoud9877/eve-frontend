"use client"

import { useState, useEffect } from "react"
import type { User } from "@/types/user"

export function useUser() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    // Simulate user authentication
    const mockUser: User = {
      id: "1",
      name: "John Doe",
      role: "Product Manager",
      status: "Working on the homepage",
      isActive: true,
      isMicrophoneOn: true,
      isVideoOn: false,
      color: "#2196f3",
      position: { x: 500, y: 300 },
    }

    setUser(mockUser)
  }, [])

  const updateUserStatus = (userId: string, status: string) => {
    if (user && user.id === userId) {
      setUser({ ...user, status })
    }
  }

  return { user, updateUserStatus }
}
