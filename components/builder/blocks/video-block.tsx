"use client"

import { cn } from "@/lib/utils"

interface VideoBlockProps {
  src?: string
  poster?: string
  autoplay?: boolean
  controls?: boolean
  alignment?: "left" | "center" | "right"
}

export function VideoBlock({ src, poster, autoplay = false, controls = true, alignment = "center" }: VideoBlockProps) {
  const alignmentClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  }

  if (!src) {
    return (
      <div className="py-8 px-6">
        <div className={cn("max-w-2xl mx-auto", alignmentClasses[alignment])}>
          <div className="bg-muted border-2 border-dashed border-border rounded-lg p-12 text-center aspect-video flex items-center justify-center">
            <div>
              <div className="text-4xl mb-4">🎥</div>
              <p className="text-muted-foreground">Add a video URL to display your video</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="py-8 px-6">
      <div className={cn("max-w-2xl mx-auto", alignmentClasses[alignment])}>
        <video src={src} poster={poster} autoPlay={autoplay} controls={controls} className="w-full h-auto rounded-lg">
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  )
}
