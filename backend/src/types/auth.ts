export interface User {
  id: string
  email: string
  name?: string
  avatar?: string
  createdAt: Date
  updatedAt: Date
}

export interface AuthTokens {
  accessToken: string
  refreshToken?: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface SignupRequest {
  email: string
  password: string
  name?: string
}

export interface AuthResponse {
  user: User
  tokens: AuthTokens
}

export interface JwtPayload {
  userId: string
  email: string
  iat?: number
  exp?: number
}
