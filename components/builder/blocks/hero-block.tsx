"use client"

import { cn } from "@/lib/utils"

interface HeroBlockProps {
  title?: string
  subtitle?: string
  backgroundImage?: string
  alignment?: "left" | "center" | "right"
  titleSize?: "medium" | "large" | "xl"
}

export function HeroBlock({
  title,
  subtitle,
  backgroundImage,
  alignment = "center",
  titleSize = "large",
}: HeroBlockProps) {
  const titleSizeClasses = {
    medium: "text-3xl md:text-4xl",
    large: "text-4xl md:text-5xl lg:text-6xl",
    xl: "text-5xl md:text-6xl lg:text-7xl",
  }

  const alignmentClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  }

  return (
    <section
      className={cn(
        "relative py-20 px-6 md:py-32 md:px-8",
        backgroundImage ? "text-white" : "bg-gradient-to-br from-primary/5 to-secondary/5",
      )}
      style={
        backgroundImage
          ? {
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${backgroundImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }
          : undefined
      }
    >
      <div className="max-w-4xl mx-auto">
        <div className={alignmentClasses[alignment]}>
          {title && (
            <h1 className={cn("font-display font-bold mb-6 text-balance", titleSizeClasses[titleSize])}>{title}</h1>
          )}
          {subtitle && (
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed text-pretty">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
