import { getTokenServer } from "../getTokenServer";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export async function getPengingTrainerApplications() {
  const token = await getTokenServer();
  const res = await fetch(`${SERVER_URL}/api/trainer-applications/pending`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}
