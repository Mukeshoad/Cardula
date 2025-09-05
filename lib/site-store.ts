import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface Site {
  id: string
  name: string
  description: string
  template: string
  createdAt: Date
  updatedAt: Date
  isPublished: boolean
  url?: string
  blocks: any[]
  analytics: {
    views: number
    visitors: number
    conversionRate: number
    bounceRate?: number
  }
  seoTitle?: string
  seoDescription?: string
  seoKeywords?: string
  customDomain?: string
  isArchived?: boolean
  status?: "draft" | "published" | "archived"
}

interface SiteStore {
  sites: Site[]
  currentSite: Site | null
  createSite: (site: Omit<Site, "id" | "createdAt" | "updatedAt">) => void
  updateSite: (id: string, updates: Partial<Site>) => void
  deleteSite: (id: string) => void
  setCurrentSite: (site: Site | null) => void
  getSiteById: (id: string) => Site | undefined
}

export const useSiteStore = create<SiteStore>()(
  persist(
    (set, get) => ({
      sites: [],
      currentSite: null,

      createSite: (siteData) => {
        const newSite: Site = {
          ...siteData,
          id: crypto.randomUUID(),
          createdAt: new Date(),
          updatedAt: new Date(),
          analytics: {
            views: Math.floor(Math.random() * 1000) + 50,
            visitors: Math.floor(Math.random() * 500) + 25,
            conversionRate: Math.floor(Math.random() * 10) + 1,
            bounceRate: Math.floor(Math.random() * 50) + 25,
          },
          status: "draft",
          isArchived: false,
        }

        set((state) => ({
          sites: [...state.sites, newSite],
        }))
      },

      updateSite: (id, updates) => {
        set((state) => ({
          sites: state.sites.map((site) => (site.id === id ? { ...site, ...updates, updatedAt: new Date() } : site)),
        }))
      },

      deleteSite: (id) => {
        set((state) => ({
          sites: state.sites.filter((site) => site.id !== id),
          currentSite: state.currentSite?.id === id ? null : state.currentSite,
        }))
      },

      setCurrentSite: (site) => {
        set({ currentSite: site })
      },

      getSiteById: (id) => {
        return get().sites.find((site) => site.id === id)
      },
    }),
    {
      name: "site-storage",
    },
  ),
)
