"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useBuilderStore } from "@/lib/builder-store"

export function BlockPropertiesPanel() {
  const { blocks, selectedBlockId, updateBlock } = useBuilderStore()
  const block = blocks.find((b) => b.id === selectedBlockId)

  if (!block) return null

  const handleUpdateProps = (updates: Record<string, any>) => {
    updateBlock(block.id, updates)
  }

  return (
    <ScrollArea className="h-full px-4">
      <div className="space-y-6 pb-4">
        <div>
          <h3 className="font-medium text-sidebar-foreground mb-3">Block Properties</h3>
          <p className="text-xs text-muted-foreground mb-4 capitalize">{block.type} Block</p>
        </div>

        {block.type === "hero" && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="hero-title" className="text-xs font-medium">
                Title
              </Label>
              <Input
                id="hero-title"
                value={block.props.title || ""}
                onChange={(e) => handleUpdateProps({ title: e.target.value })}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="hero-subtitle" className="text-xs font-medium">
                Subtitle
              </Label>
              <Textarea
                id="hero-subtitle"
                value={block.props.subtitle || ""}
                onChange={(e) => handleUpdateProps({ subtitle: e.target.value })}
                className="mt-2"
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="hero-alignment" className="text-xs font-medium">
                Alignment
              </Label>
              <Select
                value={block.props.alignment || "center"}
                onValueChange={(value) => handleUpdateProps({ alignment: value })}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="left">Left</SelectItem>
                  <SelectItem value="center">Center</SelectItem>
                  <SelectItem value="right">Right</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="hero-title-size" className="text-xs font-medium">
                Title Size
              </Label>
              <Select
                value={block.props.titleSize || "large"}
                onValueChange={(value) => handleUpdateProps({ titleSize: value })}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="large">Large</SelectItem>
                  <SelectItem value="xl">Extra Large</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        {block.type === "text" && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="text-content" className="text-xs font-medium">
                Content
              </Label>
              <Textarea
                id="text-content"
                value={block.props.content || ""}
                onChange={(e) => handleUpdateProps({ content: e.target.value })}
                className="mt-2"
                rows={4}
              />
            </div>
            <div>
              <Label htmlFor="text-size" className="text-xs font-medium">
                Font Size
              </Label>
              <Select
                value={block.props.fontSize || "medium"}
                onValueChange={(value) => handleUpdateProps({ fontSize: value })}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Small</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="large">Large</SelectItem>
                  <SelectItem value="xl">Extra Large</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="text-align" className="text-xs font-medium">
                Alignment
              </Label>
              <Select
                value={block.props.alignment || "left"}
                onValueChange={(value) => handleUpdateProps({ alignment: value })}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="left">Left</SelectItem>
                  <SelectItem value="center">Center</SelectItem>
                  <SelectItem value="right">Right</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="text-weight" className="text-xs font-medium">
                Font Weight
              </Label>
              <Select
                value={block.props.fontWeight || "normal"}
                onValueChange={(value) => handleUpdateProps({ fontWeight: value })}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="semibold">Semibold</SelectItem>
                  <SelectItem value="bold">Bold</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        {block.type === "button" && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="button-text" className="text-xs font-medium">
                Button Text
              </Label>
              <Input
                id="button-text"
                value={block.props.text || ""}
                onChange={(e) => handleUpdateProps({ text: e.target.value })}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="button-variant" className="text-xs font-medium">
                Style
              </Label>
              <Select
                value={block.props.variant || "primary"}
                onValueChange={(value) => handleUpdateProps({ variant: value })}
              >
                <SelectTrigger className="mt-2">
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
              <Label htmlFor="button-size" className="text-xs font-medium">
                Size
              </Label>
              <Select
                value={block.props.size || "medium"}
                onValueChange={(value) => handleUpdateProps({ size: value })}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Small</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="large">Large</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="button-alignment" className="text-xs font-medium">
                Alignment
              </Label>
              <Select
                value={block.props.alignment || "center"}
                onValueChange={(value) => handleUpdateProps({ alignment: value })}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="left">Left</SelectItem>
                  <SelectItem value="center">Center</SelectItem>
                  <SelectItem value="right">Right</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="button-link" className="text-xs font-medium">
                Link URL
              </Label>
              <Input
                id="button-link"
                value={block.props.link || ""}
                onChange={(e) => handleUpdateProps({ link: e.target.value })}
                placeholder="https://example.com"
                className="mt-2"
              />
            </div>
          </div>
        )}

        {block.type === "image" && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="image-src" className="text-xs font-medium">
                Image URL
              </Label>
              <Input
                id="image-src"
                value={block.props.src || ""}
                onChange={(e) => handleUpdateProps({ src: e.target.value })}
                placeholder="https://example.com/image.jpg"
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="image-alt" className="text-xs font-medium">
                Alt Text
              </Label>
              <Input
                id="image-alt"
                value={block.props.alt || ""}
                onChange={(e) => handleUpdateProps({ alt: e.target.value })}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="image-caption" className="text-xs font-medium">
                Caption
              </Label>
              <Input
                id="image-caption"
                value={block.props.caption || ""}
                onChange={(e) => handleUpdateProps({ caption: e.target.value })}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="image-alignment" className="text-xs font-medium">
                Alignment
              </Label>
              <Select
                value={block.props.alignment || "center"}
                onValueChange={(value) => handleUpdateProps({ alignment: value })}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="left">Left</SelectItem>
                  <SelectItem value="center">Center</SelectItem>
                  <SelectItem value="right">Right</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="image-border-radius" className="text-xs font-medium">
                Border Radius
              </Label>
              <Select
                value={block.props.borderRadius || "medium"}
                onValueChange={(value) => handleUpdateProps({ borderRadius: value })}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="small">Small</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="large">Large</SelectItem>
                  <SelectItem value="full">Full</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        {block.type === "contact" && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="contact-title" className="text-xs font-medium">
                Title
              </Label>
              <Input
                id="contact-title"
                value={block.props.title || ""}
                onChange={(e) => handleUpdateProps({ title: e.target.value })}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="contact-description" className="text-xs font-medium">
                Description
              </Label>
              <Textarea
                id="contact-description"
                value={block.props.description || ""}
                onChange={(e) => handleUpdateProps({ description: e.target.value })}
                className="mt-2"
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="contact-submit" className="text-xs font-medium">
                Submit Button Text
              </Label>
              <Input
                id="contact-submit"
                value={block.props.submitText || ""}
                onChange={(e) => handleUpdateProps({ submitText: e.target.value })}
                className="mt-2"
              />
            </div>
          </div>
        )}

        {block.type === "spacer" && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="spacer-height" className="text-xs font-medium">
                Height
              </Label>
              <Select
                value={block.props.height || "medium"}
                onValueChange={(value) => handleUpdateProps({ height: value })}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Small (20px)</SelectItem>
                  <SelectItem value="medium">Medium (40px)</SelectItem>
                  <SelectItem value="large">Large (60px)</SelectItem>
                  <SelectItem value="xl">Extra Large (80px)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
      </div>
    </ScrollArea>
  )
}
