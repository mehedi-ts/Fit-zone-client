const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export async function getAllClasses(search = "", category = "", page = 1, limit = 6) {
  const params = new URLSearchParams();

  if (search) {
    params.append("search", search);
  }

  if (category) {
    params.append("category", category);
  }

  params.append("page", page);
  params.append("limit", limit);

  const res = await fetch(
    `${SERVER_URL}/api/classes?${params.toString()}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch classes");
  }

  return res.json();
}