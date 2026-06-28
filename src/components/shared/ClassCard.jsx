"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, Button } from "@heroui/react";
import {
  Clock,
  Dumbbell,
  Flame,
  HeartPulse,
  Activity,
  ImageOff,
  Users,
} from "lucide-react";

export default function ClassCard({
  _id,
  className,
  image,
  description,
  duration,
  level,
  price,
  category,
  bookingCount,
}) {
  const getCategoryStyle = () => {
    switch (category?.toLowerCase()) {
      case "strength":
        return {
          bg: "bg-blue-600",
          icon: <Dumbbell size={14} />,
        };
      case "cardio":
        return {
          bg: "bg-purple-600",
          icon: <HeartPulse size={14} />,
        };
      case "hiit":
        return {
          bg: "bg-red-600",
          icon: <Flame size={14} />,
        };
      default:
        return {
          bg: "bg-emerald-600",
          icon: <Activity size={14} />,
        };
    }
  };

  const badge = getCategoryStyle();
  const hasImage = typeof image === "string" && image.trim().length > 0;

  return (
    <Card
      className="
        group
        overflow-hidden
        border
        border-default-200
        bg-white
        shadow-sm
        hover:shadow-xl
        transition-all
        duration-300
      "
      radius="lg"
    >
      {/* Image */}
      <div className="relative h-[220px] overflow-hidden bg-slate-100">
        {hasImage ? (
          <Image
            src={image}
            alt={className}
            fill
            unoptimized
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-300">
            <ImageOff size={32} />
          </div>
        )}

        {/* Category badge — built manually instead of relying on
            Chip's startContent prop, since that's not supported
            in @heroui/react v3's Chip implementation. */}
        <div className="absolute left-4 top-4">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium text-white ${badge.bg}`}
          >
            {badge.icon}
            {category}
          </span>
        </div>

        {/* Booking count badge */}
        <div className="absolute right-4 top-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-semibold text-default-700 shadow-sm">
            <Users size={14} />
            {bookingCount ?? 0} booked
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-4">
        {/* Title */}
        <div>
          <h3 className="text-xl font-bold line-clamp-1">{className}</h3>
          <p className="mt-2 text-default-500 text-sm line-clamp-2">
            {description}
          </p>
        </div>

        {/* Meta */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-default-600">
            <Clock size={16} />
            <span>{duration}</span>
          </div>
          <span className="font-medium text-default-700">{level}</span>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t pt-4">
          <div>
            <p className="text-xs text-default-500">Class Fee</p>
            <h4 className="text-2xl font-bold text-primary">
              ${Number(price).toLocaleString("en-BD")}
            </h4>
          </div>
          <Link href={`/classes/${_id}`}>
            <Button
              radius="full"
              className="bg-[var(--color-brand)] text-white font-medium px-5 hover:opacity-90 transition-opacity"
            >
              Details
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}