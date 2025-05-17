"use client"

import { useState, useEffect, useRef, useCallback, Suspense, lazy } from "react"
import { OfficeLayout } from "./office-layout"
import { UserAvatar } from "./user-avatar"
import { TopBar } from "./top-bar"
import { BottomToolbar } from "./bottom-toolbar"
import { SidePanel } from "./side-panel"
import { LoadingScreen } from "./loading-screen"
import { ZoomControls } from "./zoom-controls"
import { FloorSelector } from "./floor-selector"
import { TimeControls } from "./time-controls"
import { DimensionControls } from "./dimension-controls"
import { ErrorBoundary } from "./error-boundary"
import { useUser } from "@/hooks/use-user"
import { useVirtualOffice } from "@/hooks/use-virtual-office"
import { useSpatialAudio } from "@/hooks/use-spatial-audio"
import { useKeyboardNavigation } from "@/hooks/use-keyboard-navigation"
import { useTimeTravel } from "@/hooks/use-time-travel"
import { useDimensions } from "@/hooks/use-dimensions"
import type { Position } from "@/types/office"
import type { TimePoint } from "@/types/time"

// Lazy load modals for better performance
const InviteModal = lazy(() => import("./invite-modal").then((mod) => ({ default: mod.InviteModal })))
const CustomizeModal = lazy(() => import("./customize-modal").then((mod) => ({ default: mod.CustomizeModal })))
const TimelineModal = lazy(() => import("./timeline-modal").then((mod) => ({ default: mod.TimelineModal })))
const DimensionModal = lazy(() => import("./dimension-modal").then((mod) => ({ default: mod.DimensionModal })))
import { AccessibilityMenu } from "./accessibility-menu"
import { KeyboardShortcuts } from "./keyboard-shortcuts"

