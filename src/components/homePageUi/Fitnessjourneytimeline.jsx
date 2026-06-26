"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const steps = [
  {
    number: "01",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: "Create Account",
    desc: "Sign up in seconds and unlock your personalized fitness profile tailored to your body and goals.",
  },
  {
    number: "02",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
        <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" />
      </svg>
    ),
    title: "Browse Classes",
    desc: "Explore 200+ expert-curated classes — from HIIT to yoga — and find your perfect training style.",
  },
  {
    number: "03",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    ),
    title: "Book Your Session",
    desc: "Reserve your spot in any live or on-demand session with one tap. Flexible scheduling, zero friction.",
  },
  {
    number: "04",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M6.5 6.5h11" />
        <path d="M4 9.5h2.5V15H4" />
        <path d="M17.5 9.5H20V15h-2.5" />
        <path d="M6.5 9.5v5.5" />
        <path d="M17.5 9.5v5.5" />
        <path d="M9 6.5v11" />
        <path d="M15 6.5v11" />
        <path d="M9 12h6" />
      </svg>
    ),
    title: "Train With Experts",
    desc: "Work alongside certified coaches who push you, correct your form, and keep you accountable every rep.",
  },
  {
    number: "05",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
        <polyline points="16 7 22 7 22 13" />
      </svg>
    ),
    title: "Reach Your Goals",
    desc: "Track milestones, celebrate PRs, and transform your physique with a program built around your progress.",
  },
];

const fadeUpVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

const lineVariant = {
  hidden: { scaleX: 0, originX: 0 },
  visible: {
    scaleX: 1,
    transition: { delay: 0.4, duration: 1.1, ease: [0.22, 1, 0.36, 1] },
  },
};

const lineVariantV = {
  hidden: { scaleY: 0, originY: 0 },
  visible: {
    scaleY: 1,
    transition: { delay: 0.3, duration: 1.2, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function FitnessJourneyTimeline() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#0a0a0a] py-20 px-4 overflow-hidden"
    >
      {/* Background radial glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <div className="w-[700px] h-[700px] rounded-full bg-red-700/10 blur-[120px] opacity-60" />
      </div>

      {/* Subtle grid texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="inline-block text-xs font-semibold tracking-[0.25em] uppercase text-red-500 mb-4 px-3 py-1 rounded-full border border-red-500/30 bg-red-500/5">
            How It Works
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight">
            Your{" "}
            <span
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage: "linear-gradient(135deg, #ef4444 0%, #f97316 100%)",
              }}
            >
              Fitness Journey
            </span>
          </h2>
          <p className="mt-4 text-base md:text-lg text-zinc-400 max-w-xl mx-auto leading-relaxed">
            Five steps stand between you and the body you&apos;ve been working toward.
            We&apos;ve made each one count.
          </p>
        </motion.div>

        {/* ─── DESKTOP: horizontal timeline ─── */}
        <div className="hidden md:block">
          <div className="relative flex items-start justify-between gap-4">
            {/* Animated connecting line (behind nodes) */}
            <div className="absolute top-13 left-[8%] right-[8%] h-px bg-zinc-800 z-0">
              <motion.div
                className="absolute inset-0 h-full origin-left"
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                variants={lineVariant}
                style={{
                  background:
                    "linear-gradient(90deg, #ef4444 0%, #f97316 60%, #ef444400 100%)",
                }}
              />
            </div>

            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                custom={i}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                variants={fadeUpVariant}
                whileHover={{ scale: 1.04, y: -6 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
                className="relative z-10 flex flex-col items-center text-center flex-1 min-w-0 cursor-default"
              >
                {/* Node circle */}
                <div
                  className="relative w-[104px] h-[104px] rounded-full flex items-center justify-center mb-6 flex-shrink-0"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(239,68,68,0.18) 0%, rgba(249,115,22,0.10) 100%)",
                    border: "1px solid rgba(239,68,68,0.3)",
                    boxShadow: "0 0 32px rgba(239,68,68,0.12)",
                    backdropFilter: "blur(12px)",
                  }}
                >
                  {/* Step number — top-right badge */}
                  <span
                    className="absolute -top-2 -right-2 text-[10px] font-black tracking-widest text-red-400 bg-[#0a0a0a] border border-red-500/30 rounded-full w-7 h-7 flex items-center justify-center"
                  >
                    {step.number}
                  </span>
                  <span className="text-red-400">{step.icon}</span>
                </div>

                {/* Glassmorphism card */}
                <div
                  className="w-full rounded-2xl p-5"
                  style={{
                    background:
                      "linear-gradient(145deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    backdropFilter: "blur(16px)",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
                  }}
                >
                  <h3 className="text-white font-bold text-base mb-2 leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ─── MOBILE: vertical timeline ─── */}
        <div className="md:hidden relative pl-10">
          {/* Vertical line */}
          <div className="absolute left-4 top-4 bottom-4 w-px bg-zinc-800 overflow-hidden">
            <motion.div
              className="absolute inset-0 w-full origin-top"
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={lineVariantV}
              style={{
                background:
                  "linear-gradient(180deg, #ef4444 0%, #f97316 60%, #ef444400 100%)",
              }}
            />
          </div>

          <div className="flex flex-col gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                custom={i}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                variants={fadeUpVariant}
                className="relative flex gap-5"
              >
                {/* Node dot */}
                <div className="absolute -left-[26px] top-0 flex items-start">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(239,68,68,0.22) 0%, rgba(249,115,22,0.12) 100%)",
                      border: "1px solid rgba(239,68,68,0.35)",
                      boxShadow: "0 0 20px rgba(239,68,68,0.15)",
                    }}
                  >
                    <span className="text-red-400 scale-75">{step.icon}</span>
                  </div>
                </div>

                {/* Card */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 280, damping: 24 }}
                  className="flex-1 rounded-2xl p-5"
                  style={{
                    background:
                      "linear-gradient(145deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    backdropFilter: "blur(16px)",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
                  }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[10px] font-black tracking-widest text-red-400 border border-red-500/30 rounded-full px-2 py-0.5 bg-red-500/5">
                      {step.number}
                    </span>
                    <h3 className="text-white font-bold text-base leading-snug">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-zinc-400 text-sm leading-relaxed">{step.desc}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.9, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 flex justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="relative px-8 py-4 rounded-full text-white font-bold text-sm tracking-wide overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #ef4444 0%, #f97316 100%)",
              boxShadow: "0 0 40px rgba(239,68,68,0.35)",
            }}
          >
            <span className="relative z-10">Start Your Journey — Free</span>
            {/* Shine overlay */}
            <span
              aria-hidden
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(120deg, rgba(255,255,255,0.18) 0%, transparent 60%)",
              }}
            />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}