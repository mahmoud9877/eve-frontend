"use client"

import { useState, useCallback } from "react"
import type { Dimension } from "@/types/dimension"
import type { User } from "@/types/user"
import { v4 as uuidv4 } from "uuid"

export function useDimensions() {
  const [dimensions, setDimensions] = useState<Dimension[]>([
    {
      id: "default",
      name: "Primary Reality",
      description: "The main office configuration",
      createdAt: new Date().toISOString(),
      userCount: 7,
      color: "#7c3aed",
      officeConfig: {},
      parentId: null,
      effects: { avatarEffect: null },
      anomalies: [],
      portals: [],
      weather: null,
    },
    {
      id: "open-plan",
      name: "Open Floor Plan",
      description: "Collaborative open workspace with minimal walls",
      createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
      userCount: 3,
      color: "#2196f3",
      officeConfig: {},
      parentId: "default",
      effects: { avatarEffect: "glow" },
      anomalies: [
        { areaId: "open-workspace", name: "Collaboration Zone", x: 250, y: 150, radius: 100, color: "#2196f3" },
      ],
      portals: [
        { position: { x: 1200, y: 500 }, targetId: "future-office", targetName: "Future Office", color: "#2196f3" },
      ],
      weather: null,
    },
    {
      id: "future-office",
      name: "Future Office 2030",
      description: "Futuristic office with advanced technology",
      createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
      userCount: 1,
      color: "#f44336",
      officeConfig: {},
      parentId: "default",
      effects: { avatarEffect: "pixelated" },
      anomalies: [{ areaId: "executive-office", name: "Time Anomaly", x: 125, y: 100, radius: 80, color: "#f44336" }],
      portals: [{ position: { x: 500, y: 300 }, targetId: "open-plan", targetName: "Open Plan", color: "#f44336" }],
      weather: "aurora",
    },
  ])

  const [dimensionData, setDimensionData] = useState<Record<string, { users: User[] }>>({})
  const [currentDimensionId, setCurrentDimensionId] = useState<string>("default")

  // Get current dimension
  const currentDimension = dimensions.find((d) => d.id === currentDimensionId) || dimensions[0]

  // Create a new dimension
  const createDimension = useCallback(
    (name: string, description: string, users: User[], currentTime: Date) => {
      const newDimension: Dimension = {
        id: uuidv4(),
        name,
        description,
        createdAt: new Date().toISOString(),
        userCount: 1,
        color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
        officeConfig: { ...currentDimension.officeConfig },
        parentId: currentDimensionId,
        effects: { avatarEffect: null },
        anomalies: [],
        portals: [
          {
            position: { x: 500, y: 300 },
            targetId: currentDimensionId,
            targetName: currentDimension.name,
            color: "#7c3aed",
          },
        ],
        weather: null,
      }

      setDimensions((prev) => [...prev, newDimension])

      // Store the current users in the new dimension
      setDimensionData((prev) => ({
        ...prev,
        [newDimension.id]: { users: [...users] },
      }))

      setCurrentDimensionId(newDimension.id)
    },
    [currentDimension, currentDimensionId],
  )

  // Switch to a different dimension
  const switchDimension = useCallback(
    (dimensionId: string) => {
      const dimension = dimensions.find((d) => d.id === dimensionId)
      if (dimension) {
        setCurrentDimensionId(dimensionId)
      }
    },
    [dimensions],
  )

  // Update a dimension
  const updateDimension = useCallback((dimensionId: string, updates: Partial<Dimension>) => {
    setDimensions((prev) => prev.map((dim) => (dim.id === dimensionId ? { ...dim, ...updates } : dim)))
  }, [])

  // Merge two dimensions
  const mergeDimensions = useCallback(
    (sourceDimensionId: string, targetDimensionId: string) => {
      const sourceDimension = dimensions.find((d) => d.id === sourceDimensionId)
      const targetDimension = dimensions.find((d) => d.id === targetDimensionId)

      if (!sourceDimension || !targetDimension) return

      // Create a merged dimension
      const mergedDimension: Dimension = {
        id: uuidv4(),
        name: `Merged: ${targetDimension.name}`,
        description: `Merged from ${sourceDimension.name} into ${targetDimension.name}`,
        createdAt: new Date().toISOString(),
        userCount: targetDimension.userCount,
        color: targetDimension.color,
        officeConfig: { ...targetDimension.officeConfig },
        parentId: targetDimensionId,
        effects: targetDimension.effects,
        anomalies: [...(targetDimension.anomalies || []), ...(sourceDimension.anomalies || [])],
        portals: [
          {
            position: { x: 500, y: 300 },
            targetId: targetDimensionId,
            targetName: targetDimension.name,
            color: targetDimension.color,
          },
          {
            position: { x: 700, y: 300 },
            targetId: sourceDimensionId,
            targetName: sourceDimension.name,
            color: sourceDimension.color,
          },
        ],
        weather: targetDimension.weather,
      }

      setDimensions((prev) => [...prev, mergedDimension])

      // Merge user data from both dimensions
      const sourceUsers = dimensionData[sourceDimensionId]?.users || []
      const targetUsers = dimensionData[targetDimensionId]?.users || []

      // Combine users, removing duplicates by ID
      const mergedUsers = [...targetUsers]
      sourceUsers.forEach((sourceUser) => {
        if (!mergedUsers.some((user) => user.id === sourceUser.id)) {
          mergedUsers.push(sourceUser)
        }
      })

      setDimensionData((prev) => ({
        ...prev,
        [mergedDimension.id]: { users: mergedUsers },
      }))

      setCurrentDimensionId(mergedDimension.id)
    },
    [dimensions, dimensionData],
  )

  // Get dimension data (users, etc.)
  const getDimensionData = useCallback(
    (dimensionId: string) => {
      return dimensionData[dimensionId]
    },
    [dimensionData],
  )

  // Get dimension history (ancestry)
  const getDimensionHistory = useCallback(
    (dimensionId: string) => {
      const history: Dimension[] = []
      let currentId = dimensionId

      while (currentId) {
        const dimension = dimensions.find((d) => d.id === currentId)
        if (dimension) {
          history.push(dimension)
          currentId = dimension.parentId || ""
        } else {
          break
        }
      }

      return history.reverse()
    },
    [dimensions],
  )

  // Get dimension children
  const getDimensionChildren = useCallback(
    (dimensionId: string) => {
      return dimensions.filter((d) => d.parentId === dimensionId)
    },
    [dimensions],
  )

  return {
    dimensions,
    currentDimension,
    createDimension,
    switchDimension,
    updateDimension,
    mergeDimensions,
    getDimensionData,
    getDimensionHistory,
    getDimensionChildren,
  }
}
