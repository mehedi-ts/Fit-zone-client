"use client";

import React, { useState } from "react";
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

export default function AddClassForm() {
  const [formData, setFormData] = useState({
    trainerId: "TR-9842",
    trainerName: "Mehedi Hasan",
    trainerEmail: "mehedi@gym.com",
    className: "",
    image: "",
    category: "",
    difficulty: "",
    duration: "",
    schedule: "",
    price: "",
    description: "",
    bookingCount: 0,
    status: "pending",
  });

  const categories = [
    { label: "Strength & Conditioning", value: "strength" },
    { label: "Cardio & HIIT", value: "cardio" },
    { label: "Yoga & Flexibility", value: "yoga" },
    { label: "Combat Sports", value: "combat" },
  ];

  const difficulties = [
    { label: "Beginner", value: "beginner" },
    { label: "Intermediate", value: "intermediate" },
    { label: "Advanced", value: "advanced" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const finalPayload = {
      ...formData,
      price: parseFloat(formData.price) || 0,
      createdAt: new Date().toISOString(),
    };

    console.log("Submitting Gym Class Data: ", finalPayload);
  };

  return (
    <div className="min-h-screen  flex justify-center items-center">
      <Card className="w-full max-w-4xl bg-white/70 backdrop-blur-md border border-slate-100 shadow-sm rounded-3xl p-6 sm:p-10 flex flex-col gap-8">
        {/* Header */}
        <Card.Header className="space-y-1 p-0">
          <Card.Title className="text-2xl font-semibold tracking-tight text-[var(--color-brand-dark)]">
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
                  {formData.trainerId}
                </p>
              </div>

              <div>
                <span className="text-[11px] uppercase tracking-wider font-medium text-slate-400 block mb-1">
                  Trainer Name
                </span>
                <p className="text-sm font-medium text-slate-700">
                  {formData.trainerName}
                </p>
              </div>

              <div>
                <span className="text-[11px] uppercase tracking-wider font-medium text-slate-400 block mb-1">
                  Trainer Email
                </span>
                <p className="text-sm font-medium text-slate-700">
                  {formData.trainerEmail}
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
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm shadow-sm focus-visible:border-[var(--color-brand)] outline-none"
                />
              </TextField>

              <TextField
                isRequired
                name="image"
                type="url"
                value={formData.image}
                onChange={(value) =>
                  setFormData((prev) => ({ ...prev, image: value }))
                }
                className="w-full"
              >
                <Label className="text-sm font-medium text-slate-700 mb-1 block">
                  Cover Image URL
                </Label>
                <Input
                  placeholder="https://images.unsplash.com/..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm shadow-sm focus-visible:border-[var(--color-brand)] outline-none"
                />
              </TextField>

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
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm shadow-sm focus-visible:border-[var(--color-brand)] outline-none"
                />
              </TextField>

              <TextField
                isRequired
                name="schedule"
                value={formData.schedule}
                onChange={(value) =>
                  setFormData((prev) => ({ ...prev, schedule: value }))
                }
                className="w-full"
              >
                <Label className="text-sm font-medium text-slate-700 mb-1 block">
                  Schedule
                </Label>
                <Input
                  placeholder="e.g., Mon, Wed, Fri - 07:00 AM"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm shadow-sm focus-visible:border-[var(--color-brand)] outline-none"
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
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm shadow-sm focus-visible:border-[var(--color-brand)] outline-none"
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
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm shadow-sm focus-visible:border-[var(--color-brand)] outline-none"
              />
            </TextField>

            <div className="flex items-center justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="secondary"
                className="font-medium text-slate-500 hover:text-slate-800 rounded-xl"
              >
                Cancel
              </Button>

              <Button
                type="submit"
                className="bg-[var(--color-brand)] text-white font-medium shadow-sm shadow-orange-500/20 px-8 hover:opacity-90 transition-opacity rounded-xl"
              >
                Publish Class
              </Button>
            </div>
          </form>
        </Card.Content>
      </Card>
    </div>
  );
}
