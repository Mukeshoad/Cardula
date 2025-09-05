"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { PublishModal } from "@/components/publishing/publish-modal"
import { Save, Undo, Redo, Monitor, Tablet, Smartphone, Eye, Globe } from "lucide-react"

interface EditorToolbarProps {
  projectId: string
  projectTitle: string
  onSave: () => void
  onUndo: () => void
  onRedo: () => void
  canUndo: boolean
  canRedo: boolean
  saving: boolean
  viewportMode: "desktop" | "tablet" | "mobile"
  onViewportChange: (mode: "desktop" | "tablet" | "mobile") => void
}

export function EditorToolbar({
  projectId,
  projectTitle,
  onSave,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
  saving,
  viewportMode,
  onViewportChange,
}: EditorToolbarProps) {
  const [publishModalOpen, setPublishModalOpen] = useState(false)

  return (
    <>
      <div className="bg-white border-b px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={onUndo} disabled={!canUndo}>
              <Undo className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={onRedo} disabled={!canRedo}>
              <Redo className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Viewport Controls */}
          <div className="flex items-center border rounded-md">
            <Button
              variant={viewportMode === "desktop" ? "default" : "ghost"}
              size="sm"
              onClick={() => onViewportChange("desktop")}
            >
              <Monitor className="w-4 h-4" />
            </Button>
            <Button
              variant={viewportMode === "tablet" ? "default" : "ghost"}
              size="sm"
              onClick={() => onViewportChange("tablet")}
            >
              <Tablet className="w-4 h-4" />
            </Button>
            <Button
              variant={viewportMode === "mobile" ? "default" : "ghost"}
              size="sm"
              onClick={() => onViewportChange("mobile")}
            >
              <Smartphone className="w-4 h-4" />
            </Button>
          </div>

          <Button variant="outline" size="sm">
            <Eye className="w-4 h-4 mr-1" />
            Preview
          </Button>

          <Button variant="outline" size="sm" onClick={onSave} disabled={saving}>
            <Save className="w-4 h-4 mr-1" />
            {saving ? "Saving..." : "Save"}
          </Button>

          <Button size="sm" onClick={() => setPublishModalOpen(true)}>
            <Globe className="w-4 h-4 mr-1" />
            Publish
          </Button>
        </div>
      </div>

      <PublishModal
        projectId={projectId}
        projectTitle={projectTitle}
        open={publishModalOpen}
        onClose={() => setPublishModalOpen(false)}
      />
    </>
  )
}
