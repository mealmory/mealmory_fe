import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  cookies().delete("act");
  cookies().delete("rft");

  const actCookie = cookies().get("act")?.value;
  const rftCookie = cookies().get("rft")?.value;

  if (actCookie || rftCookie) {
    return NextResponse.json({
      result: "N",
      code: 1,
      message: "Failed",
    });
  }
  return NextResponse.json({
    result: "Y",
    code: 0,
    message: "Success",
  });
}
