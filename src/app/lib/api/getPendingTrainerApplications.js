const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export async function getPengingTrainerApplications() {
  const res = await fetch(`${SERVER_URL}/api/trainer-applications/pending`);
  return res.json();
}
