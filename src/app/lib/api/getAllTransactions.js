import { getTokenServer } from "../getTokenServer";

export const getAllTransactions = async () => {
  const token = await getTokenServer();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/transactions`,
      {
         headers: {
            Authorization: `Bearer ${token}`,
          },
      },
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch transactions:", error);
    return [];
  }
};
