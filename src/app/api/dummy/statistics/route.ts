import { ApiResponse } from "@/utils/fetchClient";
import { genTempDto } from "@/utils/genTempDTO";
import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";

export function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams;
  console.log("query", query);
  const statisticsDTO = {
    rank: {
      1: "fat",
      2: "normal",
      3: "skinny",
    },
    cpfGraph: {
      carbs: 0,
      protein: 0,
      fat: 0,
      calory: 1231,
    },
    dailyGraph: {
      "2024-07-01": 2142,
      "2024-07-02": 1823,
      "2024-07-03": 2742,
      "2024-07-04": 2452,
      "2024-07-05": 2232,
      "2024-07-06": 2142,
      "2024-07-07": 2142,
      // "2024-07-08": 2142,
      // "2024-07-09": 2142,
      // "2024-07-10": 2142,
      // "2024-07-11": 2142,
      // "2024-07-12": 2142,
      // "2024-07-13": 2142,
      // "2024-07-14": 2142,
      // "2024-07-15": 2142,
      // "2024-07-16": 2142,
      // "2024-07-17": 2142,
      // "2024-07-18": 2142,
      // "2024-07-19": 2142,
      // "2024-07-20": 2142,
      // "2024-07-21": 2142,
      // "2024-07-22": 2142,
      // "2024-07-23": 2142,
      // "2024-07-24": 2142,
      // "2024-07-25": 2142,
      // "2024-07-26": 2142,
      // "2024-07-27": 2142,
      // "2024-07-28": 2142,
      // "2024-07-29": 2142,
      // "2024-07-30": 2142,
      // "2024-07-31": 2142,
    },
  };
  return NextResponse.json(genTempDto(statisticsDTO));
}
