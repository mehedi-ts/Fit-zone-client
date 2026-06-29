import React from "react";
import { Calendar, Mail, Shield, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { getUser } from "./../../app/lib/getUser";

const ProfileRow = ({ icon: Icon, label, value, isBadge, badgeTone = "emerald" }) => {
  const badgeStyles = {
    emerald: "bg-emerald-50 text-emerald-700",
    red: "bg-red-50 text-red-700",
    gray: "bg-gray-100 text-gray-600",
  };

  return (
    <div className="flex items-center justify-between py-3.5 border-b border-gray-100 last:border-0">
      <div className="flex items-center gap-3 text-gray-600">
        <Icon className="w-4 h-4 text-gray-500" />
        <span className="text-sm font-medium text-gray-600">{label}</span>
      </div>
      <div>
        {isBadge ? (
          <span
            className={`text-xs font-semibold px-2.5 py-1 rounded-full ${badgeStyles[badgeTone]}`}
          >
            {value}
          </span>
        ) : (
          <span className="text-sm font-bold text-gray-900">{value}</span>
        )}
      </div>
    </div>
  );
};

const roleBadgeStyles = {
  admin: {
    className: "bg-red-50 text-red-700 border-red-200",
    label: "ADMIN",
  },
  trainer: {
    className: "bg-emerald-50 text-emerald-700 border-emerald-200",
    label: "TRAINER",
  },
  member: {
    className: "bg-blue-50 text-blue-700 border-blue-200",
    label: "MEMBER",
  },
};

const formatJoinDate = (dateInput) => {
  if (!dateInput) return "—";
  const date = new Date(dateInput);
  return date.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
};

const DashboardProfile = async () => {
  const userData = await getUser();

  const roleKey = userData?.role?.toLowerCase();
  const currentRole =
    roleBadgeStyles[roleKey] || {
      className: "bg-gray-50 text-gray-700 border-gray-200",
      label: userData?.role?.toUpperCase() || "UNKNOWN",
    };

  const isActive = userData?.status === "active";
  const hasImage = typeof userData?.image === "string" && userData.image.trim().length > 0;
  const initials = userData?.name?.slice(0, 2).toUpperCase() || "??";

  return (
    <div className="w-full mx-auto md:p-4 mt-6 h-full flex flex-col">
      <h2 className="text-xs font-bold text-gray-400 tracking-wider uppercase mb-4">
        Profile
      </h2>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex-1">
        {/* Top Header Row */}
        <div className="flex items-center gap-4 pb-6 border-b border-gray-100">
          {/* Avatar */}
          <div className="relative w-14 h-14 shrink-0 rounded-full overflow-hidden bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 font-semibold text-lg">
            {hasImage ? (
              <Image
                src={userData.image}
                alt={userData.name || "Profile picture"}
                fill
                sizes="56px"
                className="object-cover"
              />
            ) : (
              initials
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col gap-0.5 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-lg font-bold text-gray-900 truncate">
                {userData?.name}
              </h3>
              <span
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full border text-[10px] font-bold tracking-wider uppercase ${currentRole.className}`}
              >
                <Shield className="w-3 h-3" />
                {currentRole.label}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-500 text-sm">
              <Mail className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">{userData?.email}</span>
            </div>
          </div>
        </div>

        {/* Details List */}
        <div className="mt-2">
          <ProfileRow
            icon={Calendar}
            label="Member since"
            value={formatJoinDate(userData?.createdAt)}
          />
          <ProfileRow
            icon={CheckCircle2}
            label="Account status"
            value={isActive ? "Active" : "Blocked"}
            isBadge
            badgeTone={isActive ? "emerald" : "red"}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardProfile;