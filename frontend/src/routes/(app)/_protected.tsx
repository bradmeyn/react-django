import { Outlet, createFileRoute, Link } from "@tanstack/react-router";
import { Input } from "@components/ui/input";
import { Button } from "@components/ui/button";
import { Search, Home, Users, Bell } from "lucide-react";

export const Route = createFileRoute("/(app)/_protected")({
  component: ProtectedLayout,
});

export default function ProtectedLayout() {
  return (
    <div className="flex-1 flex flex-col h-full bg-background">
      <header className="border-b">
        <div className="container mx-auto">
          <div className="flex h-16 items-center justify-between">
            {/* Left section */}
            <nav className="flex items-center gap-6">
              <Link
                to="/dashboard"
                className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary"
                activeProps={{ className: "text-primary" }}
                inactiveProps={{ className: "text-muted-foreground" }}
              >
                CRM
              </Link>
            </nav>

            {/* Center section - Search */}
            <div className="flex-1 px-6 flex justify-center">
              <div className="w-full max-w-lg">
                <div className="relative flex items-center justify-center">
                  <Search className="absolute left-3  size-4 text-muted" />
                  <Input
                    placeholder="Search clients..."
                    className="w-full pl-10 bg-background"
                  />
                </div>
              </div>
            </div>

            {/* Right section */}
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="gap-2">
                <span className="h-6 w-6 rounded-full bg-primary/10" />
                <span className="text-sm">Account</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
