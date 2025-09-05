"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useSiteStore, type Site } from "@/lib/site-store"
import {
  Plus,
  ExternalLink,
  Edit,
  Trash2,
  Eye,
  Users,
  TrendingUp,
  Globe,
  Copy,
  MoreVertical,
  Download,
  Archive,
  Settings,
  Locate as Duplicate,
} from "lucide-react"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { useState } from "react"
import { toast } from "sonner"

interface SiteGridProps {
  sites: Site[]
  onCreateSite: () => void
}

export function SiteGrid({ sites, onCreateSite }: SiteGridProps) {
  const { deleteSite, updateSite, createSite } = useSiteStore()
  const [publishingId, setPublishingId] = useState<string | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [duplicateDialogOpen, setDuplicateDialogOpen] = useState(false)
  const [seoDialogOpen, setSeoDialogOpen] = useState(false)
  const [selectedSite, setSelectedSite] = useState<Site | null>(null)
  const [duplicateName, setDuplicateName] = useState("")
  const [seoSettings, setSeoSettings] = useState({
    title: "",
    description: "",
    keywords: "",
    customDomain: "",
  })

  const handlePublish = async (site: Site) => {
    setPublishingId(site.id)

    try {
      const response = await fetch("/api/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          siteId: site.id,
          siteName: site.name,
          blocks: site.blocks || [],
        }),
      })

      const result = await response.json()

      if (result.success) {
        updateSite(site.id, {
          isPublished: true,
          url: result.url,
        })
        toast.success(`Site published successfully! Available at ${result.url}`)
      } else {
        toast.error(result.error || "Failed to publish site")
      }
    } catch (error) {
      toast.error("Failed to publish site")
      console.error("Publish error:", error)
    } finally {
      setPublishingId(null)
    }
  }

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url)
    toast.success("URL copied to clipboard!")
  }

  const handleDuplicate = (site: Site) => {
    setSelectedSite(site)
    setDuplicateName(`${site.name} (Copy)`)
    setDuplicateDialogOpen(true)
  }

  const confirmDuplicate = () => {
    if (!selectedSite || !duplicateName.trim()) return

    const duplicatedSite = {
      name: duplicateName.trim(),
      description: selectedSite.description,
      template: selectedSite.template,
      isPublished: false,
      blocks: selectedSite.blocks || [],
    }

    createSite(duplicatedSite)
    setDuplicateDialogOpen(false)
    setSelectedSite(null)
    setDuplicateName("")
    toast.success("Site duplicated successfully!")
  }

  const handleArchive = (site: Site) => {
    updateSite(site.id, { isArchived: true })
    toast.success("Site archived successfully!")
  }

  const handleExport = async (site: Site) => {
    try {
      const exportData = {
        name: site.name,
        description: site.description,
        blocks: site.blocks,
        createdAt: site.createdAt,
        updatedAt: site.updatedAt,
      }

      const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `${site.name.replace(/[^a-z0-9]/gi, "_").toLowerCase()}_export.json`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      toast.success("Site exported successfully!")
    } catch (error) {
      toast.error("Failed to export site")
    }
  }

  const handleSeoSettings = (site: Site) => {
    setSelectedSite(site)
    setSeoSettings({
      title: site.seoTitle || site.name,
      description: site.seoDescription || site.description || "",
      keywords: site.seoKeywords || "",
      customDomain: site.customDomain || "",
    })
    setSeoDialogOpen(true)
  }

  const saveSeoSettings = () => {
    if (!selectedSite) return

    updateSite(selectedSite.id, {
      seoTitle: seoSettings.title,
      seoDescription: seoSettings.description,
      seoKeywords: seoSettings.keywords,
      customDomain: seoSettings.customDomain,
    })

    setSeoDialogOpen(false)
    setSelectedSite(null)
    toast.success("SEO settings saved successfully!")
  }

  const confirmDelete = (site: Site) => {
    setSelectedSite(site)
    setDeleteDialogOpen(true)
  }

  const handleDelete = () => {
    if (!selectedSite) return
    deleteSite(selectedSite.id)
    setDeleteDialogOpen(false)
    setSelectedSite(null)
    toast.success("Site deleted successfully!")
  }

  if (sites.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
          <Plus className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-display font-semibold text-foreground mb-2">No websites yet</h3>
        <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
          Get started by creating your first website. Choose from our templates or start from scratch.
        </p>
        <Button onClick={onCreateSite} className="bg-primary hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          Create Your First Site
        </Button>
      </div>
    )
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sites.map((site) => (
          <Card key={site.id} className="bg-card border-border hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-display font-semibold text-card-foreground mb-1">{site.name}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{site.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={site.isPublished ? "default" : "secondary"}>
                    {site.isPublished ? "Live" : "Draft"}
                  </Badge>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem onClick={() => handleDuplicate(site)}>
                        <Duplicate className="h-4 w-4 mr-2" />
                        Duplicate Site
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleSeoSettings(site)}>
                        <Settings className="h-4 w-4 mr-2" />
                        SEO Settings
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleExport(site)}>
                        <Download className="h-4 w-4 mr-2" />
                        Export Site
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleArchive(site)}>
                        <Archive className="h-4 w-4 mr-2" />
                        Archive Site
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => confirmDelete(site)}
                        className="text-destructive focus:text-destructive"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Site
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardHeader>

            <CardContent className="pb-3">
              {site.isPublished && site.url && (
                <div className="mb-4 p-2 bg-muted/50 rounded-md">
                  <div className="flex items-center gap-2">
                    <Globe className="w-3 h-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground truncate flex-1">{site.url}</span>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => handleCopyUrl(site.url!)}>
                      <Copy className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="flex items-center justify-center mb-1">
                    <Eye className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div className="text-sm font-medium text-foreground">{site.analytics.views}</div>
                  <div className="text-xs text-muted-foreground">Views</div>
                </div>
                <div>
                  <div className="flex items-center justify-center mb-1">
                    <Users className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div className="text-sm font-medium text-foreground">{site.analytics.visitors}</div>
                  <div className="text-xs text-muted-foreground">Visitors</div>
                </div>
                <div>
                  <div className="flex items-center justify-center mb-1">
                    <TrendingUp className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div className="text-sm font-medium text-foreground">{site.analytics.conversionRate}%</div>
                  <div className="text-xs text-muted-foreground">CVR</div>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-border">
                <p className="text-xs text-muted-foreground">
                  Updated {formatDistanceToNow(new Date(site.updatedAt), { addSuffix: true })}
                </p>
              </div>
            </CardContent>

            <CardFooter className="pt-0">
              <div className="flex gap-2 w-full">
                <Button asChild variant="outline" size="sm" className="flex-1 bg-transparent">
                  <Link href={`/builder?siteId=${site.id}`}>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Link>
                </Button>

                {site.isPublished && site.url ? (
                  <Button asChild variant="outline" size="sm">
                    <a href={site.url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePublish(site)}
                    disabled={publishingId === site.id}
                    className="bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    {publishingId === site.id ? (
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Globe className="w-4 h-4" />
                    )}
                  </Button>
                )}
              </div>
            </CardFooter>
          </Card>
        ))}

        <Card
          className="bg-muted/50 border-dashed border-2 border-border hover:bg-muted/70 transition-colors cursor-pointer"
          onClick={onCreateSite}
        >
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Plus className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-display font-semibold text-foreground mb-2">Create New Site</h3>
            <p className="text-sm text-muted-foreground text-center">Start building your next website</p>
          </CardContent>
        </Card>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Site</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{selectedSite?.name}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete Site
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Duplicate Site Dialog */}
      <Dialog open={duplicateDialogOpen} onOpenChange={setDuplicateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Duplicate Site</DialogTitle>
            <DialogDescription>Create a copy of "{selectedSite?.name}" with a new name.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="duplicate-name">Site Name</Label>
              <Input
                id="duplicate-name"
                value={duplicateName}
                onChange={(e) => setDuplicateName(e.target.value)}
                placeholder="Enter new site name"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDuplicateDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={confirmDuplicate} disabled={!duplicateName.trim()}>
              Duplicate Site
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* SEO Settings Dialog */}
      <Dialog open={seoDialogOpen} onOpenChange={setSeoDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>SEO Settings</DialogTitle>
            <DialogDescription>Configure SEO and domain settings for "{selectedSite?.name}".</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="seo-title">SEO Title</Label>
              <Input
                id="seo-title"
                value={seoSettings.title}
                onChange={(e) => setSeoSettings((prev) => ({ ...prev, title: e.target.value }))}
                placeholder="Page title for search engines"
              />
            </div>
            <div>
              <Label htmlFor="seo-description">SEO Description</Label>
              <Input
                id="seo-description"
                value={seoSettings.description}
                onChange={(e) => setSeoSettings((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Meta description for search engines"
              />
            </div>
            <div>
              <Label htmlFor="seo-keywords">Keywords</Label>
              <Input
                id="seo-keywords"
                value={seoSettings.keywords}
                onChange={(e) => setSeoSettings((prev) => ({ ...prev, keywords: e.target.value }))}
                placeholder="Comma-separated keywords"
              />
            </div>
            <div>
              <Label htmlFor="custom-domain">Custom Domain</Label>
              <Input
                id="custom-domain"
                value={seoSettings.customDomain}
                onChange={(e) => setSeoSettings((prev) => ({ ...prev, customDomain: e.target.value }))}
                placeholder="yourdomain.com"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSeoDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={saveSeoSettings}>Save Settings</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
