"use client"

import { useState, useEffect } from "react"
import { publishingApi, domainsApi, type PublishJob, type Domain } from "@/lib/publishing"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { Globe, Loader2, CheckCircle, XCircle, Copy, ExternalLink } from "lucide-react"

interface PublishModalProps {
  projectId: string
  projectTitle: string
  open: boolean
  onClose: () => void
}

export function PublishModal({ projectId, projectTitle, open, onClose }: PublishModalProps) {
  const [activeTab, setActiveTab] = useState("subdomain")
  const [publishing, setPublishing] = useState(false)
  const [publishJob, setPublishJob] = useState<PublishJob | null>(null)
  const [domains, setDomains] = useState<Domain[]>([])
  const [newDomain, setNewDomain] = useState("")
  const [addingDomain, setAddingDomain] = useState(false)

  // Load domains
  useEffect(() => {
    if (open) {
      loadDomains()
    }
  }, [open])

  // Poll publish status
  useEffect(() => {
    if (!publishJob || publishJob.status === "COMPLETED" || publishJob.status === "FAILED") {
      return
    }

    const interval = setInterval(async () => {
      try {
        const status = await publishingApi.getPublishStatus(publishJob.jobId)
        setPublishJob(status)

        if (status.status === "COMPLETED") {
          toast.success("Site published successfully!")
        } else if (status.status === "FAILED") {
          toast.error("Publishing failed: " + (status.error || "Unknown error"))
        }
      } catch (error) {
        console.error("Failed to get publish status:", error)
      }
    }, 2000)

    return () => clearInterval(interval)
  }, [publishJob])

  const loadDomains = async () => {
    try {
      const domainsData = await domainsApi.getDomains()
      setDomains(domainsData)
    } catch (error) {
      console.error("Failed to load domains:", error)
    }
  }

  const handlePublish = async () => {
    try {
      setPublishing(true)
      const result = await publishingApi.publishProject(projectId)
      setPublishJob({
        jobId: result.jobId,
        status: "PENDING",
      })
      toast.success("Publishing started...")
    } catch (error: any) {
      console.error("Failed to publish:", error)
      toast.error(error.message || "Failed to start publishing")
    } finally {
      setPublishing(false)
    }
  }

  const handleAddDomain = async () => {
    if (!newDomain.trim()) return

    try {
      setAddingDomain(true)
      const domain = await domainsApi.addDomain(newDomain.trim(), projectId)
      setDomains([domain, ...domains])
      setNewDomain("")
      toast.success("Domain added! Please configure DNS records.")
    } catch (error: any) {
      console.error("Failed to add domain:", error)
      toast.error(error.message || "Failed to add domain")
    } finally {
      setAddingDomain(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success("Copied to clipboard")
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "PENDING":
        return (
          <Badge variant="outline" className="text-yellow-600">
            Pending
          </Badge>
        )
      case "VERIFIED":
      case "COMPLETED":
        return (
          <Badge variant="default" className="bg-green-600">
            Verified
          </Badge>
        )
      case "FAILED":
        return <Badge variant="destructive">Failed</Badge>
      case "PROCESSING":
        return (
          <Badge variant="outline" className="text-blue-600">
            Processing
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5" />
            Publish "{projectTitle}"
          </DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="subdomain">Subdomain</TabsTrigger>
            <TabsTrigger value="custom">Custom Domain</TabsTrigger>
          </TabsList>

          <TabsContent value="subdomain" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Publish to Subdomain</CardTitle>
                <CardDescription>
                  Publish your site to a free subdomain. Your site will be available instantly.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {publishJob && publishJob.status === "COMPLETED" && publishJob.result ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-green-600">
                      <CheckCircle className="w-5 h-5" />
                      <span className="font-medium">Site published successfully!</span>
                    </div>

                    <div className="space-y-2">
                      <Label>Published URL</Label>
                      <div className="flex gap-2">
                        <Input value={publishJob.result.publishedUrl} readOnly className="flex-1" />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard(publishJob.result!.publishedUrl)}
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(publishJob.result!.publishedUrl, "_blank")}
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    {publishJob.qrCode && (
                      <div className="text-center">
                        <Label className="block mb-2">QR Code</Label>
                        <img
                          src={publishJob.qrCode || "/placeholder.svg"}
                          alt="QR Code"
                          className="mx-auto w-32 h-32 border rounded"
                        />
                      </div>
                    )}
                  </div>
                ) : publishJob && (publishJob.status === "PENDING" || publishJob.status === "PROCESSING") ? (
                  <div className="flex items-center gap-2 text-blue-600">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Publishing in progress...</span>
                  </div>
                ) : publishJob && publishJob.status === "FAILED" ? (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-red-600">
                      <XCircle className="w-5 h-5" />
                      <span>Publishing failed</span>
                    </div>
                    {publishJob.error && <p className="text-sm text-red-600">{publishJob.error}</p>}
                  </div>
                ) : (
                  <Button onClick={handlePublish} disabled={publishing} className="w-full">
                    {publishing ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Publishing...
                      </>
                    ) : (
                      "Publish Site"
                    )}
                  </Button>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="custom" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Add Custom Domain</CardTitle>
                <CardDescription>Connect your own domain name to your published site.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="example.com"
                    value={newDomain}
                    onChange={(e) => setNewDomain(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleAddDomain()}
                  />
                  <Button onClick={handleAddDomain} disabled={addingDomain || !newDomain.trim()}>
                    {addingDomain ? <Loader2 className="w-4 h-4 animate-spin" /> : "Add Domain"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {domains.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Your Domains</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {domains.map((domain) => (
                      <div key={domain.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="font-medium">{domain.domain}</div>
                          <div className="text-sm text-muted-foreground">
                            Added {new Date(domain.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusBadge(domain.status)}
                          {domain.sslStatus === "PROVISIONED" && (
                            <Badge variant="outline" className="text-green-600">
                              SSL
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
