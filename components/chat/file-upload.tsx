"use client"

import type React from "react"

import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Paperclip, X } from "lucide-react"
import { useTranslation } from "react-i18next"
import type { Attachment } from "./chat-message"

interface FileUploadProps {
  onFilesSelected: (attachments: Attachment[]) => void
}

export default function FileUpload({ onFilesSelected }: FileUploadProps) {
  const { t } = useTranslation()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    const newFiles = Array.from(files)
    setSelectedFiles((prev) => [...prev, ...newFiles])
  }

  const handleRemoveFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleUpload = () => {
    if (selectedFiles.length === 0) return

    const attachments: Attachment[] = selectedFiles.map((file) => ({
      name: file.name,
      url: URL.createObjectURL(file),
      type: file.type,
    }))

    onFilesSelected(attachments)
    setSelectedFiles([])

    // Reset the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          className="bg-white/10 border-white/30 text-white hover:bg-white/20"
          onClick={() => fileInputRef.current?.click()}
        >
          <Paperclip className="h-4 w-4" />
        </Button>
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
          multiple
          accept="image/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/plain"
        />
      </div>

      {selectedFiles.length > 0 && (
        <div className="mt-2 p-2 bg-white/10 rounded-md">
          <div className="text-sm font-medium mb-1">{t("chat.selectedFiles")}</div>
          <div className="space-y-1 max-h-24 overflow-y-auto">
            {selectedFiles.map((file, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <div className="truncate">{file.name}</div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 hover:bg-white/10"
                  onClick={() => handleRemoveFile(index)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
          <div className="mt-2 flex justify-end">
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700" onClick={handleUpload}>
              {t("chat.upload")}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
