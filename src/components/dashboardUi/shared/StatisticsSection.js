// components/shared/StatisticsSection.jsx
import React from "react";
import { StatCard } from "./StatCard";


export const StatisticsSection = ({ stats }) => {
  return (
    <div className="w-full mx-auto p-4">
      <h2 className="text-xs font-bold text-gray-400 tracking-wider uppercase mb-4">
        Statistics
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <StatCard key={stat.id} {...stat} />
        ))}
      </div>
    </div>
  );
};