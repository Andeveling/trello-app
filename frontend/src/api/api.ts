import axios from "axios"
import { useAuthStore } from "../stores/auth.store"

export const api = axios.create({
  baseURL: "http://localhost:3030",
})
// Add interceptor header bearer token =! login and register
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
