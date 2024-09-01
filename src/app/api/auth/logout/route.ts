import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  cookies().delete("act");
  cookies().delete("rft");

  return NextResponse.json({
    result: "Y",
    code: 0,
    message: "Success",
  });
}
