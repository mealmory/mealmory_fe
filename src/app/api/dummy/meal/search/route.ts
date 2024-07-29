import { genTempDto } from "@/utils/genTempDTO";
import { NextResponse } from "next/server";

const mealPlan = [
  { id: 1, type: "아침", time: "2024-05-15 08:00:00", total: 123456 },
  { id: 2, type: "간식", time: "2024-05-15 10:00:00", total: 14515 },
  { id: 4, type: "점심", time: "2024-05-15 12:00:00", total: 754824 },
  { id: 3, type: "간식", time: "2024-05-15 15:00:00", total: 15854 },
  { id: 10, type: "저녁", time: "2024-05-15 18:00:00", total: 4185445 },
  { id: 13, type: "야식", time: "2024-05-15 21:00:00", total: 1548 },
];

export async function GET() {
  return NextResponse.json(genTempDto(mealPlan));
}
