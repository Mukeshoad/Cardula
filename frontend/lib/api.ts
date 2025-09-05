import axios from "axios"
import { authService } from "./auth"

const API_BASE_URL = process.env.NODE_ENV === "development" ? "http://localhost:3001/api" : "/api"

// Create axios instance with interceptors
const api = axios.create({
  baseURL: API_BASE_URL,
})

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = authService.getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      authService.logout()
      window.location.href = "/login"
    }
    return Promise.reject(error)
  },
)

export interface Template {
  id: string
  title: string
  description?: string
  thumbnail: string
  tags: string[]
  category: string
  createdAt: string
  content?: any[]
  styles?: any
}

export interface TemplatesResponse {
  templates: Template[]
  pagination: {
    total: number
    limit: number
    offset: number
    hasMore: boolean
  }
}

export interface Category {
  name: string
  count: number
}

export const templatesApi = {
  async getTemplates(params?: {
    category?: string
    search?: string
    limit?: number
    offset?: number
  }): Promise<TemplatesResponse> {
    const response = await api.get("/templates", { params })
    return response.data
  },

  async getTemplate(id: string): Promise<Template> {
    const response = await api.get(`/templates/${id}`)
    return response.data.template
  },

  async getCategories(): Promise<Category[]> {
    const response = await api.get("/templates/categories")
    return response.data.categories
  },

  async seedTemplates(): Promise<void> {
    await api.post("/templates/seed")
  },
}

export default api
