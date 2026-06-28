import { getTokenServer } from "../getTokenServer";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;
export async function getClassById(classId) {
  const token = await getTokenServer();
  const res = await fetch(`${SERVER_URL}/api/classes/${classId}`);
  return res.json();
}
