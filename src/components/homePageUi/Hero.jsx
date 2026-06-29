"use client";

import Image from "next/image";
import { ArrowRight, Zap } from "lucide-react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

// ── Animation Variants ──────────────────────────────────────────────────────

const fadeUp = (delay = 0, duration = 0.7) => ({
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration, delay, ease: [0.22, 1, 0.36, 1] },
  },
});

const fadeIn = (delay = 0, duration = 0.6) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration, delay, ease: "easeOut" },
  },
});

const slideLeft = (delay = 0) => ({
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
  },
});

const scaleIn = (delay = 0) => ({
  hidden: { opacity: 0, scaleX: 0 },
  visible: {
    opacity: 1,
    scaleX: 1,
    transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] },
  },
});

// Stagger container
const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const statItem = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

// ── Component ───────────────────────────────────────────────────────────────

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();

  // When user prefers reduced motion, skip most transforms
  const motionProps = prefersReducedMotion
    ? { initial: "visible", animate: "visible" }
    : { initial: "hidden", animate: "visible" };

  return (
    <section className="relative w-full h-[90vh] min-h-160 overflow-hidden">

      {/* ── Background Image with subtle Ken-Burns ── */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: prefersReducedMotion ? 1 : 1.06 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&q=95&fit=crop"
          alt="Elite training facility"
          fill
          priority
          quality={95}
          className="object-cover object-[60%_30%] transition-transform duration-[12000ms] ease-out hover:scale-[1.04]"
          unoptimized
        />
      </motion.div>

      {/* ── Layered Cinematic Gradients ── */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/10"
        {...(prefersReducedMotion ? {} : { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 1.2, ease: "easeOut" } })}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/30 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-transparent" />
      <div className="absolute bottom-0 left-0 w-2/3 h-2/3 bg-gradient-to-tr from-black/60 to-transparent" />

      {/* ── Main Content ── */}
      <div className="absolute inset-0 z-10 flex flex-col justify-center sm:justify-end">
        <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pb-0 sm:pb-20 lg:pb-28">

          {/* Badge */}
          <motion.div
            className="mb-6 sm:mb-8"
            variants={fadeUp(0.3)}
            {...motionProps}
          >
            <span
              className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] font-bold tracking-[0.22em] uppercase rounded-full px-4 py-2 border border-white/10 backdrop-blur-md"
              style={{
                backgroundColor: "color-mix(in srgb, var(--color-brand) 15%, transparent)",
                color: "color-mix(in srgb, var(--color-brand) 90%, white)",
              }}
            >
              <Zap className="w-3 h-3 fill-current" />
              Premium Fitness Platform
            </span>
          </motion.div>

          {/* Headline — each line staggers in */}
          <div className="mb-6 sm:mb-8">
            <h1 className="max-w-3xl lg:max-w-4xl">
              <motion.span
                className="block text-white font-black leading-[0.88] tracking-[-0.04em] drop-shadow-2xl"
                style={{ fontSize: "clamp(2.8rem, 8.5vw, 7rem)" }}
                variants={slideLeft(0.45)}
                {...motionProps}
              >
                TRAIN HARD.
              </motion.span>
              <motion.span
                className="block font-black leading-[0.88] tracking-[-0.04em] drop-shadow-2xl"
                style={{
                  fontSize: "clamp(2.8rem, 8.5vw, 7rem)",
                  color: "var(--color-brand)",
                }}
                variants={slideLeft(0.58)}
                {...motionProps}
              >
                LIVE STRONG.
              </motion.span>
            </h1>
          </div>

          {/* Thin rule — scales in from left */}
          <motion.div
            className="mb-6 sm:mb-7 w-12 h-[2px] rounded-full origin-left"
            style={{ backgroundColor: "var(--color-brand)" }}
            variants={scaleIn(0.7)}
            {...motionProps}
          />

          {/* Description */}
          <motion.p
            className="mb-8 sm:mb-10 max-w-xs sm:max-w-sm lg:max-w-md text-white/60 leading-[1.7] font-light"
            style={{ fontSize: "clamp(0.875rem, 1.8vw, 1rem)" }}
            variants={fadeUp(0.76)}
            {...motionProps}
          >
            Join certified trainers, book classes instantly, and transform your
            fitness journey with one powerful platform.
          </motion.p>

          {/* Buttons */}
          <motion.div
            className="flex flex-col xs:flex-row sm:flex-row items-stretch xs:items-center gap-3 sm:gap-4 mb-10 sm:mb-14"
            variants={fadeUp(0.86)}
            {...motionProps}
          >
            {/* Primary */}
            <Link href="/classes">
              <motion.button
                className="group relative flex items-center justify-center gap-2.5 text-[13px] font-bold text-white rounded-full px-7 py-3.5 sm:px-8 sm:py-4 transition-all duration-300 cursor-pointer overflow-hidden tracking-wide"
                style={{ backgroundColor: "var(--color-brand)" }}
                whileHover={prefersReducedMotion ? {} : {
                  scale: 1.04,
                  y: -2,
                  filter: "brightness(1.1)",
                  boxShadow: "0 20px 40px -12px rgba(0,0,0,0.5)",
                }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.97, y: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
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
                <motion.span
                  className="relative"
                  variants={{ rest: { x: 0 }, hover: { x: 4 } }}
                  initial="rest"
                  whileHover="hover"
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                >
                  <ArrowRight className="w-4 h-4" />
                </motion.span>
              </motion.button>
            </Link>
          </motion.div>

          {/* Social Proof — staggered children */}
          <motion.div
            className="flex items-center gap-4 sm:gap-5"
            variants={staggerContainer}
            {...motionProps}
            // Override delayChildren for late entry
            animate={
              prefersReducedMotion
                ? "visible"
                : {
                    transition: {
                      staggerChildren: 0.1,
                      delayChildren: 1.0,
                    },
                  }
            }
          >
            {/* Stars */}
            <motion.div className="flex items-center gap-1" variants={statItem}>
              {[...Array(5)].map((_, i) => (
                <motion.svg
                  key={i}
                  viewBox="0 0 20 20"
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                  style={{ fill: "var(--color-brand)" }}
                  initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.4 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: prefersReducedMotion ? 0 : 1.0 + i * 0.07,
                    type: "spring",
                    stiffness: 500,
                    damping: 18,
                  }}
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </motion.svg>
              ))}
            </motion.div>

            {/* Divider */}
            <motion.div className="w-px h-5 bg-white/15" variants={statItem} />

            {/* Rating */}
            <motion.div className="flex items-center gap-1.5" variants={statItem}>
              <span className="text-white text-sm sm:text-base font-bold">4.9</span>
              <span className="text-white/40 text-xs sm:text-sm">rating</span>
            </motion.div>

            {/* Divider */}
            <motion.div className="w-px h-5 bg-white/15" variants={statItem} />

            {/* Members */}
            <motion.div className="flex items-center gap-1.5" variants={statItem}>
              <span className="text-white text-sm sm:text-base font-bold">8,500+</span>
              <span className="text-white/40 text-xs sm:text-sm">active members</span>
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* ── Bottom edge shimmer line ── */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 40%, rgba(255,255,255,0.08) 60%, transparent 100%)",
        }}
        initial={prefersReducedMotion ? {} : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
      />
    </section>
  );
}