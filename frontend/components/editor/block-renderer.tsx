"use client"

import type React from "react"

import type { Block } from "@/lib/projects"
import { blockDefinitions } from "./block-types"

interface BlockRendererProps {
  block: Block
  isSelected?: boolean
  onClick?: () => void
}

export function BlockRenderer({ block, isSelected, onClick }: BlockRendererProps) {
  const definition = blockDefinitions[block.type]

  if (!definition) {
    return <div className="p-4 border border-red-200 bg-red-50 text-red-600">Unknown block type: {block.type}</div>
  }

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    onClick?.()
  }

  const renderBlock = () => {
    switch (block.type) {
      case "hero":
        return <HeroBlock {...block.props} />
      case "text":
        return <TextBlock {...block.props} />
      case "button":
        return <ButtonBlock {...block.props} />
      case "image":
        return <ImageBlock {...block.props} />
      case "form":
        return <FormBlock {...block.props} />
      case "spacer":
        return <SpacerBlock {...block.props} />
      default:
        return <div>Unknown block</div>
    }
  }

  return (
    <div
      className={`relative group cursor-pointer transition-all duration-200 ${
        isSelected ? "ring-2 ring-primary ring-offset-2" : "hover:ring-1 hover:ring-gray-300"
      }`}
      onClick={handleClick}
    >
      {renderBlock()}

      {/* Block overlay */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity ${
          isSelected ? "bg-primary/10" : "bg-transparent group-hover:bg-gray-100/50"
        }`}
      />

      {/* Block label */}
      {isSelected && (
        <div className="absolute -top-6 left-0 bg-primary text-white text-xs px-2 py-1 rounded">{definition.name}</div>
      )}
    </div>
  )
}

// Block Components
function HeroBlock(props: any) {
  const {
    title = "Welcome",
    subtitle = "Subtitle",
    description = "Description",
    buttonText = "Get Started",
    buttonLink = "#",
    backgroundImage,
    backgroundColor = "#0066FF",
    textColor = "#FFFFFF",
    alignment = "center",
  } = props

  return (
    <div
      className={`relative py-20 px-8 text-${alignment}`}
      style={{
        backgroundColor: backgroundImage ? "transparent" : backgroundColor,
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: textColor,
      }}
    >
      {backgroundImage && <div className="absolute inset-0 bg-black/40" />}

      <div className="relative max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold mb-4">{title}</h1>
        <h2 className="text-2xl mb-6 opacity-90">{subtitle}</h2>
        <p className="text-lg mb-8 opacity-80 max-w-2xl mx-auto">{description}</p>
        <a
          href={buttonLink}
          className="inline-block bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
        >
          {buttonText}
        </a>
      </div>
    </div>
  )
}

function TextBlock(props: any) {
  const { content = "<p>Text content</p>", fontSize = 16, textColor = "#333333", textAlign = "left" } = props

  return (
    <div
      className="py-8 px-4"
      style={{
        fontSize: `${fontSize}px`,
        color: textColor,
        textAlign: textAlign as any,
      }}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}

function ButtonBlock(props: any) {
  const {
    text = "Button",
    link = "#",
    backgroundColor = "#0066FF",
    textColor = "#FFFFFF",
    borderRadius = 8,
    fontSize = 16,
    alignment = "left",
    variant = "solid",
  } = props

  const buttonStyle = {
    backgroundColor: variant === "solid" ? backgroundColor : "transparent",
    color: variant === "solid" ? textColor : backgroundColor,
    border: variant === "outline" ? `2px solid ${backgroundColor}` : "none",
    borderRadius: `${borderRadius}px`,
    fontSize: `${fontSize}px`,
    padding: "12px 24px",
    display: "inline-block",
    textDecoration: "none",
    fontWeight: "600",
    transition: "all 0.2s",
  }

  return (
    <div className={`py-4 px-4 text-${alignment}`}>
      <a href={link} style={buttonStyle}>
        {text}
      </a>
    </div>
  )
}

function ImageBlock(props: any) {
  const {
    src = "/placeholder.svg?height=300&width=600",
    alt = "Image",
    caption = "",
    borderRadius = 8,
    alignment = "center",
  } = props

  return (
    <div className={`py-4 px-4 text-${alignment}`}>
      <img
        src={src || "/placeholder.svg"}
        alt={alt}
        style={{
          borderRadius: `${borderRadius}px`,
          maxWidth: "100%",
          height: "auto",
        }}
        className="mx-auto"
      />
      {caption && <p className="mt-2 text-sm text-gray-600 italic">{caption}</p>}
    </div>
  )
}

function FormBlock(props: any) {
  const {
    title = "Contact Us",
    description = "Get in touch",
    buttonText = "Send Message",
    backgroundColor = "#FFFFFF",
    borderColor = "#E5E7EB",
  } = props

  return (
    <div className="py-8 px-4">
      <div
        className="max-w-md mx-auto p-6 rounded-lg border"
        style={{
          backgroundColor,
          borderColor,
        }}
      >
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 mb-6">{description}</p>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Your name" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Message</label>
            <textarea className="w-full px-3 py-2 border border-gray-300 rounded-md h-24" placeholder="Your message" />
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 transition-colors"
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  )
}

function SpacerBlock(props: any) {
  const { height = 60, backgroundColor = "transparent" } = props

  return (
    <div
      style={{
        height: `${height}px`,
        backgroundColor,
      }}
    />
  )
}
