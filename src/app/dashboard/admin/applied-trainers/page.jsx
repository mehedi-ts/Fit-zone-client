import { getPengingTrainerApplications } from "@/app/lib/api/getPendingTrainerApplications";
import { getTokenServer } from "@/app/lib/getTokenServer";
import PendingTrainerApplicationsTable from "@/components/dashboardUi/adminUi/PendingTrainerApplicationsTable";
import { revalidatePath } from "next/cache";
import React from "react";

const page = async () => {
  const applications = await getPengingTrainerApplications();
  console.log(applications, "this is applications");

  const handleApprove = async (application) => {
    "use server";
    const token = await getTokenServer();
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/trainer-applications/${application._id}/approve`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await res.json();

      if (data.modifiedCount > 0) {
        revalidatePath("/dashboard/admin/pending-trainer-applications");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleReject = async (application, feedback) => {
    "use server";
    const token = await getTokenServer();
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/trainer-applications/${application._id}/reject`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ feedback }),
        },
      );

      const data = await res.json();

      if (data.modifiedCount > 0) {
        revalidatePath("/dashboard/admin/pending-trainer-applications");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <PendingTrainerApplicationsTable
        applications={applications}
        handleApprove={handleApprove}
        handleReject={handleReject}
      />
    </div>
  );
};

export default page;
