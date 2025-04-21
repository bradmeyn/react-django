import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(app)/_dashboard/clients/[clientId]/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(app)/_dashboard/clients/[clientId]/"!</div>
}
