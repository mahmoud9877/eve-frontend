"use client"

import dynamic from "next/dynamic"
import { LoadingScreen } from "@/components/virtual-office/loading-screen"

// Use dynamic import to avoid SSR issues with browser-specific code
const VirtualOffice = dynamic(() => import("@/components/virtual-office/virtual-office"), {
  loading: () => <LoadingScreen />,
  ssr: false,
})

export default function VirtualOfficeClient() {
  return <VirtualOffice />
}
