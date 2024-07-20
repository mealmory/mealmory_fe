import { cookies } from "next/dist/client/components/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { code } = await req.json();
  console.log(code);
  try {
    const res = await fetch(
      `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${process.env.NEXT_PUBLIC_REST_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT}&code=${code}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );
    if (res.ok) {
      const data = await res.json();
      const response = NextResponse.json({
        data: data,
      });

      response.headers.set("Access-Control-Allow-Credentials", "true");

      response.cookies.set("act", `${data.token_type} ${data.access_token}`, {
        expires: new Date(Date.now() + data.expires_in),
        secure: process.env.NODE_ENV === "production",
        path: "/",
      });
      response.cookies.set("rft", `${data.token_type} ${data.refresh_token}`, {
        expires: new Date(Date.now() + data.refresh_token_expires_in),
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
