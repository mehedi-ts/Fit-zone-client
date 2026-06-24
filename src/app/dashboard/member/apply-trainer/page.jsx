import { getTrainerApplicationByUserId } from "@/app/lib/api/getTrainerApplicationByUserId";
import { getUser } from "@/app/lib/getUser";
import ApplyAsTrainerForm from "@/components/dashboardUi/member/ApplyAsTrainerForm";
import ApplicationStatusCard from "@/components/dashboardUi/member/TrainerApplicationStatusCard";
import React from "react";

const Page = async () => {
  const userinfo = await getUser();

  const trainerApplication = await getTrainerApplicationByUserId(
    userinfo?._id || userinfo?.id,
  );

  return (
    <div>
      {trainerApplication?._id ? (
        <ApplicationStatusCard
          status={trainerApplication.status}
          experience={trainerApplication.experience}
          specialty={trainerApplication.specialty}
          createdAt={trainerApplication.createdAt}
          feedback={trainerApplication.feedback}
        />
      ) : (
        <ApplyAsTrainerForm />
      )}
    </div>
  );
};

export default Page;
