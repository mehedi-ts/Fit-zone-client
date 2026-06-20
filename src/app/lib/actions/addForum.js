"use server";
const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;
export async function addForum(formData) {
  const res = await fetch(`${SERVER_URL}/api/forums`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  return res.json();
}
