"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export function KeyboardShortcuts() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "?" && !e.ctrlKey && !e.metaKey) {
        setIsOpen(true)
      } else if (e.key === "Escape") {
        setIsOpen(false)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  const shortcuts = [
    { key: "Arrow Keys", description: "Move your avatar" },
    { key: "Shift + Arrow Keys", description: "Move faster" },
    { key: "Space", description: "Toggle pause/play time" },
    { key: "+/-", description: "Zoom in/out" },
    { key: "C", description: "Center view on your avatar" },
    { key: "M", description: "Toggle microphone" },
    { key: "V", description: "Toggle video" },
    { key: "T", description: "Open time controls" },
    { key: "D", description: "Open dimension controls" },
    { key: "Esc", description: "Close modals" },
    { key: "?", description: "Show this help" },
  ]

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Keyboard Shortcuts</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {shortcuts.map((shortcut, index) => (
            <div key={index} className="flex items-center justify-between">
              <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">
                {shortcut.key}
              </kbd>
              <span className="text-sm">{shortcut.description}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-end">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
