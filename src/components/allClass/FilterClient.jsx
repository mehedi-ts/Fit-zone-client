"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const CATEGORIES = [
  { value: "", label: "All categories" },
  { value: "cardio", label: "Cardio" },
  { value: "yoga", label: "Yoga" },
  { value: "strength", label: "Strength" },
  { value: "hiit", label: "HIIT" },
];

export default function FilterClient({ search, category }) {
  const router = useRouter();

  const [text, setText] = useState(search);
  const [cat, setCat] = useState(category);

  useEffect(() => {
    const timer = setTimeout(() => {
      const query = new URLSearchParams();

      if (text) query.set("search", text);
      if (cat) query.set("category", cat);

      // filter changed -> always go back to page 1
      const queryString = query.toString();
      router.push(`/classes${queryString ? `?${queryString}` : ""}`);
    }, 400); // 🔥 smooth debounce

    return () => clearTimeout(timer);
  }, [text, cat, router]);

  const hasActiveFilters = text || cat;

  return (
    <div className="bg-white p-3 sm:p-4 rounded-2xl border border-gray-200 shadow-sm flex flex-col sm:flex-row gap-3">
      {/* SEARCH */}
      <div className="relative flex-1">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Search class..."
          className="w-full border border-gray-200 pl-9 pr-3 py-2.5 sm:py-2 rounded-xl text-sm outline-none transition focus:border-[var(--color-brand)] focus:ring-2 focus:ring-[var(--color-brand)]/15"
        />
      </div>

      {/* CATEGORY */}
      <select
        value={cat}
        onChange={(e) => setCat(e.target.value)}
        className="w-full sm:w-48 border border-gray-200 px-3 py-2.5 sm:py-2 rounded-xl text-sm outline-none transition focus:border-[var(--color-brand)] focus:ring-2 focus:ring-[var(--color-brand)]/15 bg-white"
      >
        {CATEGORIES.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {/* Reset button */}
      <button
        onClick={() => {
          setText("");
          setCat("");
          router.push("/classes");
        }}
        disabled={!hasActiveFilters}
        className="px-4 py-2.5 sm:py-2 rounded-xl text-sm font-medium border border-gray-200 text-gray-600 transition hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent"
      >
        Reset
      </button>
    </div>
  );
}