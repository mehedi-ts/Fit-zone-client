"use client";

import { useState } from "react";
import Image from "next/image";
import { Trash2, Send, Pencil, Reply, Check, X } from "lucide-react";
import { toast } from "react-toastify";
import {
  addForumComment,
  editForumComment,
  deleteForumComment,
} from "@/app/lib/api/getForumComments";

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
        className="rounded-full object-cover flex-shrink-0"
        style={{ width: size, height: size }}
      />
    );
  }

  return (
    <div
      className="rounded-full bg-[var(--color-brand)]/10 text-[var(--color-brand)] flex items-center justify-center font-semibold flex-shrink-0"
      style={{ width: size, height: size, fontSize: size * 0.38 }}
    >
      {initials}
    </div>
  );
}

// Shared helper — blocks any write action (post / reply / edit) for blocked users
function isBlocked(user) {
  if (user?.status === "blocked") {
    toast.error("Action restricted by Admin");
    return true;
  }
  return false;
}

function CommentItem({
  comment,
  replies,
  user,
  onDelete,
  onEdit,
  onReply,
  depth = 0,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(comment.text);
  const [savingEdit, setSavingEdit] = useState(false);

  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [sendingReply, setSendingReply] = useState(false);

  const isOwner = user?.id === comment.userId;

  const handleSaveEdit = async () => {
    if (!editText.trim() || savingEdit) return;
    if (isBlocked(user)) return;

    setSavingEdit(true);
    try {
      await onEdit(comment._id, editText.trim());
      setIsEditing(false);
    } finally {
      setSavingEdit(false);
    }
  };

  const handleCancelEdit = () => {
    setEditText(comment.text);
    setIsEditing(false);
  };

  const handleSendReply = async (e) => {
    e.preventDefault();
    if (!replyText.trim() || sendingReply) return;
    if (isBlocked(user)) return;

    setSendingReply(true);
    try {
      await onReply(comment._id, replyText.trim());
      setReplyText("");
      setIsReplying(false);
    } finally {
      setSendingReply(false);
    }
  };

  return (
    <div className={depth === 0 ? "" : "ml-12 mt-4"}>
      <div className="flex items-start gap-3">
        <Avatar name={comment.userName} image={comment.userImage} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium text-gray-900">
              {comment.userName}
            </p>
            <span className="text-xs text-gray-400">
              {timeAgo(comment.createdAt)}
            </span>
            {comment.edited && (
              <span className="text-xs text-gray-300">· edited</span>
            )}
          </div>

          {isEditing ? (
            <div className="mt-1.5 flex flex-col gap-2">
              <textarea
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                rows={2}
                autoFocus
                className="w-full resize-none border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm outline-none transition focus:border-[var(--color-brand)] focus:ring-2 focus:ring-[var(--color-brand)]/15"
              />
              <div className="flex items-center gap-2 self-end">
                <button
                  onClick={handleCancelEdit}
                  className="flex items-center cursor-pointer gap-1 text-xs font-medium text-gray-500 hover:text-gray-700 px-2 py-1"
                >
                  <X size={13} />
                  Cancel
                </button>
                <button
                  onClick={handleSaveEdit}
                  disabled={!editText.trim() || savingEdit}
                  className="flex items-center cursor-pointer gap-1 rounded-full bg-[var(--color-brand)] text-white text-xs font-medium px-3 py-1.5 transition hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Check size={13} />
                  {savingEdit ? "Saving..." : "Save"}
                </button>
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-600 mt-0.5 leading-6 whitespace-pre-wrap break-words">
              {comment.text}
            </p>
          )}

          {!isEditing && (
            <div className="flex items-center gap-4 mt-1">
              {user && depth === 0 && (
                <button
                  onClick={() => setIsReplying((r) => !r)}
                  className="flex items-center gap-1 cursor-pointer text-xs font-medium text-gray-400 hover:text-brand transition"
                >
                  <Reply size={13} />
                  Reply
                </button>
              )}
              {isOwner && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-1 cursor-pointer text-xs font-medium text-gray-400 hover:text-[var(--color-brand)] transition"
                >
                  <Pencil size={13} />
                  Edit
                </button>
              )}
            </div>
          )}

          {isReplying && (
            <form
              onSubmit={handleSendReply}
              className="mt-3 flex items-start gap-2.5"
            >
              <Avatar name={user?.name} image={user?.image} size={28} />
              <div className="flex-1 flex flex-col gap-2">
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder={`Reply to ${comment.userName}...`}
                  rows={2}
                  autoFocus
                  className="w-full resize-none border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm outline-none transition focus:border-[var(--color-brand)] focus:ring-2 focus:ring-[var(--color-brand)]/15"
                />
                <div className="flex items-center gap-2 self-end">
                  <button
                    type="button"
                    onClick={() => {
                      setIsReplying(false);
                      setReplyText("");
                    }}
                    className="text-xs font-medium text-gray-500 hover:text-gray-700 px-2 py-1"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={!replyText.trim() || sendingReply}
                    className="flex items-center gap-1 rounded-full bg-[var(--color-brand)] text-white text-xs font-medium px-3 py-1.5 transition hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <Send size={12} />
                    {sendingReply ? "Posting..." : "Reply"}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>

        {isOwner && !isEditing && (
          <button
            onClick={() => onDelete(comment._id)}
            aria-label="Delete comment"
            className="text-gray-300 hover:text-red-500 transition p-1"
          >
            <Trash2 size={15} />
          </button>
        )}
      </div>

      {/* Replies */}
      {replies?.length > 0 && (
        <div className="flex flex-col">
          {replies.map((reply) => (
            <CommentItem
              key={reply._id}
              comment={reply}
              replies={[]}
              user={user}
              onDelete={onDelete}
              onEdit={onEdit}
              onReply={onReply}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function Comment({ forumId, user, initialComments }) {
  const [comments, setComments] = useState(initialComments);
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const topLevel = comments.filter((c) => !c.parentId);
  const repliesByParent = comments.reduce((acc, c) => {
    if (c.parentId) {
      acc[c.parentId] = acc[c.parentId] || [];
      acc[c.parentId].push(c);
    }
    return acc;
  }, {});

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim() || !user || submitting) return;
    if (isBlocked(user)) return;

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
      toast.error(error.message || "Failed to post comment.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleReply = async (parentId, replyText) => {
    try {
      const newReply = await addForumComment(forumId, {
        userId: user.id,
        userName: user.name,
        userImage: user.image,
        text: replyText,
        parentId,
      });
      setComments((prev) => [newReply, ...prev]);
    } catch (error) {
      toast.error(error.message || "Failed to post reply.");
    }
  };

  const handleEdit = async (commentId, newText) => {
    try {
      const updated = await editForumComment(commentId, user.id, newText);
      setComments((prev) =>
        prev.map((c) => (c._id === commentId ? { ...c, ...updated } : c))
      );
    } catch (error) {
      toast.error("Failed to update comment.");
    }
  };

  const handleDelete = async (commentId) => {
    try {
      await deleteForumComment(commentId, user.id);
      // remove the comment itself and any direct replies to it
      setComments((prev) =>
        prev.filter((c) => c._id !== commentId && c.parentId !== commentId)
      );
    } catch (error) {
      toast.error("Failed to delete comment.");
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <h3 className="text-lg font-semibold text-[var(--color-brand-dark)]">
        Comments {topLevel.length > 0 && `(${topLevel.length})`}
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
              className="w-full resize-none border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-[var(--color-brand)]/15"
            />
            <button
              type="submit"
              disabled={!text.trim() || submitting}
              className="self-end flex items-center gap-1.5 rounded-full bg-[var(--color-brand)] text-white text-sm font-medium px-4 py-1.5 transition hover:opacity-90 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
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
      {topLevel.length === 0 ? (
        <p className="text-sm text-gray-400 py-4">
          No comments yet. Be the first to share your thoughts.
        </p>
      ) : (
        <div className="flex flex-col gap-5">
          {topLevel.map((comment) => (
            <CommentItem
              key={comment._id}
              comment={comment}
              replies={(repliesByParent[comment._id] || []).slice().sort(
                (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
              )}
              user={user}
              onDelete={handleDelete}
              onEdit={handleEdit}
              onReply={handleReply}
            />
          ))}
        </div>
      )}
    </div>
  );
}