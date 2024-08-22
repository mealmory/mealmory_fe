import { fetchClient } from "@/utils/fetchClient";
import { getTimestamp } from "@/utils/timestamp";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

interface RefreshAuth {
  access_token: string;
  refresh_token: string;
}
export async function POST(req: NextRequest) {
  try {
    const token = cookies().get("rft")?.value;
    if (token) {
      const body = await fetchClient<RefreshAuth>("user/token", {
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: { timestamp: getTimestamp() },
      }).then((res) => res.body);

      if (body.code === 0) {
        const { data, ...returnData } = body;
        const response = NextResponse.json(returnData);
        response.headers.set("Access-Control-Allow-Credentials", "true");

        response.cookies.set({
          name: "act",
          value: data.access_token,
          // expires: new Date(Date.now() + data.expires_in),
          secure: process.env.NODE_ENV === "production",
          path: "/",
        });
        response.cookies.set({
          name: "rft",
          value: data.refresh_token,
          // expires: new Date(Date.now() + data.refresh_token_expires_in),
          secure: process.env.NODE_ENV === "production",
          httpOnly: process.env.NODE_ENV === "production",
          path: "/",
        });

        return response;
      }
      cookies().delete("act");
      cookies().delete("rft");
    }
    throw new Error();
  } catch (e) {
    cookies().delete("act");
    cookies().delete("rft");
    return NextResponse.json({
      code: 4004,
      result: "N",
      message: "auth total fail",
    });
  }
}
