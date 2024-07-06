import { NextRequest, NextResponse } from "next/server";

const notifications = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  title: `${10 - (i + 1)}월 공지사항`,
  description:
    "선배 탕후루 사주세요. 혹시 마라탕도? 그럼 제가 선배맘에 탕탕 후루후루",
  date: "2024-04-12",
}));

export function GET(req: NextRequest) {
  return NextResponse.json({ data: notifications });
}
