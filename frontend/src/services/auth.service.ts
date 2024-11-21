import { api } from "../api/api"

export type User = {
  id: number
  name: string
  email: string
}

export type LoginRequest = {
  email: string
  password: string
}

export type LoginResponse = {
  token: string
  user: User
}

class AuthService {
  async login(email: string, password: string) {
    const response = await api.post<LoginResponse>("/auth/login", { email, password })
    console.log(response)
    return response.data
  }
}

export default new AuthService()
