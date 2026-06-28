import { getTokenServer } from "../getTokenServer";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;
export async function getTrainerClasses(trainerId) {
  const token = await getTokenServer();
  const res = await fetch(`${SERVER_URL}/api/classes/trainer/${trainerId}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  return res.json();
}
