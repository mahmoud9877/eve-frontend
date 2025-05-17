import type { OfficeFloor } from "@/types/office"

export const officeConfig: Record<string, OfficeFloor> = {
  "Main Floor": {
    id: "main-floor",
    areas: [
      {
        id: "reception",
        name: "Reception",
        position: { x: 100, y: 100 },
        width: 300,
        height: 200,
        floorColor: "#f0f4f8",
        walls: [
          { x: 0, y: 0, width: 300, height: 10 },
          { x: 0, y: 0, width: 10, height: 200 },
          { x: 0, y: 190, width: 300, height: 10 },
          { x: 290, y: 0, width: 10, height: 200 },
        ],
        furniture: [
          { type: "desk", x: 50, y: 100, width: 120, height: 60 },
          { type: "plant", x: 250, y: 50 },
          { type: "sofa", x: 180, y: 30, width: 80, height: 40 },
          { type: "coffee_table", x: 190, y: 80, width: 60, height: 30 },
          { type: "window", x: 0, y: 50, width: 10, height: 100 },
        ],
        conversationZones: [
          { name: "Reception Desk", x: 110, y: 130, radius: 60 },
          { name: "Waiting Area", x: 210, y: 50, radius: 50 },
        ],
      },
      {
        id: "open-workspace",
        name: "Open Workspace",
        position: { x: 450, y: 100 },
        width: 500,
        height: 300,
        floorColor: "#e6f7ff",
        walls: [
          { x: 0, y: 0, width: 500, height: 10 },
          { x: 0, y: 0, width: 10, height: 300 },
          { x: 0, y: 290, width: 500, height: 10 },
          { x: 490, y: 0, width: 10, height: 300 },
        ],
        furniture: [
          { type: "desk", x: 50, y: 50 },
          { type: "desk", x: 150, y: 50 },
          { type: "desk", x: 250, y: 50 },
          { type: "desk", x: 350, y: 50 },
          { type: "desk", x: 50, y: 150 },
          { type: "desk", x: 150, y: 150 },
          { type: "desk", x: 250, y: 150 },
          { type: "desk", x: 350, y: 150 },
          { type: "desk", x: 50, y: 250 },
          { type: "desk", x: 150, y: 250 },
          { type: "desk", x: 250, y: 250 },
          { type: "desk", x: 350, y: 250 },
          { type: "plant", x: 450, y: 50 },
          { type: "plant", x: 450, y: 250 },
          { type: "window", x: 100, y: 0, width: 300, height: 10 },
        ],
        conversationZones: [
          { name: "Team Area 1", x: 200, y: 100, radius: 100 },
          { name: "Team Area 2", x: 200, y: 250, radius: 100 },
        ],
      },
      {
        id: "meeting-room-1",
        name: "Meeting Room A",
        position: { x: 450, y: 450 },
        width: 200,
        height: 150,
        floorColor: "#fff8e1",
        walls: [
          { x: 0, y: 0, width: 200, height: 10 },
          { x: 0, y: 0, width: 10, height: 150 },
          { x: 0, y: 140, width: 200, height: 10 },
          { x: 190, y: 0, width: 10, height: 150 },
        ],
        furniture: [
          { type: "meeting_table", x: 100, y: 75, width: 120, height: 120 },
          { type: "window", x: 0, y: 50, width: 10, height: 50 },
        ],
        conversationZones: [{ name: "Conference", x: 100, y: 75, radius: 70 }],
      },
      {
        id: "meeting-room-2",
        name: "Meeting Room B",
        position: { x: 700, y: 450 },
        width: 200,
        height: 150,
        floorColor: "#e8f5e9",
        walls: [
          { x: 0, y: 0, width: 200, height: 10 },
          { x: 0, y: 0, width: 10, height: 150 },
          { x: 0, y: 140, width: 200, height: 10 },
          { x: 190, y: 0, width: 10, height: 150 },
        ],
        furniture: [
          { type: "meeting_table", x: 100, y: 75, width: 120, height: 120 },
          { type: "window", x: 190, y: 50, width: 10, height: 50 },
        ],
        conversationZones: [{ name: "Brainstorming", x: 100, y: 75, radius: 70 }],
      },
      {
        id: "lounge",
        name: "Lounge Area",
        position: { x: 1000, y: 100 },
        width: 300,
        height: 200,
        floorColor: "#f3e5f5",
        walls: [
          { x: 0, y: 0, width: 300, height: 10 },
          { x: 0, y: 0, width: 10, height: 200 },
          { x: 0, y: 190, width: 300, height: 10 },
          { x: 290, y: 0, width: 10, height: 200 },
        ],
        furniture: [
          { type: "sofa", x: 50, y: 50, width: 120, height: 40 },
          { type: "sofa", x: 50, y: 150, width: 120, height: 40 },
          { type: "coffee_table", x: 150, y: 100, width: 80, height: 40 },
          { type: "plant", x: 250, y: 50 },
          { type: "plant", x: 250, y: 150 },
          { type: "window", x: 290, y: 50, width: 10, height: 100 },
        ],
        conversationZones: [{ name: "Casual Chat", x: 150, y: 100, radius: 80 }],
      },
      {
        id: "kitchen",
        name: "Kitchen & Break Area",
        position: { x: 1000, y: 350 },
        width: 300,
        height: 250,
        floorColor: "#e0f2f1",
        walls: [
          { x: 0, y: 0, width: 300, height: 10 },
          { x: 0, y: 0, width: 10, height: 250 },
          { x: 0, y: 240, width: 300, height: 10 },
          { x: 290, y: 0, width: 10, height: 250 },
        ],
        furniture: [
          { type: "kitchen_counter", x: 50, y: 30, width: 200, height: 40 },
          { type: "refrigerator", x: 260, y: 30, width: 30, height: 40 },
          { type: "coffee_table", x: 100, y: 150, width: 100, height: 60 },
          { type: "sofa", x: 50, y: 220, width: 80, height: 30 },
          { type: "sofa", x: 170, y: 220, width: 80, height: 30 },
          { type: "window", x: 290, y: 100, width: 10, height: 100 },
        ],
        conversationZones: [
          { name: "Coffee Break", x: 150, y: 50, radius: 60 },
          { name: "Lunch Area", x: 150, y: 180, radius: 80 },
        ],
      },
      {
        id: "quiet-zone",
        name: "Quiet Zone",
        position: { x: 1350, y: 100 },
        width: 250,
        height: 200,
        floorColor: "#f1f8e9",
        walls: [
          { x: 0, y: 0, width: 250, height: 10 },
          { x: 0, y: 0, width: 10, height: 200 },
          { x: 0, y: 190, width: 250, height: 10 },
          { x: 240, y: 0, width: 10, height: 200 },
        ],
        furniture: [
          { type: "desk", x: 50, y: 50 },
          { type: "desk", x: 150, y: 50 },
          { type: "desk", x: 50, y: 150 },
          { type: "desk", x: 150, y: 150 },
          { type: "plant", x: 200, y: 100 },
          { type: "window", x: 240, y: 50, width: 10, height: 100 },
        ],
        conversationZones: [{ name: "Focus Work", x: 125, y: 100, radius: 100 }],
      },
      {
        id: "executive-office",
        name: "Executive Office",
        position: { x: 1350, y: 350 },
        width: 250,
        height: 200,
        floorColor: "#fff3e0",
        walls: [
          { x: 0, y: 0, width: 250, height: 10 },
          { x: 0, y: 0, width: 10, height: 200 },
          { x: 0, y: 190, width: 250, height: 10 },
          { x: 240, y: 0, width: 10, height: 200 },
        ],
        furniture: [
          { type: "desk", x: 125, y: 100, width: 120, height: 60 },
          { type: "sofa", x: 50, y: 30, width: 100, height: 40 },
          { type: "coffee_table", x: 75, y: 80, width: 50, height: 30 },
          { type: "plant", x: 200, y: 30 },
          { type: "window", x: 240, y: 50, width: 10, height: 100 },
        ],
        conversationZones: [{ name: "CEO Office", x: 125, y: 100, radius: 80 }],
      },
    ],
    connections: [
      // Horizontal connections
      { x: 400, y: 150, width: 50, height: 30 }, // Reception to Open Workspace
      { x: 950, y: 150, width: 50, height: 30 }, // Open Workspace to Lounge
      { x: 1300, y: 150, width: 50, height: 30 }, // Lounge to Quiet Zone

      // Vertical connections
      { x: 550, y: 400, width: 30, height: 50 }, // Open Workspace to Meeting Room A
      { x: 800, y: 400, width: 30, height: 50 }, // Open Workspace to Meeting Room B
      { x: 1150, y: 300, width: 30, height: 50 }, // Lounge to Kitchen
      { x: 1450, y: 300, width: 30, height: 50 }, // Quiet Zone to Executive Office
    ],
  },
  "Second Floor": {
    id: "second-floor",
    areas: [
      {
        id: "design-studio",
        name: "Design Studio",
        position: { x: 450, y: 100 },
        width: 400,
        height: 300,
        floorColor: "#e1f5fe",
        walls: [
          { x: 0, y: 0, width: 400, height: 10 },
          { x: 0, y: 0, width: 10, height: 300 },
          { x: 0, y: 290, width: 400, height: 10 },
          { x: 390, y: 0, width: 10, height: 300 },
        ],
        furniture: [
          { type: "desk", x: 50, y: 50, width: 100, height: 60 },
          { type: "desk", x: 250, y: 50, width: 100, height: 60 },
          { type: "desk", x: 50, y: 150, width: 100, height: 60 },
          { type: "desk", x: 250, y: 150, width: 100, height: 60 },
          { type: "meeting_table", x: 200, y: 250, width: 150, height: 150 },
          { type: "plant", x: 350, y: 50 },
          { type: "plant", x: 350, y: 250 },
          { type: "window", x: 100, y: 0, width: 200, height: 10 },
        ],
        conversationZones: [
          { name: "Design Team", x: 200, y: 100, radius: 120 },
          { name: "Design Review", x: 200, y: 250, radius: 80 },
        ],
      },
      {
        id: "engineering-pod",
        name: "Engineering Pod",
        position: { x: 900, y: 100 },
        width: 400,
        height: 300,
        floorColor: "#e8f5e9",
        walls: [
          { x: 0, y: 0, width: 400, height: 10 },
          { x: 0, y: 0, width: 10, height: 300 },
          { x: 0, y: 290, width: 400, height: 10 },
          { x: 390, y: 0, width: 10, height: 300 },
        ],
        furniture: [
          { type: "desk", x: 50, y: 50, width: 100, height: 60 },
          { type: "desk", x: 250, y: 50, width: 100, height: 60 },
          { type: "desk", x: 50, y: 150, width: 100, height: 60 },
          { type: "desk", x: 250, y: 150, width: 100, height: 60 },
          { type: "desk", x: 50, y: 250, width: 100, height: 60 },
          { type: "desk", x: 250, y: 250, width: 100, height: 60 },
          { type: "plant", x: 350, y: 50 },
          { type: "plant", x: 350, y: 250 },
          { type: "window", x: 100, y: 0, width: 200, height: 10 },
        ],
        conversationZones: [{ name: "Dev Team", x: 200, y: 150, radius: 150 }],
      },
      {
        id: "game-room",
        name: "Game Room",
        position: { x: 450, y: 450 },
        width: 300,
        height: 200,
        floorColor: "#f3e5f5",
        walls: [
          { x: 0, y: 0, width: 300, height: 10 },
          { x: 0, y: 0, width: 10, height: 200 },
          { x: 0, y: 190, width: 300, height: 10 },
          { x: 290, y: 0, width: 10, height: 200 },
        ],
        furniture: [
          { type: "coffee_table", x: 150, y: 100, width: 120, height: 60 },
          { type: "sofa", x: 50, y: 50, width: 100, height: 40 },
          { type: "sofa", x: 50, y: 150, width: 100, height: 40 },
          { type: "sofa", x: 200, y: 50, width: 100, height: 40 },
          { type: "sofa", x: 200, y: 150, width: 100, height: 40 },
          { type: "plant", x: 250, y: 100 },
          { type: "window", x: 0, y: 50, width: 10, height: 100 },
        ],
        conversationZones: [{ name: "Game Area", x: 150, y: 100, radius: 100 }],
      },
      {
        id: "nap-pods",
        name: "Nap Pods",
        position: { x: 800, y: 450 },
        width: 200,
        height: 200,
        floorColor: "#e0f7fa",
        walls: [
          { x: 0, y: 0, width: 200, height: 10 },
          { x: 0, y: 0, width: 10, height: 200 },
          { x: 0, y: 190, width: 200, height: 10 },
          { x: 190, y: 0, width: 10, height: 200 },
        ],
        furniture: [
          { type: "sofa", x: 50, y: 50, width: 100, height: 40 },
          { type: "sofa", x: 50, y: 150, width: 100, height: 40 },
          { type: "plant", x: 150, y: 50 },
          { type: "plant", x: 150, y: 150 },
          { type: "window", x: 190, y: 50, width: 10, height: 100 },
        ],
        conversationZones: [{ name: "Rest Area", x: 100, y: 100, radius: 80 }],
      },
      {
        id: "library",
        name: "Library",
        position: { x: 1050, y: 450 },
        width: 250,
        height: 200,
        floorColor: "#fff8e1",
        walls: [
          { x: 0, y: 0, width: 250, height: 10 },
          { x: 0, y: 0, width: 10, height: 200 },
          { x: 0, y: 190, width: 250, height: 10 },
          { x: 240, y: 0, width: 10, height: 200 },
        ],
        furniture: [
          { type: "desk", x: 50, y: 50 },
          { type: "desk", x: 150, y: 50 },
          { type: "desk", x: 50, y: 150 },
          { type: "desk", x: 150, y: 150 },
          { type: "plant", x: 200, y: 100 },
          { type: "window", x: 240, y: 50, width: 10, height: 100 },
        ],
        conversationZones: [{ name: "Quiet Reading", x: 125, y: 100, radius: 100 }],
      },
    ],
    connections: [
      // Horizontal connections
      { x: 850, y: 200, width: 50, height: 30 }, // Design Studio to Engineering Pod
      { x: 750, y: 550, width: 50, height: 30 }, // Game Room to Nap Pods
      { x: 1000, y: 550, width: 50, height: 30 }, // Nap Pods to Library

      // Vertical connections
      { x: 600, y: 400, width: 30, height: 50 }, // Design Studio to Game Room
      { x: 1000, y: 400, width: 30, height: 50 }, // Engineering Pod to Nap Pods
    ],
  },
  "Executive Suite": {
    id: "executive-suite",
    areas: [
      {
        id: "executive-lobby",
        name: "Executive Lobby",
        position: { x: 450, y: 100 },
        width: 300,
        height: 200,
        floorColor: "#fafafa",
        walls: [
          { x: 0, y: 0, width: 300, height: 10 },
          { x: 0, y: 0, width: 10, height: 200 },
          { x: 0, y: 190, width: 300, height: 10 },
          { x: 290, y: 0, width: 10, height: 200 },
        ],
        furniture: [
          { type: "sofa", x: 50, y: 50, width: 120, height: 40 },
          { type: "sofa", x: 50, y: 150, width: 120, height: 40 },
          { type: "coffee_table", x: 150, y: 100, width: 80, height: 40 },
          { type: "plant", x: 250, y: 50 },
          { type: "plant", x: 250, y: 150 },
          { type: "window", x: 0, y: 50, width: 10, height: 100 },
        ],
        conversationZones: [{ name: "Executive Waiting", x: 150, y: 100, radius: 80 }],
      },
      {
        id: "ceo-office",
        name: "CEO Office",
        position: { x: 800, y: 100 },
        width: 350,
        height: 250,
        floorColor: "#fff8e1",
        walls: [
          { x: 0, y: 0, width: 350, height: 10 },
          { x: 0, y: 0, width: 10, height: 250 },
          { x: 0, y: 240, width: 350, height: 10 },
          { x: 340, y: 0, width: 10, height: 250 },
        ],
        furniture: [
          { type: "desk", x: 175, y: 125, width: 150, height: 80 },
          { type: "sofa", x: 50, y: 50, width: 120, height: 40 },
          { type: "coffee_table", x: 75, y: 100, width: 70, height: 40 },
          { type: "plant", x: 300, y: 50 },
          { type: "plant", x: 300, y: 200 },
          { type: "window", x: 340, y: 50, width: 10, height: 150 },
        ],
        conversationZones: [
          { name: "CEO Desk", x: 175, y: 125, radius: 80 },
          { name: "CEO Meeting", x: 75, y: 75, radius: 60 },
        ],
      },
      {
        id: "boardroom",
        name: "Boardroom",
        position: { x: 450, y: 350 },
        width: 500,
        height: 300,
        floorColor: "#e8eaf6",
        walls: [
          { x: 0, y: 0, width: 500, height: 10 },
          { x: 0, y: 0, width: 10, height: 300 },
          { x: 0, y: 290, width: 500, height: 10 },
          { x: 490, y: 0, width: 10, height: 300 },
        ],
        furniture: [
          { type: "meeting_table", x: 250, y: 150, width: 300, height: 150 },
          { type: "plant", x: 50, y: 50 },
          { type: "plant", x: 450, y: 50 },
          { type: "plant", x: 50, y: 250 },
          { type: "plant", x: 450, y: 250 },
          { type: "window", x: 100, y: 0, width: 300, height: 10 },
        ],
        conversationZones: [{ name: "Board Meeting", x: 250, y: 150, radius: 150 }],
      },
      {
        id: "executive-lounge",
        name: "Executive Lounge",
        position: { x: 1000, y: 350 },
        width: 300,
        height: 200,
        floorColor: "#f3e5f5",
        walls: [
          { x: 0, y: 0, width: 300, height: 10 },
          { x: 0, y: 0, width: 10, height: 200 },
          { x: 0, y: 190, width: 300, height: 10 },
          { x: 290, y: 0, width: 10, height: 200 },
        ],
        furniture: [
          { type: "sofa", x: 50, y: 50, width: 120, height: 40 },
          { type: "sofa", x: 50, y: 150, width: 120, height: 40 },
          { type: "coffee_table", x: 150, y: 100, width: 80, height: 40 },
          { type: "plant", x: 250, y: 50 },
          { type: "plant", x: 250, y: 150 },
          { type: "window", x: 290, y: 50, width: 10, height: 100 },
        ],
        conversationZones: [{ name: "Executive Relaxation", x: 150, y: 100, radius: 80 }],
      },
    ],
    connections: [
      // Horizontal connections
      { x: 750, y: 150, width: 50, height: 30 }, // Executive Lobby to CEO Office
      { x: 950, y: 450, width: 50, height: 30 }, // Boardroom to Executive Lounge

      // Vertical connections
      { x: 600, y: 300, width: 30, height: 50 }, // Executive Lobby to Boardroom
      { x: 900, y: 300, width: 30, height: 50 }, // CEO Office to Boardroom
    ],
  },
}
