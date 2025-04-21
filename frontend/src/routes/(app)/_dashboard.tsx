import { Outlet, createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@components/ui/button";
import {
  User,
  LayoutDashboard,
  Users,
  Search,
  Bell,
  SunMoon,
  ClipboardList,
  ChevronRight,
} from "lucide-react";
import { redirect } from "@tanstack/react-router";
import { Input } from "@components/ui/input";
import SearchDialog from "./_dashboard/-components/SearchDialog";

export const Route = createFileRoute("/(app)/_dashboard")({
  component: ProtectedLayout,
  beforeLoad: ({ context }) => {
    const { user, isAuthenticated } = context.auth;

    // if (isAuthenticated) {
    //   throw redirect({
    //     to: "/login",
    //     search: {
    //       redirect: window.location.pathname,
    //     },
    //   });
    // }
  },
});

export default function ProtectedLayout() {
  return (
    <div className="flex h-screen p-4 gap-4 bg-white">
      {/* Sidebar */}
      <aside className="w-72  rounded-xl  flex flex-col overflow-hidden bg-gray-100 shadow-sm border border-gray-300">
        {/* Sidebar Header */}
        <div className="h-16 px-4 flex items-center justify-between ">
          <Link
            to="/dashboard"
            className="flex items-center gap-2 text-lg font-semibold"
          >
            <span>Company CRM</span>
          </Link>
          <button className="rounded-md p-1 hover:bg-gray-100">
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Sidebar Content */}
        <div className="flex-1 overflow-auto py-4 px-3">
          {/* Categories */}
          <div className="mb-6">
            <p className="text-xs font-medium text-gray-500 px-3 mb-3">MENU</p>
            <nav className="flex flex-col gap-1">
              <Link
                to="/dashboard"
                className="flex items-center gap-3 py-2 px-3 rounded-md transition-colors hover:bg-gray-200 bg-gray-100"
                activeProps={{ className: "bg-gray-100 text-gray-900" }}
                inactiveProps={{ className: "text-gray-700" }}
              >
                <LayoutDashboard size={18} className="text-gray-500" />
                <span className="text-sm">Dashboard</span>
              </Link>

              <Link
                to="/clients"
                className="flex items-center gap-3 py-2 px-3 rounded-md transition-colors hover:bg-gray-200"
                activeProps={{ className: "bg-gray-100 text-gray-900" }}
                inactiveProps={{ className: "text-gray-700" }}
              >
                <Users size={18} className="text-gray-500" />
                <span className="text-sm">Clients</span>
              </Link>
            </nav>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-white rounded-xl  overflow-hidden">
        <header className="h-16  px-6 flex items-center justify-between">
          {/* Left: Search */}
          <SearchDialog />
          {/* Right: User Actions */}
          <div className="flex items-center gap-2 ml-4">
            <Button variant="ghost" size="icon" className="text-gray-500">
              <Bell size={18} />
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-500">
              <SunMoon size={18} />
            </Button>
            <div className="w-8 h-8 rounded-full bg-gray-100 overflow-hidden">
              <img
                src="https://i.pravatar.cc/300"
                alt="User Avatar"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto">
          <div className="p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
