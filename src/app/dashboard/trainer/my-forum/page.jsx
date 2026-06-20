import React from "react";

import { getUser } from "@/app/lib/getUser";
import CommunityForum from "./CommunityForum";
import { getForumById } from "@/app/lib/api/getForumById";

export default async function forumPage() {
  const user = await getUser();

  // Not logged in — bounce back without ever calling getForumById.
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
    console.log("Fetched forum posts:", data);
    posts = Array.isArray(data) ? data : [];
  } catch (err) {
    console.error("Failed to load forum posts:", err);
    // Keep posts as [] so the page still renders; CommunityForum
    // will show the empty state rather than crashing.
  }

  return <CommunityForum posts={posts} />;
}
