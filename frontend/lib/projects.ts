import api from "./api"

export interface Project {
  id: string
  title: string
  slug: string
  description?: string
  content: Block[]
  styles: ProjectStyles
  seoTitle?: string
  seoDescription?: string
  favicon?: string
  customCss?: string
  isPublished: boolean
  publishedUrl?: string
  templateId?: string
  createdAt: string
  updatedAt: string
}

export interface Block {
  id: string
  type: BlockType
  props: Record<string, any>
  styles?: Record<string, any>
}

export type BlockType = "hero" | "text" | "button" | "image" | "form" | "spacer"

export interface ProjectStyles {
  primaryColor?: string
  fontFamily?: string
  spacing?: "tight" | "normal" | "comfortable"
  borderRadius?: "none" | "small" | "medium" | "large"
}

export interface CreateProjectData {
  title: string
  slug?: string
  templateId?: string
  content?: Block[]
  styles?: ProjectStyles
}

export interface UpdateProjectData {
  title?: string
  description?: string
  content?: Block[]
  styles?: ProjectStyles
  seoTitle?: string
  seoDescription?: string
  customCss?: string
}

export const projectsApi = {
  async createProject(data: CreateProjectData): Promise<Project> {
    const response = await api.post("/projects", data)
    return response.data.project
  },

  async getProjects(params?: { limit?: number; offset?: number }): Promise<{
    projects: Project[]
    pagination: { total: number; limit: number; offset: number; hasMore: boolean }
  }> {
    const response = await api.get("/projects", { params })
    return response.data
  },

  async getProject(id: string): Promise<Project> {
    const response = await api.get(`/projects/${id}`)
    return response.data.project
  },

  async updateProject(id: string, data: UpdateProjectData): Promise<Project> {
    const response = await api.put(`/projects/${id}`, data)
    return response.data.project
  },

  async deleteProject(id: string): Promise<void> {
    await api.delete(`/projects/${id}`)
  },

  async duplicateProject(id: string): Promise<Project> {
    const response = await api.post(`/projects/${id}/duplicate`)
    return response.data.project
  },
}
