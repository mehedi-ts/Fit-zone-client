"use client";

import { useState } from "react";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { toggleForumLike } from "@/app/lib/api/getForumLikes";


export default function LikeDislike({ forumId, user, initialLikes }) {
  const [likesCount, setLikesCount] = useState(initialLikes.likesCount);
  const [dislikesCount, setDislikesCount] = useState(
    initialLikes.dislikesCount
  );
  const [userVote, setUserVote] = useState(initialLikes.userVote);
  const [pending, setPending] = useState(false);

  const handleVote = async (type) => {
    if (!user) {
      // not logged in — nothing to vote with
      return;
    }
    if (pending) return;

    setPending(true);

    // optimistic update
    const prevVote = userVote;
    const prevLikes = likesCount;
    const prevDislikes = dislikesCount;

    if (prevVote === type) {
      // un-voting
      setUserVote(null);
      if (type === "like") setLikesCount((c) => c - 1);
      else setDislikesCount((c) => c - 1);
    } else {
      setUserVote(type);
      if (type === "like") {
        setLikesCount((c) => c + 1);
        if (prevVote === "dislike") setDislikesCount((c) => c - 1);
      } else {
        setDislikesCount((c) => c + 1);
        if (prevVote === "like") setLikesCount((c) => c - 1);
      }
    }

    try {
      const result = await toggleForumLike(forumId, user.id, type);
      // sync with server truth
      setLikesCount(result.likesCount);
      setDislikesCount(result.dislikesCount);
      setUserVote(result.userVote);
    } catch (error) {
      // revert on failure
      setUserVote(prevVote);
      setLikesCount(prevLikes);
      setDislikesCount(prevDislikes);
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => handleVote("like")}
        disabled={!user || pending}
        title={!user ? "Login to vote" : undefined}
        className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-medium border transition disabled:cursor-not-allowed disabled:opacity-50 ${
          userVote === "like"
            ? "bg-[var(--color-brand)] text-white border-[var(--color-brand)]"
            : "border-gray-200 text-gray-600 hover:bg-gray-50"
        }`}
      >
        <ThumbsUp size={15} fill={userVote === "like" ? "white" : "none"} />
        {likesCount}
      </button>

      <button
        onClick={() => handleVote("dislike")}
        disabled={!user || pending}
        title={!user ? "Login to vote" : undefined}
        className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-medium border transition disabled:cursor-not-allowed disabled:opacity-50 ${
          userVote === "dislike"
            ? "bg-gray-700 text-white border-gray-700"
            : "border-gray-200 text-gray-600 hover:bg-gray-50"
        }`}
      >
        <ThumbsDown
          size={15}
          fill={userVote === "dislike" ? "white" : "none"}
        />
        {dislikesCount}
      </button>
    </div>
  );
}