"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  TextField,
  Label,
  Input,
  TextArea,
  Select,
  ListBox,
  Button,
  Card,
} from "@heroui/react";
import { imageUploader } from "@/app/lib/imageUpload";
import { addClass } from "@/app/lib/actions/addClass";
import { useUser } from "@/app/lib/getUserClient";

export default function AddClassForm() {
  const user = useUser();
  const router = useRouter();

  const [formData, setFormData] = useState({
    className: "",
    image: "",
    category: "",
    difficulty: "",
    duration: "",
    schedule: [], // Array to hold multiple selected days (e.g., ['mon', 'wed'])
    startTime: "", // Holds class start time (e.g., '07:00')
    price: "",
    description: "",
    bookingCount: 0,
    status: "pending",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const categories = [
    { label: "Strength", value: "strength" },
    { label: "Cardio", value: "cardio" },
    { label: "Yoga", value: "yoga" },
    { label: "Combat", value: "combat" },
  ];

  const difficulties = [
    { label: "Beginner", value: "beginner" },
    { label: "Intermediate", value: "intermediate" },
    { label: "Advanced", value: "advanced" },
  ];

  const daysOfWeek = [
    { label: "Sun", value: "sun" },
    { label: "Mon", value: "mon" },
    { label: "Tue", value: "tue" },
    { label: "Wed", value: "wed" },
    { label: "Thu", value: "thu" },
    { label: "Fri", value: "fri" },
    { label: "Sat", value: "sat" },
  ];

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Toggles day selections in and out of the array
  const handleDayToggle = (dayValue) => {
    setFormData((prev) => {
      const isSelected = prev.schedule.includes(dayValue);
      const updatedSchedule = isSelected
        ? prev.schedule.filter((day) => day !== dayValue) // Remove if already clicked
        : [...prev.schedule, dayValue]; // Add if not present

      return { ...prev, schedule: updatedSchedule };
    });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setIsUploadingImage(true);

    try {
      const imageUrl = await imageUploader(file);

      setFormData((prev) => ({
        ...prev,
        image: imageUrl?.url || "",
      }));
    } catch (error) {
      console.error(error);
      alert("Image upload failed. Please try a different image.");
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("You must be logged in to create a class.");
      return;
    }

    if (formData.schedule.length === 0) {
      alert("Please select at least one day for the class schedule.");
      return;
    }

    setIsSubmitting(true);

    const finalPayload = {
      ...formData,
      trainerId: `TR-${user.id}`,
      trainerName: user.name,
      trainerEmail: user.email,
      price: parseFloat(formData.price) || 0,
      createdAt: new Date().toISOString(),
    };

    try {
      const result = await addClass(finalPayload);

      if (!result || result.error) {
        throw new Error(result?.error || "Failed to create class.");
      }

      alert("Class created successfully!");
      router.push("/dashboard/trainer/my-classes");
    } catch (error) {
      console.error("Failed to create class:", error);
      alert(
        error?.message ||
          "Something went wrong while creating the class. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Guard: wait for the user session to resolve before rendering the form
  if (!user) {
    return (
      <div className="min-h-screen flex justify-center items-center py-10 px-4">
        <p className="text-sm text-slate-400">Loading trainer profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center items-center py-10 px-4">
      <Card className="w-full max-w-4xl bg-white/70 backdrop-blur-md border border-slate-100 shadow-sm rounded-3xl p-6 sm:p-10 flex flex-col gap-8">
        {/* Header */}
        <Card.Header className="space-y-1 p-0">
          <Card.Title className="text-2xl font-semibold tracking-tight text-brand-dark">
            Create New Gym Class
          </Card.Title>
          <Card.Description className="text-sm text-slate-400">
            Fill out the details below to list a new training session.
          </Card.Description>
        </Card.Header>

        <Card.Content className="p-0">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Section: Trainer Profile */}
            <div className="bg-slate-50/60 p-4 rounded-2xl grid grid-cols-1 md:grid-cols-3 gap-4 border border-slate-100">
              <div>
                <span className="text-[11px] uppercase tracking-wider font-medium text-slate-400 block mb-1">
                  Trainer ID
                </span>
                <p className="text-sm font-medium text-slate-700">
                  {`TR-${user.id}`}
                </p>
              </div>
              <div>
                <span className="text-[11px] uppercase tracking-wider font-medium text-slate-400 block mb-1">
                  Trainer Name
                </span>
                <p className="text-sm font-medium text-slate-700">
                  {user.name}
                </p>
              </div>
              <div>
                <span className="text-[11px] uppercase tracking-wider font-medium text-slate-400 block mb-1">
                  Trainer Email
                </span>
                <p className="text-sm font-medium text-slate-700">
                  {user.email}
                </p>
              </div>
            </div>

            <hr className="border-slate-100" />

            {/* Section: Class Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TextField
                isRequired
                name="className"
                value={formData.className}
                onChange={(value) =>
                  setFormData((prev) => ({ ...prev, className: value }))
                }
                className="w-full"
              >
                <Label className="text-sm font-medium text-slate-700 mb-1 block">
                  Class Name
                </Label>
                <Input
                  placeholder="e.g., Elite HIIT Circuit"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm shadow-sm focus-visible:border-brand outline-none"
                />
              </TextField>

              {/* Image Upload Field */}
              <div className="w-full flex flex-col gap-1">
                <Label className="text-sm font-medium text-slate-700 block">
                  Class Cover Image
                </Label>
                <div className="relative border border-dashed border-slate-300 rounded-xl bg-slate-50 p-2 text-center flex items-center justify-center gap-4 h-11 overflow-hidden hover:border-brand transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={isUploadingImage}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full disabled:cursor-not-allowed"
                  />
                  {isUploadingImage ? (
                    <span className="text-sm text-slate-400 font-medium">
                      Uploading image...
                    </span>
                  ) : formData.image ? (
                    <div className="flex items-center gap-2 w-full justify-start pl-2">
                      <Image
                        src={formData.image}
                        alt="Preview"
                        width={28}
                        height={28}
                        unoptimized
                        className="h-7 w-7 object-cover rounded-md"
                      />
                      <span className="text-xs text-green-600 font-medium truncate">
                        Image selected successfully!
                      </span>
                    </div>
                  ) : (
                    <span className="text-sm text-slate-400 font-medium">
                      Click to choose / drag image file
                    </span>
                  )}
                </div>
              </div>

              <div className="w-full">
                <Select
                  isRequired
                  placeholder="Select category"
                  value={formData.category}
                  onChange={(value) => handleSelectChange("category", value)}
                  className="w-full"
                >
                  <Label className="text-sm font-medium text-slate-700 mb-1 block">
                    Category
                  </Label>
                  <Select.Trigger className="w-full rounded-xl border border-slate-200 bg-slate-50 text-sm shadow-sm outline-none px-4 py-2">
                    <Select.Value />
                    <Select.Indicator />
                  </Select.Trigger>
                  <Select.Popover>
                    <ListBox>
                      {categories.map((cat) => (
                        <ListBox.Item
                          key={cat.value}
                          id={cat.value}
                          textValue={cat.label}
                        >
                          {cat.label}
                        </ListBox.Item>
                      ))}
                    </ListBox>
                  </Select.Popover>
                </Select>
              </div>

              <div className="w-full">
                <Select
                  isRequired
                  placeholder="Select difficulty"
                  value={formData.difficulty}
                  onChange={(value) => handleSelectChange("difficulty", value)}
                  className="w-full"
                >
                  <Label className="text-sm font-medium text-slate-700 mb-1 block">
                    Difficulty Level
                  </Label>
                  <Select.Trigger className="w-full rounded-xl border border-slate-200 bg-slate-50 text-sm shadow-sm outline-none px-4 py-2">
                    <Select.Value />
                    <Select.Indicator />
                  </Select.Trigger>
                  <Select.Popover>
                    <ListBox>
                      {difficulties.map((diff) => (
                        <ListBox.Item
                          key={diff.value}
                          id={diff.value}
                          textValue={diff.label}
                        >
                          {diff.label}
                        </ListBox.Item>
                      ))}
                    </ListBox>
                  </Select.Popover>
                </Select>
              </div>

              <TextField
                isRequired
                name="duration"
                value={formData.duration}
                onChange={(value) =>
                  setFormData((prev) => ({ ...prev, duration: value }))
                }
                className="w-full"
              >
                <Label className="text-sm font-medium text-slate-700 mb-1 block">
                  Duration
                </Label>
                <Input
                  placeholder="e.g., 60 Mins or 1 Hour"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm shadow-sm focus-visible:border-brand outline-none"
                />
              </TextField>

              <TextField
                isRequired
                name="price"
                type="number"
                value={formData.price}
                onChange={(value) =>
                  setFormData((prev) => ({ ...prev, price: value }))
                }
                className="w-full"
              >
                <Label className="text-sm font-medium text-slate-700 mb-1 block">
                  Price ($)
                </Label>
                <Input
                  placeholder="0.00"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm shadow-sm focus-visible:border-brand outline-none"
                />
              </TextField>
            </div>

            {/* Grid: Multiple Days Selection & Start Time Picker */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-slate-50/40 p-5 rounded-2xl border border-slate-100">
              {/* Multi-Select Days Column */}
              <div className="md:col-span-2 flex flex-col gap-2">
                <Label className="text-sm font-medium text-slate-700">
                  Weekly Schedule (Select all that apply)
                </Label>
                <div className="flex flex-wrap gap-2 pt-1">
                  {daysOfWeek.map((day) => {
                    const isSelected = formData.schedule.includes(day.value);
                    return (
                      <button
                        key={day.value}
                        type="button"
                        onClick={() => handleDayToggle(day.value)}
                        className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide border transition-all duration-200 ${
                          isSelected
                            ? "bg-orange-500 text-white border-transparent shadow-sm shadow-orange-500/20 scale-[0.98]"
                            : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-900"
                        }`}
                      >
                        {day.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Start Time Field */}
              <TextField
                isRequired
                name="startTime"
                value={formData.startTime}
                onChange={(value) =>
                  setFormData((prev) => ({ ...prev, startTime: value }))
                }
                className="w-full"
              >
                <Label className="text-sm font-medium text-slate-700 mb-1 block">
                  Class Start Time
                </Label>
                <Input
                  type="time"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm shadow-sm outline-none focus-visible:border-brand"
                />
              </TextField>
            </div>

            <TextField
              isRequired
              name="description"
              value={formData.description}
              onChange={(value) =>
                setFormData((prev) => ({ ...prev, description: value }))
              }
              className="w-full"
            >
              <Label className="text-sm font-medium text-slate-700 mb-1 block">
                Description
              </Label>
              <TextArea
                placeholder="Provide a detailed breakdown of what your clients will achieve in this class..."
                rows={4}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm shadow-sm focus-visible:border-brand outline-none"
              />
            </TextField>

            <div className="flex items-center justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="secondary"
                disabled={isSubmitting}
                onPress={() => router.back()}
                className="font-medium text-slate-500 hover:text-slate-800 rounded-xl"
              >
                Cancel
              </Button>

              <Button
                type="submit"
                isDisabled={isSubmitting}
                className="bg-brand text-white font-medium shadow-sm shadow-orange-500/20 px-8 hover:opacity-90 transition-opacity rounded-xl disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Publishing..." : "Publish Class"}
              </Button>
            </div>
          </form>
        </Card.Content>
      </Card>
    </div>
  );
}
