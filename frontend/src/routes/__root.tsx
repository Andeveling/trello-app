import * as React from "react"
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router"
import { TanStackRouterDevtools } from "@tanstack/router-devtools"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import type { AuthContext } from "../auth"

export const queryClient = new QueryClient()

interface MyRouterContext {
  auth: AuthContext
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <>
      <QueryClientProvider client={queryClient}>
        <Outlet />
      </QueryClientProvider>
      <TanStackRouterDevtools position='bottom-right' initialIsOpen={false} />
    </>
  ),
})
