import { v4 as uuidv4 } from "uuid"
import type { HeroBlock, TextBlock, ButtonBlock } from "./types"

export const createHeroBlock = (): HeroBlock => ({
  id: uuidv4(),
  type: "hero",
  props: {
    title: "Welcome to Our Website",
    subtitle: "Build amazing websites with our simple drag-and-drop builder",
    backgroundImage: undefined,
  },
})

export const createTextBlock = (): TextBlock => ({
  id: uuidv4(),
  type: "text",
  props: {
    content: "Add your text content here. You can customize the font size and alignment.",
    fontSize: "md",
    textAlign: "left",
  },
})

export const createButtonBlock = (): ButtonBlock => ({
  id: uuidv4(),
  type: "button",
  props: {
    text: "Click Me",
    variant: "primary",
    size: "md",
    href: "#",
  },
})
