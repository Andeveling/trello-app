import * as React from "react"
import AuthService, { LoginResponse, User } from "./services/auth.service"

export interface AuthContext {
  isAuthenticated: boolean
  login: (username: string, password: string) => Promise<void>
  logout: () => Promise<void>
  user: User | null
  token: string | null
}

const AuthContext = React.createContext<AuthContext | null>(null)

const localStorageKey = "tanstack.auth"

function getStoredAuthData(): { user: User | null; token: string | null } {
  const storedData = localStorage.getItem(localStorageKey)
  if (storedData) {
    return JSON.parse(storedData)
  }
  return { user: null, token: null }
}

function setStoredAuthData(user: User | null, token: string | null) {
  if (user && token) {
    localStorage.setItem(localStorageKey, JSON.stringify({ user, token }))
  } else {
    localStorage.removeItem(localStorageKey)
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User | null>(getStoredAuthData().user)
  const [token, setToken] = React.useState<string | null>(getStoredAuthData().token)

  const isAuthenticated = !!user && !!token

  const login = React.useCallback(async (username: string, password: string) => {
    try {
      const response: LoginResponse = await AuthService.login(username, password)

      setUser(response.user)
      setToken(response.token)
      setStoredAuthData(response.user, response.token)
    } catch (error) {
      console.error("Login failed", error)
      throw new Error("Invalid username or password")
    }
  }, [])

  const logout = React.useCallback(async () => {
    setUser(null)
    setToken(null)
    setStoredAuthData(null, null)
  }, [])

  React.useEffect(() => {
    const { user, token } = getStoredAuthData()
    setUser(user)
    setToken(token)
  }, [])

  return <AuthContext.Provider value={{ isAuthenticated, user, token, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = React.useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
