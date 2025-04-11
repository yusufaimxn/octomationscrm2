"use client"

import type React from "react"

import { useState, useCallback } from "react"
import Image from "next/image"
import { useDropzone } from "react-dropzone"
import { Camera, X, Upload } from "lucide-react"
import { cn } from "@/lib/utils"

interface ProfileDropzoneProps {
  initialImage?: string | null
  onImageChange: (file: File | null) => void
  onImageRemove: () => void
}

export function ProfileDropzone({ initialImage, onImageChange, onImageRemove }: ProfileDropzoneProps) {
  const [preview, setPreview] = useState<string | null>(initialImage || null)
  const [isHovering, setIsHovering] = useState(false)

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles?.length) {
        const file = acceptedFiles[0]
        onImageChange(file)

        const reader = new FileReader()
        reader.onload = () => {
          setPreview(reader.result as string)
        }
        reader.readAsDataURL(file)
      }
    },
    [onImageChange],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif"],
    },
    maxSize: 5242880, // 5MB
    multiple: false,
  })

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation()
    setPreview(null)
    onImageRemove()
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <div
        {...getRootProps()}
        className={cn("relative group cursor-pointer", "transition-all duration-200")}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <input {...getInputProps()} />
        {preview ? (
          <div className="relative">
            <div
              className={cn(
                "h-32 w-32 rounded-full overflow-hidden border-4 border-background shadow-md",
                isDragActive && "ring-2 ring-[#2be0bc] ring-offset-2",
              )}
            >
              <Image src={preview || "/placeholder.svg"} alt="Profile" fill className="object-cover" />
              <div
                className={cn(
                  "absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 transition-opacity duration-200",
                  (isDragActive || isHovering) && "opacity-100",
                )}
              >
                <Upload className="h-8 w-8 text-white" />
              </div>
            </div>
            <button
              onClick={handleRemove}
              className="absolute -top-1 -right-1 bg-background dark:bg-slate-800 rounded-full p-1 shadow-md z-10"
              aria-label="Remove profile picture"
            >
              <X className="h-4 w-4 text-[#e63327]" />
            </button>
          </div>
        ) : (
          <div
            className={cn(
              "h-32 w-32 rounded-full bg-muted flex flex-col items-center justify-center border-4 border-background shadow-md transition-all",
              isDragActive && "ring-2 ring-[#2be0bc] ring-offset-2 bg-[#2be0bc]/10",
            )}
          >
            <Camera className={cn("h-10 w-10 mb-2 text-muted-foreground", isDragActive && "text-[#2be0bc]")} />
            <span className="text-xs text-center text-muted-foreground px-2">
              {isDragActive ? "Drop image here" : "Drag or click to upload"}
            </span>
          </div>
        )}
      </div>
      <div className="text-xs text-muted-foreground">Supports JPG, PNG, GIF (max 5MB)</div>
    </div>
  )
}
