export const getActiveTrainers = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/trainers`,
      {
        cache: "no-store",
      },
    );

    if (!res.ok) {
      throw new Error("Failed to fetch trainers");
    }

    return res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};
