import ForumCard from "@/components/shared/ForumCard";
import React from "react";
import { getAllForums } from "../lib/api/getAllForum";

const CommunityPage = async () => {
  const forums = await getAllForums();

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Community Forum</h1>
        <p className="text-default-500 mt-2">
          Join discussions, share experiences, and connect with fitness
          enthusiasts.
        </p>
      </div>

      {/* Forum Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {forums?.map((forum) => (
          <ForumCard key={forum._id} forum={forum} />
        ))}
      </div>

      {/* Empty State */}
      {forums?.length === 0 && (
        <div className="text-center py-20">
          <h3 className="text-xl font-semibold">No forums found</h3>
          <p className="text-default-500 mt-2">
            Be the first one to start a discussion.
          </p>
        </div>
      )}
    </div>
  );
};

export default CommunityPage;
