"use client";

import { Card, Chip, Separator } from "@heroui/react";

const STATUS_CONFIG = {
  Pending: {
    color: "warning",
    title: "Application Under Review",
    description:
      "Your trainer application is currently being reviewed by our admin team.",
  },

  Approved: {
    color: "success",
    title: "Application Approved",
    description: "Congratulations! Your trainer application has been approved.",
  },

  Rejected: {
    color: "danger",
    title: "Application Rejected",
    description:
      "Unfortunately, your application was not approved at this time.",
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
  compact = false,
}) {
  const statusConfig = STATUS_CONFIG[status] || STATUS_CONFIG.Pending;

  const cardContent = (
    <Card
      className={`
      w-full
      ${compact ? "h-full" : "max-w-3xl"}
      rounded-3xl
      border
      border-[var(--color-brand-dark)]/10
      bg-white
      ${compact ? "shadow-sm" : "shadow-2xl"}
      flex
      flex-col
    `}
    >
      <Card.Header
        className={`flex flex-col items-center text-center ${
          compact ? "p-6" : "p-8"
        }`}
      >
        <Chip
          color={statusConfig.color}
          variant="flat"
          size={compact ? "md" : "lg"}
          className={`rounded-full font-bold ${
            compact ? "px-4 py-1.5" : "px-5 py-2"
          }`}
        >
          {status}
        </Chip>

        <Card.Title
          className={`
          mt-5
          font-extrabold
          text-[var(--color-brand-dark)]
          ${compact ? "text-xl" : "text-3xl"}
        `}
        >
          {statusConfig.title}
        </Card.Title>

        <Card.Description
          className={`
          mt-3
          max-w-xl
          text-[var(--color-brand-dark)]/60
          ${compact ? "text-xs" : "text-sm"}
        `}
        >
          {statusConfig.description}
        </Card.Description>
      </Card.Header>

      <Card.Content className={`flex-1 ${compact ? "p-6 pt-0" : "p-8 pt-0"}`}>
        {/* Info Cards */}

        <div className="grid gap-4 md:grid-cols-3">
          <div
            className={`
            rounded-2xl
            bg-[var(--color-brand)]/5
            text-center
            ${compact ? "p-3.5" : "p-5"}
          `}
          >
            <p className="text-xs text-[var(--color-brand-dark)]/50">
              Experience
            </p>

            <h3
              className={`
              mt-2
              font-bold
              text-[var(--color-brand-dark)]
              ${compact ? "text-lg" : "text-2xl"}
            `}
            >
              {experience}
            </h3>

            <p className="text-sm text-[var(--color-brand-dark)]/60">Years</p>
          </div>

          <div
            className={`
            rounded-2xl
            bg-[var(--color-brand)]/5
            text-center
            ${compact ? "p-3.5" : "p-5"}
          `}
          >
            <p className="text-xs text-[var(--color-brand-dark)]/50">
              Specialty
            </p>

            <h3
              className={`
              mt-2
              font-bold
              text-[var(--color-brand-dark)]
              ${compact ? "text-base" : "text-xl"}
            `}
            >
              {specialty}
            </h3>
          </div>

          <div
            className={`
            rounded-2xl
            bg-[var(--color-brand)]/5
            text-center
            ${compact ? "p-3.5" : "p-5"}
          `}
          >
            <p className="text-xs text-[var(--color-brand-dark)]/50">
              Applied Date
            </p>

            <h3
              className="
              mt-2
              text-sm
              font-semibold
              text-[var(--color-brand-dark)]
            "
            >
              {formatDate(createdAt)}
            </h3>
          </div>
        </div>

        {/* Feedback */}

        {feedback && (
          <>
            <Separator className={compact ? "my-5" : "my-8"} />

            <div
              className={`
              rounded-2xl
              border
              border-amber-200
              bg-amber-50
              ${compact ? "p-4" : "p-6"}
            `}
            >
              <h3
                className={`
                mb-2
                font-bold
                text-amber-800
                ${compact ? "text-sm" : "text-lg"}
              `}
              >
                💬 Admin Feedback
              </h3>

              <p
                className={`
                leading-relaxed
                text-amber-900
                ${compact ? "text-xs" : ""}
              `}
              >
                {feedback}
              </p>
            </div>
          </>
        )}

        {!compact && (
          <div
            className="
            mt-8
            rounded-2xl
            bg-[var(--color-brand)]/5
            p-5
            text-center
          "
          >
            <p
              className="
              text-sm
              leading-relaxed
              text-[var(--color-brand-dark)]/70
            "
            >
              {status === "Pending" &&
                "Please wait while admin reviews your application."}

              {status === "Approved" &&
                "You can now work as an official trainer."}

              {status === "Rejected" &&
                "Please check admin feedback and try again later."}
            </p>
          </div>
        )}
      </Card.Content>
    </Card>
  );

  if (compact) {
    return cardContent;
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-10">
      {cardContent}
    </div>
  );
}