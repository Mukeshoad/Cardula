"use client"

import { blockDefinitions, type BlockType } from "./block-types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

interface BlocksPanelProps {
  onAddBlock: (type: BlockType) => void
}

export function BlocksPanel({ onAddBlock }: BlocksPanelProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg">Add Blocks</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[calc(100vh-200px)]">
          <div className="p-4 space-y-2">
            {Object.values(blockDefinitions).map((block) => (
              <Button
                key={block.type}
                variant="outline"
                className="w-full justify-start h-auto p-3 bg-transparent"
                onClick={() => onAddBlock(block.type)}
              >
                <div className="flex items-start gap-3">
                  <span className="text-lg">{block.icon}</span>
                  <div className="text-left">
                    <div className="font-medium">{block.name}</div>
                    <div className="text-xs text-muted-foreground mt-1">{block.description}</div>
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
