"use client";

import { BsX } from "@react-icons/all-files/bs/BsX";

import Calendar from "./Calendar";
import { useRouter } from "next/navigation";
import useDate, { Period } from "@/store/selectDateStore";

export default function DatePickerWithPeriod() {
  const router = useRouter();
  const { changePeriod, period } = useDate();
  return (
    <>
      <div className="w-full flex justify-center pt-2 relative md:mt-0 mt-6 ">
        <div className="flex items-center w-[280px] shadow-border rounded-2xl overflow-hidden px-2 py-1 md:gap-3">
          {["day", "week", "month"].map((value) => {
            const text =
              value === "day" ? "하루" : value === "week" ? "일주일" : "한달";
            const isSelected = value === period;
            return (
              <button
                className={
                  "p-2 basis-[80px] flex-1 " +
                  (isSelected ? "text-cusorange bg-black bg-opacity-5" : "")
                }
                key={value}
                onClick={() => changePeriod(value as Period)}
              >
                {text}
              </button>
            );
          })}
        </div>
        <button
          className="absolute top-1/2 right-2 -translate-y-[40%] text-4xl md:text-3xl"
          onClick={() => router.back()}
        >
          <BsX />
        </button>
      </div>
      <div className="h-2/3 md:h-full flex">
        <Calendar inline />
      </div>
    </>
  );
}
