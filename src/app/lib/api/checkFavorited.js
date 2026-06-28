import { getTokenServer } from "../getTokenServer";

export async function checkFavorited(classId, userId) {
  const token = await getTokenServer();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/favorites/check?classId=${classId}&userId=${userId}`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    },
  );

  if (!res.ok) return false;

  const data = await res.json();
  return data?.isFavorited || false;
}
