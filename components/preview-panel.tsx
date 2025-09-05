"use client"

import { Monitor, Smartphone, Tablet, Eye, Rocket } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useBuilderStore } from "@/lib/builder-store"
import { BlockRenderer } from "./blocks/block-renderer"
import { useState } from "react"

type ViewportSize = "desktop" | "tablet" | "mobile"

export function PreviewPanel() {
  const { blocks, selectedBlockId, selectBlock, publishSite, isPublishing } = useBuilderStore()
  const [viewportSize, setViewportSize] = useState<ViewportSize>("desktop")

  const handleBlockClick = (blockId: string) => {
    selectBlock(selectedBlockId === blockId ? null : blockId)
  }

  const handlePublish = async () => {
    try {
      await publishSite()
      alert("Website published successfully!")
    } catch (error) {
      alert("Failed to publish website. Please try again.")
    }
  }

  const getViewportClasses = () => {
    switch (viewportSize) {
      case "mobile":
        return "max-w-sm mx-auto"
      case "tablet":
        return "max-w-2xl mx-auto"
      case "desktop":
      default:
        return "w-full"
    }
  }

  return (
    <div className="h-full flex flex-col">
      {/* Preview Header */}
      <div className="flex items-center justify-between p-6 border-b border-border bg-background shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
            <Eye className="w-4 h-4 text-primary" />
          </div>
          <div>
            <span className="text-lg font-semibold text-foreground">Preview</span>
            <p className="text-xs text-muted-foreground">Live website preview</p>
          </div>
        </div>

        {/* Viewport Controls */}
        <div className="flex items-center gap-2 bg-muted/50 p-1 rounded-lg">
          <Button
            variant={viewportSize === "desktop" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewportSize("desktop")}
            className={`h-9 px-3 ${viewportSize === "desktop" ? "bg-primary text-primary-foreground shadow-sm" : ""}`}
          >
            <Monitor className="w-4 h-4 mr-2" />
            Desktop
          </Button>
          <Button
            variant={viewportSize === "tablet" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewportSize("tablet")}
            className={`h-9 px-3 ${viewportSize === "tablet" ? "bg-primary text-primary-foreground shadow-sm" : ""}`}
          >
            <Tablet className="w-4 h-4 mr-2" />
            Tablet
          </Button>
          <Button
            variant={viewportSize === "mobile" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewportSize("mobile")}
            className={`h-9 px-3 ${viewportSize === "mobile" ? "bg-primary text-primary-foreground shadow-sm" : ""}`}
          >
            <Smartphone className="w-4 h-4 mr-2" />
            Mobile
          </Button>
        </div>

        {/* Publish Button */}
        <Button
          onClick={handlePublish}
          disabled={isPublishing || blocks.length === 0}
          className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm h-10 px-6 font-semibold"
        >
          <Rocket className="w-4 h-4 mr-2" />
          {isPublishing ? "Publishing..." : "Publish Site"}
        </Button>
      </div>

      {/* Preview Content */}
      <div className="flex-1 bg-gradient-to-br from-muted/30 to-muted/10 p-8">
        <ScrollArea className="h-full">
          <div
            className={`bg-background min-h-full shadow-2xl rounded-lg border border-border/50 transition-all duration-300 ${getViewportClasses()}`}
          >
            {blocks.length === 0 ? (
              <div className="flex items-center justify-center min-h-96 text-center p-12">
                <div>
                  <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center">
                    <Eye className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">Ready to build?</h3>
                  <p className="text-muted-foreground max-w-sm leading-relaxed">
                    Start creating your website by adding elements from the builder panel. Your changes will appear here
                    instantly.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-0 overflow-hidden rounded-lg">
                {blocks.map((block) => (
                  <div key={block.id} className="relative group">
                    <BlockRenderer
                      block={block}
                      isSelected={selectedBlockId === block.id}
                      onClick={() => handleBlockClick(block.id)}
                    />

                    {/* Block Overlay for Better Selection */}
                    {selectedBlockId === block.id && (
                      <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-medium px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm">
                          {block.type.charAt(0).toUpperCase() + block.type.slice(1)} Block
                        </div>
                        <div className="absolute inset-0 ring-2 ring-primary/50 ring-inset rounded-lg"></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Preview Footer */}
      <div className="p-4 border-t border-border bg-background/80 backdrop-blur-sm">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-4 text-muted-foreground">
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              {blocks.length} element{blocks.length !== 1 ? "s" : ""}
            </span>
            <span className="capitalize font-medium">{viewportSize} view</span>
          </div>
          <span className="text-xs text-muted-foreground">Changes save automatically</span>
        </div>
      </div>
    </div>
  )
}
