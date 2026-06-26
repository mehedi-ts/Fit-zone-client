import React from "react";
import { notFound } from "next/navigation";
import { getClassById } from "@/app/lib/api/getClassById";
import ClassDetails from "@/components/allClass/ClassDetails";
import { getUser } from "@/app/lib/getUser";
import { checkBooked } from "@/app/lib/api/chackBooked";

export default async function ClassDetailsPage({ params }) {
  const { id } = await params;
  const user = await getUser();

  let classData = null;

  try {
    classData = await getClassById(id);
  } catch (err) {
    console.error("Failed to load class:", err);
  }

  if (!classData) {
    notFound();
  }
  console.log("this is classId", classData._id);
  console.log("this is userId", user?.id);

  const isBooked = user ? await checkBooked(classData._id, user.id) : false;

  return (
    <div className="min-h-screen py-10 px-4">
      <div className="w-full max-w-5xl mx-auto">
        <ClassDetails classData={classData} isBooked={isBooked} />
      </div>
    </div>
  );
}
