import { getTokenServer } from "../getTokenServer";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;
export async function getFavoritesClasses(userId) {
  const token = await getTokenServer();
  const res = await fetch(`${SERVER_URL}/favorites/${userId}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  return res.json();
}
