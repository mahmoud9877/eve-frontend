"use client"

import { useMemo } from "react"
import { officeConfig } from "@/lib/office-config"
import { getTimeBasedOfficeConfig } from "@/lib/time-office-config"
import { getDimensionBasedOfficeConfig } from "@/lib/dimension-office-config"
import type { User } from "@/types/user"
import type { Dimension } from "@/types/dimension"

interface OfficeLayoutProps {
  currentFloor: string
  users: User[]
  currentTime: Date
  currentDimension?: Dimension
}

export function OfficeLayout({ currentFloor, users, currentTime, currentDimension }: OfficeLayoutProps) {
  // Create a map of all floors and areas
  const officeLayout = useMemo(() => {
    // Get time-adjusted office configuration
    const timeAdjustedConfig = getTimeBasedOfficeConfig(currentTime, officeConfig)

    // Apply dimension-specific adjustments if dimension is provided
    const dimensionAdjustedConfig = currentDimension
      ? getDimensionBasedOfficeConfig(currentDimension, timeAdjustedConfig)
      : timeAdjustedConfig

    const floorConfig = dimensionAdjustedConfig[currentFloor] || dimensionAdjustedConfig["Main Floor"]

    return (
      <div className="relative" style={{ width: "3000px", height: "2000px" }}>
        {/* Base floor */}
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "#f5e1c0" }} // Wood-tone flooring
        />

        {/* Time and dimension indicators */}
        <div className="absolute top-4 left-4 bg-white/80 px-3 py-1 rounded-full text-sm font-medium shadow-sm">
          {currentTime.toLocaleString()} {currentDimension && `• ${currentDimension.name}`}
        </div>

        {/* Dimension boundary visualization */}
        {currentDimension && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              border: `4px solid ${currentDimension.color || "#7c3aed"}`,
              boxShadow: `inset 0 0 20px ${currentDimension.color || "#7c3aed"}30`,
            }}
          />
        )}

        {/* Office areas */}
        {floorConfig.areas.map((area) => (
          <div
            key={area.id}
            className="absolute"
            style={{
              left: `${area.position.x}px`,
              top: `${area.position.y}px`,
              width: `${area.width}px`,
              height: `${area.height}px`,
            }}
          >
            {/* Area container */}
            <div className="relative w-full h-full">
              {/* Area floor */}
              <div className="absolute inset-0" style={{ backgroundColor: area.floorColor || "#f5e1c0" }} />

              {/* Area walls */}
              {area.walls?.map((wall, index) => (
                <div
                  key={`wall-${index}`}
                  className="absolute bg-gray-300"
                  style={{
                    left: `${wall.x}px`,
                    top: `${wall.y}px`,
                    width: `${wall.width}px`,
                    height: `${wall.height}px`,
                    backgroundColor: "#e0e0e0",
                  }}
                />
              ))}

              {/* Area name */}
              <div
                className="absolute text-sm font-medium text-gray-700 bg-white/80 px-2 py-1 rounded"
                style={{ left: "10px", top: "10px" }}
              >
                {area.name}
              </div>

              {/* Furniture */}
              {area.furniture?.map((item, index) => {
                // Render different furniture types
                if (item.type === "desk") {
                  return (
                    <div
                      key={`furniture-${index}`}
                      className="absolute"
                      style={{
                        left: `${item.x}px`,
                        top: `${item.y}px`,
                        width: `${item.width || 80}px`,
                        height: `${item.height || 40}px`,
                        backgroundColor: "#8B4513",
                        borderRadius: "2px",
                      }}
                    >
                      {/* Chair */}
                      <div
                        className="absolute bg-gray-600 rounded-full"
                        style={{
                          left: `${(item.width || 80) / 2 - 10}px`,
                          top: `${(item.height || 40) + 5}px`,
                          width: "20px",
                          height: "20px",
                        }}
                      />
                    </div>
                  )
                }

                if (item.type === "meeting_table") {
                  return (
                    <div
                      key={`furniture-${index}`}
                      className="absolute"
                      style={{
                        left: `${item.x}px`,
                        top: `${item.y}px`,
                        width: `${item.width || 100}px`,
                        height: `${item.height || 100}px`,
                        backgroundColor: "#6d4c41",
                        borderRadius: "50%",
                      }}
                    >
                      {/* Chairs around meeting table */}
                      {Array.from({ length: 6 }).map((_, chairIndex) => {
                        const angle = (chairIndex / 6) * Math.PI * 2
                        const radius = (item.width || 100) / 2 + 15
                        const chairX = Math.sin(angle) * radius
                        const chairY = Math.cos(angle) * radius
                        return (
                          <div
                            key={`chair-${index}-${chairIndex}`}
                            className="absolute bg-gray-600 rounded-full"
                            style={{
                              left: `${(item.width || 100) / 2 + chairX - 10}px`,
                              top: `${(item.height || 100) / 2 + chairY - 10}px`,
                              width: "20px",
                              height: "20px",
                            }}
                          />
                        )
                      })}
                    </div>
                  )
                }

                if (item.type === "sofa") {
                  return (
                    <div
                      key={`furniture-${index}`}
                      className="absolute"
                      style={{
                        left: `${item.x}px`,
                        top: `${item.y}px`,
                        width: `${item.width || 120}px`,
                        height: `${item.height || 40}px`,
                        backgroundColor: "#5c6bc0",
                        borderRadius: "4px",
                      }}
                    />
                  )
                }

                if (item.type === "coffee_table") {
                  return (
                    <div
                      key={`furniture-${index}`}
                      className="absolute"
                      style={{
                        left: `${item.x}px`,
                        top: `${item.y}px`,
                        width: `${item.width || 60}px`,
                        height: `${item.height || 40}px`,
                        backgroundColor: "#a1887f",
                        borderRadius: "4px",
                      }}
                    />
                  )
                }

                if (item.type === "plant") {
                  return (
                    <div
                      key={`furniture-${index}`}
                      className="absolute"
                      style={{
                        left: `${item.x}px`,
                        top: `${item.y}px`,
                        width: `${item.width || 30}px`,
                        height: `${item.height || 30}px`,
                      }}
                    >
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="w-full h-full bg-green-500 rounded-full" />
                      </div>
                    </div>
                  )
                }

                if (item.type === "kitchen_counter") {
                  return (
                    <div
                      key={`furniture-${index}`}
                      className="absolute"
                      style={{
                        left: `${item.x}px`,
                        top: `${item.y}px`,
                        width: `${item.width || 150}px`,
                        height: `${item.height || 40}px`,
                        backgroundColor: "#e0e0e0",
                        borderRadius: "2px",
                      }}
                    />
                  )
                }

                if (item.type === "refrigerator") {
                  return (
                    <div
                      key={`furniture-${index}`}
                      className="absolute"
                      style={{
                        left: `${item.x}px`,
                        top: `${item.y}px`,
                        width: `${item.width || 40}px`,
                        height: `${item.height || 40}px`,
                        backgroundColor: "#b0bec5",
                        borderRadius: "2px",
                      }}
                    />
                  )
                }

                if (item.type === "window") {
                  return (
                    <div
                      key={`furniture-${index}`}
                      className="absolute"
                      style={{
                        left: `${item.x}px`,
                        top: `${item.y}px`,
                        width: `${item.width || 80}px`,
                        height: `${item.height || 10}px`,
                        backgroundColor: "#bbdefb",
                        borderRadius: "2px",
                      }}
                    />
                  )
                }

                if (item.type === "portal") {
                  return (
                    <div
                      key={`furniture-${index}`}
                      className="absolute"
                      style={{
                        left: `${item.x}px`,
                        top: `${item.y}px`,
                        width: `${item.width || 40}px`,
                        height: `${item.height || 80}px`,
                      }}
                    >
                      <div
                        className="w-full h-full rounded-full animate-pulse"
                        style={{
                          background: `radial-gradient(circle, ${item.color || "#7c3aed"} 0%, transparent 70%)`,
                          boxShadow: `0 0 15px 5px ${item.color || "#7c3aed"}80`,
                        }}
                      />
                    </div>
                  )
                }

                // Default fallback
                return (
                  <div
                    key={`furniture-${index}`}
                    className="absolute bg-gray-400"
                    style={{
                      left: `${item.x}px`,
                      top: `${item.y}px`,
                      width: `${item.width || 40}px`,
                      height: `${item.height || 40}px`,
                    }}
                  />
                )
              })}

              {/* Conversation zones */}
              {area.conversationZones?.map((zone, index) => (
                <div
                  key={`zone-${index}`}
                  className="absolute rounded-full border-2 border-dashed border-blue-300 bg-blue-50/30"
                  style={{
                    left: `${zone.x}px`,
                    top: `${zone.y}px`,
                    width: `${zone.radius * 2}px`,
                    height: `${zone.radius * 2}px`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs text-blue-500 whitespace-nowrap">
                    {zone.name}
                  </div>
                </div>
              ))}

              {/* Dimension anomalies - visual effects specific to this dimension */}
              {currentDimension?.anomalies?.map((anomaly, index) => {
                if (anomaly.areaId === area.id) {
                  return (
                    <div
                      key={`anomaly-${index}`}
                      className="absolute rounded-full animate-pulse"
                      style={{
                        left: `${anomaly.x}px`,
                        top: `${anomaly.y}px`,
                        width: `${anomaly.radius * 2}px`,
                        height: `${anomaly.radius * 2}px`,
                        background: `radial-gradient(circle, ${anomaly.color}40 0%, transparent 70%)`,
                        boxShadow: `0 0 15px 5px ${anomaly.color}30`,
                        transform: "translate(-50%, -50%)",
                      }}
                    >
                      <div
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs font-medium whitespace-nowrap"
                        style={{ color: anomaly.color }}
                      >
                        {anomaly.name}
                      </div>
                    </div>
                  )
                }
                return null
              })}
            </div>
          </div>
        ))}

        {/* Doorways and connections */}
        {floorConfig.connections?.map((connection, index) => (
          <div
            key={`connection-${index}`}
            className="absolute bg-gray-200"
            style={{
              left: `${connection.x}px`,
              top: `${connection.y}px`,
              width: `${connection.width}px`,
              height: `${connection.height}px`,
            }}
          />
        ))}

        {/* Dimension portals - connections to other dimensions */}
        {currentDimension?.portals?.map((portal, index) => (
          <div
            key={`portal-${index}`}
            className="absolute"
            style={{
              left: `${portal.position.x}px`,
              top: `${portal.position.y}px`,
              width: "60px",
              height: "60px",
              transform: "translate(-50%, -50%)",
            }}
          >
            <div
              className="w-full h-full rounded-full animate-pulse"
              style={{
                background: `radial-gradient(circle, ${portal.color || "#7c3aed"} 0%, transparent 70%)`,
                boxShadow: `0 0 15px 5px ${portal.color || "#7c3aed"}80`,
              }}
            />
            <div
              className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 text-xs font-medium whitespace-nowrap bg-white/80 px-2 py-0.5 rounded"
              style={{ color: portal.color || "#7c3aed" }}
            >
              {portal.targetName}
            </div>
          </div>
        ))}

        {/* Time-specific elements */}
        {currentTime.getHours() >= 18 || currentTime.getHours() < 6 ? (
          <div className="absolute inset-0 bg-blue-900/20 pointer-events-none">
            {/* Night lighting effect */}
            {floorConfig.areas.flatMap((area) =>
              area.furniture
                ?.filter((item) => item.type === "desk" || item.type === "meeting_table")
                .map((item, index) => (
                  <div
                    key={`light-${area.id}-${index}`}
                    className="absolute bg-yellow-100/30 rounded-full"
                    style={{
                      left: `${area.position.x + item.x + (item.width || 40) / 2}px`,
                      top: `${area.position.y + item.y + (item.height || 40) / 2}px`,
                      width: "60px",
                      height: "60px",
                      transform: "translate(-50%, -50%)",
                      boxShadow: "0 0 20px 10px rgba(255, 244, 180, 0.3)",
                    }}
                  />
                )),
            )}
          </div>
        ) : null}

        {/* Weather effects based on time */}
        {currentTime.getMonth() === 11 || currentTime.getMonth() === 0 || currentTime.getMonth() === 1 ? (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Winter snow effect */}
            {Array.from({ length: 50 }).map((_, i) => (
              <div
                key={`snow-${i}`}
                className="absolute bg-white rounded-full opacity-70"
                style={{
                  left: `${Math.random() * 3000}px`,
                  top: `${Math.random() * 2000}px`,
                  width: `${Math.random() * 5 + 2}px`,
                  height: `${Math.random() * 5 + 2}px`,
                  animation: `fall ${Math.random() * 10 + 5}s linear infinite`,
                  animationDelay: `${Math.random() * 5}s`,
                }}
              />
            ))}
          </div>
        ) : null}

        {/* Dimension-specific weather effects */}
        {currentDimension?.weather && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {currentDimension.weather === "rain" &&
              Array.from({ length: 100 }).map((_, i) => (
                <div
                  key={`rain-${i}`}
                  className="absolute bg-blue-400 opacity-70"
                  style={{
                    left: `${Math.random() * 3000}px`,
                    top: `${Math.random() * 2000}px`,
                    width: `2px`,
                    height: `${Math.random() * 10 + 10}px`,
                    animation: `fall ${Math.random() * 2 + 1}s linear infinite`,
                    animationDelay: `${Math.random() * 2}s`,
                  }}
                />
              ))}

            {currentDimension.weather === "fog" && (
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(to bottom, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.3) 100%)",
                  animation: "fogMove 30s infinite alternate",
                }}
              />
            )}

            {currentDimension.weather === "aurora" && (
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  background: "linear-gradient(45deg, #ff00cc, #3300ff, #00ff99, #ff9900)",
                  backgroundSize: "400% 400%",
                  animation: "aurora 15s ease infinite",
                }}
              />
            )}
          </div>
        )}
      </div>
    )
  }, [currentFloor, currentTime, currentDimension])

  return (
    <>
      <style jsx global>{`
        @keyframes fall {
          0% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(2000px);
          }
        }
        
        @keyframes fogMove {
          0% {
            opacity: 0.4;
          }
          50% {
            opacity: 0.7;
          }
          100% {
            opacity: 0.4;
          }
        }
        
        @keyframes aurora {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
      {officeLayout}
    </>
  )
}
