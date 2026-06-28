// lib/statsConfig.js
import {
  BookOpen,
  Users,
  Heart,
  Building2,
  CalendarCheck,
} from "lucide-react";

export const getStatsConfig = (role, data) => {
  if (role === "admin") {
    return [
      {
        id: 1,
        title: "Total Users",
        value: data.totalUsers ?? 0,
        icon: Users,
        iconBg: "bg-indigo-50",
        iconColor: "text-indigo-600",
      },
      {
        id: 2,
        title: "Total Classes",
        value: data.totalClasses ?? 0,
        icon: Building2,
        iconBg: "bg-emerald-50",
        iconColor: "text-emerald-600",
      },
      {
        id: 3,
        title: "Total Booked Classes",
        value: data.totalBookedClasses ?? 0,
        icon: CalendarCheck,
        iconBg: "bg-amber-50",
        iconColor: "text-amber-600",
      },
    ];
  }

  if (role === "trainer") {
    return [
      {
        id: 1,
        title: "Total Classes Created",
        value: data.totalClassesCreated ?? 0,
        icon: BookOpen,
        iconBg: "bg-indigo-50",
        iconColor: "text-indigo-600",
      },
      {
        id: 2,
        title: "Total Students Enrolled",
        value: data.totalStudentsEnrolled ?? 0,
        icon: Users,
        iconBg: "bg-emerald-50",
        iconColor: "text-emerald-600",
      },
    ];
  }

  // member / user (default)
  return [
    {
      id: 1,
      title: "Total Booked Classes",
      value: data.totalBookedClasses ?? 0,
      icon: CalendarCheck,
      iconBg: "bg-indigo-50",
      iconColor: "text-indigo-600",
    },
    {
      id: 2,
      title: "Total Favorites",
      value: data.totalFavorites ?? 0,
      icon: Heart,
      iconBg: "bg-amber-50",
      iconColor: "text-amber-600",
    },
  ];
};