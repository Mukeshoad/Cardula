"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useBuilderStore } from "@/lib/builder-store"
import type { Block } from "@/lib/builder-store"

interface BlockPropertiesPanelProps {
  blockId: string
}

export function BlockPropertiesPanel({ blockId }: BlockPropertiesPanelProps) {
  const { blocks, updateBlock } = useBuilderStore()
  const block = blocks.find((b) => b.id === blockId)

  if (!block) return null

  const handleUpdateProps = (updates: Partial<Block["props"]>) => {
    updateBlock(blockId, { props: { ...block.props, ...updates } })
  }

  if (block.type === "hero") {
    return (
      <div className="space-y-4">
        <div>
          <Label htmlFor="hero-title" className="text-xs">
            Title
          </Label>
          <Input
            id="hero-title"
            value={block.props.title}
            onChange={(e) => handleUpdateProps({ title: e.target.value })}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="hero-subtitle" className="text-xs">
            Subtitle
          </Label>
          <Textarea
            id="hero-subtitle"
            value={block.props.subtitle}
            onChange={(e) => handleUpdateProps({ subtitle: e.target.value })}
            className="mt-1"
            rows={3}
          />
        </div>
        <div>
          <Label htmlFor="hero-bg" className="text-xs">
            Background Image URL
          </Label>
          <Input
            id="hero-bg"
            value={block.props.backgroundImage || ""}
            onChange={(e) => handleUpdateProps({ backgroundImage: e.target.value || undefined })}
            placeholder="https://example.com/image.jpg"
            className="mt-1"
          />
        </div>
      </div>
    )
  }

  if (block.type === "text") {
    return (
      <div className="space-y-4">
        <div>
          <Label htmlFor="text-content" className="text-xs">
            Content
          </Label>
          <Textarea
            id="text-content"
            value={block.props.content}
            onChange={(e) => handleUpdateProps({ content: e.target.value })}
            className="mt-1"
            rows={4}
          />
        </div>
        <div>
          <Label htmlFor="text-size" className="text-xs">
            Font Size
          </Label>
          <Select
            value={block.props.fontSize}
            onValueChange={(value: "sm" | "md" | "lg" | "xl") => handleUpdateProps({ fontSize: value })}
          >
            <SelectTrigger className="mt-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sm">Small</SelectItem>
              <SelectItem value="md">Medium</SelectItem>
              <SelectItem value="lg">Large</SelectItem>
              <SelectItem value="xl">Extra Large</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="text-align" className="text-xs">
            Text Alignment
          </Label>
          <Select
            value={block.props.textAlign}
            onValueChange={(value: "left" | "center" | "right") => handleUpdateProps({ textAlign: value })}
          >
            <SelectTrigger className="mt-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="left">Left</SelectItem>
              <SelectItem value="center">Center</SelectItem>
              <SelectItem value="right">Right</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    )
  }

  if (block.type === "button") {
    return (
      <div className="space-y-4">
        <div>
          <Label htmlFor="button-text" className="text-xs">
            Button Text
          </Label>
          <Input
            id="button-text"
            value={block.props.text}
            onChange={(e) => handleUpdateProps({ text: e.target.value })}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="button-variant" className="text-xs">
            Style
          </Label>
          <Select
            value={block.props.variant}
            onValueChange={(value: "primary" | "secondary" | "outline") => handleUpdateProps({ variant: value })}
          >
            <SelectTrigger className="mt-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="primary">Primary</SelectItem>
              <SelectItem value="secondary">Secondary</SelectItem>
              <SelectItem value="outline">Outline</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="button-size" className="text-xs">
            Size
          </Label>
          <Select
            value={block.props.size}
            onValueChange={(value: "sm" | "md" | "lg") => handleUpdateProps({ size: value })}
          >
            <SelectTrigger className="mt-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sm">Small</SelectItem>
              <SelectItem value="md">Medium</SelectItem>
              <SelectItem value="lg">Large</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="button-href" className="text-xs">
            Link URL (optional)
          </Label>
          <Input
            id="button-href"
            value={block.props.href || ""}
            onChange={(e) => handleUpdateProps({ href: e.target.value || undefined })}
            placeholder="https://example.com"
            className="mt-1"
          />
        </div>
      </div>
    )
  }

  return null
}
