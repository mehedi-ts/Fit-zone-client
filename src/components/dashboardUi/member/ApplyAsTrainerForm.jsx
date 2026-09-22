"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DollarSign, Users, Award, Calendar, ChevronRight } from "lucide-react";
import { ApplyAsTrainer } from "@/app/lib/actions/applyAsTrainer";
import { toast } from "react-toastify";
import { useUser } from "@/app/lib/getUserClient";

const SPECIALTY_OPTIONS = [
  { id: "yoga", label: "Yoga" },
  { id: "weights", label: "Weights" },
  { id: "cardio", label: "Cardio" },
  { id: "crossfit", label: "CrossFit" },
  { id: "zumba", label: "Zumba" },
];

export default function ApplyAsTrainerForm() {
  const userinfo = useUser();
  const router = useRouter();

  const [experience, setExperience] = useState(1);
  const [specialty, setSpecialty] = useState("");
  const [certifications, setCertifications] = useState("");
  const [story, setStory] = useState("");
  const [loading, setLoading] = useState(false);

  const incrementExperience = () => setExperience((prev) => prev + 1);
  const decrementExperience = () => setExperience((prev) => (prev > 0 ? prev - 1 : 0));

  async function handleSubmit(e) {
    e.preventDefault();

    if (userinfo?.status === "blocked") {
      toast.error("Action restricted by Admin");
      return;
    }

    if (experience < 0 || !specialty) {
      toast.error("Please fill required fields.");
      return;
    }

    try {
      setLoading(true);

      const trainerApplication = {
        userId: userinfo?.id,
        name: userinfo?.name,
        email: userinfo?.email,
        image: userinfo?.image,
        experience,
        specialty,
        certifications,
        feedback: story,
      };

      const result = await ApplyAsTrainer(trainerApplication);

      if (result?.success) {
        toast.success("Application submitted successfully!");
        setTimeout(() => {
          window.location.reload();
        }, 1100);
      } else {
        toast.error("Failed to submit application!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen w-full bg-page-bg p-6 lg:p-12 font-sans">
      <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
        {/* Left Column */}
        <div className="flex flex-col gap-8">
          <div>
            <h1 className="text-4xl lg:text-5xl font-black text-brand-dark leading-tight mb-4 tracking-tight">
              Turn your passion <br /> into a career.
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed">
              FitZone trainers inspire thousands of members every day. Share your
              expertise, grow your brand, and earn doing what you love.
            </p>
          </div>

          <div className="w-full h-64 lg:h-72 rounded-3xl overflow-hidden shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
              alt="Trainer assisting a member"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col gap-4">
            <FeatureCard
              icon={<DollarSign className="w-5 h-5 text-brand" />}
              title="Earn your way"
              description="Set your own rates and earn up to $120/session."
            />
            <FeatureCard
              icon={<Users className="w-5 h-5 text-brand" />}
              title="Build a community"
              description="Grow a loyal following of dedicated members."
            />
            <FeatureCard
              icon={<Award className="w-5 h-5 text-brand" />}
              title="Top trainer perks"
              description="Free premium membership + priority studio access."
            />
            <FeatureCard
              icon={<Calendar className="w-5 h-5 text-brand" />}
              title="Flexible schedule"
              description="Teach live or pre-record — your calendar, your rules."
            />
          </div>
        </div>

        {/* Right Column (Form) */}
        <div className="flex flex-col">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-brand-dark mb-2">Your Application</h2>
            <p className="text-gray-500 text-sm">
              Takes about 3 minutes. We'll review within 5 business days.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-700">Full Name</label>
                <input
                  type="text"
                  value={userinfo?.name || ""}
                  readOnly
                  className="px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all cursor-not-allowed opacity-80"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-700">Email Address</label>
                <input
                  type="email"
                  value={userinfo?.email || ""}
                  readOnly
                  className="px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all cursor-not-allowed opacity-80"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">Primary Specialty</label>
              <div className="relative">
                <select
                  value={specialty}
                  onChange={(e) => setSpecialty(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all appearance-none"
                  required
                >
                  <option value="" disabled>Select a specialty...</option>
                  {SPECIALTY_OPTIONS.map((opt) => (
                    <option key={opt.id} value={opt.label}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">Years of Experience</label>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={decrementExperience}
                  className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
                >
                  <span className="text-xl leading-none">-</span>
                </button>
                <div className="flex-1 px-4 py-3 rounded-xl border border-brand/20 bg-brand/5 flex items-center justify-center">
                   <span className="text-brand font-bold text-lg">{experience}</span>
                   <span className="text-brand font-medium ml-1 text-sm">yr</span>
                </div>
                <button
                  type="button"
                  onClick={incrementExperience}
                  className="w-10 h-10 rounded-xl bg-brand flex items-center justify-center text-white hover:opacity-90 transition-opacity shadow-sm shadow-brand/30"
                >
                  <span className="text-xl leading-none">+</span>
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">Count full years actively training clients.</p>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">Certifications</label>
              <input
                type="text"
                value={certifications}
                onChange={(e) => setCertifications(e.target.value)}
                placeholder="ACE-CPT, NASM, CrossFit L2..."
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all placeholder:text-gray-400"
              />
              <p className="text-xs text-gray-500 mt-1">e.g. ACE, NASM, CrossFit L1 — optional but encouraged.</p>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">Your Story</label>
              <textarea
                value={story}
                onChange={(e) => setStory(e.target.value.slice(0, 300))}
                placeholder="Tell us your training philosophy and what makes your approach unique..."
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all placeholder:text-gray-400 min-h-[120px] resize-none"
              ></textarea>
              <p className="text-xs text-gray-500 mt-1">{story.length}/300 characters</p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full py-4 rounded-xl bg-brand hover:opacity-90 text-white font-bold text-lg transition-all shadow-lg shadow-brand/30 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? "Submitting..." : (
                <>
                  Submit Application <ChevronRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {/* Tracker */}
          <div className="mt-12">
            <h3 className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-6">What Happens Next</h3>
            <div className="flex items-start justify-between relative">
              {/* Connecting line */}
              <div className="absolute top-4 left-4 right-4 h-[2px] bg-gray-200 -z-10"></div>
              
              {/* Step 1 */}
              <div className="flex flex-col items-center gap-3 w-1/3 text-center">
                <div className="w-8 h-8 rounded-full bg-brand text-white flex items-center justify-center font-bold text-sm shadow-md">1</div>
                <div>
                  <p className="text-sm font-bold text-brand-dark">Apply</p>
                  <p className="text-xs text-gray-500 mt-1">Submit your application</p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center gap-3 w-1/3 text-center">
                <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center font-bold text-sm">2</div>
                <div>
                  <p className="text-sm font-bold text-brand-dark">Review</p>
                  <p className="text-xs text-gray-500 mt-1">Admin reviews in 3-5 days</p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center gap-3 w-1/3 text-center">
                <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center font-bold text-sm">3</div>
                <div>
                  <p className="text-sm font-bold text-brand-dark">Approved</p>
                  <p className="text-xs text-gray-500 mt-1">Go live and start teaching</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white rounded-2xl p-4 flex items-center gap-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="w-12 h-12 rounded-full bg-brand/10 flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div>
        <h4 className="text-brand-dark font-bold text-sm mb-1">{title}</h4>
        <p className="text-gray-500 text-xs">{description}</p>
      </div>
    </div>
  );
}
