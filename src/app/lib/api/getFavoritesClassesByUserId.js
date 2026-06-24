const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;
export async function getFavoritesClasses(userId) {
  const res = await fetch(`${SERVER_URL}/favorites/${userId}`);
  return res.json();
}
