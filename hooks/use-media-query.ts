"use client"

import { useState, useEffect } from "react"

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const media = window.matchMedia(query)

      // Initial check
      setMatches(media.matches)

      // Add listener for changes
      const listener = (e: MediaQueryListEvent) => {
        setMatches(e.matches)
      }

      // Modern browsers
      if (media.addEventListener) {
        media.addEventListener("change", listener)
        return () => media.removeEventListener("change", listener)
      }
      // Older browsers
      else {
        media.addListener(listener)
        return () => media.removeListener(listener)
      }
    }

    // Default to false for SSR
    return () => {}
  }, [query])

  return matches
}
