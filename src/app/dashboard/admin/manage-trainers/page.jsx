
import { getActiveTrainers } from "@/app/lib/api/getActiveTrainers";
import { getTokenServer } from "@/app/lib/getTokenServer";
import ManageTrainersTable from "@/components/dashboardUi/adminUi/ManageTrainersTable";
import { revalidatePath } from "next/cache";
export const dynamic = "force-dynamic";

const page = async () => {
  const trainers = await getActiveTrainers();

  const handleDemote = async (trainer) => {
    "use server"
    const token = await getTokenServer();
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/trainers/${trainer._id}/demote`,
        {
          method: "PATCH",
           headers: {
            Authorization: `Bearer ${token}`,
          },
         
        },
      );

      const data = await res.json();

      if (data.modifiedCount > 0) {
        revalidatePath("/dashboard/admin/manage-trainers");
      }
    } catch (error) {
      // console.error(error);
    }
  };

  return (
    <div>
      <ManageTrainersTable trainers={trainers} handleDemote={handleDemote} />
    </div>
  );
};

export default page;
