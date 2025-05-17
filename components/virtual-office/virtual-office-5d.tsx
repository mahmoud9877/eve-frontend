"use client"

import { useState, useEffect, useRef } from "react"
import { OfficeLayout } from "./office-layout"
import { UserAvatar } from "./user-avatar"
import { TopBar } from "./top-bar"
import { BottomToolbar } from "./bottom-toolbar"
import { SidePanel } from "./side-panel"
import { DimensionControls } from "./dimension-controls"
import { DimensionModal } from "./dimension-modal"
import { useUser } from "@/hooks/use-user"
import { useVirtualOffice } from "@/hooks/use-virtual-office"
import { useSpatialAudio } from "@/hooks/use-spatial-audio"
import { useDimensions } from "@/hooks/use-dimensions"
import { LoadingScreen } from "./loading-screen"
import { ZoomControls } from "./zoom-controls"
import { FloorSelector } from "./floor-selector"
import { TimeControls } from "./time-controls"
import { InviteModal } from "./invite-modal"
import { CustomizeModal } from "./customize-modal"
import { TimelineModal } from "./timeline-modal"
import { useKeyboardNavigation } from "@/hooks/use-keyboard-navigation"
import { useTimeTravel } from "@/hooks/use-time-travel"
import type { Position } from "@/types/office"
import type { TimePoint } from "@/types/time"

