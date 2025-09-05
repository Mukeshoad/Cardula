import type { Response } from "express"
import { PrismaClient } from "@prisma/client"
import { body, validationResult } from "express-validator"
import type { AuthRequest } from "../middleware/auth"

const prisma = new PrismaClient()

export const createProjectValidation = [
  body("title")
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage("Title is required and must be less than 100 characters"),
  body("slug")
    .optional()
    .trim()
    .isLength({ min: 1, max: 50 })
    .matches(/^[a-z0-9-]+$/)
    .withMessage("Slug must contain only lowercase letters, numbers, and hyphens"),
  body("templateId").optional().isString(),
  body("content").optional().isArray(),
  body("styles").optional().isObject(),
]

export const updateProjectValidation = [
  body("title").optional().trim().isLength({ min: 1, max: 100 }),
  body("content").optional().isArray(),
  body("styles").optional().isObject(),
  body("seoTitle").optional().trim().isLength({ max: 60 }),
  body("seoDescription").optional().trim().isLength({ max: 160 }),
  body("customCss").optional().isString(),
]

const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim()
}

export const createProject = async (req: AuthRequest, res: Response) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: "Validation failed",
        details: errors.array(),
      })
    }

    const userId = req.user!.id
    const { title, slug, templateId, content, styles } = req.body

    // Generate slug if not provided
    let projectSlug = slug || generateSlug(title)

    // Ensure slug is unique
    let counter = 1
    const originalSlug = projectSlug
    while (await prisma.project.findUnique({ where: { slug: projectSlug } })) {
      projectSlug = `${originalSlug}-${counter}`
      counter++
    }

    // Get template content if templateId provided
    let projectContent = content || []
    let projectStyles = styles || {}

    if (templateId) {
      const template = await prisma.template.findUnique({
        where: { id: templateId },
        select: { content: true, styles: true },
      })

      if (template) {
        projectContent = template.content as any[]
        projectStyles = template.styles as any
      }
    }

    const project = await prisma.project.create({
      data: {
        title,
        slug: projectSlug,
        content: projectContent,
        styles: projectStyles,
        templateId,
        userId,
      },
      select: {
        id: true,
        title: true,
        slug: true,
        content: true,
        styles: true,
        seoTitle: true,
        seoDescription: true,
        customCss: true,
        isPublished: true,
        publishedUrl: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    res.status(201).json({ project })
  } catch (error) {
    console.error("Create project error:", error)
    res.status(500).json({ error: "Failed to create project" })
  }
}

export const getProjects = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id
    const { limit = "20", offset = "0" } = req.query

    const projects = await prisma.project.findMany({
      where: { userId },
      select: {
        id: true,
        title: true,
        slug: true,
        isPublished: true,
        publishedUrl: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: { updatedAt: "desc" },
      take: Number.parseInt(limit as string),
      skip: Number.parseInt(offset as string),
    })

    const total = await prisma.project.count({ where: { userId } })

    res.json({
      projects,
      pagination: {
        total,
        limit: Number.parseInt(limit as string),
        offset: Number.parseInt(offset as string),
        hasMore: total > Number.parseInt(offset as string) + Number.parseInt(limit as string),
      },
    })
  } catch (error) {
    console.error("Get projects error:", error)
    res.status(500).json({ error: "Failed to fetch projects" })
  }
}

export const getProject = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params
    const userId = req.user!.id

    const project = await prisma.project.findFirst({
      where: {
        id,
        userId,
      },
      select: {
        id: true,
        title: true,
        slug: true,
        description: true,
        content: true,
        styles: true,
        seoTitle: true,
        seoDescription: true,
        favicon: true,
        customCss: true,
        isPublished: true,
        publishedUrl: true,
        templateId: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    if (!project) {
      return res.status(404).json({ error: "Project not found" })
    }

    res.json({ project })
  } catch (error) {
    console.error("Get project error:", error)
    res.status(500).json({ error: "Failed to fetch project" })
  }
}

export const updateProject = async (req: AuthRequest, res: Response) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: "Validation failed",
        details: errors.array(),
      })
    }

    const { id } = req.params
    const userId = req.user!.id

    // Verify project ownership
    const existingProject = await prisma.project.findFirst({
      where: { id, userId },
    })

    if (!existingProject) {
      return res.status(404).json({ error: "Project not found" })
    }

    const updateData = { ...req.body }
    delete updateData.id
    delete updateData.userId

    const project = await prisma.project.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        title: true,
        slug: true,
        description: true,
        content: true,
        styles: true,
        seoTitle: true,
        seoDescription: true,
        favicon: true,
        customCss: true,
        isPublished: true,
        publishedUrl: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    res.json({ project })
  } catch (error) {
    console.error("Update project error:", error)
    res.status(500).json({ error: "Failed to update project" })
  }
}

export const deleteProject = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params
    const userId = req.user!.id

    // Verify project ownership
    const existingProject = await prisma.project.findFirst({
      where: { id, userId },
    })

    if (!existingProject) {
      return res.status(404).json({ error: "Project not found" })
    }

    await prisma.project.delete({
      where: { id },
    })

    res.json({ message: "Project deleted successfully" })
  } catch (error) {
    console.error("Delete project error:", error)
    res.status(500).json({ error: "Failed to delete project" })
  }
}

export const duplicateProject = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params
    const userId = req.user!.id

    // Get original project
    const originalProject = await prisma.project.findFirst({
      where: { id, userId },
    })

    if (!originalProject) {
      return res.status(404).json({ error: "Project not found" })
    }

    // Generate new slug
    let newSlug = `${originalProject.slug}-copy`
    let counter = 1
    while (await prisma.project.findUnique({ where: { slug: newSlug } })) {
      newSlug = `${originalProject.slug}-copy-${counter}`
      counter++
    }

    // Create duplicate
    const duplicatedProject = await prisma.project.create({
      data: {
        title: `${originalProject.title} - Copy`,
        slug: newSlug,
        description: originalProject.description,
        content: originalProject.content,
        styles: originalProject.styles,
        seoTitle: originalProject.seoTitle,
        seoDescription: originalProject.seoDescription,
        customCss: originalProject.customCss,
        templateId: originalProject.templateId,
        userId,
      },
      select: {
        id: true,
        title: true,
        slug: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    res.status(201).json({ project: duplicatedProject })
  } catch (error) {
    console.error("Duplicate project error:", error)
    res.status(500).json({ error: "Failed to duplicate project" })
  }
}
