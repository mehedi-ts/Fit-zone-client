"use client";

import { useEffect, useState, useCallback } from "react";
import ClassCard from "../shared/ClassCard";

// ─── Loading Skeleton ─────────────────────────────────────────────────────────
function Skeleton() {
  return (
    <div className="flex flex-wrap justify-center gap-5">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="w-full sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)] rounded-2xl overflow-hidden bg-white border border-slate-100 shadow-sm animate-pulse"
        >
          <div className="h-48 bg-slate-200" />
          <div className="p-4 space-y-3">
            <div className="h-4 bg-slate-200 rounded-full w-3/4" />
            <div className="h-3 bg-slate-100 rounded-full w-full" />
            <div className="h-3 bg-slate-100 rounded-full w-2/3" />
            <div className="flex items-center gap-2 pt-1">
              <div className="h-6 w-6 rounded-full bg-slate-200" />
              <div className="h-3 bg-slate-100 rounded-full w-24" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Empty State ──────────────────────────────────────────────────────────────
function Empty() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <p className="text-[var(--color-brand-dark)]/50">No featured classes yet. Check back soon.</p>
    </div>
  );
}

// ─── Error State ──────────────────────────────────────────────────────────────
function ErrorState({ onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center gap-4">
      <p className="text-[var(--color-brand-dark)]/50">Couldn&apos;t load classes. Please try again.</p>
      <button
        onClick={onRetry}
        className="px-5 py-2.5 rounded-full text-sm font-medium bg-[var(--color-brand)] text-white hover:opacity-90 transition-opacity"
      >
        Try again
      </button>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function FeaturedClasses() {
  const [classes, setClasses] = useState([]);
  const [status, setStatus] = useState("loading");

  const fetchClasses = useCallback(async () => {
    setStatus("loading");
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/classes/featured`);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      if (!data || data.length === 0) {
        setStatus("empty");
      } else {
        setClasses(data);
        setStatus("success");
      }
    } catch {
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchClasses();
  }, [fetchClasses]);

  return (
    <section className="w-full py-16 px-4 bg-[var(--color-page-bg)]">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--color-brand-dark)]">
            Featured{" "}
            <span className="text-[var(--color-brand)]">
              Classes
            </span>
          </h2>
          <p className="mt-3 text-[var(--color-brand-dark)]/60">
            Discover our most popular fitness classes.
          </p>
        </div>

        {/* States */}
        {status === "loading" && <Skeleton />}
        {status === "empty" && <Empty />}
        {status === "error" && <ErrorState onRetry={fetchClasses} />}

        {/* Grid */}
        {status === "success" && (
          <div className="flex flex-wrap justify-center gap-5">
            {classes.map((item) => (
              <div key={item.id} className="w-full sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)]">
                <ClassCard
                  _id={item.id}
                  className={item.className}
                  image={item.image}
                  description={item.description}
                  duration={item.duration}
                  level={item.level}
                  price={item.price}
                  category={item.category}
                  bookingCount={item.bookingCount}
                />
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}