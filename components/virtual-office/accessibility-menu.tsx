"use client"

import { useState } from "react"
import { Accessibility, Eye, Moon, Sun, Monitor } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useTheme } from "next-themes"

export function AccessibilityMenu() {
  const [zoomLevel, setZoomLevel] = useState(100)
  const [highContrast, setHighContrast] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)
  const [screenReader, setScreenReader] = useState(false)
  const [keyboardShortcuts, setKeyboardShortcuts] = useState(true)
  const { theme, setTheme } = useTheme()

  const handleZoomChange = (value: number[]) => {
    setZoomLevel(value[0])
    document.documentElement.style.fontSize = `${value[0]}%`
  }

  const handleHighContrastChange = (checked: boolean) => {
    setHighContrast(checked)
    if (checked) {
      document.documentElement.classList.add("high-contrast")
    } else {
      document.documentElement.classList.remove("high-contrast")
    }
  }

  const handleReduceMotionChange = (checked: boolean) => {
    setReduceMotion(checked)
    if (checked) {
      document.documentElement.classList.add("reduce-motion")
    } else {
      document.documentElement.classList.remove("reduce-motion")
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="fixed bottom-20 right-4 z-50 rounded-full h-10 w-10 bg-white shadow-md"
        >
          <Accessibility className="h-5 w-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <div className="space-y-4">
          <h3 className="font-medium">Accessibility Settings</h3>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="theme">Theme</Label>
              <div className="flex items-center gap-1">
                <Button
                  variant={theme === "light" ? "default" : "outline"}
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setTheme("light")}
                >
                  <Sun className="h-4 w-4" />
                </Button>
                <Button
                  variant={theme === "dark" ? "default" : "outline"}
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setTheme("dark")}
                >
                  <Moon className="h-4 w-4" />
                </Button>
                <Button
                  variant={theme === "system" ? "default" : "outline"}
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setTheme("system")}
                >
                  <Monitor className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="zoom">Text Size ({zoomLevel}%)</Label>
              <div className="flex items-center gap-1">
                <Eye className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
            <Slider
              id="zoom"
              min={75}
              max={150}
              step={5}
              value={[zoomLevel]}
              onValueChange={(value) => handleZoomChange(value)}
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Label htmlFor="high-contrast">High Contrast</Label>
              </div>
              <Switch id="high-contrast" checked={highContrast} onCheckedChange={handleHighContrastChange} />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Label htmlFor="reduce-motion">Reduce Motion</Label>
              </div>
              <Switch id="reduce-motion" checked={reduceMotion} onCheckedChange={handleReduceMotionChange} />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Label htmlFor="screen-reader">Screen Reader Support</Label>
              </div>
              <Switch id="screen-reader" checked={screenReader} onCheckedChange={setScreenReader} />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Label htmlFor="keyboard-shortcuts">Keyboard Shortcuts</Label>
              </div>
              <Switch id="keyboard-shortcuts" checked={keyboardShortcuts} onCheckedChange={setKeyboardShortcuts} />
            </div>
          </div>

          <div className="pt-2 text-xs text-muted-foreground">
            Press <kbd className="px-1 py-0.5 bg-muted rounded border">?</kbd> to view keyboard shortcuts
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
