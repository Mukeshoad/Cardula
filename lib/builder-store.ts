import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Site } from "./site-store"
import { useSiteStore } from "./site-store"

export interface Block {
  id: string
  type: "hero" | "text" | "button" | "image" | "video" | "contact" | "spacer" | "columns"
  props: Record<string, any>
  order: number
}

interface BuilderStore {
  blocks: Block[]
  selectedBlockId: string | null
  currentSite: Site | null
  isPublishing: boolean
  previewMode: "desktop" | "tablet" | "mobile"

  // Block management
  addBlock: (type: Block["type"]) => void
  updateBlock: (id: string, props: Partial<Block["props"]>) => void
  deleteBlock: (id: string) => void
  selectBlock: (id: string | null) => void
  reorderBlocks: (startIndex: number, endIndex: number) => void

  // Site management
  loadSite: (site: Site) => void
  saveSite: () => void
  publishSite: () => Promise<void>

  // Preview
  setPreviewMode: (mode: "desktop" | "tablet" | "mobile") => void
}

export const useBuilderStore = create<BuilderStore>()(
  persist(
    (set, get) => ({
      blocks: [],
      selectedBlockId: null,
      currentSite: null,
      isPublishing: false,
      previewMode: "desktop",

      addBlock: (type) => {
        const newBlock: Block = {
          id: crypto.randomUUID(),
          type,
          props: getDefaultProps(type),
          order: get().blocks.length,
        }

        set((state) => ({
          blocks: [...state.blocks, newBlock],
          selectedBlockId: newBlock.id,
        }))
      },

      updateBlock: (id, props) => {
        set((state) => ({
          blocks: state.blocks.map((block) =>
            block.id === id ? { ...block, props: { ...block.props, ...props } } : block,
          ),
        }))
      },

      deleteBlock: (id) => {
        set((state) => ({
          blocks: state.blocks.filter((block) => block.id !== id),
          selectedBlockId: state.selectedBlockId === id ? null : state.selectedBlockId,
        }))
      },

      selectBlock: (id) => {
        set({ selectedBlockId: id })
      },

      reorderBlocks: (startIndex, endIndex) => {
        set((state) => {
          const result = Array.from(state.blocks)
          const [removed] = result.splice(startIndex, 1)
          result.splice(endIndex, 0, removed)

          return {
            blocks: result.map((block, index) => ({ ...block, order: index })),
          }
        })
      },

      loadSite: (site) => {
        set({
          currentSite: site,
          blocks: site.blocks || [],
          selectedBlockId: null,
        })
      },

      saveSite: () => {
        const { currentSite, blocks } = get()
        if (currentSite) {
          const siteStore = useSiteStore.getState()
          siteStore.updateSite(currentSite.id, { blocks })
          console.log("Site saved successfully!")
        }
      },

      publishSite: async () => {
        set({ isPublishing: true })

        try {
          const { blocks, currentSite } = get()

          if (!currentSite) {
            throw new Error("No site loaded")
          }

          const response = await fetch("/api/publish", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              siteId: currentSite.id,
              blocks,
              siteName: currentSite.name,
            }),
          })

          const result = await response.json()

          if (!response.ok) throw new Error(result.error || "Failed to publish")

          const siteStore = useSiteStore.getState()
          siteStore.updateSite(currentSite.id, {
            isPublished: true,
            url: result.url,
            status: "published",
            blocks,
          })

          console.log("Site published successfully!")
          return result
        } catch (error) {
          console.error("Publishing failed:", error)
          throw error
        } finally {
          set({ isPublishing: false })
        }
      },

      setPreviewMode: (mode) => {
        set({ previewMode: mode })
      },
    }),
    {
      name: "builder-storage",
    },
  ),
)

function getDefaultProps(type: Block["type"]): Record<string, any> {
  switch (type) {
    case "hero":
      return {
        title: "Welcome to Our Website",
        subtitle: "Create something amazing with our website builder",
        backgroundImage: "",
        alignment: "center",
        titleSize: "large",
      }
    case "text":
      return {
        content: "Add your text content here. You can customize the font size, alignment, and styling.",
        fontSize: "medium",
        alignment: "left",
        fontWeight: "normal",
      }
    case "button":
      return {
        text: "Click Me",
        variant: "primary",
        size: "medium",
        link: "",
        alignment: "center",
      }
    case "image":
      return {
        src: "/beautiful-landscape.png",
        alt: "Image description",
        caption: "",
        alignment: "center",
        borderRadius: "medium",
      }
    case "video":
      return {
        src: "",
        poster: "/video-thumbnail.png",
        autoplay: false,
        controls: true,
        alignment: "center",
      }
    case "contact":
      return {
        title: "Get In Touch",
        description: "We'd love to hear from you. Send us a message and we'll respond as soon as possible.",
        fields: ["name", "email", "message"],
        submitText: "Send Message",
      }
    case "spacer":
      return {
        height: "medium",
      }
    case "columns":
      return {
        columns: 2,
        gap: "medium",
        content: [
          { type: "text", content: "Column 1 content" },
          { type: "text", content: "Column 2 content" },
        ],
      }
    default:
      return {}
  }
}
