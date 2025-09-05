"use client"

import { cn } from "@/lib/utils"
import { Home, Settings, BarChart3, HelpCircle, Globe, BookTemplate as Template, Zap } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Badge } from "@/components/ui/badge"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home, badge: null },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3, badge: "New" },
  { name: "Templates", href: "/templates", icon: Template, badge: "500+" },
  { name: "Settings", href: "/dashboard/settings", icon: Settings, badge: null },
  { name: "Help", href: "/dashboard/help", icon: HelpCircle, badge: null },
]

const quickActions = [
  { name: "Builder", href: "/builder", icon: Zap, description: "Create new site" },
  { name: "Live Sites", href: "/dashboard/sites", icon: Globe, description: "View published" },
]

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
      <div className="flex grow flex-col gap-y-6 overflow-y-auto bg-background/80 backdrop-blur-xl border-r border-border/40 px-6 py-6">
        <div className="flex h-16 shrink-0 items-center">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
              <span className="text-primary-foreground font-display font-bold text-xl">S</span>
            </div>
            <span className="text-2xl font-display font-bold text-foreground">SiteForge</span>
          </Link>
        </div>

        <nav className="flex flex-1 flex-col gap-y-8">
          <div>
            <h3 className="text-xs font-semibold text-foreground/60 uppercase tracking-wider mb-3">Navigation</h3>
            <ul role="list" className="space-y-2">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={cn(
                      pathname === item.href
                        ? "bg-gradient-to-r from-primary/10 to-accent/10 text-primary border-r-2 border-primary"
                        : "text-foreground/70 hover:text-foreground hover:bg-secondary/30",
                      "group flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200",
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="h-5 w-5 shrink-0" />
                      {item.name}
                    </div>
                    {item.badge && (
                      <Badge variant={pathname === item.href ? "default" : "secondary"} className="text-xs px-2 py-0.5">
                        {item.badge}
                      </Badge>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-foreground/60 uppercase tracking-wider mb-3">Quick Actions</h3>
            <ul role="list" className="space-y-2">
              {quickActions.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-secondary/30 transition-all duration-200"
                  >
                    <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <item.icon className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-xs text-foreground/50">{item.description}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-auto">
            <div className="rounded-xl bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10 p-4 border border-primary/20">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                  <Zap className="h-4 w-4 text-primary-foreground" />
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">Upgrade to Pro</p>
                  <p className="text-xs text-foreground/60">Unlock advanced features</p>
                </div>
              </div>
              <Link
                href="/upgrade"
                className="block w-full text-center bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-medium py-2 rounded-lg transition-colors"
              >
                Upgrade Now
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </div>
  )
}
