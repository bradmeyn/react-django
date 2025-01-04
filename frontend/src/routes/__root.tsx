import * as React from "react";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";

import { type AuthContext } from "@/lib/contexts/AuthContext";

interface RouterContext {
  auth: AuthContext;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => <Outlet />,
});
