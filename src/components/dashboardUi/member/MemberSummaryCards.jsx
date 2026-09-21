"use client";

import React from "react";
import { Award, Heart } from "lucide-react";

export const MemberSummaryCards = ({ totalBooked = 0, favorites = 0 }) => {

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
      {/* Total Booked Card */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between h-40">
        <div className="flex justify-between items-start">
          <div className="w-10 h-10 rounded-full bg-[var(--color-brand)]/10 flex items-center justify-center text-[var(--color-brand)]">
            <Award className="w-5 h-5" />
          </div>
        </div>
        <div>
          <h3 className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mb-1">
            Total Booked
          </h3>
          <p className="text-4xl font-extrabold text-gray-900 leading-none">
            {totalBooked}
          </p>
        </div>
      </div>

      {/* Favorites Card */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between h-40">
        <div className="flex justify-between items-start">
          <div className="w-10 h-10 rounded-full bg-[var(--color-brand)]/10 flex items-center justify-center text-[var(--color-brand)]">
            <Heart className="w-5 h-5" />
          </div>
        </div>
        <div>
          <h3 className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mb-1">
            Favorites
          </h3>
          <p className="text-4xl font-extrabold text-gray-900 leading-none">
            {favorites}
          </p>
        </div>
      </div>
    </div>
  );
};
