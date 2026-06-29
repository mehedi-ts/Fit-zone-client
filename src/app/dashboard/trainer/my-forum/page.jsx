import { revalidatePath } from "next/cache";
import { getTokenServer } from "@/app/lib/getTokenServer";
import { getUser } from "@/app/lib/getUser";
import CommunityForum from "./CommunityForum";
import { getForumById } from "@/app/lib/api/getForumById";

export default async function forumPage() {
  const user = await getUser();

  if (!user) {
    return (
      <div className="min-h-screen flex justify-center items-center py-10 px-4">
        <p className="text-sm text-slate-400">
          Please log in to view your community posts.
        </p>
      </div>
    );
  }

  let posts = [];
  try {
    const data = await getForumById(user.id);
    posts = Array.isArray(data) ? data : [];
  } catch (err) {
    console.error("Failed to load forum posts:", err);
  }

  const handleDelete = async (post) => {
    "use server";
    const token = await getTokenServer();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/forums/${post._id}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const data = await res.json();

    if (!res.ok || data.deletedCount === 0) {
      throw new Error("Failed to delete post");
    }

    revalidatePath("/dashboard/trainer/forum");
  };

  return <CommunityForum posts={posts} handleDelete={handleDelete} />;
}