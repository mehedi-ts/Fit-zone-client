import React from "react";
import { Calendar, Clock, Star, CheckCircle, Mail, Shield } from "lucide-react";
import { getUser } from "./../../app/lib/getUser";

const ProfileRow = ({ icon: Icon, label, value, isBadge }) => (
  <div className="flex items-center justify-between py-3.5 border-b border-gray-100 last:border-0">
    <div className="flex items-center gap-3 text-gray-600">
      <Icon className="w-4 h-4 text-gray-500" />
      <span className="text-sm font-medium text-gray-600">{label}</span>
    </div>
    <div>
      {isBadge ? (
        <span className="bg-emerald-50 text-emerald-700 text-xs font-semibold px-2.5 py-1 rounded-full">
          {value}
        </span>
      ) : (
        <span className="text-sm font-bold text-gray-900">{value}</span>
      )}
    </div>
  </div>
);

const DashboardProfile = async () => {
  const userData = await getUser(); // Fetch user data using the getUser function
  console.log("Fetched User Data:", userData); // Log the fetched user data for debugging
  const user = {
    name: "Alex Laurent",
    role: "TRAINER",
    email: "alex.laurent@platform.io",
    initials: "AL",
    memberSince: "March 2023",
    lastActive: "Today, 10:42 AM",
    rating: "4.8 / 5",
    status: "Active",
  };
  const roleBadgeStyles = {
  ADMIN: {
    className: "bg-red-50 text-red-700 border-red-200",
    label: "ADMIN",
  },
  TRAINER: {
    className: "bg-emerald-50 text-emerald-700 border-emerald-200",
    label: "TRAINER",
  },
  MEMBER: {
    className: "bg-blue-50 text-blue-700 border-blue-200",
    label: "MEMBER",
  },

  // যদি database-এ ছোট হাতের role থাকে
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

const currentRole =
  roleBadgeStyles[userData?.role] || {
    className: "bg-gray-50 text-gray-700 border-gray-200",
    label: userData?.role || "UNKNOWN",
  };
  return (
    <div className="w-full  mx-auto md:p-4 mt-6">
      <h2 className="text-xs font-bold text-gray-400 tracking-wider uppercase mb-4">
        Profile
      </h2>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        {/* Top Header Row */}
        <div className="flex items-center gap-4 pb-6 border-b border-gray-100">
          {/* Avatar Component */}
          <div className="w-14 h-14 rounded-full bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 font-semibold text-lg">
            {userData?.name?.slice(0, 2).toUpperCase()}
          </div>

          {/* Info */}
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-gray-900">
                {userData.name}
              </h3>
              <span
  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full border text-[10px] font-bold tracking-wider uppercase ${currentRole.className}`}
>
  <Shield className="w-3 h-3" />
  {currentRole.label}
</span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-500 text-sm">
              <Mail className="w-3.5 h-3.5" />
              <span>{userData.email}</span>
            </div>
          </div>
        </div>

        {/* Details List */}
        <div className="mt-2">
          <ProfileRow
            icon={Calendar}
            label="Member since"
            value={user.memberSince}
          />
          <ProfileRow
            icon={Clock}
            label="Last active"
            value={user.lastActive}
          />
          <ProfileRow icon={Star} label="Average rating" value={user.rating} />
          <ProfileRow
            icon={CheckCircle}
            label="Account status"
            value={user.status}
            isBadge={true}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardProfile;
