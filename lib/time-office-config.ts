import type { OfficeFloor } from "@/types/office"

// Function to adjust office configuration based on time
export function getTimeBasedOfficeConfig(
  currentTime: Date,
  baseConfig: Record<string, OfficeFloor>,
): Record<string, OfficeFloor> {
  // Create a deep copy of the base configuration
  const timeAdjustedConfig = JSON.parse(JSON.stringify(baseConfig))

  // Get current hour
  const hour = currentTime.getHours()
  const dayOfWeek = currentTime.getDay() // 0 = Sunday, 6 = Saturday
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6

  // Apply time-based modifications
  Object.keys(timeAdjustedConfig).forEach((floorKey) => {
    const floor = timeAdjustedConfig[floorKey]

    // Modify areas based on time of day
    floor.areas.forEach((area) => {
      // Early morning (before 7 AM) - most areas are empty
      if (hour < 7) {
        // Remove most furniture except structural elements
        if (area.furniture) {
          area.furniture = area.furniture.filter(
            (item) => item.type === "window" || item.type === "wall" || item.type === "plant",
          )
        }

        // Add cleaning staff to some areas
        if (hour >= 5 && Math.random() > 0.7) {
          if (!area.furniture) area.furniture = []
          area.furniture.push({
            type: "cleaning_cart",
            x: Math.random() * area.width * 0.8,
            y: Math.random() * area.height * 0.8,
            width: 30,
            height: 20,
          })
        }
      }

      // Lunch time (12 PM - 2 PM) - more people in kitchen/break areas
      if (hour >= 12 && hour < 14) {
        if (area.id.includes("kitchen") || area.id.includes("break")) {
          // Add more furniture to represent busy lunch time
          if (area.furniture) {
            // Add lunch items to tables
            area.furniture.forEach((item) => {
              if (item.type === "coffee_table") {
                item.color = "#e0e0e0" // Add lunch items
              }
            })
          }
        }
      }

      // After hours (after 6 PM) - most areas are empty except for some late workers
      if (hour >= 18) {
        // Dim the lights
        area.floorColor = darkenColor(area.floorColor || "#f5e1c0")

        // Remove some furniture to represent people leaving
        if (area.furniture && !isWeekend) {
          area.furniture = area.furniture.filter((item) => {
            // Keep 20% of desks and chairs for late workers
            if (item.type === "desk" || item.type === "chair") {
              return Math.random() > 0.8
            }
            return true
          })
        }
      }

      // Weekend modifications
      if (isWeekend) {
        // Most areas are empty on weekends
        if (area.furniture) {
          // Keep only 10% of desks and chairs for weekend workers
          area.furniture = area.furniture.filter((item) => {
            if (item.type === "desk" || item.type === "chair") {
              return Math.random() > 0.9
            }
            return true
          })
        }
      }

      // Seasonal modifications
      const month = currentTime.getMonth()

      // Winter (December, January, February)
      if (month === 11 || month === 0 || month === 1) {
        // Add holiday decorations in December
        if (month === 11) {
          if (!area.furniture) area.furniture = []

          // Add a Christmas tree to large areas
          if (area.width > 200 && area.height > 150 && !area.furniture.some((f) => f.type === "christmas_tree")) {
            area.furniture.push({
              type: "christmas_tree",
              x: area.width * 0.8,
              y: area.height * 0.2,
              width: 40,
              height: 40,
            })
          }
        }
      }

      // Summer (June, July, August)
      if (month >= 5 && month <= 7) {
        // Brighter colors in summer
        area.floorColor = lightenColor(area.floorColor || "#f5e1c0")

        // Add fans to some areas
        if (Math.random() > 0.7 && !area.furniture?.some((f) => f.type === "fan")) {
          if (!area.furniture) area.furniture = []
          area.furniture.push({
            type: "fan",
            x: Math.random() * area.width * 0.8,
            y: Math.random() * area.height * 0.8,
            width: 20,
            height: 20,
          })
        }
      }
    })
  })

  return timeAdjustedConfig
}

// Helper function to darken a color
function darkenColor(color: string): string {
  // Simple implementation - in a real app, use a proper color library
  if (color.startsWith("#")) {
    const r = Number.parseInt(color.slice(1, 3), 16)
    const g = Number.parseInt(color.slice(3, 5), 16)
    const b = Number.parseInt(color.slice(5, 7), 16)

    const darkenFactor = 0.7

    const newR = Math.floor(r * darkenFactor)
    const newG = Math.floor(g * darkenFactor)
    const newB = Math.floor(b * darkenFactor)

    return `#${newR.toString(16).padStart(2, "0")}${newG.toString(16).padStart(2, "0")}${newB.toString(16).padStart(2, "0")}`
  }

  return color
}

// Helper function to lighten a color
function lightenColor(color: string): string {
  if (color.startsWith("#")) {
    const r = Number.parseInt(color.slice(1, 3), 16)
    const g = Number.parseInt(color.slice(3, 5), 16)
    const b = Number.parseInt(color.slice(5, 7), 16)

    const lightenFactor = 1.3

    const newR = Math.min(255, Math.floor(r * lightenFactor))
    const newG = Math.min(255, Math.floor(g * lightenFactor))
    const newB = Math.min(255, Math.floor(b * lightenFactor))

    return `#${newR.toString(16).padStart(2, "0")}${newG.toString(16).padStart(2, "0")}${newB.toString(16).padStart(2, "0")}`
  }

  return color
}
