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
    const actExpires = new Date();
    const rftExpires = new Date();
    // actExpires.setMinutes(actExpires.getMinutes()+20)
    actExpires.setHours(actExpires.getHours() + 2);
    rftExpires.setHours(rftExpires.getHours() + 2);

    response.cookies.set({
      name: "act",
      value: accessToken,
      expires: actExpires,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });
    response.cookies.set({
      name: "rft",
      value: refreshToken,
      expires: rftExpires,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      httpOnly: process.env.NODE_ENV === "production",
      path: "/",
    });
    return response;
  }
  return NextResponse.json(res.body);
}
