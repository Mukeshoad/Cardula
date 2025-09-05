"use client"

import type { ButtonBlock } from "@/lib/types"
import { Button } from "@/components/ui/button"

interface ButtonBlockProps {
  block: ButtonBlock
  isSelected?: boolean
  onClick?: () => void
}

const variantMap = {
  primary: "default" as const,
  secondary: "secondary" as const,
  outline: "outline" as const,
}

const sizeMap = {
  sm: "sm" as const,
  md: "default" as const,
  lg: "lg" as const,
}

export function ButtonBlockComponent({ block, isSelected, onClick }: ButtonBlockProps) {
  const { text, variant, size, href } = block.props

  const buttonContent = (
    <Button variant={variantMap[variant]} size={sizeMap[size]} className="transition-all" asChild={!!href}>
      {href ? (
        <a href={href} target="_blank" rel="noopener noreferrer">
          {text}
        </a>
      ) : (
        <span>{text}</span>
      )}
    </Button>
  )

  return (
    <div
      className={`px-6 py-4 cursor-pointer transition-all ${isSelected ? "ring-2 ring-primary ring-offset-2" : ""}`}
      onClick={onClick}
    >
      <div className="max-w-4xl mx-auto text-center">{buttonContent}</div>
    </div>
  )
}
