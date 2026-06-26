import { NextResponse } from "next/server";
import { auth } from "./app/lib/auth";


const roleRoutes = {
  admin: "/dashboard/admin",
  trainer: "/dashboard/trainer",
  member: "/dashboard/member",
};

export async function proxy(request) {
  const { pathname } = request.nextUrl;

  // Dashboard এর বাইরে কিছু Protect করবো না
  if (!pathname.startsWith("/dashboard")) {
    return NextResponse.next();
    }
    

  // Session বের করি
  const session = await auth.api.getSession({
    headers: request.headers,
  });console.log("this is server session",session)

  // Login না থাকলে Login Page
  if (!session) {
    return NextResponse.redirect(new URL("/login", request.url));
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
  matcher: ["/dashboard/:path*"],
};