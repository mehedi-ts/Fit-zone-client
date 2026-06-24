"use client";
import { useUser } from "@/app/lib/getUserClient";
import { Bars } from "@gravity-ui/icons";
import {
  LayoutDashboard,
  CalendarCheck,
  Heart,
  UserCog,
  BookOpen,
  PlusCircle,
  MessageSquare,
  Users,
  Shield,
  CreditCard,
  GraduationCap,
  UserPlus,
  Dumbbell,
  MessageSquarePlus,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function Sidebar() {
  const userData = useUser();
  console.log("User Data:", userData);
  const [active, setActive] = useState("Home");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const dashboardItems = {
    member: [
      {
        icon: LayoutDashboard,
        label: "Overview",
        href: "/dashboard/member",
      },
      {
        icon: CalendarCheck,
        label: "Booked Classes",
        href: "/dashboard/member/booked-classes",
      },
      {
        icon: UserPlus,
        label: "Apply as Trainer",
        href: "/dashboard/member/apply-trainer",
      },
      {
        icon: Heart,
        label: "Favorite Classes",
        href: "/dashboard/member/favorite-classes",
      },
    ],

    trainer: [
      {
        icon: LayoutDashboard,
        label: "Overview",
        href: "/dashboard/trainer",
      },
      {
        icon: PlusCircle,
        label: "Add Class",
        href: "/dashboard/trainer/add-class",
      },
      {
        icon: Dumbbell,
        label: "My Classes",
        href: "/dashboard/trainer/my-classes",
      },
      {
        icon: MessageSquarePlus,
        label: "Add Forum Post",
        href: "/dashboard/trainer/add-forum-post",
      },
      {
        icon: MessageSquare,
        label: "My Forum Posts",
        href: "/dashboard/trainer/my-forum",
      },
    ],

    admin: [
      {
        icon: LayoutDashboard,
        label: "Overview",
        href: "/dashboard/admin",
      },
      {
        icon: Users,
        label: "Manage Users",
        href: "/dashboard/admin/manage-users",
      },
      {
        icon: GraduationCap,
        label: "Applied Trainers",
        href: "/dashboard/applied-trainers",
      },
      {
        icon: UserCog,
        label: "Manage Trainers",
        href: "/dashboard/admin/manage-trainers",
      },
      {
        icon: BookOpen,
        label: "Manage Classes",
        href: "/dashboard/admin/manage-classes",
      },
      {
        icon: MessageSquarePlus,
        label: "Add Forum Post",
        href: "/dashboard/admin/add-forum-post",
      },
      {
        icon: ShieldCheck,
        label: "Forum Post Manage",
        href: "/dashboard/admin/forum-post-manage",
      },
      {
        icon: CreditCard,
        label: "Transactions",
        href: "/dashboard/admin/transactions",
      },
    ],
  };
  const role = userData?.role || "member"; // Default to 'member' if role is not available
  const navMain = dashboardItems[role];

  const NavItem = ({ icon: Icon, label, badge, href }) => (
    <Link href={href}>
      <button
        type="button"
        onClick={() => {
          setActive(label);
          setDrawerOpen(false);
        }}
        className={`
        group relative flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm
        transition-all duration-150
        ${
          active === label
            ? "bg-[rgba(255,107,53,0.1)] font-medium text-[#ff6b35]"
            : "font-normal text-default-500 hover:bg-default-100 hover:text-foreground"
        }
      `}
      >
        {active === label && (
          <span className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-sm bg-[#ff6b35]" />
        )}
        <Icon className="size-[18px] shrink-0" />
        <span>{label}</span>
        {badge && (
          <span className="ml-auto rounded-full bg-[#ff6b35] px-1.5 py-px text-[10px] font-medium leading-4 text-white">
            {badge}
          </span>
        )}
      </button>
    </Link>
  );

  const navContent = (
    <nav className="flex flex-col gap-0.5">
      {navMain.map((item) => (
        <NavItem key={item.label} {...item} />
      ))}
    </nav>
  );

  const brandBlock = (
    <div className="flex items-center gap-2.5">
      <div className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-[10px] bg-[#ff6b35] text-white">
        <svg
          width="16"
          height="16"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
        </svg>
      </div>
      <div>
        <p className="text-sm font-medium text-foreground">Dashboard</p>
        <p className="text-[11px] text-default-400">Workspace</p>
      </div>
    </div>
  );

  const userBlock = (
    <div className="flex items-center gap-2.5 rounded-lg px-2 py-2 transition-colors hover:bg-default-100 cursor-pointer">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-brand to-[#ff9a6c] text-[11px] font-medium text-white">
        {userData?.name?.slice(0, 2).toUpperCase() || "RK"}
      </div>
      <div className="min-w-0">
        <p className="truncate text-sm font-medium text-foreground">
          {userData?.name || ""}
        </p>
        <p className="text-[11px] text-default-400">{userData?.role || ""}</p>
      </div>
      <span className="ml-auto text-default-300">···</span>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="sticky top-0 hidden h-screen w-80 shrink-0 flex-col border-r border-default-100 bg-background lg:flex">
        <div className="border-b border-default-100 px-5 py-6">
          {brandBlock}
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-4">{navContent}</div>

        <div className="border-t border-default-100 px-3 py-4">{userBlock}</div>
      </aside>

      {/* Mobile Trigger + Drawer */}
      <div className="lg:hidden">
        {/* Hamburger button */}
        <button
          type="button"
          onClick={() => setDrawerOpen(true)}
          className="fixed left-4 top-3 z-50 flex h-9 w-9 items-center justify-center rounded-lg border border-default-200 bg-background shadow-sm"
          aria-label="Open menu"
        >
          <Bars className="size-4" />
        </button>

        {/* Backdrop */}
        {drawerOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/35 backdrop-blur-[2px] transition-opacity"
            onClick={() => setDrawerOpen(false)}
          />
        )}

        {/* Drawer */}
        <div
          className={`
            fixed left-0 top-0 z-50 flex h-full w-55 flex-col bg-background shadow-xl
            transition-transform duration-250 ease-out
            ${drawerOpen ? "translate-x-0" : "-translate-x-full"}
          `}
        >
          <div className="flex items-center border-b border-default-100 px-4 py-4.5">
            {brandBlock}
            <button
              type="button"
              onClick={() => setDrawerOpen(false)}
              className="ml-auto flex h-7 w-7 items-center justify-center rounded-md text-default-400 hover:bg-default-100"
              aria-label="Close menu"
            >
              ✕
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-3 py-4">{navContent}</div>

          <div className="border-t border-default-100 px-3 py-4">
            {userBlock}
          </div>
        </div>
      </div>
    </>
  );
}
