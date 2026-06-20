import React from "react";
import { notFound } from "next/navigation";
import { getClassById } from "@/app/lib/api/getClassById";
import ClassDetails from "@/components/allClass/ClassDetails";

export default async function ClassDetailsPage({ params }) {
  const { id } = await params;

  let classData = null;

  try {
    classData = await getClassById(id);
  } catch (err) {
    console.error("Failed to load class:", err);
  }

  if (!classData) {
    notFound();
  }

  return (
    <div className="min-h-screen py-10 px-4">
      <div className="w-full max-w-5xl mx-auto">
        <ClassDetails classData={classData} />
      </div>
    </div>
  );
}
