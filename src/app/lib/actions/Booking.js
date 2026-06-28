"use server";

import { getTokenServer } from "../getTokenServer";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;
export async function bookClass(formData) {
  const token = await getTokenServer();
  const res = await fetch(`${SERVER_URL}/api/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(formData),
  });
  return res.json();
}
