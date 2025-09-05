"use client"

import type { TextBlock } from "@/lib/types"

interface TextBlockProps {
  block: TextBlock
  isSelected?: boolean
  onClick?: () => void
}

const fontSizeClasses = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
  xl: "text-xl",
}

const textAlignClasses = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
}

export function TextBlockComponent({ block, isSelected, onClick }: TextBlockProps) {
  const { content, fontSize, textAlign } = block.props

  return (
    <div
      className={`px-6 py-4 cursor-pointer transition-all ${isSelected ? "ring-2 ring-primary ring-offset-2" : ""}`}
      onClick={onClick}
    >
      <div className="max-w-4xl mx-auto">
        <p
          className={`${fontSizeClasses[fontSize]} ${textAlignClasses[textAlign]} text-foreground leading-relaxed text-pretty`}
        >
          {content}
        </p>
      </div>
    </div>
  )
}
