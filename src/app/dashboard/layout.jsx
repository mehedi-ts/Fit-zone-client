import { Sidebar } from "@/components/dashboardUi/sidebar";
import Link from "next/link";
import { ArrowUpRight, House } from "lucide-react";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-page-bg">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-19.5 items-center justify-between border-b border-default-100 bg-background/80 backdrop-blur-sm px-4 lg:px-7">
          {/* left padding on mobile so hamburger doesn't overlap */}
          <div className="flex items-center gap-3 pl-10 lg:pl-0 min-w-0">
            <span className="hidden h-8 w-1 rounded-full bg-brand lg:block" />
            <div className="min-w-0">
              <h1 className="text-sm font-semibold text-foreground tracking-tight truncate">
                Dashboard
              </h1>
              <p className="text-[11px] text-default-400 truncate">
                Manage everything from here
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Mobile — icon-only button */}
            <Link
              href="/"
              aria-label="Back to home"
              className="group flex sm:hidden h-9 w-9 items-center justify-center rounded-full border border-default-200 text-default-600 transition-all hover:border-brand/40 hover:bg-brand/5 hover:text-brand"
            >
              <House size={16} />
            </Link>

            {/* Desktop — full pill with label */}
            <Link
              href="/"
              className="group hidden sm:flex items-center gap-1.5 rounded-lg border border-default-200 px-3 py-1.5 text-xs font-medium text-default-600 transition-all hover:border-brand/40 hover:bg-brand/5 hover:text-brand"
            >
              <House size={14} />
              Continue to website
              <ArrowUpRight
                size={13}
                className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 px-4 py-5 lg:px-6 lg:py-6">
          <div className="min-h-[calc(100vh-7.5rem)] rounded-2xl border border-default-100 bg-background p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-12px_rgba(0,0,0,0.06)] lg:p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}