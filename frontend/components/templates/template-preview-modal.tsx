"use client"

import type { Template } from "@/lib/api"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ImageWithFallback } from "./image-with-fallback"
import { Plus, X } from "lucide-react"

interface TemplatePreviewModalProps {
  template: Template | null
  open: boolean
  onClose: () => void
  onUseTemplate: (template: Template) => void
}

export function TemplatePreviewModal({ template, open, onClose, onUseTemplate }: TemplatePreviewModalProps) {
  if (!template) return null

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-xl font-bold">{template.title}</DialogTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </DialogHeader>

        <div className="space-y-6">
          {/* Template Preview Image */}
          <div className="relative">
            <ImageWithFallback
              src={template.thumbnail || "/placeholder.svg"}
              alt={template.title}
              className="w-full rounded-lg"
              aspectRatio="16/10"
            />
          </div>

          {/* Template Info */}
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-muted-foreground">{template.description || "No description available."}</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {template.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Category</h3>
              <Badge variant="outline" className="capitalize">
                {template.category}
              </Badge>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t">
            <Button onClick={() => onUseTemplate(template)} className="flex-1" size="lg">
              <Plus className="w-4 h-4 mr-2" />
              Use This Template
            </Button>
            <Button variant="outline" onClick={onClose} size="lg">
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
