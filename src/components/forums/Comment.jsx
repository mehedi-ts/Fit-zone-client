"use client";

import { useState } from "react";
import Image from "next/image";
import { Trash2, Send } from "lucide-react";
import { addForumComment, deleteForumComment } from "@/app/lib/api/getForumComments";


function timeAgo(date) {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  const intervals = [
    { label: "y", secs: 31536000 },
    { label: "mo", secs: 2592000 },
    { label: "d", secs: 86400 },
    { label: "h", secs: 3600 },
    { label: "m", secs: 60 },
  ];
  for (const i of intervals) {
    const count = Math.floor(seconds / i.secs);
    if (count >= 1) return `${count}${i.label} ago`;
  }
  return "just now";
}

function Avatar({ name, image, size = 36 }) {
  const initials = name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  if (image) {
    return (
      <Image
        src={image}
        alt={name}
        width={size}
        height={size}
        className="rounded-full object-cover shrink-0"
        style={{ width: size, height: size }}
      />
    );
  }

  return (
    <div
      className="rounded-full bg-brand/10 text-brand flex items-center justify-center font-semibold shrink-0"
      style={{ width: size, height: size, fontSize: size * 0.38 }}
    >
      {initials}
    </div>
  );
}

export default function Comment({ forumId, user, initialComments }) {
  const [comments, setComments] = useState(initialComments);
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim() || !user || submitting) return;

    setSubmitting(true);
    try {
      const newComment = await addForumComment(forumId, {
        userId: user.id,
        userName: user.name,
        userImage: user.image,
        text,
      });
      setComments((prev) => [newComment, ...prev]);
      setText("");
    } catch (error) {
      // silently ignore — could add a toast here
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (commentId) => {
    try {
      await deleteForumComment(commentId, user.id);
      setComments((prev) => prev.filter((c) => c._id !== commentId));
    } catch (error) {
      // silently ignore — could add a toast here
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <h3 className="text-lg font-semibold text-brand-dark">
        Comments {comments.length > 0 && `(${comments.length})`}
      </h3>

      {/* ADD COMMENT */}
      {user ? (
        <form onSubmit={handleSubmit} className="flex items-start gap-3">
          <Avatar name={user.name} image={user.image} />
          <div className="flex-1 flex flex-col gap-2">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Share your thoughts..."
              rows={2}
              className="w-full resize-none border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/15"
            />
            <button
              type="submit"
              disabled={!text.trim() || submitting}
              className="self-end flex items-center gap-1.5 rounded-full bg-brand text-white text-sm font-medium px-4 py-1.5 transition hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Send size={14} />
              {submitting ? "Posting..." : "Post"}
            </button>
          </div>
        </form>
      ) : (
        <p className="text-sm text-gray-500 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3">
          Log in to join the discussion.
        </p>
      )}

      {/* COMMENT LIST */}
      {comments.length === 0 ? (
        <p className="text-sm text-gray-400 py-4">
          No comments yet. Be the first to share your thoughts.
        </p>
      ) : (
        <div className="flex flex-col gap-4">
          {comments.map((comment) => (
            <div key={comment._id} className="flex items-start gap-3">
              <Avatar name={comment.userName} image={comment.userImage} />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-gray-900">
                    {comment.userName}
                  </p>
                  <span className="text-xs text-gray-400">
                    {timeAgo(comment.createdAt)}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-0.5 leading-6">
                  {comment.text}
                </p>
              </div>

              {user?.id === comment.userId && (
                <button
                  onClick={() => handleDelete(comment._id)}
                  aria-label="Delete comment"
                  className="text-gray-300 hover:text-red-500 transition p-1"
                >
                  <Trash2 size={15} />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}