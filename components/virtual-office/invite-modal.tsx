"use client"

import { useState } from "react"
import { Copy, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"

interface InviteModalProps {
  onClose: () => void
}

export function InviteModal({ onClose }: InviteModalProps) {
  const [email, setEmail] = useState("")
  const [copied, setCopied] = useState(false)

  const inviteLink = "https://virtual-office.example.com/join/abc123"

  const handleCopyLink = () => {
    navigator.clipboard.writeText(inviteLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSendInvite = () => {
    // In a real app, this would send an invitation email
    console.log(`Sending invite to ${email}`)
    setEmail("")
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Invite people to your office</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Share invite link</h3>
            <div className="flex items-center gap-2">
              <Input value={inviteLink} readOnly className="flex-1" />
              <Button size="sm" onClick={handleCopyLink}>
                {copied ? "Copied!" : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium">Invite by email</h3>
            <div className="flex items-center gap-2">
              <Input
                type="email"
                placeholder="colleague@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1"
              />
              <Button size="sm" onClick={handleSendInvite} disabled={!email}>
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={onClose}>Done</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
