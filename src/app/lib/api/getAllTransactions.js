export const getAllTransactions = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/transactions`,
      {
        cache: "no-store",
      },
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch transactions:", error);
    return [];
  }
};
