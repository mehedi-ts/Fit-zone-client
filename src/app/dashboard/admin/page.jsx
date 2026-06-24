import DashboardProfile from "@/components/dashboardUi/dashboardProfile";
import { StatisticsSection } from "@/components/dashboardUi/StatisticsSection";
import React from "react";

const page = () => {
  return (
    <div>
      <StatisticsSection></StatisticsSection>
      <DashboardProfile></DashboardProfile>
    </div>
  );
};

export default page;
