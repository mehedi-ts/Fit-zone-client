import Link from "next/link";
import { ShieldAlert, Home, ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Unauthorized Access | FitZone",
  description: "You do not have permission to view this page.",
};

export default function UnauthorizedPage() {
  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-orange-50 via-white to-orange-100 px-6">

      {/* Background Blur */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-orange-300/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl" />

      <div className="relative w-full max-w-xl">

        {/* 403 Background */}
        <h1 className="absolute -top-16 left-1/2 -translate-x-1/2 text-[180px] font-black text-orange-100 select-none pointer-events-none">
          403
        </h1>

        <div className="relative rounded-3xl border border-white/50 bg-white/80 backdrop-blur-xl shadow-2xl p-10 text-center">

          {/* Icon */}
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-orange-600 shadow-lg">
            <ShieldAlert className="h-11 w-11 text-white" />
          </div>

          <h2 className="mt-8 text-4xl font-bold text-slate-900">
            Access Denied
          </h2>

          <p className="mt-4 text-slate-600 leading-7">
            Sorry, you don&apos;t have permission to access this page.
            <br />
            Please contact the administrator if you believe this is a mistake.
          </p>

          {/* Buttons */}
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">

            <Link
              href="/"
              className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-orange-500 py-3.5 font-semibold text-white transition hover:bg-orange-600"
            >
              <Home size={18} />
              Home
            </Link>

            <button
              onClick={() => history.back()}
              className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-slate-300 py-3.5 font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              <ArrowLeft size={18} />
              Go Back
            </button>

          </div>

        </div>

      </div>
    </main>
  );
}