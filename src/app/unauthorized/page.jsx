import Link from "next/link";
import { ShieldCheck, ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Unauthorized Access | FitZone",
  description: "You do not have permission to view this page.",
};

export default function UnauthorizedPage() {
  return (
    <main className="min-h-[85vh] w-full flex items-center justify-center px-4 py-12 bg-[var(--color-page-bg,#f8fafc)] select-none">
      <div className="max-w-md w-full text-center bg-white border border-slate-100 p-8 sm:p-12 rounded-3xl shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col items-center relative overflow-hidden">
        
        {/* Top Accent Line */}
        <div className="absolute top-0 inset-x-0 h-[4px] bg-gradient-to-r from-amber-500 to-[var(--color-brand,#f97316)]" />

        {/* Minimal Shield Icon with soft brand glow */}
        <div className="w-20 h-20 flex items-center justify-center rounded-2xl bg-orange-50 border border-orange-100 text-[var(--color-brand,#f97316)] mb-8 transition-transform duration-300 hover:scale-105">
          <ShieldCheck className="w-10 h-10 stroke-[1.5]" />
        </div>

        {/* Typography */}
        <h1 className="text-3xl font-extrabold text-[var(--color-brand-dark,#0f172a)] tracking-tight sm:text-4xl">
          Restricted Access
        </h1>
        
        <p className="mt-4 text-sm sm:text-base text-[var(--color-brand-dark,#0f172a)]/60 leading-relaxed max-w-sm">
          You don&apos;t have the required administrative permissions to enter this area of <span className="font-semibold text-[var(--color-brand-dark)]">FitZone</span>. 
        </p>

        {/* Elegant Minimal Divider */}
        <div className="w-16 h-1 bg-slate-100 rounded-full my-8" />

        {/* Clean, High-Contrast Home Link */}
        <Link
          href="/"
          className="group flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full text-sm font-bold bg-[var(--color-brand,#f97316)] text-white hover:opacity-90 active:scale-[0.98] shadow-sm transition-all duration-200 w-full sm:w-auto"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Return to Home</span>
        </Link>

      </div>
    </main>
  );
}