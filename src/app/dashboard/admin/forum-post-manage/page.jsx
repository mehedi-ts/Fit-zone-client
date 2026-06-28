import { revalidatePath } from "next/cache";

import ManageForumPostsTable from "@/components/dashboardUi/adminUi/ManageForumPostsTable.";
import { getAllForums } from "@/app/lib/api/getAllForum";
import { getTokenServer } from "@/app/lib/getTokenServer";

const page = async () => {
  const posts = await getAllForums();

  const handleDelete = async (post) => {
    "use server";
    const token = await getTokenServer();
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/forums/${post._id}`,
        {
          method: "DELETE" ,
           headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const data = await res.json();
      if (data.deletedCount > 0) {
        revalidatePath("/dashboard/admin/manage-forum-posts");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <ManageForumPostsTable posts={posts} handleDelete={handleDelete} />
    </div>
  );
};

export default page;
