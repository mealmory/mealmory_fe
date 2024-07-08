import { genTempDto } from "@/utils/genTempDTO";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
const menuList = Array.from({ length: 4 }, () => ({
  menu: "밥",
  calory: 12345,
  weight: 214,
  unit: 1,
  cpfGraph: {
    carbs: 214,
    protein: 0,
    fat: 0,
    calory: 0,
  },
}));
export function GET(req: NextApiRequest) {
  return NextResponse.json(
    genTempDto({
      type: "아침",
      date: "2024-04-12",
      menuList: menuList,
      total: 1234,
    })
  );
}
