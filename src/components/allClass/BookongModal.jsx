"use client";

import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useUser } from "@/app/lib/getUserClient";
// import { bookClass } from "@/app/lib/actions/Booking";

export default function BookingModal({
  isOpen,
  onClose,
  onSuccess,
  classId,
  className,
  price,
}) {
  const user = useUser();

  const [formData, setFormData] = useState({
    userId: "",
    name: "",
    email: "",
    phone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Pre-fill from the logged-in user whenever the modal opens,
  // but keep every field editable.
  useEffect(() => {
    if (isOpen && user) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData({
        userId: user.id || "",
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
      });
    }
  }, [isOpen, user]);

  if (!isOpen) return null;

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const bookingPayload = {
      classId,
      ...formData,
    };

    try {
      const res = await fetch("/api/checkout_sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          bookingData: bookingPayload,
        }),
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.log(error);
      alert("Payment failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-white rounded-3xl shadow-xl p-6 sm:p-8 flex flex-col gap-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Book Class</h2>
            <p className="mt-1 text-sm text-slate-500">
              {className} · ${Number(price).toLocaleString("en-BD")}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="h-9 w-9 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors shrink-0"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-sm font-medium text-slate-700 mb-1 block">
              Full Name
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={handleChange("name")}
              placeholder="Your full name"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm shadow-sm outline-none focus-visible:border-brand"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700 mb-1 block">
              Email
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={handleChange("email")}
              placeholder="you@example.com"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm shadow-sm outline-none focus-visible:border-brand"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700 mb-1 block">
              Phone Number
            </label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={handleChange("phone")}
              placeholder="01XXXXXXXXX"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm shadow-sm outline-none focus-visible:border-brand"
            />
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1 font-medium text-slate-500 hover:text-slate-800 rounded-xl py-2.5 transition-colors disabled:opacity-60"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-brand text-white font-medium shadow-sm shadow-orange-500/20 rounded-xl py-2.5 hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Booking..." : "Confirm Booking"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
