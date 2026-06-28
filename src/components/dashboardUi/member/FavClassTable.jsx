"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { HeartCrack, ImageIcon } from "lucide-react";
import { useUser } from "@/app/lib/getUserClient";
import { getTokenClient } from "@/app/lib/getTokenClient";

export default function FavoriteClassesTable({ favoriteClasses = [] }) {
  const router = useRouter();
  const user = useUser();
  const userId = user?.id;
  const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

  const handleDelete = async (classId) => {
    const token = await getTokenClient();
    try {
      const res = await fetch(`${SERVER_URL}/favorites`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId, classId }),
      });

      const data = await res.json();

      if (data.success) {
        router.refresh();
      }
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  return (
    <div className="w-full">
      {/* Desktop Table */}
      <div className="hidden overflow-hidden rounded-2xl border bg-white shadow-sm md:block">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b bg-slate-50">
              <th className="px-6 py-4 text-xs font-medium text-slate-500">
                Image
              </th>

              <th className="px-6 py-4 text-xs font-medium text-slate-500">
                Class Name
              </th>

              <th className="px-6 py-4 text-xs font-medium text-slate-500">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {favoriteClasses.length === 0 ? (
              <tr>
                <td colSpan={3}>
                  <EmptyState />
                </td>
              </tr>
            ) : (
              favoriteClasses.map((item) => (
                <tr
                  key={item._id}
                  className="border-b transition hover:bg-slate-50"
                >
                  <td className="px-6 py-4">
                    <div className="relative h-12 w-16 overflow-hidden rounded-lg border bg-slate-100">
                      {item?.image ? (
                        <Image
                          src={item.image}
                          alt={item.className || "Class"}
                          fill
                          unoptimized
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center">
                          <ImageIcon className="h-4 w-4 text-slate-400" />
                        </div>
                      )}
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <span className="font-medium text-slate-800">
                      {item.className}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <DeleteButton item={item} handleDelete={handleDelete} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="space-y-4 md:hidden">
        {favoriteClasses.length === 0 ? (
          <div className="rounded-2xl border bg-white">
            <EmptyState />
          </div>
        ) : (
          favoriteClasses.map((item) => (
            <div
              key={item._id}
              className="rounded-2xl border bg-white p-4 shadow-sm"
            >
              <div className="flex items-center gap-4">
                <div className="relative h-16 w-20 overflow-hidden rounded-lg border bg-slate-100">
                  {item?.image ? (
                    <Image
                      src={item.image}
                      alt={item.className || "Class"}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <ImageIcon className="h-5 w-5 text-slate-400" />
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <h3 className="font-semibold text-slate-800">
                    {item.className}
                  </h3>
                </div>
              </div>

              <div className="mt-4">
                <DeleteButton item={item} handleDelete={handleDelete} />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand/10">
        <ImageIcon className="h-7 w-7 text-brand" />
      </div>

      <p className="text-sm font-medium text-slate-800">
        No favorite classes found
      </p>

      <p className="text-xs text-slate-400">
        Your favorite classes will appear here.
      </p>
    </div>
  );
}

function DeleteButton({ item, handleDelete }) {
  return (
    <button
      onClick={() => handleDelete(item._id)}
      className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-500 px-4 py-2 text-xs font-medium text-white transition hover:bg-red-600 md:w-auto cursor-pointer"
    >
      Remove
      <HeartCrack className="h-4 w-4" />
    </button>
  );
}
