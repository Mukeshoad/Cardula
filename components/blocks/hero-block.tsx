"use client"

import type { HeroBlock } from "@/lib/types"

interface HeroBlockProps {
  block: HeroBlock
  isSelected?: boolean
  onClick?: () => void
}

export function HeroBlockComponent({ block, isSelected, onClick }: HeroBlockProps) {
  const { title, subtitle, backgroundImage } = block.props

  return (
    <div
      className={`relative min-h-96 flex items-center justify-center text-center px-6 py-16 cursor-pointer transition-all ${
        isSelected ? "ring-2 ring-primary ring-offset-2" : ""
      } ${backgroundImage ? "text-white" : "bg-gradient-to-br from-primary/10 to-primary/5"}`}
      onClick={onClick}
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {backgroundImage && <div className="absolute inset-0 bg-black/40" />}

      <div className="relative z-10 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">{title}</h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto">{subtitle}</p>
      </div>
    </div>
  )
}
