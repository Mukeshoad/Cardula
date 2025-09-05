"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ButtonBlockProps {
  text?: string
  variant?: "primary" | "secondary" | "outline"
  size?: "small" | "medium" | "large"
  alignment?: "left" | "center" | "right"
  link?: string
}

export function ButtonBlock({
  text = "Click Me",
  variant = "primary",
  size = "medium",
  alignment = "center",
  link,
}: ButtonBlockProps) {
  const alignmentClasses = {
    left: "justify-start",
    center: "justify-center",
    right: "justify-end",
  }

  const sizeMap = {
    small: "sm",
    medium: "default",
    large: "lg",
  } as const

  const variantMap = {
    primary: "default",
    secondary: "secondary",
    outline: "outline",
  } as const

  const buttonElement = (
    <Button
      variant={variantMap[variant]}
      size={sizeMap[size]}
      className={cn(
        variant === "primary" && "bg-primary hover:bg-primary/90",
        variant === "secondary" && "bg-secondary hover:bg-secondary/90",
      )}
    >
      {text}
    </Button>
  )

  return (
    <div className="py-6 px-6">
      <div className="max-w-4xl mx-auto">
        <div className={cn("flex", alignmentClasses[alignment])}>
          {link ? (
            <a href={link} target="_blank" rel="noopener noreferrer">
              {buttonElement}
            </a>
          ) : (
            buttonElement
          )}
        </div>
      </div>
    </div>
  )
}
