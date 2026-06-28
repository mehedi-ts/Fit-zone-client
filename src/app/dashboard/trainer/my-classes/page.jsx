import { getTrainerClasses } from "@/app/lib/api/getTrainerClasses";
import { getTokenServer } from "@/app/lib/getTokenServer";

import { getUser } from "@/app/lib/getUser";
import { TrainerClassTable } from "@/components/shared/TrainerClassTable";
import { revalidatePath } from "next/cache";


async function updateClass(updatedClass) {
  "use server";
  const token = await getTokenServer();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/classes/${updatedClass._id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedClass),
    },
  );

  const data = await res.json();

  if (data.modifiedCount > 0) {
    revalidatePath("/trainer-dashboard/classes");
  }

  return data;
}

async function deleteClass(classId) {
  "use server";
  const token = await getTokenServer();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/classes/${classId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const data = await res.json();

  if (data.deletedCount > 0) {
    revalidatePath("/trainer-dashboard/classes");
  }

  return data;
}

const page = async () => {
  const user = await getUser();
  const trainerId = `TR-${user?.id}`;
  const trainerClasses = await getTrainerClasses(trainerId);

  return (
    <div>
      <TrainerClassTable
        trainerClasses={trainerClasses}
        onUpdateClass={updateClass}
        onDeleteClass={deleteClass}
      />
    </div>
  );
};

export default page;