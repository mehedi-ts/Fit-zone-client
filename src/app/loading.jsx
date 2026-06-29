"use client"
export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-page-bg,#f8fafc)] px-6">
      <div className="w-full max-w-md text-center">
        {/* Dumbbell — lifts up and down on a track, signalling work in progress */}
        <div className="relative mb-8 h-32 flex items-center justify-center">
          <svg
            viewBox="0 0 220 160"
            className="dumbbell-lift"
            width="160"
            height="116"
            aria-hidden="true"
          >
            {/* lift track, faint */}
            <line
              x1="110"
              y1="20"
              x2="110"
              y2="140"
              stroke="#e2e8f0"
              strokeWidth="2"
              strokeDasharray="3 6"
            />

            {/* bar */}
            <rect x="40" y="74" width="140" height="12" rx="6" fill="#111827" />

            {/* left plates */}
            <rect x="24" y="56" width="14" height="48" rx="4" fill="#111827" />
            <rect x="10" y="64" width="12" height="32" rx="3" fill="#ff6b35" />

            {/* right plates */}
            <rect x="182" y="56" width="14" height="48" rx="4" fill="#111827" />
            <rect x="198" y="64" width="12" height="32" rx="3" fill="#ff6b35" />

            {/* grip texture */}
            <g stroke="#374151" strokeWidth="2">
              <line x1="92" y1="78" x2="92" y2="82" />
              <line x1="100" y1="78" x2="100" y2="82" />
              <line x1="108" y1="78" x2="108" y2="82" />
              <line x1="116" y1="78" x2="116" y2="82" />
              <line x1="124" y1="78" x2="124" y2="82" />
            </g>
          </svg>
        </div>

        <p className="text-xs sm:text-sm font-mono uppercase tracking-[0.2em] text-slate-400 mb-2">
          Loading set
        </p>

        <h1 className="text-lg sm:text-xl font-semibold text-slate-700">
          One more rep&nbsp;
          <span className="inline-flex">
            <span className="dot" />
            <span className="dot" />
            <span className="dot" />
          </span>
        </h1>
      </div>

      <style jsx>{`
        .dumbbell-lift {
          animation: lift 1.6s cubic-bezier(0.45, 0, 0.55, 1) infinite;
          transform-origin: center;
        }

        @keyframes lift {
          0%,
          100% {
            transform: translateY(18px);
          }
          45% {
            transform: translateY(-14px);
          }
          55% {
            transform: translateY(-14px);
          }
        }

        .dot {
          width: 5px;
          height: 5px;
          margin-left: 3px;
          border-radius: 50%;
          background: #ff6b35;
          display: inline-block;
          align-self: flex-end;
          animation: bounce 1.2s ease-in-out infinite;
        }

        .dot:nth-child(2) {
          animation-delay: 0.15s;
        }

        .dot:nth-child(3) {
          animation-delay: 0.3s;
        }

        @keyframes bounce {
          0%,
          80%,
          100% {
            opacity: 0.25;
            transform: translateY(0);
          }
          40% {
            opacity: 1;
            transform: translateY(-3px);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .dumbbell-lift,
          .dot {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}