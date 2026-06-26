"use client";

import { ShieldCheck, Dumbbell, Users, TrendingUp } from "lucide-react";

export default function WhyChooseUs() {
  const features = [
    {
      id: 1,
      icon: <Dumbbell className="w-6 h-6 text-[var(--color-brand, #f97316)]" />,
      title: "Expert Trainers & Classes",
      description: "Access premium fitness classes and personalized training sessions designed by certified professionals to hit your goals faster."
    },
    {
      id: 2,
      icon: <Users className="w-6 h-6 text-[var(--color-brand, #f97316)]" />,
      title: "Active Community Forum",
      description: "Engage in real-time fitness discussions, share your progress, and get valuable advice from fellow enthusiasts and expert trainers."
    },
    {
      id: 3,
      icon: <TrendingUp className="w-6 h-6 text-[var(--color-brand, #f97316)]" />,
      title: "Track Your Fitness Journey",
      description: "Monitor your daily progress, upcoming bookings, and fitness history easily through our dynamic user dashboard."
    },
    {
      id: 4,
      icon: <ShieldCheck className="w-6 h-6 text-[var(--color-brand, #f97316)]" />,
      title: "Admin Verified & Secure",
      description: "Enjoy a safe and professional environment backed by strict administrative monitoring, verified roles, and quality guidelines."
    }
  ];

  return (
    <section className="w-full py-16 px-4 bg-[var(--color-page-bg)]">
      <div className="max-w-7xl mx-auto">
        
        {/* Header (Exactly matches FeaturedClasses styling) */}
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--color-brand-dark)]">
            Why Choose{" "}
            <span className="text-[var(--color-brand, #f97316)]">
              FitZone
            </span>
          </h2>
          <p className="mt-3 text-[var(--color-brand-dark)]/60">
            The ultimate ecosystem tailored for fitness enthusiasts, trainers, and administrators.
          </p>
        </div>

        {/* Grid (Using exact layout structure from your first section) */}
        <div className="flex flex-wrap justify-center gap-5">
          {features.map((feature) => (
            <div 
              key={feature.id} 
              className="w-full sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)] xl:w-[calc(25%-15px)] rounded-2xl p-6 bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Icon Wrapper */}
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-orange-50 mb-5  transition-colors duration-300">
                  <div className="transition-colors duration-300">
                    {feature.icon}
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-[var(--color-brand-dark)] mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-[var(--color-brand-dark)]/70 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Trust Banner */}
        {/* <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 text-white flex flex-wrap justify-around items-center gap-6 text-center shadow-sm">
          <div>
            <p className="text-3xl sm:text-4xl font-extrabold">10k+</p>
            <p className="text-xs sm:text-sm font-medium opacity-90 uppercase mt-1 tracking-wider">Active Members</p>
          </div>
          <div className="hidden sm:block w-px h-12 bg-white/20" />
          <div>
            <p className="text-3xl sm:text-4xl font-extrabold">150+</p>
            <p className="text-xs sm:text-sm font-medium opacity-90 uppercase mt-1 tracking-wider">Expert Trainers</p>
          </div>
          <div className="hidden sm:block w-px h-12 bg-white/20" />
          <div>
            <p className="text-3xl sm:text-4xl font-extrabold">500+</p>
            <p className="text-xs sm:text-sm font-medium opacity-90 uppercase mt-1 tracking-wider">Fitness Classes</p>
          </div>
        </div> */}

      </div>
    </section>
  );
}