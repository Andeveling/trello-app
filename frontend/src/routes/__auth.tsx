import MenuIcon from "@mui/icons-material/Menu"
import Box from "@mui/material/Box"
import IconButton from "@mui/material/IconButton"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import { Outlet, createFileRoute, redirect, useRouter } from "@tanstack/react-router"
import React from "react"
import { useAuth } from "../auth"
import AuthLayout from "../layouts/AuthLayout"

export const Route = createFileRoute("/__auth")({
  beforeLoad: ({ context, location }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      })
    }
  },
  component: AuthLayout,
})

