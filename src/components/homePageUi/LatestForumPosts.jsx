"use client";

import { useEffect, useState, useCallback } from "react";
import ForumCard from "../shared/ForumCard";


// ─── Loading Skeleton ─────────────────────────────────────────────────────────
function Skeleton() {
  return (
    <div className="flex flex-wrap justify-center gap-5">
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="max-w-sm w-full rounded-2xl overflow-hidden bg-white border border-slate-100 shadow-sm animate-pulse"
        >
          <div className="h-56 bg-slate-200" />
          <div className="p-5 space-y-4">
            <div className="h-3 bg-slate-200 rounded-full w-1/4" />
            <div className="h-5 bg-slate-200 rounded-full w-3/4" />
            <div className="flex items-center gap-2 pt-2">
              <div className="h-8 w-8 rounded-full bg-slate-200" />
              <div className="space-y-2">
                <div className="h-3 bg-slate-200 rounded-full w-20" />
                <div className="h-2 bg-slate-100 rounded-full w-14" />
              </div>
            </div>
            <div className="space-y-2 pt-2">
              <div className="h-3 bg-slate-100 rounded-full w-full" />
              <div className="h-3 bg-slate-100 rounded-full w-5/6" />
            </div>
            <div className="h-4 bg-slate-200 rounded-full w-24 pt-2" />
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
      <p className="text-[var(--color-brand-dark)]/50">No forum posts available yet. Be the first to start a discussion!</p>
    </div>
  );
}

// ─── Error State ──────────────────────────────────────────────────────────────
function ErrorState({ onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center gap-4">
      <p className="text-[var(--color-brand-dark)]/50">Couldn&apos;t load forum posts. Please try again.</p>
      <button
        onClick={onRetry}
        className="px-5 py-2.5 rounded-full text-sm font-medium bg-orange-500 text-white hover:opacity-90 transition-opacity"
      >
        Try again
      </button>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function LatestForumPosts() {
  const [posts, setPosts] = useState([]);
  const [status, setStatus] = useState("loading");

  const fetchPosts = useCallback(async () => {
    setStatus("loading");
    try {
      // ৩-৪ টি লেটেস্ট পোস্ট আনার জন্য লিমিট সহ API কল করা হয়েছে
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/forum/latest?limit=3`);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      
      if (!data || data.length === 0) {
        setStatus("empty");
      } else {
        setPosts(data);
        setStatus("success");
      }
    } catch {
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchPosts();
  }, [fetchPosts]);

  return (
    <section className="w-full py-16 px-4 bg-[var(--color-page-bg)]">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--color-brand-dark)]">
            Latest Forum{" "}
            <span className="text-orange-500">
              Posts
            </span>
          </h2>
          <p className="mt-3 text-[var(--color-brand-dark)]/60">
            Join the conversation and see what our community is talking about.
          </p>
        </div>

        {/* States */}
        {status === "loading" && <Skeleton />}
        {status === "empty" && <Empty />}
        {status === "error" && <ErrorState onRetry={fetchPosts} />}

        {/* Grid */}
        {status === "success" && (
          <div className="flex flex-wrap justify-center gap-5">
            {posts.map((post) => (
              <div key={post._id} className="max-w-sm w-full flex">
                <ForumCard forum={post} />
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}