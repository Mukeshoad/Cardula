"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useSiteStore } from "@/lib/site-store"
import { templates, getTemplateById, getAllCategories, searchTemplates } from "@/lib/templates"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { Search, Filter, Grid, List } from "lucide-react"

interface CreateSiteModalProps {
  isOpen: boolean
  onClose: () => void
}

export function CreateSiteModal({ isOpen, onClose }: CreateSiteModalProps) {
  const [step, setStep] = useState<"template" | "details">("template")
  const [selectedTemplate, setSelectedTemplate] = useState("blank")
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [isCreating, setIsCreating] = useState(false)

  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const { createSite } = useSiteStore()
  const router = useRouter()

  const filteredTemplates = (() => {
    let filtered = templates

    if (searchQuery) {
      filtered = searchTemplates(searchQuery)
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter((template) => template.category === selectedCategory)
    }

    return filtered
  })()

  const categories = getAllCategories()

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId)
    const template = getTemplateById(templateId)
    if (template && template.id !== "blank") {
      setName(template.name)
      setDescription(template.description)
    }
    setStep("details")
  }

  const handleCreate = async () => {
    if (!name.trim()) return

    setIsCreating(true)

    const template = getTemplateById(selectedTemplate)
    const newSite = {
      name: name.trim(),
      description: description.trim(),
      template: selectedTemplate,
      isPublished: false,
      blocks: template?.blocks || [],
    }

    createSite(newSite)

    // Reset form
    setStep("template")
    setSelectedTemplate("blank")
    setName("")
    setDescription("")
    setIsCreating(false)
    onClose()

    // Navigate to builder
    router.push("/builder")
  }

  const handleBack = () => {
    if (step === "details") {
      setStep("template")
    }
  }

  const selectedTemplateData = getTemplateById(selectedTemplate)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-6xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">
            {step === "template" ? "Choose a Template" : "Site Details"}
          </DialogTitle>
        </DialogHeader>

        {step === "template" && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 p-4 bg-muted/30 rounded-lg">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search templates..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full sm:w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="flex border rounded-lg p-1">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="h-8 w-8 p-0"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="h-8 w-8 p-0"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <ScrollArea className="max-h-[50vh]">
              {viewMode === "grid" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-1">
                  {filteredTemplates.map((template) => (
                    <div
                      key={template.id}
                      className={cn(
                        "group cursor-pointer border rounded-lg overflow-hidden transition-all hover:shadow-lg",
                        selectedTemplate === template.id ? "ring-2 ring-primary" : "hover:border-primary/50",
                      )}
                      onClick={() => handleTemplateSelect(template.id)}
                    >
                      <div className="aspect-video bg-muted relative overflow-hidden">
                        {template.preview ? (
                          <Image
                            src={template.preview || "/placeholder.svg"}
                            alt={template.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full">
                            <div className="text-4xl">{template.id === "blank" ? "📄" : "🎨"}</div>
                          </div>
                        )}
                      </div>

                      <div className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-medium text-foreground">{template.name}</h3>
                          <Badge variant="secondary" className="text-xs">
                            {template.category}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{template.description}</p>
                        <div className="flex flex-wrap gap-1">
                          {template.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-2 p-1">
                  {filteredTemplates.map((template) => (
                    <div
                      key={template.id}
                      className={cn(
                        "flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md",
                        selectedTemplate === template.id
                          ? "ring-2 ring-primary bg-primary/5"
                          : "hover:border-primary/50",
                      )}
                      onClick={() => handleTemplateSelect(template.id)}
                    >
                      <div className="w-20 h-12 bg-muted rounded border flex items-center justify-center flex-shrink-0">
                        <span className="text-lg">{template.id === "blank" ? "📄" : "🎨"}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium text-foreground truncate">{template.name}</h3>
                          <Badge variant="secondary" className="text-xs flex-shrink-0">
                            {template.category}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-1">{template.description}</p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {template.tags.slice(0, 4).map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {filteredTemplates.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  <div className="text-4xl mb-4">🔍</div>
                  <h3 className="font-medium mb-2">No templates found</h3>
                  <p className="text-sm">Try adjusting your search or filter criteria</p>
                </div>
              )}
            </ScrollArea>
          </div>
        )}

        {step === "details" && (
          <div className="space-y-6">
            <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
              <div className="w-16 h-12 bg-background rounded border flex items-center justify-center">
                <span className="text-lg">{selectedTemplateData?.id === "blank" ? "📄" : "🎨"}</span>
              </div>
              <div>
                <h4 className="font-medium">{selectedTemplateData?.name}</h4>
                <p className="text-sm text-muted-foreground">{selectedTemplateData?.description}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="site-name">Site Name</Label>
                <Input
                  id="site-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="My Awesome Website"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="site-description">Description (Optional)</Label>
                <Textarea
                  id="site-description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Brief description of your website"
                  className="mt-1"
                  rows={3}
                />
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-2 pt-4 border-t">
          {step === "details" && (
            <Button variant="outline" onClick={handleBack} className="bg-transparent">
              Back
            </Button>
          )}
          <div className="flex-1" />
          <Button variant="outline" onClick={onClose} className="bg-transparent">
            Cancel
          </Button>
          {step === "details" && (
            <Button
              onClick={handleCreate}
              disabled={!name.trim() || isCreating}
              className="bg-primary hover:bg-primary/90"
            >
              {isCreating ? "Creating..." : "Create Site"}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
