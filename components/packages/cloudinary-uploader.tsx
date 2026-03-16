"use client"

import { useState, useRef } from "react"
import { ImagePlus, Video, Loader2, X } from "lucide-react"
import type React from "react"

interface CloudinaryUploaderProps {
  uploadPreset: string
  resourceType: "image" | "video"
  children?: React.ReactNode
  className?: string
  onSuccess: (result: { info: { secure_url: string } }) => void
  onError?: (error: any) => void
}

export function CloudinaryUploader({
  onSuccess,
  onError = (error) => console.error("Error en la subida:", error),
  resourceType = "image",
  children,
  className,
  uploadPreset,
}: CloudinaryUploaderProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const isImage = resourceType === "image"

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME

  const acceptedFormats = isImage
    ? "image/jpeg,image/png,image/gif,image/webp"
    : "video/mp4,video/quicktime,video/x-msvideo,video/webm"

  const maxFileSize = isImage ? 10000000 : 20000000 // 10MB for images, 20MB for videos

  const handleUpload = async (file: File) => {
    if (!cloudName) {
      onError(new Error("Cloudinary cloud name not configured"))
      return
    }

    if (file.size > maxFileSize) {
      onError(new Error(`El archivo excede el tamaño máximo de ${isImage ? "10MB" : "20MB"}`))
      return
    }

    setIsUploading(true)

    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("upload_preset", uploadPreset)

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/${isImage ? "image" : "video"}/upload`,
        {
          method: "POST",
          body: formData,
        }
      )

      if (!response.ok) {
        throw new Error("Error al subir el archivo")
      }

      const data = await response.json()
      onSuccess({ info: { secure_url: data.secure_url } })
    } catch (error) {
      onError(error)
    } finally {
      setIsUploading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleUpload(file)
    }
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    const file = e.dataTransfer.files?.[0]
    if (file) {
      handleUpload(file)
    }
  }

  const handleClick = () => {
    inputRef.current?.click()
  }

  const defaultButton = (
    <div
      className={`inline-flex w-full items-center justify-center whitespace-nowrap rounded-md bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground shadow-sm hover:bg-secondary/80 cursor-pointer transition-colors ${
        dragActive ? "ring-2 ring-primary" : ""
      } ${className || ""}`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      {isUploading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Subiendo...
        </>
      ) : isImage ? (
        <>
          <ImagePlus className="mr-2 h-4 w-4" />
          Subir Imagen
          <span className="ml-2 hidden text-xs text-muted-foreground sm:inline">(JPG, PNG, GIF hasta 10MB)</span>
        </>
      ) : (
        <>
          <Video className="mr-2 h-4 w-4" />
          Subir Video
          <span className="ml-2 hidden text-xs text-muted-foreground sm:inline">(MP4, MOV, AVI hasta 20MB)</span>
        </>
      )}
    </div>
  )

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept={acceptedFormats}
        onChange={handleChange}
        className="hidden"
        disabled={isUploading}
      />
      {children ? (
        <div onClick={handleClick} className="cursor-pointer">
          {children}
        </div>
      ) : (
        defaultButton
      )}
    </>
  )
}
