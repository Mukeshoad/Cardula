"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { templatesApi, type Template, type Category } from "@/lib/api"
import { TemplateCard } from "./template-card"
import { TemplatePreviewModal } from "./template-preview-modal"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { toast } from "sonner"
import { Search, Loader2, RefreshCw } from "lucide-react"
import { useAuth } from "./auth/auth-provider"

export function TemplatesGallery() {
  const [templates, setTemplates] = useState<Template[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null)
  const [seeding, setSeeding] = useState(false)

  const router = useRouter()
  const { isAuthenticated } = useAuth()

  const loadTemplates = async () => {
    try {
      setLoading(true)
      const [templatesResponse, categoriesResponse] = await Promise.all([
        templatesApi.getTemplates({
          category: selectedCategory === "all" ? undefined : selectedCategory,
          search: searchQuery || undefined,
          limit: 50,
        }),
        templatesApi.getCategories(),
      ])

      setTemplates(templatesResponse.templates)
      setCategories(categoriesResponse)
    } catch (error) {
      console.error("Failed to load templates:", error)
      toast.error("Failed to load templates")
    } finally {
      setLoading(false)
    }
  }

  const handleSeedTemplates = async () => {
    try {
      setSeeding(true)
      await templatesApi.seedTemplates()
      toast.success("Templates seeded successfully!")
      await loadTemplates()
    } catch (error) {
      console.error("Failed to seed templates:", error)
      toast.error("Failed to seed templates")
    } finally {
      setSeeding(false)
    }
  }

  const handleUseTemplate = async (template: Template) => {
    if (!isAuthenticated) {
      toast.error("Please sign in to use templates")
      router.push("/login")
      return
    }

    try {
      // Create new project from template
      const projectData = {
        title: `${template.title} - Copy`,
        templateId: template.id,
        content: template.content || [],
        styles: template.styles || {},
      }

      // This will be implemented in the next task (projects API)
      toast.success("Template selected! Redirecting to editor...")
      router.push(`/editor/new?template=${template.id}`)
    } catch (error) {
      console.error("Failed to use template:", error)
      toast.error("Failed to use template")
    }
  }

  useEffect(() => {
    loadTemplates()
  }, [selectedCategory, searchQuery])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Templates</h1>
          <p className="text-muted-foreground">Choose from our collection of professionally designed templates</p>
        </div>

        <Button onClick={handleSeedTemplates} disabled={seeding} variant="outline" size="sm">
          {seeding ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Seeding...
            </>
          ) : (
            <>
              <RefreshCw className="w-4 h-4 mr-2" />
              Seed Templates
            </>
          )}
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex gap-2 flex-wrap">
          <Badge
            variant={selectedCategory === "all" ? "default" : "outline"}
            className="cursor-pointer px-3 py-1"
            onClick={() => setSelectedCategory("all")}
          >
            All
          </Badge>
          {categories.map((category) => (
            <Badge
              key={category.name}
              variant={selectedCategory === category.name ? "default" : "outline"}
              className="cursor-pointer px-3 py-1 capitalize"
              onClick={() => setSelectedCategory(category.name)}
            >
              {category.name} ({category.count})
            </Badge>
          ))}
        </div>
      </div>

      {/* Templates Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <div className="aspect-video bg-gray-200 animate-pulse" />
              <CardContent className="p-4 space-y-2">
                <div className="h-4 bg-gray-200 rounded animate-pulse" />
                <div className="h-3 bg-gray-200 rounded animate-pulse w-3/4" />
                <div className="flex gap-1">
                  <div className="h-5 w-12 bg-gray-200 rounded animate-pulse" />
                  <div className="h-5 w-16 bg-gray-200 rounded animate-pulse" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : templates.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">
            {searchQuery || selectedCategory !== "all"
              ? "No templates found matching your criteria"
              : "No templates available"}
          </p>
          {!searchQuery && selectedCategory === "all" && (
            <Button onClick={handleSeedTemplates} disabled={seeding}>
              {seeding ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Seeding Templates...
                </>
              ) : (
                "Seed Sample Templates"
              )}
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {templates.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              onPreview={setPreviewTemplate}
              onUseTemplate={handleUseTemplate}
            />
          ))}
        </div>
      )}

      {/* Preview Modal */}
      <TemplatePreviewModal
        template={previewTemplate}
        open={!!previewTemplate}
        onClose={() => setPreviewTemplate(null)}
        onUseTemplate={handleUseTemplate}
      />
    </div>
  )
}
