"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-page-bg,#f8fafc)] px-6">
      <div className="w-full max-w-2xl text-center">
        {/* Dumbbell slipped off the rack — tilted, one plate rolled away */}
        <div className="relative mb-8 h-36 flex items-center justify-center">
          <svg
            viewBox="0 0 260 160"
            width="200"
            height="124"
            aria-hidden="true"
          >
            {/* floor line */}
            <line x1="20" y1="128" x2="240" y2="128" stroke="#e2e8f0" strokeWidth="2" />

            {/* rolled-away plate, drifted right with motion arc */}
            <g className="rolled-plate">
              <circle cx="206" cy="118" r="16" fill="none" stroke="#cbd5e1" strokeWidth="2" />
              <circle cx="206" cy="118" r="6" fill="#cbd5e1" />
            </g>
            <path
              d="M150,110 Q175,96 198,108"
              fill="none"
              stroke="#cbd5e1"
              strokeWidth="2"
              strokeDasharray="3 5"
            />

            {/* tilted dumbbell resting on the floor */}
            <g transform="rotate(-18 110 108)">
              <rect x="40" y="102" width="120" height="11" rx="5.5" fill="#111827" />
              <rect x="26" y="86" width="13" height="42" rx="4" fill="#111827" />
              <rect x="148" y="86" width="13" height="42" rx="4" fill="#111827" />
              <rect x="14" y="92" width="11" height="30" rx="3" fill="#ff6b35" />
            </g>
          </svg>
        </div>

        <p className="text-xs sm:text-sm font-mono uppercase tracking-[0.2em] text-slate-400 mb-3">
          404 — set not found
        </p>

        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
          This page skipped its session.
        </h1>

        <p className="text-sm sm:text-base text-slate-500 max-w-md mx-auto mb-10 leading-relaxed">
          The link you followed doesn&apos;t lead anywhere in FitZone. It
          might&apos;ve been moved, renamed, or it never warmed up in the
          first place.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3 rounded-lg text-sm font-semibold text-white transition-transform hover:scale-[1.02] active:scale-[0.98]"
            style={{ backgroundColor: "#ff6b35" }}
          >
            Back to Home
          </Link>
          <Link
            href="/classes"
            className="w-full sm:w-auto px-6 py-3 rounded-lg text-sm font-semibold border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors"
          >
            Browse classes
          </Link>
        </div>
      </div>

      <style jsx>{`
        .rolled-plate {
          animation: settle 2.4s ease-out 1;
          transform-origin: 150px 110px;
        }

        @keyframes settle {
          0% {
            transform: translate(-90px, -14px) rotate(-180deg);
            opacity: 0;
          }
          60% {
            opacity: 1;
          }
          100% {
            transform: translate(0, 0) rotate(0deg);
            opacity: 1;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .rolled-plate {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}