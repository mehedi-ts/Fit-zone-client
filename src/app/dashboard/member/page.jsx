import { getTokenServer } from "@/app/lib/getTokenServer";
import { getUser } from "@/app/lib/getUser";
import { getStatsConfig } from "@/app/lib/statsConfig";
import { getTrainerApplicationByUserId } from "@/app/lib/api/getTrainerApplicationByUserId";
import { getFavoritesClasses } from "@/app/lib/api/getFavoritesClassesByUserId";
import ApplicationStatusCard from "@/components/dashboardUi/member/TrainerApplicationStatusCard";
import { MemberProfileCard } from "@/components/dashboardUi/member/MemberProfileCard";
import { MemberSummaryCards } from "@/components/dashboardUi/member/MemberSummaryCards";
import { MemberCharts } from "@/components/dashboardUi/member/MemberCharts";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

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
  
  const totalBooked = stats?.find((s) => s.id === 1)?.value ?? 0;
  const favorites = stats?.find((s) => s.id === 2)?.value ?? 0;

  const trainerApplication = await getTrainerApplicationByUserId(
    user?._id || user?.id,
  );

  const favoriteClasses = await getFavoritesClasses(user?.id);

  return (
    <div className="space-y-6">
      {/* Profile Card */}
      <MemberProfileCard userData={user} totalBooked={totalBooked} favorites={favorites} />

      {/* Summary Cards */}
      <MemberSummaryCards totalBooked={totalBooked} favorites={favorites} />

      {/* Charts Row */}
      <MemberCharts totalBooked={totalBooked} favoriteClasses={favoriteClasses} />

      {/* Trainer Application Banner */}
      {trainerApplication?._id ? (
        <ApplicationStatusCard
          status={trainerApplication.status}
          experience={trainerApplication.experience}
          specialty={trainerApplication.specialty}
          createdAt={trainerApplication.createdAt}
          feedback={trainerApplication.feedback}
        />
      ) : (
        <div className="w-full relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#ff6b2b] via-[#ff5a1f] to-[#593f36] p-8 shadow-sm text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col gap-2 z-10">
            <span className="text-[10px] font-bold tracking-widest text-[#ffceb3] uppercase">
              Limited spots open
            </span>
            <div className="flex flex-col">
              <h2 className="text-2xl font-bold tracking-tight">
                Share your expertise.
              </h2>
              <h2 className="text-2xl font-bold tracking-tight text-white mb-2">
                Become a FitZone Trainer.
              </h2>
            </div>
            <p className="text-sm text-[#ffceb3] max-w-md">
              Join 200+ certified trainers. Set your own classes, grow your community.
            </p>
          </div>

          <Link
            href="/dashboard/member/apply-trainer"
            className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-white text-[#ff5a1f] text-sm font-bold px-6 py-3 hover:bg-gray-50 transition-colors z-10 shadow-sm"
          >
            Apply Now
            <ArrowRight className="w-4 h-4" />
          </Link>
          
          {/* Background decorative elements */}
          <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-black/20 to-transparent pointer-events-none rounded-r-2xl"></div>
        </div>
      )}
    </div>
  );
}