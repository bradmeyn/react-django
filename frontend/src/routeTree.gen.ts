/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as IndexImport } from './routes/index'
import { Route as appAppImport } from './routes/(app)/_app'
import { Route as authRegisterIndexImport } from './routes/(auth)/register/index'
import { Route as authLoginIndexImport } from './routes/(auth)/login/index'
import { Route as appAppDashboardIndexImport } from './routes/(app)/_app/dashboard/index'
import { Route as appAppClientsIndexImport } from './routes/(app)/_app/clients/index'
import { Route as appAppClientsClientIdRouteImport } from './routes/(app)/_app/clients/$clientId/route'
import { Route as appAppClientsClientIdIndexImport } from './routes/(app)/_app/clients/$clientId/index'

// Create Virtual Routes

const appImport = createFileRoute('/(app)')()

// Create/Update Routes

const appRoute = appImport.update({
  id: '/(app)',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const appAppRoute = appAppImport.update({
  id: '/_app',
  getParentRoute: () => appRoute,
} as any)

const authRegisterIndexRoute = authRegisterIndexImport.update({
  id: '/(auth)/register/',
  path: '/register/',
  getParentRoute: () => rootRoute,
} as any)

const authLoginIndexRoute = authLoginIndexImport.update({
  id: '/(auth)/login/',
  path: '/login/',
  getParentRoute: () => rootRoute,
} as any)

const appAppDashboardIndexRoute = appAppDashboardIndexImport.update({
  id: '/dashboard/',
  path: '/dashboard/',
  getParentRoute: () => appAppRoute,
} as any)

const appAppClientsIndexRoute = appAppClientsIndexImport.update({
  id: '/clients/',
  path: '/clients/',
  getParentRoute: () => appAppRoute,
} as any)

const appAppClientsClientIdRouteRoute = appAppClientsClientIdRouteImport.update(
  {
    id: '/clients/$clientId',
    path: '/clients/$clientId',
    getParentRoute: () => appAppRoute,
  } as any,
)

const appAppClientsClientIdIndexRoute = appAppClientsClientIdIndexImport.update(
  {
    id: '/',
    path: '/',
    getParentRoute: () => appAppClientsClientIdRouteRoute,
  } as any,
)

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
    '/(app)': {
      id: '/(app)'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof appImport
      parentRoute: typeof rootRoute
    }
    '/(app)/_app': {
      id: '/(app)/_app'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof appAppImport
      parentRoute: typeof appRoute
    }
    '/(auth)/login/': {
      id: '/(auth)/login/'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof authLoginIndexImport
      parentRoute: typeof rootRoute
    }
    '/(auth)/register/': {
      id: '/(auth)/register/'
      path: '/register'
      fullPath: '/register'
      preLoaderRoute: typeof authRegisterIndexImport
      parentRoute: typeof rootRoute
    }
    '/(app)/_app/clients/$clientId': {
      id: '/(app)/_app/clients/$clientId'
      path: '/clients/$clientId'
      fullPath: '/clients/$clientId'
      preLoaderRoute: typeof appAppClientsClientIdRouteImport
      parentRoute: typeof appAppImport
    }
    '/(app)/_app/clients/': {
      id: '/(app)/_app/clients/'
      path: '/clients'
      fullPath: '/clients'
      preLoaderRoute: typeof appAppClientsIndexImport
      parentRoute: typeof appAppImport
    }
    '/(app)/_app/dashboard/': {
      id: '/(app)/_app/dashboard/'
      path: '/dashboard'
      fullPath: '/dashboard'
      preLoaderRoute: typeof appAppDashboardIndexImport
      parentRoute: typeof appAppImport
    }
    '/(app)/_app/clients/$clientId/': {
      id: '/(app)/_app/clients/$clientId/'
      path: '/'
      fullPath: '/clients/$clientId/'
      preLoaderRoute: typeof appAppClientsClientIdIndexImport
      parentRoute: typeof appAppClientsClientIdRouteImport
    }
  }
}

// Create and export the route tree

interface appAppClientsClientIdRouteRouteChildren {
  appAppClientsClientIdIndexRoute: typeof appAppClientsClientIdIndexRoute
}

const appAppClientsClientIdRouteRouteChildren: appAppClientsClientIdRouteRouteChildren =
  {
    appAppClientsClientIdIndexRoute: appAppClientsClientIdIndexRoute,
  }

const appAppClientsClientIdRouteRouteWithChildren =
  appAppClientsClientIdRouteRoute._addFileChildren(
    appAppClientsClientIdRouteRouteChildren,
  )

