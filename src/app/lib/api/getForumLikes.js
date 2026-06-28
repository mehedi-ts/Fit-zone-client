const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export async function getForumLikes(forumId, userId = "") {
  const params = new URLSearchParams();
  if (userId) params.append("userId", userId);

  const res = await fetch(
    `${SERVER_URL}/api/forums/${forumId}/likes?${params.toString()}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch likes");
  }

  return res.json();
}

export async function toggleForumLike(forumId, userId, type) {
  const res = await fetch(`${SERVER_URL}/api/forums/${forumId}/likes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, type }),
  });

  if (!res.ok) {
    throw new Error("Failed to update vote");
  }

  return res.json();
}