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
  ArrowRight,
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
  const count = bookingCount ?? 0;

  return (
    <Card
      className="
        group
        flex
        h-full
        flex-col
        overflow-hidden
        border
        border-default-200
        bg-white
        shadow-sm
        hover:shadow-xl
        hover:-translate-y-0.5
        transition-all
        duration-300
      "
      radius="lg"
    >
      {/* Image */}
      <div className="relative h-[220px] shrink-0 overflow-hidden bg-slate-100">
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

        {/* Subtle gradient so the badge always reads, regardless of photo */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-transparent" />

        {/* Category badge — built manually instead of relying on
            Chip's startContent prop, since that's not supported
            in @heroui/react v3's Chip implementation. */}
        <div className="absolute left-4 top-4">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium text-white shadow-sm ${badge.bg}`}
          >
            {badge.icon}
            {category}
          </span>
        </div>

        {/* Difficulty level, top-right — sits on the image instead of
            crowding the footer text */}
        {level && (
          <div className="absolute right-4 top-4">
            <span className="inline-flex items-center rounded-full bg-white/95 backdrop-blur-sm px-3 py-1 text-xs font-semibold capitalize text-default-700 shadow-sm">
              {level}
            </span>
          </div>
        )}
      </div>

      {/* Content — flex-1 so this area stretches to fill remaining
          card height, keeping every card in a row the same size */}
      <div className="flex flex-1 flex-col p-5">
        {/* Title */}
        <div className="min-h-[4.5rem]">
          <h3 className="text-xl font-bold line-clamp-1">{className}</h3>
          <p className="mt-2 text-default-500 text-sm line-clamp-2">
            {description}
          </p>
        </div>

        {/* Meta */}
        <div className="mt-4 flex items-center gap-4 text-sm text-default-600">
          <div className="flex items-center gap-1.5">
            <Clock size={15} />
            <span>{duration}</span>
          </div>
          <span className="h-3 w-px bg-default-200" />
          <div className="flex items-center gap-1.5">
            <Users size={15} />
            <span>
              {count} {count === 1 ? "person" : "people"} enrolled
            </span>
          </div>
        </div>

        {/* Spacer pushes the footer to the bottom regardless of how
            much title/description text preceded it */}
        <div className="flex-1" />

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-default-100 pt-4 mt-4">
          <div>
            <p className="text-xs text-default-500">Class fee</p>
            <h4 className="text-2xl font-bold text-primary">
              ${Number(price).toLocaleString("en-BD")}
            </h4>
          </div>
          <Link href={`/classes/${_id}`}>
            <Button
              radius="full"
              className="group/btn bg-[var(--color-brand)] text-white font-medium px-5 hover:opacity-90 transition-opacity"
            >
              <span className="flex items-center gap-1.5">
                Details
                <ArrowRight
                  size={15}
                  className="transition-transform duration-200 group-hover/btn:translate-x-0.5"
                />
              </span>
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}