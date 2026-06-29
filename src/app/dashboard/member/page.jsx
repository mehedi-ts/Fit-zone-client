import { getTokenServer } from "@/app/lib/getTokenServer";
import { getUser } from "@/app/lib/getUser";
import { getStatsConfig } from "@/app/lib/statsConfig";
import { getTrainerApplicationByUserId } from "@/app/lib/api/getTrainerApplicationByUserId";
import DashboardProfile from "@/components/dashboardUi/dashboardProfile";
import ApplicationStatusCard from "@/components/dashboardUi/member/TrainerApplicationStatusCard";
import { StatisticsSection } from "@/components/dashboardUi/shared/StatisticsSection";
import Link from "next/link";
import { UserPlus } from "lucide-react";

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

  const data = await getMemberStats(user?.id || "", token);
  const stats = getStatsConfig("member", data);

  const trainerApplication = await getTrainerApplicationByUserId(
    user?._id || user?.id,
  );

  return (
    <div>
      <StatisticsSection stats={stats} />

      <div className="">
        <DashboardProfile />

        {/* {trainerApplication?._id ? (
          <ApplicationStatusCard
            status={trainerApplication.status}
            experience={trainerApplication.experience}
            specialty={trainerApplication.specialty}
            createdAt={trainerApplication.createdAt}
            feedback={trainerApplication.feedback}
          />
        ) : (
          <div className="w-full mx-auto md:p-4 mt-6">
            <h2 className="text-xs font-bold text-gray-400 tracking-wider uppercase mb-4">
              Become a Trainer
            </h2>

            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col items-center text-center gap-3 h-full justify-center">
              <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
                <UserPlus className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900">
                  Ready to lead classes?
                </h3>
                <p className="text-xs text-gray-500 mt-1 max-w-[240px]">
                  Apply to become a trainer and start creating your own
                  fitness classes.
                </p>
              </div>
              <Link
                href="/dashboard/member/apply-trainer"
                className="mt-1 inline-flex items-center justify-center rounded-xl bg-[var(--color-brand)] text-white text-sm font-semibold px-5 py-2.5 hover:opacity-90 transition-opacity"
              >
                Apply as Trainer
              </Link>
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
}