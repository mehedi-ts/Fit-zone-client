const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;
export async function getTrainerClasses(trainerId) {
  const res = await fetch(`${SERVER_URL}/api/classes/trainer/${trainerId}`);
  return res.json();
}
