// components/shared/StatCard.jsx
import React from "react";

export const StatCard = ({ title, value, icon: Icon, iconBg, iconColor }) => {
  return (
    <div className="bg-white p-6 rounded-2xl flex flex-col gap-4 w-full shadow-sm">
      <div
        className={`w-10 h-10 rounded-lg flex items-center justify-center ${iconBg}`}
      >
        <Icon className={`w-5 h-5 ${iconColor}`} />
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-gray-500 text-sm font-medium">{title}</span>
        <span className="text-3xl font-bold text-gray-900">{value}</span>
      </div>
    </div>
  );
};