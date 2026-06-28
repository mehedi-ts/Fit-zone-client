"use client";

import Image from "next/image";
import { ArrowRight, Play, Zap } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative w-full h-[90vh] min-h-160 overflow-hidden">
      {/* ── Background Image ── */}
      <div className="absolute inset-0 transition-transform duration-[12000ms] ease-out hover:scale-[1.04]">
        <Image
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&q=95&fit=crop"
          alt="Elite training facility"
          fill
          priority
          quality={95}
          className="object-cover object-[60%_30%]"
          unoptimized
        />
      </div>

      {/* ── Layered Cinematic Gradients ── */}
      {/* Strong bottom scrim */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/10" />
      {/* Left content area darkening */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/30 to-transparent" />
      {/* Subtle top edge */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-transparent" />
      {/* Deep corner punch */}
      <div className="absolute bottom-0 left-0 w-2/3 h-2/3 bg-gradient-to-tr from-black/60 to-transparent" />

      {/* ── Main Content ── */}
      <div className="absolute inset-0 z-10 flex flex-col justify-center sm:justify-end">
        <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pb-0 sm:pb-20 lg:pb-28">
          {/* Badge */}
          <div className="mb-6 sm:mb-8">
            <span
              className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] font-bold tracking-[0.22em] uppercase rounded-full px-4 py-2 border border-white/10 backdrop-blur-md"
              style={{
                backgroundColor:
                  "color-mix(in srgb, var(--color-brand) 15%, transparent)",
                color: "color-mix(in srgb, var(--color-brand) 90%, white)",
              }}
            >
              <Zap className="w-3 h-3 fill-current" />
              Premium Fitness Platform
            </span>
          </div>

          {/* Headline */}
          <div className="mb-6 sm:mb-8">
            <h1 className="max-w-3xl lg:max-w-4xl">
              <span
                className="block text-white font-black leading-[0.88] tracking-[-0.04em] drop-shadow-2xl"
                style={{ fontSize: "clamp(2.8rem, 8.5vw, 7rem)" }}
              >
                TRAIN HARD.
              </span>
              <span
                className="block font-black leading-[0.88] tracking-[-0.04em] drop-shadow-2xl"
                style={{
                  fontSize: "clamp(2.8rem, 8.5vw, 7rem)",
                  color: "var(--color-brand)",
                }}
              >
                LIVE STRONG.
              </span>
            </h1>
          </div>

          {/* Thin rule */}
          <div
            className="mb-6 sm:mb-7 w-12 h-[2px] rounded-full"
            style={{ backgroundColor: "var(--color-brand)" }}
          />

          {/* Description */}
          <p
            className="mb-8 sm:mb-10 max-w-xs sm:max-w-sm lg:max-w-md text-white/60 leading-[1.7] font-light"
            style={{ fontSize: "clamp(0.875rem, 1.8vw, 1rem)" }}
          >
            Join certified trainers, book classes instantly, and transform your
            fitness journey with one powerful platform.
          </p>

          {/* Buttons */}
          <div className="flex flex-col xs:flex-row sm:flex-row items-stretch xs:items-center gap-3 sm:gap-4 mb-10 sm:mb-14">
            {/* Primary */}
            <Link href={`/classes`}>
              <button
                className="group relative flex items-center justify-center gap-2.5 text-[13px] font-bold text-white rounded-full px-7 py-3.5 sm:px-8 sm:py-4 transition-all duration-300 hover:scale-[1.04] hover:brightness-110 hover:-translate-y-0.5 hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.5)] active:scale-[0.97] active:translate-y-0 cursor-pointer overflow-hidden tracking-wide"
                style={{ backgroundColor: "var(--color-brand)" }}
              >
                {/* Shimmer */}
                <span
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{
                    background:
                      "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.2) 50%, transparent 70%)",
                  }}
                />
                <span className="relative">Explore Classes</span>
                <ArrowRight className="relative w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </Link>

            {/* Secondary */}
            {/* <button className="group flex items-center justify-center gap-2.5 text-[13px] font-semibold text-white/70 rounded-full px-6 py-3.5 sm:px-7 sm:py-4 border border-white/15 backdrop-blur-sm transition-all duration-300 hover:border-white/40 hover:text-white hover:bg-white/8 hover:-translate-y-0.5 hover:scale-[1.02] active:scale-[0.97] active:translate-y-0 cursor-pointer tracking-wide">
              <span
                className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border border-white/25 flex items-center justify-center shrink-0 transition-all duration-300 group-hover:border-white/50"
                style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
              >
                <Play className="w-2.5 h-2.5 fill-white ml-0.5" />
              </span>
              <span>Become a Trainer</span>
            </button> */}
          </div>

          {/* Social Proof */}
          <div className="flex items-center gap-4 sm:gap-5">
            {/* Stars */}
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  viewBox="0 0 20 20"
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                  style={{ fill: "var(--color-brand)" }}
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>

            {/* Divider */}
            <div className="w-px h-5 bg-white/15" />

            {/* Rating */}
            <div className="flex items-center gap-1.5">
              <span className="text-white text-sm sm:text-base font-bold">
                4.9
              </span>
              <span className="text-white/40 text-xs sm:text-sm">rating</span>
            </div>

            {/* Divider */}
            <div className="w-px h-5 bg-white/15" />

            {/* Members */}
            <div className="flex items-center gap-1.5">
              <span className="text-white text-sm sm:text-base font-bold">
                8,500+
              </span>
              <span className="text-white/40 text-xs sm:text-sm">
                active members
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom edge shimmer line ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 40%, rgba(255,255,255,0.08) 60%, transparent 100%)",
        }}
      />
    </section>
  );
}
