const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export async function checkBooked(classId, userId) {
  const res = await fetch(
    `${SERVER_URL}/api/check-booked?classId=${classId}&userId=${userId}`,
  );

  if (!res.ok) {
    console.error("checkBooked failed:", res.status);
    return false;
  }

  const data = await res.json();
  return Boolean(data.alreadyBooked); // adjust "alreadyBooked" to match your API's actual field name
}
