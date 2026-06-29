import { getTokenServer } from "../getTokenServer";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export async function getClassById(classId) {
  const token = await getTokenServer();

  const res = await fetch(`${SERVER_URL}/api/classes/${classId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch class: ${res.status}`);
  }

  return res.json();
}