"use client"

import { Button } from "@/components/ui/button"
import { useBuilderStore } from "@/lib/builder-store"
import { Monitor, Tablet, Smartphone } from "lucide-react"
import { cn } from "@/lib/utils"
import { BlockRenderer } from "./block-renderer"

export function PreviewPanel() {
  const { blocks, previewMode, setPreviewMode, selectedBlockId, selectBlock } = useBuilderStore()

  const getPreviewWidth = () => {
    switch (previewMode) {
      case "mobile":
        return "w-[375px]"
      case "tablet":
        return "w-[768px]"
      case "desktop":
      default:
        return "w-full"
    }
  }

  return (
    <div className="h-full flex flex-col bg-muted/10">
      {/* Preview Controls */}
      <div className="border-b border-border bg-background px-6 py-3">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-foreground">Preview</h3>

          <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
            <Button
              variant={previewMode === "desktop" ? "default" : "ghost"}
              size="sm"
              onClick={() => setPreviewMode("desktop")}
              className="h-8 px-3"
            >
              <Monitor className="w-4 h-4" />
            </Button>
            <Button
              variant={previewMode === "tablet" ? "default" : "ghost"}
              size="sm"
              onClick={() => setPreviewMode("tablet")}
              className="h-8 px-3"
            >
              <Tablet className="w-4 h-4" />
            </Button>
            <Button
              variant={previewMode === "mobile" ? "default" : "ghost"}
              size="sm"
              onClick={() => setPreviewMode("mobile")}
              className="h-8 px-3"
            >
              <Smartphone className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Preview Content */}
      <div className="flex-1 overflow-auto bg-gradient-to-br from-muted/20 to-muted/40 p-6">
        <div className="flex justify-center">
          <div
            className={cn(
              "bg-background shadow-xl rounded-lg overflow-hidden transition-all duration-300",
              getPreviewWidth(),
              previewMode !== "desktop" && "min-h-[600px]",
            )}
          >
            {blocks.length === 0 ? (
              <div className="flex items-center justify-center min-h-[400px] text-center p-8">
                <div>
                  <div className="text-4xl mb-4">🎨</div>
                  <h3 className="text-lg font-display font-semibold text-foreground mb-2">Start Building</h3>
                  <p className="text-muted-foreground max-w-sm">
                    Add blocks from the editor panel to start building your website. Your changes will appear here in
                    real-time.
                  </p>
                </div>
              </div>
            ) : (
              <div className="relative">
                {blocks
                  .sort((a, b) => a.order - b.order)
                  .map((block) => (
                    <div
                      key={block.id}
                      className={cn(
                        "relative group cursor-pointer transition-all",
                        selectedBlockId === block.id && "ring-2 ring-primary ring-offset-2",
                      )}
                      onClick={() => selectBlock(selectedBlockId === block.id ? null : block.id)}
                    >
                      {selectedBlockId === block.id && (
                        <div className="absolute -top-6 left-0 z-10 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-md font-medium">
                          {block.type.charAt(0).toUpperCase() + block.type.slice(1)} Block
                        </div>
                      )}
                      <BlockRenderer block={block} />
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
