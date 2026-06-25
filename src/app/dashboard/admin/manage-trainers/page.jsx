import { getActiveTrainers } from "@/app/lib/api/getActiveTrainers";
import ManageTrainersTable from "@/components/dashboardUi/adminUi/ManageTrainersTable";
import { revalidatePath } from "next/cache";
import React from "react";

const page = async () => {
  const trainers = await getActiveTrainers();

  const handleDemote = async (trainer) => {
    "use server";
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/trainers/${trainer._id}/demote`,
        {
          method: "PATCH",
        },
      );

      const data = await res.json();

      if (data.modifiedCount > 0) {
        revalidatePath("/dashboard/admin/manage-trainers");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <ManageTrainersTable trainers={trainers} handleDemote={handleDemote} />
    </div>
  );
};

export default page;
