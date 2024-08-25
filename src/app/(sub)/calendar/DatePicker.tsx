"use client";

import { useRouter } from "next/navigation";
import { BsX } from "@react-icons/all-files/bs/BsX";
import Calendar from "../_componenets/Calendar";

const DatePicker = () => {
  const router = useRouter();
  return (
    <>
      <div className="w-full flex justify-end pt-2 pr-3">
        <button className="text-4xl md:text-2xl" onClick={() => router.back()}>
          <BsX />
        </button>
      </div>
      <div className="h-2/3 md:h-full">
        <Calendar inline />
      </div>
    </>
  );
};

export default DatePicker;
