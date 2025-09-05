"use client"

import type { Block } from "@/lib/types"
import { HeroBlockComponent } from "./hero-block"
import { TextBlockComponent } from "./text-block"
import { ButtonBlockComponent } from "./button-block"

interface BlockRendererProps {
  block: Block
  isSelected?: boolean
  onClick?: () => void
}

export function BlockRenderer({ block, isSelected, onClick }: BlockRendererProps) {
  switch (block.type) {
    case "hero":
      return <HeroBlockComponent block={block} isSelected={isSelected} onClick={onClick} />
    case "text":
      return <TextBlockComponent block={block} isSelected={isSelected} onClick={onClick} />
    case "button":
      return <ButtonBlockComponent block={block} isSelected={isSelected} onClick={onClick} />
    default:
      return null
  }
}
