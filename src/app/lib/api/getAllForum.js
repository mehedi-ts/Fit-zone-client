const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export async function getAllForums() {
  const res = await fetch(`${SERVER_URL}/api/forums`);
  return res.json();
}
