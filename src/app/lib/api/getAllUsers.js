const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export async function getAllUsers() {
  const res = await fetch(`${SERVER_URL}/api/users`);
  return res.json();
}
