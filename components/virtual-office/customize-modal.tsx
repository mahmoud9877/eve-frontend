"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import type { User } from "@/types/user"

interface CustomizeModalProps {
  user: User | null
  onClose: () => void
  onUpdateStatus: (userId: string, status: string) => void
}

export function CustomizeModal({ user, onClose, onUpdateStatus }: CustomizeModalProps) {
  const [status, setStatus] = useState(user?.status || "")

  const handleSave = () => {
    if (user) {
      onUpdateStatus(user.id, status)
    }
    onClose()
  }

  if (!user) return null

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Customize your profile</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Input
              id="status"
              placeholder="What are you working on?"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Availability</Label>
            <RadioGroup defaultValue={user.isActive ? "available" : "away"}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="available" id="available" />
                <Label htmlFor="available">Available</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="away" id="away" />
                <Label htmlFor="away">Away</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="do-not-disturb" id="do-not-disturb" />
                <Label htmlFor="do-not-disturb">Do not disturb</Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
