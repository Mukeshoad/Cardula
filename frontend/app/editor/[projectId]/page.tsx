"use client"

import { useState, useEffect, useCallback } from "react"
import { useParams, useRouter } from "next/navigation"
import { projectsApi, type Project, type Block } from "@/lib/projects"
import { templatesApi } from "@/lib/api"
import { BlocksPanel } from "@/components/editor/blocks-panel"
import { EditorCanvas } from "@/components/editor/editor-canvas"
import { PropertiesPanel } from "@/components/editor/properties-panel"
import { EditorToolbar } from "@/components/editor/editor-toolbar"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { blockDefinitions, type BlockType } from "@/components/editor/block-types"
import { useAuth } from "../components/auth/auth-provider"

export default function EditorPage() {
  const params = useParams()
  const router = useRouter()
  const { isAuthenticated } = useAuth()
  const projectId = params.projectId as string

  const [project, setProject] = useState<Project | null>(null)
  const [blocks, setBlocks] = useState<Block[]>([])
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [autoSave, setAutoSave] = useState(true)
  const [viewportMode, setViewportMode] = useState<"desktop" | "tablet" | "mobile">("desktop")
  const [history, setHistory] = useState<Block[][]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)

  // Load project
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
      return
    }

    const loadProject = async () => {
      try {
        setLoading(true)

        if (projectId === "new") {
          // Create new project
          const urlParams = new URLSearchParams(window.location.search)
          const templateId = urlParams.get("template")

          let projectData: any = {
            title: "Untitled Project",
          }

          if (templateId) {
            try {
              const template = await templatesApi.getTemplate(templateId)
              projectData = {
                title: `${template.title} - Copy`,
                templateId: template.id,
                content: template.content || [],
                styles: template.styles || {},
              }
            } catch (error) {
              console.error("Failed to load template:", error)
              toast.error("Failed to load template")
            }
          }

          const newProject = await projectsApi.createProject(projectData)
          setProject(newProject)
          setBlocks(newProject.content || [])

          // Replace URL without template param
          router.replace(`/editor/${newProject.id}`)
        } else {
          // Load existing project
          const existingProject = await projectsApi.getProject(projectId)
          setProject(existingProject)
          setBlocks(existingProject.content || [])
        }
      } catch (error) {
        console.error("Failed to load project:", error)
        toast.error("Failed to load project")
        router.push("/dashboard")
      } finally {
        setLoading(false)
      }
    }

    loadProject()
  }, [projectId, isAuthenticated, router])

  // Auto-save functionality
  useEffect(() => {
    if (!project || !autoSave || saving) return

    const saveTimeout = setTimeout(() => {
      handleSave()
    }, 2000)

    return () => clearTimeout(saveTimeout)
  }, [blocks, project, autoSave, saving])

  // Add to history when blocks change
  const addToHistory = useCallback(
    (newBlocks: Block[]) => {
      setHistory((prev) => {
        const newHistory = prev.slice(0, historyIndex + 1)
        newHistory.push([...newBlocks])
        return newHistory.slice(-50) // Keep last 50 states
      })
      setHistoryIndex((prev) => prev + 1)
    },
    [historyIndex],
  )

  const handleSave = async () => {
    if (!project || saving) return

    try {
      setSaving(true)
      await projectsApi.updateProject(project.id, {
        content: blocks,
        title: project.title,
      })

      if (!autoSave) {
        toast.success("Project saved successfully")
      }
    } catch (error) {
      console.error("Failed to save project:", error)
      toast.error("Failed to save project")
    } finally {
      setSaving(false)
    }
  }

  const handleAddBlock = (type: BlockType) => {
    const definition = blockDefinitions[type]
    const newBlock: Block = {
      id: `block-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type,
      props: { ...definition.defaultProps },
    }

    const newBlocks = [...blocks, newBlock]
    addToHistory(blocks)
    setBlocks(newBlocks)
    setSelectedBlockId(newBlock.id)
  }

  const handleUpdateBlock = (blockId: string, props: Record<string, any>) => {
    const newBlocks = blocks.map((block) => (block.id === blockId ? { ...block, props } : block))
    setBlocks(newBlocks)
  }

  const handleDeleteBlock = (blockId: string) => {
    const newBlocks = blocks.filter((block) => block.id !== blockId)
    addToHistory(blocks)
    setBlocks(newBlocks)
    setSelectedBlockId(null)
  }

  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1)
      setBlocks([...history[historyIndex - 1]])
      setSelectedBlockId(null)
    }
  }

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1)
      setBlocks([...history[historyIndex + 1]])
      setSelectedBlockId(null)
    }
  }

  const selectedBlock = blocks.find((block) => block.id === selectedBlockId) || null

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p>Loading editor...</p>
        </div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p>Project not found</p>
      </div>
    )
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Project Title */}
      <div className="bg-white border-b px-4 py-2">
        <Input
          value={project.title}
          onChange={(e) => setProject({ ...project, title: e.target.value })}
          className="font-semibold border-none shadow-none text-lg w-64"
        />
      </div>

      {/* Toolbar */}
      <EditorToolbar
        projectId={project.id}
        projectTitle={project.title}
        onSave={handleSave}
        onUndo={handleUndo}
        onRedo={handleRedo}
        canUndo={historyIndex > 0}
        canRedo={historyIndex < history.length - 1}
        saving={saving}
        viewportMode={viewportMode}
        onViewportChange={setViewportMode}
      />

      {/* Main Editor Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Blocks */}
        <div className="w-64 bg-white border-r">
          <BlocksPanel onAddBlock={handleAddBlock} />
        </div>

        {/* Center - Canvas */}
        <div className="flex-1 p-4">
          <div
            className={`mx-auto bg-white rounded-lg shadow-sm transition-all duration-300 ${
              viewportMode === "desktop" ? "max-w-none" : viewportMode === "tablet" ? "max-w-2xl" : "max-w-sm"
            }`}
            style={{ height: "calc(100vh - 160px)" }}
          >
            <EditorCanvas
              blocks={blocks}
              selectedBlockId={selectedBlockId}
              onSelectBlock={setSelectedBlockId}
              onReorderBlocks={setBlocks}
            />
          </div>
        </div>

        {/* Right Panel - Properties */}
        <div className="w-80 bg-white border-l">
          <PropertiesPanel
            selectedBlock={selectedBlock}
            onUpdateBlock={handleUpdateBlock}
            onDeleteBlock={handleDeleteBlock}
          />
        </div>
      </div>
    </div>
  )
}
