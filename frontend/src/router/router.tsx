import { createBrowserRouter } from "react-router-dom"

import { Root } from "../Root"
import DashboardLayout from "../layouts/DashboardLayout"
import HomePage from "../pages/home/HomePage"
import LoginPage from "../pages/login/LoginPage"
import AuthLayout from "../layouts/AuthLayout"
import BoardPage from "../pages/boards/BoardPage"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "home",
        Component: HomePage,
      },
    ],
  },
  {
    path: "dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "boards/:boardId",
        element: <BoardPage />,
      },
    ],
  },
  {
    path: "auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
    ],
  },
])
