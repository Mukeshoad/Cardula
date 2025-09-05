export interface BaseBlock {
  id: string
  type: "hero" | "text" | "button"
}

export interface HeroBlock extends BaseBlock {
  type: "hero"
  props: {
    title: string
    subtitle: string
    backgroundImage?: string
  }
}

export interface TextBlock extends BaseBlock {
  type: "text"
  props: {
    content: string
    fontSize: "sm" | "md" | "lg" | "xl"
    textAlign: "left" | "center" | "right"
  }
}

export interface ButtonBlock extends BaseBlock {
  type: "button"
  props: {
    text: string
    variant: "primary" | "secondary" | "outline"
    size: "sm" | "md" | "lg"
    href?: string
  }
}

export type Block = HeroBlock | TextBlock | ButtonBlock

export interface WebsiteData {
  blocks: Block[]
  metadata: {
    title: string
    description: string
  }
}
