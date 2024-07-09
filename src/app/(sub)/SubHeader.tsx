"use client";

import { HiChevronLeft } from "@react-icons/all-files/hi/HiChevronLeft";
import { useRouter, useSelectedLayoutSegments } from "next/navigation";

export default function SubHeader() {
  const router = useRouter();
  const segments = useSelectedLayoutSegments();

  const title = (() => {
    if (segments[0] === "mealplan") {
      if (segments[1] === "add") return "식단 추가";
      if (segments[1] === "edit") return "식단 수정";
      return "식단 상세";
    }
    return "title 미정";
  })();

  return (
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
  );
}