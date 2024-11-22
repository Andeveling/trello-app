import { Navigate, Outlet } from "react-router-dom"
import { useAuthStore } from "../stores/auth.store"
import { AuthStatus } from "../types"

export default function AuthLayout() {
  const authStatus = useAuthStore((state) => state.status)

  if(authStatus === AuthStatus.authorized) {
    return <Navigate to='/dashboard' replace />
  }
  


  return (
    <>
      <Outlet />
    </>
  )
}
