import { NextResponse } from "next/server";
import { auth } from "./app/lib/auth";

const roleRoutes = {
  admin: "/dashboard/admin",
  trainer: "/dashboard/trainer",
  member: "/dashboard/member",
};

export async function proxy(request) {
  const { pathname } = request.nextUrl;

  // ===========================
  // NEW: Community Details & Class Details Private Route
  // ===========================
  const isPrivateDetailsRoute =
    (pathname.startsWith("/community/") && pathname !== "/community") ||
    (pathname.startsWith("/classes/") && pathname !== "/classes");

  // Dashboard অথবা Private Details Route না হলে Protect করবো না
  if (!pathname.startsWith("/dashboard") && !isPrivateDetailsRoute) {
    return NextResponse.next();
  }

  // Session বের করি
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  console.log("this is server session", session);

  // Login না থাকলে Login Page
  if (!session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // ===========================
  // NEW: Community Details & Class Details এ শুধু Login লাগবে
  // Role Check লাগবে না
  // ===========================
  if (isPrivateDetailsRoute) {
    return NextResponse.next();
  }

  const role = session.user.role;

  // Invalid Role
  if (!roleRoutes[role]) {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  // নিজের Dashboard ছাড়া অন্য কোথাও যেতে পারবে না
  if (!pathname.startsWith(roleRoutes[role])) {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",

    // NEW: Community Details Route
    "/community/:path*",

    // NEW: Classes Details Route
    "/classes/:path*",
  ],
};