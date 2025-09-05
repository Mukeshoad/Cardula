"use client"

interface SpacerBlockProps {
  height?: "small" | "medium" | "large" | "xl"
}

export function SpacerBlock({ height = "medium" }: SpacerBlockProps) {
  const heightClasses = {
    small: "h-5",
    medium: "h-10",
    large: "h-15",
    xl: "h-20",
  }

  return <div className={heightClasses[height]} />
}
