const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;
export async function getBookingByUserId(userId) {
  const res = await fetch(`${SERVER_URL}/api/bookings/user/${userId}`);
  return res.json();
}
