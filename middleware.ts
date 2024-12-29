import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/login") && token) {
    const url = req.nextUrl.clone();
    url.pathname = "/admin";

    return NextResponse.redirect(url);
  }

  if (!token && !pathname.startsWith("/login") && !pathname.includes("auth")) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
