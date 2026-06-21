"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Bookmark,
  Clock,
  BarChart3,
  Calendar,
  Tag,
  ArrowRight,
  Check,
  Dumbbell,
  HeartPulse,
  Flame,
  Activity,
} from "lucide-react";

import { useUser } from "@/app/lib/getUserClient";
import BookingModal from "./BookongModal";

const DAY_LABELS = {
  sun: "Sun",
  mon: "Mon",
  tue: "Tue",
  wed: "Wed",
  thu: "Thu",
  fri: "Fri",
  sat: "Sat",
};

const CATEGORY_META = {
  strength: { label: "Strength", icon: Dumbbell, tone: "text-brand" },
  cardio: { label: "Cardio", icon: HeartPulse, tone: "text-brand" },
  combat: { label: "Combat", icon: Flame, tone: "text-brand" },
  yoga: { label: "Yoga", icon: Activity, tone: "text-brand" },
};

function formatTime(time24) {
  if (!time24) return "";
  const [hourStr, minute] = time24.split(":");
  const hour = parseInt(hourStr, 10);
  const period = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 === 0 ? 12 : hour % 12;
  return `${hour12}:${minute} ${period}`;
}

function formatSchedule(schedule) {
  if (!Array.isArray(schedule) || schedule.length === 0) return "Flexible";
  return schedule.map((day) => DAY_LABELS[day] || day).join(", ");
}

function initials(name) {
  if (!name) return "?";
  return name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function ClassDetails({ classData, isBooked }) {
  const user = useUser();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [alreadyBooked, setAlreadyBooked] = useState(isBooked);

  const {
    _id,
    trainerName,
    className,
    image,
    category,
    difficulty,
    duration,
    schedule,
    startTime,
    price,
    description,
  } = classData;

  const categoryMeta =
    CATEGORY_META[category?.toLowerCase()] || CATEGORY_META.strength;
  const CategoryIcon = categoryMeta.icon;
  const hasImage = typeof image === "string" && image.trim().length > 0;

  // Called by BookingModal after a confirmed booking, so the UI
  // flips to "Already Booked" without requiring a page refresh.
  const handleBookingSuccess = () => {
    setAlreadyBooked(true);
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="bg-white border border-slate-100 shadow-sm rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">
        {/* Image side */}
        <div className="relative h-72 lg:h-auto bg-slate-100">
          {hasImage ? (
            <Image
              src={image}
              alt={className}
              fill
              unoptimized
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-300">
              <Dumbbell size={40} />
            </div>
          )}

          {/* Top bar: back + bookmark */}
          <div className="absolute inset-x-0 top-0 p-5 flex items-center justify-between">
            <Link
              href="/classes"
              className="inline-flex items-center gap-1.5 rounded-full bg-white/90 backdrop-blur px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-white transition-colors"
            >
              <ArrowLeft size={16} />
              Back to Classes
            </Link>
            <button
              type="button"
              aria-label="Save class"
              className="h-10 w-10 rounded-full bg-white/90 backdrop-blur shadow-sm flex items-center justify-center text-slate-600 hover:text-brand transition-colors"
            >
              <Bookmark size={18} />
            </button>
          </div>

          {/* Difficulty pill */}
          {difficulty && (
            <div className="absolute left-5 bottom-5">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 backdrop-blur px-4 py-1.5 text-xs font-semibold text-brand shadow-sm capitalize">
                <Flame size={13} />
                {difficulty}
              </span>
            </div>
          )}

          {/* Trainer badge */}
          {trainerName && (
            <div className="absolute right-5 bottom-5">
              <div className="flex items-center gap-2.5 rounded-full bg-white/95 backdrop-blur pl-2 pr-4 py-2 shadow-sm">
                <div className="h-8 w-8 rounded-full bg-brand text-white text-xs font-semibold flex items-center justify-center shrink-0">
                  {initials(trainerName)}
                </div>
                <div className="leading-tight">
                  <p className="text-[10px] text-slate-400">With</p>
                  <p className="text-xs font-semibold text-slate-800">
                    {trainerName}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Details side */}
        <div className="p-6 sm:p-8 flex flex-col gap-6">
          <div>
            <span
              className={`inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider ${categoryMeta.tone}`}
            >
              <CategoryIcon size={14} />
              {categoryMeta.label}
            </span>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
              {className}
            </h1>
            {description && (
              <p className="mt-3 text-sm text-slate-500 leading-relaxed">
                {description}
              </p>
            )}
          </div>

          {/* Stats */}
          <div className="flex items-center gap-6 py-1">
            <div className="flex items-center gap-2.5">
              <Clock size={18} className="text-brand" />
              <div className="leading-tight">
                <p className="text-sm font-semibold text-slate-800">
                  {duration}
                </p>
                <p className="text-xs text-slate-400">Duration</p>
              </div>
            </div>
            <div className="w-px h-9 bg-slate-200" />
            <div className="flex items-center gap-2.5">
              <BarChart3 size={18} className="text-brand" />
              <div className="leading-tight capitalize">
                <p className="text-sm font-semibold text-slate-800">
                  {difficulty}
                </p>
                <p className="text-xs text-slate-400">Level</p>
              </div>
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Schedule */}
          <div className="flex items-start gap-2.5">
            <Calendar size={18} className="text-brand mt-0.5 shrink-0" />
            <div className="leading-tight">
              <p className="text-sm font-semibold text-slate-800">
                {formatSchedule(schedule)}
                {startTime && (
                  <span className="text-slate-500 font-normal">
                    {" "}
                    · {formatTime(startTime)}
                  </span>
                )}
              </p>
              <p className="text-xs text-slate-400">Weekly Schedule</p>
            </div>
          </div>

          {/* Fee + CTA */}
          <div className="flex items-center justify-between gap-4 rounded-2xl border border-slate-100 bg-slate-50/60 p-4">
            <div className="flex items-center gap-2.5">
              <Tag size={18} className="text-slate-400" />
              <div className="leading-tight">
                <p className="text-xs text-slate-400">Class Fee</p>
                <p className="text-2xl font-bold text-brand">
                  ৳{Number(price).toLocaleString("en-BD")}
                </p>
              </div>
            </div>

            {alreadyBooked ? (
              <span className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 font-medium px-6 py-3 rounded-xl border border-emerald-200">
                <Check size={16} />
                Already Booked
              </span>
            ) : (
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-2 bg-brand text-white font-medium px-6 py-3 rounded-xl shadow-sm shadow-orange-500/20 hover:opacity-90 transition-opacity"
              >
                Book Class
                <ArrowRight size={16} />
              </button>
            )}
          </div>

          {/* About */}
          {description && (
            <div className="rounded-2xl bg-orange-50/60 border border-orange-100 p-5">
              <h2 className="text-sm font-semibold text-slate-800">
                About this class
              </h2>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                {description}
              </p>
            </div>
          )}
        </div>
      </div>

      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleBookingSuccess}
        classId={_id}
        className={className}
        price={price}
      />
    </>
  );
}
