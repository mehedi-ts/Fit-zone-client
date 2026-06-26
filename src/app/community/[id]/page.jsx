// page.jsx
import { getForumByForumId } from "@/app/lib/api/getForumByForumId";
import FinalForumsDetails from "@/components/forums/FinalForumsDetails";
import React from "react";

const page = async ({ params }) => {
  const { id } = await params;
  const data = await getForumByForumId(id);

  return (
    <div>
      <FinalForumsDetails post={data} />
    </div>
  );
};

export default page;
