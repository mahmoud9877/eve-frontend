import { NextResponse } from "next/server"
import { getAuth } from "@/lib/mock-auth"

// In-memory database for development
const eveEmployees = [
  {
    id: "eve-1",
    name: "HR Assistant",
    department: "HR",
    position: [-15, 0.5, -5],
    isAI: true,
    photoUrl: "/placeholder.svg?height=80&width=80",
    introduction: "I'm your HR assistant, ready to help with all HR-related queries.",
    createdBy: "user-1",
  },
  {
    id: "eve-2",
    name: "IT Support",
    department: "IT",
    position: [-5, 0.5, -15],
    isAI: true,
    photoUrl: "/placeholder.svg?height=80&width=80",
    introduction: "I provide IT support and troubleshooting assistance.",
    createdBy: "user-2",
  },
  {
    id: "eve-3",
    name: "QA Tester",
    department: "QA",
    position: [5, 0.5, -15],
    isAI: true,
    photoUrl: "/placeholder.svg?height=80&width=80",
    introduction: "I help with quality assurance and testing procedures.",
    createdBy: "user-3",
  },
]

export async function GET() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  return NextResponse.json({ employees: eveEmployees })
}

export async function POST(request: Request) {
  try {
    // Check authentication
    const auth = getAuth()

    if (!auth.isAuthenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await request.json()

    // Validate the data
    if (!data.name || !data.department) {
      return NextResponse.json({ error: "Name and department are required" }, { status: 400 })
    }

    // Generate a unique ID
    const newId = `eve-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`

    // Check if this user already exists (by createdBy)
    const createdBy = data.createdBy || auth.user?.id || "unknown"
    const existingUserIndex = eveEmployees.findIndex((emp) => emp.createdBy === createdBy && emp.isAI === false)

    let newEve = {
      id: newId,
      name: data.name,
      department: data.department,
      role: data.role || "Employee",
      position: data.position || [0, 0.5, 0],
      isAI: false,
      photoUrl: data.photoUrl || "/placeholder.svg?height=80&width=80",
      introduction: data.introduction || "",
      createdBy: createdBy,
      status: data.status || "online",
      lastUpdated: new Date().toISOString(),
    }

    // Update or add the employee
    if (existingUserIndex >= 0) {
      eveEmployees[existingUserIndex] = {
        ...eveEmployees[existingUserIndex],
        ...newEve,
        id: eveEmployees[existingUserIndex].id, // Keep the original ID
      }
      newEve = eveEmployees[existingUserIndex]
    } else {
      // Add to our mock database
      eveEmployees.push(newEve)
    }

    return NextResponse.json({ employee: newEve })
  } catch (error) {
    console.error("Error in POST /api/eve-employees:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
