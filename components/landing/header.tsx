"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useAuthStore } from "@/lib/auth-store"
import { LogOut, User, Menu, X } from "lucide-react"
import { useState } from "react"

export function Header() {
  const { user, signOut } = useAuthStore()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
              <span className="text-primary-foreground font-display font-bold text-xl">S</span>
            </div>
            <span className="font-display font-bold text-2xl text-foreground">SiteForge</span>
          </Link>

          <nav className="hidden lg:flex items-center space-x-10">
            <Link
              href="#features"
              className="text-foreground/70 hover:text-foreground font-medium transition-colors duration-200 relative group"
            >
              Features
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full"></span>
            </Link>
            <Link
              href="#pricing"
              className="text-foreground/70 hover:text-foreground font-medium transition-colors duration-200 relative group"
            >
              Pricing
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full"></span>
            </Link>
            <Link
              href="#testimonials"
              className="text-foreground/70 hover:text-foreground font-medium transition-colors duration-200 relative group"
            >
              Reviews
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full"></span>
            </Link>
            <Link
              href="/templates"
              className="text-foreground/70 hover:text-foreground font-medium transition-colors duration-200 relative group"
            >
              Templates
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full"></span>
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <div className="hidden md:flex items-center space-x-3 px-4 py-2 rounded-full bg-secondary/50">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                    <User className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <span className="text-sm font-medium text-foreground">{user.name}</span>
                </div>
                <Button variant="ghost" asChild className="font-medium">
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
                <Button variant="outline" onClick={signOut} className="font-medium bg-transparent">
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" asChild className="font-medium hidden sm:inline-flex">
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button
                  asChild
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 py-2.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <Link href="/signup">Get Started Free</Link>
                </Button>
              </>
            )}

            <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-border/40 py-6">
            <nav className="flex flex-col space-y-4">
              <Link
                href="#features"
                className="text-foreground/70 hover:text-foreground font-medium py-2 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </Link>
              <Link
                href="#pricing"
                className="text-foreground/70 hover:text-foreground font-medium py-2 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link
                href="#testimonials"
                className="text-foreground/70 hover:text-foreground font-medium py-2 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Reviews
              </Link>
              <Link
                href="/templates"
                className="text-foreground/70 hover:text-foreground font-medium py-2 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Templates
              </Link>
              {!user && (
                <div className="pt-4 border-t border-border/40">
                  <Button variant="ghost" asChild className="w-full justify-start font-medium mb-2">
                    <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                      Sign In
                    </Link>
                  </Button>
                  <Button
                    asChild
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                  >
                    <Link href="/signup" onClick={() => setMobileMenuOpen(false)}>
                      Get Started Free
                    </Link>
                  </Button>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
