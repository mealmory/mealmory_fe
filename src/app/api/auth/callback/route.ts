import { fetchClient } from "@/utils/fetchClient";
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
  try {
    const timeNow = new Date();
    const timestamp = Math.floor(timeNow.getTime() / 1000);
    const res = await fetchClient<LoginResponse>("user/login", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${code}`,
        "Content-Type": "application/json",
      },
      body: {
        timestamp,
      },
    });
    if (res.ok) {
      const data = res.body.data;
      const response = NextResponse.json({
        data: data,
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
        path: "/",
      });
      return response;
    }
  } catch (e) {
    return NextResponse.json({
      data: "fail",
    });
  }
}
