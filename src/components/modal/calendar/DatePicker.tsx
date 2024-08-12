"use client";

import { useRouter } from "next/navigation";
import Calendar from "@/components/main/Calendar";
import useDate from "@/store/selectDateStore";

const DatePicker = () => {
  const router = useRouter();
  const { selectedDate, changeDate } = useDate();
  return (
    <>
      <div className="w-full flex justify-end pt-2 pr-3">
        <button onClick={() => router.back()}>X</button>
      </div>
      <div>
        <Calendar endDate={selectedDate} handleDateChange={changeDate} />
      </div>
    </>
  );
};

export default DatePicker;