export default function VirtualOffice5D() {
  const [isLoading, setIsLoading] = useState(true)
  const [currentFloor, setCurrentFloor] = useState("Main Floor")
  const [scale, setScale] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [showInviteModal, setShowInviteModal] = useState(false)
  const [showCustomizeModal, setShowCustomizeModal] = useState(false)
  const [showTimelineModal, setShowTimelineModal] = useState(false)
  const [showDimensionModal, setShowDimensionModal] = useState(false)
  const [sidePanelContent, setSidePanelContent] = useState<string | null>(null)

  const mapRef = useRef<HTMLDivElement>(null)
  const { user, updateUserStatus } = useUser()
  const { users, connectToOffice, disconnectFromOffice, updateUserPosition } = useVirtualOffice()
  const { initializeAudio, updateAudioPositions } = useSpatialAudio()
  const {
    currentTime,
    timeSpeed,
    isRecording,
    isPaused,
    timePoints,
    setCurrentTime,
    setTimeSpeed,
    toggleRecording,
    togglePause,
    jumpToTimePoint,
    addTimePoint,
    getUsersAtTime,
  } = useTimeTravel()

  const { dimensions, currentDimension, createDimension, switchDimension, mergeDimensions } = useDimensions()

  // Get users at the current time point
  const timeAdjustedUsers = getUsersAtTime(currentTime, users)

  // Initialize keyboard navigation
  useKeyboardNavigation({
    onMove: (direction) => {
      if (user && !isPaused) {
        const step = 20
        const newPosition: Position = { ...user.position }

        switch (direction) {
          case "up":
            newPosition.y -= step
            break
          case "down":
            newPosition.y += step
            break
          case "left":
            newPosition.x -= step
            break
          case "right":
            newPosition.x += step
            break
        }

        updateUserPosition(user.id, newPosition)

        // Record position change if recording is active
        if (isRecording) {
          addTimePoint({
            timestamp: new Date(),
            userId: user.id,
            position: newPosition,
            status: user.status,
            action: "move",
            dimensionId: currentDimension.id,
          })
        }
      }
    },
  })

  useEffect(() => {
    // Connect to virtual office when component mounts
    if (user) {
      connectToOffice(user)
      initializeAudio()
    }

    // Cleanup on unmount
    return () => {
      if (user) {
        disconnectFromOffice(user.id)
      }
    }
  }, [user, connectToOffice, disconnectFromOffice, initializeAudio])

  useEffect(() => {
    // Update audio positions whenever users move
    updateAudioPositions(timeAdjustedUsers)
  }, [timeAdjustedUsers, updateAudioPositions])

  useEffect(() => {
    // Simulate loading assets
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.1, 1.5))
  }

  const handleZoomOut = () => {
    setScale((prev) => Math.max(prev - 0.1, 0.5))
  }

  const handleFloorChange = (floor: string) => {
    setCurrentFloor(floor)
  }

  const handlePanelToggle = (panel: string | null) => {
    setSidePanelContent(panel === sidePanelContent ? null : panel)
  }

  const centerOnUser = () => {
    if (user && mapRef.current) {
      const mapWidth = mapRef.current.offsetWidth
      const mapHeight = mapRef.current.offsetHeight

      setPosition({
        x: -(user.position.x - mapWidth / 2),
        y: -(user.position.y - mapHeight / 2),
      })
    }
  }

  const handleUserPositionChange = (userId: string, newPosition: Position) => {
    updateUserPosition(userId, newPosition)

    // Record position change if recording is active
    if (isRecording && user && userId === user.id) {
      addTimePoint({
        timestamp: new Date(),
        userId,
        position: newPosition,
        status: user.status,
        action: "move",
        dimensionId: currentDimension.id,
      })
    }
  }

  const handleStatusChange = (userId: string, status: string) => {
    updateUserStatus(userId, status)

    // Record status change if recording is active
    if (isRecording && user && userId === user.id) {
      addTimePoint({
        timestamp: new Date(),
        userId,
        position: user.position,
        status,
        action: "status",
        dimensionId: currentDimension.id,
      })
    }
  }

  const handleJumpToTimePoint = (timePoint: TimePoint) => {
    jumpToTimePoint(timePoint)
    setShowTimelineModal(false)
  }

  const handleCreateDimension = (name: string, description: string) => {
    createDimension(name, description, users, currentTime)
    setShowDimensionModal(false)
  }

  const handleSwitchDimension = (dimensionId: string) => {
    switchDimension(dimensionId)
    setShowDimensionModal(false)
  }

  const handleMergeDimensions = (sourceDimensionId: string, targetDimensionId: string) => {
    mergeDimensions(sourceDimensionId, targetDimensionId)
    setShowDimensionModal(false)
  }

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <div className="w-full h-screen bg-gray-100 overflow-hidden relative">
      <TopBar
        spaceName="Sammy's Tech Startup"
        currentFloor={currentFloor}
        userCount={timeAdjustedUsers.length}
        currentTime={currentTime}
        currentDimension={currentDimension}
        onInvite={() => setShowInviteModal(true)}
        onCustomize={() => setShowCustomizeModal(true)}
        onTimelineOpen={() => setShowTimelineModal(true)}
        onDimensionOpen={() => setShowDimensionModal(true)}
      />

      <div ref={mapRef} className="absolute top-16 left-0 right-0 bottom-16 overflow-hidden bg-gray-100">
        <div
          className="absolute transition-transform duration-300 ease-out"
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            transformOrigin: "center",
          }}
        >
          <OfficeLayout
            currentFloor={currentFloor}
            users={timeAdjustedUsers}
            currentTime={currentTime}
            currentDimension={currentDimension}
          />

          {timeAdjustedUsers.map((officeUser) => (
            <UserAvatar
              key={officeUser.id}
              user={officeUser}
              isCurrentUser={user?.id === officeUser.id}
              updatePosition={handleUserPositionChange}
              isTimeFrozen={isPaused || user?.id !== officeUser.id}
              dimension={currentDimension}
            />
          ))}
        </div>
      </div>

      <ZoomControls onZoomIn={handleZoomIn} onZoomOut={handleZoomOut} onCenter={centerOnUser} scale={scale} />

      <FloorSelector
        currentFloor={currentFloor}
        floors={["Main Floor", "Second Floor", "Executive Suite"]}
        onFloorChange={handleFloorChange}
      />

      <DimensionControls
        currentDimension={currentDimension}
        dimensionsCount={dimensions.length}
        onOpenDimensionModal={() => setShowDimensionModal(true)}
      />

      <TimeControls
        currentTime={currentTime}
        timeSpeed={timeSpeed}
        isRecording={isRecording}
        isPaused={isPaused}
        onTimeChange={setCurrentTime}
        onSpeedChange={setTimeSpeed}
        onToggleRecording={toggleRecording}
        onTogglePause={togglePause}
      />

      <BottomToolbar
        onToggleChat={() => handlePanelToggle("chat")}
        onTogglePeople={() => handlePanelToggle("people")}
        isChatActive={sidePanelContent === "chat"}
        isPeopleActive={sidePanelContent === "people"}
      />

      {sidePanelContent && (
        <SidePanel
          content={sidePanelContent}
          users={timeAdjustedUsers}
          currentTime={currentTime}
          currentDimension={currentDimension}
          onClose={() => setSidePanelContent(null)}
        />
      )}

      {showInviteModal && <InviteModal onClose={() => setShowInviteModal(false)} />}

      {showCustomizeModal && (
        <CustomizeModal user={user} onClose={() => setShowCustomizeModal(false)} onUpdateStatus={handleStatusChange} />
      )}

      {showTimelineModal && (
        <TimelineModal
          timePoints={timePoints.filter((tp) => tp.dimensionId === currentDimension.id)}
          currentTime={currentTime}
          onJumpToTime={handleJumpToTimePoint}
          onClose={() => setShowTimelineModal(false)}
        />
      )}

      {showDimensionModal && (
        <DimensionModal
          dimensions={dimensions}
          currentDimension={currentDimension}
          onCreateDimension={handleCreateDimension}
          onSwitchDimension={handleSwitchDimension}
          onMergeDimensions={handleMergeDimensions}
          onClose={() => setShowDimensionModal(false)}
        />
      )}
    </div>
  )
}
