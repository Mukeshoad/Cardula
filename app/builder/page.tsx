"use client"

import { EditorPanel } from "@/components/builder/editor-panel"
import { PreviewPanel } from "@/components/builder/preview-panel"
import { BuilderHeader } from "@/components/builder/builder-header"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { useEffect, useState } from "react"
import { useBuilderStore } from "@/lib/builder-store"
import { useSiteStore } from "@/lib/site-store"
import { useSearchParams } from "next/navigation"
import { toast } from "sonner"

export default function WebsiteBuilder() {
  const { loadSite, currentSite } = useBuilderStore()
  const { getSiteById } = useSiteStore()
  const searchParams = useSearchParams()
  const siteId = searchParams.get("siteId")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const initializeBuilder = () => {
      setIsLoading(true)

      if (siteId) {
        const site = getSiteById(siteId)
        if (site) {
          loadSite(site)
          console.log("[v0] Loaded site:", site.name)
        } else {
          toast.error("Site not found")
          console.error("[v0] Site not found with ID:", siteId)
        }
      } else {
        const blankSite = {
          id: "temp",
          name: "New Site",
          description: "",
          template: "blank",
          createdAt: new Date(),
          updatedAt: new Date(),
          isPublished: false,
          blocks: [],
          analytics: { views: 0, visitors: 0, conversionRate: 0 },
          status: "draft" as const,
        }
        loadSite(blankSite)
        console.log("[v0] Initialized blank site")
      }

      setIsLoading(false)
    }

    initializeBuilder()
  }, [siteId, getSiteById, loadSite])

  if (isLoading) {
    return (
      <ProtectedRoute>
        <div className="h-screen flex items-center justify-center bg-background">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Loading builder...</p>
          </div>
        </div>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute>
      <div className="h-screen flex flex-col bg-background">
        <BuilderHeader />

        <div className="flex-1 flex overflow-hidden">
          <div className="w-80 border-r border-border bg-sidebar shadow-lg">
            <EditorPanel />
          </div>

          <div className="flex-1 bg-muted/10">
            <PreviewPanel />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
