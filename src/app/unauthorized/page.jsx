"use client";

import Link from "next/link";

export default function Unauthorized() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-page-bg,#f8fafc)] px-6">
      <div className="w-full max-w-2xl text-center">
        {/* Locked rack — dumbbell behind a closed gate, padlock front and center */}
        <div className="relative mb-8 h-36 flex items-center justify-center">
          <svg
            viewBox="0 0 260 160"
            width="200"
            height="124"
            aria-hidden="true"
          >
            {/* rack frame */}
            <rect
              x="30"
              y="30"
              width="200"
              height="98"
              rx="8"
              fill="none"
              stroke="#cbd5e1"
              strokeWidth="3"
            />

            {/* vertical rack bars */}
            <line x1="70" y1="30" x2="70" y2="128" stroke="#e2e8f0" strokeWidth="2" />
            <line x1="190" y1="30" x2="190" y2="128" stroke="#e2e8f0" strokeWidth="2" />

            {/* dumbbell resting inside, dimmed — out of reach */}
            <g opacity="0.35">
              <rect x="95" y="73" width="70" height="9" rx="4.5" fill="#111827" />
              <rect x="85" y="62" width="11" height="32" rx="3" fill="#111827" />
              <rect x="164" y="62" width="11" height="32" rx="3" fill="#111827" />
            </g>

            {/* padlock, centered on the gate */}
            <g className="lock-shake">
              <rect
                x="113"
                y="92"
                width="34"
                height="28"
                rx="5"
                fill="#111827"
              />
              <path
                d="M120,92 v-10 a10,10 0 0 1 20,0 v10"
                fill="none"
                stroke="#ff6b35"
                strokeWidth="5"
                strokeLinecap="round"
              />
              <circle cx="130" cy="104" r="3.2" fill="#ff6b35" />
              <line
                x1="130"
                y1="106"
                x2="130"
                y2="112"
                stroke="#ff6b35"
                strokeWidth="2.4"
                strokeLinecap="round"
              />
            </g>
          </svg>
        </div>

        <p className="text-xs sm:text-sm font-mono uppercase tracking-[0.2em] text-slate-400 mb-3">
          401 — rack locked
        </p>

        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
          This zone needs a different membership.
        </h1>

        <p className="text-sm sm:text-base text-slate-500 max-w-md mx-auto mb-10 leading-relaxed">
          You don&apos;t have access to this page with your current role.
          Sign in with an account that has the right permissions, or head
          back to somewhere you&apos;re cleared for.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3 rounded-lg text-sm font-semibold text-white transition-transform hover:scale-[1.02] active:scale-[0.98]"
            style={{ backgroundColor: "#ff6b35" }}
          >
            Back to Home
          </Link>
          
        </div>
      </div>

      <style jsx>{`
        .lock-shake {
          transform-origin: 130px 100px;
          animation: shake 2.6s ease-in-out infinite;
        }

        @keyframes shake {
          0%,
          70%,
          100% {
            transform: rotate(0deg);
          }
          74% {
            transform: rotate(-4deg);
          }
          78% {
            transform: rotate(4deg);
          }
          82% {
            transform: rotate(-3deg);
          }
          86% {
            transform: rotate(0deg);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .lock-shake {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}