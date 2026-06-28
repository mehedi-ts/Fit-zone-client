import { getTokenServer } from "@/app/lib/getTokenServer";
import { getUser } from "@/app/lib/getUser";
import { StatisticsSection } from "@/components/dashboardUi/shared/StatisticsSection";
import { getStatsConfig } from "@/app/lib/statsConfig";
import DashboardProfile from "@/components/dashboardUi/dashboardProfile";

async function getAdminStats(token) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/admin-stats`,
    {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    },
  );
  return res.json();
}

export default async function AdminOverviewPage() {
  const user = await getUser();
  const token = await getTokenServer();

  const data = await getAdminStats(token);
  const stats = getStatsConfig("admin", data);

  return (
    <div>
      <StatisticsSection stats={stats} />

      <DashboardProfile></DashboardProfile>
    </div>
  );
}