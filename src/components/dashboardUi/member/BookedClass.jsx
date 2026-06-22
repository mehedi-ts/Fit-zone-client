"use client";

import { CalendarX2, User, Clock, ArrowRight, Dumbbell } from "lucide-react";

export default function BookedClass({ bookingData = [] }) {
  return (
    <div className="w-full">
      {/* Desktop Table */}
      <div className="hidden overflow-hidden rounded-2xl border bg-white shadow-sm md:block">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b bg-slate-50">
              <th className="px-6 py-4 text-xs font-medium text-slate-500">
                Class Name
              </th>

              <th className="px-6 py-4 text-xs font-medium text-slate-500">
                Trainer
              </th>

              <th className="px-6 py-4 text-xs font-medium text-slate-500">
                Schedule
              </th>

              <th className="px-6 py-4 text-xs font-medium text-slate-500">
                Time
              </th>

              <th className="px-6 py-4 text-xs font-medium text-slate-500">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {bookingData.length === 0 ? (
              <tr>
                <td colSpan={5}>
                  <EmptyState />
                </td>
              </tr>
            ) : (
              bookingData.map((booking) => (
                <tr
                  key={booking._id}
                  className="border-b transition hover:bg-slate-50"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <IconBox />
                      <span className="font-medium">
                        {booking.classInfo?.className}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <Info icon={<User size={16} />}>
                      {booking.classInfo?.trainerName}
                    </Info>
                  </td>

                  <td className="px-6 py-4">
                    <Schedule days={booking.classInfo?.schedule || []} />
                  </td>

                  <td className="px-6 py-4">
                    <Info icon={<Clock size={16} />}>
                      {booking.classInfo?.startTime} •{" "}
                      {booking.classInfo?.duration}
                    </Info>
                  </td>

                  <td className="px-6 py-4">
                    <ActionButton booking={booking} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="space-y-4 md:hidden">
        {bookingData.length === 0 ? (
          <div className="rounded-2xl border bg-white">
            <EmptyState />
          </div>
        ) : (
          bookingData.map((booking) => (
            <div
              key={booking._id}
              className="rounded-2xl border bg-white p-4 shadow-sm"
            >
              <div className="mb-5 flex items-center gap-3">
                <IconBox />

                <h3 className="font-semibold">
                  {booking.classInfo?.className}
                </h3>
              </div>

              <div className="space-y-4">
                <Info icon={<User size={16} />}>
                  {booking.classInfo?.trainerName}
                </Info>

                <div>
                  <p className="mb-2 text-xs text-slate-400">Schedule</p>

                  <Schedule days={booking.classInfo?.schedule || []} />
                </div>

                <Info icon={<Clock size={16} />}>
                  {booking.classInfo?.startTime} • {booking.classInfo?.duration}
                </Info>
              </div>

              <div className="mt-5">
                <ActionButton booking={booking} />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function Schedule({ days }) {
  if (!days?.length) {
    return (
      <span className="text-sm text-slate-400">No schedule available</span>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      {days.map((day, index) => (
        <span
          key={index}
          className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-600"
        >
          {day.toUpperCase()}
        </span>
      ))}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-indigo-50">
        <CalendarX2 className="h-7 w-7 text-indigo-500" />
      </div>

      <p className="text-sm font-medium">No booked classes found</p>

      <p className="text-xs text-slate-400">
        Your booked classes will appear here.
      </p>
    </div>
  );
}

function IconBox() {
  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50">
      <Dumbbell className="h-5 w-5 text-indigo-500" />
    </div>
  );
}

function Info({ icon, children }) {
  return (
    <div className="flex items-center gap-2 text-sm text-slate-600">
      <span className="text-slate-400">{icon}</span>
      {children}
    </div>
  );
}

function ActionButton({ booking }) {
  return (
    <button
      onClick={() => console.log(booking)}
      className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-medium text-white transition hover:bg-indigo-700 md:w-auto"
    >
      View Details
      <ArrowRight className="h-4 w-4" />
    </button>
  );
}
