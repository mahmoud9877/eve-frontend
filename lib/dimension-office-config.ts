import type { OfficeFloor } from "@/types/office"
import type { Dimension } from "@/types/dimension"

// Function to adjust office configuration based on dimension
export function getDimensionBasedOfficeConfig(
  dimension: Dimension | undefined,
  baseConfig: Record<string, OfficeFloor>,
): Record<string, OfficeFloor> {
  // If no dimension is provided, return the base config
  if (!dimension) {
    return baseConfig
  }

  // Create a deep copy of the base configuration
  const dimensionAdjustedConfig = JSON.parse(JSON.stringify(baseConfig))

  // Apply dimension-specific modifications based on dimension properties
  Object.keys(dimensionAdjustedConfig).forEach((floorKey) => {
    const floor = dimensionAdjustedConfig[floorKey]

    floor.areas.forEach((area) => {
      // Example: Add a futuristic element to the "Future Office" dimension
      if (dimension.id === "future-office") {
        if (!area.furniture) area.furniture = []

        // Add a holographic projector to the area
        if (!area.furniture.some((f) => f.type === "holographic_projector")) {
          area.furniture.push({
            type: "holographic_projector",
            x: area.width * 0.5,
            y: area.height * 0.5,
            width: 50,
            height: 50,
          })
        }
      }

      // Example: Remove furniture in the "Open Floor Plan" dimension
      if (dimension.id === "open-plan") {
        if (area.furniture) {
          area.furniture = area.furniture.filter((item) => item.type !== "desk" && item.type !== "chair")
        }
      }

      // Add dimension-specific decorations
      if (dimension.decorations && dimension.decorations[area.id]) {
        if (!area.furniture) area.furniture = []
        area.furniture.push(...dimension.decorations[area.id])
      }
    })
  })

  return dimensionAdjustedConfig
}
