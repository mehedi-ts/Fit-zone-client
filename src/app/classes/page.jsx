import ClassCard from "@/components/shared/ClassCard";
import React from "react";
import { getAllClasses } from "../lib/api/getAllClasses";
// TODO: fix this import path to wherever ClassCard actually lives

// TODO: replace this placeholder with a real fetch once the
// backend action/API exists, e.g.:
// import { getAllClasses } from "@/app/lib/api/getAllClasses";
// const classes = await getAllClasses();

export default async function AllClassesPage() {
  const classes = await getAllClasses();

  return (
    <div className="min-h-screen py-10 px-4">
      <div className="w-full max-w-6xl mx-auto flex flex-col gap-8">
        {/* Header */}
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight text-brand-dark">
            All Classes
          </h1>
          <p className="text-sm text-slate-400">
            Browse every class our trainers are currently offering.
          </p>
        </div>

        {/* Empty state */}
        {classes.length === 0 && (
          <div className="bg-white/70 backdrop-blur-md border border-slate-100 shadow-sm rounded-3xl p-10 flex flex-col items-center text-center gap-3">
            <p className="text-base font-medium text-slate-700">
              No classes available right now
            </p>
            <p className="text-sm text-slate-400 max-w-sm">
              Check back soon — new classes are added by trainers regularly.
            </p>
          </div>
        )}

        {/* Classes grid */}
        {classes.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {classes.map((cls) => (
              <ClassCard
                key={cls._id}
                _id={cls._id}
                className={cls.className}
                image={cls.image}
                description={cls.description}
                duration={cls.duration}
                level={cls.level}
                price={cls.price}
                category={cls.category}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