export default function VirtualOffice() {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [currentFloor, setCurrentFloor] = useState("Main Floor")
  const [scale, setScale] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [showInviteModal, setShowInviteModal] = useState(false)
  const [showCustomizeModal, setShowCustomizeModal] = useState(false)
  const [showTimelineModal, setShowTimelineModal] = useState(false)
  const [showDimensionModal, setShowDimensionModal] = useState(false)
  const [sidePanelContent, setSidePanelContent] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  const mapRef = useRef<HTMLDivElement>(null)

  // Custom hooks
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

  const {
    dimensions,
    currentDimension,
    createDimension,
    switchDimension,
    updateDimension,
    mergeDimensions,
    getDimensionData,
  } = useDimensions()

  // Get users at the current time point and dimension
  const dimensionData = getDimensionData(currentDimension?.id || "default")
  const timeAdjustedUsers = getUsersAtTime(currentTime, dimensionData?.users || users)

  // Check for mobile devices
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

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
            dimensionId: currentDimension?.id,
          })
        }
      }
    },
  })

  // Connect to virtual office
  useEffect(() => {
    try {
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
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to connect to virtual office"))
    }
  }, [user, connectToOffice, disconnectFromOffice, initializeAudio])

  // Update audio positions
  useEffect(() => {
    try {
      updateAudioPositions(timeAdjustedUsers)
    } catch (err) {
      console.error("Failed to update audio positions:", err)
    }
  }, [timeAdjustedUsers, updateAudioPositions])

  // Simulate loading assets
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  // Zoom controls
  const handleZoomIn = useCallback(() => {
    setScale((prev) => Math.min(prev + 0.1, 1.5))
  }, [])

  const handleZoomOut = useCallback(() => {
    setScale((prev) => Math.max(prev - 0.1, 0.5))
  }, [])

  const handleFloorChange = useCallback((floor: string) => {
    setCurrentFloor(floor)
  }, [])

  const handlePanelToggle = useCallback(
    (panel: string | null) => {
      setSidePanelContent(panel === sidePanelContent ? null : panel)
    },
    [sidePanelContent],
  )

  const centerOnUser = useCallback(() => {
    if (user && mapRef.current) {
      const mapWidth = mapRef.current.offsetWidth
      const mapHeight = mapRef.current.offsetHeight

      setPosition({
        x: -(user.position.x - mapWidth / 2),
        y: -(user.position.y - mapHeight / 2),
      })
    }
  }, [user])

  const handleUserPositionChange = useCallback(
    (userId: string, newPosition: Position) => {
      updateUserPosition(userId, newPosition)

      // Record position change if recording is active
      if (isRecording && user && userId === user.id) {
        addTimePoint({
          timestamp: new Date(),
          userId,
          position: newPosition,
          status: user.status,
          action: "move",
          dimensionId: currentDimension?.id,
        })
      }
    },
    [isRecording, user, updateUserPosition, addTimePoint, currentDimension],
  )

  const handleStatusChange = useCallback(
    (userId: string, status: string) => {
      updateUserStatus(userId, status)

      // Record status change if recording is active
      if (isRecording && user && userId === user.id) {
        addTimePoint({
          timestamp: new Date(),
          userId,
          position: user.position,
          status,
          action: "status",
          dimensionId: currentDimension?.id,
        })
      }
    },
    [isRecording, user, updateUserStatus, addTimePoint, currentDimension],
  )

  const handleJumpToTimePoint = useCallback(
    (timePoint: TimePoint) => {
      jumpToTimePoint(timePoint)
      setShowTimelineModal(false)
    },
    [jumpToTimePoint],
  )

  const handleCreateDimension = useCallback(
    (name: string, description: string) => {
      createDimension(name, description, users, currentTime)
      setShowDimensionModal(false)
    },
    [createDimension, users, currentTime],
  )

  const handleSwitchDimension = useCallback(
    (dimensionId: string) => {
      switchDimension(dimensionId)
      setShowDimensionModal(false)
    },
    [switchDimension],
  )

  const handleMergeDimensions = useCallback(
    (sourceDimensionId: string, targetDimensionId: string) => {
      mergeDimensions(sourceDimensionId, targetDimensionId)
      setShowDimensionModal(false)
    },
    [mergeDimensions],
  )

  // Handle errors
  if (error) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center bg-red-50 p-4">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h2>
          <p className="text-gray-700 mb-4">{error.message}</p>
          <button
            onClick={() => window.location.reload()}
            className="w-full py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            Reload Application
          </button>
        </div>
      </div>
    )
  }

  // Show loading screen
  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <ErrorBoundary>
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
          isMobile={isMobile}
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

        {!isMobile && (
          <>
            <ZoomControls onZoomIn={handleZoomIn} onZoomOut={handleZoomOut} onCenter={centerOnUser} scale={scale} />

            <FloorSelector
              currentFloor={currentFloor}
              floors={["Main Floor", "Second Floor", "Executive Suite"]}
              onFloorChange={handleFloorChange}
            />
          </>
        )}

        <DimensionControls
          currentDimension={currentDimension}
          dimensionsCount={dimensions.length}
          onOpenDimensionModal={() => setShowDimensionModal(true)}
          isMobile={isMobile}
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
          isMobile={isMobile}
        />

        <BottomToolbar
          onToggleChat={() => handlePanelToggle("chat")}
          onTogglePeople={() => handlePanelToggle("people")}
          isChatActive={sidePanelContent === "chat"}
          isPeopleActive={sidePanelContent === "people"}
          onZoomIn={isMobile ? handleZoomIn : undefined}
          onZoomOut={isMobile ? handleZoomOut : undefined}
          onCenter={isMobile ? centerOnUser : undefined}
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

        <Suspense fallback={<LoadingScreen />}>
          {showInviteModal && <InviteModal onClose={() => setShowInviteModal(false)} />}

          {showCustomizeModal && (
            <CustomizeModal
              user={user}
              onClose={() => setShowCustomizeModal(false)}
              onUpdateStatus={handleStatusChange}
            />
          )}

          {showTimelineModal && (
            <TimelineModal
              timePoints={timePoints.filter((tp) => tp.dimensionId === currentDimension?.id)}
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
        </Suspense>
        <AccessibilityMenu />
        <KeyboardShortcuts />
      </div>
    </ErrorBoundary>
  )
}
