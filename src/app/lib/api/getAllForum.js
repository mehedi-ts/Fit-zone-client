const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export async function getAllForums() {
  try {
    const res = await fetch(`${SERVER_URL}/api/forums`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch forums");
    }

    return await res.json();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}