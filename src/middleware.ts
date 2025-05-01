import type { NextRequest } from "next/server";

import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { decrypt } from "@lib/auth";

export async function middleware(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  const login = new URL("/auth/login", request.url);
  const home = new URL("/", request.url);

  const isLogin = request.nextUrl.pathname.startsWith("/auth/login");
  const isRegister = request.nextUrl.pathname.startsWith("/auth/register");
  const isProfile = request.nextUrl.pathname.startsWith("/auth/profile");
  const isDashboard = request.nextUrl.pathname.startsWith("/dashboard");
  const isPreview = request.nextUrl.pathname.startsWith("/preview");
  const isEditor = isDashboard || isPreview;
  const isAuth = isLogin || isRegister;

  try {
    const { token, role } = await decrypt(session);
    const isAdmin = role === "Admin";
    const isLoggedIn = !!token;

    if (!isAdmin && isEditor) return NextResponse.redirect(home);
    if (!isLoggedIn && isProfile) return NextResponse.redirect(login);
    if (isLoggedIn && isAuth) return NextResponse.redirect(home);
  } catch {
    const store = await cookies();
    store.delete("session");

    if (isEditor) return NextResponse.redirect(home);
    if (isProfile) return NextResponse.redirect(login);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
};
