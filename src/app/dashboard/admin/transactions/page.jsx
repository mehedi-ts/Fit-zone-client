import { getAllTransactions } from "@/app/lib/api/getAllTransactions";
import TransactionsTable from "@/components/dashboardUi/adminUi/TransactionsTable";

const page = async () => {
  const transactions = await getAllTransactions();

  return (
    <div>
      <TransactionsTable transactions={transactions} />
    </div>
  );
};

export default page;
