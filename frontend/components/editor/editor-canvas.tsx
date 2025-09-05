"use client"

import { useEffect, useRef, useState } from "react"
import type { Block } from "@/lib/projects"

interface EditorCanvasProps {
  blocks: Block[]
  selectedBlockId: string | null
  onSelectBlock: (blockId: string | null) => void
  onReorderBlocks: (blocks: Block[]) => void
}

export function EditorCanvas({ blocks, selectedBlockId, onSelectBlock, onReorderBlocks }: EditorCanvasProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [iframeContent, setIframeContent] = useState("")

  // Generate HTML content for iframe
  useEffect(() => {
    const generateHTML = () => {
      const blocksHTML = blocks
        .map((block) => {
          const isSelected = block.id === selectedBlockId
          const textColor = block.props.textColor || "#333" // Ensure textColor is declared before use
          return `
          <div 
            data-block-id="${block.id}"
            class="block-wrapper ${isSelected ? "selected" : ""}"
            onclick="window.parent.postMessage({type: 'blockClick', blockId: '${block.id}'}, '*')"
          >
            ${renderBlockToHTML(block)}
          </div>
        `
        })
        .join("")

      return `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <style>
              * { margin: 0; padding: 0; box-sizing: border-box; }
              body { 
                font-family: Inter, -apple-system, BlinkMacSystemFont, sans-serif;
                line-height: 1.6;
                color: #333;
              }
              .block-wrapper {
                position: relative;
                cursor: pointer;
                transition: all 0.2s ease;
              }
              .block-wrapper:hover {
                outline: 2px solid #e5e7eb;
                outline-offset: 2px;
              }
              .block-wrapper.selected {
                outline: 2px solid #0066FF;
                outline-offset: 2px;
              }
              .block-wrapper.selected::before {
                content: attr(data-block-type);
                position: absolute;
                top: -24px;
                left: 0;
                background: #0066FF;
                color: white;
                font-size: 12px;
                padding: 2px 8px;
                border-radius: 4px;
                z-index: 10;
              }
            </style>
          </head>
          <body>
            ${blocksHTML}
            <script>
              // Handle block clicks
              document.addEventListener('click', function(e) {
                const blockWrapper = e.target.closest('.block-wrapper');
                if (blockWrapper) {
                  const blockId = blockWrapper.getAttribute('data-block-id');
                  window.parent.postMessage({type: 'blockClick', blockId: blockId}, '*');
                }
              });
            </script>
          </body>
        </html>
      `
    }

    setIframeContent(generateHTML())
  }, [blocks, selectedBlockId])

  // Handle messages from iframe
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === "blockClick") {
        onSelectBlock(event.data.blockId)
      }
    }

    window.addEventListener("message", handleMessage)
    return () => window.removeEventListener("message", handleMessage)
  }, [onSelectBlock])

  // Update iframe content
  useEffect(() => {
    if (iframeRef.current && iframeContent) {
      const iframe = iframeRef.current
      const doc = iframe.contentDocument || iframe.contentWindow?.document
      if (doc) {
        doc.open()
        doc.write(iframeContent)
        doc.close()
      }
    }
  }, [iframeContent])

  return (
    <div className="h-full bg-white border rounded-lg overflow-hidden">
      <iframe
        ref={iframeRef}
        className="w-full h-full border-0"
        title="Website Preview"
        sandbox="allow-scripts allow-same-origin"
      />
    </div>
  )
}

// Helper function to render block to HTML
function renderBlockToHTML(block: Block): string {
  switch (block.type) {
    case "hero":
      const {
        title = "Welcome",
        subtitle = "Subtitle",
        description = "Description",
        buttonText = "Get Started",
        buttonLink = "#",
        backgroundImage,
        backgroundColor = "#0066FF",
        alignment = "center",
        textColor = "#FFFFFF", // Ensure textColor is declared before use
      } = block.props

      return `
        <div style="
          position: relative;
          padding: 80px 32px;
          text-align: ${alignment};
          background-color: ${backgroundImage ? "transparent" : backgroundColor};
          ${backgroundImage ? `background-image: url(${backgroundImage}); background-size: cover; background-position: center;` : ""}
          color: ${textColor};
        ">
          ${backgroundImage ? '<div style="position: absolute; inset: 0; background: rgba(0,0,0,0.4);"></div>' : ""}
          <div style="position: relative; max-width: 1024px; margin: 0 auto;">
            <h1 style="font-size: 3rem; font-weight: bold; margin-bottom: 1rem;">${title}</h1>
            <h2 style="font-size: 1.5rem; margin-bottom: 1.5rem; opacity: 0.9;">${subtitle}</h2>
            <p style="font-size: 1.125rem; margin-bottom: 2rem; opacity: 0.8; max-width: 512px; margin-left: auto; margin-right: auto;">${description}</p>
            <a href="${buttonLink}" style="
              display: inline-block;
              background: white;
              color: #1f2937;
              padding: 12px 32px;
              border-radius: 8px;
              font-weight: 600;
              text-decoration: none;
              transition: background-color 0.2s;
            ">${buttonText}</a>
          </div>
        </div>
      `

    case "text":
      const { content = "<p>Text content</p>", fontSize = 16, textColor = "#333333", textAlign = "left" } = block.props
      return `
        <div style="
          padding: 32px 16px;
          font-size: ${fontSize}px;
          color: ${textColor};
          text-align: ${textAlign};
        ">
          ${content}
        </div>
      `

    case "button":
      const {
        text = "Button",
        link = "#",
        backgroundColor: btnBg = "#0066FF",
        textColor: btnColor = "#FFFFFF",
        borderRadius = 8,
        fontSize: btnSize = 16,
        alignment: btnAlign = "left",
        variant = "solid",
      } = block.props

      return `
        <div style="padding: 16px; text-align: ${btnAlign};">
          <a href="${link}" style="
            display: inline-block;
            background-color: ${variant === "solid" ? btnBg : "transparent"};
            color: ${variant === "solid" ? btnColor : btnBg};
            border: ${variant === "outline" ? `2px solid ${btnBg}` : "none"};
            border-radius: ${borderRadius}px;
            font-size: ${btnSize}px;
            padding: 12px 24px;
            text-decoration: none;
            font-weight: 600;
            transition: all 0.2s;
          ">${text}</a>
        </div>
      `

    case "image":
      const {
        src = "/placeholder.svg?height=300&width=600",
        alt = "Image",
        caption = "",
        borderRadius: imgRadius = 8,
        alignment: imgAlign = "center",
      } = block.props

      return `
        <div style="padding: 16px; text-align: ${imgAlign};">
          <img src="${src}" alt="${alt}" style="
            border-radius: ${imgRadius}px;
            max-width: 100%;
            height: auto;
          " />
          ${caption ? `<p style="margin-top: 8px; font-size: 14px; color: #6b7280; font-style: italic;">${caption}</p>` : ""}
        </div>
      `

    case "spacer":
      const { height = 60, backgroundColor: spacerBg = "transparent" } = block.props
      return `<div style="height: ${height}px; background-color: ${spacerBg};"></div>`

    default:
      return `<div style="padding: 16px; border: 1px solid #ef4444; background: #fef2f2; color: #dc2626;">Unknown block type: ${block.type}</div>`
  }
}
