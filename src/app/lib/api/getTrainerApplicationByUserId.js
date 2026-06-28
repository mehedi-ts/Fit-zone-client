import { getTokenServer } from "../getTokenServer";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;
export async function getTrainerApplicationByUserId(userId) {
  const token = await getTokenServer();
  const res = await fetch(
    `${SERVER_URL}/api/trainer-application/user/${userId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return res.json();
}
