"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { Flame, Calendar, Users2, ArrowRight, Play } from "lucide-react";

// Swap with a real hosted asset when ready — using a placeholder Unsplash photo for now.
// NOTE: external domains must be whitelisted in next.config.js under images.remotePatterns,
// e.g. { protocol: "https", hostname: "images.unsplash.com" }
const HERO_IMAGE =
  "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1400&auto=format&fit=crop";

const LIVE_CLASSES = [
  { name: "Morning HIIT", time: "7:00 AM", spots: "4 spots left", icon: Flame },
  { name: "Power Yoga", time: "9:30 AM", spots: "Open", icon: Users2 },
  {
    name: "Boxing Basics",
    time: "6:00 PM",
    spots: "2 spots left",
    icon: Flame,
  },
];

const TRUST_STATS = [
  { value: "120+", label: "classes weekly" },
  { value: "45", label: "certified trainers" },
  { value: "8.5k", label: "active members" },
];

export default function Hero() {
  const router = useRouter();

  return (
    <section className="relative overflow-hidden bg-page-bg">
      {/* Ambient backdrop accent — quiet, not the signature */}
      <div
        aria-hidden="true"
        className="
        absolute
        -top-32 -left-32
        h-112 w-md
        rounded-full
        bg-brand/10
        blur-3xl
        "
      />

      <div
        className="
        relative
        mx-auto
        max-w-7xl
        px-6
        pt-14
        pb-20
        md:pt-20
        md:pb-28
        grid
        grid-cols-1
        md:grid-cols-2
        gap-14
        items-center
        "
      >
        {/* Left: copy */}
        <div>
          <span
            className="
            inline-flex
            items-center
            gap-2
            rounded-full
            bg-brand/10
            px-4
            py-1.5
            text-xs
            font-bold
            uppercase
            tracking-wider
            text-brand-dark
            "
          >
            <Flame size={14} className="text-brand" />
            Find your next class
          </span>

          <h1
            className="
            mt-6
            text-[2.75rem]
            leading-[1.05]
            font-extrabold
            tracking-tight
            text-brand-dark
            md:text-6xl
            "
          >
            Train with the
            <br />
            <span className="text-brand">best, on your schedule.</span>
          </h1>

          <p
            className="
            mt-6
            max-w-md
            text-base
            leading-relaxed
            text-gray-600
            md:text-lg
            "
          >
            Book classes with certified trainers, track every session, and stay
            accountable with a community that shows up — all from one platform.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              onClick={() => router.push("/classes")}
              className="
              group
              inline-flex
              items-center
              gap-2
              rounded-xl
              bg-brand
              px-6
              py-3.5
              text-sm
              font-bold
              text-white
              transition-all
              duration-200
              hover:brightness-110
              active:scale-[0.97]
              "
            >
              Explore Classes
              <ArrowRight
                size={16}
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </button>

            <button
              onClick={() => router.push("/about")}
              className="
              inline-flex
              items-center
              gap-2
              rounded-xl
              border
              border-brand-dark/15
              px-6
              py-3.5
              text-sm
              font-bold
              text-brand-dark
              transition-colors
              duration-200
              hover:bg-black/5
              "
            >
              <Play size={14} />
              See how it works
            </button>
          </div>

          {/* Trust strip — real numbers, not decoration */}
          <div
            className="
            mt-12
            flex
            flex-wrap
            gap-x-10
            gap-y-4
            border-t
            border-black/10
            pt-6
            "
          >
            {TRUST_STATS.map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-extrabold text-brand-dark">
                  {stat.value}
                </p>
                <p className="text-xs font-medium text-gray-500">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: photo + signature floating schedule card */}
        <div className="relative">
          <div
            className="
            relative
            aspect-4/5
            w-full
            overflow-hidden
            rounded-[2rem]
            shadow-2xl
            md:aspect-4/4.5
            "
          >
            <Image
              src={HERO_IMAGE}
              alt="Members training together in a group fitness class"
              fill
              priority
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
            <div
              aria-hidden="true"
              className="
              absolute
              inset-0
              bg-linear-to-t
              from-black/60
              via-black/0
              to-black/10
              "
            />
          </div>

          {/* Signature element: live schedule glimpse */}
          <div
            className="
            absolute
            -bottom-8
            left-1/2
            w-[88%]
            -translate-x-1/2
            rounded-2xl
            bg-white
            p-4
            shadow-xl
            ring-1
            ring-black/5
            md:-right-8
            md:left-auto
            md:bottom-8
            md:w-72
            md:translate-x-0
            "
          >
            <div className="mb-3 flex items-center justify-between">
              <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-brand-dark">
                <Calendar size={14} className="text-brand" />
                Today&apos;s classes
              </p>
              <span className="h-2 w-2 rounded-full bg-green-500" />
            </div>

            <ul className="flex flex-col gap-2.5">
              {LIVE_CLASSES.map((item) => {
                const Icon = item.icon;
                return (
                  <li
                    key={item.name}
                    className="
                    flex
                    items-center
                    gap-3
                    rounded-xl
                    bg-page-bg
                    px-3
                    py-2
                    "
                  >
                    <span
                      className="
                      flex
                      h-8
                      w-8
                      shrink-0
                      items-center
                      justify-center
                      rounded-lg
                      bg-brand/10
                      text-brand
                      "
                    >
                      <Icon size={16} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-brand-dark">
                        {item.name}
                      </p>
                      <p className="text-xs text-gray-500">{item.time}</p>
                    </span>
                    <span className="shrink-0 text-[11px] font-semibold text-brand">
                      {item.spots}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
