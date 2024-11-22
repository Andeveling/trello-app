import { api } from "../api/api"

export type UserPayload = {
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
  user: UserPayload
}

class AuthService {
  async login(email: string, password: string) {
    const response = await api.post<LoginResponse>("/auth/login", { email, password })
    console.log(response)
    return response.data
  }
  async checkStatus() {
    const response = await api.get<LoginResponse>("/auth/me")
    return response.data
  } 
}

export default new AuthService()
