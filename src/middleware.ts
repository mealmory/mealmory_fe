import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const reqHeaders = new Headers(req.headers);
  reqHeaders.set("x-pathname", req.nextUrl.pathname);
  return NextResponse.next({
    request: {
      headers: reqHeaders,
    },
  });
}
