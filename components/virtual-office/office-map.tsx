"use client"

import { useMemo } from "react"
import { departmentConfigs } from "@/lib/department-configs"
import { departments } from "@/lib/departments"

interface OfficeMapProps {
  currentDepartment: string
}

export function OfficeMap({ currentDepartment }: OfficeMapProps) {
  // Create a map of all departments
  const officeLayout = useMemo(() => {
    return (
      <div className="relative" style={{ width: "3000px", height: "1000px" }}>
        {/* Horizontal layout of departments */}
        {departments.map((dept, index) => {
          const config = departmentConfigs[dept] || departmentConfigs["CF PS"]
          const isActive = dept === currentDepartment

          return (
            <div
              key={dept}
              className={`absolute transition-all duration-300 ${isActive ? "ring-2 ring-primary ring-offset-2" : ""}`}
              style={{
                left: `${config.mapPosition.x}px`,
                top: `${config.mapPosition.y}px`,
                width: `${config.width}px`,
                height: `${config.height}px`,
              }}
            >
              {/* Department container */}
              <div className="relative w-full h-full bg-white rounded-lg shadow-md overflow-hidden">
                {/* Department header */}
                <div
                  className="h-8 flex items-center justify-center text-white font-medium text-sm"
                  style={{ backgroundColor: config.accentColor }}
                >
                  {dept}
                </div>

                {/* Department floor */}
                <div className="absolute inset-0 mt-8" style={{ backgroundColor: config.floorColor }}>
                  {/* Walls */}
                  <div className="absolute inset-0 border-2 border-gray-400"></div>

                  {/* Desks */}
                  {config.deskPositions.map((desk, i) => (
                    <div
                      key={`desk-${i}`}
                      className="absolute bg-amber-800 rounded-sm shadow-sm"
                      style={{
                        left: `${desk.x}px`,
                        top: `${desk.y}px`,
                        width: "60px",
                        height: "40px",
                      }}
                    >
                      {/* Chair */}
                      <div
                        className="absolute bg-gray-600 rounded-full"
                        style={{
                          left: "20px",
                          top: "45px",
                          width: "20px",
                          height: "20px",
                        }}
                      ></div>
                    </div>
                  ))}

                  {/* Meeting areas */}
                  {config.meetingAreas.map((area, i) => (
                    <div
                      key={`meeting-${i}`}
                      className="absolute bg-gray-300 rounded-full shadow-sm"
                      style={{
                        left: `${area.position.x - area.size * 20}px`,
                        top: `${area.position.y - area.size * 20}px`,
                        width: `${area.size * 40}px`,
                        height: `${area.size * 40}px`,
                      }}
                    >
                      {/* Chairs around meeting table */}
                      {Array.from({ length: 6 }).map((_, chairIndex) => {
                        const angle = (chairIndex / 6) * Math.PI * 2
                        const chairX = Math.sin(angle) * area.size * 25
                        const chairY = Math.cos(angle) * area.size * 25
                        return (
                          <div
                            key={`chair-${i}-${chairIndex}`}
                            className="absolute bg-gray-600 rounded-full"
                            style={{
                              left: `${area.size * 20 + chairX - 10}px`,
                              top: `${area.size * 20 + chairY - 10}px`,
                              width: "20px",
                              height: "20px",
                            }}
                          ></div>
                        )
                      })}
                    </div>
                  ))}

                  {/* Plants and decorations */}
                  {config.decorations?.map((decor, i) => (
                    <div
                      key={`decor-${i}`}
                      className="absolute"
                      style={{
                        left: `${decor.x}px`,
                        top: `${decor.y}px`,
                      }}
                    >
                      {decor.type === "plant" && (
                        <div className="w-12 h-12 flex items-center justify-center">
                          <div className="w-8 h-8 bg-green-500 rounded-full"></div>
                        </div>
                      )}
                      {decor.type === "couch" && <div className="w-20 h-10 bg-blue-400 rounded-md"></div>}
                      {decor.type === "water" && <div className="w-10 h-10 bg-blue-300 rounded-full"></div>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )
        })}

        {/* Connecting hallways between departments */}
        <div className="absolute left-0 top-0 w-full h-full">
          {departments.map((dept, index) => {
            if (index === departments.length - 1) return null

            const currentConfig = departmentConfigs[dept] || departmentConfigs["CF PS"]
            const nextConfig = departmentConfigs[departments[index + 1]] || departmentConfigs["CF PS"]

            // Only connect departments that are adjacent in the horizontal layout
            if (Math.abs(currentConfig.mapPosition.y - nextConfig.mapPosition.y) < 300) {
              const startX = currentConfig.mapPosition.x + currentConfig.width
              const startY = currentConfig.mapPosition.y + currentConfig.height / 2
              const endX = nextConfig.mapPosition.x
              const endY = nextConfig.mapPosition.y + nextConfig.height / 2

              return (
                <div
                  key={`hallway-${index}`}
                  className="absolute bg-gray-200"
                  style={{
                    left: `${startX}px`,
                    top: `${Math.min(startY, endY) - 15}px`,
                    width: `${endX - startX}px`,
                    height: "30px",
                  }}
                ></div>
              )
            }
            return null
          })}
        </div>
      </div>
    )
  }, [currentDepartment])

  return officeLayout
}
