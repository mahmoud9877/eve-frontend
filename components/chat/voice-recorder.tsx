"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Mic, StopCircle } from "lucide-react"
import { useTranslation } from "react-i18next"

interface VoiceRecorderProps {
  onRecordingComplete: (audioBlob: Blob) => void
  onTranscriptionComplete: (text: string) => void
}

export default function VoiceRecorder({ onRecordingComplete, onTranscriptionComplete }: VoiceRecorderProps) {
  const { t } = useTranslation()
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
        mediaRecorderRef.current.stop()
      }
    }
  }, [])

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      audioChunksRef.current = []

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data)
        }
      }

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" })
        onRecordingComplete(audioBlob)

        // In a real app, we would send this to a speech-to-text service
        // For now, we'll simulate a transcription
        setTimeout(() => {
          const simulatedText = "This is a simulated transcription of the voice recording."
          onTranscriptionComplete(simulatedText)
        }, 1000)

        // Stop all tracks on the stream to release the microphone
        stream.getTracks().forEach((track) => track.stop())
      }

      mediaRecorder.start()
      setIsRecording(true)

      // Start timer
      setRecordingTime(0)
      timerRef.current = setInterval(() => {
        setRecordingTime((prevTime) => prevTime + 1)
      }, 1000)
    } catch (error) {
      console.error("Error accessing microphone:", error)
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
      mediaRecorderRef.current.stop()
    }

    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }

    setIsRecording(false)
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  return (
    <div className="flex items-center gap-2">
      {isRecording ? (
        <>
          <div className="text-red-500 animate-pulse flex items-center">
            <span className="mr-2">{formatTime(recordingTime)}</span>
            <div className="w-2 h-2 rounded-full bg-red-500"></div>
          </div>
          <Button
            variant="outline"
            size="icon"
            className="bg-red-500 text-white hover:bg-red-600"
            onClick={stopRecording}
          >
            <StopCircle className="h-4 w-4" />
          </Button>
        </>
      ) : (
        <Button
          variant="outline"
          size="icon"
          className="bg-white/10 border-white/30 text-white hover:bg-white/20"
          onClick={startRecording}
        >
          <Mic className="h-4 w-4" />
        </Button>
      )}
    </div>
  )
}
