"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Layers, GitMerge, GitBranch, AlertTriangle } from "lucide-react"
import type { Dimension } from "@/types/dimension"

interface DimensionModalProps {
  dimensions: Dimension[]
  currentDimension: Dimension
  onCreateDimension: (name: string, description: string) => void
  onSwitchDimension: (dimensionId: string) => void
  onMergeDimensions: (sourceDimensionId: string, targetDimensionId: string) => void
  onClose: () => void
}

export function DimensionModal({
  dimensions,
  currentDimension,
  onCreateDimension,
  onSwitchDimension,
  onMergeDimensions,
  onClose,
}: DimensionModalProps) {
  const [activeTab, setActiveTab] = useState("browse")
  const [newDimensionName, setNewDimensionName] = useState("")
  const [newDimensionDescription, setNewDimensionDescription] = useState("")
  const [sourceDimensionId, setSourceDimensionId] = useState("")
  const [targetDimensionId, setTargetDimensionId] = useState("")

  const handleCreateDimension = () => {
    if (newDimensionName.trim()) {
      onCreateDimension(newDimensionName.trim(), newDimensionDescription.trim())
      setNewDimensionName("")
      setNewDimensionDescription("")
    }
  }

  const handleMergeDimensions = () => {
    if (sourceDimensionId && targetDimensionId && sourceDimensionId !== targetDimensionId) {
      onMergeDimensions(sourceDimensionId, targetDimensionId)
      setSourceDimensionId("")
      setTargetDimensionId("")
    }
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Layers className="h-5 w-5" />
            <span>Dimension Navigator</span>
          </DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 overflow-hidden flex flex-col">
          <TabsList>
            <TabsTrigger value="browse">Browse Dimensions</TabsTrigger>
            <TabsTrigger value="create">Create Dimension</TabsTrigger>
            <TabsTrigger value="merge">Merge Dimensions</TabsTrigger>
          </TabsList>

          <TabsContent value="browse" className="flex-1 overflow-auto">
            <div className="space-y-4 p-2">
              <div className="text-sm text-muted-foreground">
                Navigate between parallel realities of your virtual office. Each dimension represents an alternate
                version of the workspace.
              </div>

              <div className="grid gap-4">
                {dimensions.map((dimension) => (
                  <div
                    key={dimension.id}
                    className={`p-4 border rounded-lg ${
                      dimension.id === currentDimension.id ? "border-primary bg-primary/5" : ""
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">{dimension.name}</h3>
                        <p className="text-sm text-muted-foreground">{dimension.description}</p>
                        <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                          <span>Created: {new Date(dimension.createdAt).toLocaleString()}</span>
                          <span>•</span>
                          <span>Users: {dimension.userCount}</span>
                        </div>
                      </div>

                      {dimension.id !== currentDimension.id ? (
                        <Button size="sm" onClick={() => onSwitchDimension(dimension.id)}>
                          Switch
                        </Button>
                      ) : (
                        <Button size="sm" variant="outline" disabled>
                          Current
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="create" className="flex-1 overflow-auto">
            <div className="space-y-4 p-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <GitBranch className="h-4 w-4" />
                <span>Create a new dimension branching from the current reality</span>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="dimension-name" className="text-sm font-medium">
                    Dimension Name
                  </label>
                  <Input
                    id="dimension-name"
                    placeholder="e.g., Open Floor Plan"
                    value={newDimensionName}
                    onChange={(e) => setNewDimensionName(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="dimension-description" className="text-sm font-medium">
                    Description
                  </label>
                  <Textarea
                    id="dimension-description"
                    placeholder="Describe this alternate reality..."
                    value={newDimensionDescription}
                    onChange={(e) => setNewDimensionDescription(e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-md p-3 text-sm">
                  <div className="flex items-center gap-2 text-amber-700 font-medium">
                    <AlertTriangle className="h-4 w-4" />
                    <span>Creating a new dimension</span>
                  </div>
                  <p className="mt-1 text-amber-600">
                    This will create a new parallel reality branching from the current state. The new dimension will
                    initially be identical to the current one but can evolve independently.
                  </p>
                </div>

                <Button onClick={handleCreateDimension} disabled={!newDimensionName.trim()}>
                  Create Dimension
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="merge" className="flex-1 overflow-auto">
            <div className="space-y-4 p-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <GitMerge className="h-4 w-4" />
                <span>Merge two dimensions to combine their realities</span>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="source-dimension" className="text-sm font-medium">
                    Source Dimension
                  </label>
                  <Select value={sourceDimensionId} onValueChange={setSourceDimensionId}>
                    <SelectTrigger id="source-dimension">
                      <SelectValue placeholder="Select source dimension" />
                    </SelectTrigger>
                    <SelectContent>
                      {dimensions.map((dimension) => (
                        <SelectItem key={`source-${dimension.id}`} value={dimension.id}>
                          {dimension.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="target-dimension" className="text-sm font-medium">
                    Target Dimension
                  </label>
                  <Select value={targetDimensionId} onValueChange={setTargetDimensionId}>
                    <SelectTrigger id="target-dimension">
                      <SelectValue placeholder="Select target dimension" />
                    </SelectTrigger>
                    <SelectContent>
                      {dimensions
                        .filter((d) => d.id !== sourceDimensionId)
                        .map((dimension) => (
                          <SelectItem key={`target-${dimension.id}`} value={dimension.id}>
                            {dimension.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-md p-3 text-sm">
                  <div className="flex items-center gap-2 text-amber-700 font-medium">
                    <AlertTriangle className="h-4 w-4" />
                    <span>Warning: Merging dimensions</span>
                  </div>
                  <p className="mt-1 text-amber-600">
                    This will merge the source dimension into the target dimension. The source dimension will be
                    preserved, but any conflicts will be resolved in favor of the target dimension.
                  </p>
                </div>

                <Button
                  onClick={handleMergeDimensions}
                  disabled={!sourceDimensionId || !targetDimensionId || sourceDimensionId === targetDimensionId}
                >
                  Merge Dimensions
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
