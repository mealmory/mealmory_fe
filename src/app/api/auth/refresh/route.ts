import { fetchClient } from "@/utils/fetchClient";
import { getTimestamp } from "@/utils/timeFns";
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

        const actExpires = new Date();
        const rftExpires = new Date();
        // actExpires.setMinutes(actExpires.getMinutes()+20)
        actExpires.setHours(actExpires.getHours() + 2);
        rftExpires.setHours(rftExpires.getHours() + 2);

        response.cookies.set({
          name: "act",
          value: data.access_token,
          expires: actExpires,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          path: "/",
        });
        response.cookies.set({
          name: "rft",
          value: data.refresh_token,
          expires: rftExpires,
          sameSite: "strict",
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
