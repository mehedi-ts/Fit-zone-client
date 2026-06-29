"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import Logo from "./Logo";

import { Avatar, Button, Dropdown, Drawer } from "@heroui/react";

import {
  Menu,
  LayoutDashboard,
  LogOut,
  ChevronDown,
  Home,
  Users,
  MessageCircle,
  Bell,
} from "lucide-react";
import { authClient } from "@/app/lib/auth-client";

const NAV_ITEMS = [
  { name: "Home", href: "/", icon: Home },
  { name: "All Classes", href: "/classes", icon: Users },
  { name: "Community Forum", href: "/community", icon: MessageCircle },
];

export default function Navbar() {
  const { data: session, error } = authClient.useSession();
  const user = session?.user;
  // console.log(user, "Session Error:", error);
  const router = useRouter();
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");

  const [open, setOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);

  const dashboardHref = user?.role ? `/dashboard/${user.role}` : "/dashboard";

  const goTo = (href) => {
    router.push(href);
    setOpen(false);
  };

  const handleLogout = async () => {
    await authClient.signOut();
    setOpen(false);
  };

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`
      sticky top-0 z-50
      border-b border-white/30
      bg-page-bg/70
      backdrop-blur-xl ${isDashboard ? "hidden" : ""}
      `}
    >
      <div
        className="
        mx-auto
        max-w-7xl
        flex
        items-center
        justify-between
        px-6
        py-4
        "
      >
        {/* Logo */}
        <Logo />

        {/* Desktop Nav */}
        <nav
          aria-label="Primary"
          className="
          hidden md:flex
          items-center
          gap-2
          "
        >
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.href);

            return (
              <Link
                key={item.name}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`
                relative
                rounded-lg
                px-3 py-2
                text-sm
                font-semibold
                transition-colors
                duration-200
                ${
                  active
                    ? "text-brand-dark"
                    : "text-brand-dark/70 hover:text-brand-dark hover:bg-black/5"
                }
                `}
              >
                {item.name}
                <span
                  className={`
                  absolute
                  left-3 right-3
                  -bottom-1.25
                  h-0.5
                  rounded-full
                  bg-brand
                  transition-opacity
                  duration-200
                  ${active ? "opacity-100" : "opacity-0"}
                  `}
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          {/* Desktop Auth/Profile */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                {/* Dashboard — distinct pill button, separated from regular nav links */}
                <Link
                  href={dashboardHref}
                  className={`
                  flex
                  items-center
                  gap-1.5
                  rounded-full
                  px-4
                  py-2
                  text-sm
                  font-semibold
                  border
                  transition-all
                  duration-200
                  ${
                    isActive("/dashboard")
                      ? "bg-brand text-white border-brand shadow-sm"
                      : "bg-brand/10 text-brand border-brand/20 hover:bg-brand/15"
                  }
                  `}
                >
                  <LayoutDashboard size={16} />
                  Dashboard
                </Link>

                {/* Notification */}
                <Button
                  variant="light"
                  aria-label={
                    hasUnread ? "Notifications (unread)" : "Notifications"
                  }
                  onPress={() => setHasUnread(false)}
                  className="
                  relative
                  h-11
                  w-11
                  rounded-full
                  transition-colors
                  duration-200
                  hover:bg-black/5
                  "
                >
                  <Bell size={20} />

                  {hasUnread && (
                    <span
                      aria-hidden="true"
                      className="
                      absolute
                      top-2
                      right-2
                      h-2
                      w-2
                      rounded-full
                      bg-red-500
                      ring-2
                      ring-page-bg
                      "
                    />
                  )}
                </Button>

                {/* Profile Dropdown */}
                <Dropdown>
                  <Button
                    variant="light"
                    aria-label="Open account menu"
                    className="
                    flex
                    items-center
                    gap-2
                    rounded-full
                    p-1
                    transition-colors
                    duration-200
                    hover:bg-black/5
                    "
                  >
                    <Avatar
                      className="
                      h-11
                      w-11
                      ring-2
                      ring-brand/30
                      "
                    >
                      <Avatar.Image src={user.image} alt={user.name} />
                      <Avatar.Fallback>{user.name.slice(0, 2)}</Avatar.Fallback>
                    </Avatar>

                    <div className="hidden lg:block text-left">
                      <p className="text-sm font-bold leading-tight">
                        {user.name}
                      </p>
                      <p className="text-xs text-gray-500 leading-tight">
                        {user.role}
                      </p>
                    </div>

                    <ChevronDown size={16} className="text-gray-400" />
                  </Button>

                  <Dropdown.Popover
                    className="
                    w-64
                    rounded-2xl
                    "
                  >
                    <Dropdown.Menu>
                      <Dropdown.Item
                        id="dashboard"
                        onAction={() => goTo(dashboardHref)}
                      >
                        <div className="flex items-center gap-3">
                          <LayoutDashboard size={18} />
                          Dashboard
                        </div>
                      </Dropdown.Item>

                      <Dropdown.Item
                        id="logout"
                        onAction={handleLogout}
                        className="text-red-500"
                      >
                        <div className="flex items-center gap-3">
                          <LogOut size={18} />
                          Logout
                        </div>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown.Popover>
                </Dropdown>
              </>
            ) : (
              <>
                <Button
                  variant="light"
                  onPress={() => router.push("/login")}
                  className="
                  font-semibold
                  text-brand-dark
                  transition-colors
                  duration-200
                  hover:bg-black/5
                  "
                >
                  Login
                </Button>

                <Button
                  onPress={() => router.push("/register")}
                  className="
                  bg-brand
                  text-white
                  rounded-xl
                  transition-transform
                  duration-200
                  hover:brightness-110
                  active:scale-[0.97]
                  "
                >
                  Register
                </Button>
              </>
            )}
          </div>

          {/* Mobile Drawer */}
          <Drawer isOpen={open} onOpenChange={setOpen}>
            <Button
              onPress={() => setOpen(true)}
              aria-label="Open menu"
              className="
              md:hidden
              bg-brand
              text-white
              rounded-xl
              transition-transform
              duration-200
              active:scale-95
              "
            >
              <Menu size={22} />
            </Button>

            <Drawer.Backdrop>
              <Drawer.Content placement="left">
                <Drawer.Dialog>
                  <Drawer.CloseTrigger />

                  <Drawer.Header>
                    <Drawer.Heading>Menu</Drawer.Heading>
                  </Drawer.Header>

                  <Drawer.Body>
                    {/* Profile */}
                    {user && (
                      <div
                        className="
                        flex
                        gap-3
                        p-4
                        rounded-2xl
                        bg-white
                        shadow-sm
                        ring-1
                        ring-black/5
                        mb-5
                        "
                      >
                        <Avatar className="h-14 w-14 ring-2 ring-brand/30">
                          <Avatar.Image src={user.photo} alt={user.name} />
                          <Avatar.Fallback>MH</Avatar.Fallback>
                        </Avatar>

                        <div className="flex flex-col justify-center">
                          <p className="font-bold text-brand-dark leading-tight">
                            {user.name}
                          </p>
                          <p className="text-sm text-gray-500 leading-tight">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Mobile Nav */}
                    <nav aria-label="Primary" className="flex flex-col gap-1">
                      {NAV_ITEMS.map((item) => {
                        const Icon = item.icon;
                        const active = isActive(item.href);

                        return (
                          <button
                            key={item.name}
                            onClick={() => goTo(item.href)}
                            aria-current={active ? "page" : undefined}
                            className={`
                            flex
                            items-center
                            gap-3
                            p-3
                            rounded-xl
                            text-left
                            transition-colors
                            duration-150
                            ${
                              active
                                ? "bg-brand/10 text-brand-dark font-semibold"
                                : "hover:bg-gray-100"
                            }
                            `}
                          >
                            <Icon size={20} />
                            {item.name}
                          </button>
                        );
                      })}

                      {user && (
                        <button
                          onClick={() => goTo(dashboardHref)}
                          aria-current={
                            isActive("/dashboard") ? "page" : undefined
                          }
                          className={`
                          flex
                          items-center
                          gap-3
                          p-3
                          rounded-xl
                          text-left
                          transition-colors
                          duration-150
                          ${
                            isActive("/dashboard")
                              ? "bg-brand/10 text-brand-dark font-semibold"
                              : "hover:bg-gray-100"
                          }
                          `}
                        >
                          <LayoutDashboard size={20} />
                          Dashboard
                        </button>
                      )}
                    </nav>

                    {/* Mobile Auth */}
                    {user ? (
                      <button
                        onClick={handleLogout}
                        className="
                        mt-6
                        flex
                        items-center
                        gap-3
                        p-3
                        rounded-xl
                        text-red-500
                        transition-colors
                        duration-150
                        hover:bg-red-50
                        "
                      >
                        <LogOut size={20} />
                        Logout
                      </button>
                    ) : (
                      <div className="mt-6 flex flex-col gap-3">
                        <Button
                          onPress={() => goTo("/login")}
                          className="
                          bg-gray-100
                          text-brand-dark
                          rounded-xl
                          transition-colors
                          duration-150
                          hover:bg-gray-200
                          "
                        >
                          Login
                        </Button>

                        <Button
                          onPress={() => goTo("/register")}
                          className="
                          bg-brand
                          text-white
                          rounded-xl
                          transition-transform
                          duration-150
                          active:scale-[0.97]
                          "
                        >
                          Register
                        </Button>
                      </div>
                    )}
                  </Drawer.Body>
                </Drawer.Dialog>
              </Drawer.Content>
            </Drawer.Backdrop>
          </Drawer>
        </div>
      </div>
    </header>
  );
}