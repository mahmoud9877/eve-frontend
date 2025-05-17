"use client"

import { useEffect } from "react"

interface KeyboardNavigationOptions {
  onMove: (direction: "up" | "down" | "left" | "right") => void
}

export function useKeyboardNavigation({ onMove }: KeyboardNavigationOptions) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
          onMove("up")
          break
        case "ArrowDown":
          onMove("down")
          break
        case "ArrowLeft":
          onMove("left")
          break
        case "ArrowRight":
          onMove("right")
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [onMove])
}
