/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as LoginImport } from './routes/login'
import { Route as authImport } from './routes/__auth'
import { Route as IndexImport } from './routes/index'
import { Route as authDashboardImport } from './routes/__auth.dashboard'
import { Route as authBoardsBoardIdImport } from './routes/__auth..boards.$boardId'

// Create/Update Routes

const LoginRoute = LoginImport.update({
  id: '/login',
  path: '/login',
  getParentRoute: () => rootRoute,
} as any)

const authRoute = authImport.update({
  id: '/__auth',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const authDashboardRoute = authDashboardImport.update({
  id: '/dashboard',
  path: '/dashboard',
  getParentRoute: () => authRoute,
} as any)

const authBoardsBoardIdRoute = authBoardsBoardIdImport.update({
  id: '/boards/$boardId',
  path: '/boards/$boardId',
  getParentRoute: () => authRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/__auth': {
      id: '/__auth'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof authImport
      parentRoute: typeof rootRoute
    }
    '/login': {
      id: '/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginImport
      parentRoute: typeof rootRoute
    }
    '/__auth/dashboard': {
      id: '/__auth/dashboard'
      path: '/dashboard'
      fullPath: '/dashboard'
      preLoaderRoute: typeof authDashboardImport
      parentRoute: typeof authImport
    }
    '/__auth/boards/$boardId': {
      id: '/__auth/boards/$boardId'
      path: '/boards/$boardId'
      fullPath: '/boards/$boardId'
      preLoaderRoute: typeof authBoardsBoardIdImport
      parentRoute: typeof authImport
    }
  }
}

// Create and export the route tree

interface authRouteChildren {
  authDashboardRoute: typeof authDashboardRoute
  authBoardsBoardIdRoute: typeof authBoardsBoardIdRoute
}

const authRouteChildren: authRouteChildren = {
  authDashboardRoute: authDashboardRoute,
  authBoardsBoardIdRoute: authBoardsBoardIdRoute,
}

const authRouteWithChildren = authRoute._addFileChildren(authRouteChildren)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '': typeof authRouteWithChildren
  '/login': typeof LoginRoute
  '/dashboard': typeof authDashboardRoute
  '/boards/$boardId': typeof authBoardsBoardIdRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '': typeof authRouteWithChildren
  '/login': typeof LoginRoute
  '/dashboard': typeof authDashboardRoute
  '/boards/$boardId': typeof authBoardsBoardIdRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/__auth': typeof authRouteWithChildren
  '/login': typeof LoginRoute
  '/__auth/dashboard': typeof authDashboardRoute
  '/__auth/boards/$boardId': typeof authBoardsBoardIdRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '' | '/login' | '/dashboard' | '/boards/$boardId'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '' | '/login' | '/dashboard' | '/boards/$boardId'
  id:
    | '__root__'
    | '/'
    | '/__auth'
    | '/login'
    | '/__auth/dashboard'
    | '/__auth/boards/$boardId'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  authRoute: typeof authRouteWithChildren
  LoginRoute: typeof LoginRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  authRoute: authRouteWithChildren,
  LoginRoute: LoginRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/__auth",
        "/login"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/__auth": {
      "filePath": "__auth.tsx",
      "children": [
        "/__auth/dashboard",
        "/__auth/boards/$boardId"
      ]
    },
    "/login": {
      "filePath": "login.tsx"
    },
    "/__auth/dashboard": {
      "filePath": "__auth.dashboard.tsx",
      "parent": "/__auth"
    },
    "/__auth/boards/$boardId": {
      "filePath": "__auth..boards.$boardId.tsx",
      "parent": "/__auth"
    }
  }
}
ROUTE_MANIFEST_END */
