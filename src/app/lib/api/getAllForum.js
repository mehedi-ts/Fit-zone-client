import { getTokenServer } from "../getTokenServer";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export async function getAllForums() {
  try {
    const res = await fetch(`${SERVER_URL}/api/forums`);

    return res.json();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
