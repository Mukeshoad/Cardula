"use client"

import type { Block } from "@/lib/projects"
import { blockDefinitions } from "./block-types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Trash2 } from "lucide-react"

interface PropertiesPanelProps {
  selectedBlock: Block | null
  onUpdateBlock: (blockId: string, props: Record<string, any>) => void
  onDeleteBlock: (blockId: string) => void
}

export function PropertiesPanel({ selectedBlock, onUpdateBlock, onDeleteBlock }: PropertiesPanelProps) {
  if (!selectedBlock) {
    return (
      <Card className="h-full">
        <CardContent className="flex items-center justify-center h-full">
          <p className="text-muted-foreground text-center">Select a block to edit its properties</p>
        </CardContent>
      </Card>
    )
  }

  const definition = blockDefinitions[selectedBlock.type]

  if (!definition) {
    return (
      <Card className="h-full">
        <CardContent className="flex items-center justify-center h-full">
          <p className="text-red-500 text-center">Unknown block type: {selectedBlock.type}</p>
        </CardContent>
      </Card>
    )
  }

  const handlePropertyChange = (key: string, value: any) => {
    onUpdateBlock(selectedBlock.id, {
      ...selectedBlock.props,
      [key]: value,
    })
  }

  const renderPropertyInput = (property: any) => {
    const value = selectedBlock.props[property.key] ?? ""

    switch (property.type) {
      case "text":
      case "url":
        return (
          <Input
            value={value}
            onChange={(e) => handlePropertyChange(property.key, e.target.value)}
            placeholder={property.placeholder}
          />
        )

      case "textarea":
        return (
          <Textarea
            value={value}
            onChange={(e) => handlePropertyChange(property.key, e.target.value)}
            placeholder={property.placeholder}
            rows={3}
          />
        )

      case "number":
        return (
          <Input
            type="number"
            value={value}
            onChange={(e) => handlePropertyChange(property.key, Number.parseInt(e.target.value) || 0)}
            min={property.min}
            max={property.max}
          />
        )

      case "color":
        return (
          <div className="flex gap-2">
            <Input
              type="color"
              value={value}
              onChange={(e) => handlePropertyChange(property.key, e.target.value)}
              className="w-12 h-10 p-1 border rounded"
            />
            <Input
              value={value}
              onChange={(e) => handlePropertyChange(property.key, e.target.value)}
              placeholder="#000000"
              className="flex-1"
            />
          </div>
        )

      case "select":
        return (
          <Select value={value} onValueChange={(val) => handlePropertyChange(property.key, val)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {property.options?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )

      case "boolean":
        return <Switch checked={value} onCheckedChange={(checked) => handlePropertyChange(property.key, checked)} />

      case "image":
        return (
          <div className="space-y-2">
            <Input
              value={value}
              onChange={(e) => handlePropertyChange(property.key, e.target.value)}
              placeholder="Image URL or upload"
            />
            <Button variant="outline" size="sm" className="w-full bg-transparent">
              Upload Image
            </Button>
          </div>
        )

      default:
        return <Input value={value} onChange={(e) => handlePropertyChange(property.key, e.target.value)} />
    }
  }

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">{definition.name}</CardTitle>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onDeleteBlock(selectedBlock.id)}
          className="text-red-600 hover:text-red-700"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[calc(100vh-200px)]">
          <div className="p-4 space-y-4">
            {definition.properties.map((property) => (
              <div key={property.key} className="space-y-2">
                <Label htmlFor={property.key}>{property.label}</Label>
                {renderPropertyInput(property)}
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
