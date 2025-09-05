"use client"

import { cn } from "@/lib/utils"
import Image from "next/image"

interface ImageBlockProps {
  src?: string
  alt?: string
  caption?: string
  alignment?: "left" | "center" | "right"
  borderRadius?: "none" | "small" | "medium" | "large" | "full"
}

export function ImageBlock({ src, alt, caption, alignment = "center", borderRadius = "medium" }: ImageBlockProps) {
  const alignmentClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  }

  const borderRadiusClasses = {
    none: "rounded-none",
    small: "rounded-sm",
    medium: "rounded-md",
    large: "rounded-lg",
    full: "rounded-full",
  }

  if (!src) {
    return (
      <div className="py-8 px-6">
        <div className={cn("max-w-2xl mx-auto", alignmentClasses[alignment])}>
          <div className="bg-muted border-2 border-dashed border-border rounded-lg p-12 text-center">
            <div className="text-4xl mb-4">🖼️</div>
            <p className="text-muted-foreground">Add an image URL to display your image</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="py-8 px-6">
      <div className={cn("max-w-2xl mx-auto", alignmentClasses[alignment])}>
        <div className="relative">
          <Image
            src={src || "/placeholder.svg"}
            alt={alt || "Image"}
            width={800}
            height={600}
            className={cn("w-full h-auto", borderRadiusClasses[borderRadius])}
          />
        </div>
        {caption && <p className="text-sm text-muted-foreground mt-3 text-center italic">{caption}</p>}
      </div>
    </div>
  )
}
