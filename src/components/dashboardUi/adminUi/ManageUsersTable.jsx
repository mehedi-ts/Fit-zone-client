"use client";

import {
  Shield,
  ShieldCheck,
  User,
  Users,
  Ban,
  CheckCircle,
  Dumbbell,
} from "lucide-react";

export default function ManageUsersTable({
  users = [],
  handleBlock,
  handleUnblock,
  handleMakeAdmin,
}) {
  return (
    <div className="w-full">
      {/* Desktop Table */}
      <div className="hidden overflow-hidden rounded-2xl border bg-white shadow-sm md:block">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b bg-slate-50">
              <th className="px-6 py-4 text-xs font-medium text-slate-500">
                User
              </th>

              <th className="px-6 py-4 text-xs font-medium text-slate-500">
                Email
              </th>

              <th className="px-6 py-4 text-xs font-medium text-slate-500">
                Role
              </th>

              <th className="px-6 py-4 text-xs font-medium text-slate-500">
                Status
              </th>

              <th className="px-6 py-4 text-xs font-medium text-slate-500">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={5}>
                  <EmptyState />
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr
                  key={user._id}
                  className="border-b transition hover:bg-slate-50"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <UserIcon />

                      <div>
                        <p className="font-medium">{user.name}</p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-600">
                    {user.email}
                  </td>

                  <td className="px-6 py-4">
                    <RoleBadge role={user.role} />
                  </td>

                  <td className="px-6 py-4">
                    <StatusBadge status={user.status} />
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-2">
                      {user.status === "blocked" ? (
                        <button
                          onClick={() => handleUnblock(user)}
                          className="rounded-lg bg-green-100 px-3 py-2 text-xs font-medium text-green-700 hover:bg-green-200"
                        >
                          Unblock
                        </button>
                      ) : (
                        <button
                          onClick={() => handleBlock(user)}
                          className="rounded-lg bg-red-100 px-3 py-2 text-xs font-medium text-red-700 hover:bg-red-200"
                        >
                          Block
                        </button>
                      )}

                      {user.role !== "admin" && (
                        <button
                          onClick={() => handleMakeAdmin(user)}
                          className="rounded-lg bg-indigo-100 px-3 py-2 text-xs font-medium text-indigo-700 hover:bg-indigo-200"
                        >
                          Make Admin
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="space-y-4 md:hidden">
        {users.length === 0 ? (
          <div className="rounded-2xl border bg-white">
            <EmptyState />
          </div>
        ) : (
          users.map((user) => (
            <div
              key={user._id}
              className="rounded-2xl border bg-white p-4 shadow-sm"
            >
              <div className="mb-4 flex items-center gap-3">
                <UserIcon />

                <div>
                  <h3 className="font-semibold">{user.name}</h3>

                  <p className="text-sm text-slate-500">{user.email}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="mb-1 text-xs text-slate-400">Role</p>
                  <RoleBadge role={user.role} />
                </div>

                <div>
                  <p className="mb-1 text-xs text-slate-400">Status</p>
                  <StatusBadge status={user.status} />
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {user.status === "blocked" ? (
                  <button
                    onClick={() => handleUnblock(user)}
                    className="flex w-28 items-center justify-center rounded-lg bg-green-100 px-3 py-2 text-xs font-medium text-green-700 hover:bg-green-200"
                  >
                    Unblock
                  </button>
                ) : (
                  <button
                    onClick={() => handleBlock(user)}
                    className="flex w-28 items-center justify-center rounded-lg bg-red-100 px-3 py-2 text-xs font-medium text-red-700 hover:bg-red-200"
                  >
                    Block
                  </button>
                )}

                {user.role !== "admin" && (
                  <button
                    onClick={() => handleMakeAdmin(user)}
                    className="flex w-28 items-center justify-center rounded-lg bg-indigo-100 px-3 py-2 text-xs font-medium text-indigo-700 hover:bg-indigo-200"
                  >
                    Make Admin
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function UserIcon() {
  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50">
      <User className="h-5 w-5 text-indigo-600" />
    </div>
  );
}

function RoleBadge({ role }) {
  const roleConfig = {
    admin: {
      icon: <ShieldCheck size={14} />,
      className: "bg-purple-100 text-purple-700",
      label: "Admin",
    },
    trainer: {
      icon: <Dumbbell size={14} />,
      className: "bg-amber-100 text-amber-700",
      label: "Trainer",
    },
    member: {
      icon: <Shield size={14} />,
      className: "bg-slate-100 text-slate-700",
      label: "Member",
    },
  };

  const config = roleConfig[role] || {
    icon: <Shield size={14} />,
    className: "bg-slate-100 text-slate-700",
    label: role,
  };

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${config.className}`}
    >
      {config.icon}
      {config.label}
    </span>
  );
}

function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${
        status === "blocked"
          ? "bg-red-100 text-red-700"
          : "bg-green-100 text-green-700"
      }`}
    >
      {status === "blocked" ? <Ban size={14} /> : <CheckCircle size={14} />}
      {status}
    </span>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-indigo-50">
        <Users className="h-7 w-7 text-indigo-500" />
      </div>

      <p className="text-sm font-medium">No users found</p>

      <p className="text-xs text-slate-400">
        Registered users will appear here.
      </p>
    </div>
  );
}
