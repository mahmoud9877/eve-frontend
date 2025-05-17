// Configuration for each department in the virtual office
interface DepartmentConfig {
  mapPosition: { x: number; y: number }
  width: number
  height: number
  floorColor: string
  accentColor: string
  deskPositions: { x: number; y: number; z: number }[]
  meetingAreas: { position: { x: number; y: number; z: number }; size: number }[]
  decorations?: { type: string; x: number; y: number }[]
}

export const departmentConfigs: Record<string, DepartmentConfig> = {
  "CF PS": {
    mapPosition: { x: 50, y: 100 },
    width: 300,
    height: 200,
    floorColor: "#e3f2fd",
    accentColor: "#2196f3",
    deskPositions: [
      { x: 50, y: 50, z: 0 },
      { x: 120, y: 50, z: 0 },
      { x: 190, y: 50, z: 0 },
      { x: 50, y: 120, z: 0 },
      { x: 120, y: 120, z: 0 },
      { x: 190, y: 120, z: 0 },
    ],
    meetingAreas: [{ position: { x: 250, y: 150, z: 0 }, size: 2 }],
    decorations: [
      { type: "plant", x: 20, y: 20 },
      { type: "water", x: 270, y: 30 },
    ],
  },
  HR: {
    mapPosition: { x: 400, y: 100 },
    width: 250,
    height: 200,
    floorColor: "#f3e5f5",
    accentColor: "#9c27b0",
    deskPositions: [
      { x: 50, y: 50, z: 0 },
      { x: 120, y: 50, z: 0 },
      { x: 50, y: 120, z: 0 },
      { x: 120, y: 120, z: 0 },
    ],
    meetingAreas: [{ position: { x: 200, y: 100, z: 0 }, size: 1.5 }],
    decorations: [
      { type: "plant", x: 20, y: 20 },
      { type: "couch", x: 180, y: 170 },
    ],
  },
  "MFG & Purchases": {
    mapPosition: { x: 700, y: 100 },
    width: 350,
    height: 200,
    floorColor: "#e8f5e9",
    accentColor: "#4caf50",
    deskPositions: [
      { x: 50, y: 40, z: 0 },
      { x: 120, y: 40, z: 0 },
      { x: 190, y: 40, z: 0 },
      { x: 50, y: 100, z: 0 },
      { x: 120, y: 100, z: 0 },
      { x: 190, y: 100, z: 0 },
      { x: 50, y: 160, z: 0 },
      { x: 120, y: 160, z: 0 },
      { x: 190, y: 160, z: 0 },
    ],
    meetingAreas: [{ position: { x: 280, y: 100, z: 0 }, size: 2 }],
    decorations: [
      { type: "plant", x: 20, y: 20 },
      { type: "plant", x: 320, y: 20 },
      { type: "water", x: 320, y: 170 },
    ],
  },
  "CF PS MFG EGYPT": {
    mapPosition: { x: 1100, y: 100 },
    width: 300,
    height: 200,
    floorColor: "#e0f7fa",
    accentColor: "#00bcd4",
    deskPositions: [
      { x: 50, y: 50, z: 0 },
      { x: 120, y: 50, z: 0 },
      { x: 190, y: 50, z: 0 },
      { x: 50, y: 120, z: 0 },
      { x: 120, y: 120, z: 0 },
      { x: 190, y: 120, z: 0 },
    ],
    meetingAreas: [{ position: { x: 250, y: 150, z: 0 }, size: 2 }],
    decorations: [
      { type: "plant", x: 20, y: 20 },
      { type: "couch", x: 250, y: 50 },
    ],
  },
  "F&A": {
    mapPosition: { x: 1450, y: 100 },
    width: 250,
    height: 200,
    floorColor: "#fff3e0",
    accentColor: "#ff9800",
    deskPositions: [
      { x: 50, y: 50, z: 0 },
      { x: 120, y: 50, z: 0 },
      { x: 50, y: 120, z: 0 },
      { x: 120, y: 120, z: 0 },
    ],
    meetingAreas: [{ position: { x: 200, y: 100, z: 0 }, size: 1.5 }],
    decorations: [
      { type: "plant", x: 20, y: 20 },
      { type: "water", x: 220, y: 170 },
    ],
  },
  "Line-1": {
    mapPosition: { x: 50, y: 350 },
    width: 300,
    height: 200,
    floorColor: "#fff3e0",
    accentColor: "#ff9800",
    deskPositions: [
      { x: 50, y: 50, z: 0 },
      { x: 120, y: 50, z: 0 },
      { x: 190, y: 50, z: 0 },
      { x: 50, y: 120, z: 0 },
    ],
    meetingAreas: [{ position: { x: 250, y: 100, z: 0 }, size: 1.5 }],
    decorations: [
      { type: "plant", x: 20, y: 20 },
      { type: "couch", x: 250, y: 170 },
    ],
  },
  QA: {
    mapPosition: { x: 400, y: 350 },
    width: 250,
    height: 200,
    floorColor: "#ffebee",
    accentColor: "#f44336",
    deskPositions: [
      { x: 50, y: 50, z: 0 },
      { x: 120, y: 50, z: 0 },
      { x: 50, y: 120, z: 0 },
      { x: 120, y: 120, z: 0 },
    ],
    meetingAreas: [{ position: { x: 200, y: 100, z: 0 }, size: 1.5 }],
    decorations: [
      { type: "plant", x: 20, y: 20 },
      { type: "water", x: 220, y: 30 },
    ],
  },
}

// Add default configuration for departments not explicitly defined
import { departments } from "./departments"

departments.forEach((dept, index) => {
  if (!departmentConfigs[dept]) {
    // Calculate position based on index
    const row = Math.floor(index / 5)
    const col = index % 5

    departmentConfigs[dept] = {
      mapPosition: { x: 50 + col * 350, y: 100 + row * 250 },
      width: 250,
      height: 200,
      floorColor: "#f5f5f5",
      accentColor: "#607d8b",
      deskPositions: [
        { x: 50, y: 50, z: 0 },
        { x: 120, y: 50, z: 0 },
        { x: 50, y: 120, z: 0 },
        { x: 120, y: 120, z: 0 },
      ],
      meetingAreas: [{ position: { x: 200, y: 100, z: 0 }, size: 1.5 }],
      decorations: [
        { type: "plant", x: 20, y: 20 },
        { type: "couch", x: 200, y: 170 },
      ],
    }
  }
})
