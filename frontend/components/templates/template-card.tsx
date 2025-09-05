"use client"

import type { Template } from "@/lib/api"
import { ImageWithFallback } from "./image-with-fallback"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Eye, Plus } from "lucide-react"

interface TemplateCardProps {
  template: Template
  onPreview: (template: Template) => void
  onUseTemplate: (template: Template) => void
}

export function TemplateCard({ template, onPreview, onUseTemplate }: TemplateCardProps) {
  return (
    <Card className="group overflow-hidden transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
      <div className="relative">
        <ImageWithFallback
          src={template.thumbnail || "/placeholder.svg"}
          alt={template.title}
          className="w-full rounded-t-lg"
          aspectRatio="16/9"
        />

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onPreview(template)}
            className="bg-white/90 text-black hover:bg-white"
          >
            <Eye className="w-4 h-4 mr-1" />
            Preview
          </Button>
          <Button
            size="sm"
            onClick={() => onUseTemplate(template)}
            className="bg-primary text-white hover:bg-primary/90"
          >
            <Plus className="w-4 h-4 mr-1" />
            Use Template
          </Button>
        </div>
      </div>

      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-1">{template.title}</h3>
        {template.description && (
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{template.description}</p>
        )}

        <div className="flex flex-wrap gap-1">
          {template.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
          {template.tags.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{template.tags.length - 3}
            </Badge>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button variant="outline" size="sm" onClick={() => onPreview(template)} className="flex-1">
          <Eye className="w-4 h-4 mr-1" />
          Preview
        </Button>
        <Button size="sm" onClick={() => onUseTemplate(template)} className="flex-1">
          <Plus className="w-4 h-4 mr-1" />
          Use Template
        </Button>
      </CardFooter>
    </Card>
  )
}
