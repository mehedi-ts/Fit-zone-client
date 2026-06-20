const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;
export async function getForumById(userId) {
  const res = await fetch(`${SERVER_URL}/api/forums/user/${userId}`);
  return res.json();
}
