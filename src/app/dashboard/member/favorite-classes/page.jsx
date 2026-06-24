import { getFavoritesClasses } from "@/app/lib/api/getFavoritesClassesByUserId";
import { getUser } from "@/app/lib/getUser";
import FavoriteClassesTable from "@/components/dashboardUi/member/FavClassTable";
import React from "react";

const page = async () => {
  const user = await getUser();
  const favClass = await getFavoritesClasses(user?.id);

  return (
    <div>
      <FavoriteClassesTable favoriteClasses={favClass}></FavoriteClassesTable>
    </div>
  );
};

export default page;
