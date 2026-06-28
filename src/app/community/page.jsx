import ForumCard from "@/components/shared/ForumCard";
import React from "react";
import { getAllForums } from "../lib/api/getAllForum";

const CommunityPage = async () => {
  const forums = await getAllForums();

  return (
    <div className="min-h-screen py-8 sm:py-10 px-4 bg-[var(--color-page-bg)]">
      <div className="w-full max-w-6xl mx-auto flex flex-col gap-6 sm:gap-8">
        {/* HEADER */}
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-[var(--color-brand-dark)]">
            Community Forum
          </h1>
          <p className="text-sm text-gray-500">
            Join discussions, share experiences, and connect with fitness
            enthusiasts.
          </p>
        </div>

        {/* EMPTY STATE */}
        {forums?.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-20 px-4 bg-white rounded-2xl border border-dashed border-gray-200">
            <div className="w-12 h-12 rounded-full bg-[var(--color-brand)]/10 flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-[var(--color-brand)]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
                />
              </svg>
            </div>
            <p className="text-base font-semibold text-[var(--color-brand-dark)]">
              No forums found
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Be the first one to start a discussion.
            </p>
          </div>
        ) : (
          /* FORUM GRID */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {forums?.map((forum) => (
              <ForumCard key={forum._id} forum={forum} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunityPage;