"use client";

import { HiChevronLeft } from "@react-icons/all-files/hi/HiChevronLeft";
import {
  useRouter,
  useSearchParams,
  useSelectedLayoutSegments,
} from "next/navigation";

export default function SubHeader() {
  const router = useRouter();
  const searchParam = useSearchParams();
  const segments = useSelectedLayoutSegments();

  const title = (() => {
    if (segments[0] === "mealplan") {
      if (segments[1] === "add") return "식단 추가";
      if (segments[1] === "edit") return "식단 수정";
      if (segments[1] === "time") return searchParam.get("time");
      if (segments[1] === "day") return segments.at(-1);
    }
    if (segments[0] === "notice") return "공지 사항";
    if (segments[0] === "service") return "이용 약관";
    if (segments[0] === "privacy") return "개인정보 처리방침";
    if (segments[0] === "open-source") return "오픈 소스";
    if (segments[0] === "open-license") return "오픈 라이센스";
    return "title 미정";
  })();
  const isShow = segments.at(-1) !== "division";
  return (
    <>
      {isShow ? (
        <header className="absolute left-0 top-0 w-full z-10">
          <div className="relative w-full h-max p-3 text-2xl sm:text-xl">
            <HiChevronLeft
              size={40}
              className="absolute left-0 top-1/2 -translate-y-1/2 translate-x-3 z-10"
              onClick={() => router.back()}
            />
            <p className="w-full text-center">{title}</p>
          </div>
        </header>
      ) : null}
    </>
  );
}
