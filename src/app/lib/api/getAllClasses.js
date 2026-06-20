const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export async function getAllClasses() {
  const res = await fetch(`${SERVER_URL}/api/classes`);
  return res.json();
}
