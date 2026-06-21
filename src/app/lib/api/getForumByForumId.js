const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;
export async function getForumByForumId(forumId) {
  const res = await fetch(`${SERVER_URL}/api/forums/${forumId}`);
  return res.json();
}
