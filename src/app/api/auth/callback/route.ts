import { fetchClient } from "@/utils/fetchClient";
import { getTimestamp } from "@/utils/timeFns";
import { NextRequest, NextResponse } from "next/server";

interface LoginResponse {
  accessToken: string;
  agreement: number;
  collect: number;
  email: string;
  id: number;
  nickName: string;
  profile: number;
  refreshToken: string;
}

export async function POST(req: NextRequest) {
  const { code } = await req.json();

  const res = await fetchClient<LoginResponse>("user/login", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${code}`,
      "Content-Type": "application/json",
    },
    body: {
      timestamp: getTimestamp(),
    },
  });
  if (res.body.code === 0) {
    const data = res.body.data;
    const { accessToken, refreshToken, ...returnData } = data;
    const response = NextResponse.json({
      ...res.body,
      data: returnData,
    });
    response.headers.set("Access-Control-Allow-Credentials", "true");

    response.cookies.set("act", data.accessToken, {
      // expires: new Date(Date.now() + data.expires_in),
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });
    response.cookies.set("rft", data.refreshToken, {
      // expires: new Date(Date.now() + data.refresh_token_expires_in),
      secure: process.env.NODE_ENV === "production",
      httpOnly: process.env.NODE_ENV === "production",
      path: "/",
    });
    return response;
  }
  return NextResponse.json(res.body);
}
