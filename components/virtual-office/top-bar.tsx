"use client"

import { Building, Users, Settings, UserPlus, Clock, Layers, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { formatDate } from "@/lib/utils"
import { useState } from "react"
import type { Dimension } from "@/types/dimension"

interface TopBarProps {
  spaceName: string
  currentFloor: string
  userCount: number
  currentTime: Date
  currentDimension?: Dimension
  onInvite: () => void
  onCustomize: () => void
  onTimelineOpen: () => void
  onDimensionOpen: () => void
  isMobile?: boolean
}

export function TopBar({
  spaceName,
  currentFloor,
  userCount,
  currentTime,
  currentDimension,
  onInvite,
  onCustomize,
  onTimelineOpen,
  onDimensionOpen,
  isMobile = false,
}: TopBarProps) {
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  return (
    <div className="absolute top-0 left-0 right-0 h-16 bg-white shadow-sm z-20 flex items-center justify-between px-4">
      <div className="flex items-center gap-4">
        <div className="flex items-center">
          <Building className="h-6 w-6 text-primary mr-2" />
          <h1 className="text-xl font-bold">{spaceName}</h1>
        </div>

        {!isMobile && (
          <>
            <div className="h-6 w-px bg-gray-300 mx-2" />
            <div className="flex items-center text-sm text-gray-600">
              <span>{currentFloor}</span>
            </div>
          </>
        )}
      </div>

      {isMobile ? (
        <div className="relative">
          <Button variant="ghost" size="icon" onClick={() => setShowMobileMenu(!showMobileMenu)}>
            <Menu className="h-5 w-5" />
          </Button>

          {showMobileMenu && (
            <div className="absolute right-0 top-full mt-2 bg-white rounded-md shadow-lg p-2 w-48 z-50">
              <div className="flex flex-col gap-2">
                <Button variant="ghost" size="sm" className="justify-start" onClick={onDimensionOpen}>
                  <Layers className="h-4 w-4 mr-2" />
                  <span className="truncate">{currentDimension?.name || "Default Dimension"}</span>
                </Button>

                <Button variant="ghost" size="sm" className="justify-start" onClick={onTimelineOpen}>
                  <Clock className="h-4 w-4 mr-2" />
                  <span className="truncate">{formatDate(currentTime, true)}</span>
                </Button>

                <div className="flex items-center text-sm text-gray-600 px-2 py-1">
                  <Users className="h-4 w-4 mr-2" />
                  <span>{userCount}</span>
                </div>

                <Button variant="ghost" size="sm" className="justify-start" onClick={onCustomize}>
                  <Settings className="h-4 w-4 mr-2" />
                  <span>Customize</span>
                </Button>

                <Button variant="default" size="sm" className="justify-start" onClick={onInvite}>
                  <UserPlus className="h-4 w-4 mr-2" />
                  <span>Invite</span>
                </Button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={onDimensionOpen}>
            <Layers className="h-4 w-4 mr-1" />
            <span className="max-w-[100px] truncate">{currentDimension?.name || "Default Dimension"}</span>
          </Button>

          <Button variant="outline" size="sm" onClick={onTimelineOpen}>
            <Clock className="h-4 w-4 mr-1" />
            <span>{formatDate(currentTime, true)}</span>
          </Button>

          <div className="flex items-center text-sm text-gray-600 mr-2">
            <Users className="h-4 w-4 mr-1" />
            <span>{userCount}</span>
          </div>

          <Button variant="outline" size="sm" onClick={onCustomize}>
            <Settings className="h-4 w-4 mr-1" />
            <span>Customize</span>
          </Button>

          <Button size="sm" onClick={onInvite}>
            <UserPlus className="h-4 w-4 mr-1" />
            <span>Invite</span>
          </Button>
        </div>
      )}
    </div>
  )
}
