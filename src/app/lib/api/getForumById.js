import { getTokenServer } from "../getTokenServer";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;
export async function getForumById(userId) {
  const token = await getTokenServer();
  const res = await fetch(`${SERVER_URL}/api/forums/user/${userId}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  return res.json();
}
