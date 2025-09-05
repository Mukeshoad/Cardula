"use client"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useBuilderStore } from "@/lib/builder-store"
import { BlockPropertiesPanel } from "./block-properties-panel"
import { BlockLayersPanel } from "./block-layers-panel"
import { Type, MousePointer, ImageIcon, Play, Mail, Minus, Columns, Palette, Layout } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const blockTypes = [
  { type: "hero" as const, icon: Layout, label: "Hero Section", description: "Large header with title and subtitle" },
  { type: "text" as const, icon: Type, label: "Text", description: "Paragraph or heading text" },
  { type: "button" as const, icon: MousePointer, label: "Button", description: "Call-to-action button" },
  { type: "image" as const, icon: ImageIcon, label: "Image", description: "Photo or illustration" },
  { type: "video" as const, icon: Play, label: "Video", description: "Embedded video content" },
  { type: "contact" as const, icon: Mail, label: "Contact Form", description: "Contact form with fields" },
  { type: "spacer" as const, icon: Minus, label: "Spacer", description: "Add vertical spacing" },
  { type: "columns" as const, icon: Columns, label: "Columns", description: "Multi-column layout" },
]

export function EditorPanel() {
  const { addBlock, selectedBlockId } = useBuilderStore()

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-sidebar-border">
        <h2 className="font-display font-semibold text-sidebar-foreground">Website Builder</h2>
        <p className="text-sm text-muted-foreground mt-1">Add and customize your content</p>
      </div>

      <Tabs defaultValue="add" className="flex-1 flex flex-col">
        <TabsList className="grid w-full grid-cols-3 mx-4 mt-4">
          <TabsTrigger value="add">Add</TabsTrigger>
          <TabsTrigger value="layers">Layers</TabsTrigger>
          <TabsTrigger value="style">Style</TabsTrigger>
        </TabsList>

        <TabsContent value="add" className="flex-1 mt-4">
          <ScrollArea className="h-full px-4">
            <div className="space-y-3 pb-4">
              <h3 className="font-medium text-sidebar-foreground mb-3">Add Elements</h3>
              {blockTypes.map((blockType) => (
                <Card
                  key={blockType.type}
                  className="cursor-pointer hover:bg-sidebar-primary/50 transition-colors border-sidebar-border"
                  onClick={() => addBlock(blockType.type)}
                >
                  <CardContent className="p-3">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-sidebar-accent/10 rounded-md flex items-center justify-center flex-shrink-0">
                        <blockType.icon className="w-4 h-4 text-sidebar-accent" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="font-medium text-sm text-sidebar-foreground">{blockType.label}</h4>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{blockType.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="layers" className="flex-1 mt-4">
          <BlockLayersPanel />
        </TabsContent>

        <TabsContent value="style" className="flex-1 mt-4">
          {selectedBlockId ? (
            <BlockPropertiesPanel />
          ) : (
            <div className="px-4">
              <div className="text-center py-8">
                <Palette className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
                <p className="text-sm text-muted-foreground">Select a block to customize its style and properties</p>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
