"use client"

import { ProtectedRoute } from "@/components/auth/protected-route"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useSiteStore } from "@/lib/site-store"
import { BarChart3, Eye, Users, Globe, TrendingUp, Clock } from "lucide-react"

export default function AnalyticsPage() {
  const { sites } = useSiteStore()

  // Mock analytics data
  const totalViews = sites.reduce((acc, site) => acc + (site.analytics?.views || 0), 0)
  const totalVisitors = sites.reduce((acc, site) => acc + (site.analytics?.visitors || 0), 0)
  const avgBounceRate =
    sites.length > 0 ? sites.reduce((acc, site) => acc + (site.analytics?.bounceRate || 0), 0) / sites.length : 0

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <DashboardSidebar />
        <div className="lg:pl-64">
          <DashboardHeader />
          <main className="p-6">
            <div className="max-w-7xl mx-auto">
              <div className="mb-8">
                <h1 className="text-3xl font-display font-bold text-foreground mb-2">Analytics</h1>
                <p className="text-muted-foreground">Track your website performance and visitor insights</p>
              </div>

              {/* Overview Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Views</CardTitle>
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{totalViews.toLocaleString()}</div>
                    <p className="text-xs text-muted-foreground">
                      <TrendingUp className="inline h-3 w-3 mr-1" />
                      +12% from last month
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Unique Visitors</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{totalVisitors.toLocaleString()}</div>
                    <p className="text-xs text-muted-foreground">
                      <TrendingUp className="inline h-3 w-3 mr-1" />
                      +8% from last month
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Sites</CardTitle>
                    <Globe className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{sites.filter((s) => s.status === "published").length}</div>
                    <p className="text-xs text-muted-foreground">{sites.length} total sites</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Avg. Bounce Rate</CardTitle>
                    <BarChart3 className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{avgBounceRate.toFixed(1)}%</div>
                    <p className="text-xs text-muted-foreground">-2.1% from last month</p>
                  </CardContent>
                </Card>
              </div>

              {/* Site Performance */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Site Performance</CardTitle>
                    <CardDescription>Individual site analytics breakdown</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {sites.map((site) => (
                        <div key={site.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <h4 className="font-medium">{site.name}</h4>
                            <p className="text-sm text-muted-foreground">{site.url}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">{site.analytics?.views || 0} views</p>
                            <p className="text-sm text-muted-foreground">{site.analytics?.visitors || 0} visitors</p>
                          </div>
                        </div>
                      ))}
                      {sites.length === 0 && (
                        <div className="text-center py-8 text-muted-foreground">
                          <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                          <p>No sites to analyze yet</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Latest visitor interactions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { action: "Page view", site: "Portfolio Site", time: "2 minutes ago" },
                        { action: "Form submission", site: "Business Site", time: "15 minutes ago" },
                        { action: "Page view", site: "Portfolio Site", time: "1 hour ago" },
                        { action: "Button click", site: "Landing Page", time: "2 hours ago" },
                      ].map((activity, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <div className="flex-1">
                            <p className="font-medium">{activity.action}</p>
                            <p className="text-sm text-muted-foreground">{activity.site}</p>
                          </div>
                          <p className="text-sm text-muted-foreground">{activity.time}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}
