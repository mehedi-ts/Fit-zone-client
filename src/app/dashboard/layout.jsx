import { Sidebar } from "@/components/dashboardUi/sidebar";

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
            <div className="hidden items-center gap-2 rounded-lg border border-default-200 px-3 py-1.5 text-xs text-default-400 sm:flex cursor-pointer hover:border-default-300 transition-colors">
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
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#ff6b35] to-[#ff9a6c] text-[11px] font-medium text-white cursor-pointer">
              RK
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-5 lg:p-6">
          <div className="rounded-xl border border-default-100 bg-background p-5 shadow-sm">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
