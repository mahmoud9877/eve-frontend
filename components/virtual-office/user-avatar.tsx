"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Mic, MicOff, MoreHorizontal } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { User } from "@/types/user"
import type { Position } from "@/types/office"
import type { Dimension } from "@/types/dimension"

interface UserAvatarProps {
  user: User
  isCurrentUser: boolean
  updatePosition: (userId: string, position: Position) => void
  isTimeFrozen: boolean
  dimension?: Dimension
}

export function UserAvatar({ user, isCurrentUser, updatePosition, isTimeFrozen, dimension }: UserAvatarProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [position, setPosition] = useState<Position>(user.position)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [previousPositions, setPreviousPositions] = useState<Position[]>([])
  const [dimensionEffect, setDimensionEffect] = useState<string | null>(null)
  const avatarRef = useRef<HTMLDivElement>(null)

  // Simulate speaking status changes
  useEffect(() => {
    if (user.isMicrophoneOn) {
      const interval = setInterval(() => {
        // Random speaking simulation
        setIsSpeaking(Math.random() > 0.7)
      }, 1000)

      return () => clearInterval(interval)
    } else {
      setIsSpeaking(false)
    }
  }, [user.isMicrophoneOn])

  // Update position when user position changes
  useEffect(() => {
    setPosition(user.position)

    // Store previous positions for motion trail
    setPreviousPositions((prev) => {
      const newPositions = [...prev, user.position]
      if (newPositions.length > 10) {
        return newPositions.slice(newPositions.length - 10)
      }
      return newPositions
    })
  }, [user.position])

  // Apply dimension-specific effects to avatar
  useEffect(() => {
    if (dimension?.effects?.avatarEffect) {
      setDimensionEffect(dimension.effects.avatarEffect)
    } else {
      setDimensionEffect(null)
    }
  }, [dimension])

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isCurrentUser && !isTimeFrozen) {
      setIsDragging(true)
      e.preventDefault()
    }
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && avatarRef.current) {
        const rect = avatarRef.current.parentElement?.getBoundingClientRect()
        if (rect) {
          const newX = e.clientX - rect.left
          const newY = e.clientY - rect.top

          setPosition({ x: newX, y: newY })

          // Update position in state
          updatePosition(user.id, { x: newX, y: newY })
        }
      }
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove)
      window.addEventListener("mouseup", handleMouseUp)
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDragging, updatePosition, user.id])

  // Get dimension-specific avatar styles
  const getAvatarStyles = () => {
    const baseStyles = {
      left: `${position.x}px`,
      top: `${position.y}px`,
      transform: "translate(-50%, -50%)",
      opacity: isTimeFrozen && !isCurrentUser ? 0.7 : 1,
    }

    if (dimensionEffect === "glow") {
      return {
        ...baseStyles,
        boxShadow: `0 0 10px 5px ${dimension?.color || "#7c3aed"}50`,
      }
    }

    if (dimensionEffect === "ghost") {
      return {
        ...baseStyles,
        opacity: 0.7,
        filter: "blur(1px)",
      }
    }

    if (dimensionEffect === "pixelated") {
      return {
        ...baseStyles,
        imageRendering: "pixelated",
      }
    }

    return baseStyles
  }

  return (
    <>
      {/* Motion trail */}
      {previousPositions.slice(0, -1).map((pos, index) => {
        const opacity = 0.1 + (index / previousPositions.length) * 0.2
        const size = 6 + (index / previousPositions.length) * 6

        return (
          <div
            key={`trail-${index}`}
            className="absolute rounded-full"
            style={{
              left: `${pos.x}px`,
              top: `${pos.y}px`,
              width: `${size}px`,
              height: `${size}px`,
              backgroundColor: dimensionEffect === "glow" ? dimension?.color || "#7c3aed" : user.color || "#2196f3",
              opacity,
              transform: "translate(-50%, -50%)",
              zIndex: 5,
            }}
          />
        )
      })}

      <motion.div
        ref={avatarRef}
        className={`absolute z-10 ${isDragging ? "cursor-grabbing" : isCurrentUser && !isTimeFrozen ? "cursor-grab" : "cursor-default"}`}
        style={getAvatarStyles()}
        onMouseDown={handleMouseDown}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{
          scale: 1,
          opacity: 1,
          y: isSpeaking ? -5 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 15,
          y: {
            type: "spring",
            stiffness: 300,
            damping: 10,
            repeat: isSpeaking ? Number.POSITIVE_INFINITY : 0,
            repeatType: "reverse",
          },
        }}
        aria-label={`${user.name}, ${user.role}, ${user.status}`}
      >
        {/* Dimension indicator */}
        {dimension && dimension.id !== "default" && (
          <div
            className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full border-2 border-white"
            style={{ backgroundColor: dimension.color || "#7c3aed" }}
          />
        )}

        {/* Time indicator for non-current time */}
        {isTimeFrozen && !isCurrentUser && (
          <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-1 rounded">
            Past
          </div>
        )}

        {/* Speaking indicator */}
        <AnimatePresence>
          {isSpeaking && (
            <motion.div
              className="absolute -top-2 -right-2 w-4 h-4 bg-green-500 rounded-full"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.2 }}
            />
          )}
        </AnimatePresence>

        {/* Avatar circle with user photo or initial */}
        <div className={`relative ${isCurrentUser ? "ring-2 ring-blue-500" : ""}`}>
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold shadow-md border-2 border-white overflow-hidden ${
              dimensionEffect === "pixelated" ? "pixelated" : ""
            }`}
            style={{
              backgroundColor: user.color || "#2196f3",
              boxShadow: dimensionEffect === "glow" ? `0 0 10px 5px ${dimension?.color || "#7c3aed"}50` : undefined,
            }}
          >
            {user.photoUrl ? (
              <img
                src={user.photoUrl || "/placeholder.svg"}
                alt={user.name}
                className={`w-full h-full object-cover ${dimensionEffect === "pixelated" ? "pixelated" : ""}`}
                crossOrigin="anonymous"
              />
            ) : (
              user.name.charAt(0)
            )}
          </div>

          {/* Status indicator */}
          <div
            className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white"
            style={{ backgroundColor: user.isActive ? "#4CAF50" : "#9E9E9E" }}
          />

          {/* Microphone indicator */}
          <div className="absolute -bottom-1 -left-1 w-4 h-4 rounded-full bg-white flex items-center justify-center">
            {user.isMicrophoneOn ? (
              <Mic className="w-3 h-3 text-green-500" />
            ) : (
              <MicOff className="w-3 h-3 text-red-500" />
            )}
          </div>
        </div>

        {/* Nameplate and status */}
        <AnimatePresence>
          {(isHovered || isCurrentUser) && (
            <motion.div
              className="absolute top-14 left-1/2 transform -translate-x-1/2 bg-white shadow-md rounded-md px-2 py-1 whitespace-nowrap text-center"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <div className="font-medium text-sm">{user.name}</div>
              <div className="text-xs text-gray-500">{user.status}</div>

              {isCurrentUser && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="mt-1 text-xs text-primary flex items-center justify-center w-full">
                      <MoreHorizontal className="h-3 w-3 mr-1" />
                      Options
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="center">
                    <DropdownMenuItem>Set Status</DropdownMenuItem>
                    <DropdownMenuItem>Change Avatar</DropdownMenuItem>
                    <DropdownMenuItem>Toggle Microphone</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  )
}
