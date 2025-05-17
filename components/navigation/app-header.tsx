"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useTranslation } from "react-i18next"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Home, User, LogOut, Menu, X, Globe } from "lucide-react"
import Image from "next/image"
import { useAuth } from "@/lib/auth-context"

export default function AppHeader() {
  const { t, i18n } = useTranslation()
  const router = useRouter()
  const { user, logout } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Use our client-side auth user
  const currentUser = user

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "ar" : "en"
    i18n.changeLanguage(newLang)
    document.documentElement.dir = newLang === "ar" ? "rtl" : "ltr"
  }

  const handleSignOut = async () => {
    logout()
    router.push("/")
  }

  const navigateTo = (path: string) => {
    router.push(path)
    setIsMenuOpen(false)
  }

  return (
    <header className="bg-black/30 backdrop-blur-sm p-4 sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Button
            variant="ghost"
            className="text-white hover:text-white/80 hover:bg-white/10 mr-2 md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>

          <div className="flex items-center cursor-pointer" onClick={() => navigateTo("/home")}>
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-2">
              <Image src="/placeholder.svg?height=32&width=32" alt="EVE Logo" width={32} height={32} />
            </div>
            <h1 className="text-xl font-bold text-white hidden md:block">EVE Employee</h1>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4">
          <Button
            variant="ghost"
            className="text-white hover:text-white/80 hover:bg-white/10"
            onClick={() => navigateTo("/home")}
          >
            <Home className="h-4 w-4 mr-2" />
            {t("navigation.home")}
          </Button>
          <Button
            variant="ghost"
            className="text-white hover:text-white/80 hover:bg-white/10"
            onClick={() => navigateTo("/create-eve")}
          >
            <User className="h-4 w-4 mr-2" />
            {t("navigation.createEve")}
          </Button>
          <Button
            variant="ghost"
            className="text-white hover:text-white/80 hover:bg-white/10"
            onClick={() => navigateTo("/chat-with-eve")}
          >
            {t("navigation.chatWithEve")}
          </Button>
          <Button
            variant="ghost"
            className="text-white hover:text-white/80 hover:bg-white/10"
            onClick={() => navigateTo("/virtual-office")}
          >
            {t("navigation.virtualOffice")}
          </Button>
        </div>

        <div className="flex items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleLanguage}
            className="text-white hover:text-white/80 hover:bg-white/10 mr-2"
          >
            <Globe className="h-4 w-4 mr-1" />
            {i18n.language === "en" ? "عربي" : "English"}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Image
                  src={currentUser?.image || "/placeholder.svg?height=32&width=32"}
                  alt="User"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuLabel>{currentUser?.name || "User"}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigateTo("/home")}>
                <Home className="mr-2 h-4 w-4" />
                <span>{t("navigation.home")}</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigateTo("/create-eve")}>
                <User className="mr-2 h-4 w-4" />
                <span>{t("navigation.createEve")}</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignOut}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>{t("navigation.signOut")}</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-black/80 backdrop-blur-md p-4 flex flex-col space-y-2">
          <Button
            variant="ghost"
            className="text-white hover:text-white/80 hover:bg-white/10 justify-start"
            onClick={() => navigateTo("/home")}
          >
            <Home className="h-4 w-4 mr-2" />
            {t("navigation.home")}
          </Button>
          <Button
            variant="ghost"
            className="text-white hover:text-white/80 hover:bg-white/10 justify-start"
            onClick={() => navigateTo("/create-eve")}
          >
            <User className="h-4 w-4 mr-2" />
            {t("navigation.createEve")}
          </Button>
          <Button
            variant="ghost"
            className="text-white hover:text-white/80 hover:bg-white/10 justify-start"
            onClick={() => navigateTo("/chat-with-eve")}
          >
            {t("navigation.chatWithEve")}
          </Button>
          <Button
            variant="ghost"
            className="text-white hover:text-white/80 hover:bg-white/10 justify-start"
            onClick={() => navigateTo("/virtual-office")}
          >
            {t("navigation.virtualOffice")}
          </Button>
          <Button
            variant="ghost"
            className="text-white hover:text-white/80 hover:bg-white/10 justify-start"
            onClick={handleSignOut}
          >
            <LogOut className="h-4 w-4 mr-2" />
            {t("navigation.signOut")}
          </Button>
        </div>
      )}
    </header>
  )
}
