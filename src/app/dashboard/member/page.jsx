

import { getTokenServer } from "@/app/lib/getTokenServer";
import { getUser } from "@/app/lib/getUser";
import { getStatsConfig } from "@/app/lib/statsConfig";
import DashboardProfile from "@/components/dashboardUi/dashboardProfile";
import { StatisticsSection } from "@/components/dashboardUi/shared/StatisticsSection";

// আপনার auth helper অনুযায়ী import করুন (session/getUser ইত্যাদি)
// import { getCurrentUser } from "@/lib/auth";

async function getMemberStats(userId, token) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/member-stats/${userId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    },
  );
  return res.json();
}

export default async function MemberOverviewPage() {
  const user = await getUser();
  const token = await getTokenServer();
   

  const data = await getMemberStats( user?.id || "", token);
  const stats = getStatsConfig("member", data);

  return (
    <div>
      <StatisticsSection stats={stats} />

      <DashboardProfile></DashboardProfile>
    </div>
  );
}