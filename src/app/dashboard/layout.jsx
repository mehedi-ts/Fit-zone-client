import { Sidebar } from "@/components/dashboardUi/sidebar";
import { Search, Bell, House } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getUser } from "@/app/lib/getUser";

export default async function DashboardLayout({ children }) {
  const user = await getUser();
  const hasImage = typeof user?.image === "string" && user.image.trim().length > 0;
  const initials = user?.name?.slice(0, 2).toUpperCase() || "??";

  return (
    <div className="flex min-h-screen bg-page-bg">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-[72px] items-center justify-between border-b border-gray-100 bg-white px-4 lg:px-7">
          {/* Left - Breadcrumbs */}
          <div className="flex items-center gap-2 pl-10 lg:pl-0 text-sm">
            <span className="text-gray-400 font-medium">Dashboard</span>
            <span className="text-gray-300">/</span>
            <span className="text-gray-900 font-bold">Overview</span>
          </div>

          {/* Right - Actions */}
          <div className="flex items-center gap-3 md:gap-4 shrink-0">
            {/* Search */}
            <div className="hidden md:flex relative items-center">
              <Search className="w-4 h-4 text-gray-400 absolute left-3" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="pl-9 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-full text-sm outline-none focus:border-[var(--color-brand)] transition-colors w-64"
              />
            </div>

            {/* Back to Website */}
            <Link
              href="/"
              className="flex items-center gap-1.5 rounded-full border border-gray-100 px-3 py-2 text-xs font-medium text-gray-500 transition-all hover:border-[var(--color-brand)]/40 hover:bg-[var(--color-brand)]/10 hover:text-[var(--color-brand)]"
              title="Back to website"
            >
              <House className="w-4 h-4" />
              <span className="hidden sm:inline">Website</span>
            </Link>

            {/* Notifications */}
            <button className="relative w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors">
              <Bell className="w-4 h-4" />
              <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-[var(--color-brand)] rounded-full"></span>
            </button>

            {/* Avatar */}
            <div className="w-10 h-10 rounded-full bg-indigo-50 border border-gray-100 flex items-center justify-center text-[var(--color-brand)] font-bold text-sm relative overflow-hidden">
              {hasImage ? (
                <Image
                  src={user.image}
                  alt={user?.name || "User"}
                  fill
                  sizes="40px"
                  className="object-cover"
                />
              ) : (
                initials
              )}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 px-4 py-5 lg:px-6 lg:py-6">
          <div className="min-h-[calc(100vh-7.5rem)] rounded-2xl bg-white border border-gray-100 p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-12px_rgba(0,0,0,0.06)] lg:p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}