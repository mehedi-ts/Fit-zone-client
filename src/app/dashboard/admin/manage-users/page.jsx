import { getAllUsers } from "@/app/lib/api/getAllUsers";
import { getTokenServer } from "@/app/lib/getTokenServer";
import ManageUsersTable from "@/components/dashboardUi/adminUi/ManageUsersTable";
import { revalidatePath } from "next/cache";
import React from "react";

const page = async () => {
  const users = await getAllUsers();
  const handleBlock = async (user) => {
    "use server";
    const token = await getTokenServer();
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/users/${user._id}/block`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await res.json();

      if (data.modifiedCount > 0) {
        revalidatePath("/dashboard/admin/manage-users");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleUnblock = async (user) => {
    "use server";
    const token = await getTokenServer();
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/users/${user._id}/unblock`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await res.json();

      if (data.modifiedCount > 0) {
        revalidatePath("/dashboard/admin/manage-users");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleMakeAdmin = async (user) => {
    "use server";
    const token = await getTokenServer();
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/users/${user._id}/make-admin`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await res.json();

      if (data.modifiedCount > 0) {
        revalidatePath("/dashboard/admin/manage-users");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <ManageUsersTable
        users={users}
        handleBlock={handleBlock}
        handleUnblock={handleUnblock}
        handleMakeAdmin={handleMakeAdmin}
      />
    </div>
  );
};

export default page;
