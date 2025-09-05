"use client"

import { cn } from "@/lib/utils"

interface TextBlockProps {
  content?: string
  fontSize?: "small" | "medium" | "large" | "xl"
  alignment?: "left" | "center" | "right"
  fontWeight?: "normal" | "medium" | "semibold" | "bold"
}

export function TextBlock({
  content = "Add your text content here",
  fontSize = "medium",
  alignment = "left",
  fontWeight = "normal",
}: TextBlockProps) {
  const fontSizeClasses = {
    small: "text-sm",
    medium: "text-base",
    large: "text-lg",
    xl: "text-xl",
  }

  const alignmentClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  }

  const fontWeightClasses = {
    normal: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-bold",
  }

  return (
    <div className="py-4 px-6">
      <div className="max-w-4xl mx-auto">
        <p
          className={cn(
            "leading-relaxed text-pretty",
            fontSizeClasses[fontSize],
            alignmentClasses[alignment],
            fontWeightClasses[fontWeight],
          )}
        >
          {content}
        </p>
      </div>
    </div>
  )
}
