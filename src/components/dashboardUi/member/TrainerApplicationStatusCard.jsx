"use client";

import { Card, Chip, Separator } from "@heroui/react";

const STATUS_CONFIG = {
  Pending: {
    color: "warning",
    dot: "bg-amber-500",
    description: "An admin will review your application shortly.",
  },
  Approved: {
    color: "success",
    dot: "bg-[var(--color-brand-success)]",
    description: "Your application has been approved.",
  },
  Rejected: {
    color: "danger",
    dot: "bg-red-500",
    description: "Your application was not approved this time.",
  },
};

function formatDate(dateString) {
  if (!dateString) return "—";
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return dateString;
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function ApplicationStatusCard({
  status = "Pending",
  experience,
  specialty,
  createdAt,
}) {
  const statusConfig = STATUS_CONFIG[status] ?? STATUS_CONFIG.Pending;

  return (
    <div className="w-full max-w-2xl">
      <Card className="rounded-3xl border border-[var(--color-brand-dark)]/5 bg-white p-6 shadow-xl shadow-[var(--color-brand-dark)]/5 sm:p-8">
        {/* Header: title + status badge */}
        <Card.Header className="mb-6 flex flex-col gap-4 p-0 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <Card.Title className="text-xl font-bold text-[var(--color-brand-dark)] sm:text-2xl">
              Trainer Application
            </Card.Title>
            <Card.Description className="mt-1 text-sm text-[var(--color-brand-dark)]/55">
              Here&apos;s the current status of your submission.
            </Card.Description>
          </div>

          <Chip
            color={statusConfig.color}
            variant="soft"
            size="lg"
            className="self-start rounded-full px-4 py-2 text-sm font-semibold sm:self-auto"
          >
            <span className={`h-2 w-2 rounded-full ${statusConfig.dot}`} />
            <Chip.Label>{status}</Chip.Label>
          </Chip>
        </Card.Header>

        <Card.Content className="p-0">
          {/* Information rows */}
          <div className="flex flex-col divide-y divide-[var(--color-brand-dark)]/8">
            <div className="flex items-center justify-between gap-4 py-3.5">
              <span className="text-sm font-medium text-[var(--color-brand-dark)]/55">
                Experience
              </span>
              <span className="text-sm font-semibold text-[var(--color-brand-dark)]">
                {experience} {experience === 1 ? "Year" : "Years"}
              </span>
            </div>

            <div className="flex items-center justify-between gap-4 py-3.5">
              <span className="text-sm font-medium text-[var(--color-brand-dark)]/55">
                Specialty
              </span>
              <span className="text-sm font-semibold text-[var(--color-brand-dark)]">
                {specialty}
              </span>
            </div>

            <div className="flex items-center justify-between gap-4 py-3.5">
              <span className="text-sm font-medium text-[var(--color-brand-dark)]/55">
                Submission Date
              </span>
              <span className="text-sm font-semibold text-[var(--color-brand-dark)]">
                {formatDate(createdAt)}
              </span>
            </div>
          </div>

          <Separator className="my-6 bg-[var(--color-brand-dark)]/8" />

          {/* Information section */}
          <div className="flex items-start gap-3 rounded-2xl bg-[var(--color-brand)]/5 p-4 sm:p-5">
            <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-brand)]/15 text-[var(--color-brand)]">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <path
                  d="M12 8v5M12 16h.01M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <p className="text-sm leading-relaxed text-[var(--color-brand-dark)]/75">
              Your trainer application has been submitted successfully and is
              currently under review by the admin team.
            </p>
          </div>
        </Card.Content>
      </Card>
    </div>
  );
}
