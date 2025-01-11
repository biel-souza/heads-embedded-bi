import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

import type { Token } from "./types/nextAuth.type";

export async function middleware(req: NextRequest) {
  const token = (await getToken({ req, secret: process.env.NEXTAUTH_SECRET })) as Token | null;

  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/login") && token?.user?.type === "admin") {
    const url = req.nextUrl.clone();
    url.pathname = "/admin";

    return NextResponse.redirect(url);
  }

  if (pathname.startsWith("/login") && token?.user?.type === "default") {
    const url = req.nextUrl.clone();
    url.pathname = "/dashboard";

    return NextResponse.redirect(url);
  }

  if (!token && !pathname.startsWith("/login") && !pathname.includes("auth")) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";

    return NextResponse.redirect(url);
  }

  if (pathname.includes("/admin") && token?.user?.type != "admin") {
    const url = req.nextUrl.clone();
    url.pathname = "/dashboard";

    return NextResponse.redirect(url);
  }

  if (!pathname.includes("/admin") && token?.user?.type == "admin") {
    const url = req.nextUrl.clone();
    url.pathname = "/admin";

    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
