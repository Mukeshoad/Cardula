import type { Request, Response } from "express"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const getTemplates = async (req: Request, res: Response) => {
  try {
    const { category, search, limit = "20", offset = "0" } = req.query

    const where: any = {
      isActive: true,
    }

    if (category && category !== "all") {
      where.category = category
    }

    if (search) {
      where.OR = [
        { title: { contains: search as string, mode: "insensitive" } },
        { description: { contains: search as string, mode: "insensitive" } },
        { tags: { has: search as string } },
      ]
    }

    const templates = await prisma.template.findMany({
      where,
      select: {
        id: true,
        title: true,
        description: true,
        thumbnail: true,
        tags: true,
        category: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
      take: Number.parseInt(limit as string),
      skip: Number.parseInt(offset as string),
    })

    const total = await prisma.template.count({ where })

    res.json({
      templates,
      pagination: {
        total,
        limit: Number.parseInt(limit as string),
        offset: Number.parseInt(offset as string),
        hasMore: total > Number.parseInt(offset as string) + Number.parseInt(limit as string),
      },
    })
  } catch (error) {
    console.error("Get templates error:", error)
    res.status(500).json({ error: "Failed to fetch templates" })
  }
}

export const getTemplate = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const template = await prisma.template.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        description: true,
        thumbnail: true,
        content: true,
        styles: true,
        tags: true,
        category: true,
        createdAt: true,
      },
    })

    if (!template) {
      return res.status(404).json({ error: "Template not found" })
    }

    res.json({ template })
  } catch (error) {
    console.error("Get template error:", error)
    res.status(500).json({ error: "Failed to fetch template" })
  }
}

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await prisma.template.groupBy({
      by: ["category"],
      where: { isActive: true },
      _count: { category: true },
    })

    const formattedCategories = categories.map((cat) => ({
      name: cat.category,
      count: cat._count.category,
    }))

    res.json({ categories: formattedCategories })
  } catch (error) {
    console.error("Get categories error:", error)
    res.status(500).json({ error: "Failed to fetch categories" })
  }
}

// Seed templates (admin only - simplified for demo)
export const seedTemplates = async (req: Request, res: Response) => {
  try {
    const sampleTemplates = [
      {
        title: "Modern Portfolio",
        description: "Clean and professional portfolio template perfect for showcasing your work",
        thumbnail: "/modern-portfolio-website.png",
        content: [
          {
            id: "hero-1",
            type: "hero",
            props: {
              title: "John Doe",
              subtitle: "Full Stack Developer",
              description: "Creating beautiful and functional web experiences",
              buttonText: "View My Work",
              buttonLink: "#portfolio",
              backgroundImage: "/placeholder.svg?height=600&width=1200&query=developer+workspace",
            },
          },
          {
            id: "text-1",
            type: "text",
            props: {
              content:
                "<h2>About Me</h2><p>I'm a passionate developer with 5+ years of experience building web applications.</p>",
            },
          },
        ],
        styles: {
          primaryColor: "#0066FF",
          fontFamily: "Inter",
          spacing: "normal",
        },
        tags: ["portfolio", "professional", "developer"],
        category: "portfolio",
      },
      {
        title: "Business Landing",
        description: "Professional business landing page with call-to-action sections",
        thumbnail: "/business-landing-page.png",
        content: [
          {
            id: "hero-2",
            type: "hero",
            props: {
              title: "Grow Your Business",
              subtitle: "Professional Solutions",
              description: "We help businesses scale with innovative technology solutions",
              buttonText: "Get Started",
              buttonLink: "#contact",
            },
          },
        ],
        styles: {
          primaryColor: "#00C2A8",
          fontFamily: "Inter",
          spacing: "comfortable",
        },
        tags: ["business", "corporate", "landing"],
        category: "business",
      },
      {
        title: "Creative Agency",
        description: "Bold and creative template for design agencies and studios",
        thumbnail: "/creative-agency-website.png",
        content: [
          {
            id: "hero-3",
            type: "hero",
            props: {
              title: "Creative Studio",
              subtitle: "Design & Innovation",
              description: "We create stunning visual experiences that captivate audiences",
              buttonText: "See Our Work",
              buttonLink: "#portfolio",
            },
          },
        ],
        styles: {
          primaryColor: "#FF6B6B",
          fontFamily: "Inter",
          spacing: "tight",
        },
        tags: ["creative", "agency", "design"],
        category: "creative",
      },
      {
        title: "Restaurant Menu",
        description: "Elegant restaurant template with menu showcase and booking",
        thumbnail: "/restaurant-menu-website.jpg",
        content: [
          {
            id: "hero-4",
            type: "hero",
            props: {
              title: "Bella Vista",
              subtitle: "Fine Dining Experience",
              description: "Authentic Italian cuisine in the heart of the city",
              buttonText: "Make Reservation",
              buttonLink: "#booking",
            },
          },
        ],
        styles: {
          primaryColor: "#8B4513",
          fontFamily: "Inter",
          spacing: "normal",
        },
        tags: ["restaurant", "food", "menu"],
        category: "restaurant",
      },
      {
        title: "E-commerce Store",
        description: "Modern online store template with product showcase",
        thumbnail: "/ecommerce-store-website.jpg",
        content: [
          {
            id: "hero-5",
            type: "hero",
            props: {
              title: "Fashion Forward",
              subtitle: "Premium Clothing",
              description: "Discover the latest trends in fashion and style",
              buttonText: "Shop Now",
              buttonLink: "#products",
            },
          },
        ],
        styles: {
          primaryColor: "#000000",
          fontFamily: "Inter",
          spacing: "normal",
        },
        tags: ["ecommerce", "store", "fashion"],
        category: "ecommerce",
      },
      {
        title: "Personal Blog",
        description: "Clean and minimal blog template for writers and content creators",
        thumbnail: "/personal-blog-website.png",
        content: [
          {
            id: "hero-6",
            type: "hero",
            props: {
              title: "My Journey",
              subtitle: "Personal Blog",
              description: "Sharing thoughts, experiences, and insights about life and technology",
              buttonText: "Read Articles",
              buttonLink: "#blog",
            },
          },
        ],
        styles: {
          primaryColor: "#6366F1",
          fontFamily: "Inter",
          spacing: "comfortable",
        },
        tags: ["blog", "personal", "writing"],
        category: "blog",
      },
    ]

    // Clear existing templates (for demo purposes)
    await prisma.template.deleteMany({})

    // Create new templates
    const createdTemplates = await Promise.all(
      sampleTemplates.map((template) =>
        prisma.template.create({
          data: template,
        }),
      ),
    )

    res.json({
      message: "Templates seeded successfully",
      count: createdTemplates.length,
      templates: createdTemplates.map((t) => ({ id: t.id, title: t.title })),
    })
  } catch (error) {
    console.error("Seed templates error:", error)
    res.status(500).json({ error: "Failed to seed templates" })
  }
}
