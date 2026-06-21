"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, Avatar, Link, Button } from "@heroui/react";
import { ArrowRight, ThumbsUp, ThumbsDown, MessageCircle } from "lucide-react";

export default function ForumCard({ forum }) {
  const [likes, setLikes] = useState(245);
  const [dislikes, setDislikes] = useState(12);

  const { _id, title, description, image, authorName, authorEmail, createdAt } =
    forum;

  return (
    <Card className="max-w-sm w-full overflow-hidden p-0 hover:shadow-xl transition-all duration-300">
      {/* Featured Image */}
      <div className="relative w-full h-56">
        <Image
          src={image || "https://placehold.co/600x400"}
          alt={title || "Forum Post"}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, 384px"
        />
      </div>

      {/* Header */}
      <div className="px-5 pt-5">
        <span className="text-orange-500 font-bold text-xs uppercase tracking-wider">
          Community Discussion
        </span>

        <h2 className="text-xl font-bold mt-2 leading-tight">
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
            onPress={() => setLikes(likes + 1)}
          >
            <ThumbsUp size={16} />
          </Button>

          <span className="text-sm font-medium">{likes}</span>

          <Button
            isIconOnly
            size="sm"
            variant="flat"
            onPress={() => setDislikes(dislikes + 1)}
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
          className="text-orange-500 font-semibold flex items-center gap-2 group"
        >
          Read More
          <ArrowRight
            size={16}
            className="transition-transform group-hover:translate-x-1"
          />
        </Link>
      </div>
    </Card>
  );
}
