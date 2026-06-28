import ClassCard from "@/components/shared/ClassCard";
import React from "react";
import { getAllClasses } from "../lib/api/getAllClasses";
import FilterClient from "@/components/allClass/FilterClient";
import Pagination from "@/components/allClass/Pagination";

const LIMIT = 6;

export default async function AllClassesPage({ searchParams }) {
  const sp = await searchParams;
  const search = sp?.search || "";
  const category = sp?.category || "";
  const page = parseInt(sp?.page) || 1;

  const { classes, totalCount, totalPages, currentPage } =
    await getAllClasses(search, category, page, LIMIT);

  return (
    <div className="min-h-screen py-8 sm:py-10 px-4 bg-[var(--color-page-bg)]">
      <div className="w-full max-w-6xl mx-auto flex flex-col gap-6 sm:gap-8">
        {/* HEADER */}
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-[var(--color-brand-dark)]">
            All Classes
          </h1>
          <p className="text-sm text-gray-500">
            Browse approved fitness classes from our trainers
          </p>
        </div>

        <FilterClient search={search} category={category} />

        {/* RESULT COUNT */}
        {totalCount > 0 && (
          <p className="text-sm text-gray-500 -mb-2">
            {totalCount} {totalCount === 1 ? "class" : "classes"} found
          </p>
        )}

        {/* EMPTY STATE */}
        {classes.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-20 px-4 bg-white rounded-2xl border border-dashed border-gray-200">
            <div className="w-12 h-12 rounded-full bg-[var(--color-brand)]/10 flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-[var(--color-brand)]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </div>
            <p className="text-base font-semibold text-[var(--color-brand-dark)]">
              No classes found
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Try a different search term or category
            </p>
          </div>
        ) : (
          <>
            {/* GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {classes.map((cls) => (
                <ClassCard
                  key={cls._id}
                  _id={cls._id}
                  className={cls.className}
                  image={cls.image}
                  description={cls.description}
                  duration={cls.duration}
                  level={cls.difficulty} 
                  price={cls.price}
                  category={cls.category}
                  bookingCount={cls.bookingCount}
                />
              ))}
            </div>

            {/* PAGINATION */}
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                search={search}
                category={category}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}