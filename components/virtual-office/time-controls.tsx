"use client"

import { useState, useEffect } from "react"
import { Play, Pause, FastForward, Rewind, Clock, RepeatIcon as Record } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { formatDate } from "@/lib/utils"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface TimeControlsProps {
  currentTime: Date
  timeSpeed: number
  isRecording: boolean
  isPaused: boolean
  onTimeChange: (time: Date) => void
  onSpeedChange: (speed: number) => void
  onToggleRecording: () => void
  onTogglePause: () => void
  isMobile?: boolean
}

export function TimeControls({
  currentTime,
  timeSpeed,
  isRecording,
  isPaused,
  onTimeChange,
  onSpeedChange,
  onToggleRecording,
  onTogglePause,
  isMobile = false,
}: TimeControlsProps) {
  const [showTimeControls, setShowTimeControls] = useState(false)
  const [localTime, setLocalTime] = useState<Date>(currentTime)

  // Update local time when current time changes
  useEffect(() => {
    setLocalTime(currentTime)
  }, [currentTime])

  // Handle time slider change
  const handleTimeSliderChange = (value: number[]) => {
    const now = new Date()
    const newTime = new Date(now.getTime() + value[0] * 60 * 60 * 1000)
    setLocalTime(newTime)
  }

  // Apply time change when slider is released
  const handleTimeSliderCommit = () => {
    onTimeChange(localTime)
  }

  // Handle speed slider change
  const handleSpeedChange = (value: number[]) => {
    onSpeedChange(value[0])
  }

  if (isMobile) {
    return (
      <div className="absolute left-1/2 transform -translate-x-1/2 bottom-20 z-10">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="bg-white shadow-md">
              <Clock className="h-4 w-4 mr-1" />
              <span className="text-xs">{formatDate(currentTime, true)}</span>
              {timeSpeed !== 1 && <span className="ml-1 text-xs">({timeSpeed}x)</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium">Time Controls</h4>
                <div className="text-xs text-muted-foreground">
                  {formatDate(currentTime, true)}
                  {timeSpeed !== 1 && ` (${timeSpeed}x)`}
                </div>
              </div>

              <div className="flex items-center justify-between gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => onSpeedChange(Math.max(0.25, timeSpeed - 0.25))}
                >
                  <Rewind className="h-4 w-4" />
                </Button>

                <Button variant={isPaused ? "default" : "outline"} size="sm" onClick={onTogglePause}>
                  {isPaused ? <Play className="h-4 w-4 mr-1" /> : <Pause className="h-4 w-4 mr-1" />}
                  <span>{isPaused ? "Play" : "Pause"}</span>
                </Button>

                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => onSpeedChange(Math.min(4, timeSpeed + 0.25))}
                >
                  <FastForward className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-3">
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium">Time:</span>
                    <span className="text-xs text-muted-foreground">
                      {localTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                  <Slider
                    className="w-full"
                    min={-24}
                    max={24}
                    step={0.5}
                    value={[(localTime.getTime() - new Date().getTime()) / (60 * 60 * 1000)]}
                    onValueChange={handleTimeSliderChange}
                    onValueCommit={handleTimeSliderCommit}
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium">Speed:</span>
                    <span className="text-xs text-muted-foreground">{timeSpeed}x</span>
                  </div>
                  <Slider
                    className="w-full"
                    min={0.25}
                    max={4}
                    step={0.25}
                    value={[timeSpeed]}
                    onValueChange={handleSpeedChange}
                  />
                </div>
              </div>

              <Button
                variant={isRecording ? "destructive" : "outline"}
                size="sm"
                className="w-full"
                onClick={onToggleRecording}
              >
                <Record className="h-4 w-4 mr-1" />
                {isRecording ? "Stop Recording" : "Start Recording"}
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    )
  }

  return (
    <div className="absolute left-1/2 transform -translate-x-1/2 bottom-20 z-10">
      <div className="bg-white rounded-lg shadow-md p-2 flex items-center gap-2">
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setShowTimeControls(!showTimeControls)}>
          <Clock className="h-4 w-4" />
        </Button>

        {showTimeControls && (
          <>
            <div className="h-8 w-px bg-gray-200" />

            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => onSpeedChange(Math.max(0.25, timeSpeed - 0.25))}
            >
              <Rewind className="h-4 w-4" />
            </Button>

            <Button variant={isPaused ? "default" : "outline"} size="icon" className="h-8 w-8" onClick={onTogglePause}>
              {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => onSpeedChange(Math.min(4, timeSpeed + 0.25))}
            >
              <FastForward className="h-4 w-4" />
            </Button>

            <div className="h-8 w-px bg-gray-200" />

            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium">Time:</span>
                <Slider
                  className="w-32"
                  min={-24}
                  max={24}
                  step={0.5}
                  value={[(localTime.getTime() - new Date().getTime()) / (60 * 60 * 1000)]}
                  onValueChange={handleTimeSliderChange}
                  onValueCommit={handleTimeSliderCommit}
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium">Speed:</span>
                <Slider
                  className="w-32"
                  min={0.25}
                  max={4}
                  step={0.25}
                  value={[timeSpeed]}
                  onValueChange={handleSpeedChange}
                />
              </div>
            </div>

            <div className="h-8 w-px bg-gray-200" />

            <Button
              variant={isRecording ? "destructive" : "outline"}
              size="icon"
              className="h-8 w-8"
              onClick={onToggleRecording}
            >
              <Record className="h-4 w-4" />
            </Button>
          </>
        )}

        <div className="px-2 text-xs font-medium">
          {formatDate(currentTime)}
          {timeSpeed !== 1 && ` (${timeSpeed}x)`}
          {isRecording && " • Recording"}
        </div>
      </div>
    </div>
  )
}