interface appAppRouteChildren {
  appAppClientsClientIdRouteRoute: typeof appAppClientsClientIdRouteRouteWithChildren
  appAppClientsIndexRoute: typeof appAppClientsIndexRoute
  appAppDashboardIndexRoute: typeof appAppDashboardIndexRoute
}

const appAppRouteChildren: appAppRouteChildren = {
  appAppClientsClientIdRouteRoute: appAppClientsClientIdRouteRouteWithChildren,
  appAppClientsIndexRoute: appAppClientsIndexRoute,
  appAppDashboardIndexRoute: appAppDashboardIndexRoute,
}

const appAppRouteWithChildren =
  appAppRoute._addFileChildren(appAppRouteChildren)

interface appRouteChildren {
  appAppRoute: typeof appAppRouteWithChildren
}

const appRouteChildren: appRouteChildren = {
  appAppRoute: appAppRouteWithChildren,
}

const appRouteWithChildren = appRoute._addFileChildren(appRouteChildren)

export interface FileRoutesByFullPath {
  '/': typeof appAppRouteWithChildren
  '/login': typeof authLoginIndexRoute
  '/register': typeof authRegisterIndexRoute
  '/clients/$clientId': typeof appAppClientsClientIdRouteRouteWithChildren
  '/clients': typeof appAppClientsIndexRoute
  '/dashboard': typeof appAppDashboardIndexRoute
  '/clients/$clientId/': typeof appAppClientsClientIdIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof appAppRouteWithChildren
  '/login': typeof authLoginIndexRoute
  '/register': typeof authRegisterIndexRoute
  '/clients': typeof appAppClientsIndexRoute
  '/dashboard': typeof appAppDashboardIndexRoute
  '/clients/$clientId': typeof appAppClientsClientIdIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/(app)': typeof appRouteWithChildren
  '/(app)/_app': typeof appAppRouteWithChildren
  '/(auth)/login/': typeof authLoginIndexRoute
  '/(auth)/register/': typeof authRegisterIndexRoute
  '/(app)/_app/clients/$clientId': typeof appAppClientsClientIdRouteRouteWithChildren
  '/(app)/_app/clients/': typeof appAppClientsIndexRoute
  '/(app)/_app/dashboard/': typeof appAppDashboardIndexRoute
  '/(app)/_app/clients/$clientId/': typeof appAppClientsClientIdIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/login'
    | '/register'
    | '/clients/$clientId'
    | '/clients'
    | '/dashboard'
    | '/clients/$clientId/'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/login'
    | '/register'
    | '/clients'
    | '/dashboard'
    | '/clients/$clientId'
  id:
    | '__root__'
    | '/'
    | '/(app)'
    | '/(app)/_app'
    | '/(auth)/login/'
    | '/(auth)/register/'
    | '/(app)/_app/clients/$clientId'
    | '/(app)/_app/clients/'
    | '/(app)/_app/dashboard/'
    | '/(app)/_app/clients/$clientId/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  appRoute: typeof appRouteWithChildren
  authLoginIndexRoute: typeof authLoginIndexRoute
  authRegisterIndexRoute: typeof authRegisterIndexRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  appRoute: appRouteWithChildren,
  authLoginIndexRoute: authLoginIndexRoute,
  authRegisterIndexRoute: authRegisterIndexRoute,
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
        "/(app)",
        "/(auth)/login/",
        "/(auth)/register/"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/(app)": {
      "filePath": "(app)",
      "children": [
        "/(app)/_app"
      ]
    },
    "/(app)/_app": {
      "filePath": "(app)/_app.tsx",
      "parent": "/(app)",
      "children": [
        "/(app)/_app/clients/$clientId",
        "/(app)/_app/clients/",
        "/(app)/_app/dashboard/"
      ]
    },
    "/(auth)/login/": {
      "filePath": "(auth)/login/index.tsx"
    },
    "/(auth)/register/": {
      "filePath": "(auth)/register/index.tsx"
    },
    "/(app)/_app/clients/$clientId": {
      "filePath": "(app)/_app/clients/$clientId/route.tsx",
      "parent": "/(app)/_app",
      "children": [
        "/(app)/_app/clients/$clientId/"
      ]
    },
    "/(app)/_app/clients/": {
      "filePath": "(app)/_app/clients/index.tsx",
      "parent": "/(app)/_app"
    },
    "/(app)/_app/dashboard/": {
      "filePath": "(app)/_app/dashboard/index.tsx",
      "parent": "/(app)/_app"
    },
    "/(app)/_app/clients/$clientId/": {
      "filePath": "(app)/_app/clients/$clientId/index.tsx",
      "parent": "/(app)/_app/clients/$clientId"
    }
  }
}
ROUTE_MANIFEST_END */
