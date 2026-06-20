"use server";
const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;
export async function addClass(formData) {
  const res = await fetch(`${SERVER_URL}/api/classes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  return res.json();
}
