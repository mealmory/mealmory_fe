"use client";

import { useRouter } from "next/navigation";
import Calendar from "@/components/main/Calendar";
import useDate from "@/store/selectDateStore";
import { BsX } from "@react-icons/all-files/bs/BsX";

const DatePicker = () => {
  const router = useRouter();
  const { selectedDate, changeDate } = useDate();
  return (
    <>
      <div className="w-full flex justify-end pt-2 pr-3">
        <button className="text-4xl md:text-2xl" onClick={() => router.back()}>
          <BsX />
        </button>
      </div>
      <div className="h-2/3 md:h-full">
        <Calendar endDate={selectedDate} handleDateChange={changeDate} inline />
      </div>
    </>
  );
};

export default DatePicker;
