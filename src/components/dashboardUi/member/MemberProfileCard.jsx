"use client";

import React from "react";
import Image from "next/image";
import { Flame } from "lucide-react";

export const MemberProfileCard = ({ userData, totalBooked = 0, favorites = 0 }) => {
  const joinDate = userData?.createdAt
    ? new Date(userData.createdAt).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      })
    : "";

  const name = userData?.name || "Member Name";
  
  // Checking if there is an image, otherwise use a placeholder or initials
  const hasImage = typeof userData?.image === "string" && userData.image.trim().length > 0;
  const initials = name?.slice(0, 2).toUpperCase() || "??";

  return (
    <div className="bg-[var(--color-brand-dark)] rounded-2xl p-6 shadow-sm w-full flex flex-col sm:flex-row items-center justify-between gap-6">
      <div className="flex items-center gap-5">
        {/* Avatar with Badge */}
        <div className="relative">
          <div className="w-20 h-20 rounded-2xl overflow-hidden bg-indigo-100 border-2 border-gray-700 flex items-center justify-center text-indigo-600 font-bold text-2xl relative">
            {hasImage ? (
              <Image
                src={userData.image}
                alt={name}
                fill
                sizes="80px"
                className="object-cover"
              />
            ) : (
              initials
            )}
          </div>
          {/* Flame Badge */}
          <div className="absolute -bottom-2 -right-2 bg-[var(--color-brand)] w-7 h-7 rounded-full flex items-center justify-center border-2 border-[var(--color-brand-dark)]">
            <Flame className="w-4 h-4 text-white" />
          </div>
        </div>

        {/* User Info */}
        <div className="flex flex-col gap-1">
          {joinDate && (
            <div className="text-[10px] font-bold tracking-wider text-[var(--color-brand)] uppercase">
              MEMBER SINCE {joinDate}
            </div>
          )}
          <h2 className="text-2xl font-bold text-white tracking-tight leading-none">
            {name}
          </h2>
          <div className="flex items-center gap-2 mt-1">
            <span className="bg-[var(--color-brand)]/20 text-[var(--color-brand)] text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
              Member
            </span>
          </div>
        </div>
      </div>

      {/* Stats Right */}
      <div className="flex items-center gap-8 pr-4">
        <div className="flex flex-col items-center gap-0.5">
          <span className="text-3xl font-extrabold text-white leading-none">{totalBooked}</span>
          <span className="text-xs text-gray-400 font-medium tracking-wide">Total</span>
        </div>
        <div className="flex flex-col items-center gap-0.5">
          <span className="text-3xl font-extrabold text-[var(--color-brand)] leading-none">{favorites}</span>
          <span className="text-xs text-gray-400 font-medium tracking-wide">Saved</span>
        </div>
      </div>
    </div>
  );
};
