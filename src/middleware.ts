import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  // if (pathname === "/") {
  //   if (req.cookies.get("act")) {
  //     return NextResponse.redirect(new URL("/home", req.url));
  //   } else {
  //     return NextResponse.redirect(new URL("/auth", req.url));
  //   }
  // } else {
  //   return NextResponse.next();
  // }
  return NextResponse.next();
}
