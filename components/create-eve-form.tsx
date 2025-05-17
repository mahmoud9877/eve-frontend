"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useTranslation } from "react-i18next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from "@/components/ui/use-toast"
import { Upload, ArrowLeft } from "lucide-react"
import Image from "next/image"

type User = {
  id?: string | null
  name?: string | null
  email?: string | null
  image?: string | null
}

const departments = [
  "CF PS HR MFG & Purchases",
  "CF PS MFG EGYPT",
  "F&A",
  "FPWH",
  "General Operations",
  "GMDSO",
  "HR",
  "HS&E",
  "IWS",
  "Line-1",
  "Line-10",
  "Line-2",
  "Line-9",
  "P&E CFS ENG",
  "P&E Cairo/Karachi",
  "PFSS",
  "QA",
  "Regional GMDSO",
  "Regional Tech Pack",
  "RPM WH",
  "Shave Care Operations",
  "Shave Care Qualilty",
  "Storeroom",
  "TSG Matrix",
  "TSM",
  "Utilities",
]

export default function CreateEveForm({ user }: { user: User }) {
  const { t } = useTranslation()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    department: "",
    gender: "male",
    introduction: "",
    photoUrl: "/placeholder.svg?height=200&width=200",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // In a real app, we would upload the file to a server
      // For now, we'll just create a local URL
      const url = URL.createObjectURL(file)
      setFormData((prev) => ({ ...prev, photoUrl: url }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Store the EVE data in localStorage for demo purposes
      localStorage.setItem("eveEmployee", JSON.stringify(formData))

      // Also send to our API
      const response = await fetch("/api/eve-employees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          createdBy: user.id || "unknown-user",
          // Calculate position based on department
          position: getDepartmentPosition(formData.department),
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to create EVE employee")
      }

      toast({
        title: t("createEve.success"),
        description: t("createEve.successDesc"),
      })

      // Redirect to the chat page
      router.push("/chat-with-eve")
    } catch (error) {
      console.error("Failed to create EVE:", error)
      toast({
        title: t("createEve.error"),
        description: t("createEve.errorDesc"),
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Helper function to get department position
  const getDepartmentPosition = (department: string): [number, number, number] => {
    switch (department) {
      case "HR":
        return [-15, 0.5, -5]
      case "IT":
        return [-5, 0.5, -15]
      case "QA":
        return [5, 0.5, -15]
      case "Line-10":
        return [15, 0.5, -5]
      case "F&A":
        return [15, 0.5, 5]
      case "P&E CFS ENG":
        return [5, 0.5, 15]
      case "Shave Care Operations":
        return [-5, 0.5, 15]
      case "CF PS HR MFG & Purchases":
        return [-15, 0.5, 5]
      case "GMDSO":
        return [-10, 0.5, -10]
      case "HS&E":
        return [10, 0.5, 10]
      default:
        // Random position for unknown departments
        return [(Math.random() - 0.5) * 20, 0.5, (Math.random() - 0.5) * 20]
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-800 py-12 px-4">
      <div className="container mx-auto max-w-3xl">
        <Button
          variant="ghost"
          className="mb-6 text-white hover:text-white/80 hover:bg-white/10"
          onClick={() => router.push("/home")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t("common.back")}
        </Button>

        <Card className="bg-white/10 backdrop-blur-md border-none text-white">
          <CardHeader>
            <CardTitle className="text-2xl">{t("createEve.title")}</CardTitle>
            <CardDescription className="text-blue-200">{t("createEve.description")}</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">{t("createEve.name")}</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder={t("createEve.namePlaceholder")}
                      required
                      className="bg-white/20 border-white/30 text-white placeholder:text-white/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="department">{t("createEve.department")}</Label>
                    <Select
                      value={formData.department}
                      onValueChange={(value) => handleSelectChange("department", value)}
                      required
                    >
                      <SelectTrigger className="bg-white/20 border-white/30 text-white">
                        <SelectValue placeholder={t("createEve.departmentPlaceholder")} />
                      </SelectTrigger>
                      <SelectContent>
                        {departments.map((dept) => (
                          <SelectItem key={dept} value={dept}>
                            {dept}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>{t("createEve.gender")}</Label>
                    <RadioGroup
                      value={formData.gender}
                      onValueChange={(value) => handleSelectChange("gender", value)}
                      className="flex space-x-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="male" id="male" />
                        <Label htmlFor="male">{t("createEve.male")}</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="female" id="female" />
                        <Label htmlFor="female">{t("createEve.female")}</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>

                <div className="flex-1 flex flex-col items-center justify-center">
                  <div className="w-40 h-40 rounded-full overflow-hidden bg-white/20 mb-4 relative">
                    <Image
                      src={formData.photoUrl || "/placeholder.svg"}
                      alt="EVE Avatar"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <Label
                    htmlFor="photo"
                    className="cursor-pointer bg-white/20 hover:bg-white/30 text-white py-2 px-4 rounded-md flex items-center"
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    {t("createEve.uploadPhoto")}
                  </Label>
                  <Input id="photo" type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="introduction">{t("createEve.introduction")}</Label>
                <Textarea
                  id="introduction"
                  name="introduction"
                  value={formData.introduction}
                  onChange={handleInputChange}
                  placeholder={t("createEve.introductionPlaceholder")}
                  rows={5}
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/50"
                  required
                />
              </div>

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isSubmitting}>
                {isSubmitting ? t("common.submitting") : t("createEve.submit")}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
