"use client"

import { Button } from "@/components/ui/button"
import { useBuilderStore } from "@/lib/builder-store"
import { Save, Eye, Globe, ArrowLeft, Settings } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

export function BuilderHeader() {
  const { currentSite, saveSite, publishSite, isPublishing } = useBuilderStore()

  return (
    <header className="bg-background border-b border-border px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button asChild variant="ghost" size="sm">
            <Link href="/dashboard">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Link>
          </Button>

          <div className="h-6 w-px bg-border" />

          <div>
            <h1 className="font-display font-semibold text-foreground">{currentSite?.name || "Untitled Site"}</h1>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant={currentSite?.isPublished ? "default" : "secondary"} className="text-xs">
                {currentSite?.isPublished ? "Published" : "Draft"}
              </Badge>
              <span className="text-xs text-muted-foreground">
                Last saved: {currentSite ? new Date(currentSite.updatedAt).toLocaleTimeString() : "Never"}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={saveSite}>
            <Save className="w-4 h-4 mr-2" />
            Save
          </Button>

          <Button variant="outline" size="sm">
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </Button>

          <Button size="sm" onClick={publishSite} disabled={isPublishing} className="bg-primary hover:bg-primary/90">
            <Globe className="w-4 h-4 mr-2" />
            {isPublishing ? "Publishing..." : "Publish"}
          </Button>

          <Button variant="ghost" size="sm">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </header>
  )
}
