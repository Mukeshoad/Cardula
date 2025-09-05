"use client"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useBuilderStore } from "@/lib/builder-store"
import { GripVertical, Eye, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"

export function BlockLayersPanel() {
  const { blocks, selectedBlockId, selectBlock, deleteBlock } = useBuilderStore()

  const getBlockIcon = (type: string) => {
    switch (type) {
      case "hero":
        return "🎯"
      case "text":
        return "📝"
      case "button":
        return "🔘"
      case "image":
        return "🖼️"
      case "video":
        return "🎥"
      case "contact":
        return "📧"
      case "spacer":
        return "➖"
      case "columns":
        return "📊"
      default:
        return "📄"
    }
  }

  const getBlockTitle = (block: any) => {
    switch (block.type) {
      case "hero":
        return block.props.title || "Hero Section"
      case "text":
        return block.props.content?.substring(0, 30) + "..." || "Text Block"
      case "button":
        return block.props.text || "Button"
      case "image":
        return block.props.alt || "Image"
      case "video":
        return "Video Block"
      case "contact":
        return block.props.title || "Contact Form"
      case "spacer":
        return "Spacer"
      case "columns":
        return `${block.props.columns || 2} Columns`
      default:
        return "Block"
    }
  }

  if (blocks.length === 0) {
    return (
      <div className="px-4">
        <div className="text-center py-8">
          <div className="text-2xl mb-3">📋</div>
          <p className="text-sm text-muted-foreground">No blocks yet. Add some content to see your layers here.</p>
        </div>
      </div>
    )
  }

  return (
    <ScrollArea className="h-full px-4">
      <div className="space-y-2 pb-4">
        <h3 className="font-medium text-sidebar-foreground mb-3">Layers</h3>
        {blocks
          .sort((a, b) => a.order - b.order)
          .map((block) => (
            <div
              key={block.id}
              className={cn(
                "flex items-center gap-2 p-2 rounded-md border border-sidebar-border cursor-pointer transition-colors",
                selectedBlockId === block.id
                  ? "bg-sidebar-primary border-sidebar-accent"
                  : "hover:bg-sidebar-primary/50",
              )}
              onClick={() => selectBlock(block.id)}
            >
              <GripVertical className="w-4 h-4 text-muted-foreground cursor-grab" />

              <span className="text-sm">{getBlockIcon(block.type)}</span>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-sidebar-foreground truncate">{getBlockTitle(block)}</p>
                <p className="text-xs text-muted-foreground capitalize">{block.type}</p>
              </div>

              <div className="flex items-center gap-1">
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                  <Eye className="w-3 h-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 text-destructive hover:text-destructive-foreground hover:bg-destructive"
                  onClick={(e) => {
                    e.stopPropagation()
                    deleteBlock(block.id)
                  }}
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </div>
          ))}
      </div>
    </ScrollArea>
  )
}
