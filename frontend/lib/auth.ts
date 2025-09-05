import axios from "axios"

const API_BASE_URL = process.env.NODE_ENV === "development" ? "http://localhost:3001/api" : "/api"

export interface User {
  id: string
  email: string
  name?: string
  avatar?: string
  createdAt: string
  updatedAt: string
}

export interface AuthTokens {
  accessToken: string
}

export interface AuthResponse {
  user: User
  tokens: AuthTokens
}

export interface LoginData {
  email: string
  password: string
}

export interface SignupData {
  email: string
  password: string
  name?: string
}

class AuthService {
  private token: string | null = null

  constructor() {
    if (typeof window !== "undefined") {
      this.token = localStorage.getItem("auth_token")
    }
  }

  setToken(token: string) {
    this.token = token
    if (typeof window !== "undefined") {
      localStorage.setItem("auth_token", token)
    }
  }

  getToken(): string | null {
    return this.token
  }

  removeToken() {
    this.token = null
    if (typeof window !== "undefined") {
      localStorage.removeItem("auth_token")
    }
  }

  getAuthHeaders() {
    return this.token ? { Authorization: `Bearer ${this.token}` } : {}
  }

  async signup(data: SignupData): Promise<AuthResponse> {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/signup`, data)
      const authResponse: AuthResponse = response.data
      this.setToken(authResponse.tokens.accessToken)
      return authResponse
    } catch (error: any) {
      throw new Error(error.response?.data?.error || "Signup failed")
    }
  }

  async login(data: LoginData): Promise<AuthResponse> {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, data)
      const authResponse: AuthResponse = response.data
      this.setToken(authResponse.tokens.accessToken)
      return authResponse
    } catch (error: any) {
      throw new Error(error.response?.data?.error || "Login failed")
    }
  }

  async getProfile(): Promise<User> {
    try {
      const response = await axios.get(`${API_BASE_URL}/auth/profile`, {
        headers: this.getAuthHeaders(),
      })
      return response.data.user
    } catch (error: any) {
      if (error.response?.status === 401) {
        this.removeToken()
      }
      throw new Error(error.response?.data?.error || "Failed to get profile")
    }
  }

  logout() {
    this.removeToken()
  }

  isAuthenticated(): boolean {
    return !!this.token
  }
}

export const authService = new AuthService()

export { AuthService }

export { authService as default }
