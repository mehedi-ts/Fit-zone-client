"use client";

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export const MemberCharts = ({ totalBooked = 0, favoriteClasses = [] }) => {
  // Generate the last 6 months for the X-axis
  const getLast6Months = () => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const currentMonthIndex = new Date().getMonth();
    const result = [];
    for (let i = 5; i >= 0; i--) {
      let index = currentMonthIndex - i;
      if (index < 0) index += 12;
      // We only have the total count, so we place the total in the current month
      // to avoid using fake "dummy" data for previous months.
      result.push({ name: months[index], value: i === 0 ? totalBooked : 0 });
    }
    return result;
  };

  const lineData = getLast6Months();

  const COLORS = ["var(--color-brand)", "#ff8c5a", "#ffaf8c", "#ffd1bd"];
  
  const pieDataMap = {};
  if (Array.isArray(favoriteClasses) && favoriteClasses.length > 0) {
    favoriteClasses.forEach((item) => {
      const label = item.category || item.className || "Class";
      pieDataMap[label] = (pieDataMap[label] || 0) + 1;
    });
  }

  const pieData = Object.keys(pieDataMap).length > 0
    ? Object.keys(pieDataMap).map((key, index) => ({
        name: key,
        value: pieDataMap[key],
        color: COLORS[index % COLORS.length]
      }))
    : [{ name: "None", value: 0, color: "var(--color-brand)" }];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
      {/* Line Chart Card */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 lg:col-span-2 flex flex-col h-80">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mb-1">
              Classes Booked
            </h3>
            <h4 className="text-lg font-bold text-gray-900">Last 6 Months</h4>
          </div>
        </div>

        <div className="flex-1 w-full min-h-0">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={lineData} margin={{ top: 10, right: 0, left: -25, bottom: 0 }}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-brand)" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="var(--color-brand)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#9ca3af", fontSize: 10 }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#9ca3af", fontSize: 10 }}
                ticks={[0, 3, 6, 9, 12]}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: "8px",
                  border: "none",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="var(--color-brand)"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorValue)"
                activeDot={{ r: 6, fill: "var(--color-brand)", stroke: "white", strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Pie Chart Card */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col h-80">
        <div className="mb-2">
          <h3 className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mb-1">
            By Category
          </h3>
          <h4 className="text-lg font-bold text-gray-900">Favorites Mix</h4>
        </div>

        <div className="flex-1 w-full flex items-center justify-center relative min-h-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius="50%"
                outerRadius="80%"
                paddingAngle={2}
                dataKey="value"
                stroke="none"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => [`${value}%`]}
                contentStyle={{
                  borderRadius: "8px",
                  border: "none",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          {/* Labels on pie segments would require custom label, we just use tooltip + legend */}
        </div>
        
        {/* Legend */}
        <div className="flex justify-center items-center gap-3 mt-4 flex-wrap">
          {pieData.map((item, index) => (
            <div key={index} className="flex items-center gap-1.5">
              <span 
                className="w-2 h-2 rounded-full" 
                style={{ backgroundColor: item.color }}
              ></span>
              <span className="text-[10px] font-medium text-gray-500">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
