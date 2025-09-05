"use client"

import { ProtectedRoute } from "@/components/auth/protected-route"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { SiteGrid } from "@/components/dashboard/site-grid"
import { CreateSiteModal } from "@/components/dashboard/create-site-modal"
import { useSiteStore } from "@/lib/site-store"
import { useState } from "react"

export default function DashboardPage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const { sites } = useSiteStore()

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <DashboardSidebar />
        <div className="lg:pl-64">
          <DashboardHeader onCreateSite={() => setIsCreateModalOpen(true)} />
          <main className="p-6">
            <div className="max-w-7xl mx-auto">
              <div className="mb-8">
                <h1 className="text-3xl font-display font-bold text-foreground mb-2">Your Websites</h1>
                <p className="text-muted-foreground">Manage and create your websites from one place</p>
              </div>

              <SiteGrid sites={sites} onCreateSite={() => setIsCreateModalOpen(true)} />
            </div>
          </main>
        </div>

        <CreateSiteModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />
      </div>
    </ProtectedRoute>
  )
}
