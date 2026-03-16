"use client"

import { useEffect, useState } from "react"
import { CheckCircle, XCircle, X } from "lucide-react"

interface NotificationProps {
  type: "success" | "error"
  message: string
  onClose?: () => void
  autoClose?: boolean
  duration?: number
}

export function Notification({ type, message, onClose, autoClose = true, duration = 5000 }: NotificationProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        setIsVisible(false)
        if (onClose) onClose()
      }, duration)

      return () => clearTimeout(timer)
    }
  }, [autoClose, duration, onClose])

  if (!isVisible) return null

  return (
    <div
      className={`fixed top-4 right-4 z-50 flex items-center p-4 rounded-md shadow-lg max-w-md ${
        type === "success" ? "bg-green-900" : "bg-red-900"
      }`}
    >
      <div className="flex-shrink-0 mr-3">
        {type === "success" ? (
          <CheckCircle className="w-5 h-5 text-green-400" />
        ) : (
          <XCircle className="w-5 h-5 text-red-400" />
        )}
      </div>
      <div className="flex-1 mr-2">
        <p className="text-sm text-white">{message}</p>
      </div>
      <button
        onClick={() => {
          setIsVisible(false)
          if (onClose) onClose()
        }}
        className="flex-shrink-0 text-white hover:text-gray-200"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}
