const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;
export async function getTrainerApplicationByUserId(userId) {
  const res = await fetch(
    `${SERVER_URL}/api/trainer-application/user/${userId}`,
  );
  return res.json();
}
