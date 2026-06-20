import { getTrainerClasses } from "@/app/lib/api/getTrainerClasses";
import { getUser } from "@/app/lib/getUser";
import { TrainerClassTable } from "@/components/shared/TrainerClassTable";
import React from "react";

const page = async () => {
  const user = await getUser();
  const trainerId = `TR-${user?.id}`;
  const trainerClasses = await getTrainerClasses(trainerId);
  console.log("Trainer Classes:", trainerClasses);
  return (
    <div>
      <TrainerClassTable trainerClasses={trainerClasses} />
    </div>
  );
};

export default page;
