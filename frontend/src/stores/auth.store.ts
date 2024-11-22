import { create, StateCreator } from "zustand"
import { createJSONStorage, devtools, persist } from "zustand/middleware"
import AuthService, { UserPayload } from "../services/auth.service"
import { AuthStatus } from "../types"

export interface AuthState {
  status: AuthStatus
  user?: UserPayload
  token?: string
  loginUser: (email: string, password: string) => Promise<void>
  checkStatus: () => Promise<void>
  logoutUser: () => void
}

const storeApi: StateCreator<AuthState> = (set) => ({
  status: AuthStatus.pending,
  user: undefined,
  token: undefined,
  loginUser: async (email: string, password: string) => {
    try {
      const { token, user } = await AuthService.login(email, password)
      set({ status: AuthStatus.authorized, user, token })
    } catch (error) {
      set({ status: AuthStatus.unauthorized, token: undefined, user: undefined })
    }
  },
  checkStatus: async () => {
    try {
      const { token, user } = await AuthService.checkStatus()
      set({ status: AuthStatus.authorized, user, token })
    } catch (error) {
      set({ status: AuthStatus.unauthorized, token: undefined, user: undefined })
    }
  },
  logoutUser: () => {
    set({ status: AuthStatus.unauthorized, token: undefined, user: undefined })
  },
})

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(storeApi, {
      name: "auth-store",
      storage: createJSONStorage(() => localStorage),
    })
  )
)
