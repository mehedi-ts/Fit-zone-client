"use client";

import { Card, Chip, Separator } from "@heroui/react";

const STATUS_CONFIG = {
  Pending: {
    color: "warning",
    title: "Application Under Review",
    description:
      "Your trainer application is currently being reviewed by our admin team.",
    footerNote: "Please wait while admin reviews your application.",
  },
  Approved: {
    color: "success",
    title: "Application Approved",
    description: "Congratulations! Your trainer application has been approved.",
    footerNote: "You can now work as an official trainer.",
  },
  Rejected: {
    color: "danger",
    title: "Application Rejected",
    description:
      "Unfortunately, your application was not approved at this time.",
    footerNote: "Please check admin feedback and try again later.",
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
  feedback,
}) {
  const statusConfig = STATUS_CONFIG[status] || STATUS_CONFIG.Pending;

  return (
    <Card
      className="
        w-full
        h-full
        rounded-3xl
        border
        border-[var(--color-brand-dark)]/10
        bg-white
        shadow-sm
        flex
        flex-col
      "
    >
      {/* Header */}
      <Card.Header className="flex flex-col items-center text-center p-6">
        <Chip
          color={statusConfig.color}
          variant="flat"
          size="md"
          className="rounded-full font-bold px-4 py-1.5"
        >
          {status}
        </Chip>

        <Card.Title
          className="
            mt-4
            text-xl
            font-extrabold
            text-[var(--color-brand-dark)]
          "
        >
          {statusConfig.title}
        </Card.Title>

        <Card.Description
          className="
            mt-2
            max-w-xs
            text-xs
            text-[var(--color-brand-dark)]/60
          "
        >
          {statusConfig.description}
        </Card.Description>
      </Card.Header>

      {/* Content */}
      <Card.Content className="flex-1 flex flex-col p-6 pt-0 gap-4">
        {/* Info grid */}
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-2xl bg-[var(--color-brand)]/5 text-center p-3.5">
            <p className="text-xs text-[var(--color-brand-dark)]/50">
              Experience
            </p>
            <h3 className="mt-1.5 text-lg font-bold text-[var(--color-brand-dark)]">
              {experience}
            </h3>
            <p className="text-xs text-[var(--color-brand-dark)]/60">Years</p>
          </div>

          <div className="rounded-2xl bg-[var(--color-brand)]/5 text-center p-3.5">
            <p className="text-xs text-[var(--color-brand-dark)]/50">
              Specialty
            </p>
            <h3 className="mt-1.5 text-base font-bold text-[var(--color-brand-dark)]">
              {specialty}
            </h3>
          </div>

          <div className="rounded-2xl bg-[var(--color-brand)]/5 text-center p-3.5">
            <p className="text-xs text-[var(--color-brand-dark)]/50">
              Applied
            </p>
            <h3 className="mt-1.5 text-xs font-semibold text-[var(--color-brand-dark)]">
              {formatDate(createdAt)}
            </h3>
          </div>
        </div>

        {/* Feedback */}
        {feedback && (
          <>
            <Separator className="my-1" />
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
              <h3 className="mb-1.5 text-sm font-bold text-amber-800">
                💬 Admin Feedback
              </h3>
              <p className="text-xs leading-relaxed text-amber-900">
                {feedback}
              </p>
            </div>
          </>
        )}

        {/* Footer note */}
        <div className="mt-auto rounded-2xl bg-[var(--color-brand)]/5 p-4 text-center">
          <p className="text-xs leading-relaxed text-[var(--color-brand-dark)]/70">
            {statusConfig.footerNote}
          </p>
        </div>
      </Card.Content>
    </Card>
  );
}