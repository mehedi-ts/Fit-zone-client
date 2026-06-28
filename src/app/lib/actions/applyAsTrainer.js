"use server";

import { getTokenClient } from "../getTokenClient";
import { getTokenServer } from "../getTokenServer";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;
export async function ApplyAsTrainer(formData) {
  const token = await getTokenServer();
  const res = await fetch(`${SERVER_URL}/api/apply-trainer`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(formData),
  });

  return res.json();
}
