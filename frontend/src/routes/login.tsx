import * as React from "react"
import { createFileRoute } from "@tanstack/react-router"
import LoginPage from "../pages/login/LoginPage"
import { z } from "zod"
import { redirect } from "@tanstack/react-router"

const fallback = "/dashboard" as const
export const Route = createFileRoute("/login")({
  validateSearch: z.object({
    redirect: z.string().optional().catch(""),
  }),
  beforeLoad: ({ context, search }) => {
    if (context.auth.isAuthenticated) {
      throw redirect({ to: search.redirect || fallback })
    }
  },
  component: LoginPage,
})