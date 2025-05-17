"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"

type User = {
  id: string
  name: string
  email: string
  image?: string
}

type AuthContextType = {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  isAuthenticated: false,
  login: async () => false,
  logout: () => {},
})

// Mock user database
const MOCK_USERS = [
  {
    id: "1",
    name: "Demo User",
    email: "demo@example.com",
    password: "password123",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: "2",
    name: "Test User",
    email: "test@example.com",
    password: "password123",
    image: "/placeholder.svg?height=80&width=80",
  },
]

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = () => {
      try {
        // Check localStorage for user
        const storedUser = localStorage.getItem("eve-user")
        if (storedUser) {
          setUser(JSON.parse(storedUser))
        }
      } catch (error) {
        console.error("Failed to parse stored user:", error)
        localStorage.removeItem("eve-user")
      } finally {
        setIsLoading(false)
      }
    }

    // Only run on client
    if (typeof window !== "undefined") {
      checkAuth()
    } else {
      setIsLoading(false)
    }
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Find user with matching credentials
      const matchedUser = MOCK_USERS.find(
        (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password,
      )

      if (matchedUser) {
        // Create user object without password
        const { password: _, ...userWithoutPassword } = matchedUser

        // Store user in state and localStorage
        setUser(userWithoutPassword)
        localStorage.setItem("eve-user", JSON.stringify(userWithoutPassword))
        return true
      }

      return false
    } catch (error) {
      console.error("Login error:", error)
      return false
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("eve-user")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}

export function withAuth(Component: React.ComponentType<any>) {
  return function ProtectedRoute(props: any) {
    const { isAuthenticated, isLoading } = useAuth()
    const router = useRouter()

    useEffect(() => {
      if (!isLoading && !isAuthenticated) {
        router.push("/")
      }
    }, [isLoading, isAuthenticated, router])

    if (isLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-800">
          <div className="text-white text-xl">Loading...</div>
        </div>
      )
    }

    if (!isAuthenticated) {
      return null
    }

    return <Component {...props} />
  }
}
