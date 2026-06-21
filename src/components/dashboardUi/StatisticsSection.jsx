import React from "react";
import { BookOpen, Users, TrendingUp } from "lucide-react";

// ১. Single Reusable Stat Card
export const StatCard = ({
  title,
  value,
  changeText,
  icon: Icon,
  iconBg,
  iconColor,
}) => {
  return (
    <div className="bg-white p-6 rounded-2xl flex flex-col gap-4 w-full  shadow-sm">
      {/* Icon Container */}
      <div
        className={`w-10 h-10 rounded-lg flex items-center justify-center ${iconBg}`}
      >
        <Icon className={`w-5 h-5 ${iconColor}`} />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-1">
        <span className="text-gray-500 text-sm font-medium">{title}</span>
        <span className="text-3xl font-bold text-gray-900">{value}</span>
      </div>
    </div>
  );
};

// ২. Main Statistics Group Component
export const StatisticsSection = () => {
  // ডাইনামিক ডাটা অ্যারে, যা আপনি API থেকেও নিয়ে আসতে পারবেন
  const statsData = [
    {
      id: 1,
      title: "Total classes created",
      value: "24",
      changeText: "+3 this month",
      icon: BookOpen,
      iconBg: "bg-indigo-50",
      iconColor: "text-indigo-600",
    },
    {
      id: 2,
      title: "Students enrolled",
      value: "312",
      changeText: "+18 this month",
      icon: Users,
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
    },
    {
      id: 3,
      title: "Total revenue",
      value: "$2,450",
      changeText: "+12% this month",
      icon: TrendingUp,
      iconBg: "bg-amber-50",
      iconColor: "text-amber-600",
    },
  ];

  return (
    <div className="w-full   mx-auto p-4">
      <h2 className="text-xs font-bold text-gray-400 tracking-wider uppercase mb-4">
        Statistics
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {statsData.map((stat) => (
          <StatCard key={stat.id} {...stat} />
        ))}
      </div>
    </div>
  );
};
