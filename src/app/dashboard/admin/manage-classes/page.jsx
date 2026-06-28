import { getAllClasses } from "@/app/lib/api/getAllClasses";
import { getTokenServer } from "@/app/lib/getTokenServer";
import ManageClassesTable from "@/components/dashboardUi/adminUi/ManageClassesTable";
import { revalidatePath } from "next/cache";
import React from "react";

const page = async () => {
  const classes = await getAllClasses();

  const handleApprove = async (cls) => {
    "use server";
    const token = await getTokenServer();

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/classes/${cls._id}/approve`,
        {
          method: "PATCH",
           headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await res.json();

      if (data.modifiedCount > 0) {
        revalidatePath("/dashboard/admin/manage-classes");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleReject = async (cls) => {
    "use server";
    const token = await getTokenServer();
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/classes/${cls._id}/reject`,
        {
          method: "PATCH",
           headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await res.json();

      if (data.modifiedCount > 0) {
        revalidatePath("/dashboard/admin/manage-classes");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (cls) => {
    "use server";
    const token = await getTokenServer();
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/classes/${cls._id}`,
        {
          method: "DELETE",
           headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await res.json();

      if (data.deletedCount > 0) {
        revalidatePath("/dashboard/admin/manage-classes");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <ManageClassesTable
        classes={classes}
        handleApprove={handleApprove}
        handleReject={handleReject}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default page;
