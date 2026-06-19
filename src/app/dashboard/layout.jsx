import { Sidebar } from "@/components/dashboardUi/sidebar";
import Link from "next/link";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-[var(--color-page-bg)]">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-default-100 bg-background px-5 lg:px-6">
          {/* left padding on mobile so hamburger doesn't overlap */}
          <div className="pl-10 lg:pl-0">
            <h1 className="text-sm font-medium text-foreground">Dashboard</h1>
            <p className="text-[11px] text-default-400">
              Manage everything from here
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden cursor-pointer items-center gap-2 rounded-lg border border-default-200 px-3 py-1.5 text-xs text-default-400 transition-colors hover:border-default-300 sm:flex">
              <svg
                width="12"
                height="12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              Search...
            </div>

            <Link
              href="/"
              className="rounded-lg border border-default-200 px-3 py-1.5 text-xs font-medium transition-colors hover:border-default-300 hover:bg-default-100"
            >
              Continue to Website →
            </Link>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-5 lg:p-6">
          <div className="rounded-xl min-h-screen border border-default-100 bg-background py-4 shadow-sm">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
