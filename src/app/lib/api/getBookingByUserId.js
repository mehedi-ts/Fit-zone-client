import { getTokenServer } from "../getTokenServer";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;
export async function getBookingByUserId(userId) {
  const token = await getTokenServer();
  const res = await fetch(`${SERVER_URL}/api/bookings/user/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
}
