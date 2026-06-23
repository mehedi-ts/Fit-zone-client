import ApplyAsTrainerForm from "@/components/dashboardUi/member/ApplyAsTrainerForm";
import ApplicationStatusCard from "@/components/dashboardUi/member/TrainerApplicationStatusCard";
import React from "react";

const page = () => {
  return (
    <div>
      <ApplyAsTrainerForm />
      <ApplicationStatusCard
        status="Pending"
        experience={3}
        specialty="Yoga"
        createdAt={new Date()}
      />
    </div>
  );
};

export default page;
