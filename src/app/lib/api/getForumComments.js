const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export async function getForumComments(forumId) {
  const res = await fetch(`${SERVER_URL}/api/forums/${forumId}/comments`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch comments");
  }

  return res.json();
}

export async function addForumComment(forumId, { userId, userName, userImage, text }) {
  const res = await fetch(`${SERVER_URL}/api/forums/${forumId}/comments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, userName, userImage, text }),
  });

  if (!res.ok) {
    throw new Error("Failed to add comment");
  }

  return res.json();
}

export async function deleteForumComment(commentId, userId) {
  const res = await fetch(`${SERVER_URL}/api/forums/comments/${commentId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId }),
  });

  if (!res.ok) {
    throw new Error("Failed to delete comment");
  }

  return res.json();
}