"use client"

import { useState } from "react"
import { Plus, Settings, Trash2, GripVertical, Layers } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { useBuilderStore } from "@/lib/builder-store"
import { BlockPropertiesPanel } from "./block-properties-panel"

export function EditorPanel() {
  const { blocks, selectedBlockId, addBlock, deleteBlock, selectBlock } = useBuilderStore()
  const [showProperties, setShowProperties] = useState(false)

  const handleAddBlock = (type: "hero" | "text" | "button") => {
    addBlock(type)
    setShowProperties(true)
  }

  const handleSelectBlock = (blockId: string) => {
    selectBlock(blockId)
    setShowProperties(true)
  }

  const handleDeleteBlock = (blockId: string) => {
    deleteBlock(blockId)
    if (selectedBlockId === blockId) {
      setShowProperties(false)
    }
  }

  return (
    <div className="h-full flex flex-col bg-sidebar">
      {/* Header */}
      <div className="p-6 border-b border-sidebar-border bg-gradient-to-r from-sidebar to-sidebar/80">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 bg-sidebar-primary rounded-lg flex items-center justify-center">
            <Layers className="w-4 h-4 text-sidebar-primary-foreground" />
          </div>
          <h2 className="text-xl font-bold text-sidebar-foreground">Builder</h2>
        </div>
        <p className="text-sm text-sidebar-foreground/70">Design your perfect website</p>
      </div>

      {/* Add Blocks Section */}
      <div className="p-6">
        <h3 className="text-sm font-semibold text-sidebar-foreground mb-4 uppercase tracking-wide">Add Elements</h3>
        <div className="grid grid-cols-1 gap-3">
          <Button
            variant="outline"
            size="default"
            onClick={() => handleAddBlock("hero")}
            className="justify-start h-12 bg-background/50 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground border-sidebar-border transition-all duration-200"
          >
            <Plus className="w-4 h-4 mr-3" />
            <div className="text-left">
              <div className="font-medium">Hero Section</div>
              <div className="text-xs opacity-70">Header with title & subtitle</div>
            </div>
          </Button>
          <Button
            variant="outline"
            size="default"
            onClick={() => handleAddBlock("text")}
            className="justify-start h-12 bg-background/50 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground border-sidebar-border transition-all duration-200"
          >
            <Plus className="w-4 h-4 mr-3" />
            <div className="text-left">
              <div className="font-medium">Text Block</div>
              <div className="text-xs opacity-70">Paragraph content</div>
            </div>
          </Button>
          <Button
            variant="outline"
            size="default"
            onClick={() => handleAddBlock("button")}
            className="justify-start h-12 bg-background/50 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground border-sidebar-border transition-all duration-200"
          >
            <Plus className="w-4 h-4 mr-3" />
            <div className="text-left">
              <div className="font-medium">Button</div>
              <div className="text-xs opacity-70">Call-to-action button</div>
            </div>
          </Button>
        </div>
      </div>

      <Separator className="bg-sidebar-border" />

      {/* Blocks List */}
      <div className="flex-1 flex flex-col min-h-0">
        <div className="p-6 pb-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-sidebar-foreground uppercase tracking-wide">Layers</h3>
            <span className="text-xs text-sidebar-foreground/60 bg-sidebar-accent/20 px-2 py-1 rounded-full">
              {blocks.length}
            </span>
          </div>
        </div>

        <ScrollArea className="flex-1 px-6">
          <div className="space-y-3 pb-6">
            {blocks.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-12 h-12 mx-auto mb-4 bg-sidebar-accent/20 rounded-full flex items-center justify-center">
                  <Layers className="w-6 h-6 text-sidebar-accent" />
                </div>
                <p className="text-sm font-medium text-sidebar-foreground mb-1">No elements yet</p>
                <p className="text-xs text-sidebar-foreground/60">Add your first element above</p>
              </div>
            ) : (
              blocks.map((block, index) => (
                <Card
                  key={block.id}
                  className={`cursor-pointer transition-all duration-200 hover:shadow-md border-sidebar-border bg-background/80 backdrop-blur-sm ${
                    selectedBlockId === block.id
                      ? "ring-2 ring-sidebar-primary shadow-lg bg-sidebar-primary/5"
                      : "hover:bg-background"
                  }`}
                  onClick={() => handleSelectBlock(block.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <GripVertical className="w-4 h-4 text-sidebar-foreground/40" />
                        <div>
                          <p className="text-sm font-semibold capitalize text-sidebar-foreground">{block.type}</p>
                          <p className="text-xs text-sidebar-foreground/60 mt-0.5">
                            {block.type === "hero" && (block.props.title || "Untitled Hero")}
                            {block.type === "text" &&
                              block.props.content.slice(0, 25) + (block.props.content.length > 25 ? "..." : "")}
                            {block.type === "button" && (block.props.text || "Button")}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleSelectBlock(block.id)
                            setShowProperties(true)
                          }}
                          className="h-8 w-8 p-0 hover:bg-sidebar-accent/20"
                        >
                          <Settings className="w-3.5 h-3.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDeleteBlock(block.id)
                          }}
                          className="h-8 w-8 p-0 hover:bg-destructive/20 hover:text-destructive"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Properties Panel */}
      {showProperties && selectedBlockId && (
        <>
          <Separator className="bg-sidebar-border" />
          <div className="p-6 bg-sidebar-accent/5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-sidebar-foreground uppercase tracking-wide">Properties</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowProperties(false)}
                className="h-8 w-8 p-0 hover:bg-sidebar-accent/20"
              >
                ×
              </Button>
            </div>
            <BlockPropertiesPanel blockId={selectedBlockId} />
          </div>
        </>
      )}
    </div>
  )
}
