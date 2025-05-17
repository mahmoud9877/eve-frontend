// Mock user database
export const users = [
  {
    id: "1",
    name: "Demo User",
    email: "demo@example.com",
    password: "password123", // In a real app, this would be hashed
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

// Mock authentication functions
export const authenticateUser = (email: string, password: string) => {
  const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password)
  return user || null
}

// Mock session storage
let currentSession: any = null

export const setSession = (session: any) => {
  currentSession = session
  if (typeof window !== "undefined") {
    localStorage.setItem("user-session", JSON.stringify(session))
  }
}

export const getSession = () => {
  if (typeof window !== "undefined" && !currentSession) {
    const savedSession = localStorage.getItem("user-session")
    if (savedSession) {
      currentSession = JSON.parse(savedSession)
    }
  }
  return currentSession
}

export const clearSession = () => {
  currentSession = null
  if (typeof window !== "undefined") {
    localStorage.removeItem("user-session")
  }
}

export const getAuth = () => {
  const session = getSession()
  const user = session?.user || null
  return {
    isAuthenticated: !!user,
    user,
  }
}
