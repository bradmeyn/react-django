import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { type AuthContextType } from "@/lib/contexts/AuthContext";
import { type QueryClient } from "@tanstack/react-query";

interface RouterContext {
  auth: AuthContextType;
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => <Outlet />,
});
