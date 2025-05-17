"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useTranslation } from "react-i18next"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { UserPlus, MessageSquare, Users } from "lucide-react"
import { useAuth } from "@/lib/auth-context"

type User = {
  name?: string | null
  email?: string | null
  image?: string | null
}

export default function HomePage({ user }: { user: User }) {
  const { t } = useTranslation()
  const router = useRouter()
  const { logout } = useAuth()
  const [hasCreatedEve, setHasCreatedEve] = useState(false)

  // In a real app, we would check if the user has already created an EVE employee
  useEffect(() => {
    // Simulating an API call to check if user has created an EVE
    const checkEveCreation = async () => {
      // This would be an actual API call in production
      // const response = await fetch('/api/user/eve');
      // const data = await response.json();
      // setHasCreatedEve(data.hasCreatedEve);

      // For demo purposes, we'll check localStorage
      const storedEve = localStorage.getItem("eveEmployee")
      setHasCreatedEve(!!storedEve)
    }

    checkEveCreation()
  }, [])

  const navigateTo = (path: string) => {
    router.push(path)
  }

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-800">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/10 backdrop-blur-sm"
            style={{
              width: Math.random() * 200 + 50,
              height: Math.random() * 200 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-12 min-h-screen flex flex-col">
        <header className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              {t("home.welcome")}, {user?.name}
            </h1>
            <p className="text-blue-200">{t("home.subtitle")}</p>
          </div>
          <Button variant="outline" className="text-wihite border-black/20" onClick={handleLogout}>
            Sign Out
          </Button>
        </header>

        <div className="flex-1 flex flex-col items-center justify-center gap-8 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            {/* Create EVE */}
            <Card className="bg-white/10 backdrop-blur-md border-none hover:bg-white/20 transition-all duration-300">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center mb-4">
                  <UserPlus className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-xl font-bold text-white mb-2">{t("home.createEve")}</h2>
                <p className="text-blue-200 mb-4">{t("home.createEveDesc")}</p>
                <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={() => navigateTo("/create-eve")}>
                  {t("home.getStarted")}
                </Button>
              </CardContent>
            </Card>

            {/* Talk to Your EVE */}
            <Card className="bg-white/10 backdrop-blur-md border-none hover:bg-white/20 transition-all duration-300">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-purple-500 flex items-center justify-center mb-4">
                  <MessageSquare className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-xl font-bold text-white mb-2">{t("home.talkToEve")}</h2>
                <p className="text-blue-200 mb-4">{t("home.talkToEveDesc")}</p>
                <Button
                  className="w-full bg-purple-600 hover:bg-purple-700"
                  onClick={() => navigateTo("/chat-with-eve")}
                  disabled={!hasCreatedEve}
                >
                  {hasCreatedEve ? t("home.startChat") : t("home.createEveFirst")}
                </Button>
              </CardContent>
            </Card>

            {/* Talk to Others */}
            <Card className="bg-white/10 backdrop-blur-md border-none hover:bg-white/20 transition-all duration-300">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-indigo-500 flex items-center justify-center mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-xl font-bold text-white mb-2">{t("home.talkToOthers")}</h2>
                <p className="text-blue-200 mb-4">{t("home.talkToOthersDesc")}</p>
                <Button
                  className="w-full bg-indigo-600 hover:bg-indigo-700"
                  onClick={() => navigateTo("/virtual-office")}
                >
                  {t("home.enterOffice")}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
