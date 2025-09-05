"use client"

import { HeroBlock } from "./blocks/hero-block"
import { TextBlock } from "./blocks/text-block"
import { ButtonBlock } from "./blocks/button-block"
import { ImageBlock } from "./blocks/image-block"
import { VideoBlock } from "./blocks/video-block"
import { ContactBlock } from "./blocks/contact-block"
import { SpacerBlock } from "./blocks/spacer-block"
import { ColumnsBlock } from "./blocks/columns-block"
import type { Block } from "@/lib/builder-store"

interface BlockRendererProps {
  block: Block
}

export function BlockRenderer({ block }: BlockRendererProps) {
  switch (block.type) {
    case "hero":
      return <HeroBlock {...block.props} />
    case "text":
      return <TextBlock {...block.props} />
    case "button":
      return <ButtonBlock {...block.props} />
    case "image":
      return <ImageBlock {...block.props} />
    case "video":
      return <VideoBlock {...block.props} />
    case "contact":
      return <ContactBlock {...block.props} />
    case "spacer":
      return <SpacerBlock {...block.props} />
    case "columns":
      return <ColumnsBlock {...block.props} />
    default:
      return <div className="p-4 bg-muted text-muted-foreground">Unknown block type: {block.type}</div>
  }
}
