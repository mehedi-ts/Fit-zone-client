"use client";

import { useState } from "react";
import {
  Card,
  Label,
  NumberField,
  Select,
  ListBox,
  Button,
} from "@heroui/react";

const SPECIALTY_OPTIONS = [
  { id: "yoga", label: "Yoga" },
  { id: "weights", label: "Weights" },
  { id: "cardio", label: "Cardio" },
  { id: "crossfit", label: "CrossFit" },
  { id: "zumba", label: "Zumba" },
];

export default function ApplyAsTrainerForm() {
  const [experience, setExperience] = useState(null);
  const [specialty, setSpecialty] = useState(null);
  const [experienceTouched, setExperienceTouched] = useState(false);
  const [specialtyTouched, setSpecialtyTouched] = useState(false);

  const isExperienceInvalid =
    experienceTouched &&
    (experience === null || experience === undefined || experience < 0);
  const isSpecialtyInvalid = specialtyTouched && !specialty;

  function handleSubmit(e) {
    e.preventDefault();
    setExperienceTouched(true);
    setSpecialtyTouched(true);
  }

  return (
    <div className="min-h-screen w-full bg-[var(--color-page-bg)] px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <div className="mx-auto w-full max-w-2xl">
        {/* Page Header */}
        <div className="mb-8 text-center sm:mb-10">
          <span className="inline-flex items-center gap-2 rounded-full bg-[var(--color-brand)]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-[var(--color-brand)] sm:text-sm">
            Trainer Network
          </span>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-[var(--color-brand-dark)] sm:text-4xl">
            Apply as Trainer
          </h1>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-[var(--color-brand-dark)]/60 sm:text-base">
            Share your experience and specialty, and join a team of trainers
            helping members reach their fitness goals.
          </p>
        </div>

        {/* Application Form Card */}
        <Card className="rounded-3xl border border-[var(--color-brand-dark)]/5 bg-white p-6 shadow-xl shadow-[var(--color-brand-dark)]/5 sm:p-8">
          <Card.Header className="mb-6 p-0">
            <Card.Title className="text-xl font-bold text-[var(--color-brand-dark)] sm:text-2xl">
              Trainer Application
            </Card.Title>
            <Card.Description className="mt-1 text-sm text-[var(--color-brand-dark)]/55">
              Fill in the details below to apply. Fields marked with * are
              required.
            </Card.Description>
          </Card.Header>

          <Card.Content className="p-0">
            <form
              onSubmit={handleSubmit}
              noValidate
              className="flex flex-col gap-6"
            >
              {/* Experience (Years) */}
              <NumberField
                value={experience}
                onChange={setExperience}
                onBlur={() => setExperienceTouched(true)}
                isRequired
                isInvalid={isExperienceInvalid}
                minValue={0}
                maxValue={60}
                className="flex w-full flex-col gap-1.5"
              >
                <Label className="text-sm font-semibold text-[var(--color-brand-dark)]">
                  Experience (Years){" "}
                  <span className="text-[var(--color-brand)]">*</span>
                </Label>
                <NumberField.Group className="flex w-full items-stretch overflow-hidden rounded-xl border border-[var(--color-brand-dark)]/15 bg-white shadow-sm transition-colors focus-within:border-[var(--color-brand)] focus-within:ring-2 focus-within:ring-[var(--color-brand)]/20">
                  <NumberField.Input
                    placeholder="e.g. 3"
                    aria-label="Years of experience"
                    className="w-full flex-1 bg-transparent px-4 py-3 text-sm text-[var(--color-brand-dark)] outline-none placeholder:text-[var(--color-brand-dark)]/35"
                  />
                  <div className="flex flex-col border-l border-[var(--color-brand-dark)]/10">
                    <NumberField.IncrementButton className="flex flex-1 items-center justify-center px-3 text-[var(--color-brand-dark)]/60 transition-colors hover:bg-[var(--color-brand)]/10 hover:text-[var(--color-brand)]">
                      +
                    </NumberField.IncrementButton>
                    <NumberField.DecrementButton className="flex flex-1 items-center justify-center border-t border-[var(--color-brand-dark)]/10 px-3 text-[var(--color-brand-dark)]/60 transition-colors hover:bg-[var(--color-brand)]/10 hover:text-[var(--color-brand)]">
                      −
                    </NumberField.DecrementButton>
                  </div>
                </NumberField.Group>
                {isExperienceInvalid ? (
                  <span className="text-xs font-medium text-red-500">
                    Please enter a valid number of years.
                  </span>
                ) : (
                  <span className="text-xs text-[var(--color-brand-dark)]/45">
                    Total years of professional or coaching experience.
                  </span>
                )}
              </NumberField>

              {/* Specialty */}
              <Select
                selectedKey={specialty}
                onSelectionChange={(key) => setSpecialty(key)}
                onBlur={() => setSpecialtyTouched(true)}
                isRequired
                isInvalid={isSpecialtyInvalid}
                className="flex w-full flex-col gap-1.5"
              >
                <Label className="text-sm font-semibold text-[var(--color-brand-dark)]">
                  Specialty <span className="text-[var(--color-brand)]">*</span>
                </Label>
                <Select.Trigger
                  aria-label="Specialty"
                  className="flex w-full items-center justify-between rounded-xl border border-[var(--color-brand-dark)]/15 bg-white px-4 py-3 text-sm text-[var(--color-brand-dark)] shadow-sm transition-colors data-[focus-visible=true]:border-[var(--color-brand)] data-[focus-visible=true]:ring-2 data-[focus-visible=true]:ring-[var(--color-brand)]/20"
                >
                  <Select.Value className="text-[var(--color-brand-dark)] data-[placeholder]:text-[var(--color-brand-dark)]/35">
                    {(selected) => selected?.label ?? "Choose your specialty"}
                  </Select.Value>
                  <Select.Indicator className="text-[var(--color-brand-dark)]/45" />
                </Select.Trigger>
                <Select.Popover className="rounded-xl border border-[var(--color-brand-dark)]/10 bg-white p-1.5 shadow-xl">
                  <ListBox>
                    {SPECIALTY_OPTIONS.map((option) => (
                      <ListBox.Item
                        key={option.id}
                        id={option.id}
                        textValue={option.label}
                        className="cursor-pointer rounded-lg px-3 py-2.5 text-sm text-[var(--color-brand-dark)] outline-none transition-colors data-[hovered=true]:bg-[var(--color-brand)]/10 data-[focused=true]:bg-[var(--color-brand)]/10 data-[selected=true]:bg-[var(--color-brand)]/15 data-[selected=true]:font-semibold"
                      >
                        <Label>{option.label}</Label>
                      </ListBox.Item>
                    ))}
                  </ListBox>
                </Select.Popover>
                {isSpecialtyInvalid && (
                  <span className="text-xs font-medium text-red-500">
                    Please select a specialty.
                  </span>
                )}
              </Select>

              {/* Submit Button */}
              <Button
                type="submit"
                className="mt-2 w-full rounded-xl bg-[var(--color-brand)] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[var(--color-brand)]/25 transition-all hover:bg-[var(--color-brand)]/90 hover:shadow-[var(--color-brand)]/35 active:scale-[0.99] sm:w-auto sm:self-end"
              >
                Submit Application
              </Button>
            </form>
          </Card.Content>
        </Card>
      </div>
    </div>
  );
}
