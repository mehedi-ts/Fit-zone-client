"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, Avatar, Link, Button } from "@heroui/react";
import {
  ArrowRight,
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  ShieldCheck,
  Dumbbell,
} from "lucide-react";

export default function ForumCard({ forum }) {
  const [likes, setLikes] = useState(245);
  const [dislikes, setDislikes] = useState(12);

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
    <Card className="max-w-sm w-full overflow-hidden p-0 hover:shadow-xl transition-all duration-300">
      {/* Featured Image */}
      <div className="relative w-full h-56">
        <Image
          src={image || "https://placehold.co/600x400"}
          alt={title || "Forum Post"}
          fill
          className="object-cover"
          sizes="(max-width:640px) 100vw, 384px"
        />

        {/* Glass Role Badge */}
        {roleConfig[role] && (
          <div
            className={`absolute top-4 left-4 z-10 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold shadow-lg ${roleConfig[role].className}`}
          >
            {roleConfig[role].icon}
            {roleConfig[role].label}
          </div>
        )}
      </div>

      {/* Header */}
      <div className="px-5 pt-5">
        <span className="text-orange-500 font-bold text-xs uppercase tracking-wider">
          Community Discussion
        </span>

        <h2 className="mt-2 text-xl font-bold leading-tight">
          {title || "Untitled Discussion"}
        </h2>
      </div>

      {/* Author */}
      <div className="px-5 pt-4 flex items-center gap-3">
        <Avatar name={authorName || "Anonymous"} size="sm" />

        <div>
          <p className="text-sm font-semibold">
            {authorName || "Anonymous User"}
          </p>

          <p className="text-xs text-default-500">
            {createdAt
              ? new Date(createdAt).toLocaleDateString()
              : "20 Jun 2026"}
          </p>
        </div>
      </div>

      {/* Description */}
      <div className="px-5 pt-4">
        <p className="text-sm text-default-600 leading-relaxed line-clamp-3">
          {description ||
            "Join the discussion and share your thoughts with the community."}
        </p>
      </div>

      {/* Stats */}
      <div className="px-5 pt-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            isIconOnly
            size="sm"
            variant="flat"
            onPress={() => setLikes((prev) => prev + 1)}
          >
            <ThumbsUp size={16} />
          </Button>

          <span className="text-sm font-medium">{likes}</span>

          <Button
            isIconOnly
            size="sm"
            variant="flat"
            onPress={() => setDislikes((prev) => prev + 1)}
          >
            <ThumbsDown size={16} />
          </Button>

          <span className="text-sm font-medium">{dislikes}</span>
        </div>

        <div className="flex items-center gap-1 text-default-500">
          <MessageCircle size={16} />
          <span className="text-sm">34</span>
        </div>
      </div>

      {/* Footer */}
      <div className="px-5 py-5">
        <Link
          href={`/community/${_id}`}
          className="group flex items-center gap-2 font-semibold text-orange-500"
        >
          Read More
          <ArrowRight
            size={16}
            className="transition-transform duration-200 group-hover:translate-x-1"
          />
        </Link>
      </div>
    </Card>
  );
}