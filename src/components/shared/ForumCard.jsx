"use client";

import Image from "next/image";
import { Card, Link } from "@heroui/react";
import {
  ArrowRight,
  ShieldCheck,
  Dumbbell,
  CalendarDays,
  UserRound,
} from "lucide-react";

export default function ForumCard({ forum }) {
  const {
    _id,
    title,
    description,
    image,
    authorName,
    authorRole,
    createdAt,
  } = forum;

  const role = authorRole?.toLowerCase();

  const roleConfig = {
    admin: {
      label: "Admin",
      icon: <ShieldCheck size={14} />,
      className:
        "bg-red-500/20 text-red-100 border border-red-300/30 backdrop-blur-md",
    },
    trainer: {
      label: "Trainer",
      icon: <Dumbbell size={14} />,
      className:
        "bg-emerald-500/20 text-emerald-100 border border-emerald-300/30 backdrop-blur-md",
    },
  };

  return (
    <Card className="max-w-sm w-full overflow-hidden p-0 flex flex-col hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
      {/* Featured Image */}
      <div className="relative w-full h-56">
        <Image
          src={image || "https://placehold.co/600x400"}
          alt={title || "Forum Post"}
          fill
          className="object-cover"
          sizes="(max-width:640px) 100vw, 384px"
        />

        {/* Role Badge */}
        {roleConfig[role] && (
          <div
            className={`absolute top-4 left-4 z-10 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold shadow-lg ${roleConfig[role].className}`}
          >
            {roleConfig[role].icon}
            {roleConfig[role].label}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col px-5 pt-5">
        <span className="text-orange-500 font-bold text-xs uppercase tracking-wider">
          Community Discussion
        </span>

        <h2 className="mt-2 text-xl font-bold leading-tight line-clamp-2 min-h-[56px]">
          {title || "Untitled Discussion"}
        </h2>

        <p className="mt-4 text-sm text-default-600 leading-relaxed line-clamp-3 min-h-[72px]">
          {description ||
            "Join the discussion and share your thoughts with the community."}
        </p>
      </div>

      {/* Author */}
      <div className="px-5 pt-5">
        <div className="flex items-center justify-between rounded-2xl border border-default-200 bg-default-50 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 text-orange-500">
              <UserRound size={22} strokeWidth={2.2} />
            </div>

            <div>
              <p className="text-[11px] uppercase tracking-widest text-default-500">
                Author
              </p>

              <p className="text-sm font-semibold text-default-800">
                {authorName || "Anonymous User"}
              </p>
            </div>
          </div>

          <div className="text-right">
            <div className="mb-1 flex items-center justify-end gap-1 text-default-400">
              <CalendarDays size={14} />
              <span className="text-xs">Published</span>
            </div>

            <p className="text-xs font-medium text-default-600">
              {createdAt
                ? new Date(createdAt).toLocaleDateString()
                : "20 Jun 2026"}
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-5 py-5 mt-auto">
        <Link
          href={`/community/${_id}`}
          className="group flex items-center justify-between px-4 py-3 font-semibold text-orange-600 transition-all"
        >
          <span>Read More</span>

          <ArrowRight
            size={18}
            className="transition-transform duration-200 group-hover:translate-x-1"
          />
        </Link>
      </div>
    </Card>
  );
}