import axios from "axios"

export const api = axios.create({
  baseURL: "http://localhost:3030",
})
// Add interceptor header bearer token =! login and register
api.interceptors.request.use((config) => {
  const auth = localStorage.getItem("tanstack.auth")
  const token = auth ? JSON.parse(auth).token : null
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

