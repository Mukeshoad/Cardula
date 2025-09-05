"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload, X, ImageIcon } from "lucide-react"
import { uploadImage, deleteImage } from "@/lib/uploads"
import { toast } from "@/hooks/use-toast"

interface ImageUploadProps {
  value?: string
  onChange: (url: string) => void
  onRemove?: () => void
  className?: string
}

export function ImageUpload({ value, onChange, onRemove, className }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please select an image file.",
        variant: "destructive",
      })
      return
    }

    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please select an image smaller than 10MB.",
        variant: "destructive",
      })
      return
    }

    setIsUploading(true)
    try {
      const result = await uploadImage(file)
      onChange(result.url)
      toast({
        title: "Image uploaded",
        description: "Your image has been uploaded successfully.",
      })
    } catch (error) {
      console.error("Upload error:", error)
      toast({
        title: "Upload failed",
        description: error instanceof Error ? error.message : "Failed to upload image.",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(false)

    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(false)
  }

  const handleRemove = async () => {
    if (value && onRemove) {
      try {
        const fileName = value.split("/").pop()
        if (fileName) {
          await deleteImage(fileName)
        }
        onRemove()
        toast({
          title: "Image removed",
          description: "The image has been removed.",
        })
      } catch (error) {
        console.error("Delete error:", error)
        toast({
          title: "Delete failed",
          description: "Failed to remove image.",
          variant: "destructive",
        })
      }
    }
  }

  if (value) {
    return (
      <div className={`relative group ${className}`}>
        <img
          src={value || "/placeholder.svg"}
          alt="Uploaded image"
          className="w-full h-48 object-cover rounded-lg border"
        />
        <Button
          type="button"
          variant="destructive"
          size="sm"
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={handleRemove}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    )
  }

  return (
    <div className={className}>
      <Label htmlFor="image-upload">Image</Label>
      <div
        className={`mt-2 border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          dragActive ? "border-primary bg-primary/5" : "border-gray-300 hover:border-gray-400"
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
        <div className="mt-4">
          <Button type="button" variant="outline" disabled={isUploading} onClick={() => fileInputRef.current?.click()}>
            <Upload className="mr-2 h-4 w-4" />
            {isUploading ? "Uploading..." : "Upload Image"}
          </Button>
        </div>
        <p className="mt-2 text-sm text-gray-500">Drag and drop an image here, or click to select</p>
        <p className="text-xs text-gray-400">PNG, JPG, WebP up to 10MB</p>
      </div>
      <Input
        ref={fileInputRef}
        id="image-upload"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) {
            handleFileSelect(file)
          }
        }}
      />
    </div>
  )
}
