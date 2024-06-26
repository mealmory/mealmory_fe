import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const reqHeaders = new Headers(req.headers);
  const { pathname } = req.nextUrl;
  reqHeaders.set("x-pathname", pathname);
  if (pathname === "/") {
    if (req.cookies.get("mact")) {
      return NextResponse.redirect(new URL("/home", req.url));
    } else {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  } else {
    return NextResponse.next({
      request: {
        headers: reqHeaders,
      },
    });
  }
}
